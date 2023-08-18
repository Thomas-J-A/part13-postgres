CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Marcus Aurelius', 'marco-aurelius.com', 'How to rule');
INSERT INTO blogs (author, url, title) VALUES ('Seneca', 'seneca.co.uk', 'How to be rich and good');
INSERT INTO blogs (author, url, title) VALUES ('Plato', 'therepublic.co.jp', 'The Form of the Good');
