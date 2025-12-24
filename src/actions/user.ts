'use server'
import { db } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { stat } from "fs"


export const onAuthenticateUser = async () => {
    try {
        const user=await currentUser()
        if(!user){
            return {status: '403' }
        }

        const existingUser= await fetch(`http://localhost:3000/api/users/${user.id}`)
    } catch (error) {
        // Handle error
    }
}
