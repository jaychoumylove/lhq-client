<template>
	<view class="container">
		<block v-if="adUnitId">
			<!-- #ifdef MP-WEIXIN -->
			<ad :unit-id="adUnitId" ad-type="grid" grid-opacity="0.8" grid-count="5" ad-theme="white"></ad>
			<!-- #endif -->
			<!-- #ifdef MP-QQ -->		
			<ad :unit-id="adUnitId"></ad>
			<!-- #endif -->
		</block>
		<view class="top-info">
			<view class="rewards space-between">
				<view class="money">{{rankInfo.bonus_pools}}元</view>
				<view class="rule animation" @tap="modal='rule'">分红规则</view>
			</view>
			<view class="title">今日分红池</view>
			<view class="top-title space-between">
				<view class="">榜单</view>
				<view class="">贝壳（个）+前{{rankInfo.top_three_bonus.length || 1}}分红（元）</view>
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
						<view>{{item.point || '0'}}<text style="color: #f00f00;" v-if="rankInfo.top_three_bonus[index]">+{{rankInfo.top_three_bonus[index]}}</text></view>
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
					<view v-for="(item,index) in $app.getData('config').bonus_pools_rule" :key="index">{{item}}</view>
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
				// #ifdef MP-WEIXIN
				adUnitId: this.$app.gridAd_adUnitId,
				// #endif
				// #ifdef MP-QQ				
				adUnitId: this.$app.qq_bannerAdUnitId,
				// #endif
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
			this.page = 1;
			this.userRank = [],
			this.loadData()
			this.$app.openInterstitialAd()
		},
		onReachBottom() {
			this.page++
			this.rankList()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
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
