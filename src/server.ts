import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import "dotenv/config";
import express from "express";
import AppRouter from "./routes";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
const router = new AppRouter(app);
// Express configuration
app.set("port", process.env.PORT || 4200);

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.init();

const port = app.get("port");
// eslint-disable-next-line no-console
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
