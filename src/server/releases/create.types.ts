export interface CreateBody {
    id: string
    authorId: string
    name: string
    description?: string
    tags?: string[]    
}

export interface CreateResult {
    id: string
}