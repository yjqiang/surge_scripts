let body = $response.body;
body=JSON.parse(body);
delete body['ad_info'];
body['data'] = body['data'].filter(element => !(element['author']['name'] === "盐选推荐" || element['author']['name'] === "盐选科普"));
body=JSON.stringify(body);
$done({body});
