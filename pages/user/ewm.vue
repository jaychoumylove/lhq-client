<template>
	<view style="width: 100%; margin: 0;">
		<view class="preview-photo-box flex-box">
			<view class="item tc">
				<image class="receive-qrcode-img" :src="url" mode="widthFix" @longtap="toSave"></image>
			</view>
		</view>
		
		<view class="canvas-container flex-set" v-if="modal == 'canvas'">
			<view class="close-btn flex-set iconfont iconclose" @tap="modal = ''"></view>
		
			<canvas canvas-id='mycanvas' class="canvas"></canvas>
		
			<view class="btn-wrap">
				<view v-if="$app.getData('config').pyq_switch == '0'" class='fsend-btn flex-set' @tap="saveCanvas();">
					<view>保存</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				modal: "",
				cover: 'https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E6PCGc2OHpnROtW32Yh9zQZz84fibamQTPtFmJXMWLt1XUVM1oWvcQL9O8Y8NFWVricajJomgEpIWw/0',
			};
		},
		onShow() {
			this.loadData()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			save() {
				console.log('url:', this.url);
				uni.getImageInfo({
					src: this.url,
					success: function(image) {
						console.log('图片信息：', JSON.stringify(image));
						uni.saveImageToPhotosAlbum({
							filePath: image.path,
							success: function() {
								console.log('save success');
								uni.showToast({
									title: '图片保存成功',
									icon: 'none',
									duration: 2200
								});
							}
						});
					}
				});
			},
			toSave() {
				uni.showModal({
					title: '图片保存',
					content: '确定要保存图片吗',
					success: e => {
						if (e['confirm']) {
							// this.save();
							this.modal = 'canvas'
							this.getAuth();
						}
					}
				});
			},
			loadData() {
				this.$app.request('user/ewm', {}, res => {
					this.url = res.data;
				})
			},
			getLocalImg(src, callback) {
				uni.getImageInfo({
					src,
					success: function(res) {
						callback && callback(res.path)
					}
				})
			},
			getAuth () {
				uni.getSetting({
					success: res => {
						// console.info(res.authSetting);
						if (!res.authSetting['scope.writePhotosAlbum']){
							uni.authorize({
								scope: 'scope.writePhotosAlbum',
								success: () => {
									this.qrR()
								},
								fail: () => {//这里是用户拒绝授权后的回调
									return this.$app.toast('没有授权')
								}
							})
						} else {
							this.qrR()
						}
					}
				})
			},
			qrR() {
				uni.showLoading({
					title:"生成中...",
					mask:true
				})
				var rate = this.$app.getData('sysInfo').windowWidth / 375 / 2.0
				let ctx = uni.createCanvasContext('mycanvas');
				
				this.getLocalImg(this.cover, src => {
					ctx.drawImage(src, 0, 0, 480*rate, 854*rate);
					// 二维码
					this.getLocalImg(this.url, src => {
						ctx.save() //保存当前的绘图上下文。
						ctx.beginPath() //开始创建一个路径
						ctx.arc(240 * rate, 520 * rate, 50 * rate, 0, 2 * Math.PI, false) //画一个圆形裁剪区域
						ctx.clip() //裁剪
						ctx.drawImage(src, 190 * rate, 470 * rate, 100 * rate, 100 * rate);
						ctx.restore() //恢复之前保存的绘图上下文
						// 绘制
						ctx.draw(false, () => {
							// 保存到临时图片
							uni.canvasToTempFilePath({
								canvasId: 'mycanvas',
								success: res => {
									console.info(res.tempFilePath)
									uni.saveImageToPhotosAlbum({
										filePath: res.tempFilePath,
										success: () => {
											this.modal = '';
											this.$app.toast('保存成功', 'success')
										},
										fail: (e) => {
											console.info(e);
											this.modal = '';
											this.$app.toast('保存失败', 'none')
										}
									});
								}
							}, this);
						})
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	.canvas-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
		background-color: rgba(0, 0, 0, .9);
		flex-direction: column;
	
		.canvas {
			width: 480upx;
			height: 854upx;
			margin-top: 40rpx;
		}
	
		.close-btn {
			position: absolute;
			width: 80upx;
			height: 80upx;
			z-index: 99;
			border-radius: 50%;
			// background-color: rgba(0, 0, 0, .5);
			color: #FFF;
			font-size: 45upx;
			right: 20upx;
			top: 10%;
		}
	
		.wrapper {
			width: 540upx;
			height: 960upx;
			padding: 40upx;
			flex-direction: column;
			background-color: #FFF;
	
			image {
				width: 100%;
				flex: 1;
			}
	
			.btn {
				margin-top: 40upx;
				width: 100%;
				height: 150upx;
				text-align: center;
				padding: 20upx;
				font-size: 40upx;
				color: #FFF;
				box-shadow: 0 1px 2px rgba(#000, 0.6);
				background-color: #ff648c;
				border-radius: 20upx;
			}
		}
	
		.btn-wrap {
			margin-top: 20upx;
			display: flex;
			justify-content: space-around;
			width: 100%;
			padding: 0 60upx;
	
			.fsend-btn {
				// background-color: #0EC52F;
				font-size: 32upx;
				color: #FFF;
				padding: 0 20upx;
				flex-direction: column;
	
				image {
					width: 80upx;
					height: 80upx;
				}
			}
	
			.save-btn {
				background-color: #FF7E00;
				border-radius: 10upx;
				font-size: 32upx;
				color: #FFF;
				padding: 0 20upx;
			}
		}
	}
	
	
	.preview-photo-box {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 99;
		justify-content: center;
		align-items: center;
		background-image: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E6PCGc2OHpnROtW32Yh9zQZz84fibamQTPtFmJXMWLt1XUVM1oWvcQL9O8Y8NFWVricajJomgEpIWw/0);
		background-size: 100% 100%;

		.item {
			flex: 1 0 auto;

			.receive-qrcode-img {
				position: absolute;
				z-index: 2;
				width: 200rpx;
				top: 54%;
				left: 37%;
				border-radius: 50%;
			}
		}
		
		

		.download-img {
			position: absolute;
			bottom: 30upx;
			right: 30upx;
			z-index: 100;
			background: rgba(255, 255, 255, 0.5);
			font-size: 0;

			image {
				width: 64upx;
				height: 64upx;
			}
		}

		.preview-photo-bg {
			position: absolute;
			left: 0;
			top: 0;
			z-index: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
		}
	}
</style>
