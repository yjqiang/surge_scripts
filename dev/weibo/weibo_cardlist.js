import { $done } from "../../runtime/surge/others.js"
import { read_text_file } from "../../runtime/utils.js"

const main = async() => {
    let $response = {
        body: read_text_file('../../requests_and_responses/responses/private/weibo_searchall.json')
    };

    // START
    let body = JSON.parse($response.body);

    // 过滤每个 card 是否是广告
    if (body['cards'])  // 包括 body['cards'] 可能为 null 的情况
        body['cards'] = body['cards'].filter(element => !(element['card_type'] === 9 && element.hasOwnProperty('mblog') && element['mblog'].hasOwnProperty('promotion') && element['mblog']['promotion']['type'] === 'ad'));
    if (body['items'])
        body['items'] = body['items'].filter(element => !(element.hasOwnProperty('data') && element['data']['is_ad'] === 1));
    $done({body: JSON.stringify(body)});
    // END
};

main().then();
