import { Conversation } from '../../models/conversation'
import { contents, images } from '../../resources/resource'
const config = require('../../config')
const parse = require('../../utils/parse')

Page({

	data: {
		sizes: undefined,
		conversations: undefined,
		screenWidth: undefined,
		logoSize: undefined,
		qrSize: undefined,
	},

	onLoad() {
		//获取设备屏幕宽度
		this.setData({
			screenWidth: wx.getSystemInfoSync().screenWidth
		})

		this.getData()
	},

	onShow() {
		// this.getData()
	},

	getData() {
		const _this = this
		wx.request({
			url: config.service.getConversationsUrl,
			data: { indexId:undefined,quantity: 1 },
			method: 'POST',
			success: function (res) {
				if (res.data.code == 0) {
					const conversations = parse.parseConverations(res.data.data)
					_this.setData({
						conversations: conversations
					})
					console.log(_this.data.conversations)
				}
			},
			fail: function (res) { },
		})
	},

	//图片加载
	onImageLoad(event) {
		let width = event.detail.width
		let height = event.detail.height
		const ratio = width / height
		const id = event.currentTarget.id
		if (id == 'logo') {
			width = this.data.screenWidth * 0.35
			height = width / ratio
			this.setData({
				logoSize: { width, height }
			})
		} else if (id == 'qrcode') {
			width = this.data.screenWidth * 0.15
			height = width / ratio
			this.setData({
				qrSize: { width, height }
			})
		} else {
			const index = event.currentTarget.dataset.index
			width = this.data.screenWidth * 0.8
			height = width / ratio
			const paramWidth = `conversations[${index}].width`
			const paramHeight = `conversations[${index}].height`
			this.setData({
				[paramWidth]: width,
				[paramHeight]: height
			})
		}

	},

})