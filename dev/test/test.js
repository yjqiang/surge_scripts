const { async_request, read_request_json_file } = require("../../runtime/utils");

// “首页”的推荐
const main = async() => {
    let request = read_request_json_file('../../requests_and_responses/requests/jsons/test/test.json.example');
    console.log(request);

    let response = await async_request(request.method, request.url, request.data, request.headers);
    console.log(JSON.parse(response.body)['data']['guard_resources']);


};

main().then();
