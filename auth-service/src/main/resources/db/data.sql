INSERT INTO users(username, password, role)
SELECT "admin2", "$argon2id$v=19$m=16384,t=2,p=1$pyp58kGXLJPsfkWXRixvXQ$C9UV4b9Q1RPHi16EMK7OXfzTp/h9XKxv5WI/ys4KseM", "admin"
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = "admin2");


INSERT INTO users(username, password, role)
SELECT "user", "user", "user"
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = "user");
