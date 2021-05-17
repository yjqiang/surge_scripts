let body = $response.body;
body = JSON.parse(body);
// 过滤评论
// adType: '推荐/广告', type: 1
body['datas'] = body['datas'].filter(element => !(element['type'] === 1));
body = JSON.stringify(body);
$done({body});
