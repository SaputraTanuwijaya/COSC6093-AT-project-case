import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('admin123', saltRounds);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@quantum.com' },
    update: {},
    create: {
      email: 'admin@quantum.com',
      username: 'admin',
      password: hashedPassword,
      role: 'Admin',
    },
  });
  console.log(`Created admin user: ${adminUser.email}`);

  const product1 = await prisma.product.upsert({
    where: { id: 1 },
    update: {
      imageUrl: 'https://gs-dsp.com/images/quantum-delay-ui-mod-chooser.webp',
    },
    create: {
      id: 1,
      name: 'Quantum Design Bundle',
      description: 'A premium collection of 100+ design templates',
      price: 99.99,
      stock: 100,
      imageUrl: 'https://gs-dsp.com/images/quantum-delay-ui-mod-chooser.webp',
    },
  });
  console.log(`Created product: ${product1.name}`);
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
