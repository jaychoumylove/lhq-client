<template>
	<view class="lottery-container">
		<view class="top-container">
			<view class="lotter-danmu">
				弹幕哈哈哈哈哈哈哈哈哈哈或
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
				<view class="lotter-turn-list" :style="lotterChange==0?'background-color: #FFFB00;':''">
					<image src="/static/image/lottery/no.1.png" mode="widthFix"></image>
					<view class="prizeName">哈哈哈</view>
				</view>
				<view class="lotter-turn-list" :style="lotterChange==1?'background-color: #FFFB00;':''">
					<image src="/static/image/lottery/no.1.png" mode="widthFix"></image>
					<view class="prizeName">哈哈哈</view>
				</view>
				<view class="lotter-turn-list" :style="lotterChange==2?'background-color: #FFFB00;':''">
					<image src="/static/image/lottery/no.1.png" mode="widthFix"></image>
					<view class="prizeName">哈哈哈</view>
				</view>
				<view class="lotter-turn-list" :style="lotterChange==3?'background-color: #FFFB00;':''">
					<image src="/static/image/lottery/no.1.png" mode="widthFix"></image>
					<view class="prizeName">哈哈哈</view>
				</view>
				<view class="lotter-turn-list" :style="lotterChange==4?'background-color: #FFFB00;':''">
					<image src="/static/image/lottery/no.1.png" mode="widthFix"></image>
					<view class="prizeName">哈哈哈</view>
				</view>
				<view class="lotter-turn-list" :style="lotterChange==5?'background-color: #FFFB00;':''">
					<image src="/static/image/lottery/no.1.png" mode="widthFix"></image>
					<view class="prizeName">哈哈哈</view>
				</view>
				<view class="lotter-turn-list" :style="lotterChange==6?'background-color: #FFFB00;':''">
					<image src="/static/image/lottery/no.1.png" mode="widthFix"></image>
					<view class="prizeName">哈哈哈</view>
				</view>
				<view class="lotter-turn-list" :style="lotterChange==7?'background-color: #FFFB00;':''">
					<image src="/static/image/lottery/no.1.png" mode="widthFix"></image>
					<view class="prizeName">哈哈哈</view>
				</view>

				<block v-for="(item,index) in prizeList" :key="index">
					<view class="lotter-turn-list" :style="lotterChange==item.index?'background-color: #FFFB00;':''">
						<image :src="item.imgsrc" mode="widthFix"></image>
						<view class="prizeName">{{item.prizeName}}</view>

					</view>
				</block>
			</view>
			<view class="lottery-value" @tap="lotterStar">
				<view class="lotter-value-now">立即抽奖</view>
			</view>
		</view>

		<view style="text-align: center; font-size: 28rpx; padding: 20rpx 0;">
			<view>
				今日还有{{remainCount?remainCount:lottery_count}}次抽奖机会。
			</view>
			<view style="color: #FBCC3E;">
				观看完整视频积分奖励翻倍
			</view>
		</view>
		<modalComponent v-if="modal == 'rule'" type="center" title="抽奖规则" @closeModal="modal=''">
			<!-- <view style="height: 500rpx;">规则说明</view> -->
			<view class="explain-container">
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
				modal: '',
				lottery_value: 0, //幸运值
				lottery_times: 0, //已抽奖次数
				lottery_count: 0, //初次查询剩余抽奖次数
				prizeList: [],
				boxList: '',
				logList: '',
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

			};
		},
		onLoad() {

		},
		onShow() {
			this.getLotter();
			this.getBox();
			this.addCount();
			this.getLog();
		},
		methods: {
			getLotter() {
				this.$app.request('lottery/list', {}, res => {
					this.prizeList = res.data.data;
					this.lottery_value = res.data.lottery.lottery_value;
					this.lottery_times = res.data.lottery.lottery_times;
					this.lottery_count = res.data.lottery.lottery_count;
					this.lottery_times_day = res.data.lottery_times_day;
				})
			},
			explain() {
				this.modal = 'explain';
			},
			myBox() {
				this.modal = 'box';
				this.getBox();
			},
			myLogList() {
				this.modal = 'logList';
				this.getLog();
			},
			openBox(event) {
				wx.showModal({
					title: '提示',
					content: '是否现在使用？',
					success: res => {
						if (res.confirm) {
							this.$app.request('lottery/openBox', {
								type: event.currentTarget.dataset.type,
								id: event.currentTarget.dataset.id,
							}, res => {
								this.$app.toast(res.msg);
								this.getBox();
							})
						}
					}
				})

			},
			getLog() {
				this.$app.request('lottery/log_list', {
					page: this.logPage
				}, res => {
					if (this.logPage == 1) {
						this.logList = res.data;
					} else {
						this.logList = this.logList.concat(res.data)
					}
				})
			},
			getBox() {
				this.$app.request('lottery/box_list', {}, res => {
					this.boxList = res.data;
				})
			},
			lotterStar() {
				let lotterIn = this.lotterIn;
				console.log(lotterIn);
				if (lotterIn) {
					this.$app.toast('你点击的太快了')
					return;
				} else {
					this.lotterIn = true;

				}
				this.$app.request('lottery/lotteryStar', {}, res => {
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
									This.prizeName = res.data.prizeName
								This.prizeNum = res.data.prizeNum

							}, 1000)
						}, 1000)
					}, 1000)
					this.getLotter();
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
					this.$app.toast('恭喜获得' + this.prizeName + '+' + this.prizeNum)
					this.addCount();
					this.getBox();
				}
			},
			//点击再抽一次按钮
			addCountRequest(type) {
				this.$app.request('lottery/addCount', {
					type
				}, res => {
					this.remainCount = res.data
				})
			},
			addCount() {
				// this.addCountRequest(0)

				clearInterval(this.timeId)
				this.timeId = setInterval(() => {

					this.addCountRequest(1)

				}, 60 * 1000)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.lottery-container {
		height: 100%;

		.top-container {
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx 0;

			.lotter-danmu {
				display: flex;
				flex: 1 0%;
			}

			.lotter-rule {
				width: 140rpx;
				height: 50rpx;
				background: linear-gradient(270deg, rgba(255, 136, 109, 1) 0%, rgba(255, 52, 137, 1) 100%);
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
				height: 650rpx;
				background-image: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FNdUlugiazOlxbYovfK8529qyUehuKsAcf1oSsb0VmibTltL4JNv300M1r5D3UWOKw8NykebdoOn4Q/0);
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
						width: 70rpx;
					}

					.prizeName {
						color: #FD0100;
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
					transform: translate(238%, 0%);

					image {
						width: 100rpx
					}

					.lottery_only {
						transform: translate(-70%, -110%);
					}
				}

				.lotter-turn-list:nth-child(5) {
					transform: translate(119%, 135%);

					image {
						width: 100rpx
					}

					.lottery_only {
						transform: translate(-70%, -110%);
					}
				}

				.lotter-turn-list:nth-child(6) {
					transform: translate(-119%, 136%);

					image {
						width: 100rpx
					}

					.lottery_only {
						transform: translate(-70%, -110%);
					}
				}

				.lotter-turn-list:nth-child(7) {
					transform: translate(-59%, 1%);

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
				top: 39.5%;
				left: 39.5%;
				background-image: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FNdUlugiazOlxbYovfK8529ktSyYHMndDxowdnMjZuibIHbjVGU79qNYsm4wajcbNUKdBzcSJW6WEA/0);
				background-repeat: no-repeat;
				background-size: 100% 100%;
				width: 160rpx;
				height: 160rpx;
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
