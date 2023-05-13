let body = JSON.parse($response.body);
if (body.hasOwnProperty('cached_ad') && body['cached_ad'].hasOwnProperty('ads'))
for (let item of body['cached_ad']['ads']) {
    item['duration'] = 0
    // 2026-11-30 15:48:24
    item['end_date'] = '1796024904'
    item['start_date'] = '1796024914'
}
$done({body: JSON.stringify(body)});
