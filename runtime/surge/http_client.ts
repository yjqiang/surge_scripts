import {async_request} from "../utils";
import {Method} from "got";

const request_with_callback = (method: Method, url: string, func: Function): void => {
    async_request(method, url)
        .then(rsp => {func(null, {status: rsp.status, headers: rsp.headers}, rsp.body);})
}

const $httpClient = {
    get: (url: string, func: Function): void => {
        request_with_callback("get", url, func);
    },
    post: (url: string, func: Function): void => {
        request_with_callback("post", url, func);
    }
};

export { $httpClient };