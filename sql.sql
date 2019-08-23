create table if not exists pmsmf.cars (
  id int unsigned auto_increment constraint `PRIMARY` primary key,
  manufacturer varchar(20) not null,
  model varchar(20) null,
  year_of_production year null,
  license_no varchar(10) null,
  motor_capacity varchar(10) null,
  car_class varchar(6) null,
  push_type varchar(10) null,
  remarks varchar(255) null
);
create table if not exists pmsmf.drivers (
  id int unsigned auto_increment constraint `PRIMARY` primary key,
  first_name varchar(20) not null,
  last_name varchar(20) not null,
  nationality varchar(20) null,
  address varchar(20) null,
  id_card_no varchar(9) null,
  mobile varchar(10) null,
  email varchar(30) null,
  sponsor varchar(40) null,
  car_id int(11) unsigned null,
  remarks varchar(255) null,
  constraint drivers_email_unique unique (email),
  constraint idcars_idx foreign key (car_id) references pmsmf.cars (id) on delete
  set
    null
);

create table if not exists pmsmf.rally_types (
  id int unsigned auto_increment constraint `PRIMARY` primary key,
  rally_type varchar(15) null
);
create table if not exists pmsmf.rallies (
  id int unsigned auto_increment constraint `PRIMARY` primary key,
  name varchar(30) not null,
  city varchar(20) null,
  date date null,
  type int(11) unsigned null,
  remarks varchar(255) null,
  constraint rally_type_fk_idx foreign key (type) references pmsmf.rally_types (id)
);
create table if not exists pmsmf.drift_manage (
  id int unsigned auto_increment constraint `PRIMARY` primary key,
  rally_id int unsigned not null,
  driver_id int unsigned not null,
  racing_number int unsigned not null,
  score_1 int not null,
  score_2 int not null,
  score_3 int not null,
  fouls_1 int null,
  fouls_2 int null,
  fouls_3 int null,
  constraint driver_id_fk_idx foreign key (driver_id) references pmsmf.drivers (id) on delete cascade,
  constraint rally_id_fk_idx foreign key (rally_id) references pmsmf.rallies (id) on delete cascade
);
create table if not exists pmsmf.speed_manage (
  id int unsigned auto_increment constraint `PRIMARY` primary key,
  rally_id int unsigned not null,
  driver_id int unsigned not null,
  racing_number int unsigned not null,
  time_1 time(6) not null,
  time_2 time(6) not null,
  time_3 time(6) not null,
  best_time time(6) not null,
  fouls_1 int null,
  fouls_2 int null,
  fouls_3 int null,
  constraint speed_driver_id_fk_idx foreign key (driver_id) references pmsmf.drivers (id) on delete cascade,
  constraint speed_rally_id_fk_idx foreign key (rally_id) references pmsmf.rallies (id) on delete cascade
);
create table if not exists pmsmf.users (
  id int unsigned auto_increment constraint `PRIMARY` primary key,
  username varchar(20) not null,
  first_name varchar(20) not null,
  last_name varchar(20) not null,
  password varchar(255) not null,
  salt varchar(20) not null
);