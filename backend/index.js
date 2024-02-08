const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();

// Enable CORS for all routes
app.use(cors());

app.get("/listFiles", (req, res) => {
  const drive = req.query.drive;
  if (!drive) {
    res.status(400).send("Missing drive parameter");
    return;
  }

  let command;
  switch (drive) {
    case "gdrive":
      command = "rclone ls gdrive:";
      break;
    case "onedrive":
      command = "rclone ls onedrive:";
      break;
    default:
      res
        .status(400)
        .send("Please check if there is gdrive or onedrive on rclone remote");
      return;
  }

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${err.message}`);
      res.status(500).send("Internal Server Error");
      return;
    }
    if (stderr) {
      console.error(`Rclone Error: ${stderr}`);
      res.status(500).send("Internal Server Error");
      return;
    }
    const files = stdout
      .split("\n")
      .map((file) => file.trim()) // Remove leading and trailing whitespaces
      .filter((file) => file !== "") // Filter out empty lines
      .map((file) => file.replace(/^\s*\d+\s*/, "")); // Remove leading numbers and spaces
    res.json(files);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
