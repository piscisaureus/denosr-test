addEventListener("fetch", (event) => {
  console.log(event.request);
  event.respondWith(
    new Response("Hello Moon", {
      headers: { "content-type": "text/plain" },
    })
  );
});
