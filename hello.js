addEventListener("fetch", (event) => {
  console.log(event);
  event.respondWith(
    new Response("Hello Moon", {
      headers: { "content-type": "text/plain" },
    })
  );
});
