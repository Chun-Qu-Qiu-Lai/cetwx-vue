<template>
	<view class="max" :style="{ height: screenHeight }">
		<view class="withMe">
			holzmanuletakc26@gmail.com
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: null
			}
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight + 'px'
			console.log(this.screenHeight);
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

	.withMe {
		width: 95%;
		font-size: 0.9rem;
		margin: 15% auto;
		background-color: aqua;
		border-radius: 12rpx;
		text-align: center;
		background-color: #fff;
		height: 100rpx;
		border: 3rpx #a6d5eb solid;
		line-height: 100rpx;
		box-shadow: -10px -10px 10px rgba(0, 0, 0, 0.1);
	}
</style>
