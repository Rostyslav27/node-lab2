import http from "http";

const server = http.createServer(async (req, res) => {
  res.end("Hello world");
});

server.on("clientError", (err, socket) => {
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
