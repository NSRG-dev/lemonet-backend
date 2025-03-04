import { PrismaClient } from '@prisma/client';

export const faqSeed = async (prisma: PrismaClient) => {
  await prisma.faq.create({
    data: {
      question: 'What is the capital of France?',
      answer: 'Paris',
    },
  });
};
