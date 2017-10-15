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
			url: config.service.getCategoryUrl,
			data: { category: _this.data.category },
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
	}

}))