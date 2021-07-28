let body = JSON.parse($response.body);
if (body.hasOwnProperty('trend')) {
    delete body['trend'];
    $done({body: JSON.stringify(body)});
}
else
    $done({});
