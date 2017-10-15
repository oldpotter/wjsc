const app = getApp()

Page({
	data: {
		inputShowed: false,
		inputVal: "",
		tags: [{ value: '爱情', checked: false }, { value: '事业', checked: false }, { value: '修身', checked: false }]
	},

	onLoad() {
		if (app.tags) {
			this.data.tags = app.tags
		}
		console.log(this.data.tags)
	},

	onTapTag(event) {
		const index = event.currentTarget.dataset.index
		const param = `tags[${index}].checked`
		this.setData({
			[param]: !this.data.tags[index].checked
		})
	},

	onSearch() {
		wx.showModal({
			title: '暂时未实现该功能',
			content: '',
			showCancel: true,
			cancelText: '取消',
			cancelColor: '',
			confirmText: '确定',
			confirmColor: '',
			success: function (res) { },
			fail: function (res) { },
			complete: function (res) { },
		})
	},

	showInput: function () {
		this.setData({
			inputShowed: true
		});
	},
	hideInput: function () {
		this.setData({
			inputVal: "",
			inputShowed: false
		});
	},
	clearInput: function () {
		this.setData({
			inputVal: ""
		});
	},
	inputTyping: function (e) {
		this.setData({
			inputVal: e.detail.value
		});
	}
});