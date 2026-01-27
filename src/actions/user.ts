"use server"
import { db } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { da } from "date-fns/locale"

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser()
    if (!user) {
      return { status: 403 }
    }

    if (!db || !(db as any).user) {
      return { status: 500, error: 'Prisma client not initialized or `user` model missing' }
    }

    let userExist
    try {
      userExist = await db.user.findUnique({
        where: {
          clerkid: user.id,
        },
        include: {
          workspace: true,
        },
      })
      if (userExist) {
        return { status: 200, user: userExist }
      }

      // If not found by clerkid, try by email
      const userByEmail = await db.user.findUnique({
        where: {
          email: user.emailAddresses[0].emailAddress,
        },
        include: {
          workspace: true,
        },
      })
      if (userByEmail) {
        // Update the clerkid if we found by email
        const updated = await db.user.update({
          where: { email: user.emailAddresses[0].emailAddress },
          data: { clerkid: user.id },
          include: { workspace: true },
        })
        return { status: 200, user: updated }
      }
    } catch (err: any) {
      return { status: 500, error: err?.message || String(err) }
    }

    try {
      const newUser = await db.user.create({
        data: {
          clerkid: user.id,
          email: user.emailAddresses[0].emailAddress,
          firstname: user.firstName,
          lastname: user.lastName,
          image: user.imageUrl,
          studio: {
            create: {},
          },
          subscription: {
            create: {},
          },
          workspace: {
            create: {
              name: `${user.firstName}'s Workspace`,
              type: 'PERSONAL',
            },
          },
        },
        include: {
          workspace: true,
          subscription: {
            select: {
              plan: true,
            },
          },
        },
      })
      if (newUser) {
        return { status: 201, user: newUser }
      }
    } catch (err: any) {
      return { status: 500, error: err?.message || String(err) }
    }

    return { status: 400 }
  } catch (error: any) {
    return { status: 500, error: error?.message || String(error) }
  }
} 

export const getNotifications = async () => {
  try {
    const user = await currentUser()
    if(!user) return { status: 404 }
    const notifications = await db.user.findUnique({

      where:{
        clerkid: user.id
      },
      select:{
        notification:true,
        _count:{ select:{ notification:true }}
      }
    })
    if(notifications && notifications.notification.length > 0) return { status: 200, data: notifications  }
    return { status: 404, data: [] }
  } catch (error) {
    return { status: 400, data: [] }
  }
}

export const searchUsers=async (query: string)=>{
  try {
      const user = await currentUser()
      if(!user) return { status: 404 }
      const users = await db.user.findMany({ 
        where:{
          OR:[
            {firstname:{contains:query,mode:'insensitive'}},
            {email:{contains:query,mode:'insensitive'}},
            {lastname:{contains:query,mode:'insensitive'}},
          ],
          NOT:[{clerkid:user.id}]
        },
        select:{
          id:true,
          subscription:{
            select:{
              plan:true
            }
          },
          firstname:true,
          lastname:true,
          image:true,
          email:true
        }
      })

      if(users && users.length > 0) return { status: 200, data: users }
      return { status: 404, data:undefined }
  } catch (error) {
      return { status: 500, data: undefined }
  }
}