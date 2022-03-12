let body = JSON.parse($response.body.match(/({.*})OK/)[1]);  // $response.body： {json..,}OK
for (let item of body['ads']) {
    // console.log(`${item['begintime']} -- ${item['endtime']}`);
    item['displaytime'] = 0;  // 显示时间
    // 2040 年
    item['begintime'] = '2040-12-27 00:00:01';
    item['endtime'] = '2040-12-27 23:59:59';
}
$done({body: `${JSON.stringify(body)}OK`});
