const config = require('../../config')
const Zan = require('../../plugins/zanui-weapp/dist/index')
import { Conversation } from '../../models/conversation'
const moment = require('../../plugins/moment.min')

Page(Object.assign({}, Zan.TopTips, {
	data: {
		content: undefined,//中文内容
		englishContent: undefined,//英语内容
		images: undefined,//图片数组
		date:moment(),

		switchValue: false,
		uploadTask: undefined,
		progress: undefined,
		imageUrl: undefined,//上传后的图片地址
		categories: [{ name: '每日对话', checked: true }, { name: '笑译', checked: false },]
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

	onEnglishContentChange(event) {
		this.setData({
			englishContent: event.detail.value
		})
	},

	//日期
	onDateChange(event){
		this.setData({
			date:event.detail.value
		})
	},

	//选择图片
	onChooseImage() {
		const _this = this
		wx.chooseImage({
			count: 1,
			sizeType: ['compressed'],
			sourceType: ['album'],
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

	//确定
	onConfirm() {
		const _this = this
		wx.showLoading({
			title: '请稍后...',
		})
		const category = this.data.categories.find(c=>c.checked).name
		let conversation = new Conversation(undefined, this.data.imageUrl, this.data.content,this.data.englishContent,category,this.data.date)

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
			englishContent:null,
			images: null,
			uploadTask: null,
			progress: null,
			imageUrl: null,//上传后的图片地址
		})
	},

	//英语开关
	onSwitchChange(event) {
		//detail.value
		this.setData({
			switchValue: event.detail.value
		})
	},

	//类型修改
	onRadioChange(event) {
		const _this = this
		const index = event.detail.value
		if (this.data.categories[index].checked) {
			return
		}
		// this.data.categories[index].checked = !this.data.categories[index].checked
		// this.data.categories[1 - index].checked = !this.data.categories[1 - index].checked
		const param1 = `categories[${index}].checked`
		const param2 = `categories[${1 - index}].checked`
		this.setData({
			[param1]: !_this.data.categories[index].checked,
			[param2]: !_this.data.categories[1 - index].checked
		})
	},
}))