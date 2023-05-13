import { $done } from "../../runtime/surge/public.js"
import { read_text_file } from "../../runtime/utils.js"

const main = async() => {
    let $response = {
        body: read_text_file('../../requests_and_responses/responses/private/weibo_wbapp_wbpullad.json')
    };

    // START
    let body = JSON.parse($response.body);

    if (body.hasOwnProperty('cached_ad') && body['cached_ad'].hasOwnProperty('ads'))
    for (let item of body['cached_ad']['ads']) {
        item['duration'] = 0

        // 2026-11-30 15:48:24
        item['end_date'] = '1796024904'
        item['start_date'] = '1796024914'
    }
    $done({body: JSON.stringify(body)});

    // END
};

main().then();
