class Conversation {
	constructor(id, imageUrl, content, englishContent, category,date,tags) {
		this.id = id
		this.imageUrl = imageUrl
		this.content = content
		this.englishContent = englishContent
		this.category = category
		this.date = date
		this.tags = tags
	}
}

export { Conversation }