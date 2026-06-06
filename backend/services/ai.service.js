const { GoogleGenAI } = require("@google/genai");

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const ai = new GoogleGenAI({
        apiKey: process.env.GOOGLE_GENAI_API_KEY
    })
    console.log("Generating interview report with resume:", resume, "selfDescription:", selfDescription, "jobDescription:", jobDescription);

    const prompt = `You are an expert technical interviewer and career coach.

Analyze the following candidate profile against the job description and generate a comprehensive interview preparation report.

Job Description: ${jobDescription}

Candidate Resume: ${resume}

Candidate Self Description: ${selfDescription}

Important Instructions:
- Technical questions MUST focus on technologies and skills required by the job description
- Skill gaps MUST identify what the job requires that the candidate is missing or weak in
- Preparation plan MUST help the candidate learn and bridge the skill gaps for this specific job
- Match score should honestly reflect alignment between candidate and job (can be low if gaps are significant)
- Even if match score is low, still generate relevant technical questions based on JD so candidate knows what to prepare
- Behavioral questions should be relevant to the role
- Title MUST be extracted from the job description
- Always generate at least 5 technical questions, 5 behavioral questions, these questions can be more than 5 if the job description is very broad and requires diverse skills
- Always generate a preparation plan based on the severity and number of skill gaps
- If skill gaps are low severity, generate a 3-5 day plan
- If skill gaps are medium severity, generate a 7-10 day plan  
- If skill gaps are high severity, generate a 14-21 day plan
- Plan should be practical and actionable, with specific tasks for each day that the candidate can follow to prepare effectively for the interview.
`

    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: "object",
            properties: {
                matchScore: { type: "number", description: "Score 0-100 matching candidate to job" },
                title: { type: "string", description: "Job title" },
                skillGaps: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            skill: { type: "string" },
                            severity: { type: "string", enum: ["low", "medium", "high"] }
                        }
                    }
                },
                technicalQuestions: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            question: { type: "string" },
                            intention: { type: "string" },
                            HowToAnswer: { type: "string" }
                        }
                    }
                },
                behavioralQuestions: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            question: { type: "string" },
                            intention: { type: "string" },
                            HowToAnswer: { type: "string" }
                        }
                    }
                },
                preparationPlan: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            day: { type: "number" },
                            focus: { type: "string" },
                            tasks: { type: "array", items: { type: "string" } }
                        }
                    }
                }
            }
        }
    }
})

return JSON.parse(response.text)
}

module.exports = {
    generateInterviewReport
}   
