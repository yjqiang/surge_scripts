let body = JSON.parse($response.body);
// 过滤每个 card 是否是广告
if (body['cards']) {  // 包括 body['cards'] 可能为 null 的情况
    body['cards'] = body['cards'].filter(element => !(element['card_type'] === 9 && element.hasOwnProperty('mblog') && element['mblog'].hasOwnProperty('promotion') && element['mblog']['promotion']['type'] === 'ad'));
    for (let card of body['cards']) {
        // 发现页的开头部分，有微博热搜关键词、卡片推荐等东西
        if (card['card_type'] === 11)
            for (let subcard of card['card_group'])
                // 卡片推荐
                if (subcard['card_type'] === 118) {
                    subcard['items'] = subcard['items'].filter(element => !(element['card_type'] === 119 && element['sub_item'] && element['sub_item'] && element['sub_item'][0].hasOwnProperty('promotion')));
                    for (let [index, item] of subcard['items'].entries())
                        if (item['card_type'] !== 119)
                            console.log(index, item);  // debug
                        else
                            item['itemid'] = `window_${index}`
                }
    }
}
$done({body: JSON.stringify(body)});
