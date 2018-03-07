const express = require("express");
const morgan = require("morgan");
const proxy = require("express-http-proxy");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const port = process.env.PORT || 3000;

app.get("/:id", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.use(
  "/sidebar/business/:id",
  proxy("http://localhost:3002/sidebar/business/:id", {
    proxyReqPathResolver: function(req) {
      return "http://localhost:3002/sidebar/business/" + req.params.id;
    }
  })
);
app.use(
  "/sidebar/postalCode/:code",
  proxy("http://localhost:3002/sidebar/postalCode/:code", {
    proxyReqPathResolver: function(req) {
      return "http://localhost:3002/sidebar/postalCode/" + req.params.code;
    }
  })
);
app.use(
  "/sidebar/businessTips/:id",
  proxy("http://localhost:3002/sidebar/businessTips/:id", {
    proxyReqPathResolver: function(req) {
      return "http://localhost:3002/sidebar/businessTips/" + req.params.id;
    }
  })
);

app.listen(3000, () => {
  console.log(`server running at: http://localhost:${port}`);
});
