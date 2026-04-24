import express from 'express';
import cors from "cors";
import routes from "./routes/index.js";

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
