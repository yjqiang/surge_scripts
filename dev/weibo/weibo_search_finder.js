import { $done } from "../../runtime/surge/others.js"
import { read_text_file } from "../../runtime/utils.js"

const main = async() => {
    let $response = {
        body: read_text_file('../../requests_and_responses/responses/private/weibo_search_finder.json')
    };

    // START
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
    // END
};

main().then();
