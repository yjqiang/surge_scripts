const { $done } = require("../../runtime/surge/public");
const { async_request } = require("../../runtime/utils");

// 回答最下方的广告
const main = async() => {
    let $request = {
        url: "https://www.zhihu.com/api/v4/answers/1862925556/recommendations?hb_no_ad=0&omni=1"
    };
    let $response = await async_request('get', $request.url);

    // START
    let body = $response.body;
    body=JSON.parse(body);
    body['paging']['totals'] = 0;
    body['data'] = [];
    body=JSON.stringify(body);
    $done({body});
    // END
};

main().then();