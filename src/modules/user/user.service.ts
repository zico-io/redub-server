import prisma from "../../utils/prisma"
import { CreateUserInput } from "./user.schema";
import bcrypt from 'bcrypt';

export const createUser = async (input: CreateUserInput) => {

    const {password, ...rest} = input;

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { ...rest, password: hash },
    });

    return user;
}