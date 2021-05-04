let body = $response.body;
body=JSON.parse(body);
body['paging']['totals'] = 0;
body['data'] = [];
body=JSON.stringify(body);
$done({body});
