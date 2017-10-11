const observer = require('../../plugins/observer').observer
const extendObservable = require('../../plugins/mobx').extendObservable
import { Conversation } from '../../models/conversation'
import { contents, images } from '../../resources/resource'

Page(observer({
	props: {

	},

	data: {
		sizes: [],
		conversations: [],
		width: 0,
		height: 0,
		screenWidth: 0,
	},

	onLoad() {
		this.setData({
			screenWidth: wx.getSystemInfoSync().screenWidth
		})

		let arr = []
		for (let i = 0; i < 10; i++) {
			const randomNum = Math.floor(Math.random() * (4 - 0 + 1)) + 0
			const imageUrl = `../../resources/${images[randomNum]}.jpeg`
			const content = contents[randomNum]
			const conversation = new Conversation(i, imageUrl, content)
			arr.push(conversation)
		}
		this.setData({
			conversations: arr
		})
	},


	onImageLoad(event) {
		const index = event.currentTarget.dataset.index
		let width = event.detail.width
		let height = event.detail.height
		const ratio = width / height
		width = this.data.screenWidth * 0.7
		height = width / ratio
		const paramWidth = `conversations[${index}].width`
		const paramHeight = `conversations[${index}].height`
		this.setData({
			[paramWidth]: width,
			[paramHeight]: height
		})
	}

}))