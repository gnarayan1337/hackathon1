//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
const express = require("express");
const { OpenAI } = require("openai");
const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY ||
    "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",
});

app.use(express.static(__dirname));
app.use(express.json());

app.post("/getResources", async (req, res) => {
  const { subject, method, difficulty, language } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `Find five free online learning resources for ${subject} suitable for someone who prefers to learn through ${method} at a ${difficulty} level in ${language}. For textbooks include links for the website of the textbook. For youtube videos include channel links that cover those topics. For podcasts include podcast links. ONLY include what medium I want to learn through. Each resource should be 100% free, include a very short explanatory sentence at the end, and the link should be very basic.`,
        },
      ],
      model: "gpt-4-1106-preview",
    });

    const formattedHtml = formatResponseAsHtml(
      completion.choices[0].message.content
    );
    res.json({ html: formattedHtml });
  } catch (error) {
    console.error("Error in fetching resources from OpenAI:", error);
    res.status(500).send("Error in fetching resources");
  }
});

function formatResponseAsHtml(responseText) {
  let listItems = responseText.split(/\d\./).slice(1);
  let formattedHtml = "<ul>";

  listItems.forEach((item) => {
    let formattedItem = item.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank">$1</a>'
    );
    formattedHtml += `<li>${formattedItem.trim()}</li>`;
  });

  formattedHtml += "</ul>";
  return formattedHtml;
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
