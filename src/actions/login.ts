'use server';

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    // Validate input fields
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields' };
    }

    const { email, password } = validatedFields.data;

    try {
        // Attempt to sign in
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false, // Prevent automatic redirect to handle response manually
        });

        // Handle sign-in result
        if (result?.error) {
            return { error: 'Invalid credentials' };
        }

        // Sign-in successful
        return { success: 'Successfully signed in', redirectTo: '/' };

    } catch (error) {
        // Check for specific authentication errors
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials' };
                default:
                    return { error: 'An error occurred' };
            }
        }

        // Handle unexpected errors
        return { error: 'An unexpected error occurred' };
    }
}
