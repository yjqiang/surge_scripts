if ($response.body) {
    let body = {"advertisement_num":0,"advertisement_info":[]};
    $done({body: JSON.stringify(body)});
}
else{
    $done({});
}
