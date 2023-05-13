import { $done } from "../../runtime/surge/public.js"
import { read_text_file } from "../../runtime/utils.js"

const main = async() => {
    let $response = {
        body: read_text_file('../../requests_and_responses/responses/private/weibo_wbapp_wbpullad.json')
    };

    // START
    let body = JSON.parse($response.body);

    // https://raw.githubusercontent.com/tielog/AD/master/wb_launch.js
    if (body.hasOwnProperty('cached_ad') && body['cached_ad'].hasOwnProperty('ads'))
        body['cached_ad']['ads'] = [];

    $done({body: JSON.stringify(body)});
    // END
};

main().then();
