require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.get("/", (req, res) => {
  res.send("JD Builder API Running (Groq)");
});

app.post("/generate-jd", async (req, res) => {
  try {
    const { title, skills, experience, prompt } = req.body;

    let finalPrompt = "";

    if (prompt && prompt.trim()) {
      finalPrompt = `
Create a professional ATS-friendly Job Description based on the following:

${prompt}

Include:
1. Job Summary
2. Responsibilities
3. Required Skills
4. Qualifications
5. Benefits
`;
    } else {
      finalPrompt = `
Create a professional ATS-friendly Job Description.

Job Title: ${title}
Skills: ${skills}
Experience: ${experience}

Include:
1. Job Summary
2. Responsibilities
3. Required Skills
4. Qualifications
5. Benefits
`;
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: finalPrompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1500,
    });

    res.json({
      jd: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("GROQ ERROR:", error);

    res.status(500).json({
      message: "Error generating JD",
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});