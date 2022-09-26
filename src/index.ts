import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { pagination } from "typeorm-pagination";
import myDataSource from "./app-data-source";
import Middleware from "./middlewares/Middleware";

const app = express();
app.use(Middleware.requestLogs);

//Import routes files
import userRoutes from "./routes/user.routes";
import roleRoutes from "./routes/role.routes";
import { RequestError } from "./types/types";

dotenv.config();

const PORT = process.env.PORT || 3001;

// create and setup express app
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "10mb" }));
app.use(pagination);

//Routes are mention here
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);

app.use(
  (err: RequestError, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res
      .status(err.code || 500)
      .json({ name: err.name, message: err.message, stack: err.stack });
  }
);

// start express server
myDataSource
  .initialize()
  .then(async () => {
    app.listen(PORT, async () => {
      console.log(`CONNECTED TO DB AND SERVER STARTED ON PORT - ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
