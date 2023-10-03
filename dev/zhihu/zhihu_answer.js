import { $done } from "../../runtime/surge/others.js"
import { async_request } from "../../runtime/utils.js"

// 回答最下方的广告
const main = async() => {
    let $request = {
        url: "https://www.zhihu.com/api/v4/answers/1862925556/recommendations?hb_no_ad=0&omni=1"
    };
    let $response = await async_request('get', $request.url);

    // START
    let body = JSON.parse($response.body);
    body['paging']['totals'] = 0;
    body['data'] = [];
    $done({body: JSON.stringify(body)});
    // END
};

main().then();