let body = JSON.parse($response.body);
delete body['ad_info'];
body['data'] = body['data'].filter(element => !(["盐选推荐", "盐选科普", "盐选生活馆"].includes(element['target']['author']['name'])));
$done({body: JSON.stringify(body)});
