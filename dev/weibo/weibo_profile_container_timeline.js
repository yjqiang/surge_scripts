import { $done } from "../../runtime/surge/others.js"
import {read_text_file} from "../../runtime/utils.js"

const main = async() => {
    let $response = {
        body: read_text_file('../../requests_and_responses/responses/private/weibo_profile_container_timeline.json')
    };

    // START
    let body = JSON.parse($response.body);

    // console.log(body["items"].length);

    body["items"] = body["items"].filter(element =>
                !(element.hasOwnProperty('data') && element['data'].hasOwnProperty('promotion') && element['data']['promotion']['type'] === 'ad'));

    // console.log(body["items"].length);


    $done({body: JSON.stringify(body)});
    // END
};

main().then();
