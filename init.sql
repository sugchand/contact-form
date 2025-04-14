-- Create the user with a password
-- and create a database with the same name as the user
CREATE USER username WITH PASSWORD 'password';
CREATE DATABASE contactDB WITH OWNER username;

-- Grant permissions to create databases
ALTER USER username CREATEDB;

-- Grant the user connection and modification rights on a specific database
GRANT CONNECT ON DATABASE contactDB TO username;
GRANT CREATE ON DATABASE contactDB TO username;

-- Grant all privileges on all tables and sequences in the public schema of the database
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO username;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO username;




