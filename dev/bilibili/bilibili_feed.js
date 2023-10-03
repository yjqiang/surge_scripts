import { $done } from "../../runtime/surge/others.js"
import { async_request, read_request_json_file } from "../../runtime/utils.js"

// “首页”的推荐
const main = async() => {
    let request = read_request_json_file('../../requests_and_responses/requests/jsons/bilibili/bilibili_feed.json');
    console.log(request);

    let $response = await async_request(request.method, request.url, request.data, request.headers);

    console.log($response.body);

    // START
    let body = JSON.parse($response.body);

    // The 3 equal(===) signs mean "equality without type coercion". It is a good practice to always use the identity operators (!== and ===)
    // ad_info 广告/会员购；banner_item 顶部的可以左右滑动的 tab（第一次进入 app 会显示）；element['card_type'] 为 small_cover_v2 是普通的，small_cover_v9 是直播
    body['data']['items'] = body['data']['items'].filter(element => !(element.hasOwnProperty('ad_info') || element.hasOwnProperty('banner_item')));

    $done({body: JSON.stringify(body)});
    // END
};

main().then();
