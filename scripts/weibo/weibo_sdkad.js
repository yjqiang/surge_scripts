let body = JSON.parse($response.body.match(/({.*})OK/)[1]);  // $response.body： {json..,}OK
body['ads'] = [];
$done({body: `${JSON.stringify(body)}OK`});
