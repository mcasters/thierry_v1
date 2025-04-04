const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use("/images", express.static(process.env.PHOTOS_PATH));
  server.use((req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log(
      `> Ready on http://localhost:3000 as ${
        dev ? "development" : process.env.NODE_ENV
      }`,
    );
  });
});
