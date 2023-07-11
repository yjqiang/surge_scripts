import { $done } from "../../runtime/surge/public.js"
import { read_text_file } from "../../runtime/utils.js"

const main = async() => {
    let $response = {
        body: read_text_file('../../requests_and_responses/responses/private/weibo_statuses_extend2.json')
    };

    // START
    let body = JSON.parse($response.body);

    if (body.hasOwnProperty('trend'))
        delete body['trend'];

    // 微博下面，评论之上的贴片广告
    if (body.hasOwnProperty('head_cards'))
        body['head_cards'] = body['head_cards'].filter(element => !(element.hasOwnProperty("actionlog") && element['actionlog']['source'].include("ad")));

    $done({body: JSON.stringify(body)});


    // END
};

main().then();
