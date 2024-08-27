create table if not exists posts (
  id serial primary key,
  title varchar(255) not null,
  content text not null,
  thumbnail_url varchar(255),
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);
