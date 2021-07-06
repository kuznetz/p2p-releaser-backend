export interface Querystring {
}

interface TagResponse {
    /** Внутренний ID */
    id: string
    /** Внутренний ID предка */
    parentId?: string
    /** Имя тега */
    name: string
}  

export interface Result {
    tags: TagResponse[]   
}
