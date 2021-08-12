let body = JSON.parse($response.body);
delete body['ad_info'];
body['data'] = body['data'].filter(element => !(element['author']['name'] === "盐选推荐" || element['author']['name'] === "盐选科普"));
$done({body: JSON.stringify(body)});
