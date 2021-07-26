let body = JSON.parse($response.body);
// 过滤每个 card 是否是广告
if (body.hasOwnProperty('cards'))
    body['cards'] = body['cards'].filter(element => !(element['card_type'] === 9 && element.hasOwnProperty('mblog') && element['mblog'].hasOwnProperty('promotion') && element['mblog']['promotion']['type'] === 'ad'));
$done({body: JSON.stringify(body)});
