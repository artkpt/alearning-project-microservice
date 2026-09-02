INSERT INTO courses(code, name)
SELECT 'INT601', 'Enterprise Computing Platform'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE code = 'INT601');

INSERT INTO courses(code, name)
SELECT 'INT602', 'Data Structure and Algorithms'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE code = 'INT602');

INSERT INTO courses(code, name)
SELECT 'INT603', 'MIS'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE code = 'INT603');

INSERT INTO courses(code, name)
SELECT 'INT604', 'Database Management'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE code = 'INT604');

INSERT INTO courses(code, name)
SELECT 'INT605', 'Systems Analysis and UX/UI Design'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE code = 'INT605');

INSERT INTO courses(code, name)
SELECT 'INT606', 'Network'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE code = 'INT606');

