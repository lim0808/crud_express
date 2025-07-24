const express = require("express");
const cors = require("cors");
const router = require("./router/indexRouter");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false })); //?action=?
app.use(express.json()); // {action:?}
app.use(cors());

app.use("/", router);

app.use((req, res) => {
  res.status(404).send("Error");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
