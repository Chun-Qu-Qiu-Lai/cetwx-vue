<template>
	<view class="max">
		<view style="overflow: hidden;"></view>
		<textarea style="" v-model="feedMessage" placeholder="请输入,限制40字" maxlength="40"></textarea>
		<button class="btnSubmit" @click="toFeed()" v-if="showBtn">提交</button>
	</view>
</template>

<script>
	import requestUrl from "../../api/request.js"
	export default {
		data() {
			return {
				feedMessage: "",
				showBtn: true,
				code: null
			}
		},
		onLoad() {
			this.showBtn = true
		},
		methods: {
			toFeed() {
				if (this.feedMessage == undefined || this.feedMessage == "" || this.feedMessage == null || this
					.feedMessage == " ") {
					uni.showToast({
						title: '不能为空',
						icon: 'error',
						duration: 2000
					})
				} else {
					this.showBtn = false
					uni.request({
						url: requestUrl.prod.BASE_URL + "/cetapp/message/upload/feedMessage",
						method: "POST",
						data: {
							feedMessage: this.feedMessage
						},
						header: {
							"content-type": "application/x-www-form-urlencoded",
							"Authorization": wx.getStorageSync("token")
						},
						success: (res) => {
							if (res.data.code == 200) {
								uni.showToast({
									title: '反馈成功',
									icon: 'success',
									duration: 2000
								});
							} else {
								uni.showToast({
									title: '反馈次数达三次，明天再试',
									icon: 'error',
									duration: 2000
								});
							}
						}
					})
					const timer = setTimeout(() => {
						uni.navigateTo({
							url: "/pages/set/index"
						})
						clearTimeout(timer)
					}, 2000);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		width: 100%;
	}

	.max {
		height: 100%;
		min-height: 100vh;
		background-color: #f5f6f8;
	}

	.btnSubmit {
		width: 40%;
		font-size: 1.1rem;
		background-color: rgba(119, 175, 119, 1);
		color: #ffffff;
		margin-top: 10%;
		border: 4rpx #fff solid;
	}

	textarea {
		width: 75%;
		height: 300rpx;
		margin: 10% auto;
		padding: 20rpx 30rpx;
		border: 3rpx #a6d5eb solid;
		background-color: #fff;
		box-shadow: -10px 10px 10px rgba(0, 0, 0, 0.1);
		font-size: 0.9rem;
		border-radius: 4%;
		letter-spacing: 0.1rem;
	}
</style>
