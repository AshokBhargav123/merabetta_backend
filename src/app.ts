import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import errorMiddleware from "./middleware/error.middleware";
import notFoundMiddleware from "./middleware/notFound.middleware";
import v1Routes from "./routes/v1";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Merabetta Backend API is running",
  });
});

app.use("/api/v1", v1Routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;