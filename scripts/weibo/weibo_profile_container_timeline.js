let body = JSON.parse($response.body);
// console.log(body["items"].length);
body["items"] = body["items"].filter(element =>
            !(element.hasOwnProperty('data') && element['data'].hasOwnProperty('promotion') && element['data']['promotion']['type'] === 'ad'));
// console.log(body["items"].length);
$done({body: JSON.stringify(body)});
