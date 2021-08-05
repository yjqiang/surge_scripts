import { $done } from "../../runtime/surge/public.js"
import { read_text_file } from "../../runtime/utils.js"

const main = async() => {
    let $response = {
        body: read_text_file('../../requests_and_responses/responses/private/weibo_statuses_extend1.json')
    };

    // START
    let body = JSON.parse($response.body);

    if (body.hasOwnProperty('trend')) {
        delete body['trend'];
        $done({body: JSON.stringify(body)});
    }
    else
        $done({});


    // END
};

main().then();
