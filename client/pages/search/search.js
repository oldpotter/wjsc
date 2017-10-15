Page({
	data: {
		categories: ['全部','每日对话','笑译'],
	},

	//点击分类
	onClickCategory(event) {
		const value = event.currentTarget.dataset.value
		wx.navigateTo({
			url: `../category/category?value=${value}`,
		})
	}
})