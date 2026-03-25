import React from 'react'
import { useQueryData } from '@/hooks/usequery'
import { getWorkspaces } from '@/actions/workspace'
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


      
  return (
    <div>CreateWorkspace</div>
  )
}

export default CreateWorkspace