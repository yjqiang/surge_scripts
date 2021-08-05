import { $done } from "../../runtime/surge/public.js"
import { read_text_file } from "../../runtime/utils.js"

const main = async() => {
    let $response = {
        body: read_text_file('../../requests_and_responses/responses/private/weibo_comment.json')
    };

    // START
    let body = JSON.parse($response.body);

    // 过滤评论（评论中嵌套的回复详情界面也会用这个 api，但那里没有 datas）
    // adType: '推荐/广告', type: 1
    if (body.hasOwnProperty('datas'))
        body['datas'] = body['datas'].filter(element => !(element['type'] === 1));

    $done({body: JSON.stringify(body)});
    // END
};

main().then();
