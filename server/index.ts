import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Server } from "socket.io";
import "dotenv/config";
import { convertMdToHtml } from "./utils/converter";

const PORT = process.env.PORT ?? 1337;
const app: Express = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to mark down editor server");
});

const server = app.listen(PORT, () => {
  console.log(`markdown-editor server started at ${PORT}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("markdown", ({ markdownText }) => {
    let html = convertMdToHtml(markdownText);
    socket.emit("htmlRes", { html });
  });
});
