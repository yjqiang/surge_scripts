let body = JSON.parse($response.body);
// 过滤评论
// adType: '广告'
if (body['items'])  // 包括 body['items'] 可能为 null 的情况
    body['items'] = body['items'].filter(element => !(element.hasOwnProperty('data') && element['data']['adType'] === '广告'));
$done({body: JSON.stringify(body)});
