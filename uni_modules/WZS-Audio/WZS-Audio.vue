<template>
	<view class="audio-page">
		<view class="box-left">
			<view class="page-btn" @click="clickAudio">
				<image :src="music_play ? stopIcon : startIcon" mode="widthFix"></image>
			</view>
		</view>
		<view class="box-content">
			<text>{{ getMinuteTime(now_time) }}</text>
			<view class="progress">
				<slider :value="(now_time / total_time) * 100" block-size="15" block-color="#94cde6"
					activeColor="#FF3333" @change="sliderChange"></slider>
				<text>{{ getMinuteTime(total_time)}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'WZSAudio',
		props: ['music', 'image', 'title', 'autoplay'],
		data() {
			return {
				music_play: false,
				AUDIO: '',
				total_time: '',
				now_time: 0,
				timeupdata: '',
				interval: '',
				startIcon: null,
				stopIcon: null,
				playFlag: true
			}
		},
		mounted() {
			/* 	this.startIcon = this.$store.state.icon.startIcon;
				this.stopIcon = this.$store.state.icon.stopIcon; */
			this.startIcon = '/static/music/start.png'
			this.stopIcon = '/static/music/stop.png'
			this.playAudio()
			/* this.AUDIO.play() */
			if (this.playFlag) {
				this.AUDIO.play()
				this.AUDIO.pause()
				this.playFlag = false
			}
		},
		methods: {
			// 播放音乐
			playAudio() {
				this.AUDIO = uni.createInnerAudioContext()
				this.AUDIO.src = this.music
				if (this.autoplay) {
					this.AUDIO.autoplay = true
					this.music_play = true
					this.AUDIO.play()
				}
				this.interval = setInterval(() => {
					if (this.AUDIO.duration != 0 && !isNaN(this.AUDIO.duration)) {
						this.total_time = Math.round(this.AUDIO.duration)
					}
				}, 100)
				this.timeupdata = setInterval(() => {
					if (this.music_play) {
						this.now_time++
						if (this.now_time >= this.total_time) {
							this.music_play = false
							this.now_time = 0
						}
					}
				}, 1000)
			},
			clickAudio() {
				if (this.music_play) {
					this.AUDIO.pause()
					this.music_play = false

				} else {
					this.AUDIO.play()
					this.music_play = true

				}
			},
			// 拖动进度条
			sliderChange(e) {
				const second = (e.detail.value / 100) * this.total_time
				this.AUDIO.seek(second)
				this.now_time = second
			},
			// 秒转换分秒
			getMinuteTime(data) {
				let minute = parseInt(data / 60)
				let second = parseInt(data % 60)
				if (minute.toString().length == 1) minute = `0${minute}`
				if (second.toString().length == 1) second = `0${second}`
				return `${minute}:${second}`
			}
		},
		destroyed() {
			this.music_play = false
			this.AUDIO.pause()
			clearInterval(this.timeupdata)
		}
	}
</script>

<style lang="scss">
	/deep/.uni-slider-track {
		height: 150%;
	}

	.audio-page {
		margin-left: 5%;
		width: 90%;
		height: 150upx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 6upx 3upx 6upx #848484;

		.box-left {
			width: 10%;
			position: relative;
			display: flex;

			.box-img {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 2;
			}

			.page-btn {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 3;

				image {
					width: 80upx;
					height: 80upx;

				}
			}
		}

		.box-content {
			width: 90%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 0 30upx;
			box-sizing: border-box;
			font-size: 24upx;

			.content-name {
				width: 100%;
				display: -webkit-box;
				/* 弹性盒模型 */
				-webkit-box-orient: vertical;
				/* 元素垂直居中*/
				-webkit-line-clamp: 1;
				/*  文字显示的行数*/
				overflow: hidden;
				/* 超出隐藏 */
			}

			.progress {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				slider {
					width: 80%;
				}
			}
		}
	}
</style>
