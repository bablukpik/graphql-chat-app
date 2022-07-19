import { PrismaClient } from '@prisma/client';
import { AuthenticationError } from 'apollo-server';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    
  },
  Mutation: {
    signup: async (_, { user: userData }) => {
      const { email, password, } = userData;
      const foundUser = await prisma.user.findUnique({ where: { email }});
      if (foundUser) throw new AuthenticationError('User already exists!');
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword
        },
      });
      return createdUser;
    }
  }
};

export default resolvers;