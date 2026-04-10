"use server"

import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/prisma"
import { ca } from "date-fns/locale"
import { SUBSCRIPTION_PLAN,Type} from "@prisma/client"


export const verifyAccessToWorkspace = async (workspaceId: string) => {
    try {
        const user = await currentUser()
        if (!user) return { status: 403 }

        const isUserInWorkspace = await db.workSpace.findUnique({
            where: {
                id: workspaceId,
                OR: [
                    {
                        User: {
                            clerkid: user.id,

                        },
                    },
                    {
                        members: {
                            every: {
                                User: {
                                    clerkid: user.id,
                                },
                            }
                        }
                    }
                ],
            }
        }
        )
        return {
            status: 200, data: {
                workspace: isUserInWorkspace
            }
        }
    } catch (error) {
        return {
            status: 403, data: {
                workspace: null
            }
        }
    }
}

export const getWorkspaceFolders = async (workSpaceId: string) => {
    try {
        const isFolders = await db.folder.findMany({
            where: {
                workSpaceId,
            },
            include: {
                _count: {
                    select: { videos: true }
                },
            },
        })
        if (isFolders && isFolders.length > 0) return { status: 200, data: isFolders }

        return { status: 404, data: [] }
    } catch (error) {
        return { status: 403, data: [] }
    }
}

export const getAllUserVideos = async (workSpaceId: string) => {
    try {
        const user = await currentUser()
        if (!user) return { status: 403, data: [] }
        const videos = await db.video.findMany({
            where: {
                OR: [{ workSpaceId }, { folderId: workSpaceId }],
            },
            select: {
                id: true,
                title: true,
                createdAt: true,
                source: true,
                processing: true,
                Folder: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                User:{
                    select:{
                        firstname:true,
                        lastname:true,
                        image:true,
                    }
                }
            },
            orderBy: {
                createdAt: 'asc',

            }
            
        })
        if (videos && videos.length > 0) return { status: 200, data: videos }
        return { status: 404 }
    }
    catch (error) {
        return { status: 400, data: [] }
    }
}

export const getWorkspaces = async () => {
    try {
        const user = await currentUser()
        if (!user) return { status: 403 }
        const workspaces = await db.user.findUnique({
            where: { clerkid: user.id },
            select: {
                subscription:{
                    select:{
                        plan:true,
                    }
                },
                workspace: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                    }
                },
                members: {
                    select: {
                        WorkSpace: {
                            select: {
                                id: true,
                                name: true, 
                                type: true,   
                            }
                        }
                    }

                }
            }
        })
        if (workspaces) return { status: 200, data: workspaces }
    }
    catch (error) {
        return { status: 400 }
    }
}

export const CreateWorkspace = async (name:string)=> {
  try {
    const user = await currentUser()
    if (!user) return { status: 404 }
    const authorized= await db.user.findUnique({
        where:{
            clerkid:user.id,},
            select:{
                subscription:{
                    select:{
                        plan:true,
                    }
                }
            }
    })

    if(authorized?.subscription?.plan === SUBSCRIPTION_PLAN.PRO){
        const newWorkspace = await db.user.update({
            where: { clerkid: user.id },
            data: { workspace: { create: { name,type: 'PUBLIC' } } }
        });

        if(newWorkspace) {
            return { status: 201, data:"workspace created" }
        }
    }
     return { status: 401, data:"upgrade to pro to create more workspaces" }

  } catch (error) {
    return { status: 400, data:"an error occurred while creating workspace" }
  }
}