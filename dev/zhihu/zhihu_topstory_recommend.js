const { $done } = require("../../runtime/surge/public");
const { read_text_file } = require("../../runtime/utils");

// 首页 -> 推荐
const main = async() => {
    let $response = {
        body: read_text_file('../../requests_and_responses/responses/private/zhihu_topstory_recommend.json')
    };

    // START
    let body = $response.body;
    body = body.replace(/("id")\s*:\s*(\d{15,})/g, "\$1:\"$2\"");  // 大整数会有精度损失
    body = JSON.parse(body);
    body['data'] = body['data'].filter(element => !(element.hasOwnProperty('ad')));
    body = JSON.stringify(body);
    $done({body});
    // END
};

main().then();
