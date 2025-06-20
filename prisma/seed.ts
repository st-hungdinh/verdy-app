import { PrismaClient, Role } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create Partners first
  console.log('👥 Creating partners...');

  const partners = await Promise.all([
    prisma.partner.create({
      data: {
        name: 'Acme Corporation',
        shortName: 'ACME',
        priority: 1,
        seatingQuota: 100,
        parkingQuota: 50,
        isUniform: true,
      },
    }),
    prisma.partner.create({
      data: {
        name: 'TechStart Inc',
        shortName: 'TECH',
        priority: 2,
        seatingQuota: 75,
        parkingQuota: 30,
        isUniform: false,
      },
    }),
    prisma.partner.create({
      data: {
        name: 'Global Dynamics',
        shortName: 'GD',
        priority: 3,
        seatingQuota: 150,
        parkingQuota: 80,
        isUniform: true,
      },
    }),
    prisma.partner.create({
      data: {
        name: 'Innovation Labs',
        priority: 4,
        seatingQuota: 25,
        parkingQuota: 15,
        isUniform: false,
      },
    }),
  ]);

  console.log(`✅ Created ${partners.length} partners`);

  // Create Admin and Operator accounts (not associated with partners)
  console.log('👤 Creating admin and operator accounts...');

  const adminAccounts = await Promise.all([
    prisma.account.create({
      data: {
        email: 'admin@verdy.com',
        password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeOGXy6cWbzgdHK4e', // hashed 'password123'
        role: Role.ADMIN,
      },
    }),
    prisma.account.create({
      data: {
        email: 'operator@verdy.com',
        password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeOGXy6cWbzgdHK4e', // hashed 'password123'
        role: Role.OPERATOR,
      },
    }),
    prisma.account.create({
      data: {
        email: 'john.admin@verdy.com',
        password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeOGXy6cWbzgdHK4e', // hashed 'password123'
        role: Role.ADMIN,
      },
    }),
  ]);

  console.log(`✅ Created ${adminAccounts.length} admin/operator accounts`);

  // Create Partner accounts (associated with partners)
  console.log('🤝 Creating partner accounts...');

  const partnerAccounts = await Promise.all([
    // Acme Corporation accounts
    prisma.account.create({
      data: {
        email: 'manager@acme.com',
        password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeOGXy6cWbzgdHK4e',
        role: Role.PARTNER,
        partnerId: partners[0].id,
      },
    }),
    prisma.account.create({
      data: {
        email: 'contact@acme.com',
        password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeOGXy6cWbzgdHK4e',
        role: Role.PARTNER,
        partnerId: partners[0].id,
      },
    }),
    // TechStart Inc accounts
    prisma.account.create({
      data: {
        email: 'lead@techstart.com',
        password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeOGXy6cWbzgdHK4e',
        role: Role.PARTNER,
        partnerId: partners[1].id,
      },
    }),
    // Global Dynamics account
    prisma.account.create({
      data: {
        email: 'admin@globaldynamics.com',
        password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeOGXy6cWbzgdHK4e',
        role: Role.PARTNER,
        partnerId: partners[2].id,
      },
    }),
    // Innovation Labs account
    prisma.account.create({
      data: {
        email: 'team@innovationlabs.com',
        password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeOGXy6cWbzgdHK4e',
        role: Role.PARTNER,
        partnerId: partners[3].id,
      },
    }),
  ]);

  console.log(`✅ Created ${partnerAccounts.length} partner accounts`);

  // Summary
  console.log('\n📊 Seed Summary:');
  console.log(`Partners: ${partners.length}`);
  console.log(`Admin/Operator Accounts: ${adminAccounts.length}`);
  console.log(`Partner Accounts: ${partnerAccounts.length}`);
  console.log(`Total Accounts: ${adminAccounts.length + partnerAccounts.length}`);

  console.log('\n🎉 Seed completed successfully!');
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
