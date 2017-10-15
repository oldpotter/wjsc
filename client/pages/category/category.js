const config = require('../../config')
const Zan = require('../../plugins/zanui-weapp/dist/index')
const parse = require('../../utils/parse')

Page(Object.assign({}, Zan.TopTips, {
	data: {
		category: undefined,
		conversations: undefined
	},

	onLoad(options) {
		this.setData({
			category: options.value
		})
		this.getData()
	},

	getData() {
		const _this = this
		wx.showLoading({
			title: '请稍后...',
		})
		wx.request({
			url: _this.data.category == '全部' ? config.service.getConversationsUrl : config.service.getCategoryUrl,
			data: _this.data.category == '全部' ? { indexId: undefined, quantity: 1000 } : { category: _this.data.category },
			method: 'POST',
			success: function (res) {
				if (res.data.code == 0) {
					const conversations = parse.parseConversations(res.data.data)
					_this.setData({
						conversations: conversations
					})
				}
				wx.hideLoading()
			},
			fail: function (res) {
				_this.showZanTopTips('获取失败')
			},
		})
	},

	//图片加载
	onImageLoad(event) {
		let width = event.detail.width
		let height = event.detail.height
		const ratio = width / height
		const index = event.currentTarget.dataset.index
		width = this.data.screenWidth * 0.8
		height = width / ratio
		const paramWidth = `conversations[${index}].width`
		const paramHeight = `conversations[${index}].height`
		this.setData({
			[paramWidth]: width,
			[paramHeight]: height
		})
	},

}))