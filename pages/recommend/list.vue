<template>
	<view class="container">
		<view class="top-info">
			<view class="contribution wrap">
				<view class="text-cont">
					<view class="count">000</view>
					<view class="text">今日好友总贡献</view>
				</view>
				<view class="text-cont">
					<view class="count">000</view>
					<view class="text">今日直邀好友总贡献</view>
				</view>
				<view class="text-cont">
					<view class="count">000</view>
					<view class="text">今日扩散好友总贡献</view>
				</view>
			</view>
			<view class="select space-between">
				<view class="current" :class='{active:current==0}' @tap="switchAct(0)">直邀好友</view>
				<view class="current" :class='{active:current==1}' @tap="switchAct(1)">扩散好友</view>
				<view class="rule flex-set">邀请好友规则</view>
			</view>
			<view class="top-title space-between">
				<view class="">用户</view>
				<view class="">累积积分（个）</view>
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
		<view class="share-container">
			<view class="tab-share">邀请好友得分红</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userRank: [],
				page: 1,
				current: 0,
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
			
				this.$app.request(this.$app.API.USER_RANK, {
					starid: this.starid,
					page: this.page,
					current:this.current,
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
			padding-top: 40rpx;
			.contribution{
				width: 100%;
				.text-cont{
					flex: 1;
					font-size: 24rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.count{
						font-size: 32rpx;
					}
					.text{
						padding: 10rpx 0;
					}
				}
			}
			.select{
				padding: 10rpx 20rpx;

				.current{
					font-size: 28rpx;
					font-weight: bold;
					color: #000000;
					padding: 10rpx;
				}
				
				.current.active{
					font-size: 28rpx;
					font-weight: bold;
					color: #f00f00;
					padding: 10rpx;
					border-bottom: 3rpx solid #f00f00;
				}
				.rule{
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
			
			.title{
				padding: 20rpx 0;
				font-size: 28rpx;
				color: $text-color-2;
			}
			
			.top-title{
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

		.share-container {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 100upx;
			display: flex;
			align-items: center;
			color: #FFFFFF;
			background-color:transparent;
			.tab-share {
				width: 200rpx;
				padding: 15upx 0upx;
				margin: 0 40rpx;
				background:linear-gradient(90deg,rgba(254,140,175,1),rgba(255,120,161,1));
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
