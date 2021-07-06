export interface GetParams {
    id: string;
}

export interface GetResult {
    id: string
    authorId: string
    name: string
    description?: string
    tags?: string[]    
}
