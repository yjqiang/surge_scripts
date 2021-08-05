import { $done } from "../../runtime/surge/public.js"

// 视频广告
const main = async() => {
    let $request = {
        url: 'https://r2---sn-npoeenle.googlevideo.com/videoplayback?**ms=au,rdu&mv=m&mvi=2&pl=25&ctier=L&initcwndbps=513750&vprv=1&mime=audio/mp4**'
    };

    // START
    let url = $request.url.replace(/ctier=[^A]/, "ctier=A");
    $done({ response: { status: 302, headers: { Location: url } } });
    // END
};

main().then();
