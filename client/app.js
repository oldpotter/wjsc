//app.js
App({
	onLaunch() {
		this.tags = wx.getStorageSync('tags') || undefined
	},

	tags: undefined
})