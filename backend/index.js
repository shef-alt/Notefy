const express = require("express");
const sequelize = require("./config/database");
const Notes = require("./models/notes");
const Profile = require("./models/profile");
const Subject = require("./models/subject");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

sequelize
  .authenticate()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// Notes
app.get("/notes", async (req, res) => {
  try {
    const data = await Notes.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, note } = req.body;

    const newNote = await Notes.update({ title, note }, { where: { id } });

    res.json(newNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const newNote = await Notes.destroy({ where: { id } });

    res.json(newNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/notes", async (req, res) => {
  try {
    const { subject, noteDate } = req.body;

    const newNote = await Notes.create({
      subject,
      date: noteDate,
    });

    res.json(newNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Profiles
app.get("/profile", async (req, res) => {
  try {
    const data = await Profile.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, major } = req.body;

    const newProfile = await Profile.update({ name, major }, { where: { id } });

    res.json(newProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//subjects
app.get("/subject", async (req, res) => {
  try {
    const data = await Subject.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/subject", async (req, res) => {
  try {
    const { subject } = req.body;

    const newSubject = await Subject.create({
      subject,
    });

    res.json(newSubject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/subject:id", async (req, res) => {
  try {
    const { id } = req.params;

    const newSubject = await Subject.destroy({
      where: { id },
    });

    res.json(newSubject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on 3000"));
