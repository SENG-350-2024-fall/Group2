import { ER } from '@/lib/interfaces'
import useSWR from 'swr'

export function fetcher(...args: Parameters<typeof fetch>) {
    return fetch(...args).then(res => res.json())
}

export function useERs() {
    const { data, error, isLoading } = useSWR('/api/ers', fetcher)

    return {
        ers: data as ER[],
        isLoading,
        isError: error
    }
}