-- Iron Duel: Tank Commanders — Supabase schéma (účty, profily, postup kampane, rebríček)
-- Spusti v Supabase: Project -> SQL Editor -> New query -> vlož celý tento súbor -> Run.
-- Dá sa spustiť opakovane (IF NOT EXISTS / DROP POLICY IF EXISTS), takže sa nič nepokazí pri druhom spustení.

-- ---------- 1) profily hráčov (1:1 s auth.users, založeným cez Supabase Auth) ----------
create table if not exists public.profiles (
  id             uuid primary key references auth.users(id) on delete cascade,
  nick           text not null unique check (char_length(nick) between 2 and 14),
  color          text not null default '#3a7bd5',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),

  -- štatistiky (rovnaký význam ako doterajší localStorage profil v hre)
  matches        int not null default 0,
  wins           int not null default 0,
  rounds         int not null default 0,
  kills          int not null default 0,
  best_level     int not null default 1,
  level          int not null default 1,
  xp             int not null default 0,
  last_played_at timestamptz,

  -- výbava prenášaná medzi misiami kampane (rovnaký tvar ako storyLoadoutSnapshot() v game.js)
  story_loadout  jsonb,

  -- postup v kampani (rovnaký tvar ako story.progress: { unlocked, done })
  story_unlocked int not null default 1,
  story_done     jsonb not null default '[]'::jsonb,

  -- zoznam id odomknutých odznakov (pozri ACHIEVEMENTS v game.js)
  achievements   jsonb not null default '[]'::jsonb,

  -- trvalé veliteľské vylepšenia (skill tree) - { perkId: úroveň }, pozri PERKS v game.js
  perks          jsonb not null default '{}'::jsonb
);

-- pre existujúcu tabuľku (založenú pred pridaním odznakov/vylepšení) treba stĺpce doplniť - na novej inštalácii sú už v create table vyššie, toto len pre istotu
alter table public.profiles add column if not exists achievements jsonb not null default '[]'::jsonb;
alter table public.profiles add column if not exists perks jsonb not null default '{}'::jsonb;

-- rýchle vyhľadanie podľa prezývky (case-insensitive, rovnako ako nickKey() v game.js)
create unique index if not exists profiles_nick_lower_idx on public.profiles (lower(nick));

alter table public.profiles enable row level security;

-- rebríček a profily protihráčov musí vidieť každý (aj neprihlásený návštevník) - preto SELECT pre všetkých
drop policy if exists "profiles sú verejne čitateľné" on public.profiles;
create policy "profiles sú verejne čitateľné"
  on public.profiles for select
  using (true);

-- založiť/meniť/mazať smie len vlastník účtu svoj vlastný riadok
drop policy if exists "vlastný profil - vloženie" on public.profiles;
create policy "vlastný profil - vloženie"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "vlastný profil - úprava" on public.profiles;
create policy "vlastný profil - úprava"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "vlastný profil - zmazanie" on public.profiles;
create policy "vlastný profil - zmazanie"
  on public.profiles for delete
  using (auth.uid() = id);

-- updated_at sa nastaví automaticky pri každej zmene (netreba to riešiť v JS)
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- nový účet (po prihlásení cez Google v Supabase Auth) dostane automaticky profil, prezývka sa odvodí z Google mena
-- (full_name/name) - ak je už obsadená, pridá sa krátka prípona z ID, nech vznik účtu nikdy nespadne na kolízii prezývky
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  base_nick text;
  final_nick text;
begin
  base_nick := substring(coalesce(
    nullif(trim(new.raw_user_meta_data->>'nick'), ''),
    nullif(trim(new.raw_user_meta_data->>'full_name'), ''),
    nullif(trim(new.raw_user_meta_data->>'name'), ''),
    'Hráč'
  ) from 1 for 14);
  final_nick := base_nick;
  if exists (select 1 from public.profiles where lower(nick) = lower(final_nick)) then
    final_nick := substring(base_nick from 1 for 9) || '_' || substr(new.id::text, 1, 4);
  end if;
  insert into public.profiles (id, nick, color)
  values (new.id, final_nick, coalesce(new.raw_user_meta_data->>'color', '#3a7bd5'))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- 2) priatelia (len medzi hráčmi prihlásenými cez Google - prepája dve auth.users id) ----------
-- jeden riadok = jedno priateľstvo, zapísaný tým, kto pridal (napr. otvorením pozvánkového odkazu druhého hráča),
-- ale viditeľný a zrušiteľný OBOMA stranami - netreba žiadne schvaľovanie, odkaz dostal len od niekoho, koho pozná
create table if not exists public.friends (
  user_id    uuid not null references auth.users(id) on delete cascade,
  friend_id  uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, friend_id),
  constraint friends_not_self check (user_id <> friend_id)
);
create index if not exists friends_friend_id_idx on public.friends (friend_id);
alter table public.friends enable row level security;

drop policy if exists "friends - viditeľné pre obe strany" on public.friends;
create policy "friends - viditeľné pre obe strany"
  on public.friends for select
  using (auth.uid() = user_id or auth.uid() = friend_id);

drop policy if exists "friends - pridanie (len vlastná strana)" on public.friends;
create policy "friends - pridanie (len vlastná strana)"
  on public.friends for insert
  with check (auth.uid() = user_id);

drop policy if exists "friends - odobratie (ktokoľvek z dvojice)" on public.friends;
create policy "friends - odobratie (ktokoľvek z dvojice)"
  on public.friends for delete
  using (auth.uid() = user_id or auth.uid() = friend_id);
