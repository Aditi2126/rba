import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createAdminUsers() {
  try {
    const admins = [
      { email: 'aditya@example.com', password: 'password_for_aditya' },
      { email: 'rohan@example.com', password: 'password_for_rohan' }
    ];

    for (const admin of admins) {
      console.log(`Hashing password for admin: ${admin.email}`);
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      console.log(`Hashed Password: ${hashedPassword}`);

      // Insert the admin with the hashed password
      await prisma.admin.create({
        data: {
          email: admin.email,
          password: hashedPassword,
        }
      });

      console.log(`Admin user ${admin.email} created successfully.`);
    }
  } catch (error) {
    console.error('Error creating admin users:', error);
  } finally {
    await prisma.$disconnect();
    console.log('Database connection closed.');
  }
}

createAdminUsers();
