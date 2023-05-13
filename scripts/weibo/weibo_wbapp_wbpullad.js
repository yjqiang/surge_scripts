let body = JSON.parse($response.body);
// https://raw.githubusercontent.com/tielog/AD/master/wb_launch.js
if (body.hasOwnProperty('cached_ad') && body['cached_ad'].hasOwnProperty('ads'))
    body['cached_ad']['ads'] = [];
$done({body: JSON.stringify(body)});
