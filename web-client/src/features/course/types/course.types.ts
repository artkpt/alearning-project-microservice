export type Course = {
    id: number ;
    thumbnailUrl: string;
    code: string;
    name: string;
    description: string
    createdAt: string;
    updatedAt: string
}

export type courseData = {
    id: number ;
    thumbnailUrl: string;
    code: string;
    name: string;
    lessons: Lesson[]
    description: string
    createdAt: string;
    updatedAt: string
}

export type Lesson = {
    id: number;
    title: string;
    courseId: number;
    videoUrl: string;
    createdAt: string;
    updatedAt: string;
    type?: string
}