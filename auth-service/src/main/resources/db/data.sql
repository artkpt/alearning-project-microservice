INSERT INTO users(username, password, role)
SELECT "admin", "admin", "admin"
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = "admin");


INSERT INTO users(username, password, role)
SELECT "user", "user", "user"
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = "user");
