const config = require('../config')
const mysql = require('../tools/mysql')('wujingshucha')
const { uploader } = require('../qcloud')

async function uploadImage(ctx, next) {
	const data = await uploader(ctx.req)
	ctx.state.data = data
}

async function newConversation(ctx, next) {
	let conversation = JSON.stringify(ctx.request.body)
	let conversationId
	const table = 'conversation'
	await mysql(table)
		.insert({ detail: conversation })
		.then(ids => mysql(table).where('id', ids[0]).select())
		.then(conversations => {
			let conversation = conversations[0]
			let detail = JSON.parse(conversation.detail)
			detail.id = conversation.id
			conversationId = conversation.id
			return mysql(table)
				.where('id', conversationId)
				.update('detail', JSON.stringify(detail))
		})
		.then(() => {
			ctx.state.code = 0
		})
		.catch((err) => {
			ctx.state.code = -1
		})
}

module.exports = {
	uploadImage,
	newConversation
}