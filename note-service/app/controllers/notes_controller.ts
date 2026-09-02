import type { HttpContext } from '@adonisjs/core/http'

import Note from '#models/note';
import Tag from '#models/tag';
import db from '@adonisjs/lucid/services/db';
import { noteValidator } from '#validators/noteValidator';


export default class NotesController {
    async getPublicNotes({user}:HttpContext){
        const notes = Note.query().where('visibility', 'public')
                                    .preload('topics')

        if(user?.id){
            notes.orWhere('ownerId', user.id)
        }

        return notes.exec()
    }

    async getNoteById({params, bouncer, response, user}:HttpContext){
        const noteId = params.id
        const note = await Note.query().where('id',noteId)
                                    .preload('topics')
                                    .first()

        if(!note){
            return response.notFound({ message: 'Note not found' })
        }
        
        if(note.visibility === "private"){
            if (!user) {
                return response.unauthorized({ message: 'Please login to view this private note' })
            }
            await bouncer.with('NotePolicy').authorize('viewPivateNote', note)
        }

        return note
    }

    async createNote({user, request, response}:HttpContext){
        const noteBody = await request.validateUsing(noteValidator)
       
        const newNote = await db.transaction(async (trx)=>{
            const newNote = new Note()
            
            newNote.title = noteBody.title
            newNote.visibility = noteBody.visibility
            newNote.ownerId = user!.id
            newNote.description = noteBody.description
            newNote.content = noteBody.content
            newNote.lessonId = noteBody.lesson_id
            
            newNote.useTransaction(trx)
            await newNote.save()

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

    async deleteNote({params, bouncer, response}:HttpContext){
        const noteId = params.id

        const delNote = await Note.query().where('id', noteId).first()

        if(!delNote){
            return response.notFound({ message: 'Note not found' })
        }

        await bouncer.with('NotePolicy').authorize('deleteNote', delNote)
        await delNote?.delete()
        
        return response.noContent()
    }

    async editNote({params, request, bouncer, response}:HttpContext){
        const noteBody = await request.validateUsing(noteValidator)
        
        const noteId = params.id

        const editedNote = await db.transaction(async (trx)=>{

            let note = await Note.query().where('id',noteId).first()

            if(!note){
                return response.notFound({ message: 'Note not found' })
            }

            await bouncer.with('NotePolicy').authorize('editNote',note)
            
            if(note){
                note.title = noteBody.title
                note.visibility = noteBody.visibility
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

    async getNoteOfLesson({params, user}:HttpContext){
        const lessonId = params.lessonId
        const notes = await Note.query().where('lessonId',lessonId)
                                            .andWhere('ownerId', user!.id)

        return notes
                                
    }


}