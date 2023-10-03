import { $done } from "../../runtime/surge/others.js"
import { read_text_file } from "../../runtime/utils.js"

// 某问题页面
const main = async() => {
    let $response = {
        body: read_text_file('../../requests_and_responses/responses/private/zhihu_question_answers1.json')
    };

    // START
    let body = JSON.parse($response.body);
    delete body['ad_info'];
    body['data'] = body['data'].filter(element => !(element['author']['name'] === "盐选推荐" || element['author']['name'] === "盐选科普"));
    $done({body: JSON.stringify(body)});
    // END
};

main().then();
