import {z} from 'zod';

export const registerSchema = z.object({
    email: z.string().min(1,'Email is required').email('Invalid email format'),
    password: z.string().min(8,'password must be greater than 8').max(25,'password should less than 25'),
    name: z.string().min(2,'name must be >2').max(25,'Name max allowed character is 25').trim()
})