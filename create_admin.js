const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'abdullahsyed574@gmail.com';
  const password = 'Syed@2003';
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const admin = await prisma.admins.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    console.log('Admin created successfully:', admin.email);
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('Admin already exists. Updating password instead...');
      const admin = await prisma.admins.update({
        where: { email },
        data: { password: hashedPassword },
      });
      console.log('Admin password updated successfully:', admin.email);
    } else {
      throw error;
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
