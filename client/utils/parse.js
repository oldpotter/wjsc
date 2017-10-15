const moment = require('../plugins/moment.min')

const parseConversations = data => {
	return data.map(value => {
		let conversation = JSON.parse(value.detail)
		conversation.date = moment(conversation.date)
		return conversation
	})
}

module.exports = {
	parseConversations: parseConversations
}