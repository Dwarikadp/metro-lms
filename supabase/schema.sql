create table if not exists admins (
  username text primary key,
  name text not null default '',
  password text not null,
  created_at timestamptz not null default now()
);

create table if not exists employees (
  id bigserial primary key,
  emp_id text not null unique,
  name text not null,
  email text not null default '',
  department text not null default '',
  role text not null default '',
  modules text not null default '',
  password text not null,
  is_active boolean not null default true,
  created_by text not null default '',
  created_at timestamptz not null default now(),
  last_active timestamptz
);

create table if not exists progress (
  id bigserial primary key,
  emp_id text not null references employees(emp_id) on delete cascade,
  module text not null,
  topic text not null,
  completed boolean not null default true,
  score integer,
  time_spent integer not null default 0,
  completed_at timestamptz not null default now(),
  unique (emp_id, module, topic)
);

create table if not exists quiz_results (
  id bigserial primary key,
  emp_id text not null references employees(emp_id) on delete cascade,
  module text not null,
  quiz_type text not null default 'module',
  score integer not null default 0,
  passed boolean not null default false,
  taken_at timestamptz not null default now()
);

create table if not exists certificates (
  id bigserial primary key,
  emp_id text not null unique references employees(emp_id) on delete cascade,
  cert_id text not null unique,
  modules jsonb not null,
  scores jsonb not null,
  issued_at timestamptz not null default now()
);

create index if not exists idx_progress_emp on progress(emp_id);
create index if not exists idx_progress_module on progress(module);
create index if not exists idx_quiz_emp on quiz_results(emp_id);
create index if not exists idx_cert_emp on certificates(emp_id);
