// 基础常量
// const HOST = 'lhq.cyoor.com';
// const VERSION = 'v1'; // 审核版本
const HOST = 'cs.huamufang.com';
const VERSION = 'v1'; // 测试版本

export default {
	HOST,
	VERSION,
	BASE_URL: 'https://' + HOST,
	HTTP_URL: 'https://' + HOST + '/api/' + VERSION + '/',
	WSS_URL: 'wss://' + HOST + '/wss',

	APP_NAME: '贝壳零花钱',

	QRCODE: 'https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTER7ticIBeMDqR2pXCv8JWMWN1JvTBURJyzAo6icibiaTP570BMZYRuOMLJ9Q/0',
	AVATAR: 'https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTER5kzPPpRZsIZTVGkic76VvZBcN0MzuCb4QUCab8x5M4lHoVQicHeAze4Q/0',
	NICKNAME: '神秘粉丝',

	GZH_APPID: 'wx3507654fa8d00974', // 关联公众号APPID

	// 微信广告
	adUnitId: "adunit-f1aae5d7bd2ce0a4", // 视频广告id
	bannerAdUnitId: "adunit-35ca8f0eac3ccba9", // banner广告id
	interstitialAd_adUnitId: "adunit-1f7632b40b7983fb", // 插屏广告id
	gridAd_adUnitId: "adunit-fe1856f7dc999e2a", // grid广告id
	videoAd_adUnitId: "adunit-7ac1d9a30a018c58", // 视频广告id
	
	API: {
		AUTH_LOGIN: 'user/login', // 用户登录
		
		USER_SAVEINFO: 'user/saveinfo', // 保存用户信息
		USER_POINT_RANK: 'user/pointRankInfo', // 用户积分排名信息
	}
}
