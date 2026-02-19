export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = "https://cdn.videy.co" + url.pathname;

    const headers = new Headers(request.headers);

    // Spoof anti hotlink
    headers.set("Referer", "https://videy.co/");
    headers.set("Origin", "https://videy.co");
    headers.set("Host", "cdn.videy.co");

    const response = await fetch(target, {
      method: request.method,
      headers: headers,
      cf: {
        cacheEverything: true,
        cacheTtl: 86400
      }
    });

    const newHeaders = new Headers(response.headers);
    newHeaders.set("Access-Control-Allow-Origin", "*");
    newHeaders.set("Accept-Ranges", "bytes");

    return new Response(response.body, {
      status: response.status,
      headers: newHeaders
    });
  }
}
