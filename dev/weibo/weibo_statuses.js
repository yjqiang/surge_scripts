const { $done } = require("../../runtime/surge/public");
const { async_request, read_request_json_file } = require("../../runtime/utils");

const main = async() => {
    let request = read_request_json_file('../../requests_and_responses/requests/jsons/weibo/weibo_unread_hot_timeline.json');
    console.log(request);

    let $response = await async_request(request.method, request.url, request.data, request.headers);

    // START
    let body = $response.body;
    body = JSON.parse(body);

    // 过滤每条信息
    // promotion(推广) <=> mblogtypename: '广告'
    // promotion_info <=> timestamp_text: '推荐内容'
    body['statuses'] = body['statuses'].filter(element => !(element.hasOwnProperty('promotion') || element.hasOwnProperty('promotion_info')));

    body = JSON.stringify(body);
    $done({body});
    // END
};

main().then();
