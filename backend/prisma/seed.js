const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.transaction.deleteMany();
  await prisma.review.deleteMany();
  await prisma.library.deleteMany();
  await prisma.game.deleteMany();
  await prisma.user.deleteMany();
  await prisma.shop.deleteMany();

  // Insert shops
  const steam = await prisma.shop.create({
    data: { name: 'Steam' },
  });
  
  const gog = await prisma.shop.create({
    data: { name: 'GOG' },
  });
  
  const epic = await prisma.shop.create({
    data: { name: 'Epic Games Store' },
  });

  // Insert users
  const mateusz = await prisma.user.create({
    data: {
      username: 'mateusz',
      password: '$2b$10$l2ayRR5rVRy71yuJzVrXV.ac3QqjaEwJgzd3J2eF/ThEOpTJ/8QCe',
    },
  });

  const alice = await prisma.user.create({
    data: {
      username: 'alice',
      password: '$2a$10$aliceHashExample',
    },
  });

  const bob = await prisma.user.create({
    data: {
      username: 'bob',
      password: '$2a$10$bobHashExample',
    },
  });

  const carol = await prisma.user.create({
    data: {
      username: 'carol',
      password: '$2a$10$carolHashExample',
    },
  });

  const david = await prisma.user.create({
    data: {
      username: 'david',
      password: '$2a$10$davidHashExample',
    },
  });

  const emma = await prisma.user.create({
    data: {
      username: 'emma',
      password: '$2a$10$emmaHashExample',
    },
  });

  const frank = await prisma.user.create({
    data: {
      username: 'frank',
      password: '$2a$10$frankHashExample',
    },
  });

  const grace = await prisma.user.create({
    data: {
      username: 'grace',
      password: '$2a$10$graceHashExample',
    },
  });

  // Insert games
  const cyberpunk = await prisma.game.create({
    data: {
      name: 'Cyberpunk 2077',
      genre: 'Action RPG',
      price: 199.99,
      description: 'Futuristic open-world adventure.',
      shop_id: steam.shop_id,
    },
  });

  const witcher = await prisma.game.create({
    data: {
      name: 'The Witcher 3: Wild Hunt',
      genre: 'Action RPG',
      price: 99.99,
      description: 'Story-rich monster hunting epic.',
      shop_id: gog.shop_id,
    },
  });

  const hollowKnight = await prisma.game.create({
    data: {
      name: 'Hollow Knight',
      genre: 'Metroidvania',
      price: 59.99,
      description: 'Handcrafted platforming challenge.',
      shop_id: steam.shop_id,
    },
  });

  const hades = await prisma.game.create({
    data: {
      name: 'Hades',
      genre: 'Roguelike',
      price: 89.99,
      description: 'Fast-paced escape from the underworld.',
      shop_id: epic.shop_id,
    },
  });

  const eldenRing = await prisma.game.create({
    data: {
      name: 'Elden Ring',
      genre: 'Action RPG',
      price: 249.99,
      description: 'A grand adventure in a vast fantasy world.',
      shop_id: steam.shop_id,
    },
  });

  const stardewValley = await prisma.game.create({
    data: {
      name: 'Stardew Valley',
      genre: 'Simulation',
      price: 49.99,
      description: 'Build your dream farm and connect with villagers.',
      shop_id: gog.shop_id,
    },
  });

  const minecraft = await prisma.game.create({
    data: {
      name: 'Minecraft',
      genre: 'Sandbox',
      price: 119.99,
      description: 'Create and explore infinite worlds.',
      shop_id: steam.shop_id,
    },
  });

  const terraria = await prisma.game.create({
    data: {
      name: 'Terraria',
      genre: 'Sandbox',
      price: 39.99,
      description: '2D adventure with building and exploration.',
      shop_id: steam.shop_id,
    },
  });

  const darkSouls3 = await prisma.game.create({
    data: {
      name: 'Dark Souls III',
      genre: 'Action RPG',
      price: 159.99,
      description: 'Punishing combat in a dark fantasy world.',
      shop_id: steam.shop_id,
    },
  });

  const sekiro = await prisma.game.create({
    data: {
      name: 'Sekiro: Shadows Die Twice',
      genre: 'Action',
      price: 199.99,
      description: 'Master sword combat in feudal Japan.',
      shop_id: epic.shop_id,
    },
  });

  const deadCells = await prisma.game.create({
    data: {
      name: 'Dead Cells',
      genre: 'Roguelike',
      price: 99.99,
      description: 'Fast-paced action platformer with permadeath.',
      shop_id: gog.shop_id,
    },
  });

  const celeste = await prisma.game.create({
    data: {
      name: 'Celeste',
      genre: 'Platformer',
      price: 79.99,
      description: 'Challenging platforming with a touching story.',
      shop_id: steam.shop_id,
    },
  });

  const portal2 = await prisma.game.create({
    data: {
      name: 'Portal 2',
      genre: 'Puzzle',
      price: 39.99,
      description: 'Mind-bending puzzles with portal mechanics.',
      shop_id: steam.shop_id,
    },
  });

  const dishonored = await prisma.game.create({
    data: {
      name: 'Dishonored',
      genre: 'Stealth',
      price: 79.99,
      description: 'Stealth action in a steampunk city.',
      shop_id: gog.shop_id,
    },
  });

  // Insert libraries
  await prisma.library.create({
    data: {
      user_id: mateusz.user_id,
      game_id: cyberpunk.game_id,
      favourites: true,
    },
  });

  await prisma.library.create({
    data: {
      user_id: mateusz.user_id,
      game_id: hollowKnight.game_id,
      favourites: false,
    },
  });

  await prisma.library.create({
    data: {
      user_id: mateusz.user_id,
      game_id: witcher.game_id,
      favourites: true,
    },
  });

  await prisma.library.create({
    data: {
      user_id: mateusz.user_id,
      game_id: hades.game_id,
      favourites: true,
    },
  });

  await prisma.library.create({
    data: {
      user_id: alice.user_id,
      game_id: cyberpunk.game_id,
      favourites: true,
    },
  });

  await prisma.library.create({
    data: {
      user_id: alice.user_id,
      game_id: hollowKnight.game_id,
      favourites: false,
    },
  });

  await prisma.library.create({
    data: {
      user_id: bob.user_id,
      game_id: witcher.game_id,
      favourites: true,
    },
  });

  await prisma.library.create({
    data: {
      user_id: carol.user_id,
      game_id: hades.game_id,
      favourites: true,
    },
  });

  await prisma.library.create({
    data: {
      user_id: david.user_id,
      game_id: eldenRing.game_id,
      favourites: true,
    },
  });

  await prisma.library.create({
    data: {
      user_id: david.user_id,
      game_id: darkSouls3.game_id,
      favourites: true,
    },
  });

  await prisma.library.create({
    data: {
      user_id: emma.user_id,
      game_id: stardewValley.game_id,
      favourites: true,
    },
  });

  await prisma.library.create({
    data: {
      user_id: emma.user_id,
      game_id: minecraft.game_id,
      favourites: false,
    },
  });

  await prisma.library.create({
    data: {
      user_id: frank.user_id,
      game_id: sekiro.game_id,
      favourites: true,
    },
  });

  await prisma.library.create({
    data: {
      user_id: frank.user_id,
      game_id: deadCells.game_id,
      favourites: false,
    },
  });

  await prisma.library.create({
    data: {
      user_id: grace.user_id,
      game_id: celeste.game_id,
      favourites: true,
    },
  });

  await prisma.library.create({
    data: {
      user_id: grace.user_id,
      game_id: portal2.game_id,
      favourites: true,
    },
  });

  await prisma.library.create({
    data: {
      user_id: bob.user_id,
      game_id: dishonored.game_id,
      favourites: false,
    },
  });

  await prisma.library.create({
    data: {
      user_id: alice.user_id,
      game_id: terraria.game_id,
      favourites: false,
    },
  });

  // Insert reviews
  await prisma.review.create({
    data: {
      rating: 5,
      review_text: 'Night City is stunning and immersive.',
      user_id: alice.user_id,
      game_id: cyberpunk.game_id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      review_text: 'Deep narrative with memorable characters.',
      user_id: bob.user_id,
      game_id: witcher.game_id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      review_text: 'Challenging gameplay with gorgeous art.',
      user_id: alice.user_id,
      game_id: hollowKnight.game_id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      review_text: 'Combat and storytelling blend perfectly.',
      user_id: carol.user_id,
      game_id: hades.game_id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      review_text: 'One of the best RPGs ever made. Epic and challenging!',
      user_id: david.user_id,
      game_id: eldenRing.game_id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      review_text: 'Relaxing and addictive. Perfect for unwinding.',
      user_id: emma.user_id,
      game_id: stardewValley.game_id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      review_text: 'Endless creativity and fun with friends.',
      user_id: emma.user_id,
      game_id: minecraft.game_id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      review_text: 'Incredibly difficult but so rewarding.',
      user_id: frank.user_id,
      game_id: sekiro.game_id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      review_text: 'Great roguelike with tight controls.',
      user_id: frank.user_id,
      game_id: deadCells.game_id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      review_text: 'Beautiful music and gameplay. A masterpiece.',
      user_id: grace.user_id,
      game_id: celeste.game_id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      review_text: 'Hilarious writing and brilliant puzzle design.',
      user_id: grace.user_id,
      game_id: portal2.game_id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      review_text: 'Atmospheric stealth with great level design.',
      user_id: bob.user_id,
      game_id: dishonored.game_id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 3,
      review_text: 'Fun but can get repetitive after a while.',
      user_id: alice.user_id,
      game_id: terraria.game_id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      review_text: 'Brutal difficulty but extremely satisfying.',
      user_id: david.user_id,
      game_id: darkSouls3.game_id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      review_text: 'Amazing world design with tons of content.',
      user_id: bob.user_id,
      game_id: eldenRing.game_id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      review_text: 'The perfect blend of action and roguelike elements.',
      user_id: alice.user_id,
      game_id: deadCells.game_id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      review_text: 'Great co-op experience. Puzzles are clever.',
      user_id: carol.user_id,
      game_id: portal2.game_id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      review_text: 'The building possibilities are endless!',
      user_id: david.user_id,
      game_id: minecraft.game_id,
    },
  });

  // Insert transactions
  await prisma.transaction.create({
    data: {
      amount: 199.99,
      currency: 'PLN',
      status: 'COMPLETED',
      created_at: new Date('2024-11-01T10:15:00'),
      completed_at: new Date('2024-11-01T10:16:30'),
      user_id: alice.user_id,
      game_id: cyberpunk.game_id,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 99.99,
      currency: 'PLN',
      status: 'COMPLETED',
      created_at: new Date('2024-11-05T18:42:00'),
      completed_at: new Date('2024-11-05T18:43:05'),
      user_id: bob.user_id,
      game_id: witcher.game_id,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 59.99,
      currency: 'PLN',
      status: 'COMPLETED',
      created_at: new Date('2024-11-10T14:20:00'),
      completed_at: new Date('2024-11-10T14:20:45'),
      user_id: alice.user_id,
      game_id: hollowKnight.game_id,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 89.99,
      currency: 'PLN',
      status: 'PENDING',
      created_at: new Date('2024-12-01T09:05:00'),
      completed_at: null,
      user_id: carol.user_id,
      game_id: hades.game_id,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 249.99,
      currency: 'PLN',
      status: 'COMPLETED',
      created_at: new Date('2024-11-15T16:30:00'),
      completed_at: new Date('2024-11-15T16:31:15'),
      user_id: david.user_id,
      game_id: eldenRing.game_id,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 49.99,
      currency: 'PLN',
      status: 'COMPLETED',
      created_at: new Date('2024-11-20T11:45:00'),
      completed_at: new Date('2024-11-20T11:45:30'),
      user_id: emma.user_id,
      game_id: stardewValley.game_id,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 119.99,
      currency: 'PLN',
      status: 'COMPLETED',
      created_at: new Date('2024-11-22T14:10:00'),
      completed_at: new Date('2024-11-22T14:11:00'),
      user_id: emma.user_id,
      game_id: minecraft.game_id,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 199.99,
      currency: 'PLN',
      status: 'COMPLETED',
      created_at: new Date('2024-11-25T19:20:00'),
      completed_at: new Date('2024-11-25T19:21:10'),
      user_id: frank.user_id,
      game_id: sekiro.game_id,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 99.99,
      currency: 'PLN',
      status: 'COMPLETED',
      created_at: new Date('2024-11-28T08:15:00'),
      completed_at: new Date('2024-11-28T08:16:00'),
      user_id: frank.user_id,
      game_id: deadCells.game_id,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 79.99,
      currency: 'PLN',
      status: 'COMPLETED',
      created_at: new Date('2024-12-02T13:30:00'),
      completed_at: new Date('2024-12-02T13:30:45'),
      user_id: grace.user_id,
      game_id: celeste.game_id,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 39.99,
      currency: 'PLN',
      status: 'COMPLETED',
      created_at: new Date('2024-12-05T17:00:00'),
      completed_at: new Date('2024-12-05T17:01:20'),
      user_id: grace.user_id,
      game_id: portal2.game_id,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 79.99,
      currency: 'PLN',
      status: 'COMPLETED',
      created_at: new Date('2024-12-08T10:25:00'),
      completed_at: new Date('2024-12-08T10:26:00'),
      user_id: bob.user_id,
      game_id: dishonored.game_id,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 39.99,
      currency: 'PLN',
      status: 'COMPLETED',
      created_at: new Date('2024-12-10T15:40:00'),
      completed_at: new Date('2024-12-10T15:41:15'),
      user_id: alice.user_id,
      game_id: terraria.game_id,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 159.99,
      currency: 'PLN',
      status: 'COMPLETED',
      created_at: new Date('2024-12-12T12:00:00'),
      completed_at: new Date('2024-12-12T12:01:30'),
      user_id: david.user_id,
      game_id: darkSouls3.game_id,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 199.99,
      currency: 'PLN',
      status: 'PENDING',
      created_at: new Date('2024-12-15T09:30:00'),
      completed_at: null,
      user_id: carol.user_id,
      game_id: cyberpunk.game_id,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 89.99,
      currency: 'PLN',
      status: 'CANCELLED',
      created_at: new Date('2024-12-18T14:15:00'),
      completed_at: null,
      user_id: emma.user_id,
      game_id: hades.game_id,
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
