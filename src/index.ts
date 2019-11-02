import * as express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server is running in http://localhost:${PORT}`);
});
