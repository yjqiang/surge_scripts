import { $done } from "../../runtime/surge/public.js"
import { async_request, read_request_json_file } from "../../runtime/utils.js"

const main = async() => {
    let request = read_request_json_file('../../requests_and_responses/requests/jsons/weibo/weibo_sdkad.json');
    // console.log(request);

    let $response = await async_request(request.method, request.url, request.data, request.headers);
    console.log($response);

    // START
    let body = JSON.parse($response.body.match(/({.*})OK/)[1]);  // $response.body： {json..,}OK

    body['ads'] = [];

    $done({body: `${JSON.stringify(body)}OK`});
    // END
};

main().then();
