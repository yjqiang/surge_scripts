const { $done } = require("../../runtime/surge/public");
const { read_text_file } = require("../../runtime/utils");

const main = async() => {
    let $response = {
        body: read_text_file('../../requests_and_responses/responses/private/weibo_comment.json')
    };

    // START
    let body = $response.body;
    body = JSON.parse(body);

    // 过滤评论
    // adType: '推荐/广告', type: 1
    body['datas'] = body['datas'].filter(element => !(element['type'] === 1));

    body = JSON.stringify(body);
    $done({body});
    // END
};

main().then();
