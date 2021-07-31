let body = JSON.parse($response.body);
// 过滤每条信息
// promotion(推广) <=> mblogtypename: '广告'
// promotion_info <=> timestamp_text: '推荐内容'
body['statuses'] = body['statuses'].filter(element => !(element.hasOwnProperty('promotion') || element.hasOwnProperty('promotion_info')));
$done({body: JSON.stringify(body)});
