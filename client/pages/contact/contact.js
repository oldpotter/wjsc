const app = getApp()
Page({

	data: {
		logoSize: undefined,
		qrSize: undefined,
		num: undefined
	},

	onShow() {
		this.setData({
			num: 4
		})
	},


	onImageLoad(event) {
		const id = event.currentTarget.id
		let width = event.detail.width
		let height = event.detail.height
		const ratio = width / height
		let param
		if (id == 'logo') {
			width = app.screenWidth * 0.4
			height = width / ratio
			param = 'logoSize'
		} else if (id == 'qrcode') {
			width = app.screenWidth * 0.25
			height = width / ratio
			param = 'qrSize'
		}
		this.setData({
			[param]: { width, height }
		})
	},

	onTap(event) {
		console.log(event)
		const x = event.detail.x
		const y = event.detail.y
		const screenWidth = app.screenWidth
		const screenHeight = app.screenHeight
		let num = this.data.num

		if (num == 4 && x <= screenWidth / 4 && y <= screenHeight / 4) {//左上
			// console.log('左上')
			this.setData({
				num: 3
			})
			setTimeout(() => {
				this.setData({
					num: 4
				})
			}, 5 * 1000)
		} else if (num == 3 && x > screenWidth * 0.75 && x <= screenWidth && y > screenHeight * 0.75 && y <= screenHeight) {//右下
			// console.log('右下')
			this.setData({
				num: 2
			})
		} else if (num == 2 && x > screenWidth * 0.75 && x < screenWidth && y < screenHeight * 0.75) {//右上
			// console.log('右上')
			this.setData({
				num: 1
			})
		} else if (num == 1 && x <= screenWidth / 4 && y > screenHeight * 0.75 && y < screenHeight) {//左下
			// console.log('左下')
			//打开upload页面
			wx.redirectTo({
				url: '../upload/upload',
			})
		} else {
			this.setData({
				num: 4
			})
		}
	}
})