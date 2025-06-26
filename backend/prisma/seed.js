const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🌱 Starting database seed...');

    // Clear existing data in correct order (due to foreign key constraints)
    console.log('🧹 Clearing existing data...');
    await prisma.review.deleteMany({});
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.gameImage.deleteMany({});
    await prisma.game.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.user.deleteMany({});

    // Reset sequences
    await prisma.$executeRaw`ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    await prisma.$executeRaw`ALTER SEQUENCE categories_id_seq RESTART WITH 1;`;
    await prisma.$executeRaw`ALTER SEQUENCE games_id_seq RESTART WITH 1;`;
    await prisma.$executeRaw`ALTER SEQUENCE game_images_id_seq RESTART WITH 1;`;
    await prisma.$executeRaw`ALTER SEQUENCE orders_id_seq RESTART WITH 1;`;
    await prisma.$executeRaw`ALTER SEQUENCE order_items_id_seq RESTART WITH 1;`;
    await prisma.$executeRaw`ALTER SEQUENCE reviews_id_seq RESTART WITH 1;`;

    // Seed Categories
    console.log('📂 Creating categories...');
    const categories = await prisma.category.createMany({
      data: [
        {
          name: 'Sandbox',
          slug: 'sandbox',
          description: 'Creative building and exploration games where players can construct, modify, and interact with virtual worlds.',
          image_url: '/images/categories/sandbox.jpg'
        },
        {
          name: 'Battle Royale',
          slug: 'battle-royale',
          description: 'Competitive multiplayer games where players fight to be the last one standing.',
          image_url: '/images/categories/battle-royale.jpg'
        },
        {
          name: 'FPS',
          slug: 'fps',
          description: 'First-person shooter games featuring gunplay and tactical combat.',
          image_url: '/images/categories/fps.jpg'
        },
        {
          name: 'Action Adventure',
          slug: 'action-adventure',
          description: 'Games combining action-packed combat with exploration and story-driven adventures.',
          image_url: '/images/categories/action-adventure.jpg'
        },
        {
          name: 'Horror',
          slug: 'horror',
          description: 'Scary and suspenseful games designed to frighten and create tension.',
          image_url: '/images/categories/horror.jpg'
        },
        {
          name: 'Racing',
          slug: 'racing',
          description: 'Vehicle-based competitive games focused on speed and racing mechanics.',
          image_url: '/images/categories/racing.jpg'
        },
        {
          name: 'Online Platform',
          slug: 'online-platform',
          description: 'Games that serve as platforms for user-generated content and social interaction.',
          image_url: '/images/categories/online-platform.jpg'
        },
        {
          name: 'Action RPG',
          slug: 'action-rpg',
          description: 'Role-playing games with real-time combat and character progression systems.',
          image_url: '/images/categories/action-rpg.jpg'
        }
      ]
    });
    console.log(`✅ Created ${categories.count} categories`);

    // Get category IDs for games
    const categoryMap = {};
    const allCategories = await prisma.category.findMany();
    allCategories.forEach(cat => {
      categoryMap[cat.slug] = cat.id;
    });

    // Seed Games
    console.log('🎮 Creating games...');
    const games = [
      {
        title: 'Minecraft',
        description: 'Minecraft is a 2011 sandbox game developed and published by Mojang Studios. The game allows players to build and destroy various types of blocks in a 3D procedurally generated world. Players can explore the world, gather resources, craft items, and build structures or earthworks.',
        price: 29.99,
        discount_price: null,
        category_id: categoryMap['sandbox'],
        developer: 'Mojang Studios',
        publisher: 'Microsoft Studios',
        release_date: new Date('2011-11-18'),
        rating: 'E10+',
        platform: 'PC, PlayStation, Xbox, Nintendo Switch',
        stock_quantity: 100,
        featured: true
      },
      {
        title: 'Fortnite',
        description: 'Fortnite is a free-to-play battle royale game developed by Epic Games. Drop into a massive 100-player PvP battle where strategy and quick thinking are essential for survival. Build structures, find weapons, and be the last player standing.',
        price: 0.00,
        discount_price: null,
        category_id: categoryMap['battle-royale'],
        developer: 'Epic Games',
        publisher: 'Epic Games',
        release_date: new Date('2017-07-21'),
        rating: 'T',
        platform: 'PC, PlayStation, Xbox, Nintendo Switch',
        stock_quantity: 100,
        featured: true
      },
      {
        title: 'Counter-Strike 2',
        description: 'Counter-Strike 2 is a free-to-play tactical first-person shooter developed by Valve. The game features classic Counter-Strike gameplay with enhanced graphics, improved audio, and redesigned maps built on the Source 2 engine.',
        price: 0.00,
        discount_price: null,
        category_id: categoryMap['fps'],
        developer: 'Valve',
        publisher: 'Valve',
        release_date: new Date('2023-09-27'),
        rating: 'M',
        platform: 'PC',
        stock_quantity: 100,
        featured: true
      },
      {
        title: 'Call of Duty: Black Ops 6',
        description: 'Call of Duty: Black Ops 6 is a 2024 first-person shooter developed by Treyarch and Raven Software. The game features a gripping campaign, competitive multiplayer, and the return of Zombies mode with new maps and features.',
        price: 69.99,
        discount_price: 59.99,
        category_id: categoryMap['fps'],
        developer: 'Treyarch, Raven Software',
        publisher: 'Activision',
        release_date: new Date('2024-10-25'),
        rating: 'M',
        platform: 'PC, PlayStation, Xbox',
        stock_quantity: 100,
        featured: true
      },
      {
        title: 'ROBLOX',
        description: 'Roblox is an online game platform and game creation system that allows users to program and play games created by themselves or other users. With millions of games across every genre imaginable, there\'s always something new to discover.',
        price: 0.00,
        discount_price: null,
        category_id: categoryMap['online-platform'],
        developer: 'Roblox Corporation',
        publisher: 'Roblox Corporation',
        release_date: new Date('2006-09-01'),
        rating: 'E10+',
        platform: 'PC, Xbox, PlayStation',
        stock_quantity: 100,
        featured: true
      },
      {
        title: 'Monster Hunter Wilds',
        description: 'Monster Hunter Wilds is an upcoming action RPG developed by Capcom. Experience the pinnacle of hunting action as you track, battle, and conquer massive monsters in stunning new environments. Features enhanced combat mechanics and cooperative gameplay.',
        price: 59.99,
        discount_price: 47.99,
        category_id: categoryMap['action-rpg'],
        developer: 'Capcom',
        publisher: 'Capcom',
        release_date: new Date('2025-02-28'),
        rating: 'T',
        platform: 'PC, PlayStation 5, Xbox Series X/S',
        stock_quantity: 100,
        featured: true
      },
      {
        title: 'Ghost of Yōtei',
        description: 'Ghost of Yōtei is an upcoming action-adventure game developed by Sucker Punch Productions. Set more than three centuries after Ghost of Tsushima, explore a new story of honor, sacrifice, and the way of the samurai in feudal Japan.',
        price: 69.99,
        discount_price: null,
        category_id: categoryMap['action-adventure'],
        developer: 'Sucker Punch Productions',
        publisher: 'Sony Interactive Entertainment',
        release_date: new Date('2025-10-15'),
        rating: 'M',
        platform: 'PlayStation 5',
        stock_quantity: 100,
        featured: true
      },
      {
        title: 'Grand Theft Auto VI',
        description: 'Grand Theft Auto VI is an upcoming action-adventure game developed by Rockstar Games. Return to Vice City in this highly anticipated sequel featuring an open world, compelling characters, and the signature GTA gameplay experience.',
        price: 79.99,
        discount_price: null,
        category_id: categoryMap['action-adventure'],
        developer: 'Rockstar Games',
        publisher: 'Rockstar Games',
        release_date: new Date('2026-05-15'),
        rating: 'M',
        platform: 'PC, PlayStation 5, Xbox Series X/S',
        stock_quantity: 100,
        featured: true
      },
      {
        title: 'Mario Kart 8 Deluxe',
        description: 'Mario Kart 8 Deluxe is a kart racing game developed by Nintendo. Race against friends and family with beloved Nintendo characters across beautifully designed tracks. Features both local and online multiplayer for endless fun.',
        price: 59.99,
        discount_price: 49.99,
        category_id: categoryMap['racing'],
        developer: 'Nintendo EPD',
        publisher: 'Nintendo',
        release_date: new Date('2017-04-28'),
        rating: 'E',
        platform: 'Nintendo Switch',
        stock_quantity: 100,
        featured: false
      },
      {
        title: 'Phasmophobia',
        description: 'Phasmophobia is a 4-player online co-op psychological horror game developed by Kinetic Games. Use ghost-hunting equipment to investigate paranormal activity and identify different types of ghosts. Work together to gather evidence and survive.',
        price: 19.99,
        discount_price: 13.99,
        category_id: categoryMap['horror'],
        developer: 'Kinetic Games',
        publisher: 'Kinetic Games',
        release_date: new Date('2020-09-18'),
        rating: 'T',
        platform: 'PC, PlayStation VR2',
        stock_quantity: 100,
        featured: false
      }
    ];

    for (const game of games) {
      await prisma.game.create({ data: game });
    }
    console.log(`✅ Created ${games.length} games`);

    // Seed Game Images
    console.log('🖼️  Creating game images...');
    const gameImages = [];
    for (let i = 1; i <= 10; i++) {
      gameImages.push(
        {
          game_id: i,
          url: `/images/games/${i}-cover.jpg`,
          alt_text: `${games[i-1].title} Cover`,
          is_primary: true
        },
        {
          game_id: i,
          url: `/images/games/${i}-screenshot-1.jpg`,
          alt_text: `${games[i-1].title} Screenshot 1`,
          is_primary: false
        },
        {
          game_id: i,
          url: `/images/games/${i}-screenshot-2.jpg`,
          alt_text: `${games[i-1].title} Screenshot 2`,
          is_primary: false
        }
      );
    }

    await prisma.gameImage.createMany({
      data: gameImages
    });
    console.log(`✅ Created ${gameImages.length} game images`);

    // Seed Sample Users
    console.log('👥 Creating sample users...');
    const users = await prisma.user.createMany({
      data: [
        {
          email: 'john.doe@email.com',
          password_hash: '$2a$12$p3IRzgNyokAVfRpr4hQPo.LnssIvS3ilw2VLTemFMiKfuRXHOob8G', // password123
          first_name: 'John',
          last_name: 'Doe'
        },
        {
          email: 'jane.smith@email.com',
          password_hash: '$2a$12$p3IRzgNyokAVfRpr4hQPo.LnssIvS3ilw2VLTemFMiKfuRXHOob8G', // password123
          first_name: 'Jane',
          last_name: 'Smith'
        },
        {
          email: 'gamer@email.com',
          password_hash: '$2a$12$p3IRzgNyokAVfRpr4hQPo.LnssIvS3ilw2VLTemFMiKfuRXHOob8G', // password123
          first_name: 'Alex',
          last_name: 'Gamer'
        }
      ]
    });
    console.log(`✅ Created ${users.count} sample users`);

    // Seed Sample Orders
    console.log('📦 Creating sample orders...');
    const sampleOrders = [
      {
        user_id: 1,
        total_amount: 89.98,
        status: 'DELIVERED',
        shipping_address: '123 Main St, City, State 12345'
      },
      {
        user_id: 2,
        total_amount: 59.99,
        status: 'SHIPPED',
        shipping_address: '456 Oak Ave, City, State 67890'
      },
      {
        user_id: 3,
        total_amount: 13.99,
        status: 'PENDING',
        shipping_address: '789 Pine Rd, City, State 54321'
      }
    ];

    for (const order of sampleOrders) {
      await prisma.order.create({ data: order });
    }
    console.log(`✅ Created ${sampleOrders.length} sample orders`);

    // Seed Sample Order Items
    console.log('📋 Creating sample order items...');
    const orderItems = [
      // Order 1 items
      { order_id: 1, game_id: 1, quantity: 1, price: 29.99 }, // Minecraft
      { order_id: 1, game_id: 4, quantity: 1, price: 59.99 }, // COD Black Ops 6
      // Order 2 items
      { order_id: 2, game_id: 9, quantity: 1, price: 59.99 }, // Mario Kart
      // Order 3 items
      { order_id: 3, game_id: 10, quantity: 1, price: 13.99 } // Phasmophobia
    ];

    await prisma.orderItem.createMany({
      data: orderItems
    });
    console.log(`✅ Created ${orderItems.length} order items`);

    // Seed Sample Reviews
    console.log('⭐ Creating sample reviews...');
    const reviews = [
      {
        user_id: 1,
        game_id: 1, // Minecraft
        rating: 5,
        comment: 'Amazing game! Hours of creative fun. The building mechanics are incredibly satisfying.'
      },
      {
        user_id: 2,
        game_id: 1, // Minecraft
        rating: 4,
        comment: 'Great game for creativity, though it can be overwhelming for beginners.'
      },
      {
        user_id: 1,
        game_id: 2, // Fortnite
        rating: 4,
        comment: 'Fun battle royale with friends, but the skill ceiling is quite high.'
      },
      {
        user_id: 3,
        game_id: 3, // Counter-Strike 2
        rating: 5,
        comment: 'Classic tactical shooter perfected. Great graphics upgrade from the original.'
      },
      {
        user_id: 2,
        game_id: 10, // Phasmophobia
        rating: 5,
        comment: 'Terrifying co-op experience! Perfect for playing with friends who like horror games.'
      },
      {
        user_id: 3,
        game_id: 9, // Mario Kart 8 Deluxe
        rating: 5,
        comment: 'Perfect party game! Great for all ages and skill levels.'
      }
    ];

    await prisma.review.createMany({
      data: reviews
    });
    console.log(`✅ Created ${reviews.length} sample reviews`);

    console.log('🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`• ${categories.count} categories`);
    console.log(`• ${games.length} games`);
    console.log(`• ${gameImages.length} game images`);
    console.log(`• ${users.count} users`);
    console.log(`• ${sampleOrders.length} orders`);
    console.log(`• ${orderItems.length} order items`);
    console.log(`• ${reviews.length} reviews`);
    console.log('\n🔐 Sample user credentials (password: password123):');
    console.log('• john.doe@email.com');
    console.log('• jane.smith@email.com');
    console.log('• gamer@email.com');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
