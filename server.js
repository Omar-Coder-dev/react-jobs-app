const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("src/jobs.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// Vercel needs this line to export the server instance
module.exports = server;
