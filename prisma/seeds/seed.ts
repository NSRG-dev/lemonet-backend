import { PrismaClient } from '@prisma/client';
import { seedPermission } from './permission.seed';
import { seedRole } from './role.seed';
import { seedUser } from './user.seed';
import { s3Seed } from './s3.seed';
import { faqSeed } from './faq.seed';

const prisma = new PrismaClient();

async function main() {
  await s3Seed();
  console.log('[+] S3 created');

  await seedPermission(prisma);
  console.log('[+] Permissions created');

  await seedRole(prisma);
  console.log('[+] Roles created');

  await seedUser(prisma);
  console.log('[+] User created');

  await faqSeed(prisma);
  console.log('[+] Faq created');

  console.log('[+] All set');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
