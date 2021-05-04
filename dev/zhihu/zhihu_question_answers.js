const { $done } = require("../../runtime/surge/public");
const { read_text_file } = require("../../runtime/utils");

// 某问题页面
const main = async() => {
    let $response = {
        body: read_text_file('../private/zhihu_question_answers1.json')
    };

    // START
    let body = $response.body;
    body=JSON.parse(body);
    delete body['ad_info'];
    body['data'] = body['data'].filter(element => !(element['author']['name'] === "盐选推荐" || element['author']['name'] === "盐选科普"));
    console.log(body['data']);
    body=JSON.stringify(body);
    $done({body});
    // END
};

main().then();
