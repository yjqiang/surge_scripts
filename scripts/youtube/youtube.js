let url = $request.url.replace(/ctier=[^A]/, "ctier=A");
$done({ response: { status: 302, headers: { Location: url } } });
