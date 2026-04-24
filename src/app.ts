import express from 'express';
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/error-handler.js";
import cookieParser from "cookie-parser";

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
