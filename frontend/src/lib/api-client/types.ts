export interface PaginatedResponse<T> {
    data: T[]
    nextCursor: string
    hasMore: boolean
    totalCount: number
}