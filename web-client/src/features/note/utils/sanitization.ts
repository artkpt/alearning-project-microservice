export function mapToNote(noteResponse: any){
    return {
        id: noteResponse.id,
        title: noteResponse.title,
        visibility: noteResponse.visibility,
        ownerId: noteResponse.ownerId,
        description: noteResponse.description ?? "",
        content: noteResponse.content ?? "",
        createdAt: noteResponse.createdAt,
        updatedAt: noteResponse.updatedAt,
        topics: noteResponse.topics,
        owner: noteResponse.owner,
    }
}