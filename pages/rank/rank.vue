<template>
	<view class="container">
		<view class="top-info">
			<view class="rewards space-between">
				<view class="money">2000元</view>
				<view class="rule" @tap="modal='rule'">分红规则</view>
			</view>
			<view class="title">今日分红池</view>
			<view class="top-title space-between">
				<view class="">榜单</view>
				<view class="">贝壳（个）+前3分红（元）</view>
			</view>
		</view>

		<!-- 列表 -->
		<view class="list-container">
			<block v-if="userRank.length>0">
				<view class="item" v-for="(item,index) in userRank" :key="index">
					<view class="rank-left">
						<view class="rank-num flex-set">
							<image class="icon" v-if="index==0" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EialQmUQepDVg73f0xRdiaDh134ol0nlrCQn7vWLH72kAyLl0LdAa6XnkQnmLqJmRI1KV69Lyh21Mw/0"
							 mode="widthFix"></image>
							<image class="icon" v-else-if="index==1" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EialQmUQepDVg73f0xRdiaDhnd70vGN5r9yiceUqbAicicKXseVe2AQ3PoAH9SbEChuclrxNJxACBTCHg/0"
							 mode="widthFix"></image>
							<image class="icon" v-else-if="index==2" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EialQmUQepDVg73f0xRdiaDhS35UCmWgdXl7kFWvmZ357lAmZQP2iaheiakltPll9Ycs2Xy5ARGpcUAA/0"
							 mode="widthFix"></image>
							<view v-else>{{index+1}}</view>
						</view>
						<view class="avatar-warp">
							<image class="avatar" :src="item.user.avatarurl || AVATAR" mode="aspectFill"></image>
						</view>
						<view class="user-name">
							{{item.user.nickname || NICKNAME}}
						</view>
					</view>
					<view class="rank-right">
						<view>{{item.point || '0'}}</view>
					</view>
				</view>
			</block>
			<block v-else>
				<view class="flex-set" style="width: 100%; padding: 20rpx; color: #cccccc; font-size: 24rpx;">----暂无数据----</view>
			</block>
		</view>

		<!-- 我的 -->
		<view class="my-container">
			<view class="rank-num">
				<view>{{myInfo.rank || 'no'}}</view>
			</view>
			<view class='avatar-wrap'>
				<image class="avatar" :src="$app.getData('userInfo').avatarurl || AVATAR" mode="aspectFill"></image>
			</view>
			<view class="text-container">
				<view>
					{{$app.getData('userInfo').nickname || NICKNAME}}
				</view>

			</view>
			<view class="count">{{myInfo.point || '0'}}</view>
		</view>

		<modalComponent v-if="modal == 'rule'" type="center" title="分红池收益规则说明" @closeModal="modal=''">
			<view class="explain-container">
				<view class="explain-top">
					<view class="explain-rule">分红池收益规则说明</view>
				</view>
				<view class="explain-content">
					<view>1、您可以通过，里的转盘抽奖和签到
						获得贝壳奖励；</view>
					<view>2、贝壳兑换比例：1000贝壳=1元（兑换
						比例受每曰广告收益影响浮动）</view>
					<view>3、您获得的贝壳将于次日凌晨自动换算成
						现金红包（只换算10的倍数，剩余个位数贝壳累积的隔天结算） ,计入您的账号钱包
						中；</view>
					<view>4、每日对所有用户的贝壳排行，排行靠前的用户将获得额外的现金红包奖励，随着用户的逐步提升，现金奖励的名额也会逐步增加，具体奖励金额以页面为准；</view>
					<view>5、 若您的贝壳不足300分，暂时不予兑
						换，累计到隔天结箕。</view>
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
				userRank: [],
				page: 1,
				modal: '',
				myInfo: '',
				rankInfo: '',
				AVATAR: this.$app.getData('AVATAR'),
				NICKNAME: this.$app.getData('NICKNAME'),
			};
		},
		onShow() {
			this.loadData()
		},
		onReachBottom() {
			this.page++
			this.rankList()
		},
		methods: {
			loadData() {
				this.rankList()
			},
			rankList() {
				if (this.page > 10) return

				this.$app.request('page/rank', {
					page: this.page,
				}, res => {
					this.rankInfo = res.data.rankInfo
					this.myInfo = res.data.myInfo
					if (this.page == 1) {
						this.userRank = res.data.list
					} else {
						this.userRank = this.userRank.concat(res.data.list)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.top-info {
			padding: 40rpx 40rpx 0rpx 40rpx;

			.rewards {
				.money {
					font-size: 40rpx;
					font-weight: bold;
					color: #000000;
				}

				.rule {
					font-size: 28rpx;
					color: $text-color-2;
				}

				.rule::after {
					content: "\e6e5";
					font-family: "iconfont" !important;
					padding-left: 10upx;
					color: #f00;
				}
			}

			.title {
				padding: 20rpx 0;
				font-size: 28rpx;
				color: $text-color-2;
			}

			.top-title {
				padding: 20rpx 0;
				font-size: 22rpx;
				color: $text-color-2;
			}
		}

		.list-container {
			padding: 0 20rpx;
			margin-bottom: 100rpx;

			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 40rpx 0;
				flex-direction: row;

				.rank-left {
					display: flex;
					align-items: center;
					flex: 1 1 0%;

					.rank-num {
						width: 40rpx;
						height: 40rpx;
						margin: 0 10rpx;
					}

					.avatar-warp {
						image {
							border-radius: 50%;
							width: 80rpx;
							height: 80rpx;
							margin: 0 10rpx;
						}

					}

					.user-name {
						margin: 0 10rpx;
					}

				}

				.rank-right {
					display: flex;
					align-items: cnter;
					margin-right: 20rpx;
				}
			}
		}

		.my-container {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 100upx;
			display: flex;
			align-items: center;
			background-color: #FFF;
			border-top: 2rpx solid #f2f3f4;

			.rank-num {
				text-align: center;
				width: 100upx;

				.icon {
					width: 50upx;
					height: 50upx;
				}
			}

			.avatar-wrap {
				position: relative;

				.avatar {
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
				}

				.headwear {
					width: 150%;
					height: 150%;
				}
			}

			.text-container {
				margin: 0 20upx;
				width: 350upx;

				image {
					width: 72rpx;
					height: 30rpx;
				}

				.bottom-text {
					display: flex;
					align-items: center;
					color: #FCF4F5;
				}
			}

			.count {
				margin-left: 30upx;
				color: #ff8421;
			}
		}

	}
</style>
