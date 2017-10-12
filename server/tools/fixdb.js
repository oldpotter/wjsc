const mysql = require('./mysql')('wujingshucha')
const table = 'conversation'
console.log('开始修改数据库...')


mysql(table).select()
	.then(res => {
		return res.map(conversation => {
			let detail = JSON.parse(conversation.detail)
			detail.date = ''
			conversation.detail = detail
			return conversation
		})
	})
	.then(conversations => {
		conversations.forEach(conversation => {
			mysql(table).where('id', conversation.id)
				.update('detail', JSON.stringify(conversation.detail))
				.then(res => console.log('修改成功:', res))
				.catch(err => console.error('遇到错误:', err))
		})
	})
	.then(() => console.log('修复数据库结束...'))

