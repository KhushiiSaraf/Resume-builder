const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

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
