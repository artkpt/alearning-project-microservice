import Note from "#models/note";

export class NoteService {
  // Your code here
  async getPublicNotes(){
    return await Note.query().where('visibility', 'public').where('isShadow', false)
  }

  
}