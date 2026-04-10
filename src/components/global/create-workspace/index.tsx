'use client' 
import React, { use } from 'react'
import { useQueryData } from '@/hooks/usequery'
import { getWorkspaces } from '@/actions/workspace'
import Modal from '../Modal'
import FolderPlusDuotone from '@/components/Icons/folder-plus-duotone'
import Workspaceform from '@/components/forms/workspace-form'
type Props = {}

const CreateWorkspace = (props: Props) => {
  const {data} = useQueryData(['user-workspaces'], getWorkspaces)

  const {data: plan}= data as {
    status: number,
    data: {
      subscription: {
        plan: 'pro' | 'free'
         }|null
        }
      }

return(
<Modal title="Create a workspace" description="Create a new workspace for your team." trigger={<button> <FolderPlusDuotone /> Create Workspace </button>}> <Workspaceform/></Modal>

)
  

 
}

export default CreateWorkspace