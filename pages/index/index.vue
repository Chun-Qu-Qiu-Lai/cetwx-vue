<template>
	<view class="max" :style="{ height: screenHeight }">
		<view class="set">
			<image :src="setIcon" style="width: 60rpx;height: 60rpx;margin-left: 85%;" @click="toSet()">
			</image>
		</view>
		<view class="copyWriting" v-bind:style="copyWritingStyle">
			<view style="font-size: 0.9rem;">{{copyWriting.create_time}}</view>
			<view style="font-size: 0.9rem;font-family:'楷体','宋体';">{{copyWriting.content}}</view>
			<view style="font-size: 0.9rem;">----{{copyWriting.source}}</view>
		</view>
	</view>

</template>

<script>
	import requestUrl from "../../api/request.js"
	export default {
		data() {
			return {
				copyWriting: null,
				setIcon: null,
				backIcon: null,
				copyWritingStyle: {
					background: null
				},
				screenHeight: null,
			}
		},
		onLoad() {
			this.backIcon = 'url(' + 'https://www.shanzs.top/cetappweb/index/back.png' + ')'
			this.setIcon = this.$store.state.icon.setIcon;
			this.screenHeight = uni.getSystemInfoSync().windowHeight + 'rpx'
			uni.request({
					url: requestUrl.prod.BASE_URL + '/cetapp/getCopyWriting',
					method: 'GET',
					header: {
						'Authorization': 'Bearer'
					},
					success: (res) => {
						this.copyWriting = res.data.data
					}
				}),
				this.login()
		},
		methods: {
			login() {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						this.code = res.code
						uni.request({
							url: requestUrl.prod.BASE_URL + '/cetapp/user/login',
							method: 'POST',
							data: {
								code: this.code,
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							success: (res) => {
								if (res.data.code == 200) {
									console.log('Bearer' + res.data.data.token);
									wx.setStorageSync('token', 'Bearer' + res.data.data.token)
								}
							}
						})
					}
				})
			},
			close() {
				this.$refs.popup.close()
			},
			confirm(value) {
				this.$refs.popup.close()
			},
			toSet() {
				uni.navigateTo({
					url: '/pages/set/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.max {
		background: url(https://www.shanzs.top/svg/back.png);
		background-size: 100%;
		padding-top: 5.6%;
		height: 100%;
	}

	page {
		height: 100%;
		width: 100%;
	}

	* {
		font-size: 0.93rem;
		font-family: "楷体";
	}

	.head {
		height: 300rpx;
	}


	.copyWriting {
		width: 80%;
		margin: auto;
		height: 380rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 15rpx 20rpx;
		border-radius: 3%;
		box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
		margin-top: 35%;
		color: #000;
	}

	.set {
		padding: 10rpx 0rpx;
	}


	image {
		animation: move 5s infinite linear;
	}

	@keyframes move {
		0% {
			transform: rotateZ(0);
		}

		100% {
			transform: rotateZ(360deg);
		}
	}
</style>
