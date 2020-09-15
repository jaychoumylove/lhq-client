<template>
	<view class="ad-container" v-if="!loading">
		<view class="top" :class="fix.top">
			<view class="header iconfont iconclose" @tap="cancel">关闭</view>
			<view class="buttom">
				<view>广告</view>
				<view class="timer" v-if="timeLeft > 0">浏览页面{{timeLeft}}秒后可获得奖励</view>
				<view class="timer" v-else>已完成浏览</view>
			</view>
		</view>
		<view class="banner" :class="fix.banner">
			<view class="img" v-if="banner" :style="{'background': 'url('+banner+') no-repeat center center/100% 100%'}"></view>
		</view>
		<view class="go-min" @tap="goRead">
			<view class="btn">免费阅读</view>
		</view>
		<view class="content" v-if="content">
			<jyf-parser :html="content" ref="article"></jyf-parser>
		</view>
		<view class="go-min last" @tap="goRead">
			<view class="btn">下一章</view>
			<view class="btn">目录</view>
		</view>
		<modalComponent v-if="modal == 'freeRead'" type="center" title="提示" @closeModal="modal=''">
			<view class="free-read-container">
				<!-- #ifdef MP-WEIXIN -->
				<view class="title">免费阅读</view>
				<view class="btn-wrap flex-set">
					<btnComponent type="success">
						<button class="btn" open-type="contact">
							<view class="flex-set" style="">回复数字“9”继续免费阅读</view>
						</button>
					</btnComponent>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-QQ -->
				<view class="title">扫码免费阅读</view>
				<view class="flex-set">
					<image src="https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9EkMJjFzbNmGOQGSJI2FKoSO8V5KyDpicYBXtRU9VCZHzYufTiaViax6FC49iceYJlHdNZRPJTs1973fg/0" mode="aspectFit"></image>
				</view>
				<!-- #endif -->
			</view>
		</modalComponent>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	import modalComponent from '@/components/modalComponent.vue';
	import btnComponent from '@/components/btnComponent.vue'
	export default{
	  components: {
	    jyfParser,
		modalComponent,
		btnComponent
	  },
		data() {
			return {
				timerInter: '',
				timerOuter: '',
				modal: '',
				banner: '',
				content: '',
				timeLeft: 0,
				loading: true,
				timeTask: null,
				fix: {
					top: "",
					banner: "",
					// middleRead: "",
					// content: "",
					// bottomRead: "",
				}
			};
		},
		onShow() {
			const { windowHeight } = uni.getSystemInfoSync();
			if (windowHeight < 600) {
				this.fix.top = 'top-small';
				this.fix.banner = 'banner-small';
			}
			if (windowHeight >= 600 && windowHeight <= 640) {
			}
			if (windowHeight > 640 && windowHeight <= 750) {
			}
			if (windowHeight > 750) {
				this.fix.top = 'top-large';
				this.fix.banner = 'banner-large';
			}
			this.timeTask = this.$app.getData('timeTask');
			this.getAd();
		},
		onUnload() {
			const task = this.$app.getData('timeTask');
			if (task) {
				this.$app.modal('暂未获得奖励', () => {
					this.$app.setData('timeTask', task)
					uni.navigateTo({
						url:"/pages/ad/custom"
					})
				}, '继续', () => {
					this.$app.toast('看完广告才有奖励哦');
				}, '放弃')
			}
			this.cleanTimer();
		},
		onHide() {
			this.cleanTimer();
		},
		methods: {
			getAd() {
				uni.showLoading({
					title:"广告正在加载中...",
					mask:true
				});
				
				this.$app.request('ad/custom', {}, (res) => {
					this.banner = res.data.banner;
					this.content = res.data.content;
					this.setTimer(res.data.second);
					this.loading = false;
					uni.hideLoading();
				});
			},
			cleanTimer () {
				clearTimeout(this.timerOuter);
				clearInterval(this.timerInter);
				this.timerOuter = '';
				this.timerInter = '';
				this.$app.setData('timeTask', null);
				this.timeTask = null;
			},
			setTimer(time) {
				const times = time*1000;
				this.timeLeft = time;
				this.timerOuter = setTimeout(() => {
					if (this.timeTask != null) {
						this.timeTask && this.timeTask();
					}
					clearTimeout(this.timerOuter);
					this.timerOuter = '';
					this.$app.setData('timeTask', null);
					this.timeTask = null;
				}, times);
				this.timerInter = setInterval(() => {
					if (this.timeLeft > 0) {
						this.timeLeft--;
					} else {
						clearInterval(this.timerInter);
						this.timerInter = '';
					}
				}, 1000);
			},
			cleanBack(res) {
				this.cleanTimer();
			},
			goRead() {
				this.modal = 'freeRead';
			},
			cancel() {
				if (this.timeTask) {
					this.$app.modal(`暂未获得奖励，确认离开么`, () => {
						this.cleanTimer();
						uni.navigateBack();
					})
				} else {
					this.cleanTimer();
					uni.navigateBack();
				}
			}
		}
	}
</script>

<style lang="scss">
	.ad-container {
		/deep/ .container .modal-container {
			overflow: unset!important;
		}
		
		// 屏幕兼容 start
		.top-large {
			padding-top: 90rpx!important;
		}
		.banner-large {
			padding-top: 250rpx!important;
		}
		.top-small {
			padding-top: 60rpx!important;
		}
		.banner-small {
			padding-top: 220rpx!important;
		}
		// end
		
		background-color: black;
		.top {
			position: fixed;
			width: 100%;
			background-color: black;
			display: flex;
			flex-direction: column;
			font-size: 30rpx;
			padding-top: 50rpx;
			view {
				margin: 0 40rpx;
				height: 80rpx;
				line-height: 80rpx;
			}
			.header {
				color: white;
				padding-left: 40rpx;
			}
			.buttom {
				font-size: 28rpx;
				color: white;
				display: flex;
				.timer {
					margin-left: auto;
					margin-right: 0;
				}
			}
		}
		.banner {
			padding-top: 210rpx;
			.img {
				height: 1000rpx;
			}
		}
		.content {
			padding: 0 40rpx;
			background-color: rgb(250, 249, 222);
			font-size: 34rpx;
		}
		.go-min {
			font-size: 38rpx;
			background-color: rgb(250, 249, 222);
			display: flex;
			flex-direction: column;
			view {
				margin: 20rpx auto;
				border-radius: 20rpx;
				width: 320rpx;
				text-align: center;
				height: 80rpx;
				line-height: 80rpx;
				font-weight: 500;
				color: white;
				background-color: #f7a074;
			}
		}
		.last {
			padding-bottom: 60rpx;
		}
		
		.free-read-container {
			$fontC: #b50023;
			$fontS: 26rpx;
			position: relative;
			.title {
				position: absolute;
				background: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9H3sH9NNZVwUQcM60TfnoLibOWALPClHthrHsDEOXWlibafbnq2tp4c4FC83PbEht3r7HibBJ3QDjjkg/0") no-repeat center center / cover;
				left: 50%;
				top: -100rpx;
				transform: translate(-50%, -50%);
				width: 400rpx;
				height: 100rpx;
				color: white;
				text-align: center;
				line-height: 65rpx;
				font-size: 30rpx;
				font-weight: 650;
				z-index: 999;
			}
			image {
				width: 450rpx;
				height: 450rpx;
			}
			.btn-wrap {
				margin: 30rpx 0;
				.btn {
					margin: 0;
					font-size: 30rpx;
					font-weight: 650;
					padding: 20rpx 30rpx;
					width: 300rpx;
				}
			}
		}
	
	}
</style>
