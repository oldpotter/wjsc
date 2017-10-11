const observer = require('../../plugins/observer').observer
const extendObservable = require('../../plugins/mobx').extendObservable

Page(observer({
	props: {
		categories: [
			{
				title: '爱情'
			},
			{
				title: '医疗'
			},
			{
				title: '修身'
			}
		]
	},

	onLoad() {

	},

	//点击分类
	onClickCategory(event) {
		const index = event.currentTarget.dataset.index
		wx.navigateTo({
			url: `../category/category?index=${index}`,
		})
	}
}))