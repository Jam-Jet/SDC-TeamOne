DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE users(
    user_id serial,
    PRIMARY KEY(user_id),
    name varchar
);

CREATE TABLE messages(
    message_id serial,
    PRIMARY KEY(message_id),
    message text,
    send_date timestamp default CURRENT_DATE+CURRENT_TIME,
    username varchar
);

-- CREATE TABLE messages(
--     message_id serial,
--     PRIMARY KEY(message_id),
--     message text,
--     send_date timestamp,
--     user_id integer,
--     FOREIGN KEY (user_id)
--     REFERENCES users(user_id) ON DELETE CASCADE
-- );
