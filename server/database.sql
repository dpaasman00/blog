CREATE DATABASE simpleblog;

CREATE TABLE blogposts(
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    content VARCHAR(10000)
);