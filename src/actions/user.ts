'use server'
import { db } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { stat } from "fs"
import { PrismaClient } from "../../prisma/prisma/client"
import { fi, se } from "date-fns/locale"
import { sub } from "date-fns"
import { SubscriptIcon } from "lucide-react"

export const onAuthenticateUser = async () => {
    try {
        const user=await currentUser()
        if(!user){
            return {status: '403' }
        }

        const existinguser= await db.user.findUnique({
            where:{
                clerkid: user.id,
            },
            include: {
                workspace:{
                    where: {
                        user:{
                            clerk: user.id,
                        },
                    },
                },
            },
        })
        if(existinguser){
            return{status: '200', user: existinguser  }
        }
        const newuser= await db.user.create({
            data:{
                clerkid: user.id,
                email: user.emailAddresses[0]?.emailAddress || '',
                firstname: user.firstName || '',
                lastname: user.lastName || '',
                image: user.imageUrl || '',
                studio: { create: {} },
                subscription: { create: {} },
                workspace: { create: {
                    name: `${user.firstName}'s Workspace`,
                    type: 'PERSONAL',
                } },
            },
            include: {workspace: {
                where: {
                    user:{
                        clerk: user.id,
                    },
                },
            },
            Subscription: {
                select: {
                    plan: true,
            }
        },
    } })
        
        if (newuser) {
            return { status: '201', user: newuser }
        }
        return { status: '404' }
    } catch (error) {
        return { status: '500' }
    }
}
