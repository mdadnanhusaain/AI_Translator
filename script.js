let data;
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("translation-form");
  const resultDiv = document.getElementById("translation-result");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const sentenceInput = document.getElementById("sentence");
    const sentence = sentenceInput.value;

    try {
      const response = await fetch(
        "https://translator-bcs.azurewebsites.net/translate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: sentence }),
        }
      );

      if (!response.ok) {
        throw new Error("Translation request failed");
      }

      data = await response.json();
      const translations = data.translations;

      if (translations && translations.length > 0) {
        var lang = {
          hi: "Hindi",
          ur: "Urdu",
        };
        resultDiv.innerHTML = "<h2>Translations:</h2>";
        translations.forEach((translation, index) => {
          resultDiv.innerHTML += `<p>${lang[translation.to]} Text: ${
            translation.text
          }<br>${lang[translation.to]} Transliteration: ${
            translation.transliteration.text
          }</p>`;
        });
      } else {
        resultDiv.innerHTML = "<p>No translations available</p>";
      }
    } catch (error) {
      console.error(error);
      resultDiv.innerHTML = "<p>An error occurred</p>";
    }
  });
});
