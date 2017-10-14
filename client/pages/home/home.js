import { Conversation } from '../../models/conversation'
import { contents, images } from '../../resources/resource'
const config = require('../../config')
const moment = require('../../plugins/moment.min')

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
			data: { indexId:34,quantity: 1 },
			method: 'POST',
			success: function (res) {
				if (res.data.code == 0) {
					const conversations = res.data.data.map(value => {
						let conversation = JSON.parse(value.detail)
						conversation.date = moment(conversation.date)
						return conversation
					})
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