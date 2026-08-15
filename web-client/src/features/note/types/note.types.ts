export interface Note{
    id: number
    title: string
    visibility: string
    description: string
    content: string
    createdAt: string
    updatedAt: string
    topics: any[]
    owner: Owner
}

interface Owner{
    id: number
    username: string
}