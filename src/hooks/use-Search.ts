import type React from "react"
import { useEffect, useState } from "react";
import { useQueryData } from "./usequery"

export const useSearch = (key: string, type: "USERS") => {

    const [query, setQuery] = useState("")
    const [debounce, setDebounce] = useState("")
    const [onUsers, setonUsers] = useState<{
      firstName: ReactNode;
      lastName: ReactNode; id: string, subscription: { plan: "PRO" | "FREE" } | null,
     firstname: string|null ,
     lastname: string|null,
     image: string|null,
        email: string|null,
    }[]|undefined>(undefined)

    const onSearchQuery = (e:React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => { setDebounce(query) }, 1000)

        return () => clearTimeout(delayInputTimeoutId)
    }, [query])

    const { refetch, isFetching } = useQueryData(
        [key, debounce],
        async ({ queryKey }) => {
            if (type === "USERS") {
                const searchTerm = queryKey[1] as string
                if (!searchTerm) {
                    setonUsers(undefined)
                    return
                }

                const res = await fetch(`/api/search-users?q=${encodeURIComponent(searchTerm)}`, {
                    method: 'GET',
                    cache: 'no-store',
                })

                if (!res.ok) {
                    setonUsers(undefined)
                    return
                }

                const payload = await res.json()
                if (payload?.data) {
                    setonUsers(payload.data)
                } else {
                    setonUsers(undefined)
                }
            }
        },
        false
    )

    useEffect(() => {
        if (debounce) refetch()
        if (!debounce) setonUsers(undefined)
        return () => { debounce }
    }, [debounce, refetch])

    return { onSearchQuery, onUsers, isFetching, query }
};
