import cors from "cors";
import express, { urlencoded, json } from "express";
import { router as api } from "./routes";

//Init server app
const app = express();

app.use(
  cors({
    exposedHeaders: ["Content-Disposition", "Content-Length"],
  })
);

//Constants
const PORT = Number(process.env.PORT) || 5000;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/api", api);

app.listen(PORT, () => {
  console.log("Listening on port: %s", PORT);
});
