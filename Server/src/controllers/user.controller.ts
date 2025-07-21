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

// Update user primary information
export const updateUserDetails = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, username, email } = req.body;
        const { id } = req.user;
        
        if (!firstName || !lastName || !username || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Check for unique email and username (excluding current user)
        const existingEmail = await client.user.findFirst({ where: { email, id: { not: id } } });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already in use" });
        }
        const existingUsername = await client.user.findFirst({ where: { username, id: { not: id } } });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already in use" });
        }
        const updatedUser = await client.user.update({
            where: { id },
            data: {firstName, lastName, username, email, lastprofileUpdate: new Date(),
            },
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
        res.status(200).json(updatedUser);
    } catch (e) {
        res.status(500).json({ message: "There was a hiccup on our end. Please try again" });
    }
} 