import { ParsedUrlQuery } from "querystring";
export interface Query extends ParsedUrlQuery {
    page: string;
    take: string;
    filter?: string;
    sortField?: string;
}