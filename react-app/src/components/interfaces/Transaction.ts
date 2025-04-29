import { z } from "zod"

export interface Transaction {
    transactionId: number,
    accountId: number,
    description: string,
    amount: number,
    date: Date | null,
    customerId: number
}

export const zTransaction = z.object({
    transactionId: z.number(),
    accountId: z.number(),
    description: z.string().min(1, "Beschreibung ist erforderlich"),
    amount: z.number(),
    date: z.date(),
})

export interface TransactionDto {
    transactionId?: number,
    accountId: number,
    description: string,
    amount: number,
    date: string,
    customerId: number
}

export const emptyTransaction = {
    transactionId: 0,
    accountId: 0,
    description: "",
    amount: 0,
    date: null,
    customerId: 1
}