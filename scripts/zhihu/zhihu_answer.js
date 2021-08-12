let body = JSON.parse($response.body);
body['paging']['totals'] = 0;
body['data'] = [];
$done({body: JSON.stringify(body)});
