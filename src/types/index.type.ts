export type workspaceProps = {
    data: {
        subscription: {
            plan:'free' | 'pro' | 'enterprise',
        }|null,
        workspace: {
            id: string,
            name: string,
            type:'public' | 'personal',
        }[]
        members: {
            workspace:{
                id: string,
                name: string,
                type:'public' | 'personal',
            }
        }[]
    }
}