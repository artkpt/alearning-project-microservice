import vine from '@vinejs/vine'

const schema = vine.object({
    username: vine.string().regex(/^\S+$/)
                            .maxLength(50)
                            .unique({table: 'users', column: 'username'}),
    email: vine.string().unique({table: 'users', column: 'email'}).nullable(),
    password: vine.string(),
    firstname: vine.string().maxLength(50).nullable(),
    lastname: vine.string().maxLength(50).nullable(),
    role: vine.string()
})

export const userValidator = vine.compile(schema)