let body = JSON.parse($response.body);
if(body.hasOwnProperty('config')
    && body.config.hasOwnProperty('zhcnh_thread_sync')
    && body.config.zhcnh_thread_sync.ZHBackUpIP_Switch_Open === '1')
    body.config.zhcnh_thread_sync.ZHBackUpIP_Switch_Open = '0';
$done({body: JSON.stringify(body)});
