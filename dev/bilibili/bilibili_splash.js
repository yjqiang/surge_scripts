import { $done } from "../../runtime/surge/others.js"
import {read_text_file} from "../../runtime/utils.js"

// 整体栏的布局修改(包括“首页”右上角、下边 tab 等)
const main = async() => {
    let $response = {
        body: read_text_file('../../requests_and_responses/responses/private/bilibili_splash.json')
    };

    console.log($response.body);


    // START
    let body = JSON.parse($response.body);

    for (let item of body["data"]["list"]) {
        item["duration"] = 0;  // 显示时间
        // 2040 年
        item["begin_time"] = 2240150400;
        item["end_time"] = 2240150400;
    }
    $done({body: JSON.stringify(body)});
    // END
};

main().then();


