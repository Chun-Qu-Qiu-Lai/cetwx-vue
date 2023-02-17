<template>
	<view style="padding-top: 10%;">

		<WzsAudio :music="music" :autoplay="false"> </WzsAudio>
		<!-- 三角形和题目完成情况弹窗 -->
		<view class="trangle" @click="openIsSelected()"></view>
		<uni-popup ref="popupIsSelected" backgroundColor="">
			<view
				style="background-color: #e9eae5;border-radius: 15rpx;display: grid;grid-template-columns: repeat(5,1fr);">
				<view v-for="(item,index) in list" :key="index" :class="[item.selected?'selde':'noselde']"
					style="height:70rpx;width: 70rpx;text-align: center;border-radius: 50%;margin: 10rpx;font-size: 1.0rem;line-height: 70rpx;">
					{{item.title}}
				</view>
			</view>
		</uni-popup>

		<!-- 答题正确情况弹窗-->
		<view>
			<uni-popup ref="isCorrectPopup" background-color="">
				<view style="display: flex;justify-content: space-around;background-color: #cfd0cc;">
					<view style="padding: 5%;font-size: 1.3rem;font-weight: 400;">得分：{{totalScore}}</view>
				</view>
				<view class="isCorrectPopup-content"
					style="margin: auto;font-size: 1.1rem;padding: 20rpx 0% 25rpx 2%;background-color: #f1f4fb;border-bottom-left-radius:5%;border-bottom-right-radius:5%;display: grid;grid-template-columns: repeat(5,55px);justify-content: center;">
					<view v-for="(item,index) in isCorrecteList" :key="index"
						v-bind:style="[item.selected?correct:error]"
						style="width: 75rpx; height:75rpx;text-align: center;border-radius: 50%;font-weight: normal;line-height: 75rpx;margin-top: 20rpx;">
						{{item.title}}
					</view>
				</view>
			</uni-popup>
		</view>

		<!--abc-->
		<view class="part">
			<view class="part-title">Section A</view>
			<view class="part-subtitle">
				<text decode='true'>&nbsp;&nbsp;</text>
				Directions:In this section, you will hear two long conversations. At the end of each coversation,
				you will hear four questions. Both the conversation and the questions will be spoken only once. After
				you hear a question, you must choose the best answer from the four choices marked A), B),C), and D).
				Then mark the corresponding letter on Answer Sheet I with a single line through the centre.
			</view>
		</view>
		<view class="questionsTitle">Questions 1 to 4 are based on the conversation you have just heard.
		</view>

		<view :class="option_style">
			<uni-section type="line">
				<view class="uni-px-5">
					<view class="text">1、</view>
					<uni-data-checkbox :selectedColor="selectedColorP" selectedTextColor="#fff" mode="tag"
						:correctionColor="correctionColorP" :isSubmit="isSubmitP" :wrap="true" v-model="radioOption0"
						:localdata="optiones[0]" @change="changOption(0)" id="checkbox_0" :radioOption="radioOption0"
						:answer="optiones[0][0].answer" :disabled="isDisabled" :list_size="list_font_size">
					</uni-data-checkbox>
				</view>
			</uni-section>
		</view>

		<view :class="option_style">
			<uni-section type="line">
				<view class="uni-px-5">
					<view class="text">2、</view>
					<uni-data-checkbox :selectedColor="selectedColorP" selectedTextColor="#fff" mode="tag"
						:correctionColor="correctionColorP" :isSubmit="isSubmitP" :wrap="true" v-model="radioOption1"
						:localdata="optiones[1]" @change="changOption(1)" id="checkbox_1" :radioOption="radioOption1"
						:answer="optiones[1][0].answer" :disabled="isDisabled" :list_size="list_font_size">
					</uni-data-checkbox>
				</view>
			</uni-section>
		</view>
		<view :class="option_style">
			<uni-section type="line">
				<view class="uni-px-5">
					<view class="text">3、</view>
					<uni-data-checkbox :selectedColor="selectedColorP" selectedTextColor="#fff" mode="tag"
						:correctionColor="correctionColorP" :isSubmit="isSubmitP" :wrap="true" v-model="radioOption2"
						:localdata="optiones[2]" @change="changOption(2)" id="checkbox_2" :radioOption="radioOption2"
						:answer="optiones[2][0].answer" :disabled="isDisabled" :list_size="list_font_size">
					</uni-data-checkbox>
				</view>
			</uni-section>
		</view>

		<view :class="option_style">
			<uni-section type="line">
				<view class="uni-px-5">
					<view class="text">4、</view>
					<uni-data-checkbox :selectedColor="selectedColorP" selectedTextColor="#fff" mode="tag"
						:correctionColor="correctionColorP" :isSubmit="isSubmitP" :wrap="true" v-model="radioOption3"
						:localdata="optiones[3]" @change="changOption(3)" id="checkbox_3" :radioOption="radioOption3"
						:answer="optiones[3][0].answer" :disabled="isDisabled" :list_size="list_font_size">
					</uni-data-checkbox>
				</view>
			</uni-section>
		</view>

		<view class="questionsTitle">
			Questions 5 to 8 are based on the news report you have just heard.
		</view>

		<view :class="option_style">
			<uni-section type="line">
				<view class="uni-px-5">
					<view class="text">5、</view>
					<uni-data-checkbox :selectedColor="selectedColorP" selectedTextColor="#fff" mode="tag"
						:correctionColor="correctionColorP" :isSubmit="isSubmitP" :wrap="true" v-model="radioOption4"
						:localdata="optiones[4]" @change="changOption(4)" id="checkbox_4" :radioOption="radioOption4"
						:answer="optiones[4][0].answer" :disabled="isDisabled" :list_size="list_font_size">
					</uni-data-checkbox>
				</view>
			</uni-section>
		</view>

		<view :class="option_style">
			<uni-section type="line">
				<view class="uni-px-5">
					<view class="text">6、</view>
					<uni-data-checkbox :selectedColor="selectedColorP" selectedTextColor="#fff" mode="tag"
						:correctionColor="correctionColorP" :isSubmit="isSubmitP" :wrap="true" v-model="radioOption5"
						:localdata="optiones[5]" @change="changOption(5)" id="checkbox_5" :radioOption="radioOption5"
						:answer="optiones[5][0].answer" :disabled="isDisabled" :list_size="list_font_size">
					</uni-data-checkbox>
				</view>
			</uni-section>
		</view>

		<view :class="option_style">
			<uni-section type="line">
				<view class="uni-px-5">
					<view class="text">7、</view>
					<uni-data-checkbox :selectedColor="selectedColorP" selectedTextColor="#fff" mode="tag"
						:correctionColor="correctionColorP" :isSubmit="isSubmitP" :wrap="true" v-model="radioOption6"
						:localdata="optiones[6]" @change="changOption(6)" id="checkbox_6" :radioOption="radioOption6"
						:answer="optiones[6][0].answer" :disabled="isDisabled" :list_size="list_font_size">
					</uni-data-checkbox>
				</view>
			</uni-section>
		</view>
		<view :class="option_style">
			<uni-section type="line">
				<view class="uni-px-5">
					<view class="text">8、</view>
					<uni-data-checkbox :selectedColor="selectedColorP" selectedTextColor="#fff" mode="tag"
						:correctionColor="correctionColorP" :isSubmit="isSubmitP" :wrap="true" v-model="radioOption7"
						:localdata="optiones[7]" @change="changOption(7)" id="checkbox_7" :radioOption="radioOption7"
						:answer="optiones[7][0].answer" :disabled="isDisabled" :list_size="list_font_size">
					</uni-data-checkbox>
				</view>
			</uni-section>
		</view>

		<view style="margin-top: 3%">
			<button class="btn-submit" @click="submit()">提交</button>
		</view>
		<!-- 弹窗 -->
		<view style="margin: 3%;height: 30rpx;"></view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="base" message="成功消息" :duration="0" :before-close="true" @close="close"
				@confirm="confirm" confirmText="提交" cancelText="再做一下">
				<view class="add_list">
					{{chenckAllOptions}}未完成
				</view>
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import requestUrl from "../../api/request.js"
	import
	WzsAudio
	from '../../uni_modules/WZS-Audio/WZS-Audio.vue'
	export default {
		components: {
			WzsAudio
		},
		data() {
			return {
				yearId: null,
				belongTo: null,
				section: null,
				cetFourOrSix: null,
				music: null,

				list_font_size: '1rem',
				option_style: 'option_style_two',

				//选择
				selectedColorP: 'rgba(166, 213, 235,1)',
				correctionColorP: 'rgba(245, 179, 183,1)',
				//情况弹窗
				selde: {
					backgroundColor: 'rgba(166, 213, 235,1)'
				},
				noselde: {
					backgroundColor: 'rgba(255, 255, 255, 0.6)',
				},
				//最后成绩
				error: {
					backgroundColor: 'rgba(166, 213, 235,1)',
				},
				correct: {
					backgroundColor: 'rgba(245, 179, 183,1)',
				},

				isSubmitP: 1,
				totalScore: 0.0,
				isTotalScore: false,

				radioOption0: 4,
				radioOption1: 4,
				radioOption2: 4,
				radioOption3: 4,
				radioOption4: 4,
				radioOption5: 4,
				radioOption6: 4,
				radioOption7: 4,
				optiones: null,

				isDisabled: false,

				current: 0,
				list: [{
						selected: false,
						title: '1'
					},
					{
						selected: false,
						title: '2'
					},
					{
						selected: false,
						title: '3'
					},
					{
						selected: false,
						title: '4'
					},
					{
						selected: false,
						title: '5'
					},
					{
						selected: false,
						title: '6'
					},
					{
						selected: false,
						title: '7'
					},
					{
						selected: false,
						title: '8'
					}
				],
				selectId: [],
				isCorrecteSelectId: [],
				isCorrecteList: [{
						selected: false,
						title: '1'
					},
					{
						selected: false,
						title: '2'
					},
					{
						selected: false,
						title: '3'
					},
					{
						selected: false,
						title: '4'
					},
					{
						selected: false,
						title: '5'
					},
					{
						selected: false,
						title: '6'
					},
					{
						selected: false,
						title: '7'
					},
					{
						selected: false,
						title: '8'
					}
				],
				//没完成的题的题号
				chenckAllOptions: '',
				//是否第一次提交
				isFirstSubmit: false,
			}
		},
		onLoad(options) {
			this.yearId = options.yearId;
			this.belongTo = options.belongTo;
			this.section = options.section;
			this.cetFourOrSix = options.cetFourOrSix;
			if (this.cetFourOrSix == 6) {
				this.music = requestUrl.prod.cetListenFile + '/cetfile' + "/cetSixListen" + "/" + this.yearId + "/" + this
					.yearId + "-" +
					this.belongTo + "-" + this.section + ".mp3"
			}
			this.getOptions();
			this.getOptionSetInfo();
		},
		methods: {
			getOptions() {
				uni.request({
					url: requestUrl.prod.BASE_URL + "/cetapp/getoption?" + "cetfourorsix=" + this.cetFourOrSix +
						"&yearid=" +
						this.yearId +
						"&belongto=" + this
						.belongTo +
						"&section=" + this.section,
					method: "GET",
					success: (res) => {
						this.optiones = res.data.data
					}
				})
			},
			getOptionSetInfo() {
				uni.request({
					url: requestUrl.prod.BASE_URL + "/cetapp/user/getUserInfo",
					method: "GET",
					header: {
						"Authorization": wx.getStorageSync("token")
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.list_font_size = res.data.data.optionSetInfo.deepChecklistTextFontSize
							this.option_style = res.data.data.optionSetInfo.optionStyle
							this.selectedColorP = res.data.data.optionSetInfo.selectedColorP
							this.correctionColorP = res.data.data.optionSetInfo.correctionColorP
							this.selde.backgroundColor = res.data.data.optionSetInfo.selectedColorP
							this.error.backgroundColor = res.data.data.optionSetInfo.correctionColorP
							this.correct.backgroundColor = res.data.data.optionSetInfo.selectedColorP
						}
					}
				})
			},
			openIsSelected() {
				this.$refs.popupIsSelected.open('center')
			},
			//查看那些题目没有完成
			changOption(index) {
				if (this.list[index].selected == true) {
					/* this.list[index].selected = false; */
					for (var i = 0; i < this.selectId.length; i++) {
						if (this.selectId[i] === this.list[index].course_id) {
							this.selectId.splice(i, 1);
						}
					}
				} else {
					this.list[index].selected = true;
					this.selectId.push(this.list[index].course_id)
				}
			},
			changOptiones(index) {
				if (this.isCorrecteList[index].selected == true) {
					/* this.list[index].selected = false; */
					for (var i = 0; i < this.isCorrecteSelectId.length; i++) {
						if (this.isCorrecteSelectId[i] === this.isCorrecteList[index].course_id) {
							this.isCorrecteSelectId.splice(i, 1);
						}
					}
				} else {
					this.isCorrecteList[index].selected = true;
					this.isCorrecteSelectId.push(this.isCorrecteList[index].course_id)
				}
			},
			submit() {
				var isOpen = true;
				for (let i = 0; i < this.list.length; i++) {
					if (!this.list[i].selected) {
						this.chenckAllOptions = this.chenckAllOptions + '"' + this.list[i].title
						isOpen = false;
					}
				}
				if (!isOpen) {
					if (!this.isFirstSubmit) {
						this.$refs.popup.open()
					} else {
						this.checkOptions()
					}
				} else {
					this.checkOptions()
				}

			},
			close() {
				this.$refs.popup.close()
				this.chenckAllOptions = ''
			},
			confirm() {
				this.checkOptions()
				this.chenckAllOptions = ''
			},
			checkOptions() {
				this.isFirstSubmit = true
				this.isDisabled = true
				this.isSubmitP = 0
				this.$refs.popup.close()
				if (!this.isTotalScore) {
					if (this.radioOption0 == this.optiones[0][0].answer) {
						this.totalScore = this.totalScore + 7.1;
						this.changOptiones(0)
					}
					if (this.radioOption1 == this.optiones[1][0].answer) {
						this.totalScore = this.totalScore + 7.1;
						this.changOptiones(1)
					}
					if (this.radioOption2 == this.optiones[2][0].answer) {
						this.totalScore = this.totalScore + 7.1;
						this.changOptiones(2)
					}
					if (this.radioOption3 == this.optiones[3][0].answer) {
						this.totalScore = this.totalScore + 7.1;
						this.changOptiones(3)
					}
					if (this.radioOption4 == this.optiones[4][0].answer) {
						this.totalScore = this.totalScore + 7.1;
						this.changOptiones(4)
					}
					if (this.radioOption5 == this.optiones[5][0].answer) {
						this.totalScore = this.totalScore + 7.1;
						this.changOptiones(5)
					}
					if (this.radioOption6 == this.optiones[6][0].answer) {
						this.totalScore = this.totalScore + 7.1;
						this.changOptiones(6)
					}
					if (this.radioOption7 == this.optiones[7][0].answer) {
						this.totalScore = this.totalScore + 7.1;
						this.changOptiones(7)
					}
					this.isTotalScore = true
				}
				this.isTotalScore = true
				this.$refs.isCorrectPopup.open('top')
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/css/common.css';

	/* /deep/.uni-popup__wrapper {
			width: 550rpx;
		} */

	/* /deep/.checklist-box,
		.uni-label-pointer {
			opacity: 0.1 !important;
		} */

	.option_style_one {}

	.option_style_two {
		border: 1rpx #a6d5eb solid;
		width: 90%;
		margin: 2% auto;
		border-radius: 3%;
		padding-top: 2%;
		padding-bottom: 2%;
	}
</style>
