// 基础常量
// const HOST = 'lhq.cyoor.com';
const HOST = 'cs.huamufang.com';
const VERSION = 'v2'; // 测试版本

export default {
	HOST,
	VERSION,
	BASE_URL: 'https://' + HOST,
	HTTP_URL: 'https://' + HOST + '/api/' + VERSION + '/',
	WSS_URL: 'wss://' + HOST + '/wss',

	APP_NAME: '贝壳零花钱',

	QRCODE: 'https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTER7ticIBeMDqR2pXCv8JWMWN1JvTBURJyzAo6icibiaTP570BMZYRuOMLJ9Q/0',
	AVATAR: 'https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTER5kzPPpRZsIZTVGkic76VvZBcN0MzuCb4QUCab8x5M4lHoVQicHeAze4Q/0',
	NICKNAME: '神秘人',

	GZH_APPID: '', // 关联公众号APPID

	// 微信广告
	adUnitId: 'adunit-a29d5511e4d4bc93', // 激励式视频
	bannerAdUnitId: 'adunit-1545eb6d295be502', // banner广告id
	interstitialAd_adUnitId: 'adunit-97e57ffd35d079c9', // 插屏广告id
	gridAd_adUnitId: 'adunit-7efa38ff1de4f73c', // grid广告id 格子广告
	videoAd_adUnitId: 'adunit-fd4bedff59debffb', // 视频广告id
	
	// QQ广告
	qq_adUnitId: null, // QQ激励视频广告id
	qq_bannerAdUnitId: null, // banner广告位
	qq_interstitialAd_adUnitId: null, // 插屏广告id
	qq_feedsAdUnitId: null, // feeds广告位
	qq_cardAdUnitId: null, // card广告位
	qq_boxAdUnitId: null, // 盒子广告位
	
	API: {
		AUTH_LOGIN: 'user/login', // 用户登录
		
		USER_SAVEINFO: 'user/saveinfo', // 保存用户信息
		USER_POINT_RANK: 'user/pointRankInfo', // 用户积分排名信息
	}
}
