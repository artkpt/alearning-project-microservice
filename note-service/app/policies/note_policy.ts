import User from '#models/user'
import Note from '#models/note'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class NotePolicy extends BasePolicy {
    viewPivateNote(user:User, note:Note){
        return user.id === note.ownerId
    }

    deleteNote(user:User, note:Note){
        return user.id === note.ownerId
    }

    editNote(user:User, note:Note){
        return user.id === note.ownerId
    }
}