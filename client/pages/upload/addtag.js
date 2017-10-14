const app = getApp()
Page({
	data: {
		tag: undefined,
	},

	onInputChange(event) {
		this.setData({
			tag: event.detail.value
		})
	},

	onConfirm() {
		app.tags.push({ value: this.data.tag.trim(),checked:false})
		wx.navigateBack({
			delta: 1,
		})
		wx.setStorage({
			key: 'tags',
			data: app.tags,
		})
	},
})