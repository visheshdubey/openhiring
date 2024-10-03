export interface Pagination {
    page: number;
    pageSize: number;
    totalItems: number;
}

export interface FormattedResponse {
    status: string;
    data: any;
    pagination?: Pagination;
}