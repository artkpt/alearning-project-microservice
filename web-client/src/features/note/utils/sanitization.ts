export function mapToNote(noteResponse: any){
    return {
        id: noteResponse.id,
        title: noteResponse.title,
        visibility: noteResponse.visibility,
        description: noteResponse.description ?? "",
        createdAt: noteResponse.createdAt,
        updatedAt: noteResponse.updatedAt,
        topics: noteResponse.topics,
        owner: noteResponse.owner,
    }
}