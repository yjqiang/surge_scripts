let body = JSON.parse($response.body);
// 首页的 tab 栏（加入影视栏目）
body['data']['tab'] = [
    {
        id: 39,
        name: '直播',
        uri: 'bilibili://live/home',
        tab_id: '直播tab',
        pos: 1
    },
    {
        id: 40,
        name: '推荐',
        uri: 'bilibili://pegasus/promo',
        tab_id: '推荐tab',
        pos: 2,
        default_selected: 1
    },
    {
        id: 41,
        name: '热门',
        uri: 'bilibili://pegasus/hottopic',
        tab_id: '热门tab',
        pos: 3
    },
    {
        id: 42,
        name: '追番',
        uri: 'bilibili://pgc/home',
        tab_id: '追番Tab',
        pos: 4
    },
    {
        "id": 151,
        "name": "影视",
        "uri": "bilibili://pgc/cinema-tab",
        "tab_id": "影视tab",
        "pos": 5,
    },
]
// 首页右上角的 tab 栏（删除了游戏中心栏目）
body['data']['top'] = [
    {
        id: 48,
        icon: 'http://i0.hdslb.com/bfs/archive/ada7b340bddee80b3e956c8bfd844463e8e08d48.png',
        name: '消息',
        uri: 'bilibili://link/im_home',
        tab_id: '消息Top',
        pos: 1
    },
]
// app 是下边 tab 栏（删除了会员购栏目）
body['data']['bottom'] = [
    {
        id: 43,
        icon: 'http://i0.hdslb.com/bfs/archive/1ab5459ccb18c7a996315327257375be3da19886.png',
        icon_selected: 'http://i0.hdslb.com/bfs/archive/d6a45f06684562dd9cb6914007658c0cdb17bbff.png',
        name: '首页',
        uri: 'bilibili://main/home/',
        tab_id: '首页Bottom',
        pos: 1
    },
    {
        id: 44,
        icon: 'http://i0.hdslb.com/bfs/archive/b4f621f268c1f9eda501805135f132aa9498b0ba.png',
        icon_selected: 'http://i0.hdslb.com/bfs/archive/94539249e59621214f7dc1226cf38a2b8fe4c64f.png',
        name: '频道',
        uri: 'bilibili://pegasus/channel/',
        tab_id: '频道Bottom',
        pos: 2
    },
    {
        id: 45,
        icon: 'http://i0.hdslb.com/bfs/archive/0f15d5f5be25af29eec6f002561d5000a77cc914.png',
        icon_selected: 'http://i0.hdslb.com/bfs/archive/1d37925562cd3e7d2e5f0868f966b5b9a8b86cde.png',
        name: '动态',
        uri: 'bilibili://following/home/',
        tab_id: '动态Bottom',
        pos: 3
    },
    {
        id: 49,
        icon: 'http://i0.hdslb.com/bfs/archive/aafe71f10eeb5086ac119e4dad769c5aad4d86a2.png',
        icon_selected: 'http://i0.hdslb.com/bfs/archive/36e080bbd8ae858af664ef251741124e04241942.png',
        name: '我的',
        uri: 'bilibili://user_center/',
        tab_id: '我的Bottom',
        pos: 4
    },
];
$done({body: JSON.stringify(body)});
