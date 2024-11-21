import type { ER } from '@/lib/interfaces'
import { erRequestSchema, patientSchema } from '@/lib/zod'
import useSWR from 'swr'
import { z } from 'zod'

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

export function usePatients(erID: string) {
    const { data, error, isLoading, mutate } = useSWR(`/api/patient?erID=${erID}`, fetcher)

    return {
        patients: data as z.infer<typeof patientSchema>[],
        isLoading,
        isError: error,
        mutate
    }
}

export function useERRequests(erID: string) {
    const {data , error, isLoading, mutate } = useSWR(`/api/er-requests?erID=${erID}`, fetcher)

    return {
        erRequests: data as z.infer<typeof erRequestSchema>[],
        isLoading,
        isError: error,
        mutate
    }
}