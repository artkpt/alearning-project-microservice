import vine from '@vinejs/vine'

const schema = vine.object({
    name: vine.string().maxLength(255).unique({table: "topics", column: "name"}),
})

export const topicValidator = vine.compile(schema)