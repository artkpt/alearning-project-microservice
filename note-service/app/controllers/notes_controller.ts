import type { HttpContext } from '@adonisjs/core/http'

// import { NoteService } from "#services/note_service";
// import { inject } from '@adonisjs/core'
import Note from '#models/note';
import Tag from '#models/tag';
import db from '@adonisjs/lucid/services/db';
import { noteValidator } from '#validators/noteValidator';

// @inject()
export default class NotesController {
    // private noteService: NoteService = new NoteService()
    // constructor(private noteService: NoteService) {}

    async getPublicNotes({auth}:HttpContext){
        await auth.check()
        const notes = Note.query().where('visibility', 'public')
                                    .where('isShadow', false)
                                    .preload('topics')
                                    .preload('owner')

        if(auth.isAuthenticated){
            notes.orWhere('ownerId', auth.user?.id)
        }

        return notes.exec()
    }

    async getNoteById({params, bouncer, auth}:HttpContext){
        await auth.check()
        const noteId = params.id
        const note = await Note.query().where('id',noteId)
                                    .preload('topics')
                                    .preload('owner')
                                    .first()
        
        if(note?.visibility === "private"){
            await bouncer.with('NotePolicy').authorize('viewPivateNote', note)
        }

        return note
    }

    async createNote({auth, request, response}:HttpContext){
        const noteBody = await request.validateUsing(noteValidator)
        const user = auth.getUserOrFail()
       
        const newNote = await db.transaction(async (trx)=>{
            const newNote = new Note()
            
            newNote.title = noteBody.title
            newNote.slug = noteBody.title + crypto.randomUUID()
            newNote.visibility = noteBody.visibility
            newNote.ownerId = user.id
            newNote.isShadow = false
            newNote.description = noteBody.description
            newNote.content = noteBody.content
            
            // ผูก model instance เข้ากับ transcation
            newNote.useTransaction(trx)
            await newNote.save()

            // หรือ ผูก model instance เข้ากับ transcation ทันที ด้วย { client: trx }
            for(let tag of noteBody.topic_id){
                await Tag.create({
                    noteId: newNote.id,
                    topicId: tag
                }, { client: trx })
            }
           
            return newNote

        })

        return response.created(newNote)
    }

    async deleteNote({params, bouncer}:HttpContext){
        const noteId = params.id

        const delNote = await Note.query().where('id', noteId).first()
        await bouncer.with('NotePolicy').authorize('deleteNote', delNote)
        await delNote?.delete()
        
        return delNote
    }

    async editNote({params, request, bouncer}:HttpContext){
        const noteBody = await request.validateUsing(noteValidator)
        const noteId = params.id

        const editedNote = await db.transaction(async (trx)=>{

            let note = await Note.query().where('id',noteId).first()
            await bouncer.with('NotePolicy').authorize('editNote',note)
            
            if(note){
                note.title = noteBody.title
                note.slug = noteBody.title + crypto.randomUUID()
                note.visibility = noteBody.visibility
                note.isShadow = false
                note.description = noteBody.description
                note.content = noteBody.content

                note.useTransaction(trx)
                await note?.save()

                const tags = await Tag.query().where('noteId', noteId)
                for (const tag of tags) {
                    tag.useTransaction(trx)
                    await tag.delete()
                }
                
                for(let tag of noteBody.topic_id){
                        await Tag.create({
                            noteId: note.id,
                            topicId: tag
                        }, { client: trx })
                }

                return note               
            }
        })

        return editedNote
    }


}