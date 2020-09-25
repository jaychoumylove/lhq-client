<template>
	<view class="container">
		<view class="top-content-container">
			<view class="row userinfo">
				<view class="get_user_info">
					<button style="overflow: visible;" open-type="getUserInfo" @getuserinfo="getUserInfo">
						<view class="avatar">
							<view class="avatarurl">
								<image :src="userInfo.avatarurl || $app.getData('AVATAR') " mode="widthFix"></image>
								<view class="tips" v-if="!userInfo.avatarurl">点击获取</view>
							</view>
						</view>
					</button>
				</view>

				<view class="info-content">
					<view class="item-line top">
						<view class="username">{{userInfo.nickname || $app.getData('NICKNAME')}}</view>
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
					<view class="text">我的贝壳</view>
				</view>
				<view class="right-wrap iconfont">{{userCurrency.point}}</view>
			</view>
			<view class="list-item" @tap="$app.goPage('/pages/user/ewm')" v-if="$app.getData('config').version != $app.getData('VERSION')">
				<view class="left-wrap">
					<view class="text">我的专属二维码</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>
			<view class="list-item" v-if="$app.getData('config').version != $app.getData('VERSION')" @tap="$app.goPage('/pages/user/log')">
				<view class="left-wrap">
					<view class="text">记录明细</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>
			<button open-type="contact" :session-from="$app.getData('userInfo').id">
				<view class="list-item">
					<view class="left-wrap">
						<view class="text">联系客服</view>
					</view>
					<view class="right-wrap iconfont iconjiantou"></view>
				</view>
			</button>
		</view>
		<block v-if="adUnitId">
			<!-- #ifdef MP-WEIXIN -->
			<ad :unit-id="adUnitId" ad-type="grid" grid-opacity="0.8" grid-count="5" ad-theme="white"></ad>
			<!-- #endif -->
			<!-- #ifdef MP-QQ -->		
			<ad :unit-id="adUnitId"></ad>
			<!-- #endif -->
		</block>
		
		<view class="task-container">
			<view class="task-title">常规任务</view>
			<view class="task-sign">
				<view class="task-sign-title"><text>签到任务</text>签到赠送贝壳</view>
				<view class="task-sign-list">
					<view class="sign-item" v-for="(item, index) in signTask" :key="index" @tap="taskSignSettle(index)">
						<view class="count flex-set" :class="{active: item.status > -1,animation: item.status == 0}">+{{item.reward.point}}</view>
						<view class="sign-day" :class="{active: item.status > -1}">第{{item.number}}天</view>
					</view>
				</view>
			</view>
			<view class="task-list">
				<view class="item" v-for="(item,index) in keyTask" :key="index">
					<view class="left-content">
						<image class="img" :src="item.extra.image" mode="widthFix"></image>
						<view class="content ">
							<view class="top text-overflow">{{item.title}}
								<text v-if="item.limit > 0">({{item.times}}/{{item.limit}})</text>
							</view>
							<view class="bottom">{{item.desc}}</view>
						</view>
					</view>
				
					<view class="right-content">
						<view class="btn">
							<block v-if="item.type == 'VIDEO_KEY'">
								<btnComponent type="default">
									<view class="flex-set" v-if="item.extra.type == 'open_video'" @tap="openVideoSettle(index)" style="width: 130upx;height: 60upx;">
										{{item.btn_text||'去领取'}}
									</view>
								</btnComponent>
							</block>
							<block v-if="item.type == 'DAY_KEY'">
								<btnComponent type="default" v-if='!item.seconds' @tap="taskKeySetttle(index)">
									<view class="flex-set" style="width: 130upx;height: 60upx;">
										{{item.btn_text||'去领取'}}
									</view>
								</btnComponent>
								<btnComponent type="disable" v-if='item.seconds'>
									<view class="flex-set" style="width: 130upx;height: 60upx;">
										{{item.seconds}}s
									</view>
								</btnComponent>
							</block>
							<block v-if="item.type == 'INVITE'">
								<btnComponent type="default" v-if="!item.able_settle">
									<button class="btn" open-type="share" :data-share="item.extra.shareid">
										<view class="flex-set" style="width: 130upx;height: 60upx;">
											{{item.btn_text||'去领取'}}
										</view>
									</button>
								</btnComponent>
								<btnComponent type="success" @tap="taskKeySetttle(index)" v-if="item.able_settle">
									<view class="flex-set" style="width: 130upx;height: 60upx;">去领取</view>
								</btnComponent>
							</block>
						</view>
					</view>
				</view>
			</view>
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
				// #ifdef MP-WEIXIN
				adUnitId: this.$app.gridAd_adUnitId,
				// #endif
				// #ifdef MP-QQ				
				adUnitId: this.$app.qq_bannerAdUnitId,
				// #endif
				userInfo: {},
				userCurrency: {},
				userID: '',
				modal: '',
				signTask: [],
				keyTask: [],
				dayKeyTaskTimer: "",
				dayKeyTaskTimeLeft: 0,
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
			this.$app.openInterstitialAd()
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
					Object.keys(task.other).map((item) => {
						if (task.other[item].type == 'DAY_KEY') {
							this.setTimer(item);
						}
					})
				})
			},
			setTimer(index) {
				if (this.dayKeyTaskTimer) clearInterval(this.dayKeyTaskTimer);
				this.dayKeyTaskTimer = setInterval(() => {
					if (this.keyTask[index].seconds > 0) {
						this.keyTask[index].seconds--;
						this.$set(this.keyTask,index,this.keyTask[index]);
					}
				}, 1000)
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
						this.userInfo = res.data.userInfo
					}, 'POST', true)
				}
			},
			taskSignSettle(index) {
				if(!this.$app.getData('userInfo')['avatarurl']){
					this.$app.toast('请点击左上角头像完善身份信息')
					return ;
				} 
				// 签到任务
				const item = this.signTask[index];
				// if (item.status == 1) {
				// 	return this.$app.toast('不可以重复签到哦', 'none')
				// }
				// if (item.status == -1) {
				// 	return this.$app.toast('还没到签到时间哦')
				// }
				if (item.status != 0) {
					return;
				}
				uni.showLoading({
					mask:true,
					title:"签到中..."
				});
				this.$app.request('task/settle', {type: item.type}, res => {
					this.signTask[index].status = 1;
					let msg = `恭喜获得${res.data.point}贝壳`;
					this.$app.toast(msg);
				}, 'POST', true)
			},
			
			taskKeySetttle(index) {
				const item = this.keyTask[index];
				// 钥匙任务
				// if (!item.able_settle) {
				// 	return this.$app.toast('未达到领取条件')
				// };
				this.$app.request('task/settle', {type: item.type}, res => {
					let msg = `恭喜获得${res.data.key_num}把钥匙`;
					this.$app.toast(msg);
					this.keyTask[index].times = this.keyTask[index].times+1;
					if (item.type == 'INVITE') {
						this.keyTask[index].number = 0;
						this.keyTask[index].able_settle = false;
					}
					if (item.type == 'DAY_KEY') {
						this.keyTask[index].seconds = res.data.second;
					}
					this.$set(this.keyTask,index,this.keyTask[index]);
					if (item.type == 'DAY_KEY') {
						this.setTimer(index);
					}
				}, 'POST', true)
			},
			openVideoSettle(index) {
				this.$app.openVideoAd(() => {
					this.taskKeySetttle(index)
				},this.$app.getData('config').kindness_switch)
			}
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
						
						.tips{
							position: absolute;
							bottom: 5%;
							font-size: 24rpx;
							left: 18%;
						}

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
			}
			.task-sign{
				padding: 20rpx;
				background-color: #fff6f6;
				border-radius: 20rpx;
				font-size: 24rpx;
				margin: 20rpx 0;
				
				.task-sign-title{
					color: #999999;
					padding: 10rpx 0;
					text{
						color: #000000;
						font-size: 28rpx;
						font-weight: bold;
						padding-right: 10rpx;
					}
				}
				.task-sign-list{
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					.sign-item{
						display: flex;
						flex: 1 0%;
						flex-direction: column;
						justify-content: center;
						.count{
							width: 70rpx;
							height: 70rpx;
							border-radius: 50%;
							background-color: #ccc;
							color: #666666;
							margin-top: 20rpx;
						}
						.sign-day{
							color: #ccc;
							padding: 10rpx 0;
						}
						.count.active{
							background-color: #ff867d !important;
							color: #FFFFFF !important;
						}
						.sign-day.active{
							color: #ff867d !important;
						}
						
						.animation{
							animation: mymove 3s infinite;
							animation-direction: alternate;
							/*轮流反向播放动画。*/
							animation-timing-function: ease-in-out;
						}
						
						@keyframes mymove {
							0% {
								transform: scale(1);
								/*开始为原始大小*/
							}
						
							25% {
								transform: scale(1.1);
								/*放大1.1倍*/
							}
						
							50% {
								transform: scale(1);
							}
						
							75% {
								transform: scale(1.1);
							}
						
						}
						
					}
				}
			}
			.task-list{
				.item {
					background-color: #fffbf6;
					border-bottom: 1rpx solid #f5f5f5;
					display: flex;
					padding: 25upx 10upx;
					justify-content: space-between;
					align-items: center;
				
					.left-content {
						display: flex;
						align-items: center;
				
						.img {
							width: 80upx;
							height: 80upx;
							border-radius: 50%;
						}
				
						.content {
							margin-left: 20upx;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
				
							.top {
								max-width: 350upx;
							}
				
							.bottom {
								font-size: 20upx;
								color: #888;
							}
						}
					}
				
				
					.right-content {
						display: flex;
				
						.btn {
							display: flex;
							align-items: center;
						}
					}
				
				}
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
