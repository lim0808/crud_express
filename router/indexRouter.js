const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
const db = require("../db/db");

router.post("/create", async (req, res) => {
  const { name, email, gender } = req.body;

  if (!name || !email) {
    return res
      .status(400)
      .json({ success: false, error: "Missing name or email" });
  }

  const dateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

  try {
    const [result] = await db.query(
      "INSERT INTO user (name, email, gender, createtime) VALUES (?, ?, ?, ?)",
      [name, email, gender, dateTime]
    );

    if (result.affectedRows === 1) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "Insert failed" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

router.post("/update", async (req, res) => {
  const { name, email, id, gender } = req.body;
   const dateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

  if (!name || !email || !id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const [result] = await db.query(
      "UPDATE user SET name = ?, email = ?,gender=?, updatetime = ? WHERE id = ?",
      [name, email, gender,dateTime, id]
    );

    if (result.affectedRows === 1) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "No record updated" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

router.post("/delete", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing user ID" });
  }

  try {
    const [result] = await db.query("DELETE FROM user WHERE id = ?", [id]);

    if (result.affectedRows === 1) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "No record deleted" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

router.get("/read", async (req, res) => {
  try {
    const [stat] = await db.query(
      "SELECT COUNT(*) AS total, COUNT(CASE WHEN gender = 'male' THEN 1 END) AS male, COUNT(CASE WHEN gender = 'female' THEN 1 END) AS female FROM user"
    );
    // SUM(gender = 'female') AS female
    const [users] = await db.query("SELECT * FROM user");

    const formattedUsers = users.map((user) => ({
      ...user,
      createtime: dayjs(user.createtime).format("YYYY-MM-DD HH:mm:ss"),
    }));

    if (users.length > 0) {
      res
        .status(200)
        .json({ success: true, stats: stat[0], data: formattedUsers });
    } else {
      res.status(400).json({ success: false, message: "No record" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

module.exports = router;
