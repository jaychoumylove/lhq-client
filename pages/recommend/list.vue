<template>
	<view class="container">
		<view class="top-info">
			<view class="contribution wrap">
				<view class="text-cont">
					<view class="count">{{state.sum}}</view>
					<view class="text">今日好友总贡献</view>
				</view>
				<view class="text-cont">
					<view class="count">{{state.first}}</view>
					<view class="text">今日直邀好友总贡献</view>
				</view>
				<view class="text-cont">
					<view class="count">{{state.second}}</view>
					<view class="text">今日扩散好友总贡献</view>
				</view>
			</view>
			<view class="select space-between">
				<view class="current" :class='{active:current==0}' @tap="switchAct(0)">直邀好友</view>
				<view class="current" :class='{active:current==1}' @tap="switchAct(1)">扩散好友</view>
				<view class="rule flex-set" @tap="modal='rule'">邀请好友规则</view>
			</view>
			<view class="top-title space-between">
				<view class="">用户</view>
				<view class="">累积积分（个）</view>
			</view>
		</view>

		<!-- 列表 -->
		<view class="list-container">
			<view class="item" v-for="(item,index) in userRank" :key="index">
				<view class="rank-left">
					<view class="rank-num flex-set">
						<image class="icon" v-if="index==0" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EialQmUQepDVg73f0xRdiaDh134ol0nlrCQn7vWLH72kAyLl0LdAa6XnkQnmLqJmRI1KV69Lyh21Mw/0" mode="widthFix"></image>
						<image class="icon" v-else-if="index==1" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EialQmUQepDVg73f0xRdiaDhnd70vGN5r9yiceUqbAicicKXseVe2AQ3PoAH9SbEChuclrxNJxACBTCHg/0" mode="widthFix"></image>
						<image class="icon" v-else-if="index==2" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EialQmUQepDVg73f0xRdiaDhS35UCmWgdXl7kFWvmZ357lAmZQP2iaheiakltPll9Ycs2Xy5ARGpcUAA/0" mode="widthFix"></image>
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
					<view>{{item.point_count || 0}}</view>
				</view>
			</view>
		</view>

		<!-- 我的 -->
		<button open-type="share" data-share="1">
			<view class="share-container">
			<!-- <button open-type="share" :data-share="1"> -->
				<view class="tab-share">邀请好友得分红</view>
			</view>
		</button>

		<modalComponent v-if="modal == 'rule'" type="center" title="分红池收益规则说明" @closeModal="modal=''">
			<view class="explain-container">
				<view class="explain-top">
					<view class="explain-rule">分红池收益规则说明</view>
				</view>
				<view class="explain-content">
					<view>1、您可以通过，里的转盘抽奖和签到
						获得积分奖励；</view>
					<view>2、积分兑换比例：1000积分元（兑换
						比例受每曰广告收益影响浮动）</view>
					<view>3、您获得的积分将于次日凌晨自动换算成
						现金红包（只换算10的倍数，剩余个位数积分累积的隔天结算） ,计入您的账号钱包
						中；</view>
					<view>4、每日对所有用户的积分排行，排行靠前的用户将获得额外的现金红包奖励，随着用户的逐步提升，现金奖励的名额也会逐步增加，具体奖励金额以页面为准；</view>
					<view>5、 若您的积分不足300分，暂时不予兑
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
				current: 0,
				modal: '',
				myInfo: '',
				rankInfo: '',
				AVATAR: this.$app.getData('AVATAR'),
				NICKNAME: this.$app.getData('NICKNAME'),
				state: {
					sum: 0,
					first: 0,
					second: 0
				}
			};
		},
		onLoad(option) {
			this.loadData()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		onReachBottom() {
			this.page++
			this.getRankList()
		},
		methods: {
			switchAct(current) {
				this.page = 1
				this.current = current
				this.getRankList()
			},
			loadData() {
				this.getRankList()
			},
			getRankList() {
				if (this.page > 10) return
				const type = parseInt(this.current) + 1;
				this.$app.request("page/friend_rank", {
					page: this.page,
					type
				}, res => {
					this.state = res.data.state;
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
			padding-top: 40rpx;

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
						font-size: 32rpx;
					}

					.text {
						padding: 10rpx 0;
					}
				}
			}

			.select {
				padding: 10rpx 20rpx;

				.current {
					font-size: 28rpx;
					font-weight: bold;
					color: #000000;
					padding: 10rpx;
				}

				.current.active {
					font-size: 28rpx;
					font-weight: bold;
					color: #f00f00;
					padding: 10rpx;
					border-bottom: 3rpx solid #f00f00;
				}

				.rule {
					font-size: 28rpx;
					color: $text-color-2;
				}

				.rule::after {
					content: "\e6e5";
					font-family: "iconfont" !important;
					padding-left: 10upx;
					color: #f00f00;
				}
			}

			.title {
				padding: 20rpx 0;
				font-size: 28rpx;
				color: $text-color-2;
			}

			.top-title {
				padding: 20rpx 20rpx 0rpx 20rpx;
				font-size: 22rpx;
				color: $text-color-2;
			}
		}

		.list-container {
			padding: 0 20rpx;

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
							width: 80upx;
							height: 80upx;
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

		.share-container {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 100upx;
			display: flex;
			align-items: center;
			color: #FFFFFF;
			background-color: transparent;

			.tab-share {
				width: 200rpx;
				padding: 15upx 0upx;
				margin: 0 40rpx;
				background: linear-gradient(to right bottom, #f8648a, #F00);
				box-shadow: 0 2upx 4upx rgba(#000, 0.3);
				justify-content: center;
				display: flex;
				font-size: 28upx;
				flex: 1;
				border-radius: 60rpx;
			}
		}
		
	}
</style>
