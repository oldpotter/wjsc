const config = require('../../config')
const Zan = require('../../plugins/zanui-weapp/dist/index')
import { Conversation } from '../../models/conversation'

Page(Object.assign({}, Zan.TopTips, {
	data: {
		content: undefined,
		images: undefined,
		uploadTask: undefined,
		progress: undefined,
		imageUrl: undefined,//上传后的图片地址
	},

	onUnload() {
		if (this.data.uploadTask) {
			this.data.uploadTask.about()
		}
	},

	// 输入内容
	onContentChange(event) {
		this.setData({
			content: event.detail.value
		})
	},

	//选择图片
	onChooseImage() {
		const _this = this
		wx.chooseImage({
			count: 1,
			sizeType: ['compressed'],
			sourceType: [],
			success: function (res) {
				const size = res.tempFiles[0].size
				if (size >= config.upload.chosenImageLimitSize * 100000) {
					//图片超过限制
					_this.showZanTopTips(`所选图片超过限制大小${config.upload.chosenImageLimitSize}M`)
					return
				}

				_this.setData({
					images: res.tempFilePaths
				})

				//上传图片
				_this.data.uploadTask = wx.uploadFile({
					url: config.service.uploadImageUrl,
					filePath: _this.data.images[0],
					name: 'file',
					success: function (res) {
						const data = JSON.parse(res.data).data
						_this.setData({
							imageUrl: data.imgUrl
						})
					},
					fail: function (res) {
						_this.showZanTopTips('上传图片失败！')
						_this.setData({
							progress: -1
						})
					},
				})
				_this.data.uploadTask.onProgressUpdate(res => {
					_this.setData({
						progress: res.progress
					})
				})
			},
		})
	},

	// 确定
	onConfirm() {
		const _this = this
		wx.showLoading({
			title: '请稍后...',
		})
		let conversation = new Conversation(undefined, this.data.content, this.data.imageUrl)
		wx.request({
			url: config.service.uploadConversationUrl,
			data: conversation,
			header: {},
			method: 'POST',
			dataType: 'json',
			success: function (res) {
				//保存成功
				if (res.data.code == 0) {
					_this.clearData()
				} else {
					_this.showZanTopTips('保存失败')
				}
				wx.hideLoading()
				wx.showToast({
					title: '保存成功',
				})
			},
			fail: function (res) {
				_this.showZanTopTips(res.errMsg)
			},
			complete: function (res) { },
		})
	},

	//清理data
	clearData() {
		const _this = this
		this.setData({
			content: null,
			images: null,
			uploadTask: null,
			progress: null,
			imageUrl: null,//上传后的图片地址
		})
	},
}))