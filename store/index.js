import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		icon: {
			//index页面
			setIcon: "https://www.shanzs.top/cetfile/cetappweb/index/set.png",
			backIcon: "https://www.shanzs.top/cetfile/cetappweb/index/back.png",
			//set
			personalIcon: "https://www.shanzs.top/cetfile/cetappweb/set/personal.png",
			feedIcon: "https://www.shanzs.top/cetfile/cetappweb/set/feed.png",
			with_meIcon: "https://www.shanzs.top/cetfile/cetappweb/set/with_me.png",
			messageIcon: "https://www.shanzs.top/cetfile/cetappweb/set/message.png",
			login_outIcon: "https://www.shanzs.top/cetfile/cetappweb/set/login_out.png",
			//播放组件
			startIcon: 'https://www.shanzs.top/cetfile/cetappweb/music/start.png',
			stopIcon: 'https://www.shanzs.top/cetfile/cetappweb/music/stop.png',
			//
			headsetIcon: 'https://www.shanzs.top/cetfile/cetappweb/fourLevels/headset.png'
		},
		/* icon: {
			//index页面
			setIcon: "http://192.168.153.206:5201/cetappweb/index/set.png",
			backIcon: "http://192.168.153.206:5201/cetappweb/index/back.png",
			//set
			personalIcon: "http://192.168.153.206:5201/cetappweb/set/personal.png",
			feedIcon: "http://192.168.153.206:5201/cetappweb/set/feed.png",
			with_meIcon: "http://192.168.153.206:5201/cetappweb/set/with_me.png",
			messageIcon: "http://192.168.153.206:5201/cetappweb/set/message.png",
			login_outIcon: "http://192.168.153.206:5201/cetappweb/set/login_out.png",
			//播放组件
			startIcon: 'http://192.168.153.206:5201/cetappweb/music/start.png',
			stopIcon: 'http://192.168.153.206:5201/cetappweb/music/stop.png',
			//
			headsetIcon: 'http://192.168.153.206:5201/cetappweb/fourLevels/headset.png'
		} */

	},
	mutations: {},
	actions: {}
})
export default store
