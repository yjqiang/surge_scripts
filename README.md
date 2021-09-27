# 又一个以去广告为主的 surge 脚本集合  
1. 本项目基于 lhie1 相关项目开发，特别感谢  
1. 本项目有简单的调试相关的环境，方便调试。但是有的请求比较复杂（可能需要携带 cookie 等）所以是直接操作 json 文件的，而这些数据是本人一些个人隐私数据，且发现不方便脱敏，故没有提交  
1. 本项目是我本人的一些正在使用的 app，故只支持**最新**的 app 版本  
1. [dev](dev) 是测试使用的文件夹，里面的每个脚本都拥有 `// START` 和 `// END`，用于指导 [convert_dev2scripts.py](convert_dev2scripts.py) 去生成真正用于 Surge 应用的 `js` 执行文件，生成的文件存放于 [scripts](scripts) 文件夹
1. [modules](modules) 文件夹里面是直接用于 Surge 应用的模块，作为**用户**只关心本文件夹即可 
1. [runtime](runtime) 文件夹里面是 Surge 自带 api 的模拟（例如 `$httpClient`）和其他开发需要的 api

   
## CURL 测试
1. [convert_surge_curl2json.py](convert_surge_curl2json.py) 可以把 [requests_and_responses/requests/curls](requests_and_responses/requests/curls) 里面 `curl` 文件转为 [requests_and_responses/requests/jsons](requests_and_responses/requests/jsons) 里面的 `json` 文件
1. 通过 [runtime/utils.ts](runtime/utils.ts) 的 `read_request_json_file` 函数可以读取此 `json` 文件，生成**请求所需要的数据**；再用 `async_request` 函数**模拟请求**
1. 例如 [dev/test/test.js](dev/test/test.js)

### 特别感谢
1. https://github.com/app2smile 大佬关于 protobuf 的相关工作让我受益匪浅