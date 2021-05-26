addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  console.log(request);
  console.log(new TextDecoder().decode(new Uint8Array(await request.arrayBuffer())));

  let response;
  switch (request.method) {
    case "GET":
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

  return response;
}

const PROPS = `
<?xml version="1.0" ?>
<d:multistatus 
  xmlns:a="urn:uuid:c2f41010-65b3-11d1-a29f-00aa00c14882/"
  xmlns:d="DAV:"
>
  <d:response>
    <d:href>https://install.deno.dev/dir/deno.exe</d:href>
    <d:propstat>
      <d:prop>
        <d:getcontentlength a:dt="int">1234</d:getcontentlength>
        <d:getcontenttype>application/binary</d:getcontenttype>
      </d:prop>
      <d:status>HTTP/1.1 200 OK</d:status>
    </d:propstat>
  </d:response>
</d:multistatus>
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
      "Cache-Control": `private`,
      "DAV": "1,2",
    },
  });
}
