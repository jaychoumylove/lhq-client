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
				观看完整视频下次积分奖励翻倍
			</view>
		</view>
		<modalComponent v-if="modal == 'rule'" type="center" title="抽奖规则" @closeModal="modal=''">
			<view class="explain-container" style="color: #000000;">
				<view class="explain-top">
					<view class="explain-rule">抽奖规则</view>
				</view>
				<view class="explain-content">
					<view>1.每人每天抽奖机会上限为{{lottery_times_day}}次</view>
					<view>2.在线时,每分钟恢复一次抽奖机会,存储上限为30次</view>
					<view>3.离线时,每分钟恢复一次抽奖机会,存储上限为10次</view>
					<view>4.每次抽奖可累计幸运值，幸运值越高到达100将增大抽中稀有物品几率。</view>
					<view>5.获得的道具物品可通过我的宝箱查看使用。</view>
					<view>6.每日幸运值重置为"0"。</view>
					<view>7.随机星星礼盒和神秘宝箱上限5个，请及时使用，否则再次抽取到将作废。</view>
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
				lotterChange = lotterChange > 12 ? 1 : lotterChange;

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
					background-color: #FFEEEE;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					margin: 0 15rpx;
					border: 6rpx solid #B72100;
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


	}
</style>
