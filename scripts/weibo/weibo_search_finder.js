let body = JSON.parse($response.body);
// /channelInfo/channels/0/payload/items/12/data/text
if (body.hasOwnProperty("channelInfo") && body["channelInfo"].hasOwnProperty("channels")) {
    // 发现、热点、视频、找人等
    let channel = body["channelInfo"]["channels"][0];
    // console.log(channel["payload"]["items"].length);
    if (channel.hasOwnProperty("payload") && channel["payload"].hasOwnProperty("items"))
        // 过滤每个 card 是否是广告
        channel["payload"]["items"] = channel["payload"]["items"].filter(element =>
            !(element.hasOwnProperty('data') && element['data'].hasOwnProperty('promotion') && element['data']['promotion']['type'] === 'ad'));
    // console.log(channel["payload"]["items"].length);
}
$done({body: JSON.stringify(body)});
