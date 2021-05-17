let body = $response.body;
body = JSON.parse(body);
// 过滤每条信息
// promotion(推广) <=> mblogtypename: '广告'
// promotion_info <=> timestamp_text: '推荐内容'
body['statuses'] = body['statuses'].filter(element => !(element.hasOwnProperty('promotion') || element.hasOwnProperty('promotion_info')));
body = JSON.stringify(body);
$done({body});
