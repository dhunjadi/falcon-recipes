import {ZodType, z} from 'zod';
import {LoginForm, NewRecipeForm, RegisterForm} from './types';

export const loginPageValidationSchema: ZodType<LoginForm> = z.object({
    email: z.string().email(),
    password: z.string(),
});

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

export const registerValidationSchema: ZodType<RegisterForm> = z
    .object({
        name: z.string(),
        email: z.string().email(),
        password: z
            .string()
            .min(6, 'Passwords must be at least 6 characters long')
            .max(20, 'Password can have up to 20 characters')
            .refine((value) => passwordRegex.test(value), {
                message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: "Password don't match",
    });

export const newRecipeValidationSchema: z.ZodType<NewRecipeForm> = z.object({
    title: z.string(),
    dateCreated: z.string(),
    authorId: z.string(),
    instructions: z.array(
        z.object({
            instruction: z.string().min(1).max(500), // Adjust the min and max length as needed
        })
    ),
    tags: z.array(
        z.object({
            tag: z.string().min(1).max(255), // Adjust the min and max length as needed
        })
    ),
});
