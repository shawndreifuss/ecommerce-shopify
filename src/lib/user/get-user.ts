
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function getUserWithCustomer(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        shopifyCustomer: true, 
      },
    });

    return user;
  } catch (error) {
    console.error('Error fetching user with ShopifyCustomer:', error);
    throw new Error('Failed to fetch user data');
  }
}
