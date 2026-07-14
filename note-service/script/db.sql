CREATE DATABASE IF NOT EXISTS note_app;
CREATE USER alearning@localhost identified by 'alearning' ;
GRANT ALL PRIVILEGES ON note_app.* to alearning@localhost; 

-- ICT
-- SELECT @@GLOBAL.time_zone, @@SESSION.time_zone, @@system_time_zone;