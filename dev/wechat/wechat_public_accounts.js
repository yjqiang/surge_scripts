import { $done } from "../../runtime/surge/public.js"
import {read_text_file} from "../../runtime/utils.js"

// “我的”的修改
const main = async() => {
    let $response = {
        body: read_text_file('../../requests_and_responses/responses/private/wechat0.json')
    };

    // START
    if ($response.body) {
        let body = {"advertisement_num":0,"advertisement_info":[]};
        $done({body: JSON.stringify(body)});
    }
    else{
        $done({});
    }
    // END
};

main().then();
