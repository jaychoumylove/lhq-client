// 基础常量
// const HOST = 'lhq.cyoor.com';
// const VERSION = 'v1'; // 审核版本
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
	adUnitId: "adunit-f1aae5d7bd2ce0a4", // 视频广告id
	bannerAdUnitId: "adunit-35ca8f0eac3ccba9", // banner广告id
	interstitialAd_adUnitId: "adunit-1f7632b40b7983fb", // 插屏广告id
	gridAd_adUnitId: "adunit-fe1856f7dc999e2a", // grid广告id
	videoAd_adUnitId: "adunit-7ac1d9a30a018c58", // 视频广告id
	
	// QQ广告
	qq_adUnitId: "2302dcbddf2b40f02713960076f7e729", // QQ激励视频广告id
	qq_bannerAdUnitId: "0c80535627c94ad826b8e1902f8c0aa0", // banner广告位
	qq_interstitialAd_adUnitId: "3324d5e3ec5cf64e02b05c75c48e7998", // 插屏广告id
	qq_feedsAdUnitId: "f56cfbc2697ec4adf7f0a4c56a2226ea", // feeds广告位
	qq_cardAdUnitId: "3892dbda0391a549fd93d59cfb0cdf5e", // card广告位
	qq_boxAdUnitId: "5543882a3dc39f43daa075b5f2737397", // 盒子广告位
	
	API: {
		AUTH_LOGIN: 'user/login', // 用户登录
		
		USER_SAVEINFO: 'user/saveinfo', // 保存用户信息
		USER_POINT_RANK: 'user/pointRankInfo', // 用户积分排名信息
	}
}
