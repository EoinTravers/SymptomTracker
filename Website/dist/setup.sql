CREATE TABLE IF NOT EXISTS form1 (
  `id`             integer primary key autoincrement,
  `timestamp`      datetime DEFAULT CURRENT_TIMESTAMP,
  `ip`             varchar,
  `session_id`     varchar,
  `age`            varchar,
  `sex`            varchar,
  `postcode`       varchar,
  `identifier`     varchar
);

CREATE TABLE IF NOT EXISTS form2 (
  `id`             integer primary key autoincrement,
  `timestamp`      datetime DEFAULT CURRENT_TIMESTAMP,
  `ip`             varchar,
  `session_id`     varchar,
  `tested`         varchar,
  `tested_outcome` varchar,
  `tested_date`    varchar
);

CREATE TABLE IF NOT EXISTS form3 (
  `id`             integer primary key autoincrement,
  `timestamp`      datetime DEFAULT CURRENT_TIMESTAMP,
  `ip`             varchar,
  `session_id`     varchar,
  `fever`          varchar,
  `fever_severity` varchar,
  `fever_from`     varchar,
  `fever_still`    varchar,
  `fever_to`       varchar,
  `cough`          varchar,
  `cough_severity` varchar,
  `cough_from`     varchar,
  `cough_still`    varchar,
  `cough_to`       varchar
);


CREATE TABLE IF NOT EXISTS form4 (
  `id`             integer primary key autoincrement,
  `timestamp`      datetime DEFAULT CURRENT_TIMESTAMP,
  `ip`             varchar,
  `session_id`     varchar,
  `other`          varchar,
  `other-name`     varchar,
  `other_severity` varchar,
  `other_from`     varchar,
  `other_still`    varchar,
  `other_to`       varchar
);


CREATE TABLE IF NOT EXISTS form5 (
  `id`             integer primary key autoincrement,
  `timestamp`      datetime DEFAULT CURRENT_TIMESTAMP,
  `ip`             varchar,
  `session_id`     varchar,
  `free-response`  varchar
);
