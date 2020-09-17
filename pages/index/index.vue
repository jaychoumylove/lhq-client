<template>
	<view class="lottery-container">
		<view :style="'height:'+header+';width:100%;'"></view>
		<view class="navigationBar flex-set">贝壳零花钱</view>
		<view class="top-container">
			<view class="lotter-danmu">
				<image class="trumpet" src="/static/image/lottery/trumpet.png" mode="aspectFill"></image>
				<view class="get-danmu">
					<swiper class="small" autoplay interval="3000" vertical circular>
						<swiper-item class="swiper-item" v-for="(item, index) in logList" :key="index">
							<view class="item-text">
								恭喜<view class="text-overflow" style="padding: 0 10rpx; color: #FBCC3E; max-width: 250rpx;">{{item.user.nickname || $app.getData('NICKNAME')}}</view>刚刚抽中了<text>{{item.reward.desc}}</text>
							</view>
						</swiper-item>
					</swiper>
				</view>
				
			</view>
			<view class="lotter-rule" @tap="modal='rule'">规则说明</view>
		</view>
		<view class="contribution wrap">
			<view class="text-cont">
				<view class="text">今日分红池（元）</view>
				<view class="count">2000</view>
			</view>
			<view class="text-cont">
				<view class="text">第一名收益（元）</view>
				<view class="count">100</view>
			</view>
		</view>

		<view class="lottery-list-container">
			<view class="lottery-turn">
				<block v-for="(item,index) in prizeList" :key="index">
					<view class="lotter-turn-list" :style="lotterChange==item.index?'background-color: #FBCC3E;':''">
						<image :src="item.reward.image" mode="widthFix"></image>
						<view class="prizeName" v-if="item.reward.desc">{{item.reward.desc}}</view>
					</view>
				</block>
			</view>
			<view class="lottery-value" @tap="lotterStar">
				<view class="lotter-value-now">立即抽奖</view>
			</view>
		</view>

		<view style="text-align: center; font-size: 28rpx; padding: 20rpx 0;">
			<view>
				我的钥匙数量：{{myKeyNum}}
			</view>
			<view style="color: #FBCC3E;" @tap="openVideoLottery">
				观看完整视频下次贝壳奖励翻倍
			</view>
		</view>
		
		<view class="top-three-container">
			<view class="top-three-cont">
				<view class="title">贝壳排行榜前三</view>
				<view class="top-three wrap">
					<view class="top-item" style="margin-top: 3%;">
						<view class="avatar avatar2">
							<image class='crown' src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FmibDk8LrMNNib025upafEqqHmueeZYKuacYia8j4bAp6QvdV6QiaEOnbkHrmldib4cWCX0Z9zH9icI0Fw/0" mode="widthFix"></image>
							<image class='user-img' :src="top[1]&&top[1].user.avatarurl" mode="aspectFill"></image>
						</view>
						<view class="user-name text-overflow">{{top[1]&&top[1].user.nickname}}</view>
						<view class="hot flex-set">{{top[1]&&top[1].point||0}}</view>
					</view>
					<view class="top-item">
						<view class="avatar avatar1">
							<image class='crown' src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FmibDk8LrMNNib025upafEqqh1dCicMH9zslul4jQDl03ibeuBmTKsICIS3b0qpO60uiamrNjakg7AUEA/0" mode="widthFix"></image>
							<image class='user-img' :src="top[0]&&top[0].user.avatarurl" mode="aspectFill"></image>
						</view>
						<view class="user-name text-overflow">{{top[0]&&top[0].user.nickname}}</view>
						<view class="hot flex-set">{{top[0]&&top[0].point||0}}</view>
					</view>
					<view class="top-item" style="margin-top: 6%;">
						<view class="avatar avatar3">
							<image class='crown' src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FmibDk8LrMNNib025upafEqqboqMXAAOFaApkN81oVuJVgE61VOLl522ZZKMVTMJ4tJhQibIz6GpJNQ/0" mode="widthFix"></image>
							<image class='user-img' :src="top[2]&&top[2].user.avatarurl" mode="aspectFill"></image>
						</view>
						<view class="user-name text-overflow">{{top[2]&&top[2].user.nickname}}</view>
						<view class="hot flex-set">{{top[2]&&top[2].point||0}}</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<modalComponent v-if="modal == 'rule'" type="center" title="抽奖规则" @closeModal="modal=''">
			<view class="explain-container" style="color: #000000;">
				<view class="explain-top">
					<view class="explain-rule">抽奖规则</view>
				</view>
				<view class="explain-content">
					<view>1.转盘总共分8个，每个均有不同贝壳可获得，抽中神秘贝壳可获得神秘大奖；</view>
					<view>2.启动转盘需要获取钥匙，钥匙不足可在我的页面登录后获取；</view>
					<view>3.根据获取的贝壳数量，可前往排行页面查看自己的排名及收益情况；</view>
				</view>
			</view>
		</modalComponent>

	</view>


</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent,
		},
		data() {
			return {
				header: '',
				modal: '',
				lottery_value: 0, //幸运值
				lottery_times: 0, //已抽奖次数
				lottery_count: 0, //初次查询剩余抽奖次数
				prizeList: [],// 奖池
				boxList: '',
				logList: [], // 将次抽取滚动记录
				prizeResult: '', //抽奖结果KEY
				prizeName: null, //抽奖结果KEY对应的奖品名称
				lotterIn: false, //抽奖未结束不能点击
				prizeNum: 0,
				lotterChange: 0,
				timer: '',
				remainCount: 0, //剩余次数
				lottery_times_day: 0, //每日上限次数
				lotterRes: '', //抽奖结果
				logPage: 1,
				myKeyNum: 0,
				top: [], // 积分榜前三
				
			};
		},
		onLoad() {
			this.header = uni.getSystemInfoSync()['statusBarHeight'] + 'px'
		},
		onShow() {
			this.loadData();
		},
		methods: {
			loadData() {
				this.$app.request('page/index', {}, res => {
					const {log, lottery, top, key_num} = res.data;
					this.logList = log;
					this.prizeList = lottery;
					this.top = top;
					this.myKeyNum = key_num;
				})
			},
			explain() {
				this.modal = 'explain';
			},
			lotterStar() {
				let lotterIn = this.lotterIn;
				if (lotterIn) {
					this.$app.toast('你点击的太快了')
					return;
				} else {
					this.lotterIn = true;
				}
				if (this.myKeyNum < 1) {
					this.lotterIn = false;
					return this.$app.toast('没有钥匙了');
				}
				this.$app.request('bill/lottery', {}, res => {
					this.lotterChange = null, //抽奖过程KEY
					this.prizeResult = null; //抽奖结果KEY
					this.prizeName = null; //抽奖结果KEY对应的奖品名称

					let This = this;

					clearInterval(This.timer);
					This.timer = setInterval(This.changePrize, 40);
					setTimeout(function() {
						clearInterval(This.timer);
						This.timer = setInterval(This.changePrize, 80);
						setTimeout(function() {
							clearInterval(This.timer);
							This.timer = setInterval(This.changePrize, 150);
							setTimeout(function() {

								This.prizeResult = res.data.index,
								This.prizeName = res.data.reward.desc
								This.loadData();
							}, 1000)
						}, 1000)
					}, 1000)
				})
			},
			//抽奖过程奖品切换
			changePrize() {
				let lotterChange = this.lotterChange;
				lotterChange++;
				lotterChange = lotterChange > 8 ? 1 : lotterChange;

				this.lotterChange = lotterChange

				// console.log('过程'+lotterChange)

				if (this.prizeResult == lotterChange) {
					clearInterval(this.timer);
					console.log('结果' + this.prizeResult)
					this.lotterIn = false
					this.$app.toast('恭喜获得' + this.prizeName)
				}
			},
			openVideoLottery() {
				this.$app.openVideoAd(() => {
					this.lotteryBuriedPoint()
				},this.$app.getData('config').kindness_switch)
			},
			lotteryBuriedPoint(){
				this.$app.request('bill/double', {}, res => {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lottery-container {
		min-height: 100%;
		background-image: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E6PCGc2OHpnROtW32Yh9zQFiadSVefaUhy1R7icJztmUmHDY2Is4C8DZ1qMGxJR9Njjupz4CficreaQ/0);
		background-size: 100% 100%;
		color: #FFFFFF;

		.navigationBar {
			font-size: 32rpx;
			font-weight: bold;
			padding: 30rpx 0rpx 30rpx 0rpx;
			width: 100%;
		}


		.top-container {
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx 0;

			.lotter-danmu {
				height: 50rpx;
				display: flex;
				flex: 1 0%;
				background: linear-gradient(90deg, #D807CA, #3E2378);
				margin-right: 60rpx;
				flex-direction: row;
				
				.trumpet {
					width: 40rpx;
					height: 40rpx;
					padding: 5rpx;
					margin: 5rpx 10rpx;
				}
				.get-danmu{
					flex: 1 0%;
					overflow: hidden;
					.swiper-item{
						width: 100%;
						display: flex;
						flex-direction: row;
						.item-text{
							width: 100%;
							display: flex;
							flex-direction: row;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						
					}
				}
			}

			.lotter-rule {
				width: 140rpx;
				height: 50rpx;
				background: linear-gradient(90deg, #D807CA, #3E2378);
				font-size: 24rpx;
				border-top-left-radius: 30rpx;
				border-bottom-left-radius: 30rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.lottery-list-button {
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding: 40rpx 70rpx 0rpx 70rpx;
		}

		.contribution {
			width: 100%;

			.text-cont {
				flex: 1;
				font-size: 24rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.count {
					font-size: 40rpx;
					font-weight: bold;
				}

				.text {
					padding: 10rpx 0;
					font-weight: bold;
				}
			}
		}

		.lottery-list-container {
			display: flex;
			justify-content: center;
			padding: 40rpx;
			position: relative;

			.lottery-turn {
				width: 95%;
				height: 600rpx;
				background-image: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E6PCGc2OHpnROtW32Yh9zQbls8ApU8Bnb8v4PqmkFDYHQFWL6I05EQibEkoARX835iaZAue78w8nuQ/0);
				background-repeat: no-repeat;
				background-size: 100% 100%;
				padding: 40rpx;
				display: flex;
				justify-content: center;
				;
				align-items: center;
				flex-wrap: wrap;

				.lotter-turn-list {
					width: 143rpx;
					height: 140rpx;
					background-color: #FFEFEF;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					margin: 0 15rpx;
					border: 6rpx solid #ffc0c1;
					border-radius: 10rpx;

					image {
						width: 100rpx;
						height: 100rpx;
					}

					.prizeName {
						color: #a20e07;
						font-size: 20rpx;
						height: 30%;
					}
				}

				.lotter-turn-list:nth-child(1),
					{

					image {
						width: 100rpx;
					}

					.lottery_only {
						transform: translate(-70%, -110%);
					}
				}

				.lotter-turn-list:nth-child(4),
					{
					transform: translate(239.5%, -9%);

					image {
						width: 100rpx
					}

					.lottery_only {
						transform: translate(-70%, -110%);
					}
				}

				.lotter-turn-list:nth-child(5) {
					transform: translate(120.5%, 108%);

					image {
						width: 100rpx
					}

					.lottery_only {
						transform: translate(-70%, -110%);
					}
				}

				.lotter-turn-list:nth-child(6) {
					transform: translate(-119%, 109%);

					image {
						width: 100rpx
					}

					.lottery_only {
						transform: translate(-70%, -110%);
					}
				}

				.lotter-turn-list:nth-child(7) {
					transform: translate(-59%, -16%);

					image {
						width: 100rpx
					}

					.lottery_only {
						transform: translate(-70%, -110%);
					}
				}

				.lotter-turn-list:nth-child(8) {
					transform: translate(-180%, -133%);

					image {
						width: 100rpx
					}

					.lottery_only {
						transform: translate(-70%, -110%);
					}
				}


			}

			.lottery-value {
				position: absolute;
				top: 37%;
				left: 40%;
				background-image: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E6PCGc2OHpnROtW32Yh9zQ6PlFRxvWaLquIn0kJFpQmcnP6eI43grq9gNo6Xdlzs5cgGuiaXvIpkg/0);
				background-repeat: no-repeat;
				background-size: 100% 100%;
				width: 150rpx;
				height: 150rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				color: #FFFFFF;

				.lotter-value-num {
					font-size: 65rpx;
				}

				.lotter-value-now {
					font-size: 30rpx;
				}

				.lotter-value-desc {
					margin-top: 10rpx;
					letter-spacing: 5rpx;
					font-size: 20rpx;
					text-align: center;
				}
			}
		}

		.top-three-container{
			padding: 20rpx 40rpx;
			
			.top-three-cont{
				width: 100%;
				background-color: #FFF8FF;
				color: #000000;
				display: flex;
				flex-direction: column;
				padding: 20rpx;
				.title{
					padding: 20rpx 0;
				}
				.top-three{
					padding: 0 30rpx;
					.top-item{
						display: flex;
						flex-direction: column;
						flex: 1 0%;
						.avatar {
							border-radius: 50%;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
						}
						
						.avatar1 {
							
							.crown {
								width: 70rpx;
							}
							.user-img {
								border-radius: 50%;
								width: 110upx;
								height: 110upx;
								border: 7rpx solid #ffde5d;
								margin-top: -7rpx;
							}
						}
						.avatar2 {
							
							.crown {
								width: 60rpx;
							}
							.user-img {
								border-radius: 50%;
								width: 100upx;
								height: 100upx;
								border: 6rpx solid #e7f1f6;
								margin-top: -6rpx;
							}
						}
						.avatar3 {
							
							.crown {
								width: 50rpx;
							}
							.user-img {
								border-radius: 50%;
								width: 90upx;
								height: 90upx;
								border: 5rpx solid #ead0ba;
								margin-top: -5rpx;
							}
						}
						
						.user-name {
							margin-top: 10upx;
							max-width: 160rpx;
							text-align: center;
						}
						
						.hot {
							margin-top: 10upx;
							margin-bottom: 10upx;
							display: flex;
							align-items: center;
							color: #f00f00;
							font-size: 24rpx;
							
						}
						
						
					}
					
				}
			}
			
			
		}
	}
</style>
