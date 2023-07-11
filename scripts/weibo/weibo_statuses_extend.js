let body = JSON.parse($response.body);
if (body.hasOwnProperty('trend'))
    delete body['trend'];
// 微博下面，评论之上的贴片广告
if (body.hasOwnProperty('head_cards'))
    body['head_cards'] = body['head_cards'].filter(element => !(element.hasOwnProperty("actionlog") && element['actionlog']['source'].include("ad")));
$done({body: JSON.stringify(body)});
