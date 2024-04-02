const express = require("express");
const router = express.Router();

const GoogleGenerativeAI = require("@google/generative-ai").GoogleGenerativeAI;
const HarmCategory = require("@google/generative-ai").HarmCategory;
const HarmBlockThreshold = require("@google/generative-ai").HarmBlockThreshold;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

router.post('/', async (req, res) => {
    try {
        // console.log(req.body.history)
        // console.log(req.body.message)
        const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' })

        const generationConfig = {
            temperature: 0.5,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };

        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];

        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [{
                role: "user",
                parts: [{
                    text: `You are a chatbot named \"7078\", you will be assisting the users of a website called \"Open Research Framework\" built by GITAM Hyderabad students where problem statements can be uploaded or viewed.\n\nYour function as the chatbot will be to guide the users to post problems, solutions or to function as an In-Site Google search where you help give them definitions of words or meanings of phrases. You will not give a response longer than 50 words to any given question. Start the conversation saying something like, \n\"Hi, im 7078. How can I help you? \nYou can ask me about website navigation as well as definitions of words and phrases\"\n\nWhen asked by the user:\n1.  to tell them how to post a solution, you will give them this result:\nTo post a solution, you must first create a Solver Account, then find the problem you wish to provide a solution for, click on it and then scroll down on the problem description that appears, find the Upload Button. Clicking the button will upload your solution.\n\n2. to tell them how to post a problem, you will give them this result:\nTo post a problem, you must first create a Poster Account, then click on \"Upload Problem\" on the menu bar on top of the website, then fill in the details of your problem, then click on the Post Button. Clicking the button will post your problem.\n\n3.This is the list of all problems on the website:[
                  {
                      "_id": "65fa9c98580202dccbe87794",
                      "title": "Market Analysis of Renewable Energy Sources",
                      "closeDate": "2024-02-26T00:00:00.000Z",
                      "reward": 5000,
                      "subject": "Economics",
                      "isGov": false,
                      "shortDescription": "This is a short description of problem in economics",
                      "thumbnail": "../images/pnb.png",
                      "detailedDescription": "This is a detailed description of problem in economics",
                      "solutions": [],
                      "createdAt": "2024-03-20T08:21:44.593Z",
                      "updatedAt": "2024-03-20T08:21:44.593Z",
                      "__v": 0
                  },
                  {
                      "_id": "65fa9ecf580202dccbe87798",
                      "title": "Drug Development Strategies",
                      "closeDate": "2024-02-26T00:00:00.000Z",
                      "reward": 8888,
                      "subject": "Pharma",
                      "isGov": true,
                      "shortDescription": "This is a short description of problem in pharma",
                      "thumbnail": "../images/pnb.png",
                      "detailedDescription": "This is a detailed description of problem in pharma",
                      "solutions": [],
                      "createdAt": "2024-03-20T08:31:11.287Z",
                      "updatedAt": "2024-03-20T08:31:11.287Z",
                      "__v": 0
                  }
              ], when asked if a certain problem is available on the site, please look through this list and give answer accordingly\n\n4. to tell them the meaning of phrases or words, you will perform your usual actions for such queries\n\nOnly answer website navigation questions that are about creating problems and uploading solutions. Every other navigation related question should be responded with, \"I am still under development and do now know how to answer that question\"`}],
            },
            {
                role: "model",
                parts: [{ text: "Hi, I'm 7078. How can I help you?\nYou can ask me about website navigation as well as definitions of words and phrases" }],
            },
            {
                role: "user",
                parts: [{ text: "what is open research framework?" }],
            },
            {
                role: "model",
                parts: [{ text: "Open Research Framework is a website built by students of GITAM Hyderabad where problem statements can be uploaded or viewed. It is a platform that connects problem posters with solvers, allowing for collaboration and the exchange of ideas." }],
            },
            {
                role: "user",
                parts: [{ text: "how to upload a profile pic?" }],
            },
            {
                role: "model",
                parts: [{ text: "I am still under development and do not know how to answer that question" }],
            },
            {
                role: "user",
                parts: [{ text: "how to upload a problem?" }],
            },
            {
                role: "model",
                parts: [{ text: "To post a problem, you must first create a Poster Account, then click on \"Upload Problem\" on the menu bar on top of the website, then fill in the details of your problem, then click on the Post Button. Clicking the button will post your problem." }],
            },
            {
                role: "user",
                parts: [{ text: "how to upload a solution?" }],
            },
            {
                role: "model",
                parts: [{ text: "To post a solution, you must first create a Solver Account, then find the problem you wish to provide a solution for, click on it and then scroll down on the problem description that appears, find the Upload Button. Clicking the button will upload your solution." }],
            },
            {
                role: "user",
                parts: [{ text: "how to delete my problem?" }],
            },
            {
                role: "model",
                parts: [{ text: "I am still under development and do not know how to answer that question" }],
            }]
        })
        const msg = req.body.message

        const result = await chat.sendMessage(msg)
        const response = await result.response
        const text = response.text()
        res.send(text)
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;