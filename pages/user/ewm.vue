<template>
	<view style="width: 100%; margin: 0;">
		<view class="preview-photo-box flex-box">
			<view class="item tc">
				<image class="receive-qrcode-img" :src="url" mode="widthFix" @longtap="toSave"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
			};
		},
		onShow() {
			this.loadData()
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
							this.save();
						}
					}
				});
			},
			loadData() {
				this.$app.request('user/ewm', {}, res => {
					this.url = res.data;
				})
			},
		}
	}
</script>

<style lang="scss">
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
