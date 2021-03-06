const config = require('../config')
const mysql = require('../tools/mysql')('wujingshucha')
const { uploader } = require('../qcloud')
const table = 'conversation'

//上传图片
async function uploadImage(ctx, next) {
	const data = await uploader(ctx.req)
	ctx.state.data = data
}

//上传对话
async function newConversation(ctx, next) {
	let conversation = JSON.stringify(ctx.request.body)
	let conversationId
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

//获取对话
async function getConversations(ctx, next) {
	const { indexId, quantity } = ctx.request.body
	// console.log(`indexId:${indexId},quantity:${quantity}`)
	await mysql(table).select()
		.offset(indexId)
		.limit(quantity)
		.orderBy('id', 'desc')
		.then(res => ctx.state.data = res)
}

//获取某个类别的对话
async function getCategory(ctx, next) {
	const { category } = ctx.request.body
	await mysql(table).select()
		.whereRaw("detail->'$.category'=?", [category])
		.orderBy('id','desc')
		.then(res => ctx.state.data = res)
}

module.exports = {
	uploadImage,
	newConversation,
	getConversations,
	getCategory
}