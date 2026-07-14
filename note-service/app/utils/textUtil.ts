function escapeLike(text: string): string{
    if(!text) return ''
    return text.replace(/([%_\\])/g, "\\$1")
}


export {escapeLike}