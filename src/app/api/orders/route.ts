import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET method to fetch a single order by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id;
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        products: { include: { product: true } },
        payment: true,
        shipping: true,
      },
    });

    if (!order) {
      return new NextResponse('Order not found', { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return new NextResponse('Failed to fetch order', { status: 500 });
  }
}

// PUT method to update a specific order by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id;
    const data = await req.json();

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data,
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    return new NextResponse('Failed to update order', { status: 500 });
  }
}

// DELETE method to delete a specific order by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id;

    await prisma.order.delete({
      where: { id: orderId },
    });

    return new NextResponse('Order deleted', { status: 204 });
  } catch (error) {
    console.error('Error deleting order:', error);
    return new NextResponse('Failed to delete order', { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const orderData = await req.json();  // Parse the incoming request body

    // Validate if the necessary data is present
    if (!orderData.user.id) {
      throw new Error("User ID is missing");
    }

    // Build the data object for Prisma `order.create`
    const data: any = {
      user: {
        connect: {
          id: orderData.user.id, // Use `connect` to link to an existing user
        },
      },
      products: {
        create: orderData.products.map((product: any) => ({
          product: {
            connectOrCreate: {
              where: { name: product.name },  // Ensure name or ID is provided
              create: {
                name: product.name,
                price: product.price,
                category: {
                  connectOrCreate: {
                    where: { name: product.categoryName }, // Ensure category name is provided
                    create: { name: product.categoryName },
                  },
                },
              },
            },
          },
          quantity: product.quantity,
        })),
      },
      payment: {
        create: {
          method: orderData.payment.method,
          status: orderData.payment.status,
          amount: orderData.payment.amount,
          cardLastFour: orderData.payment.cardLastFour,
        },
      },
      shipping: {
        create: {
          address: orderData.shipping.address,
          status: orderData.shipping.status,
        },
      },
      totalAmount: orderData.totalAmount,
      status: orderData.status,
      createdAt: new Date(orderData.createdAt),
      updatedAt: new Date(orderData.updatedAt),
    };

    // Add supplier if present
    if (orderData.supplier) {
      data.supplier = {
        connectOrCreate: {
          where: { name: orderData.supplier.connectOrCreate.where.name },
          create: { name: orderData.supplier.connectOrCreate.create.name },
        },
      };
    }

    // Create the order in the database
    const createdOrder = await prisma.order.create({ data });

    return NextResponse.json(createdOrder);
  } catch (error: unknown) {
    console.error('Error inserting orders:', error);
    return NextResponse.json(
      { error: `Failed to insert orders: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}









