<template>
	<view>
		<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
			<image class="avatar" :src="avatarUrl"></image>
		</button>
		<input class="weui-input" placeholder="请输入昵称" v-model="nickName" />
		<button style="margin-top: 30%;" @click="authorization()">确认</button>
	</view>
</template>

<script>
	import requestUrl from "../../api/request.js"
	export default {
		data() {
			return {
				nickName: null,
				avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
				code: null
			}
		},
		onLoad() {},
		methods: {
			onChooseAvatar(e) {
				this.avatarUrl = e.detail.avatarUrl
			},
			authorization() {
				if (this.nickName === '' || this.nickName === null || this.nickName == undefined) {
					uni.showToast({
						title: '昵称不为空',
						icon: 'error',
						duration: 2000
					});
					return
				}
				if (this.nickName.length > 7) {
					uni.showToast({
						title: '昵称小于七位',
						icon: 'error',
						duration: 2000
					});
					return
				}
				if (this.avatarUrl ===
					'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
				) {
					uni.showToast({
						title: '头像不为空',
						icon: 'error',
						duration: 2000
					});
					return
				}
				wx.setStorageSync("avatarUrl", this.avatarUrl)
				wx.setStorageSync("nickName", this.nickName)
				wx.setStorageSync("isAuth", true)
				uni.login({
					provider: "weixin",
					success: (res) => {
						this.code = res.code
						uni.request({
							url: requestUrl.prod.BASE_URL + "/cetapp/user/authorization",
							method: "POST",
							data: {
								code: this.code,
								avatarUrl: this.avatarUrl,
								nickName: this.nickName
							},
							header: {
								"content-type": "application/x-www-form-urlencoded"
							},
							success: (res) => {
								if (res.data.code == 200) {
									uni.navigateTo({
										url: "/pages/set/index"
									})
								} else {
									uni.showToast({
										title: res.data.date,
										icon: 'error',
										duration: 2000
									});
								}
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.avatar-wrapper {
		padding: 0;
		width: 56px !important;
		border-radius: 8px;
		margin-top: 40px;
		margin-bottom: 40px;
	}

	.avatar {
		display: block;
		width: 56px;
		height: 56px;
	}

	.container {
		display: flex;
	}
</style>
