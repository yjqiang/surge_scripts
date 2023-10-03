import { $done } from "../../runtime/surge/others.js"
import { read_text_file } from "../../runtime/utils.js"

// 某问题页面
const main = async() => {
    let $response = {
        body: read_text_file('../../requests_and_responses/responses/private/zhihu_question_feeds.json')
    };

    // START
    let body = JSON.parse($response.body);
    delete body['ad_info'];
    body['data'] = body['data'].filter(element => !(["盐选推荐", "盐选科普", "盐选生活馆"].includes(element['target']['author']['name'])));
    $done({body: JSON.stringify(body)});
    // END
};

main().then();




