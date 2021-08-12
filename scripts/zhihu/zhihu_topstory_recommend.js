let body = $response.body;
body = body.replace(/("id")\s*:\s*(\d{15,})/g, "\$1:\"$2\"");  // 大整数会有精度损失
body = JSON.parse(body);
body['data'] = body['data'].filter(element => !(element.hasOwnProperty('ad')));
$done({body: JSON.stringify(body)});
