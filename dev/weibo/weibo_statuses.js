import { $done } from "../../runtime/surge/public.js"
import { async_request, read_request_json_file } from "../../runtime/utils.js"

const main = async() => {
    let request = read_request_json_file('../../requests_and_responses/requests/jsons/weibo/weibo_video_tiny_stream_video_list.json');
    console.log(request);

    let $response = await async_request(request.method, request.url, request.data, request.headers);

    // START
    let body = JSON.parse($response.body);

    // 过滤每条信息
    // promotion(推广) <=> mblogtypename: '广告'
    // promotion_info <=> timestamp_text: '推荐内容'
    body['statuses'] = body['statuses'].filter(element => !(element.hasOwnProperty('promotion') || element.hasOwnProperty('promotion_info')));

    $done({body: JSON.stringify(body)});
    // END
};

main().then();
