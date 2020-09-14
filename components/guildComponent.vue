<template>
	<view class="guild-component-container" @tap="inputing=false">
		<!-- 添加到我的小程序 -->
		<view class="add-top-img" v-if="showAddXcx">
			<image class="img" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FaCThHvhDic8AqkJFVxc6RFaIoG6DiaYlJVHgI1xT8E8V6jT8SNLlamlO6E9QdeTbVUomUr6eLfmrw/0"
			 mode="widthFix"></image>
			<view class="btn" @tap="showAddXcx=false"></view>
		</view>

		<!-- 顶部 -->
		<view class="top-container">
			<!-- 喇叭弹幕 -->
			<view class="danmaku-wrapper flex-set">
				<view class="danmaku" v-if="danmaku&&danmaku.type!=1">
					<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EqVxh70XuVn1VhJLyPnEbx51iciasfQ7c4yMcibMiakJib1NVcTQlzgfIvah31niaay6qVeUGsjric0icZtg/0"
					 mode=""></image>
					<image class="avatar" :src="danmaku.avatarurl"></image>
					<view class="content" v-if="danmaku.content">{{danmaku.content}}</view>
				</view>
				<view class="danmaku" :class="{in:danmaku.type==1}" v-if="danmaku&&danmaku.type==1">
					恭喜<view style="margin:0 8upx;color:#f5c815;">{{danmaku.starname}}</view>
					圈子<view style="margin:0 8upx;color:#f5c815;">{{danmaku.nickname}}</view>升至
					<view class="user-level-wrap">
						<image class="img" :src="'/static/image/user_level/lv'+danmaku.level+'.png'" mode="widthFix"></image>
						<view class="user-level-text" v-if="danmaku.level>=1&&danmaku.level<=1" :class="['level'+danmaku.level]">实习粉</view>
						<view class="user-level-text" v-if="danmaku.level>=2&&danmaku.level<=2" :class="['level'+danmaku.level]">助理粉</view>
						<view class="user-level-text" v-if="danmaku.level>=3&&danmaku.level<=5" :class="['level'+danmaku.level]">初级粉</view>
						<view class="user-level-text" v-if="danmaku.level>=6&&danmaku.level<=8" :class="['level'+danmaku.level]">中级粉</view>
						<view class="user-level-text" v-if="danmaku.level>=9&&danmaku.level<=11" :class="['level'+danmaku.level]">高级粉</view>
						<view class="user-level-text" v-if="danmaku.level>=12&&danmaku.level<=14" :class="['level'+danmaku.level]">核心粉</view>
						<view class="user-level-text" v-if="danmaku.level>=15&&danmaku.level<=15" :class="['level'+danmaku.level]">元老粉</view>
						<view class="user-level-text" v-if="danmaku.level>=16&&danmaku.level<=16" :class="['level'+danmaku.level]">至尊粉</view>
						<view class="user-level-text" v-if="danmaku.level>=17&&danmaku.level<=17" :class="['level'+danmaku.level]">帝王粉</view>
						<view class="user-level-text" v-if="danmaku.level>=18&&danmaku.level<=18" :class="['level'+danmaku.level]">神级粉</view>

					</view>
				</view>
			</view>
			<!-- 打榜弹幕 -->
			<view class="send-danmaku-wrap">
				<view class="row" v-for="n in 3" :key="n">
					<view class="danmaku" :class="{flower:item.type==2}" v-for="(item,index) in sendDanmaku[n]" :key="index">
						<image class="avatar" :src="item.user.avatarurl"></image>
						<view class="content flex-set">
							<text>{{item.user.nickname}} 贡献 {{item.hot}} 人气值</text>
						</view>
					</view>
				</view>
			</view>
			<view class="top-row">
				<!-- 明星头像 -->
				<view class="avatar-wrap">
					<image class="avatar" :src="star.avatar||$app.getData('AVATAR')" mode="aspectFill"></image>
				</view>

				<view class="center-wrap">
					<view class="row">
						<view class="flex-set">
							<image class="icon img-s" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EqVxh70XuVn1VhJLyPnEbxCic9nUXKeLLE7wUqxCX6qErQJXDBOlXGQwvNjorkrxAb6XAEDicyTAkA/0"
							 mode=""></image><text class="highlight">NO.{{star.weekRank||''}}</text>
						</view>
						<view class="">人气榜</view>
					</view>
					<view class="split"></view>

					<view class="row">
						<view class="flex-set">
							<image class="icon img-s" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERabwYgrRn5cjV3uoOa8BonlDPGMn7icL9icvz43XsbexzcqkCcrTcdZqw/0"
							 mode=""></image><text class="highlight"> {{star.weekHot||''}}</text>
						</view>
						<view class="">本周人气值</view>
					</view>
					<view class="split"></view>
					<view class="row">
						<view class="flex-set">
							<image class="icon img-s" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EqVxh70XuVn1VhJLyPnEbxzbefZyJSjBrZzvte3tMoPpaNJPE6Zk4DpicfHn9icF9yvsPBKXnK2j4A/0"
							 mode=""></image>
							<text class="highlight">{{$app.formatNumber(disLeastCount)||''}}</text>
						</view>
						<view class="" v-if="disLeastCount">距离上一名</view>
						<view class="" v-else>无敌是多么寂寞</view>
					</view>
				</view>
			</view>

			<!-- 粉丝排名 -->
			<view class="bottom-wrap">
				<view class="left-wrap" @tap="$app.goPage('/pages/user/rank?starid='+star.id)">
					<view class="top-wrap">
						<view class="left">粉丝排名</view>
						<view class="right">全部></view>
					</view>
					<view class="fans-rank-wrap">
						<view class="avatar-wrap" :style="{zIndex:6-index}" :class="['s-'+(index+1)]" v-for="(item,index) in userRankList['thisday_count']"
						 :key="index" v-if="index<6">
							<image class="avatar" :src="item.user.avatarurl || $app.getData('AVATAR')" mode="aspectFill"></image>
							<image class="rank" :src="'/static/image/rank/rank-'+(index+1)+'.png'" mode=""></image>
						</view>
					</view>
				</view>

				<view class="center-wrap flex-set" v-if="$app.getData('userInfo').type == 1 && $app.getData('userStar').id != star.id">
					<button class="join flex-set" @tap="adminCheckoutStar">+切换</button>
				</view>

				<view class="right-wrap flex-set">
					<image class="img-m" v-if="star.isBirth" @tap="$app.goPage('/pages/user/birth_rank?starid='+star.id)" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GndUW3a1UarD8yKON3YUcuIpvhibXXbe2jtSdCTo2pKs8dQzXoM1iakuS6r9jVicJMw4DL4zXZTltvg/0"
					 mode=""></image>
					<!-- 打榜按钮 -->
					<view class="send-btn">

						<button open-type="getUserInfo" v-if="!$app.getData('userInfo').nickname" @getuserinfo="getUserInfo">
							<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_gif/w5pLFvdua9ENOOBmxXTF9huYYxQSQ5K6LhbVZMFtb2kiaXiaqicrpSfsyrkuQxPImQKoj9PcQwGjr7Ey66JQqES5A/0"
							 mode=""></image>
						</button>

						<form report-submit @submit="sendOrFollow" v-else>
							<button form-type="submit">
								<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_gif/w5pLFvdua9ENOOBmxXTF9huYYxQSQ5K6LhbVZMFtb2kiaXiaqicrpSfsyrkuQxPImQKoj9PcQwGjr7Ey66JQqES5A/0"
								 mode=""></image>
							</button>
						</form>

					</view>
				</view>

			</view>

		</view>

		<!-- 功能按键组 与公告 -->
		<view class="center-container">
			<view class="row-info row-1">
				<view class="btn-item" @tap="goPageHasStar('/pages/lottery/lottery')">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5iark4fTfvmAiczalI0icVwlRrFICYAAH42VGdzicK1M8lqSVdr0LQIthbg/0"
					 mode=""></image>
					<view class="text">抽奖</view>
				</view>
				<view class="btn-item" @tap="goPageHasStar('/pages/task/task')">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5JR3ygzuEvAyLm2bH9JrOGM6F9Hhb1woZZMmxS8WmrsHLxkcauea12g/0"
					 mode=""></image>
					<view class="text">任务</view>
				</view>
				<view class="btn-item" @tap="invitFakePage=1;modal = 'invit_desert';getFakeInviteList()">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fy1abNSLpfp8oqM7wyicwdCLBXKMv4837p05e2Wg6yDHoosSjSSs8g2SX5YXN7Ntsic3pDrB9espgA/0"
					 mode=""></image>
					<view class="text">拉新</view>
				</view>
				<view v-if="$app.getData('config').shitu_switch==1" class="btn-item" @tap="$app.goPage('/pages/father/info')">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fy1abNSLpfp8oqM7wyicwdCd5T9g9sYiaib1jUqcv5x6u40eqAMaRiaz2TsKc2iaia3DNp4AZGng6CrUnQ/0"
					 mode=""></image>
					<view class="text">师徒</view>
				</view>

				<block v-if="$app.getData('config').fanclub_switch==1">
					<view class="btn-item" @tap="goPageHasStar('/pages/fans/fans_club?fid=' + fanclub_id)" v-if="fanclub_id">
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fy1abNSLpfp8oqM7wyicwdCejn5EibDSAzhL2MqfMpWezdUnPichUTwtUpfvNUo0icWPdftauLHZiaXWQ/0"
						 mode=""></image>
						<view class="text">粉丝团</view>
					</view>
					<view class="btn-item" @tap="goPageHasStar('/pages/fans/fans_list')" v-else>
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fy1abNSLpfp8oqM7wyicwdCejn5EibDSAzhL2MqfMpWezdUnPichUTwtUpfvNUo0icWPdftauLHZiaXWQ/0"
						 mode=""></image>
						<view class="text">粉丝团</view>
					</view>
				</block>

				<view class="btn-item" @tap="goPageHasStar('/pages/pk/pk_index')">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EqVxh70XuVn1VhJLyPnEbxriczDwYpJxLicMALveZ8I6vxIGDDu9yB41Dicq9XYTtUcggaFYvQEc2ng/0"
					 mode=""></image>
					<view class="text">来PK</view>
				</view>
			</view>
			<!-- 公告 -->
			<view v-if="$app.getData('config').version != $app.getData('VERSION')" class="row-info row-2" @tap="$app.goPage('/pages/notice/notice?id='+article.id)">
				<view class="text-overflow">
					<text class="left-wrap text-overflow">【公告】</text>
					<text class="center-wrap">{{article.name}}</text>
					<image class="isnew" v-if="article.isNew" src="https://mmbiz.qpic.cn/mmbiz_gif/w5pLFvdua9H2awqYhgKRktNwUT19uEzicRMZbITUbzNRRpUPQUBLSBSrALbX6lI9whDkbhUYeyWW7YUJsicTkCqA/0"
					 mode="widthFix"></image>
				</view>
				<text class="right-wrap text-overflow" @tap.stop="$app.goPage('/pages/notice/list')">更多></text>
			</view>
		</view>

		<!-- 排名列表 -->
		<view class="list-container" v-if="star.chat_off">
			<view class="item" v-for="(item,index) in userRankList['thisday_count']" :key="index">
				<view class="rank-num">
					<image class="icon" v-if="index==0" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERPO5dPoLHgkajBHNM2z9fooSUMLxB0ogg1mYllIAOuoanico1icDFfYFA/0"
					 mode=""></image>
					<image class="icon" v-else-if="index==1" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERcWnBrw6yAIeVRx4ibIfShZ3tn26ubDUiakNcrwf2F43JI97MYEaYiaib9A/0"
					 mode=""></image>
					<image class="icon" v-else-if="index==2" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTER7oibKWZCN5ThjI799sONJZAtZmRRTIQmo1R9j26goVMBJ43giaJHLIlA/0"
					 mode=""></image>
					<view v-else>{{index+1}}</view>
				</view>
				<view class='avatar-wrap'>
					<image class="avatar" :src="item.user.avatarurl || AVATAR" mode="aspectFill"></image>
					<image v-if="item.user&&item.user.headwear&&item.user.headwear.img" class="headwear position-set" :src="item.user.headwear.img"
					 mode=""></image>
				</view>
				<view class="text-container">
					<view>
						{{item.user.nickname || NICKNAME}}
						<image class="img-s" :src="`/static/image/user_level/lv${item.user.level}.png`" mode=""></image>
					</view>
				</view>
				<view class="count">
					<view>贡献值</view>
					<view>{{item.hot}}</view>
				</view>
			</view>
		</view>

		<!-- 聊天区域 -->
		<scroll-view class="chart-container" scroll-y scroll-with-animation :scroll-top="chartScroll" v-else>
			<view class="chart-item" v-for="(item,index) in chartList" :key="index">
				<view class="left-wrap">
					<view class="avatar-wrap" :class="{leader:item.user.isLeader}" @tap="tapUser(item.user.id)">
						<image lazy-load="true" class="avatar" :src="item.user.avatarurl || $app.getData('AVATAR')" mode="aspectFill"></image>
						<image lazy-load="true" v-if="item.user.headwear" class="headwear position-set" :src="item.user.headwear.img" mode="aspectFill"></image>
					</view>

					<view class="center-wrap">
						<view class="top">
							<view v-if="item.user.userBadge.length==0" class="nickname_lenght0 text-overflow">{{item.user.nickname||$app.getData('NICKNAME')}}</view>
							<view v-else-if="item.user.userBadge.length==1" class="nickname_lenght1 text-overflow">{{item.user.nickname||$app.getData('NICKNAME')}}</view>
							<view v-else-if="item.user.userBadge.length==2" class="nickname_lenght2 text-overflow">{{item.user.nickname||$app.getData('NICKNAME')}}</view>
							<view v-else-if="item.user.userBadge.length==3" class="nickname_lenght3 text-overflow">{{item.user.nickname||$app.getData('NICKNAME')}}</view>
							<view v-else-if="item.user.userBadge.length==4" class="nickname_lenght4 text-overflow">{{item.user.nickname||$app.getData('NICKNAME')}}</view>
							<view v-else-if="item.user.userBadge.length==5" class="nickname_lenght5 text-overflow">{{item.user.nickname||$app.getData('NICKNAME')}}</view>
							<view v-else-if="item.user.userBadge.length==6" class="nickname_lenght6 text-overflow">{{item.user.nickname||$app.getData('NICKNAME')}}</view>
							<view v-else-if="item.user.userBadge.length==7" class="nickname_lenght7 text-overflow">{{item.user.nickname||$app.getData('NICKNAME')}}</view>
							<view v-else-if="item.user.userBadge.length==8" class="nickname_lenght8 text-overflow">{{item.user.nickname||$app.getData('NICKNAME')}}</view>
							<view class="badge-wrap flex-set">
								<view class="captain" v-if="item.user.user_star && item.user.user_star.captain">
									<image lazy-load="true" class="img-s" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9ENOOBmxXTF9huYYxQSQ5K6BCW8AZyc2DE39VjH2j5KoEKjPiaPbFT2NesdMAmh7xuNfwOK8AOChtQ/0"
									 mode=""></image>
								</view>
								<view class="user-level-wrap">
									<image lazy-load="true" class="img" :src="'/static/image/user_level/lv'+item.user.level+'.png'" mode="widthFix"></image>
									<view class="user-level-text" v-if="item.user.level>=1&&item.user.level<=1" :class="['level'+item.user.level]">实习粉</view>
									<view class="user-level-text" v-if="item.user.level>=2&&item.user.level<=2" :class="['level'+item.user.level]">助理粉</view>
									<view class="user-level-text" v-if="item.user.level>=3&&item.user.level<=5" :class="['level'+item.user.level]">初级粉</view>
									<view class="user-level-text" v-if="item.user.level>=6&&item.user.level<=8" :class="['level'+item.user.level]">中级粉</view>
									<view class="user-level-text" v-if="item.user.level>=9&&item.user.level<=11" :class="['level'+item.user.level]">高级粉</view>
									<view class="user-level-text" v-if="item.user.level>=12&&item.user.level<=14" :class="['level'+item.user.level]">核心粉</view>
									<view class="user-level-text" v-if="item.user.level>=15&&item.user.level<=15" :class="['level'+item.user.level]">元老粉</view>
									<view class="user-level-text" v-if="item.user.level>=16&&item.user.level<=16" :class="['level'+item.user.level]">至尊粉</view>
									<view class="user-level-text" v-if="item.user.level>=17&&item.user.level<=17" :class="['level'+item.user.level]">帝王粉</view>
									<view class="user-level-text" v-if="item.user.level>=18&&item.user.level<=18" :class="['level'+item.user.level]">神级粉</view>
								</view>
								<view class="user-badge">
									<block v-for="(badge, badgeIndex) in item.user.userBadge" :key="badgeIndex">
										<image lazy-load="true" class="badge-item" v-if="badge.simg" :src="badge.simg"></image>
									</block>
								</view>
							</view>
						</view>

						<view class="bottom">
							{{item.content}}
							<!-- 三角 -->
							<view class="angle"></view>
						</view>
					</view>

				</view>
				<view class="right-wrap">{{$app.strToHour(item.create_time)}}</view>

			</view>
		</scroll-view>

		<!-- 聊天输入 -->
		<view class="chart-btn-container" v-if="!star.chat_off&&$app.getData('userStar').id == star.id" @tap.stop="inputing=true">
			<view class="bottom-wrap" @tap="modal = 'phonenumberCheck'" v-if="$app.getData('config').phone_switch=='1' && !$app.getData('userInfo').phoneNumber">
				<input class="input" type="text" placeholder="聊天一起High!" confirm-type="send" />
				<view class="btn flex-set">发言</view>
			</view>

			<block v-else>
				<view class="top-wrap" v-if="inputing==true">
					<view class="trumpet-wrap" @tap="sayworld">
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk90Xa3b43zE46M8IkUvFyMR5GgfJN52icBqoicfKWfAJS8QXog0PZtgdEQ/0"
						 mode="widthFix"></image>x{{userCurrency.trumpet}}
					</view>
					<text class="space">|</text>
					<text class="tips">发言可输入32字，喊话可以输入16字</text>
				</view>
				<view class="bottom-wrap">
					<input class="input" type="text" placeholder="聊天一起High!" :value="chartMsg" confirm-type="send" @confirm="sendMsg"
					 @input="chartMsg=$event.detail.value" />
					<view class="btn flex-set" @tap="sendMsg">发言</view>
				</view>
			</block>
		</view>
		<!-- 右下角按钮区域 -->
		<view class="side-container">
			<view v-if="btn_cfg_group" class="btn-wrap" @tap="goPageHasStar(item.path)" v-for="(item,index) in btn_cfg_group"
			 :key="index">
				<image class="img" :src="item.icon" mode="aspectFill"></image>
				<view class="title">{{item.name}}</view>
			</view>

			<!-- 粉丝团宝箱 -->
			<view class="btn-wrap" @tap="fansBoxOpen" v-if="$app.getData('config').version != $app.getVal('VERSION') && $app.getData('config').fansbox_open=='1'">
				<image class="img" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fy1abNSLpfp8oqM7wyicwdCHA3wGhWkP3tIu9ztc4sqKr74M5icSkYVNpCdiarySDSggEss5DqJ9ictw/0"
				 mode="aspectFill"></image>
				<view class="tips" v-if="sendFansNoSettle">{{sendFansNoSettle}}</view>
			</view>
			<!-- 充值礼包 -->
			<view class="btn-wrap" @tap="newboyOpen" v-if="$app.getData('config').version != $app.getVal('VERSION') && signGift_title">
				<image class="img" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXyaKHrg1Qcwb6oJzia3R4bqialbpTRo5ruTVPqJia3fSOwpicSaJsWRhmEFftWM7z1QEV8ucFMjaZEOg/0"
				 mode="aspectFill"></image>
				<view class="title">{{signGift_title}}</view>
				<view class="tips dot" v-if="signGift_tips==1"></view>
			</view>

		</view>

		<!-- modal区域 -->
		<!-- 验证手机号 -->
		<modalComponent v-if="modal == 'phonenumberCheck'" type="center" @closeModal="modal=''">

			<!-- #ifndef MP-WEIXIN -->
			<view class="fansbox-modal-container" style="height: 680upx;">
				<view class="title flex-set">手机号码验证</view>
				<view class="tips">
					根据国家互联网相关规定，【发言】功能需进行手机号验证才可使用，手机号码仅自己可见。
					<text>国内短信：11位手机号码，例如15900000000。</text>
					<text>国际/港澳台消息：国际区号+号码，例如85200000000。</text>
				</view>
				<input class="phonenumber" :value="phoneNumber" @input="setPhoneNumber" type="number" placeholder="输入手机号" />
				<view class="phonecode flex-set self-input">
					<input :value="phoneCode" @input="setPhoneCode" type="number" placeholder="输入验证码" />
					<view @tap="sendPhoneCode()">获得验证码</view>
				</view>
				<button class="btn-wrap" @tap="savePhoneNumber">
					<btnComponent type="default">
						<view class="btn flex-set">立即验证</view>
					</btnComponent>
				</button>
			</view>
			<!-- #endif -->

			<!-- #ifdef MP-WEIXIN -->
			<view class="fansbox-modal-container" style="height: 550upx;">
				<view class="title flex-set">手机号码验证</view>
				<view class="tips">根据国家互联网相关规定，【发言】功能需进行手机号验证才可使用，手机号码仅自己可见。</view>
				<button class="btn-wrap" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
					<btnComponent type="default">
						<view class="btn flex-set">立即验证</view>
					</btnComponent>
				</button>
			</view>
			<!-- #endif -->
		</modalComponent>

		<!-- 打榜 -->
		<modalComponent type="send" v-if="modal == 'send'" title="pick" @closeModal="modal=''">
			<view class="send-modal-container">
				<view class="switch-wrap">
					<switch :checked="!danmakuClosed" @change="danmakuSwitch" />弹幕
					
					<block v-if="extHot.percent&&extHot.percent>0">
						<view class="absolute-dog4" v-if="current==0" @tap="goExtraHotPage">
							冲榜后额外赠送<text style="color: #fb8100;">{{$app.formatFloatNum(extHot.percent*100, 2)}}%</text>
							<text>金豆<text class="iconfont iconicon-test1"></text></text>
						</view>
						<view class="absolute-dog4" v-if="current==1" @tap="goExtraHotPage">
							冲榜后额外赠送<text style="color: #FF0019;">{{$app.formatFloatNum(extHot.percent*100, 2)}}%</text>
							<text>鲜花<text class="iconfont iconicon-test1"></text></text>
						</view>
						<text class="absolute-go-dog">1{{current==0 ? "金豆": "鲜花"}} = 1人气</text>
					</block>
					<text v-else class="absolute-go">1{{current==0 ? "金豆": "鲜花"}} = 1人气</text>
				</view>

				<view v-if="$app.getData('config').version != $app.getVal('VERSION')" :class="{mt6: extHot.percent&&extHot.percent>0}" class="swiper-change flex-set">
					<view class="item" :class="{select:current==0}" @tap="current = 0;sendCount=''">送金豆</view>
					<view class="item" :class="{select:current==1}" @tap="current = 1;sendCount=''">送鲜花</view>
					<view class="item" v-if="$app.getData('config').old_coin_open=='1'&&userCurrency.old_coin>0" :class="{select:current==2}"
					 @tap="current = 2;sendCount=''">送旧豆</view>
				</view>

				<view class="swiper-item">
					<view class="wrap">
						<view class="btn-wrapper">
							<view class="btn flex-set" @tap="sendHot(item)" v-for="(item,index) in send_num_list" :key="index">
								<image v-if="current==0" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
								 mode="widthFix"></image>
								<image v-if="current==1" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"
								 mode="widthFix"></image>
								<image v-if="current==2" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXlbbzMr1KRN6DJJyCKicqpD86VGeUeoibFPryXF3iaSF1bJba11sBtrCg6SNpEAxxPCyB2ictoq4Iia2Q/0"
								 mode="widthFix"></image>
								+{{item}}
							</view>

							<view class="btn flex-set self-input">
								<input class="" :value="sendCount" @input="setSendCount" type="number" placeholder="自定义数额" />
							</view>
							<view class="btn flex-set pick" @tap="sendHot()">冲榜</view>
						</view>

						<view class="bottom-wrapper">
							<view v-if="current==0" class="text left flex-set">我的金豆：{{userCurrency['coin']}}</view>
							<view v-if="current==1" class="text left flex-set">我的鲜花：{{userCurrency['flower']}}</view>
							<view v-if="current==2" class="text left flex-set">我的旧豆：{{userCurrency['old_coin']}}</view>
							<block v-if="$app.getData('config').version != $app.getData('VERSION') ||  $app.getData('platform')!='MP-WEIXIN'">
								<view v-if="$app.chargeSwitch()==0" class="right" @tap="$app.goPage('/pages/charge/charge')">
									充值<text class="iconfont iconjiantou"></text>
								</view>
								<button v-else-if="$app.chargeSwitch()==2&&current==0" open-type="contact">
									<view class="right reply">回复"1"获取更多金豆</view>
								</button>
								<button v-else-if="$app.chargeSwitch()==2&&current==1" open-type="contact">
									<view class="right reply">回复"1"获取更多鲜花</view>
								</button>
							</block>

						</view>
					</view>
				</view>
			</view>
		</modalComponent>

		<!-- 拉新 -->
		<modalComponent v-if="modal == 'invit_desert'" headimg="/static/image/icon/lx.png" title="拉票" @closeModal="modal=''">
			<view class="invit-modal-container">

				<view class="explain-wrapper">
					<view class="top flex-set">
						<view class="">
							已邀请<text> {{hasInvitcount}} </text>人
						</view>

						<btnComponent type="default">
							<button class="btn" open-type="share" @tap="buttonHandler" data-sharetype="share">
								<view class="flex-set" style="width: 140upx; height: 60upx;">邀请好友</view>
							</button>
						</btnComponent>
					</view>
					<view class="bottom">被邀请人任意加入一个粉丝团即可领取奖励</view>
				</view>
				<scroll-view scroll-y class="list-wrapper" @scrolltolower="invitFakePage++;getFakeInviteList();" v-if="fakeinvitList.length>0">
					<view class="item" v-for="(item,index) in fakeinvitList" :key="index" v-if="hasEarnCount+index+1<=300">
						<view class='avatar'>
							<image v-if="item.user&&item.user.avatarurl" :src="item.user.avatarurl" mode="aspectFill"></image>
							<image v-else :src="$app.getData('AVATAR')" mode="aspectFill"></image>
						</view>
						<view class="text-container">
							<view class="star-name">{{item.user&&item.user.nickname?item.user.nickname:$app.getData('NICKNAME')}}</view>
							<view class="bottom-text">
								<view class="hot-count">金豆+{{invitAward.coin}}</view>
								<view class="hot-count" v-if="invitAward.stone">钻石+{{invitAward.stone}}</view>
							</view>
						</view>
						<view class="btn">
							<btnComponent v-if="item.status == 0" type="default">
								<button open-type="share" @tap="buttonHandler" data-sharetype="share">
									<view class="flex-set" style="width: 130upx;height: 65upx;">去邀请</view>
								</button>
							</btnComponent>
							<btnComponent v-if="item.status == 1" type="success" @tap="getInvitAward(item.ral_user_id,item.status,index)">
								<view class="flex-set" style="width: 130upx;height: 65upx;">领取</view>
							</btnComponent>
							<btnComponent v-if="item.status == 2" type="disable">
								<view class="flex-set" style="width: 130upx;height: 65upx;">已领取</view>
							</btnComponent>
						</view>

					</view>
				</scroll-view>
				<view v-else class="flex-set list-wrapper">
					拉票奖励领取已达上限
				</view>
			</view>

		</modalComponent>
		<!-- 用户modal -->
		<modalComponent v-if="modal == 'userInfo'" type="center" title=" " @closeModal="modal=''">
			<view class="userinfo-modal-container">
				<view class="top">
					<image class="avatar" :src="currentUser.avatarurl||$app.getData('AVATAR')" mode="scaleToFill" @tap="$app.preImg(currentUser.avatarurl)"></image>
					<view class="nickname">{{currentUser.nickname}}</view>

				</view>
				<view class="btn-list flex-set">
					<view class="btn-item" v-if="currentUser.fanclub" @tap="addFanclub(currentUser.fanclub.id)">
						<view class="bg flex-set">
							<image :src="currentUser.fanclub.avatar" mode="aspectFill"></image>
						</view>
						<view class="text">加粉丝团</view>
					</view>
					<view class="btn-item" @tap="sendOtherType='stone';modal = 'sendOther'">
						<view class="bg flex-set">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
							 mode=""></image>
						</view>
						<view class="text">赠送钻石</view>
					</view>
					<view class="btn-item" @tap="sendOtherType='flower';modal = 'sendOther'">
						<view class="bg flex-set">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"
							 mode=""></image>
						</view>
						<view class="text">赠送鲜花</view>
					</view>
					<view v-if="captain" class="btn-item" @tap="forbidden(currentUser.id)">
						<view class="bg flex-set">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JUPd6ReX2QQW8icquiaicvT70eftKMMonaN4loJTdHIv1pdTeTv5OeIysWmic3BgTmTIzrhp6EgNdDwicg/0"
							 mode=""></image>
						</view>
						<view class="text">{{currentUser.type==2?'已':''}}禁言</view>
					</view>
				</view>
			</view>

		</modalComponent>

		<!-- 送灵丹给别人 -->
		<modalComponent v-if="modal == 'sendOther'" type="center" title=" " @closeModal="modal=''">
			<view class="userinfo-modal-container">
				<view class="top">
					<image class="avatar" :src="currentUser.avatarurl" mode="scaleToFill"></image>
					<view class="nickname">{{currentUser.nickname}}</view>
				</view>

				<view class="send-input">
					<input type="number" :value="sendOtherNum" @input="sendOtherNum = $event.detail.value" />
					<image v-if="sendOtherType=='flower'" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"
					 mode=""></image>
					<image v-if="sendOtherType=='stone'" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
					 mode=""></image>
				</view>
				<btnComponent type="default">
					<view class="btn flex-set" @tap="sendOther()">送给TA</view>
				</btnComponent>
			</view>
		</modalComponent>

		<!-- 打榜后 -->
		<modalComponent v-if="modal == 'sendOver'" type="center" @closeModal="modal=''">
			<view class="sendover-modal-container">
				<view class="top-wrap">
					<view class="title">粉丝贡献周榜</view>
					<view class="content">

						<view class="rank">
							<view class="text">我的排名</view>
							<view class="num">{{myRank.rank}}</view>
						</view>

						<image class="avatar" :src="$app.getData('userInfo').avatarurl" mode="aspectFill"></image>

						<view class="text-wrap">
							<view class="nickname">{{$app.getData('userInfo').nickname}}</view>
							<view class="count">贡献{{myRank.score}}</view>
						</view>

						<view class="heart" @tap="like(0, -1)">
							<view class="heart-icon iconfont iconxin"></view>
							<view class="count">{{myRank.like_count||0}}</view>
						</view>

					</view>
				</view>

				<scroll-view scroll-y class="list-wrapper" @scrolltolower="userRankPage++;getUserRank();">
					<view class="item" v-for="(item,index) in userRankList['thisweek_count']" :key="index">
						<view class="rank">
							<image class="num img-l" v-if="index<=2" :src="'/static/image/rank/rank-'+(index+1)+'.png'" mode=""></image>
							<view v-else class="num">{{index+1}}</view>
						</view>
						<image class='avatar' :src="item.user.avatarurl || $app.getData('AVATAR')" mode="aspectFill"></image>
						<view class="text-wrap">
							<view class="nickname">{{item.user.nickname || $app.getData('NICKNAME')}}</view>
							<view class="count">贡献{{item.hot}}</view>
						</view>
						<view class="heart flex-set" @tap="like(item.user_id,index)">
							<view class="heart-icon iconfont iconxin"></view>
							<view class="count">{{item.like_count || 0}}</view>
						</view>

					</view>
				</scroll-view>


			</view>
		</modalComponent>

		<!-- 徽章达成弹窗 -->
		<view class="achievebadge-modal-container flex-set" v-if="modal == 'achieveBadge'">
			<view class="achievebadge-box">
				<view class="flaring">
					<image :src="achieveBadge.cfg_badge.bimg" mode="aspectFill"></image>
				</view>

				<view class="text">
					<view class="title">恭喜您，获得徽章</view>
					<view>“{{achieveBadge.cfg_badge.text}}”</view>
					<view>{{achieveBadge.create_time}}获得</view>
				</view>

				<view class="btn">
					<button open-type="share" @tap="buttonHandler" data-sharetype="share">
						<view>晒出我的徽章</view>
					</button>
					<view class="row-text" @tap="$app.goPage('/pages/user/badge')">查看徽章</view>
				</view>

			</view>

			<view class="close-btn flex-set iconfont iconclose" @tap="modal = ''"></view>
		</view>

		<!-- 粉丝团宝箱 -->
		<modalComponent v-if="modal == 'fansBox'" @closeModal="modal=''">
			<view class="fansbox-modal-container">
				<view class="title flex-set">粉丝团宝箱<view @tap="$app.goPage('/pages/notice/notice?id='+sendFansNoticeId)" class="iconfont iconicon-test"></view>
				</view>
				<view class="scroll-wrap" v-if="sendFansBoxList.length>0">
					<view class="box-item" @tap="goFansBox(item.id)" v-for="(item,index) in sendFansBoxList" :key="index">
						<image class="img" v-if="item.settle" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Ep3RhxrWX9ibdRVKkjMQibIDOyyiceYtYA3wicYibgc9LdyicVnq6rx9KASdZxH9V0VIaJ7icZEZr3gbLng/0"
						 mode=""></image>
						<image class="img" v-else src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Ep3RhxrWX9ibdRVKkjMQibIDXFuAk08uV2BgHKn9RO8fLoS8zM0z12ic0SjzHd1IxYNhUibyy5fJEllQ/0"
						 mode=""></image>
						<view class="name flex-set">
							<image class="img" :src="item.user.avatarurl" mode="aspectFill"></image>
							{{item.user.nickname}}
						</view>
					</view>
				</view>
				<view class="scroll-wrap" v-else>
					<view class="tips position-set">
						<view>粉丝团成员发出的宝箱会在这里显示</view>
					</view>
				</view>
				<view class="btn-wrap" @tap="modal='sendFansBox'">
					<btnComponent type="default">
						<view class="btn flex-set">我要发宝箱</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>
		<!-- 发粉丝团宝箱 -->
		<modalComponent v-if="modal == 'sendFansBox'" type="center" @closeModal="modal=''">
			<view class="sendfansbox-modal-container">
				<view class="send-input">
					<input type="number" @input="sendFansInput" />
					<!-- <view class="iconfont iconjiantou"></view> -->
					<image class="img" @tap.stop="sendFansChange" v-if="sendFansBoxUseCurrency==0" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
					 mode="aspectFill"></image>
					<image class="img" @tap.stop="sendFansChange" v-else-if="sendFansBoxUseCurrency==1" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXX6zqzjkSn01fIlGmzJw6u6spsa2iclibKUibzkneYdS4CE4FGmmysZiaW3V3rz08MFNsIY8hFsXoKgg/0"
					 mode="aspectFill"></image>
					<image class="img" @tap.stop="sendFansChange" v-else-if="sendFansBoxUseCurrency==2" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"
					 mode="aspectFill"></image>

					<image @tap.stop="sendFansChange" style="right: 20upx;width: 30upx;height: 30upx;padding-bottom:10upx;" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXX6zqzjkSn01fIlGmzJw6uVHXlUbGEEBfTW8ysG5j7xhWREa7dc3wTXQfYlDmF30e7iazribbekpIA/0"
					 mode="aspectFill"></image>

				</view>
				<view class="tips">你需要消耗一定的钻石或积分</view>

				<view class="send-input">
					<input type="number" placeholder="人数" @input="sendFansboxPeople = $event.detail.value" />
					<image src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JWYnDaLq93R8UIIWZiaOQkoN5ksdRaVV1kzssymXAiboSqhU64HFf7BkeW7HKtBaQpWGnwBg5cDxoSQ/0"
					 mode="aspectFill"></image>
				</view>
				<view class="tips">多少人可以开这个宝箱</view>

				<view class="count flex-set">总计送出<text class="highlight">{{sendFansBoxCoinNum}}</text>
					<image class="img-s" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
					 mode="aspectFill"></image>
				</view>

				<view class="btn-wrap" @tap="sendFansBoxBtn">
					<btnComponent type="default">
						<view class="btn flex-set">发宝箱</view>
					</btnComponent>
				</view>
				<view class="tips">宝箱存在时间为24小时，请及时领取</view>
			</view>
		</modalComponent>
		<!-- 新人礼包 -->
		<view class="open-ad-container flex-set" v-if="modal=='newboy'">
			<view class="box-wrap">
				<view class="top-wrap">
					<view class="category-title">{{signGift_currentCategoryTitle}}</view>
				</view>
				<!-- <image class="main" :src="newboyBg" mode="aspectFill"></image> -->
				<!-- 列表 -->
				<view class="content-wrap">
					<view class="left-container">
						<view class="row-item" v-if="
							item.status==1 && !(item.id==3 && $app.chargeSwitch()==1)
							" v-for="(item,index) in signGift_categoryList"
						 :key="index" @tap="changeSignGift(index)" :class="{active:signGift_currentCategory==index}">{{item.name}}
							<view class="tips dot" v-if="item.tips"></view>
						</view>
					</view>

					<scroll-view class="right-container" scroll-y>
						<view class="row-item" @tap="signGiftSettle(index)" v-for="(item,index) in signGift_list" :key="index" v-if="item.over!=2">
							<view class="row-wrap" :class="'over'+item.over">
								<view class="left-wrap">
									<view class="text" v-if="!item.awards.achievement">{{item.title}}</view>
									<view class="award">
										<view class="item" v-if="item.awards.coin">
											<image class="img" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JX01hOqpeCia2icDIMMhsAyRnJ1XEVTJDGicZsIeBdM5x6sZMZY6tc71lbzRVFBp4ichpsgIamP8SaaeQ/0"
											 mode="aspectFill"></image>
											<view class="num outbox" v-if="item.category_id==2">x{{item.awards.coin}}</view>
											<view class="num" v-else>x{{item.awards.coin >= 10000?  Math.round(item.awards.coin / 10000) + '万': item.awards.coin}}</view>
										</view>
										<view class="item" v-if="item.awards.flower">
											<image class="img" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JX01hOqpeCia2icDIMMhsAyRnIlhbglkgjd33dibmAHP7nNmBr4pNaYMk4j4LvRej3yMjz6hMuYWLEtA/0"
											 mode="aspectFill"></image>
											<view class="num">x{{item.awards.flower >= 10000?  Math.round(item.awards.flower / 10000) + '万': item.awards.flower}}</view>
										</view>
										<view class="item" v-if="item.awards.stone">
											<image class="img" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JX01hOqpeCia2icDIMMhsAyRnjwMndLlukEAL0ibGJpUwxXOJ7qOKtuyD42Sn73x9dfvmgmb0CUB6S3g/0"
											 mode="aspectFill"></image>
											<view class="num">x{{item.awards.stone}}</view>
										</view>
										<view class="item" v-if="item.awards.trumpet">
											<image class="img" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JX01hOqpeCia2icDIMMhsAyRnRvCnXIZtJtzPZx7z4ETD3W4I4At8r1QJa5U8iaEYMHBGSzSPMibXEcPA/0"
											 mode="aspectFill"></image>
											<view class="num">x{{item.awards.trumpet}}</view>
										</view>
										<view class="item" v-if="item.awards.badge">
											<image class="img" :src="item.awards.badge.img" mode="aspectFill"></image>
										</view>
										<view class="item" v-if="item.awards.achievement">
											<image class="img" :src="item.img" mode="aspectFill"></image>
											<view class="num">x{{item.count}}</view>
										</view>
									</view>
								</view>
								<view class="middle-wrap" v-if="item.awards.achievement">
									<view class="title">
										{{item.awards.title || ''}}
									</view>
									<view class="desc">
										{{item.awards.desc || ''}}
									</view>
								</view>
								<view class="right-wrap">

									<block v-if="item.category_id==3">
										<!-- 充值 -->
										<view :class="'btn'+item.over" v-if="$app.chargeSwitch()==0">{{item.btn_text}}</view>
										<button open-type="contact" @tap.stop :class="'btn'+item.over" v-else-if="item.over==0 && $app.chargeSwitch()==2">回复"1"</button>
										<view :class="'btn'+item.over" v-else-if="item.over==1 && $app.chargeSwitch()==2">领取</view>
									</block>

									<view :class="'btn'+item.over" v-else>{{item.btn_text}}</view>

									<view v-if="item.over==0" class="tips">{{item.name_addon}}</view>
									<view v-if="item.awards.achievement" class="tips">
										未领取：{{item.num}}
									</view>
								</view>
							</view>
							<!-- 已完成盖章 -->
							<image v-if="item.over==2" class="chapter" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JX01hOqpeCia2icDIMMhsAyRnO0xnPeniag7enShoUchSSKxDWXVECwZyPPk6ibyrLLA4XuHcUicUcje1Q/0"
							 mode="aspectFill"></image>
						</view>
					</scroll-view>
				</view>
				<view class="close-btn flex-set iconfont iconclose" @tap="modal = ''"></view>
			</view>
		</view>

		<!-- 618活动弹窗 -->
		<modalComponent v-if="modal == 'activity618' && is_open_blessing==1" type="center" @closeModal="modal=''">
			<view class="activity618 flex-set">
				<view class="achievebadge-box">
					<view class="title">618礼包</view>
					<view class="send-item-list">
						<view class="send-item">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
							 mode="widthFix"></image>
							<text>金豆+10000</text>
						</view>
						<view class="send-item">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
							 mode="widthFix"></image>
							<text>钻石+2</text>
						</view>
						<view class="send-item">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk90Xa3b43zE46M8IkUvFyMR5GgfJN52icBqoicfKWfAJS8QXog0PZtgdEQ/0"
							 mode="widthFix"></image>
							<text>喇叭+3</text>
						</view>
						<view class="send-item">
							<image src="/static/image/activity/lucky_bag.png" mode="widthFix"></image>
							<text>福袋+1</text>
						</view>
					</view>
					<view class="btn-contact">
						<btnComponent type="default">
							<button class="btn" open-type="contact">
								<view class="flex-set" style=" height: 60upx;">回复'618'领取</view>
							</button>
						</btnComponent>
					</view>
				</view>
			</view>
		</modalComponent>
		<!-- 夏日福袋活动弹窗 -->
		<modalComponent v-if="modal == 'activity_weal' && is_open_weal==1" type="center" @closeModal="modal=''">
			<view class="activity618 flex-set">
				<view class="achievebadge-box">
					<view class="title">夏日福袋礼包</view>
					<view class="send-item-list">
						<view class="send-item">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
							 mode="widthFix"></image>
							<text>金豆+10000</text>
						</view>
						<view class="send-item">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
							 mode="widthFix"></image>
							<text>钻石+2</text>
						</view>
						<view class="send-item">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk90Xa3b43zE46M8IkUvFyMR5GgfJN52icBqoicfKWfAJS8QXog0PZtgdEQ/0"
							 mode="widthFix"></image>
							<text>喇叭+3</text>
						</view>
						<view class="send-item">
							<image src="/static/image/activity/lucky_bag.png" mode="widthFix"></image>
							<text>福袋+1</text>
						</view>
					</view>
					<view class="btn-contact">
						<btnComponent type="default">
							<button class="btn" open-type="contact">
								<view class="flex-set" style=" height: 60upx;">回复'夏日福袋'领取</view>
							</button>
						</btnComponent>
					</view>
				</view>
			</view>
		</modalComponent>

		<modalSpecialComponent v-if="modal == 'weal' && is_open_weal==1" type="center" title="打榜后福袋使用" @closeModal="modal=''">
			<view class="blessing-modal-container">
				<view class="title">打榜成功</view>
				<view class="sengHotNum">{{this.$app.getData('userStar')['name']}}增加{{sendCount}}人气</view>
				<view class="btn-blessing">
					<view class="btn-blessing-text" @tap="useBag">
						<btnComponent type="default">
							<view class="flex-set" style=" padding: 10upx 30upx;font-size: 30upx;font-weight: 600;">使用福袋</view>
						</btnComponent>
					</view>
					<view class="btn-blessing-text" @tap="blessingModalSelect=1">
						<btnComponent type="success">
							<view class="flex-set" style=" padding: 10upx 30upx;font-size: 30upx;font-weight: 600;">{{blessingModalSelect>0?'提高概率':'查看概率'}}</view>
						</btnComponent>
					</view>
				</view>
				<view class="blessingbag">
					<view class="">剩余福袋:{{blessing_num}}</view>
					<view class="">18%档次概率:{{lucky_value}}%</view>
				</view>
				<view class="blessing-cont" v-if="blessingModalSelect==0">
					<view class="">使用福袋爱豆和自己可额外增加{{sendCount}}乘以6.18%、6.66%、8.88%、18%任意一档人气值</view>
				</view>
				<view class="blessing-cont" v-else>
					<view class="">获得额外6.18%人气概率:50%</view>
					<view class="">获得额外6.66%人气概率:30%</view>
					<view class="">获得额外8.88%人气概率:20%</view>
					<view class="">获得额外18%人气概率:{{lucky_value}}%</view>
				</view>
			</view>
		</modalSpecialComponent>
		
		<!-- 领取成功 -->
		<modalComponent v-if="modal == 'getWeadHear'" type="center" title="提示" @closeModal="modal=''">
			<view class="get-hear-container">
				<view class="title">领取成功</view>
				<image class="bg" :src="getHearItem.img"
				 mode="aspectFill"></image>
				 <view>【{{getHearItem.title}}】头饰</view>
				 <view>过期时间：{{getHearItem.end_time}}</view>
				<view class="btn-wrap">
					<btnComponent type="unset">
						<view class="btn flex-set btn-unlock" @tap="$app.goPage('/pages/user/headwear?type=1')">
							去佩戴 >
						</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>

		<shareModalComponent ref="shareModal"></shareModalComponent>
	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	import listItemComponent from '@/components/listItemComponent.vue'
	import badgeComponent from '@/components/badgeComponent.vue'
	import countToComponent from '@/components/countToComponent.vue'
	import modalSpecialComponent from '@/components/modalSpecialComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent,
			listItemComponent,
			badgeComponent,
			countToComponent,
			modalSpecialComponent,
		},
		data() {
			return {
				btn_cfg: this.$app.getData('config').btn_cfg,
				btn_cfg_group: [],
				is_blessing_gifts: 1,
				showLoading: true,
				requestCount: 7,
				tips: false,

				userCurrency: {},

				star: {},
				userRankList: {
					thisday_count: [],
					thisweek_count: [],
				},
				is_open_blessing: 0,
				blessingModalSelect: 0,
				blessing_num: 0,
				lucky_value: 5,
				chartList: [],
				chartScroll: 1, // 聊天窗位置
				modal: '', // 模态框名称
				chartMsg: '', // 聊天输入内容
				sendCount: '', // 赠送人气数额
				starRankList: [],
				invitAward: {}, // 邀请奖励
				hasEarnCount: 0,
				hasInvitcount: 0,
				spriteEarn: false,
				rechargeList: [], // 充值商品列表
				danmaku: null, // 当前弹幕
				article: {}, // 公告文章
				cfgBidden: [],
				fakeinvitList: [],
				invitFakePage: 1,

				activeInfo: null,
				current: 0,
				itemList: [],

				giftItemList: [],
				chartAni: '',

				// 点击聊天室头像,当前显示用户
				currentUser: {},
				sendOtherNum: 1,
				sendOtherType: '', // 赠送他人是鲜花还是钻石‘’

				sprite_level: 0,
				friendTotal: 0,
				captain: 0, // 团长
				fanclub_id: null, // 粉丝团

				siginList: [],
				signin_day: 1,
				signin_coin: 0,

				disLeastCount: 0, // 距离上一名差距数额
				myTotalCount: 0, // 我的总贡献

				sideBtnOpacity: 1, // 侧边按钮组显示
				urgeSendTips: '', // 催促打榜tips

				inputing: false, // 输入中

				send_num_list: [99, 520, 1314, 9999, 66666, '全送'],
				// send_num_list: [1000, 10000, 50000, 100000, 1000000, '全送'],

				myRank: {},

				sendDanmaku: [
					[],
					[],
					[]
				], // 打榜弹幕
				danmakuClosed: this.$app.getData('danmakuClosed'),

				// 粉丝团宝箱
				sendFansboxNum: '', // 消耗数额
				sendFansBoxUseCurrency: 0, // 0 钻石 1积分
				sendFansBoxCoinNum: 0, // 兑换成金豆的数额
				sendFansboxPeople: 1, // 发放宝箱个数
				sendFansBoxList: [], // 宝箱列表
				sendFansNoSettle: 0, // 没有结算的宝箱
				sendFansNoticeId: 0, // 说明id

				// 新人礼包
				// newboyList: [],
				// newboyBg: 'https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Ep3RhxrWX9ibdRVKkjMQibIDNy4g4CU7wJTicw6PiaPhZmIsxMhu2kkD5iaDgmdFpDyg5yZYwJwibYXAUw/0',
				// newboyCurrent: 0,
				// newboyRemainTime: '',

				// 任务礼包
				signGift_title: '',
				signGift_tips: 0,
				signGift_currentCategory: 1,
				signGift_categoryList: [],
				signGift_list: [],
				signGift_currentCategoryTitle: '',

				//徽章
				achieveBadge: [],

				showAddXcx: !this.$app.getData('userExt').add_enter, // 显示提示去添加到我的小程序顶部弹框

				phoneNumber: '',
				phoneCode: '',
				
				extHot: {},
				
				getHearItem: null,
			};
		},
		created() {
			const config = this.$app.getData('config');
			if (config.hasOwnProperty('send_hot')) {
				this.send_num_list = config.send_hot.send_num;
			}
			this.$app.request('user/biddenTime', {}, res => {
				this.cfgBidden = res.data
			})
			this.sendDanmakuIndex = 0
			this.initDanmaku()
		},
		destroyed() {
			clearInterval(this.timeId_danmaku)
		},
		methods: {
			// 获取打榜额外的加成
			getExtraSendHot() {
				this.$app.request(this.$app.API.STAR_EXTRA_SEND_HOT, {}, res => {
					this.extHot = res.data;
				})
			},
			goExtraHotPage() {
				uni.navigateTo({
					url: "/pages/active/weal"
				})
			},
			getGroupList() {
				this.$app.request(this.$app.API.BTN_CFG_GROUP, {}, res => {
					this.btn_cfg = res.data.btn_cfg;
					this.btn_cfg_group = res.data.groupList;
					this.is_open_blessing = res.data.is_open_blessing;
					this.modal = res.data.modal;
					if(this.is_open_blessing>0){
						this.blessingBagInfo();
					}
				})

			},
			blessingBagInfo() {

				this.$app.request(this.$app.API.USER_BLESSING_BAG, {}, res => {
					this.blessing_num = res.data.blessing_num
					this.lucky_value = res.data.lucky_value
				})
			},
			useBlessing() {
				this.blessingModalSelect = 0;
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定要使用福袋吗',
					success: function(res) {
						if (res.confirm) {

							that.$app.request(that.$app.API.ACTIVE_USE_BLESSING_BAG, {
								starid: that.star.id,
								type: that.current + 1,
								danmaku: Number(!that.danmakuClosed),
							}, res => {
								let data = res.data;
								that.blessingBagInfo()
								// console.log(data)
								uni.showModal({
									title: '福袋使用成功',
									content: '本次使用福袋获得' + parseInt(that.sendCount) + 'X' + data.value + '%=' + data.addNum + '人气',
									confirmText: '增加概率',
									cancelText: '我知道了',
									success: function(res) {
										if (res.confirm) {
											that.$app.goPage(`/pages/active/active618`)
										} else if (res.cancel) {
											that.modal = '';
										}
									}
								});
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			useBag() {
				this.blessingModalSelect = 0;
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定要使用福袋吗',
					success: function(res) {
						if (res.confirm) {

							that.$app.request(that.$app.API.ACTIVE_WEAL_BAG_USE, {
								starid: that.star.id,
								type: that.current + 1,
								danmaku: Number(!that.danmakuClosed),
							}, res => {
								let data = res.data;
								that.blessingBagInfo()
								// console.log(data)
								uni.showModal({
									title: '福袋使用成功',
									content: '本次使用福袋获得' + parseInt(that.sendCount) + 'X' + data.value + '%=' + data.addNum + '人气',
									confirmText: '增加概率',
									cancelText: '我知道了',
									success: function(res) {
										if (res.confirm) {
											that.$app.goPage(`/pages/active/active_weal`)
										} else if (res.cancel) {
											that.modal = '';
										}
									}
								});
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
							that.modal = '';
						}
					}
				});
			},
			buttonHandler(e) {
				const sharetype = e.target.dataset.sharetype
				if (sharetype == 'share') {
					// 分享
					const shareType = e.target && e.target.dataset.sharetype
					// #ifdef APP-PLUS
					const shareOptions = this.$app.commonShareAppMessage(shareType)
					this.$refs.shareModal.shareShow(shareOptions)
					// #endif
				}
			},
			/**
			 * 加载数据
			 */
			load(starid) {
				this.current = 0
				this.star.id = starid

				// 请求数据
				this.loadData()
				
				this.getExtraSendHot()

				this.userCurrency = this.$app.getData('userCurrency')
			},
			unLoad() {
				this.leaveGroup()
			},
			loadData() {
				const clientId = this.$app.getData('clientId')
				if (!clientId) {
					this.$app.invokeSocket()
					setTimeout(() => {
						this.loadData()
					}, 1500)
				} else {
					this.$app.request('page/group', {
						starid: this.star.id,
						client_id: clientId,
					}, res => {

						this.fanclub_id = res.data.fanclub_id
						this.is_blessing_gifts = res.data.is_blessing_gifts
						// 明星信息
						const star = res.data.starInfo
						uni.setNavigationBarTitle({
							title: star.name
						})
						this.star = {
							id: star.id,
							avatar: star.head_img_s ? star.head_img_s : star.head_img_l,
							name: star.name,
							weekHot: this.$app.formatNumber(star.star_rank.week_hot),
							weekRank: star.star_rank.week_hot_rank,
							share_img: star.share_img,
							qrcode: star.qrcode,
							isBirth: star.isBirth || false,
							chat_off: star.chat_off || 0,
						}
						// 聊天
						this.disLeastCount = res.data.disLeastCount
						this.chartList = res.data.chartList
						this.$nextTick(function() {
							this.chartScroll = this.chartList.length * 999
						})
						// 延迟渲染
						setTimeout(() => {
							this.captain = res.data.captain
							// 用户排行
							this.userRankList['thisday_count'] = res.data.userRank

							// 公告
							this.article.name = res.data.article.name || '暂无';
							this.article.id = res.data.article.id
							this.article.isNew = Date.now() / 1000 - this.$app.strToTime(res.data.article.create_time) < 2 * 24 * 3600

						}, 300)

						//宝箱及成长礼包
						if (this.$app.getData('config').fansbox_open == '1') {
							this.$app.request('fans/mybox', {}, res => {
								this.sendFansBoxList = res.data.list
								this.sendFansNoSettle = res.data.can_settle
								this.isJoinFanclub = res.data.isJoinFanclub
								this.signGift_title = res.data.signGift_title
								this.signGift_tips = res.data.signGift_tips
							})
						}

						//徽章获得
						this.$app.request('badge/achieve', {}, res => {
							if (res.data.badge_id > 0) {
								this.achieveBadge = res.data,
									this.modal = 'achieveBadge'
							}
						})

						this.getGroupList();

					})
				}

			},
			// 打榜弹幕开关
			danmakuSwitch(e) {
				this.danmakuClosed = !e.detail.value
				this.$app.setData('danmakuClosed', !e.detail.value)
			},
			openUserModal() {
				this.modal = 'user'
			},
			// 禁言
			forbidden(uid) {
				let list = [];
				let itemList = [];
				let arr = this.cfgBidden;
				for (let val of arr) {
					list.push(val.time)
					itemList.push(val.desc)
				}
				wx.showActionSheet({
					itemList,
					success: res => {
						let time = list[res.tapIndex]
						wx.showModal({
							title: '提示',
							content: `确定将此用户禁言?`,
							success: res => {
								if (res.confirm) {
									this.$app.request('user/forbidden', {
										user_id: uid,
										time: time,
									}, res => {
										this.$app.toast(res.msg)
									})
								}
							}
						})
					}
				})

				// this.$app.modal(`确认将${this.currentUser.nickname}禁言？`, () => {
				// 	this.$app.request('user/forbidden', {
				// 		user_id: this.currentUser.id,
				// 	}, res => {
				// 		this.$app.toast('操作成功', 'success')
				// 		this.modal = ''
				// 	}, 'POST', true)
				// })
			},

			sendItemOther(item, num, index) {
				this.$app.modal(`确认将${num}个${item.name}送给${this.currentUser.nickname}？`, () => {
					this.$app.request('user/sendItemToOther', {
						user_id: this.currentUser.id,
						item_id: item.id,
						num: num
					}, res => {
						this.$app.toast('赠送成功', 'success')
						this.modal = ''
						this.itemList[index].self -= num
					}, 'POST', true)
				})
			},

			copy(text) {
				this.$app.copy(text)
			},

			// 送给别人
			sendOther() {
				let sendOtherNum = parseInt(this.sendOtherNum)
				this.sendOtherNum = 1

				if (sendOtherNum <= 0) {
					this.$app.toast('请输入正确的数字')
					return
				}
				if (this.sendOtherType == 'flower') {
					var text = '鲜花'
				} else if (this.sendOtherType == 'stone') {
					var text = '钻石'
				}
				if (sendOtherNum > this.userCurrency[this.sendOtherType]) {
					this.$app.toast('你没有这么多' + text)
					return
				}

				this.$app.modal(`确认将${sendOtherNum}${text}送给${this.currentUser.nickname}？`, () => {
					this.$app.request('user/sendToOther', {
						user_id: this.currentUser.id,
						num: sendOtherNum,
						type: this.sendOtherType,
					}, res => {
						this.$app.toast('赠送成功', 'success')
						this.modal = ''
						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
							this.userCurrency = this.$app.getData('userCurrency')
						})
					}, 'POST', true)
				})
			},
			// 加粉丝团
			addFanclub(id) {
				this.$app.request('fans/apply', {
					id: id
				}, res => {
					this.$app.toast('申请成功，等待团长确认', 'none')
					this.modal = ''
				}, 'POST', true)
			},
			// 点击聊天室用户头像
			tapUser(uid) {
				if (uid == this.$app.getData('userInfo').id) return
				this.currentUser = {}
				this.modal = 'userInfo'
				this.$app.request('user/info', {
					user_id: uid
				}, res => {
					this.currentUser = res.data
				})
			},

			goPageHasStar(url) {
				if (this.$app.getData('userStar').id) {
					this.$app.goPage(url)
				} else {
					this.$app.toast('请先加入圈子')
				}
			},

			like(user_id, index) {
				if (!user_id) user_id = this.$app.getData('userInfo').id
				this.$app.request('user/like', {
					user_id
				}, res => {
					if (index == -1) {
						this.myRank.like_count++
					} else {
						this.userRankList['thisweek_count'][index].like_count++
					}

				}, 'POST', true)
			},

			getLocalImg(src, callback) {
				if (~src.indexOf('http')) {
					uni.getImageInfo({
						src,
						success: function(res) {
							callback && callback(res.path)
						}
					})
				} else {
					callback && callback(src)
				}
			},
			getShareText(type) {
				this.$app.request(this.$app.API.EXT_SHARETEXT, {
					type,
				}, res => {
					this.modal = ''
					this.$app.copy(res.data.share_text)
				})
			},
			// 绘制canvas海报
			drawCanvas() {
				if (this.star.id != this.$app.getData('userStar').id) return
				this.modal = 'canvas'
				var rate = this.$app.getData('sysInfo').windowWidth / 375 / 2.0
				var ctx = uni.createCanvasContext('mycanvas', this);
				// 绘制文字
				const drawText = function() {
					ctx.setFillStyle('#FFFFFF') //文字颜色

					ctx.setFontSize(18) //设置字体大小，默认10
					ctx.setTextAlign('center')
					ctx.fillText(this.$app.getData('config').canvas_title[0], 240 * rate, 200 * rate) //绘制文本
					ctx.fillText(this.$app.getData('config').canvas_title[1], 240 * rate, 250 * rate) //绘制文本

					ctx.fillText(this.star.name, 140 * rate, 636 * rate) //绘制文本

					ctx.setFontSize(8) //设置字体大小，默认10
					ctx.setTextAlign('left')
					ctx.fillText(`榜单排名:NO.${this.star.weekRank}`, 265 * rate, 616 * rate) //绘制文本
					ctx.fillText(`人气值:${this.star.weekHot}`, 265 * rate, 640 * rate) //绘制文本

					ctx.fillText(`我是${this.$app.getData('userInfo').nickname}`, 130 * rate, 774 * rate) //绘制文本
					ctx.fillText(`一起为${this.star.name}打榜`, 130 * rate, 804 * rate) //绘制文本
				}.bind(this)

				// 绘制图片
				// 背景
				uni.showLoading({
					title: "生成海报中"
				})
				this.getLocalImg('/static/image/canvas-bg.png', src => {
					ctx.drawImage(src, 0, 0, 480 * rate, 854 * rate);
					// 明星 
					this.getLocalImg(this.star.share_img || this.star.avatar, src => {
						ctx.drawImage(src, 48 * rate, 286 * rate, 382 * rate, 305 * rate);
						// 用户头像
						this.getLocalImg(this.$app.getData('userInfo').avatarurl || this.$app.getData('AVATAR'), src => {
							ctx.save() //保存当前的绘图上下文。
							ctx.beginPath() //开始创建一个路径
							ctx.arc(79 * rate, 784 * rate, 40 * rate, 0, 2 * Math.PI, false) //画一个圆形裁剪区域
							ctx.clip() //裁剪
							ctx.drawImage(src, 38 * rate, 744 * rate, 80 * rate, 80 * rate) //绘制图片
							ctx.restore() //恢复之前保存的绘图上下文
							// 二维码
							this.getLocalImg(this.$app.getData('qrcode') || this.$app.QRCODE, src => {
								ctx.save() //保存当前的绘图上下文。
								ctx.beginPath() //开始创建一个路径
								ctx.arc(400 * rate, 780 * rate, 50 * rate, 0, 2 * Math.PI, false) //画一个圆形裁剪区域
								ctx.clip() //裁剪
								ctx.drawImage(src, 350 * rate, 730 * rate, 100 * rate, 100 * rate);
								ctx.restore() //恢复之前保存的绘图上下文

								// 绘制文字
								drawText()
								// 绘制
								ctx.draw(false, () => {
									// 保存到临时图片
									uni.canvasToTempFilePath({
										canvasId: 'mycanvas',
										success: res => {
											this.canvasImg = res.tempFilePath
											//console.log(this.canvasImg);

										}
									}, this);
								})


								uni.hideLoading()
							})
						})
					})
				})
			},
			//保存的画布
			saveCanvas() {
				// 保存图片到用户相册
				uni.saveImageToPhotosAlbum({
					filePath: this.canvasImg,
					success: () => {
						this.$app.toast('保存成功', 'success')
					}
				});
			},
			/**
			 * 收到推送信息
			 * 添加聊天内容
			 */
			addChartMsg(data) {
				this.chartList.push(data)
				this.$nextTick(function() {
					this.chartScroll = this.chartList.length * 999
				})
			},
			// 定时显示喇叭弹幕
			initDanmaku() {
				clearInterval(this.timeId_danmaku)
				this.danmaku = this.$app.danmakuQueue.shift() || null
				this.timeId_danmaku = setInterval(() => {
					this.danmaku = this.$app.danmakuQueue.shift() || null
				}, 10000)
			},

			// 喊话
			sayworld() {
				if (!this.chartMsg.trim()) return
				if (this.chartMsg.trim().length > 16) {
					this.$app.toast('内容过长')
					return
				}
				this.modal = ''
				this.$app.request(this.$app.API.USER_SAYWORLD, {
					content: this.chartMsg.trim()
				}, res => {
					this.chartMsg = ''
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						if (this.$app.getData('userCurrency')['trumpet'] == res.data.trumpet) {
							this.$app.toast('喊话失败，请稍后再试')
						} else {
							this.$app.toast('喊话成功', 'success')
						}
						this.$app.setData('userCurrency', res.data)
						this.userCurrency = this.$app.getData('userCurrency')
					})

				}, 'POST', true)
			},
			/*
			保存手机号码
			*/
			getPhoneNumber(e) {
				let userInfo = this.$app.getData('userInfo')
				this.$app.request('user/savephone', {
					iv: e.detail.iv,
					encryptedData: e.detail.encryptedData,
				}, res => {
					userInfo.phoneNumber = res.data.phoneNumber
					this.$app.setData('userInfo', userInfo)
					this.modal = ''
				}, 'POST', true)
			},
			/*
			保存手机号码
			*/
			savePhoneNumber() {
				if (!this.phoneNumber || !this.phoneCode) {
					this.$app.toast('手机号码或者验证码不能为空')
					return;
				}

				let userInfo = this.$app.getData('userInfo')
				this.$app.request('user/savephone', {
					phoneNumber: this.phoneNumber,
					phoneCode: this.phoneCode,
				}, res => {
					userInfo.phoneNumber = res.data.phoneNumber
					this.$app.setData('userInfo', userInfo)
					this.modal = ''
				}, 'POST', true)
			},
			/**
			 * 保存用户详细信息
			 */
			getUserInfo(e) {
				// #ifdef MP
				const userInfo = e.detail.userInfo
				if (userInfo && ~this.$app.getData('platform').indexOf('MP')) {
					this.$app.request(this.$app.API.USER_SAVEINFO, {
						iv: e.detail.iv,
						encryptedData: e.detail.encryptedData,
					}, res => {
						if (res.data.userInfo.id != this.$app.getData('userInfo').id) {
							// 同步其他平台账号数据
							this.$app.token = null
							this.$app.request('page/app', {}, res => {
								this.$app.setData('userCurrency', res.data.userCurrency)
								this.$app.setData('userStar', res.data.userStar)
								this.$app.setData('userExt', res.data.userExt)
							})
						}

						this.$app.setData('userInfo', res.data.userInfo)

						this.sendOrFollow()
					}, 'POST', true)
				}
				// #endif
				// #ifndef MP
				this.sendOrFollow()
				// #endif
			},
			changeSignGift(index) {
				this.signGift_currentCategory = index
				this.getsignGift()
			},
			newboyOpen() {
				this.modal = 'newboy'
				this.$app.request('task/taskgiftCategory', {}, res => {
					this.signGift_categoryList = res.data.list
					this.getsignGift()
				})
			},
			getsignGift() {
				this.$app.request('task/taskGift', {
					cid: this.signGift_categoryList[this.signGift_currentCategory].id
				}, res => {
					this.signGift_list = res.data.list
					this.signGift_categoryList = res.data.category.list
					this.signGift_title = res.data.category.all_title
					this.signGift_tips = res.data.category.all_tips
					this.signGift_currentCategoryTitle = this.signGift_categoryList[this.signGift_currentCategory].title
				})
			},
			signGiftSettle(index) {
				const cid = this.signGift_categoryList[this.signGift_currentCategory].id;
				const taskover = this.signGift_list[index].over;
				//如果未完成 0
				if (taskover == 0) {
					if (cid == 2) this.modal = 'send' //2粉丝等级
					if (cid == 3) this.$app.goPage(`/pages/charge/charge`) //3充值
					if (cid == 4) this.$app.goPage(`/pages/user/push_index`) //4关注数据助手公众号
					//item.awards.achievement
					const item = this.signGift_list[index];
					if (item.awards.achievement) {
						if (item.awards.hasOwnProperty('gopage')) {
							this.$app.goPage(item.awards.gopage);
						}
						if (item.awards.hasOwnProperty('modal')) {
							this.modal = item.awards.modal;
						}
					}
					return
				}
				//如果已完成 2
				else if (taskover == 2) return

				this.$app.request('task/taskGiftSettle', {
					cid: cid,
					task_id: this.signGift_list[index].id
				}, res => {
					this.getsignGift()
					if (cid == 6) {
						this.getHearItem = Object.assign(this.signGift_list[index], res.data);
						setTimeout(() => {
							this.modal = 'getWeadHear';
						}, 200);
					} else {
						this.$app.toast('领取成功', 'success')
					}
				}, 'POST', true)
			},

			sendFansChange() {
				uni.showActionSheet({
					itemList: ['钻石', '积分'],
					success: res => {
						this.sendFansBoxUseCurrency = res.tapIndex
						this.sendFansBoxCoinNum = 0
					}
				})
			},

			sendFansInput(e) {
				this.sendFansboxNum = e.detail.value
				if (this.sendFansBoxUseCurrency == 0) {
					// 钻石 // 1 = 3000
					this.sendFansBoxCoinNum = this.sendFansboxNum * 3000
				} else if (this.sendFansBoxUseCurrency == 1) {
					// 积分 // 1 = 300
					this.sendFansBoxCoinNum = this.sendFansboxNum * 300
				} else if (this.sendFansBoxUseCurrency == 2) {
					// 鲜花 // 1 = 1
					this.sendFansBoxCoinNum = this.sendFansboxNum * 1
				}
			},
			sendFansBoxBtn() {
				if (this.sendFansBoxCoinNum < 300000) {
					this.$app.toast('最少送出30万金豆')
					return
				}

				if (this.sendFansboxPeople < 10 || this.sendFansboxPeople > 100) {
					this.$app.toast('人数需要10-100人')
					return
				}

				this.$app.request('fans/sendbox', {
					type: this.sendFansBoxUseCurrency,
					consume: this.sendFansboxNum,
					people: this.sendFansboxPeople,
				}, res => {
					this.modal = ''
					this.$app.toast('宝箱已发出', 'success')
				}, 'POST', true)
			},
			fansBoxOpen() {
				// if (this.isJoinFanclub) {
				this.modal = 'fansBox'
				this.$app.request('fans/mybox', {}, res => {
					this.sendFansBoxList = res.data.list
					this.sendFansNoSettle = res.data.can_settle
					this.sendFansNoticeId = res.data.noticeId
				})
				// } else {
				// 	this.$app.modal(`请先加入一个粉丝团`, () => {
				// 		this.goPageHasStar('/pages/fans/fans_list')
				// 	}, '跳转')
				// }

			},
			goFansBox(id) {
				this.$app.goPage(`/pages/lottery/box_open?id=${id}`)
			},
			/**偷金豆*/
			steal(starid, index, steal) {
				if (steal > 0) return
				this.$app.request(this.$app.API.STAR_STEAL, {
					starid,
					index
				}, res => {
					this.starRankList[index].steal = 60
					this.$app.toast(`偷到了${res.data.count}金豆`)

					this.getStarRank()
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
					})
				}, 'POST', true)
			},
			getInvitAward(uid, status, index) {
				if (status != 1) return
				this.$app.request(this.$app.API.USER_INVITAWARD, {
					ral_user_id: uid
				}, res => {
					this.fakeinvitList[index].status = 2
					this.$app.toast('领取成功')
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
					})
				}, 'POST', true)
			},
			goOther(item) {
				this.modal = ''
				this.$app.goPage('/pages/subPages/pet/other/other?user_id=' + item.uid + '&off=' + item.off)
			},
			// 拉票
			getFakeInviteList() {
				this.$app.request(this.$app.API.USER_INVITLIST, {
					page: this.invitFakePage
				}, res => {
					this.invitAward = res.data.award
					this.hasInvitcount = res.data.hasInvitcount
					// 已领取人次
					this.hasEarnCount = res.data.list.hasEarnCount

					if (this.invitFakePage == 1) {
						this.fakeinvitList = res.data.list.list
					} else {
						this.fakeinvitList = this.fakeinvitList.concat(res.data.list.list)
					}

					this.$app.closeLoading(this)
				})
			},
			setSendCount(e) {
				this.sendCount = e.detail.value
			},
			/**
			 * 贡献人气
			 */
			sendHot(count) {
				if (count) {
					if (count == '全送') {
						if (this.current == 0) {
							// 送金豆
							this.sendCount = this.userCurrency.coin
						} else if (this.current == 1) {
							// 送鲜花
							this.sendCount = this.userCurrency.flower
						} else if (this.current == 2) {
							// 送旧豆
							this.sendCount = this.userCurrency.old_coin
						}
						return
					} else {
						this.sendCount = count
					}
				}
				if (!parseInt(this.sendCount)) {
					this.$app.toast('数额不正确')
					return
				}

				const sendData = {
					starid: this.star.id,
					hot: parseInt(this.sendCount),
					type: this.current + 1,
					danmaku: Number(!this.danmakuClosed),
				};
				if (this.current == 1 && this.sendCount == this.userCurrency.flower) {
					this.$app.modal(`确认送出${this.sendCount}鲜花？`, () => {
						this.sendHotAction(sendData);
					})
				} else {
					this.sendHotAction(sendData);
				}
			},
			sendHotAction(data) {
				uni.showLoading({
					title:"打榜中...",
					mask: true
				});
				this.$app.request(this.$app.API.STAR_SENDHOT, data, res => {
					this.getStarInfo()
					this.userRankPage = 1
					this.getUserRank()
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
						this.userCurrency = res.data
					})
					if (this.star.id == this.$app.getData('userStar').id) {
						uni.hideLoading();
						// 弹窗
						if (this.is_open_blessing == 1) {
							this.modal = 'blessing'
						} else {
							this.modal = 'sendOver'
						}
						return
					}
					this.$app.toast('打榜成功', 'success')
				}, 'POST', true)
			},
			/**
			 * 发送留言
			 */
			sendMsg() {
				/*失去焦点时 IOS键盘收回，但留下一片空白的问题*/
				// #ifdef H5
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
				// #endif
				const chartMsg = this.chartMsg.trim()
				if (chartMsg.length > 32) {
					this.$app.toast('发言内容过长')
					return
				}
				this.chartMsg = ''
				if (!chartMsg) return

				this.modal = ''
				this.$app.invokeSocket()
				this.$app.request(this.$app.API.STAR_SENDMSG, {
					starid: this.star.id,
					content: chartMsg,
				})
			},
			adminCheckoutStar() {
				this.$app.modal(`每个人只能加入一个圈子\n是否加入${this.star.name}的圈子？`, () => {
					this.$app.request(this.$app.API.STAR_FOLLOW, {
						starid: this.star.id,
						rer_user_id: this.$app.getData('referrer'), // 推荐人
					}, res => {
						if (this.$app.getData('userInfo').type == 1) {
							this.$app.token = ''
							this.$app.request(this.$app.API.USER_INFO, {}, res => {
								this.$app.setData('userInfo', res.data, true)
								this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
									this.$app.setData('userCurrency', res.data)
								})
								this.$app.request(this.$app.API.USER_STAR, {}, res => {
									this.$app.setData('userStar', res.data, true)
									this.$app.goPage('/pages/group/group?tips=1')
								})
							})
						} else {
							this.$app.request(this.$app.API.USER_STAR, {}, res => {
								this.$app.setData('userStar', res.data)
								this.$app.setData('noob', true)
								this.chartMsg = `大家好，我是${this.$app.getData('userInfo').nickname}，请多关照~`
								this.sendMsg()
								this.$app.toast('加入成功')
								setTimeout(() => {
									this.$app.goPage('/pages/group/group?tips=1')
								}, 200)
							})
						}
				
					}, 'POST', true)
				})
			},
			/**
			 * 加入明星圈子或弹出打榜
			 */
			sendOrFollow(e) {
				// if (!this.$app.getData('userInfo').nickname) {
				// 	this.$app.toast('请先去个人中心点击头像进行授权')
				// 	return
				// }
				if (this.$app.getData('userStar')['id']) {
					// 已加入圈子
					if (this.$app.getData('userStar')['id'] == this.star.id ||
						this.star.isBirth) {
						// 打榜
						this.sendCount = ''
						this.modal = 'send'

						if (this.star.isBirth) {
							this.current = 1
						}

						return
					} else {
						if (this.$app.getData('userInfo').type != 1) {
							this.$app.toast(`不能为其他爱豆打榜`)
							return
						}
					}

				}
				// 加入圈子
				this.$app.modal(`每个人只能加入一个圈子\n是否加入${this.star.name}的圈子？`, () => {
					this.$app.request(this.$app.API.STAR_FOLLOW, {
						starid: this.star.id,
						rer_user_id: this.$app.getData('referrer'), // 推荐人
					}, res => {
						if (this.$app.getData('userInfo').type == 1) {
							this.$app.token = ''
							this.$app.request(this.$app.API.USER_INFO, {}, res => {
								this.$app.setData('userInfo', res.data, true)
								this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
									this.$app.setData('userCurrency', res.data)
								})
								this.$app.request(this.$app.API.USER_STAR, {}, res => {
									this.$app.setData('userStar', res.data, true)
									this.$app.goPage('/pages/group/group?tips=1')
								})
							})
						} else {
							this.$app.request(this.$app.API.USER_STAR, {}, res => {
								this.$app.setData('userStar', res.data)
								this.$app.setData('noob', true)
								this.chartMsg = `大家好，我是${this.$app.getData('userInfo').nickname}，请多关照~`
								this.sendMsg()
								this.$app.toast('加入成功')
								setTimeout(() => {
									this.$app.goPage('/pages/group/group?tips=1')
								}, 200)
							})
						}

					}, 'POST', true)
				})

			},
			getStarInfo() {
				this.$app.request(this.$app.API.STAR_INFO, {
					starid: this.star.id
				}, res => {
					const star = res.data

					this.star = {
						id: star.id,
						avatar: star.head_img_s ? star.head_img_s : star.head_img_l,
						name: star.name,
						weekHot: this.$app.formatNumber(star.star_rank.week_hot),
						weekRank: star.star_rank.week_hot_rank,
						share_img: star.share_img, // 海报图片
						qrcode: star.qrcode,
						isBirth: star.isBirth || false,
					}
				})
			},
			getArticle() {
				this.$app.request(this.$app.API.ARTICLE, {}, res => {
					this.article.name = res.data.name
					this.article.id = res.data.id
					this.$app.closeLoading(this)
				})
			},
			getStarRank() {
				// 偷花
				this.$app.request(this.$app.API.STAR_RANK, {
					type: 1
				}, res => {
					this.steal_num = res.data.steal_num
					this.sprite_level = res.data.sprite_level
					this.steal_num_max = res.data.steal_num_max
					this.steal_count = res.data.steal_count
					this.steal_times = res.data.steal_times
					this.steal_times_max = res.data.steal_times_max
					// 清除steal倒计时定时器
					if (!this.$app.timeId) this.$app.timeId = []
					for (let v of this.$app.timeId) {
						clearInterval(v)
					}
					this.$app.timeId = []
					const resList = []
					let index = 0
					res.data.list.forEach((e, i) => {
						if (i < 6 && e.star.id != this.$app.getData('userStar')['id']) {
							resList.push({
								starid: e.star.id,
								name: e.star.name,
								steal_count: res.data.steal_count,
								avatar: e.star.head_img_s ? e.star.head_img_s : e.star.head_img_l,
								hot: this.$app.formatNumberRgx(e['week_hot']),
								steal: res.data.steal[index]
							})
							if (res.data.steal[index] > 0) {
								this.startStealTimeInterval(index)
							}
							index++
						}
					})

					this.starRankList = resList
				})
			},
			getUserRank(field = 'thisweek_count') {
				if (this.userRankPage > 10) return
				this.$app.request(this.$app.API.USER_RANK, {
					starid: this.star.id,
					page: this.userRankPage || 1,
					field,
				}, res => {
					this.myRank = res.data.my
					if (this.userRankPage == 1) {
						this.userRankList[field] = res.data.list
					} else {
						this.userRankList[field] = this.userRankList[field].concat(res.data.list)
					}


				})
			},
			// 打榜弹幕
			sendHotDanmaku(data) {
				if (!this.danmakuClosed) {
					this.sendDanmaku[this.sendDanmakuIndex].push(data)
					setTimeout(() => {
						// 10s后销毁这条弹幕
						this.sendDanmaku[this.sendDanmakuIndex].shift()
					}, 10000)
					if (++this.sendDanmakuIndex > 2) this.sendDanmakuIndex = 0
				}
			},

			getChartList() {
				this.$app.request(this.$app.API.STAR_CHART, {
					starid: this.star.id,
				}, res => {
					this.chartList = res.data
					this.$nextTick(function() {
						this.chartScroll = this.chartList.length * 999
					})

					this.$app.closeLoading(this)
				})
			},
			/**
			 * 加入聊天室
			 */
			joinGroup() {
				const clientId = this.$app.getData('clientId')
				if (!clientId) {
					this.$app.invokeSocket()
					setTimeout(() => {
						this.joinGroup()
					}, 1500)
				} else {
					this.$app.request(this.$app.API.STAR_JOINCHART, {
						star_id: this.star.id,
						client_id: clientId,
					}, res => {
						this.$app.closeLoading(this)
					})
				}
			},
			leaveGroup() {
				const clientId = this.$app.getData('clientId')
				if (clientId) {
					this.$app.request(this.$app.API.STAR_LEAVECHART, {
						star_id: this.star.id,
						client_id: clientId,
					}, res => {})
				}
			},
			setPhoneNumber(e) {
				this.phoneNumber = e.detail.value
			},
			setPhoneCode(e) {
				this.phoneCode = e.detail.value
			},
			//发送验证码
			sendPhoneCode() {
				this.$app.request('page/sendSms', {
					phoneNumber: this.phoneNumber,
				}, res => {
					this.$app.toast('验证码已发送，1天只能发送一次')
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.reply {
		color: #FC3131;
		border-bottom: 2rpx solid #FFD4D4;
		font-size: 23rpx;
	}
	.mt6 {
		margin-top: 60upx !important;
	}

	.guild-component-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		overflow: hidden;

		.add-top-img {
			position: fixed;
			z-index: 1;
			right: 15upx;
			width: 400upx;

			.btn {
				position: absolute;
				width: 50upx;
				height: 50upx;
				right: 6upx;
				top: 16upx;
			}
		}

		.top-bg {
			background-color: $bg-color-2;
			height: 250upx;
			width: 100%;
			top: 0;
			border-bottom-left-radius: 10upx;
			border-bottom-right-radius: 10upx;
			position: absolute;
			z-index: -1;
		}

		.top-container {
			background-color: #544f4b;
			color: #fff;
			position: relative;

			.danmaku-wrapper {
				position: absolute;
				height: 50upx;
				width: 100%;

				.danmaku {
					margin-top: 10upx;
					display: flex;
					animation: sayworld 10s linear infinite;

					@keyframes sayworld {
						0% {
							transform: translateX(750rpx);
						}

						10%,
						90% {
							transform: translateX(0);
						}

						100% {
							transform: translateX(-750rpx);
						}
					}

					align-items: center;
					position: absolute;
					z-index: 9;
					border-radius: 50upx;

					.bg {
						position: absolute;
						z-index: -1;
					}

					.avatar {
						width: 44upx;
						height: 44upx;
						border-radius: 50%;
					}

					.content {
						padding: 0 10upx;
						padding-right: 50upx;
						min-width: 200upx;
						color: #FFF;
					}
				}

				.danmaku.in {
					padding: 8upx 16upx;
					background: #564da9;
					font-size: 26upx;

					.user-level-wrap {
						display: flex;
						align-items: center;

						.img {
							width: 28upx;
						}

						.user-level-text {
							border-radius: 30upx;
							padding-right: 10upx;
						}

						.level1 {
							color: #B8CAD6;
							background: linear-gradient(to right, rgba(206, 223, 232, 0), rgba(206, 223, 232, 0.6));
						}

						.level2,
						.level3,
						.level4,
						.level5 {
							color: #74D0FF;
							background: linear-gradient(to right, rgba(112, 228, 254, 0), rgba(112, 228, 254, 0.6));
						}

						.level6,
						.level7,
						.level8 {
							color: #09EA71;
							background: linear-gradient(to right, rgba(102, 240, 123, 0), rgba(102, 240, 123, 0.6));
						}

						.level9,
						.level10,
						.level11 {
							color: #FD8465;
							background: linear-gradient(to right, rgba(255, 161, 161, 0), rgba(255, 161, 161, 0.6));
						}

						.level12,
						.level13 {
							color: #F76134;
							background: linear-gradient(to right, rgba(255, 160, 128, 0), rgba(255, 160, 128, 0.6));
						}

						.level14 {
							color: #FD75A1;
							background: linear-gradient(to right, rgba(255, 151, 197, 0), rgba(255, 151, 197, 0.6));
						}

						.level15 {
							color: #EB5AFF;
							background: linear-gradient(to right, rgba(224, 137, 255, 0), rgba(224, 137, 255, 0.6));
						}

						.level16 {
							color: #e8b12a;
							background: linear-gradient(to right, rgba(224, 137, 255, 0), rgba(226, 186, 84, 0.6));
						}

						.level17 {
							color: #FF7C00;
							background: linear-gradient(to right, rgba(255, 230, 245, 0), rgba(255, 230, 194, 0.6));
						}

						.level18 {
							color: #FF0019;
							background: linear-gradient(to right, rgba(255, 230, 230, 0), rgba(255, 194, 194, 0.6));
						}

					}
				}
			}

			.send-danmaku-wrap {
				position: absolute;
				width: 100%;
				height: 150upx;
				top: 40upx;

				.row {
					height: 33.33%;

					.danmaku {
						position: absolute;
						display: flex;
						align-items: center;
						position: absolute;
						border-radius: 50upx;
						background-color: rgba(#ff9999, .8);
						z-index: 1;
						animation: trans 10s linear forwards;
						font-size: 24upx;

						@keyframes trans {
							0% {
								transform: translateX(750upx);
							}

							100% {
								transform: translateX(-750upx);
							}
						}

						.avatar {
							width: 30upx;
							height: 30upx;
							border-radius: 50%;
							margin: 5upx;
						}

						.content {
							padding: 0 10upx;
							color: #FFF;
						}
					}

					.danmaku.flower {
						background-color: rgba(#fa3142, .6);
					}


				}
			}

			.top-row {
				padding: 30upx 30upx 0;
				display: flex;
				align-items: center;

				.avatar-wrap {
					.avatar {
						width: 130upx;
						height: 130upx;
						border-radius: 50%;
					}
				}

				.center-wrap {
					margin-left: 20upx;
					display: flex;
					align-items: center;
					flex: 1;
					justify-content: space-between;

					.row {
						text-align: center;
					}

					.split {
						width: 1px;
						height: 60upx;
						background-color: #6e6965;
					}
				}
			}

			.bottom-wrap {
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				padding: 0 30upx;

				.left-wrap {
					padding: 15upx 0;

					.top-wrap {
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						padding-bottom: 10upx;

						.right {
							font-size: 22upx;
						}
					}

					.fans-rank-wrap {
						min-height: 60upx;
						display: flex;
						justify-content: space-between;

						.avatar-wrap {
							margin: 0 5rpx;
							position: relative;

							.avatar {
								width: 60upx;
								height: 60upx;
								border-radius: 50%;
							}

							.rank {
								position: absolute;
								right: -15upx;
								bottom: -15upx;
								width: 50upx;
								height: 50upx;
							}
						}

						.avatar-wrap.s-1 {
							margin: 0;

							.avatar {
								// border: 4upx solid #f9de48;
							}
						}

						.avatar-wrap.s-2 {
							.avatar {
								// border: 4upx solid #dae0e9;
							}
						}

						.avatar-wrap.s-3 {
							.avatar {
								// border: 4upx solid #f6c382;
							}
						}

					}
				}

				.center-wrap {
					margin-bottom: 30upx;

					.join {
						white-space: nowrap;
						background-color: #f7ab5f;
						border-radius: 30upx;
						font-size: 28upx;
						font-weight: 300;
						color: #FFF;
						padding: 0upx 16upx;
						margin: 0 14upx;
						box-shadow: 0 0 2upx rgba(0, 0, 0, .3);
						position: relative;
						z-index: 4;
					}
				}

				.right-wrap {
					margin-left: 50upx;

					.send-btn {
						position: relative;

						image {
							width: 240upx;
							height: 120upx;
						}
					}
				}
			}
		}


		.list-container {
			padding-bottom: 130upx;
			font-size: 26rpx;

			.item {
				height: 120upx;
				display: flex;
				align-items: center;

				.rank-num {
					text-align: center;
					width: 100upx;

					.icon {
						width: 50upx;
						height: 50upx;
					}
				}

				.avatar-wrap {
					position: relative;

					.avatar {
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
					}

					.headwear {
						width: 150%;
						height: 150%;
					}
				}

				.text-container {
					margin: 0 20upx;
					width: 280upx;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;

					.bottom-text {
						display: flex;
						align-items: center;
						color: $text-color-1;
					}
				}

				.count {
					margin: 0 30upx;
					color: #ff8421;
				}


			}
		}

		.center-container {
			padding: 10upx 30upx;
			border-bottom: 10upx solid #efefef;

			.isnew {
				width: 50upx;
				height: 27upx;
			}

			.row-info {
				display: flex;
				justify-content: space-between;
			}

			.row-1 {
				padding: 5upx 10upx;

				.btn-item {
					text-align: center;

					.icon {
						width: 70upx;
						height: 70upx;
					}

					.text {
						margin-top: 5upx;
						font-size: 24upx;
					}
				}
			}

			.row-2 {
				align-items: center;
				font-size: 26upx;

				.left-wrap {
					color: #e3ba0c;
				}

				.center-wrap {
					color: #666666;
					flex: 1;
				}

				.right-wrap {
					color: #b1b1b1;
				}
			}
		}

		.chart-container {
			flex: 1;
			overflow-y: auto;

			.chart-item {
				display: flex;
				justify-content: space-between;
				padding: 16upx 40upx;
				position: relative;

				.left-wrap {
					display: flex;
					align-items: flex-start;
					flex: 1;

					.avatar-wrap {
						position: relative;
						height: auto;

						.avatar {
							width: 86upx;
							height: 86upx;
							border-radius: 50upx;
						}

						.headwear {
							width: 150%;
							height: 150%;
						}
					}

					.avatar-wrap.leader::after {
						content: "团";
						position: absolute;
						background-color: rgba(#F99152, .8);
						border-radius: 12upx;
						z-index: 1;
						padding: 0 4upx;
						color: #FFF;
						font-size: 20upx;
						right: 0;
						bottom: 0;
					}

					.center-wrap {
						margin-left: 20upx;

						.top {
							color: #737373;
							display: flex;
							align-items: center;
							font-size: 24upx;

							.nickname_lenght0 {
								max-width: 316upx;
							}

							.nickname_lenght1 {
								max-width: 280upx;
							}

							.nickname_lenght2 {
								max-width: 244upx;
							}

							.nickname_lenght3 {
								max-width: 212upx;
							}

							.nickname_lenght4 {
								max-width: 178upx;
							}

							.nickname_lenght5 {
								max-width: 142upx;
							}

							.nickname_lenght6 {
								max-width: 106upx;
							}

							.nickname_lenght7 {
								max-width: 76upx;
							}

							.nickname_lenght8 {
								max-width: 42upx;
							}

							.badge-wrap {
								padding: 0 2upx;
								display: flex;

								.user-level-wrap {
									display: flex;

									.img {
										width: 34upx;
									}

									.user-level-text {
										border-radius: 30upx;
										padding-right: 10upx;
									}

									.level1 {
										color: #B8CAD6;
										background: linear-gradient(to right, rgba(206, 223, 232, 0), rgba(206, 223, 232, 0.6));
									}

									.level2,
									.level3,
									.level4,
									.level5 {
										color: #74D0FF;
										background: linear-gradient(to right, rgba(112, 228, 254, 0), rgba(112, 228, 254, 0.6));
									}

									.level6,
									.level7,
									.level8 {
										color: #09EA71;
										background: linear-gradient(to right, rgba(102, 240, 123, 0), rgba(102, 240, 123, 0.6));
									}

									.level9,
									.level10,
									.level11 {
										color: #FD8465;
										background: linear-gradient(to right, rgba(255, 161, 161, 0), rgba(255, 161, 161, 0.6));
									}

									.level12,
									.level13 {
										color: #F76134;
										background: linear-gradient(to right, rgba(255, 160, 128, 0), rgba(255, 160, 128, 0.6));
									}

									.level14 {
										color: #FD75A1;
										background: linear-gradient(to right, rgba(255, 151, 197, 0), rgba(255, 151, 197, 0.6));
									}

									.level15 {
										color: #EB5AFF;
										background: linear-gradient(to right, rgba(224, 137, 255, 0), rgba(224, 137, 255, 0.6));
									}

									.level16 {
										color: #e8b12a;
										background: linear-gradient(to right, rgba(224, 137, 255, 0), rgba(226, 186, 84, 0.6));
									}

									.level17 {
										color: #FF7C00;
										background: linear-gradient(to right, rgba(255, 230, 245, 0), rgba(255, 230, 194, 0.6));
									}

									.level18 {
										color: #FF0019;
										background: linear-gradient(to right, rgba(255, 230, 230, 0), rgba(255, 194, 194, 0.6));
									}

								}

								.user-badge .badge-item {
									width: 33upx;
									height: 32upx;
									margin-left: 3upx;
								}

							}
						}

						.bottom {
							margin-top: 10upx;
							border-radius: 20upx;
							border: 2upx solid #cecece;
							background-color: #f6f6f6;
							padding: 10upx 20upx;
							font-size: 30upx;
							// display: inline-block;
							.angle {
								position: absolute;
								width: 16upx;
								height: 16upx;
								background-color: #f6f6f6;
								border-bottom: 2upx solid #cecece;
								border-left: 2upx solid #cecece;
								left: 138upx;
								top: 78upx;
								transform: rotate(45deg);
							}
						}
					}
				}

				.right-wrap {
					font-size: 22upx;
					color: #797979;
				}
			}

		}

		.chart-container.rank-list {

			.item {
				padding: 20upx 0;
				height: 130upx;
				display: flex;
				align-items: center;
				border-bottom: 6upx solid #efefef;

				.rank-num {
					image {
						width: 40upx;
						min-height: 40upx;
					}

					margin-left: 60upx;
				}

				.avatar image {
					margin-left: 60upx;
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
				}

				.text-container {
					margin-left: 30upx;
					width: 250upx;
					line-height: 44upx;

					.bottom-text {
						display: flex;
						align-items: center;
						color: $text-color-1;
					}
				}

				.level {
					// margin-left: 30upx;
				}

				.count {
					margin-left: 30upx;
				}


			}

		}

		.chart-btn-container {
			.phonenumber {
				width: 100%;
				height: 100%;
			}

			.top-wrap {
				padding: 20upx 40upx;
				padding-bottom: 0;
				display: flex;
				align-items: center;

				.trumpet-wrap {
					display: flex;
					align-items: center;

					.icon {
						width: 40upx;
						height: 40upx;
						margin: 0 10upx;
					}
				}

				.space {
					padding: 0 20upx;
					color: #e0e0e0;
				}

				.tips {
					font-size: 24upx;
					color: #999999;
				}
			}

			.bottom-wrap {
				padding: 0 20upx;
				display: flex;
				align-items: center;

				.input {
					border-radius: 30upx;
					border: 2upx solid #e0e0e0;
					background-color: #f0f0f0;
					flex: 1;
					padding: 0 20upx;
					height: 63upx;
					line-height: 63upx;
					margin: 20upx 0;
					margin-right: 20upx;
				}

				.btn {
					border-radius: 30upx;
					width: 176upx;
					height: 63upx;
					background-color: #ffd524;
				}

			}
		}

		.side-container {
			position: absolute;
			bottom: 120upx;
			right: 20upx;

			.btn-wrap {
				position: relative;
				margin: 20upx 0;
				display: flex;
				flex-direction: column;
				align-items: center;

				.img {
					width: 80upx;
					height: 80upx;
				}

				.tips {
					font-size: 18upx;
					color: #fff;
					position: absolute;
					z-index: 1;
					bottom: -2upx;
					left: 50%;
					transform: translateX(-50%);
					border-radius: 30upx;
					padding: 0 15upx;
					background-color: #f00;
				}

				.tips.dot {
					width: 20upx;
					height: 20upx;
					padding: 0;
				}

				.title {
					font-size: 20upx;
					margin-top: -18upx;
					text-shadow: 2upx 0upx 5upx white, -2upx 0upx 5upx white, 0upx 2upx 5upx white, 0upx -2upx 5upx white;
				}
			}

		}

		.phonenumber-modal-container {}

		.send-modal-container {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;

			.switch-wrap {
				position: absolute;
				top: -60upx;
				left: 20upx;
				font-size: 34upx;
				transform: scale(0.7);
			}
			.absolute-dog4 {
				position: absolute;
				left: 100%;
				top: 0;
				width: 440%;
				font-size: 40upx;
				font-weight: 500;
				text-align: center;
			}
			
			.absolute-go {
				position: absolute;
				left: 400rpx;
				width: 220rpx;
			}
			
			.absolute-go-dog {
				position: absolute;
				left: 0rpx;
				top: 80rpx;
				width: 220rpx;
			}

			.explain-wrapper {
				font-size: 24upx;
			}

			.swiper-change {
				margin: 30upx;
				border-radius: 30upx;
				overflow: hidden;
				box-shadow: 0 2upx 4upx rgba(0, 0, 0, .3);

				.item {
					width: 200upx;
					height: 50upx;
					line-height: 50upx;
					background-color: #FFF;
					text-align: center;
				}

				.item.select {
					background-color: #ffc918;
					color: #2d1408;
				}

			}

			swiper {
				width: 100%;
				height: 100%;
			}

			.swiper-item {
				flex: 1;

				.wrap {
					position: relative;
					width: 100%;
				}
			}

			.btn-wrapper {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;

				.btn {
					border-radius: 10upx;
					margin: 8upx 16upx;
					width: 190upx;
					height: 100upx;
					color: $text-color-1;
					border: 2upx solid $text-color-1;

					image {
						width: 40upx;
						height: 40upx;
					}
				}

				.btn.self-input {
					width: 412upx;

					input {
						// background-color: ￥;
						border-radius: 60upx;
						width: 100%;
						height: 110upx;
						text-align: center;
						line-height: 110upx;
					}
				}

				.btn.pick {
					font-size: 34upx;
					font-weight: 700;
					background-color: #f8648a;
					color: #FFF;
				}
			}

			.bottom-wrapper {
				border-top: 2upx solid #EEE;
				margin: 20upx 60upx;
				padding: 20upx 0;
				color: $text-color-1;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 80%;

				.btn {
					text-decoration: underline;
					margin: 10upx;
				}

				.right {
					font-weight: 700;

					.iconfont {
						font-size: 24upx;
					}
				}
			}

		}

		.invit-modal-container {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			color: #000;

			.explain-wrapper {
				padding: 20upx 40upx;
				padding-top: 0;

				.top {
					justify-content: space-between;

					font-size: 34upx;
					font-weight: 700;

					text {
						color: orange;
					}
				}

				.title {
					font-size: 30upx;
					font-weight: 600;
					padding: 10upx;
				}

				.bottom {
					font-size: 22upx;
				}

				.row.between {
					display: flex;
					justify-content: space-between;
				}
			}

			.info {
				width: 100%;
				background-color: #f7f7f7;
				display: flex;
				justify-content: space-around;
				padding: 10upx;
				font-size: 26upx;
			}

			.list-wrapper {
				overflow-y: auto;
				height: 536upx;

				.item {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding: 10upx 20upx;
					// border-radius: 60upx;
					// background-color: rgba($color_0, .3);
					border-bottom: 1px solid #EEE;
					// margin: 10upx;
					padding: 20upx 60upx;

					.rank-num {
						width: 90upx;
						text-align: center;
					}

					.avatar image {
						width: 90upx;
						height: 90upx;
						border-radius: 50%;
					}

					.text-container {
						width: 450upx;
						padding: 0 30upx;
						line-height: 44upx;

						.bottom-text {
							display: flex;
							align-items: center;

							.hot-count {
								color: $text-color-1;
								margin-right: 4upx;
							}

							.icon-heart {
								width: 30upx;
								height: 30upx;
							}
						}
					}
				}

			}

			.user-list {
				width: 100%;

				.user-list-avatar {
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
					margin: 20upx;
				}
			}

			.btn-wrap {
				margin-top: 40upx;
				margin-bottom: 40upx;
				display: flex;
				justify-content: space-around;
				width: 100%;
				padding: 0 60upx;

				.fsend-btn {
					// background-color: #0EC52F;
					// font-size: 32upx;
					color: #333;
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

		.userinfo-modal-container {
			height: 640upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			padding: 40upx;

			.top {
				display: flex;
				flex-direction: column;
				align-items: center;
				line-height: 1.6;

				.avatar {
					width: 160rpx;
					height: 160rpx;
					border-radius: 50%;
				}

				.nickname {
					font-size: 36upx;
					font-weight: 600;
				}

				.badge-wrap {
					.badge {
						position: relative;
						width: 40upx;
						height: 40upx;
					}

					.level {
						color: #FFF;
						font-size: 26upx;
					}

					.text {
						margin-top: 15upx;
						height: 70%;
						font-size: 20upx;
						padding-left: 38upx;
						padding-right: 19upx;
						border-radius: 30upx;
						margin-left: -30upx;
						color: #FFF;
					}

					.text.i-1 {
						background: linear-gradient(to right, #FFF, #8d8f91);
					}

					.text.i-2 {
						background: linear-gradient(to right, #FFF, #234232);
					}

					.text.i-3 {
						background: linear-gradient(to right, #FFF, #860d3d);
					}

					.text.i-4 {
						background: linear-gradient(to right, #FFF, #b51688);
					}

					.text.i-5 {
						background: linear-gradient(to right, #FFF, #612f29);
					}

					.text.i-6 {
						background: linear-gradient(to right, #FFF, #730056);
					}
				}
			}

			.btn-list {
				width: 100%;
				justify-content: space-around;

				.btn-item {
					display: flex;
					flex-direction: column;
					align-items: center;

					.bg {
						background-color: #EEE;
						border-radius: 20upx;
						width: 100upx;
						height: 100upx;

						image {
							width: 60upx;
							height: 60upx;
						}
					}

					.text {
						margin-top: 10upx;
					}
				}
			}

			.content {
				line-height: 1.6;
			}

			.btn {
				font-size: 32upx;
				font-weight: 700;
				width: 300upx;
				height: 80upx;
			}

			.row {
				width: 100%;
				justify-content: space-around;

				.btn {
					width: 200upx;
				}
			}

			.send-input {
				position: relative;

				input {
					border: 1px solid #CCC;
					background-color: #EEE;
					border-radius: 60upx;
					text-align: center;
					width: 300upx;
					height: 80upx;
					font-size: 32upx;
					font-weight: 700;
				}

				image {
					position: absolute;
					width: 50upx;
					height: 50upx;
					right: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		.sendover-modal-container {
			margin-top: -80upx;

			.top-wrap {
				background-color: #54483f;
				color: #fff;

				.title {
					text-align: center;
					padding-top: 30upx;
					font-size: 32upx;
				}

				.content {
					display: flex;
					align-items: center;
					justify-content: flex-start;
					padding: 20upx 30upx;

					.rank {
						width: 100upx;
						text-align: center;

						.text {
							font-size: 22upx;
						}

					}

					.avatar {
						width: 110upx;
						height: 110upx;
						border-radius: 50%;
						margin: 0 20upx;
					}

					.text-wrap {
						width: 240upx;
					}

					.heart {
						text-align: center;
						line-height: 1.3;

						.heart-icon {
							color: #ff5b01;
							font-size: 32upx;
						}

						.count {
							font-weight: 700;
							color: #cc961d;
						}
					}
				}
			}

			.list-wrapper {
				overflow-y: auto;
				height: 500upx;

				.item {
					display: flex;
					align-items: center;
					justify-content: flex-start;
					padding: 20upx 30upx;
					border-bottom: 2upx solid #efefef;

					.rank {
						text-align: center;
						width: 60upx;
					}

					.avatar {
						width: 100upx;
						height: 100upx;
						border-radius: 50%;
						margin: 0 20upx;
					}

					.text-wrap {
						width: 240upx;
					}

					.heart {
						text-align: center;

						.heart-icon {
							color: #ff5b01;
							font-size: 32upx;
							margin: 0 10upx;
						}

						.count {
							font-weight: 700;
							color: #cc961d;
						}
					}
				}

			}
		}

		.activity618 {
			width: 100%;
			padding: 20rpx;
			z-index: 9;
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			color: #000000;

			.achievebadge-box {
				width: 100%;

				.title {
					font-size: 40upx;
					font-weight: 700;
				}

				.send-item-list {
					width: 100%;
					padding: 20rpx;
					display: flex;
					flex-direction: row;

					.send-item {
						width: 25%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						image {
							width: 80rpx;
						}

						text {
							font-size: 22rpx;
						}
					}
				}
			}

			.btn-contact {
				margin: 20rpx;
				width: 60%;
				margin-left: 20%;
			}

		}

		.achievebadge-modal-container {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 9;
			background-color: rgba(0, 0, 0, 1);
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			color: #FFFFFF;

			.flaring {
				background: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FJ38hIoViapUZ9oviafyEXQoGUqBl4DOkqHRV7VBRQv5Kr8ia9Hx9ibFzcwYKAhk28BK9RO81sOZk6MA/0) center center/100% 100% no-repeat;
				width: 489rpx;
				height: 537rpx;

				image {
					margin-top: 150rpx;
					width: 265upx;
					height: 230upx;
				}
			}

			.text .title {
				font-size: 40upx;
				font-weight: 700;
			}

			.btn {
				margin: 30upx 0;
				display: flex;
				flex-direction: row;
				justify-content: center;
			}

			.btn button {
				margin-right: 30upx;
				padding: 10upx 20upx;
				background-color: #fbcc3e;
				border-radius: 30upx;
			}

			.close-btn {
				z-index: 10;
				border-radius: 50%;
				color: #ccc;
				font-size: 45upx;
				position: absolute;
				top: 100upx;
				right: 80upx;
			}

		}

		.fansbox-modal-container {
			margin-top: -100upx;
			padding: 40upx;
			display: flex;
			align-items: center;
			flex-direction: column;

			.title {
				font-size: 32upx;
				font-weight: 700;
				margin: 20upx;

				.iconfont {
					color: #888;
					margin: 0 10upx;
					font-size: 26upx;
				}
			}

			/* #ifdef  MP-WEIXIN */
			/*  只在小程序中生效  */
			.tips {
				margin-bottom: 100upx;
			}

			/*  #endif  */

			.tips text {
				display: block;
			}

			.phonenumber {
				margin-top: 30upx;
				width: 330upx;
				border-bottom: 1upx solid #818286;
			}

			.phonecode {
				margin: 30upx 0;

				input {
					width: 200upx;
					border-bottom: 1upx solid #818286;
				}
			}

			.scroll-wrap {
				height: 420upx;
				width: 100%;
				overflow: scroll;
				display: flex;
				flex-wrap: wrap;
				margin: 20upx;
				white-space: nowrap;

				.box-item {
					width: 33%;
					display: flex;
					flex-direction: column;
					align-items: center;

					.img {
						width: 154upx;
						height: 126upx;
					}

					.name {
						font-weight: 700;
						color: #fff;
						text-align: center;
						position: relative;
						z-index: 1;
						font-size: 24upx;
						background: linear-gradient(to bottom, #fe947a, #ee5936);
						border-radius: 40upx;
						margin-top: 20upx;
						margin-bottom: 40upx;
						padding-right: 20upx;

						.img {
							border-radius: 50%;
							width: 40upx;
							height: 40upx;
							margin-right: 10upx;
						}
					}
				}
			}

			.btn-wrap {
				margin: 0 20upx;

				.btn {
					font-size: 34upx;
					font-weight: 700;
					padding: 10upx 40upx;
				}
			}
		}

		.sendfansbox-modal-container {
			margin-top: -50upx;
			padding: 40upx;
			display: flex;
			align-items: center;
			flex-direction: column;

			.tips {
				font-size: 22upx;
				color: #999;
				margin: 20upx 0 40upx;
			}

			.send-input {
				position: relative;

				input {
					border: 1px solid #CCC;
					background-color: #EEE;
					border-radius: 60upx;
					text-align: center;
					width: 300upx;
					height: 80upx;
					font-size: 32upx;
					font-weight: 700;
					padding: 0 80upx 0 40upx;
				}

				image {
					position: absolute;
					width: 50upx;
					height: 50upx;
					right: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}

				image.img {
					right: 50upx;
				}
			}

			.count {
				.highlight {
					font-size: 40upx;
					font-weight: 700;
					color: #FC7025;
				}
			}

			.btn-wrap {
				margin: 0 20upx;

				.btn {
					font-size: 34upx;
					font-weight: 700;
					padding: 10upx 40upx;
				}
			}
		}

		.open-ad-container {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 9;
			background-color: rgba(0, 0, 0, .9);

			display: flex;
			flex-direction: column;

			.top-wrap .category-title {
				height: 240upx;
				width: 600upx;
				line-height: 400upx;
				background: url(https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXyaKHrg1Qcwb6oJzia3R4bqYIU6WHzGGSorecfYTRL5UjOiaZtEFPzEuCS4S19b7QibqUoiahd0UDPKw/0) center center/100% 100% no-repeat;
				text-align: center;
				font-size: 30upx;
				margin-top: -64upx;
				text-shadow: 10upx 0upx 20upx #C63703, -10upx 0upx 20upx #C63703, 0upx 10upx 20upx #C63703, 0upx -10upx 10upx #C63703;
			}

			.content-wrap {
				width: 600upx;
				height: 640upx;
				overflow: hidden;
				flex: 1;
				display: flex;
				background-color: #fbb831;
				padding: 10upx;
				border-bottom-left-radius: 10upx;
				border-bottom-right-radius: 10upx;

				.left-container {
					display: flex;
					flex-direction: column;
					font-size: 24upx;

					.row-item {
						padding: 20upx 10upx;
						text-align: center;
						width: 130upx;
						background-color: #FC7025;
						color: #fff;
						margin: 10upx 0;
						border-top-left-radius: 10upx;
						border-bottom-left-radius: 10upx;

						.tips {
							font-size: 18upx;
							color: #fff;
							position: absolute;
							z-index: 1;
							margin: -60rpx 0 0 10rpx;
							transform: translateX(-50%);
							border-radius: 30upx;
							padding: 0 15upx;
							background-color: #f00;
						}

						.tips.dot {
							width: 20upx;
							height: 20upx;
							padding: 0;
						}
					}

					.row-item.active {
						background-color: #fff;
						color: #333;
					}
				}

				.right-container {
					height: 600upx;
					flex: 1;
					background-color: #fff;
					border-radius: 10upx;

					.row-item {
						border-radius: 10upx;
						box-shadow: 0 0 8upx rgba(#666, .6) inset;
						position: relative;
						margin: 10upx;
						padding: 10upx;

						.row-wrap {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.left-wrap {
								.text {
									font-weight: 700;
								}

								.award {
									display: flex;

									.item {
										position: relative;
										margin: 10upx 10upx 10upx 0;

										.img {
											width: 66upx;
											height: 66upx;
										}

										.num {
											position: absolute;
											bottom: 0;
											right: 0;
											color: #fff;
											font-size: 21upx;
										}

										.num.outbox {
											left: 0;
											color: #818286;
											margin-left: 100upx;
										}
									}
								}
							}
							.middle-wrap {
								flex: 1;
								display: flex;
								flex-direction: column;
								.desc {
									font-size: 20rpx;
									color: #818286;
								}
							}

							.right-wrap {

								.btn0,
								.btn1,
								.btn2 {
									width: 131upx;
									height: 53upx;
									font-size: 23rpx;
									line-height: 53rpx;
									text-align: center;
									color: #FFFFFF;
									background: url('https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXyaKHrg1Qcwb6oJzia3R4bqicU7icqjTIuAic0Tc9L9t1cUbL2GNO5wzwaoguDcXpSRWjHiaHQJKQdK8g/0') no-repeat left top;
									background-size: contain;
								}

								.btn0 {
									background: url('https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXyaKHrg1Qcwb6oJzia3R4bqFt8q2x4Emjd6agcIsxWs5icbnzFax4tB4T28uicuefyiaiaSm0LLovQGGA/0') no-repeat left top;
									background-size: contain;
								}

								.tips {
									color: #818286;
									font-size: 20upx;
									text-align: right;
									margin-right: 20upx;
									margin-top: 5upx;

								}
							}
						}

						.row-wrap.over2 {
							filter: grayscale(100%);
						}
					}
				}

				.chapter {
					position: absolute;
					width: 120upx;
					height: 120upx;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%) rotate(-10deg);
				}
			}

			.close-btn {
				z-index: 10;
				border-radius: 50%;
				color: #ccc;
				font-size: 45upx;
				position: absolute;
				top: 80upx;
				right: 50upx;
			}
		}
	}
	
	.get-hear-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: -80upx;
		padding: 40upx;
		overflow: hidden;
				
		.title {
			font-size: 36upx;
			font-weight: 700;
		}
				
		.tips {
			padding: 20upx;
		}
				
		.coin-count {
			font-size: 50upx;
			padding-bottom: 20upx;
			margin-top: -20upx;
			font-weight: 700;
			color: $bg-color-2;
		}
				
		.bg {
			width: 300upx;
			height: 300upx;
		}
				
		.btn {
			padding: 10upx 30upx;
			font-size: 30upx;
			width: 220upx;
			font-weight: 600;
		}

		.btn.s {
			padding: 5upx 20upx;
			font-size: 30upx;
		}
				
		.btn-wrap {
			margin: 10upx 0;
			text-align: center;
			display: flex;
			width: 100%;
			justify-content: space-around;
			padding: 0 20upx;
			.btn-unlock {
				width: unset;
				white-space: nowrap;
				background:url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXvpB3e5ibvGiadFqIOl7vcef7WGKxvBTuXAEwsWeAHbgk4oV9fHGxgxVaiclicLibHfFAOdTd6vO7pKg/0") no-repeat center center;
				background-size: cover;
				border-radius:30upx;
				font-size:28upx;
				color: white;
				padding:15upx 40upx;
			}
		}
				
		.desc {
			padding-top: 10upx;
		}
				
		.row {
			width: 100%;
			padding: 10upx 20upx;
				
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 60upx;
				
				.left {
					font-weight: 600;
					border-left: 8upx solid $bg-color-2;
					padding: 0 20upx;
					line-height: 1.2;
				}
				
				.right {
					padding: 5upx 20upx;
				}
			}
		}
	}
	
	.blessing-modal-container {
		width: 100%;
		padding: 0rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.title {
			font-size: 32upx;
			font-weight: bold;
			padding: 10rpx;
		}

		.sengHotNum {
			font-size: 32upx;
			font-weight: bold;
			padding: 20rpx;
		}

		.btn-blessing {
			width: 100%;
			display: flex;
			justify-content: space-around;

			.btn-blessing-text {
				
			}
		}

		.blessingbag {
			width: 100%;
			display: flex;
			justify-content: space-around;
			color: #999999;
		}

		.blessing-cont {
			width: 100%;
			padding: 20rpx 60rpx;
			font-size: 32rpx;

			view {
				width: 100%;
			}
		}

	}
</style>
