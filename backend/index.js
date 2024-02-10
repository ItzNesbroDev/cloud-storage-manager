const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/create_remote', (req, res) => {
  const { remote_name } = req.body;
  if (!remote_name) {
    return res.status(400).json({ error: 'Remote name not provided' });
  }

  exec(`rclone config create ${remote_name} drive`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing rclone command:', error);
      console.error('stderr:', stderr);
      return res.status(500).json({ error: 'An error occurred while creating the remote' });
    }

    console.log('stdout:', stdout);
    res.status(200).json({ message: `Remote "${remote_name}" created successfully` });
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
