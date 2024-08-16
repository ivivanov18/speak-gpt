const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const OpenAIApi = require("openai").default;

if (process.env["OPENAI_API_KEY"] == undefined) {
    throw new Error("API_KEY is not set");
}

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/data", async (req, res) => {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: message,
            },
        ],
    });

    res.send(completion.choices[0].message);
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
