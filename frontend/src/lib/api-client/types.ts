export interface PaginatedResponse<T> {
    data: T[]
    nextCursor: string
    hasMore: boolean
    total: number
}