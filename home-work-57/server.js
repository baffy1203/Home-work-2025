import http from "node:http";
import fs from "node:fs";
import { homePage, aboutPage, contactPage, notFoundPage } from "./pages.js";

const PORT = 3000;

const server = http.createServer((request, response) => {
  console.log("Request received. Url:", request.url);
  if (request.url === "/style.css") {
    fs.readFile("./style.css", (err, data) => {
      if (err) {
        response.statusCode = 404;
        response.end();
        return;
      }
  
      response.statusCode = 200;
  
      response.setHeader(
        "Content-Type",
        "text/css"
      );
  
      response.end(data);
    });
  
    return;
  }
  response.setHeader("X-Content-Type-Options", "nosniff");

  if (request.url === "/") {
    response.statusCode = 200;

    response.setHeader("Content-Type", "text/html; charset=utf-8");

    response.setHeader("Content-Length", Buffer.byteLength(homePage));

    response.write(homePage);
    response.end();

    return;
  }

  if (request.url === "/about") {
    response.statusCode = 200;

    response.setHeader("Content-Type", "text/html; charset=utf-8");

    response.setHeader("Content-Length", Buffer.byteLength(aboutPage));

    response.write(aboutPage);
    response.end();

    return;
  }

  if (request.url === "/contact") {
    response.statusCode = 200;

    response.setHeader("Content-Type", "text/html; charset=utf-8");

    response.setHeader("Content-Length", Buffer.byteLength(contactPage));

    response.write(contactPage);
    response.end();

    return;
  }

  response.statusCode = 404;

  response.setHeader("Content-Type", "text/html; charset=utf-8");

  response.setHeader("Content-Length", Buffer.byteLength(notFoundPage));

  response.write(notFoundPage);
  response.end();
});

server.listen(PORT, () => {
  console.log(`Server started. Listening on port ${PORT}`);
});

process.on("SIGINT", () => {
  console.log("\nShutting down the server");

  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
