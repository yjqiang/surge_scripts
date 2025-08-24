let body = JSON.parse($response.body);
//  operation 基本都是 insert ad
if (body['operations'])  // 包括 body['operations'] 可能为 null 的情况
    body['operations'] = body['operations'].filter(element => !(Array.isArray(element['items']) && element['items'].length === 1 && element['items'][0].hasOwnProperty('data') && element['items'][0]['data']['is_ad'] === 1));

$done({body: JSON.stringify(body)});
