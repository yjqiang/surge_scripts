import { $done } from "../../runtime/surge/public.js"
import { read_text_file } from "../../runtime/utils.js"

// 首页 -> 关注
const main = async() => {
    let $response = {
        body: read_text_file('../../requests_and_responses/responses/private/zhihu_moments_recommend.json')
    };

    // START
    let body = $response.body;
    body = body.replace(/("id")\s*:\s*(\d{15,})/g, "\$1:\"$2\"");  // 大整数会有精度损失
    body = JSON.parse(body);
    body['data'] = body['data'].filter(element => !(element.hasOwnProperty('ad')));
    $done({body: JSON.stringify(body)});
    // END
};

main().then();
