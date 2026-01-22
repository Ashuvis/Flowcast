import React from 'react'
import { useSearch } from '@/hooks/use-Search'
import { useMutation } from '@tanstack/react-query'

type Props = {
    workspaceId:string
}

const searchuser = ({workspaceId}: Props) => {
    const {query,onUsers,isFetching,onSearchQuery}=useSearch("search-users","USERS")

    const{}=useMutationData



  return (

    <div>searchuser</div>
  )
}

export default searchuser