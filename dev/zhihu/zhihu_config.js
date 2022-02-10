import { $done } from "../../runtime/surge/public.js"
import { read_text_file } from "../../runtime/utils.js"


const main = async() => {
    let $response = {
        body: read_text_file('../../requests_and_responses/responses/private/zhihu_config.json')
    };

    // START
    let body = JSON.parse($response.body);
    if(body.hasOwnProperty('config')
        && body.config.hasOwnProperty('zhcnh_thread_sync')
        && body.config.zhcnh_thread_sync.ZHBackUpIP_Switch_Open === '1')

        body.config.zhcnh_thread_sync.ZHBackUpIP_Switch_Open = '0';
    $done({body: JSON.stringify(body)});
    // END
};

main().then();
