<template>
	<view class='container' :class="{show:show}">
		<view class="modal-container" :class="[type]" @tap.stop>
			<!-- <image v-if="headimg != 'false'" class='center-img' :src="headimg" mode=""></image> -->
			<view class="close-btn flex-set iconfont iconclose" @tap="closeModal"></view>
			<view class="content">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			btnComponent
		},
		data() {
			return {
				show: false
			};
		},
		props: {
			title: {
				default: '提示'
			},
			headimg: {
				default: "/static/image/icon/db.png"
			},
			type: {
				default: 'default'
			}
		},
		created() {
			this.show = true
		},
		methods: {
			closeModal() {
				let that=this;
				uni.showModal({
					title: '提示',
					content: '确认本次打榜不使用福袋',
					success: function(res) {
						if (res.confirm) {
							that.show = false
							setTimeout(() => {
								that.$emit('closeModal')
							}, 300)
						} else if (res.cancel) {
							
						}
					}
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99;
		background-color: rgba(0, 0, 0, .6);
		transition: .2s;
		opacity: 0;

		.modal-container {
			width: 100%;
			height: auto;
			// min-height: 730upx;
			box-shadow: 0 -2px 4px rgba(#000, .5);
			border-top-left-radius: 30upx;
			border-top-right-radius: 30upx;
			background-color: #fff;
			overflow: hidden;

			position: absolute;
			bottom: var(--window-bottom);
			transform: translateY(100%);
			transition: .2s;

			.center-img {
				position: absolute;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 120upx;
				height: 120upx;
			}

			.close-btn {
				position: absolute;
				top: 10upx;
				right: 10upx;

				width: 80upx;
				height: 80upx;
				color: #999;
				font-size: 45upx;
				z-index: 9;
			}

			.content {
				width: 100%;
				height: auto;
				// flex: 1;
				position: relative;
				padding-top: 80upx;
			}

		}
		
		// 中心弹出
		.modal-container.center {
			width: 600upx;
			left: 50%;
			top: 50%;
			bottom: auto;
			transform: translate(-50%, -50%);
			border-bottom-left-radius: 30upx;
			border-bottom-right-radius: 30upx;
		}
		
		// 中心弹出透明
		.modal-container.centerNobg {
			width: 600upx;
			left: 50%;
			top: 50%;
			bottom: auto;
			transform: translate(-50%, -50%);
			background-color:transparent;
			box-shadow:none;
			border: none;
		}

	}

	.container.show {
		opacity: 1;

		.modal-container {
			transform: translateY(0%);
		}
		
		.modal-container.center {
			transform: translate(-50%, -50%);
		}
		
		.modal-container.centerNobg {
			transform: translate(-50%, -50%);
		}
	}
</style>
