<template>
	<view class="container">
		<view class="top-info">
			<view class="rewards space-between">
				<view class="money">2000元</view>
				<view class="rule">分红规则</view>
			</view>
			<view class="title">今日分红池</view>
			<view class="top-title space-between">
				<view class="">榜单</view>
				<view class="">积分（个）+前3分红（元）</view>
			</view>
		</view>

		<!-- 列表 -->
		<view class="list-container">
			<view class="item">
				<view class="rank-left">
					<view class="rank-num flex-set">
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HhvlXURtbJbFvRVwdINYhHcvbxyK2p9RfyBWvElE6xwtFt3PoIwISs0vLHUhmiaKvhnIL6kzh38uA/0"
						 mode=""></image>
					</view>
					<view class="avatar-warp">
						<image class="avatar" :src="item.user.avatarurl || AVATAR" mode="aspectFill"></image>
					</view>
					<view class="user-name">
						{{item.user.nickname || NICKNAME}}
					</view>
				</view>
				<view class="rank-right">
					<view>{{item.hot || '1111'}}</view>
				</view>
			</view>
			<view class="item">
				<view class="rank-left">
					<view class="rank-num flex-set">
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HhvlXURtbJbFvRVwdINYhHcvbxyK2p9RfyBWvElE6xwtFt3PoIwISs0vLHUhmiaKvhnIL6kzh38uA/0"
						 mode=""></image>
					</view>
					<view class="avatar-warp">
						<image class="avatar" :src="item.user.avatarurl || AVATAR" mode="aspectFill"></image>
					</view>
					<view class="user-name">
						{{item.user.nickname || NICKNAME}}
					</view>
				</view>
				<view class="rank-right">
					<view>{{item.hot || '1111'}}</view>
				</view>
			</view>
			<view class="item">
				<view class="rank-left">
					<view class="rank-num flex-set">
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HhvlXURtbJbFvRVwdINYhHcvbxyK2p9RfyBWvElE6xwtFt3PoIwISs0vLHUhmiaKvhnIL6kzh38uA/0"
						 mode=""></image>
					</view>
					<view class="avatar-warp">
						<image class="avatar" :src="item.user.avatarurl || AVATAR" mode="aspectFill"></image>
					</view>
					<view class="user-name">
						{{item.user.nickname || NICKNAME}}
					</view>
				</view>
				<view class="rank-right">
					<view>{{item.hot || '1111'}}</view>
				</view>
			</view>
			<view class="item" v-for="(item,index) in userRank" :key="index">
				<view class="rank-left">
					<view class="rank-num flex-set">
						<image class="icon" v-if="index==0" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HhvlXURtbJbFvRVwdINYhHcvbxyK2p9RfyBWvElE6xwtFt3PoIwISs0vLHUhmiaKvhnIL6kzh38uA/0"
						 mode=""></image>
						<image class="icon" v-else-if="index==1" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HhvlXURtbJbFvRVwdINYhHREheWFHXGbHGf3unhB8zN0siaVwoZzictZOjBZzhyR5ibvLFMIPwibSWDQ/0"
						 mode=""></image>
						<image class="icon" v-else-if="index==2" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HhvlXURtbJbFvRVwdINYhHibnaZud2z8MHeCCXWDicbgiajDCV5ke7vaCkk0040I7m4OVeGPIAibnpbA/0"
						 mode=""></image>
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
					<view>{{item.hot || '1111'}}</view>
				</view>
			</view>
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
			<view class="count">{{myInfo.score||'1111'}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userRank: [],
				page: 1,
				myInfo: '',
				rankInfo: '',
				AVATAR: this.$app.getData('AVATAR'),
				NICKNAME: this.$app.getData('NICKNAME'),
			};
		},
		onLoad(option) {
			this.loadData()
		},
		onReachBottom() {
			this.page++
			this.loadData()
		},
		methods: {

			loadData() {
				if (this.page > 10) return

				this.$app.request(this.$app.API.USER_RANK, {
					starid: this.starid,
					page: this.page,
				}, res => {
					this.rankInfo = res.data.rankInfo
					this.myInfo = res.data.mymyInfo
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
		.top-info{
			padding: 40rpx 40rpx 0rpx 40rpx;
			.rewards{
				.money{
					font-size: 40rpx;
					font-weight: bold;
					color: #000000;
				}
				.rule{
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
			.title{
				padding: 20rpx 0;
				font-size: 28rpx;
				color: $text-color-2;
			}
			.top-title{
				padding: 20rpx 0;
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
						width: 30rpx;
						height: 30rpx;
						margin: 0 10rpx;
					}

					.avatar-warp {
						image {
							border-radius: 50%;
							width: 60rpx;
							height: 60rpx;
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
