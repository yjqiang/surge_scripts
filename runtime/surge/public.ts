// null / object
const $done = (data: any = null): void => {
    console.log("$done:");
    if (data === null)
        console.log();
    else if (Object.keys(data).length === 0)
        console.log("->", "KEEP_UNTOUCHED");
    else
        console.log(data);
};


const $notification = {
    // string, string, string
    post: (title: string, subtitle: string, body: any): void => {
        console.log("$notification.log:");
        console.log("->", {
            title,
            subtitle,
            body
        });
    }
};

export { $done, $notification };