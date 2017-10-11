const observer = require('../../plugins/observer').observer
import { contents, images } from '../../resources/resource'
import { Conversation } from '../../models/conversation'

Page(observer({
	props: {
		index: null,
		conversations: [],
	},

	onLoad(options) {
		this.props.index = options.index
		let conversation = new Conversation()
		switch (parseInt(this.props.index)) {
			case (0):
				conversation.imageUrl = `../../resources/${images[0]}.jpeg`
				conversation.content = contents[0]
				break
			case (1):
				conversation.imageUrl = `../../resources/${images[1]}.jpeg`
				conversation.content = contents[1]
				break
			case (2):
				conversation.imageUrl = `../../resources/${images[2]}.jpeg`
				conversation.content = contents[2]
				break
		}

		this.props.conversations.push(conversation)
		this.props.conversations.push(conversation)
		this.props.conversations.push(conversation)
		console.log(this.props.conversations)
	}
}))