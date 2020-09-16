<template>
	<view class="container">
		<view class="top-content-container">
			<view class="row userinfo">
				<view class="get_user_info">
					<button style="overflow: visible;" open-type="getUserInfo" @getuserinfo="getUserInfo">
						<view class="avatar">
							<view class="avatarurl">
								<image :src="userInfo.avatarurl" mode="aspectFill"></image>
								<view class="tips">点击获取</view>
							</view>
						</view>
					</button>
				</view>

				<view class="info-content">
					<view class="item-line top">
						<view class="username">{{userInfo.nickname}}</view>
					</view>
					<view class="item-line">
						<view class="flex-set" v-if="userInfo.id" @tap="$app.copy(userInfo.id*1234)">
							<text style="font-weight: bold; padding-right: 10rpx;">ID:{{userInfo.id*1234}}</text> 复制
						</view>

					</view>
					
				</view>
			</view>
		</view>
		
		<view class="function-container-list">
			<view class="list-item" v-if="$app.getData('config').version != $app.getData('VERSION')" @tap="$app.goPage('/pages/user/account')">
				<view class="left-wrap">
					<view class="text">我的钱包</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>
			<view class="list-item" v-if="$app.getData('config').version != $app.getData('VERSION')">
				<view class="left-wrap">
					<view class="text">我的积分</view>
				</view>
				<view class="right-wrap iconfont">0000</view>
			</view>
			<view class="list-item" @tap="$app.goPage('/pages/user/ewm')" v-if="$app.getData('config').version != $app.getData('VERSION')">
				<view class="left-wrap">
					<view class="text">我的专属二维码</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>
			<!-- <button open-type="contact" :session-from="$app.getData('userInfo').id">
				<view class="list-item">
					<view class="left-wrap">
						<view class="text">联系客服</view>
					</view>
					<view class="right-wrap iconfont iconjiantou"></view>
				</view>
			</button> -->
		</view>
		
		<view class="task-container">
			<view class="task-title">常规任务</view>
		</view>
		
	</view>
</template>

<script>
	import btnComponent from "@/components/btnComponent.vue"
	import modalComponent from "@/components/modalComponent.vue"
	export default {
		components: {
			modalComponent,
			btnComponent
		},
		data() {
			return {
				userInfo: {},
				userCurrency: {},
				userID: '',
				modal: '',
				signTask: [],
				keyTask: [],
			};
		},
		onLoad() {},
		onShow() {
			this.userInfo = {
				avatarurl: this.$app.getData('userInfo')['avatarurl'] || this.$app.getData('AVATAR'),
				nickname: this.$app.getData('userInfo')['nickname'] || this.$app.getData('NICKNAME'),
				id: this.$app.getData('userInfo')['id'] || '123456',
			}
			this.loadData();
		
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			loadData () {
				this.$app.request("page/user_info", {}, res => {
					const {user, task} = res.data;
					this.userInfo = {
						avatarurl: user.avatarurl,
						nickname: user.nickname,
						id: user.id,
					}
					this.userCurrency = {
						point: user.point,
						balance: user.balance,
						key_num: user.key_num
					}
					this.signTask = task.sign;
					this.keyTask = task.other;
				})
			},
			copy() {
				uni.setClipboardData({
					data: this.$app.getData('config').kefu,
					success: () => {
						this.$app.toast("微信号已复制\n请到微信中添加客服为好友")
					}
				})
			},
			/**
			 * 保存用户详细信息
			 */
			getUserInfo(e) {
				const userInfo = e.detail.userInfo
				if (userInfo) {
					this.$app.request(this.$app.API.USER_SAVEINFO, {
						iv: e.detail.iv,
						encryptedData: e.detail.encryptedData,
					}, res => {
						if (res.data.token) this.$app.token = res.data.token
						this.$app.setData('userInfo', res.data.userInfo)
					}, 'POST', true)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		// padding: 20upx;
		background-color: #f5f5f5;

		.top-content-container {

			padding: 20upx 30upx;
			position: relative;
			z-index: 2;

			.row.userinfo {
				display: flex;
				border-radius: 30upx;
				background-image: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FmibDk8LrMNNib025upafEqqaB6iazPjm7Yajdx5R3LVxpBdicE4pfiarQYCicw5qHVW5kB0RXV0Su0Ukg/0);
				background-size: 100% 100%;
				padding: 30rpx 20rpx 40rpx 20rpx;

				.get_user_info {
					display: flex;
					align-items: center;
					padding-left: 20rpx;
				}

				.avatar {

					.avatarurl {
						position: relative;
						overflow: hidden;
						border-radius: 50%;
						width: 140upx;
						height: 140upx;

						z-index: 1;

					}


				}

				.info-content {
					padding-left: 30rpx;
					display: flex;
					flex: 1 0%;
					justify-content: space-around;
					flex-direction: column;
					font-size: 26upx;

					.tips {
						justify-content: space-between;
						font-size: 22rpx;
					}

					.item-line {
						width: 90%;
						display: flex;
						align-items: center;
						padding: 10rpx 0;

						.username {
							font-weight: 700;
							font-size: 30upx;
							margin-right: 8upx;
							color: #5F6176;
							max-width: 300rpx;
						}

						image.vip {
							width: 38upx;
							height: 38upx;
							margin-top: 4upx;
							margin-right: 6upx;
						}

						.vip-expire {
							font-size: 18upx;
							color: #999;
							margin-top: 12upx;
						}

						.id-content {
							border-radius: 20upx;
							font-size: 22upx;
							background-color: #FDDE2F;
							padding: 0 10upx;
							color: #5F6176;
							margin: 0 10upx;
						}

						

						
					}

					.item-line.bottom {
						font-size: 20upx;
					}
				}
			}

		}

		.item-wrap {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 20upx;
			padding-top: 20upx;

			.left-wrap {
				font-size: 30upx;
				display: flex;
				align-items: center;

				.icon {
					width: 63upx;
					height: 24upx;
					margin-right: 10upx;
				}

				.tips {
					color: #999;
					margin: 0 20upx;
					font-size: 26upx;

					.highlight {
						color: #345;
						font-weight: 700;
					}

				}
			}

			.right-wrap {
				font-size: 22upx;
				color: #999;
			}
		}

		

		.function-container-list {
			padding: 0 20rpx;
			background-color: #FFFFFF;

			.red {
				color: red;
			}

			.list-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 0 20upx;
				padding: 20upx 0;
				border-bottom: 1rpx solid #f5f5f5;
				color: #5F6176;

				.left-wrap {
					display: flex;
					align-items: center;

					image {
						width: 40upx;
						height: 40upx;
						margin-right: 30upx;
					}
				}

				.right-wrap {
					font-size: 22upx;
				}
			}
		}

		.task-container {
			height: 100%;
			padding: 20upx 40upx;
			background-color: #FFFFFF;

			.task-title {
				font-size: 28upx;
				font-weight: bold;
				color: #5F6176;
			}
		}

		.modal-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 40upx;
			height: 100%;
			justify-content: center;

			.title {
				font-size: 36upx;
				font-weight: 700;
			}

			.desc {
				display: flex;
				align-items: center;
				padding-top: 10upx;

				.modal-color {
					font-weight: 550;
				}

				image {
					width: 30rpx;
					height: 30rpx;
					margin: 0 5rpx;
				}
			}

			input {
				color: #5F6176;
				border-radius: 30upx;
				height: 90rpx;
				background: #ffd3dc;
				width: 88%;
				padding: 23rpx 40rpx;
				margin: 40rpx 0 0 0;

			}

			.btn-wrap {
				margin: 40upx 0;
				text-align: center;
				display: flex;
				width: 100%;
				justify-content: space-around;
				padding: 0 20upx;
			}

			.btn {
				font-size: 30upx;
				font-weight: 600;
				height: 80rpx;
				width: 300rpx;

			}

		}

	}
</style>
