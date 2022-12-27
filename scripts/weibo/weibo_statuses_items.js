let body = JSON.parse($response.body);
// 过滤每个 card 是否是广告
// https://github.com/yichahucha/surge/issues/112
if (body['items'])  // 包括 body['cards'] 可能为 null 的情况
    body['items'] = body['items'].filter(element => !(element.hasOwnProperty('data') && element['data'].hasOwnProperty('mblogtype') && element['data']['mblogtype'] === 1));
$done({body: JSON.stringify(body)});
