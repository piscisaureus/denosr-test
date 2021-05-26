addEventListener("fetch", (event) => {
  const { request } = event; 
  console.log(request);
  console.log(await request.body().text());

  let response;
  switch (request.method) {
    case "PROPFIND":
      response = propfind();
      break;
     case "OPTIONS":
      response = options();
      break;
      
    default:
      response = new Response("Hello Moon", {
        headers: { "Content-Type": "text/plain" },
      })
  }
  
  event.respondWith(response);
});

const PROPS = `
<?xml version="1.0" ?>
<D:multistatus xmlns:D="DAV:">
  <D:response>
    <D:href>/deno.exe</D:href>
    <D:propstat>
      <D:prop>
        <D:getcontenttype>application/binary</D:getcontenttype>
        <D:creationdate>2021-05-26T11:22:33.444Z</D:creationdate>
        <D:resourcetype />
      </D:prop>
      <D:status>HTTP/1.1 200 OK</D:status>
    </D:propstat>
    </D:response>
</D:multistatus>
`.trim();

function propfind() {
  return new Response(PROPS, {
    status: 207,
    statusText: "Multi-Status",
    headers: {
      "content-type": `text/xml`,
    },
  });
}

function options() {
  return new Response(null, {
    status: 204,
    statusText: "No Content",
    headers: {
      "Allow": "OPTIONS, GET, HEAD, PROPFIND",
      "Cache-Control": `no-cache`,
    },
  });
}
