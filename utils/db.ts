import { PrismaClient } from '@prisma/client';

// Global prisma client instance to avoid multiple connections in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Singleton pattern for Prisma client
export const prisma =
    globalForPrisma.prisma || new PrismaClient({ transactionOptions: { maxWait: 5000, timeout: 20000 } });

// Store prisma instance in global scope for non-production environments
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
