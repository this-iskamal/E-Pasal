const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const resp = await axios.put(
      "https://api.chatengine.io/users/",
      {
        username: username,
        secret: username,
        first_name: username,
      },
      {
        headers: {
          "private-key": "744bebec-09e1-4d7f-a30b-430874f03ef3",
        },
      }
    );
    return res.status(resp.status).json(resp.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
});

app.listen(3001,"192.168.0.110", () => {
  console.log("Server started on port 3001");
});
