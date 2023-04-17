<template>
	<view :style="{ height: screenHeight }" class="max">
		<!--  -->
		<view style="display: flex;">
			<view class="list">
				<uni-section title="单选" type="line">
					<view class="uni-px-5 uni-pb-5">
						<view class="text">选项字体大小：</view>
						<uni-data-checkbox v-model="radioFontSize" :localdata="checkboxData"></uni-data-checkbox>
					</view>
				</uni-section>
			</view>
		</view>
		<!--  -->
		<view class="list">
			<view>
				<view class="uni-px-5 uni-pb-5">
					<view class="text">选项风格：</view>
					<uni-data-checkbox v-model="radioStyle" :localdata="checkboxStyle"></uni-data-checkbox>
				</view>
			</view>
		</view>
		<!--  -->
		<view class="list">
			<view>
				<view class="text">选项背景颜色，rgba格式</view>
				<view class="rgbaBox">
					<view class="rgbaAllStyle">
						<view class="rgbaAloneStyle">
							R：
						</view>
						<uni-number-box v-model="optionBackFormData.optionBackColorR" :step="1" :min="0" :max="255" />
					</view>
					<view class="rgbaAllStyle">
						<view class="rgbaAloneStlye">
							G：
						</view>
						<uni-number-box v-model="optionBackFormData.optionBackColorG" :step="1" :min="0" :max="255" />
					</view>
					<view class="rgbaAllStyle">
						<view class="rgbaAloneStlye">
							B：
						</view>
						<uni-number-box v-model="optionBackFormData.optionBackColorB" :step="1" :min="0" :max="255" />
					</view>
					<view class="rgbaAllStyle">
						<view class="rgbaAloneStlye">
							A：
						</view>
						<uni-number-box v-model="optionBackFormData.optionBackColorA" :step="0.1" :min="0" :max="1" />
					</view>



				</view>
			</view>
		</view>
		<!--  -->
		<view class="list">
			<view>
				<view class="text">错误背景颜色,rgba格式</view>
				<view class="rgbaBox">
					<view class="rgbaAllStyle">
						<view class="rgbaAloneStlye">
							R：
						</view>
						<uni-number-box v-model="optionCorrectFormData.optionCorrectBackColorR" :step="1" :min="0"
							:max="255" />
					</view>

					<view class="rgbaAllStyle">
						<view class="rgbaAloneStlye">
							G：
						</view>
						<uni-number-box v-model="optionCorrectFormData.optionCorrectBackColorG" :step="1" :min="0"
							:max="255" />
					</view>

					<view class="rgbaAllStyle">
						<view class="rgbaAloneStlye">
							B：
						</view>
						<uni-number-box v-model="optionCorrectFormData.optionCorrectBackColorB" :step="1" :min="0"
							:max="255" />
					</view>
					<view class="rgbaAllStyle">
						<view class="rgbaAloneStlye">
							A：
						</view>
						<uni-number-box v-model="optionCorrectFormData.optionCorrectBackColorA" :step="0.1" :min="0"
							:max="1" />
					</view>
				</view>
			</view>
		</view>

		<button class="btnSubmit" @click="changePersonSetInfo()">提交</button>
	</view>
</template>

<script>
	import requestUrl from "../../api/request.js"
	export default {
		data() {
			return {
				radioFontSize: 3,
				radioStyle: 1,
				checkboxData: [{
					text: '0.85',
					value: 0
				}, {
					text: '0.9',
					value: 1
				}, {
					text: '0.95',
					value: 2
				}, {
					text: '1(默认)',
					value: 3
				}, {
					text: '1.05',
					value: 4
				}],
				checkboxStyle: [{
					text: '原始',
					value: 0
				}, {
					text: '美化(默认)',
					value: 1
				}],
				ak: 15,
				optionBackFormData: {
					optionBackColorR: 24,
					optionBackColorG: 24,
					optionBackColorB: 24,
					optionBackColorA: 0.3
				},
				optionCorrectFormData: {
					optionCorrectBackColorR: 24,
					optionCorrectBackColorG: 24,
					optionCorrectBackColorB: 24,
					optionCorrectBackColorA: 0.2
				},
				screenHeight: null
			}
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight + "px",
				this.getPersonSetInfo()
		},
		methods: {
			getPersonSetInfo() {
				uni.request({
					url: requestUrl.prod.BASE_URL + "/cetapp/user/getUserInfo",
					method: "GET",
					header: {
						"Authorization": wx.getStorageSync("token")
					},
					success: (res) => {
						if (res.data.code == 200) {
							if (res.data.data.setInfo.deepChecklistTextFontSize == '0.85rem') {
								this.radioFontSize = 0
							} else if (res.data.data.setInfo.deepChecklistTextFontSize == '0.9rem') {
								this.radioFontSize = 1
							} else if (res.data.data.setInfo.deepChecklistTextFontSize == '0.95rem') {
								this.radioFontSize = 2
							} else if (res.data.data.setInfo.deepChecklistTextFontSize == '1rem') {
								this.radioFontSize = 3
							} else {
								this.radioFontSize = 4
							}
							this.radioStyle = res.data.data.setInfo.optionStyle
							this.optionBackFormData = res.data.data.setInfo.optionBackFormData
							this.optionCorrectFormData = res.data.data.setInfo.optionCorrectFormData
						}
					}
				})
			},
			changePersonSetInfo() {
				uni.request({
					url: requestUrl.prod.BASE_URL + "/cetapp/user/changePersonSetInfo",
					method: "POST",
					data: {
						"deepChecklistTextFontSize": this.radioFontSize,
						"optionStyle": this.radioStyle,
						"optionBackFormData": this.optionBackFormData,
						"optionCorrectFormData": this.optionCorrectFormData
					},
					header: {
						"Authorization": wx.getStorageSync("token"),
						"content-type": "application/json"
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.getPersonSetInfo()
							uni.showToast({
								title: '修改成功',
								icon: 'success',
								duration: 2000
							});
						} else {
							uni.showToast({
								title: '修改失败',
								icon: 'error',
								duration: 2000
							});
						}
					}
				})
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

	.list {
		margin-top: 5%;
		border-top: 3rpx #000000 solid;

	}

	.text {
		margin-top: 3%;
		font-size: 0.9rem;
		text-indent: 3%;
		color: #5f5f5f;
	}

	.rgbaBox {
		display: flex;
		flex-direction: column;

		.rgbaAllStyle {
			display: flex;
			width: 40%;
			background-color: #fff;
			margin: auto;
			justify-content: space-around;
			height: 50rpx;
			margin-top: 4%;

			.rgbaAloneStlye {
				line-height: 50rpx;
			}
		}
	}

	.btnSubmit {
		width: 40%;
		font-size: 1.1rem;
		background-color: rgba(119, 175, 119, 1);
		color: #ffffff;
		margin-top: 10%;
		border: 4rpx #fff solid;
	}


	/deep/ .is--default {
		background-color: rgba(245, 246, 248, 1) !important;
	}

	/deep/ .uni-section {
		background-color: #f5f6f8 !important;
	}
</style>
