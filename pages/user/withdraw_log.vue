<!-- 个人明细 -->
<template>
	<view class="log-container">
		<block v-if="logList.length>0">
			<view class="item" v-for="(item,index) in logList" :key="index">
				<view class="left-content">
					<view class="content ">
						<view class="top">微信提现（{{item.status=='OK'?'已到账':'等候中'}}）</view>
						<view class="bottom">{{item.create_time}}</view>
					</view>
				</view>
			
				<view class="right-content">
					<view class="earn">
						<view class="right-item">
							<view class="add-count add">{{item.number}}元</view>
						</view>
			
					</view>
				</view>
			</view>
		</block>
		<block v-else>
			<view class="flex-set" style="width: 100%; padding: 20rpx; color: #cccccc;">暂无任何记录</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			this.page = 1
			return {
				logList: [],
			};
		},
		onLoad() {
			this.getLog()
		},
		onReachBottom() {
			this.page++
			this.getLog()
		},
		methods: {
			getLog() {
				this.$app.request('page/withdraw_log', {
					page: this.page
				}, res => {
					if (this.page == 1) {
						this.logList = res.data
					} else {
						this.logList = this.logList.concat(res.data)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.log-container {
		height: 100%;

		.item {
			margin: 20upx;
			background-color: rgba(#FFF, 0.3);
			display: flex;
			padding: 20upx 40upx;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2upx solid #efefef;

			.left-content {
				display: flex;

				.img {
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
				}

				.content {
					.bottom {
						font-size: 24upx;
						color: #999;
					}
				}
			}

			.right-content {
				display: flex;

				.earn {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: flex-start;

					.right-item {
						display: flex;
						align-items: center;

						image {
							width: 40upx;
						}

					}
				}

			}

		}
	}
</style>
