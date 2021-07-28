const { $done } = require("../../runtime/surge/public");
const { read_text_file } = require("../../runtime/utils");

const main = async() => {
    let $response = {
        body: read_text_file('../../requests_and_responses/responses/private/weibo_statuses_extend1.json')
    };

    // START
    let body = JSON.parse($response.body);

    if (body.hasOwnProperty('trend'))
        delete body['trend'];

    $done({body: JSON.stringify(body)});
    // END
};

main().then();
