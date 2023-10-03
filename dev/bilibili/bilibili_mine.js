import { $done } from "../../runtime/surge/others.js"
import { async_request, read_request_json_file } from "../../runtime/utils.js"

// “我的”的修改
const main = async() => {
    let request = read_request_json_file('../../requests_and_responses/requests/jsons/bilibili/bilibili_mine.json');
    console.log(request);

    let $response = await async_request(request.method, request.url, request.data, request.headers);

    console.log($response.body);

    // START
    let body = JSON.parse($response.body);

    // 删除了“推荐服务”
    body['data']['sections_v2'] = [
        {
            "items": [
                {
                    "id": 396,
                    "title": "离线缓存",
                    "uri": "bilibili://user_center/download",
                    "icon": "http://i0.hdslb.com/bfs/archive/5fc84565ab73e716d20cd2f65e0e1de9495d56f8.png"
                },
                {
                    "id": 397,
                    "title": "历史记录",
                    "uri": "bilibili://user_center/history",
                    "icon": "http://i0.hdslb.com/bfs/archive/8385323c6acde52e9cd52514ae13c8b9481c1a16.png"
                },
                {
                    "id": 398,
                    "title": "我的收藏",
                    "uri": "bilibili://user_center/favourite",
                    "icon": "http://i0.hdslb.com/bfs/archive/d79b19d983067a1b91614e830a7100c05204a821.png"
                },
                {
                    "id": 399,
                    "title": "稍后再看",
                    "uri": "bilibili://user_center/watch_later",
                    "icon": "http://i0.hdslb.com/bfs/archive/63bb768caa02a68cb566a838f6f2415f0d1d02d6.png",
                    "need_login": 1
                }
            ],
            "style": 1,
            "button": {}
        },
        {
            "title": "创作中心",
            "items": [
                {
                    "id": 171,
                    "title": "创作首页",
                    "uri": "bilibili://uper/homevc",
                    "icon": "http://i0.hdslb.com/bfs/archive/d3aad2d07538d2d43805f1fa14a412d7a45cc861.png",
                    "need_login": 1,
                    "global_red_dot": 1,
                    "display": 1
                },
                {
                    "id": 570,
                    "title": "UP主推荐",
                    "uri": "https://member.bilibili.com/york/up-invitation/inviter?activity_id=7&navhide=1",
                    "icon": "http://i0.hdslb.com/bfs/feed-admin/621e25266b15b2bf311eeb4314e84310836bd4d6.png",
                    "need_login": 1,
                    "global_red_dot": 1,
                    "display": 1
                },
                {
                    "id": 533,
                    "title": "任务中心",
                    "uri": "https://member.bilibili.com/studio/bds/redirect?target_source=mission_archive_2&",
                    "icon": "http://i0.hdslb.com/bfs/archive/ae18624fd2a7bdda6d95ca606d5e4cf2647bfa4d.png",
                    "need_login": 1,
                    "global_red_dot": 1,
                    "display": 1
                },
                {
                    "id": 174,
                    "title": "有奖活动",
                    "uri": "https://member.bilibili.com/york/hot-activity",
                    "icon": "http://i0.hdslb.com/bfs/archive/7f4fa86d99bf3814bf10f8ee5d6c8c9db6e931c8.png",
                    "need_login": 1,
                    "red_dot": 1,
                    "global_red_dot": 1,
                    "display": 1
                },
                {
                    "id": 324864,
                    "title": "主播中心",
                    "uri": "https://live.bilibili.com/p/html/live-app-anchor-center/index.html?is_live_webview=1#/",
                    "icon": "https://i0.hdslb.com/bfs/live/48e17ccd0ce0cfc9c7826422d5e47ce98f064c2a.png",
                    "need_login": 1,
                    "display": 1
                },
                {
                    "id": 34944,
                    "title": "主播活动",
                    "uri": "https://live.bilibili.com/p/html/live-app-activity-list/index.html?force_web=1&is_live_webview=1#/activity-list",
                    "icon": "https://i0.hdslb.com/bfs/live/5bc5a1aa8dd4bc5d6f5222d29ebaca9ef9ce37de.png",
                    "need_login": 1,
                    "display": 1
                },
                {
                    "id": 4,
                    "title": "直播数据",
                    "uri": "https://live.bilibili.com/p/html/live-app-data/index.html?is_live_webview=1#/",
                    "icon": "https://i0.hdslb.com/bfs/live/684d9c8a4cddc45d6d13f3527185e83a879ffae3.png",
                    "need_login": 1,
                    "display": 1
                },
                {
                    "id": 1,
                    "title": "我的直播",
                    "uri": "https://live.bilibili.com/p/html/live-app-center/index.html?is_live_webview=1",
                    "icon": "https://i0.hdslb.com/bfs/live/a9be4fa50ea4772142c1fc7992cde28294d63021.png",
                    "need_login": 1,
                    "display": 1
                }
            ],
            "style": 1,
            "button": {
                "text": "发布",
                "url": "bilibili://uper/user_center/archive_selection",
                "icon": "http://i0.hdslb.com/bfs/archive/205f47675eaaca7912111e0e9b1ac94cb985901f.png",
                "style": 1
            },
            "type": 1,
            "up_title": "创作中心"
        },
        {
            "title": "更多服务",
            "items": [
                {
                    "id": 407,
                    "title": "联系客服",
                    "uri": "bilibili://user_center/feedback",
                    "icon": "http://i0.hdslb.com/bfs/archive/7ca840cf1d887a45ee1ef441ab57845bf26ef5fa.png"
                },
                {
                    "id": 408,
                    "title": "课堂模式",
                    "uri": "bilibili://user_center/lessonsmode",
                    "icon": "http://i0.hdslb.com/bfs/archive/bb3b48455b9364440785fade6223e0c774891b31.png"
                },
                {
                    "id": 409,
                    "title": "青少年模式",
                    "uri": "bilibili://user_center/teenagersmode",
                    "icon": "http://i0.hdslb.com/bfs/archive/68acfd37a735411ad56b59b3253acc33f94f7046.png"
                },
                {
                    "id": 410,
                    "title": "设置",
                    "uri": "bilibili://user_center/setting",
                    "icon": "http://i0.hdslb.com/bfs/archive/e932404f2ee62e075a772920019e9fbdb4b5656a.png"
                }
            ],
            "style": 2,
            "button": {}
        }
    ];
    $done({body: JSON.stringify(body)});
    // END
};

main().then();
