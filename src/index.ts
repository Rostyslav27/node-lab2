import http from "http";
import { safeJSON } from "./utils";
import { URL } from "url";
import { router } from "./router";

type ContentTypeProccessor = (a: string) => { [key: string]: any };

const processedContentTypes: { [key: string]: ContentTypeProccessor } = {
  "text/html": (text: string) => ({ data: text }),
  "text/plain": (text: string) => ({ data: text }),
  "application/json": (json) => safeJSON(json, {}),
  "application/x-www-form-urlencoded": (data) =>
    Object.fromEntries(new URLSearchParams(data)),
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `https://${req.headers.host}`);
  const method = req.method || "GET";
  let payload: { [key: string]: any } = {};
  let rawRequest: string = "";
  for await (const chunk of req) {
    rawRequest += chunk;
  }

  if (req.headers["content-type"]) {
    const contentType = req.headers["content-type"].split(";")[0];
    if (processedContentTypes[contentType]) {
      payload = processedContentTypes[contentType](rawRequest);
    }
  }

  router.handle(method, url.pathname, { data: payload }, res);
});

server.on("clientError", (_err, socket) => {
  socket.end("HTTP/1.1 400 Bd Request\r\n\r\n");
});

server.listen(+(process.env.PORT || 8000));

process.on("SIGINT", () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
});
