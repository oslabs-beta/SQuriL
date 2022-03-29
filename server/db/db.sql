-- this file is just for reference

CREATE DATABASE squril;

CREATE TABLE users (
  _id SERIAL NOT NULL PRIMARY KEY,
  username VARCHAR NOT NULL, 
)


CREATE TABLE schemas (
  _id SERIAL NOT NULL PRIMARY KEY,
  gqlSchema VARCHAR,
  tsSchema VARCHAR, 
  user_id BIGINT NOT NULL REFERENCES users (_id)
);

CREATE TABLE schemas (_id SERIAL NOT NULL PRIMARY KEY, gqlSchema VARCHAR, tsSchema VARCHAR, user_id BIGINT NOT NULL REFERENCES users (_id));

-- -- FOR TESTING:
-- CREATE TABLE tests (
--   name VARCHAR(100),
--   obj JSON
-- )

-- CREATE TABLE test (
-- 	id serial NOT NULL PRIMARY KEY,
-- 	info json NOT NULL
-- );


-- CREATE TABLE nojson (
-- 	id serial NOT NULL PRIMARY KEY,
-- 	info VARCHAR(255)
-- );

-- -- {"_id":"1", "value":"i am a schema", "user_id":"11"}