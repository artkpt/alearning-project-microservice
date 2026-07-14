export interface Note{
    id: number
    title: string
    slug: string
    visibility: string
    ownerId: number
    isShadow: boolean
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
    email: string
    role: string
    createdAt: string
    updatedAt: string
    isActive: number
    createdBy: number
    firstname: string
    lastname: string
}