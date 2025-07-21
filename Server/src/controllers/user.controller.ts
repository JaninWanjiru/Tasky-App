import {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

// getting user details
export const getUserDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.user;
        const user = await client.user.findUnique({
            where: { id },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                avatar: true,
                dateJoined: true,
                lastprofileUpdate: true,
                isDeleted: true
            }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({message: "There was a hiccup on our end. Please try again"})
    }
}