addEventListener("fetch", (event) => {
  const { request } = event; 
  let response;
  switch (request.method) {
    case "PROPFIND":
      response = profind();
      break;
      
    default:
      console.log(request);
      response = new Response("Hello Moon", {
        headers: { "content-type": "text/plain" },
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
        <A:getcontenttype>application/binary</D:getcontenttype>
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
