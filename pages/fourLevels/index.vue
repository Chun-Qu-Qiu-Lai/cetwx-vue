<template>
	<view class="content">

		<!--  -->
		<view v-show="isShow">
			<uni-popup ref="isCorrectPopup" background-color="">
				<view class="choose_part" style="">
					<view style="display: flex;">
						<button @click="toSectionAll" class="textAll">
							All</button>
					</view>

					<view style="display: flex;flex-direction: row;justify-content: space-around;margin: 5% 0;">
						<button class="text" @click="toSectionA">Section A</button>
						<button class="text" @click="toSectionB">Section B</button>
						<button class="text" @click="toSectionC">Section C</button>

					</view>
				</view>
			</uni-popup>
		</view>
		<!--  -->
		<uni-collapse accordion>
			<uni-collapse-item :title="itme.different_year" v-for="(itme) in differentYear" :key="itme.id"
				:thumb="headsetIcon">
				<uni-list>
					<uni-list-item v-for="itmes in testPapers" :key="itmes.id" :title="itmes.different_test"
						v-if="itme.id==itmes.pid" clickable @click="toThisTest(itmes.pid,itmes.belong_to,itme.id)">
					</uni-list-item>
				</uni-list>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import requestUrl from "../../api/request.js"
	export default {
		data() {
			return {
				differentYear: null,
				testPapers: null,
				cetFourOrSix: 4,
				yearId: null,
				belongTo: null,
				isShow: false,
				yearPid: null,
				changeByYearPid: null,
				headsetIcon: null
			}
		},
		onLoad() {
			this.headsetIcon = this.$store.state.icon.headsetIcon;
			this.isShow = false
			uni.request({
				url: requestUrl.prod.BASE_URL + "/cetapp/getenggroup?" + "cetFourOrSix=" + this.cetFourOrSix,
				method: "GET",
				success: (res) => {
					if (res.data.code == 200) {
						this.differentYear = res.data.data
					}
				}
			})
			uni.request({
				url: requestUrl.prod.BASE_URL + "/cetapp/getengtest?" + "cetFourOrSix=" + this.cetFourOrSix,
				method: "GET",
				success: (res) => {
					if (res.data.code == 200) {
						this.testPapers = res.data.data
					}
				}
			})
		},
		methods: {
			toThisTest(pid, belongTo, yearPid) {
				this.yearPid = yearPid;
				this.isShow = true;
				this.yearId = pid;
				this.belongTo = belongTo;
				this.$refs.isCorrectPopup.open('bottom')
			},
			toSectionA() {
				this.isShow = false;
				uni.navigateTo({
					url: "/pages/cetFourTestA/index?" + "cetFourOrSix=" + this.cetFourOrSix + "&yearId=" + this
						.yearId + "&belongTo=" + this.belongTo +
						"&section=" + 0
				})
			},
			toSectionB() {
				this.isShow = false;
				uni.navigateTo({
					url: "/pages/cetFourTestB/index?" + "cetFourOrSix=" + this.cetFourOrSix + "&yearId=" + this
						.yearId + "&belongTo=" + this.belongTo +
						"&section=" + 1
				})
			},
			toSectionC() {
				this.isShow = false;
				uni.navigateTo({
					url: "/pages/cetFourTestC/index?" + "cetFourOrSix=" + this.cetFourOrSix + "&yearId=" + this
						.yearId + "&belongTo=" + this.belongTo +
						"&section=" + 2
				})
			},
			toSectionAll() {
				this.isShow = false;
				uni.navigateTo({
					url: "/pages/cetFourTestAll/index?" + "cetFourOrSix=" + this.cetFourOrSix + "&yearId=" + this
						.yearId + "&belongTo=" + this.belongTo +
						"&section=" + 3
				})
			}
		}
	}
</script>

<style scoped>
	.content {
		background-color: aqua;
	}

	/deep/ .uni-collapse-item__title-text {
		color: #000;
		font-size: 1.2rem;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	}

	/deep/ .uni-list-item__content-title {
		color: #000;
		font-size: 1.0rem;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	}

	.choose_part {
		padding-top: 3%;
		display: flex;
		height: 300rpx;
		flex-direction: column;
		font-family: Open Sans, Noto Sans JP, sans-serif;
		background-color: #f1f4fb;
		border-top-left-radius: 5%;
		border-top-right-radius: 5%;
	}

	.text {
		font-size: 1rem;
		font-weight: bolder;
		border-radius: 10%;
		border: 4rpx #fff solid;
		background-color: rgba(119, 175, 119, 1);
		color: #ffffff;
	}



	.textAll {
		margin: auto;
		width: 200rpx;
		height: 100rpx;
		background-color: rgba(119, 175, 119, 1);
		color: #ffffff;
		font-size: 1rem;
		font-weight: bolder;
		line-height: 100rpx;
		border: 4rpx #fff solid;
		border-radius: 7%;
	}
</style>
