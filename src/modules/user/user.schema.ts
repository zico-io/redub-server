import { z } from "zod";

const userCore = {
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    }).email(),
    name: z.string(),
}

const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    })
})

export type CreateUserInput = z.infer<typeof createUserSchema>;