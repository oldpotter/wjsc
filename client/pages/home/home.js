const observer = require('../../plugins/observer').observer
const extendObservable = require('../../plugins/mobx').extendObservable
import { Conversation } from '../../models/conversation'
import { contents, images } from '../../resources/resource'
const config = require('../../config')

Page(observer({
	props: {

	},

	data: {
		sizes: undefined,
		conversations: undefined,
		width: undefined,
		height: undefined,
		screenWidth: undefined,
	},

	onLoad() {
		const _this = this
		//获取设备屏幕宽度
		this.setData({
			screenWidth: wx.getSystemInfoSync().screenWidth
		})
		wx.request({
			url: config.service.getConversationsUrl,
			success: function (res) {
				if (res.data.code == 0) {
					console.log(res)
					const conversations = res.data.data.map(value=>JSON.parse(value.detail))
					_this.setData({
						conversations: conversations
					})
				}
			},
			fail: function (res) { },
		})
	},


	onImageLoad(event) {
		const index = event.currentTarget.dataset.index
		let width = event.detail.width
		let height = event.detail.height
		const ratio = width / height
		width = this.data.screenWidth * 0.8
		height = width / ratio
		const paramWidth = `conversations[${index}].width`
		const paramHeight = `conversations[${index}].height`
		this.setData({
			[paramWidth]: width,
			[paramHeight]: height
		})
	}

}))