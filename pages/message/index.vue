<template>
	<view>
		<view class="max" style="padding-top: 3%;">
			<view style="">
				<view class="message" v-for="(item,index) in messages" :key="index" style="">
					<view style="font-size: 1.0;">
						{{item.message}}
					</view>
					<view style="text-align: right;font-size: 0.9rem;">
						-{{item.create_time}}
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import requestUrl from "../../api/request.js"
	export default {
		data() {
			return {
				messages: null
			}
		},
		onLoad() {
			uni.request({
				url: requestUrl.prod.BASE_URL + "/cetapp/message/getSysMessages",
				method: "GET",
				success: (res) => {
					this.messages = res.data.data
				}
			})
		},
		methods: {

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

	.message {
		background-color: #fff;
		display: flex;
		flex-direction: column;
		height: 150rpx;
		justify-content: space-between;
		width: 90%;
		margin: auto;
		border-radius: 20rpx;
		padding: 10rpx 10rpx 20rpx;
		margin-top: 20rpx;
		border: 3rpx #a6d5eb solid;
		box-shadow: -10px 10px 10px rgba(0, 0, 0, 0.1);
		font-weight: normal;
	}
</style>
