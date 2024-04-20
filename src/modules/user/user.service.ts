import prisma from "../../utils/prisma"
import { CreateUserInput } from "./user.schema";
// import bcrypt = require('bcrypt-ts');
import bcrypt from 'bcryptjs';

export const createUser = async (input: CreateUserInput) => {

    const {password, ...rest} = input;

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { ...rest, password: hash },
    });

    return user;
}

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {
            email,
        }
    })
}

export const findUserById = async (id: string) => {
    return prisma.user.findUnique({
        where: {
            id,
        }
    })
}

export const findUsers = async () => {
    return prisma.user.findMany({
        select: {
            email: true,
            username: true,
            id: true,
        }
    });
}