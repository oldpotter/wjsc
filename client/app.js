//app.js
App({
	onLaunch() {
		this.tags = wx.getStorageSync('tags') || undefined
		this.screenWidth = wx.getSystemInfoSync().screenWidth
		this.screenHeight = wx.getSystemInfoSync().screenHeight
	},
	screenWidth: undefined,
	screenHeight: undefined,
	tags: undefined
})