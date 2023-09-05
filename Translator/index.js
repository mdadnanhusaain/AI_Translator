const express = require("express");
const cors = require("cors"); // Import the cors middleware
const axios = require("axios").default;
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

const translateEndpoint = "https://api.cognitive.microsofttranslator.com";
const subscriptionKey = "684cef20447d496d88217116f3e50e3e";
const location = "centralindia";

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

app.post("/translate", async (req, res) => {
  try {
    const { text } = req.body;

    const translationResponse = await axios({
      baseURL: translateEndpoint,
      url: "/translate",
      method: "post",
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Ocp-Apim-Subscription-Region": location,
        "Content-type": "application/json",
        "X-ClientTraceId": uuidv4().toString(),
      },
      params: {
        "api-version": "3.0",
        to: ["ur", "hi"],
        toScript: ["latn", "latn"],
      },
      data: [
        {
          text: text,
        },
      ],
      responseType: "json",
    });

    const translations = translationResponse.data[0].translations;

    res.json({ translations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
