let body = $response.body;
body = JSON.parse(body);
body['data'] = body['data'].filter(element => !(element.hasOwnProperty('ad')));
body = JSON.stringify(body);
$done({body});
