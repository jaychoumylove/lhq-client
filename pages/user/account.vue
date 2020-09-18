<template>
	<view class="account-container">
		<view class="account-info">
			<view class="account-info-title">账户余额</view>
			<view class="space-between flex-set">
				<view class="balance">￥{{balance}}</view>
				<view class="withdrawal" @tap="$app.goPage('/pages/user/withdraw_log')">提现记录></view>
			</view>
		</view>
		<view class="account-list">
			
		</view>
		<view class="tips">
			<view class="title">提现说明</view>
			<view class="text-wrap">
				<view>1.微信提现，需绑定的微信号已实名认证，否则将打款失败</view>
				<view>2.余额不少于0.3元才可提现</view>
				<view>3.提现申请将在一个工作日内处理</view>
				<view>4.提现申请处理结果可在提现记录查询</view>
				<view>5.每日可提现一次</view>
			</view>
			
		</view>
		<view class="bottom-button flex-set" @tap="withdrawIt()">
			<btnComponent type="default">
				<view class="flex-set" style="width: 680upx;height: 80upx;">全部提现</view>
			</btnComponent>
		</view>
		<view class="bottom-text flex-set">
			如提现遇到问题，请<button open-type="contact" :session-from="$app.getData('userInfo').id">联系客服</button>
		</view>
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
				balance: 0.00,//余额
				freeze_balance: 0.00,//冻结余额
				withdraw: 0.00,// 提现金额
			};
		},
		onShow() {
			this.getBillState();
		},
		methods:{
			getBillState() {
				this.$app.request("page/bill", {}, res => {
					const {balance, freeze_balance} = res.data;
					this.balance = balance;
					this.freeze_balance = freeze_balance;
				})
			},
			withdrawIt() {
				if(this.balance<=0) return ;
				this.$app.modal(`是否提现${this.balance}余额？`, () => {
					this.$app.request("bill/withdraw", {number:this.balance}, res => {
						this.$app.toast('提现申请成功，一个工作日内处理');
						this.getBillState();
					})
				})
				
			}
		}
	}
</script>

<style lang="scss">
	.account-container{
		.account-info{
			margin: 20rpx 40rpx;
			border-bottom: 2rpx solid #999999;
			.balance{
				font-size: 40rpx;
				font-weight: bold;
				color: #f00f00;
				padding: 10rpx;
			}
			.withdrawal{
				color: #333333;
			}
		}
		// .account-list{
		// 	margin: 20rpx 40rpx;
		// 	border-bottom: 2rpx solid #999999;
		// }
		.tips{
			display: flex;
			flex-direction: column;
			color: #999999;
			padding: 20rpx 40rpx;
			
			.title{
				padding: 10rpx 0;
			}
			.text-wrap{
				display: flex;
				flex-direction: column;
				font-size: 24rpx;
			}
		}
		.bottom-button{
			padding: 20rpx;
		}
		.bottom-text{
			color: #999999;
			button{
				color: #366092;
			}
		}
	}
</style>
