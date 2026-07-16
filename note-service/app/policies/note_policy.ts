import Note from '#models/note'
import { BasePolicy } from '@adonisjs/bouncer'
import { GatewayUser } from '#middleware/context_auth_middleware'

export default class NotePolicy extends BasePolicy {
    viewPivateNote(user:GatewayUser, note:Note){
        return user.id === note.ownerId
    }

    deleteNote(user:GatewayUser, note:Note){
        return user.id === note.ownerId
    }

    editNote(user:GatewayUser, note:Note){
        return user.id === note.ownerId
    }
}