const axios = require("axios");

const serverUrl = "http://localhost:8080"; // Change to your server URL
const textToTranslate = "Hello, friend! What did you do today?";

axios
  .post(`${serverUrl}/translate`, { text: textToTranslate })
  .then((response) => {
    const translations = response.data.translations;

    if (translations && translations.length === 2) {
      console.log("Original Text: " + textToTranslate);
      console.log("Hindi Translation: " + translations[1].text);
      console.log(
        "Hindi Transliteration: " + translations[1].transliteration.text
      );
      console.log("Urdu Translation: " + translations[0].text);
      console.log(
        "Urdu Transliteration: " + translations[0].transliteration.text
      );
    } else {
      console.error("Translation data not found in the response.");
    }
  })
  .catch((error) => {
    console.error(error);
  });
