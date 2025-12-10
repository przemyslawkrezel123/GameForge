BEGIN;

TRUNCATE TABLE transactions, reviews, libraries, games, users, shops RESTART IDENTITY CASCADE;

INSERT INTO shops (name) VALUES
  ('Steam'),
  ('GOG'),
  ('Epic Games Store');

INSERT INTO users (username, password) VALUES
  ('alice', '$2a$10$aliceHashExample'),
  ('bob',   '$2a$10$bobHashExample'),
  ('carol', '$2a$10$carolHashExample');

INSERT INTO games (name, genre, price, description, shop_id) VALUES
  ('Cyberpunk 2077', 'Action RPG', 199.99, 'Futuristic open-world adventure.',
    (SELECT shop_id FROM shops WHERE name = 'Steam')),
  ('The Witcher 3: Wild Hunt', 'Action RPG', 99.99, 'Story-rich monster hunting epic.',
    (SELECT shop_id FROM shops WHERE name = 'GOG')),
  ('Hollow Knight', 'Metroidvania', 59.99, 'Handcrafted platforming challenge.',
    (SELECT shop_id FROM shops WHERE name = 'Steam')),
  ('Hades', 'Roguelike', 89.99, 'Fast-paced escape from the underworld.',
    (SELECT shop_id FROM shops WHERE name = 'Epic Games Store'));

INSERT INTO libraries (user_id, game_id, favourites) VALUES
  ((SELECT user_id FROM users WHERE username = 'alice'),
   (SELECT game_id FROM games WHERE name = 'Cyberpunk 2077'), TRUE),
  ((SELECT user_id FROM users WHERE username = 'alice'),
   (SELECT game_id FROM games WHERE name = 'Hollow Knight'), FALSE),
  ((SELECT user_id FROM users WHERE username = 'bob'),
   (SELECT game_id FROM games WHERE name = 'The Witcher 3: Wild Hunt'), TRUE),
  ((SELECT user_id FROM users WHERE username = 'carol'),
   (SELECT game_id FROM games WHERE name = 'Hades'), TRUE);

INSERT INTO reviews (rating, review_text, user_id, game_id) VALUES
  (5, 'Night City is stunning and immersive.',
   (SELECT user_id FROM users WHERE username = 'alice'),
   (SELECT game_id FROM games WHERE name = 'Cyberpunk 2077')),
  (4, 'Deep narrative with memorable characters.',
   (SELECT user_id FROM users WHERE username = 'bob'),
   (SELECT game_id FROM games WHERE name = 'The Witcher 3: Wild Hunt')),
  (5, 'Challenging gameplay with gorgeous art.',
   (SELECT user_id FROM users WHERE username = 'alice'),
   (SELECT game_id FROM games WHERE name = 'Hollow Knight')),
  (5, 'Combat and storytelling blend perfectly.',
   (SELECT user_id FROM users WHERE username = 'carol'),
   (SELECT game_id FROM games WHERE name = 'Hades'));

INSERT INTO transactions (amount, currency, status, created_at, completed_at, user_id, game_id) VALUES
  (199.99, 'PLN', 'COMPLETED', TIMESTAMP '2024-11-01 10:15:00', TIMESTAMP '2024-11-01 10:16:30',
    (SELECT user_id FROM users WHERE username = 'alice'),
    (SELECT game_id FROM games WHERE name = 'Cyberpunk 2077')),
  (99.99, 'PLN', 'COMPLETED', TIMESTAMP '2024-11-05 18:42:00', TIMESTAMP '2024-11-05 18:43:05',
    (SELECT user_id FROM users WHERE username = 'bob'),
    (SELECT game_id FROM games WHERE name = 'The Witcher 3: Wild Hunt')),
  (59.99, 'PLN', 'COMPLETED', TIMESTAMP '2024-11-10 14:20:00', TIMESTAMP '2024-11-10 14:20:45',
    (SELECT user_id FROM users WHERE username = 'alice'),
    (SELECT game_id FROM games WHERE name = 'Hollow Knight')),
  (89.99, 'PLN', 'PENDING', TIMESTAMP '2024-12-01 09:05:00', NULL,
    (SELECT user_id FROM users WHERE username = 'carol'),
    (SELECT game_id FROM games WHERE name = 'Hades'));

COMMIT;