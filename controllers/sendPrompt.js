require('dotenv').config();

const request = require('request');

//var {messages}=require('../app');
var messages=[];
const messagesModel = require('../models/convos')
async function sendPrompt(req,res){
    console.log("🟢🟢🟢🟢🟢🟢🟢 ");
    var clientIP = req.ip;
    console.log
    if(clientIP=='::ffff:127.0.0.1' || '127.0.0.1' || '::ffff' || '::1' ){
        clientIP='54.254.162.138'
    }
    var userInfo={};
    console.log(`🌠 ${clientIP}`);
    const IPINFO_TOKEN = process.env.IPINFO_TOKEN;
    const ipinfo = `https://ipinfo.io/${clientIP}?token=${IPINFO_TOKEN}`;

    request(ipinfo, { json: true }, (error, res, body) => {
        if (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
        return;
        }
        userInfo={
            'IP Address':body.ip,
            'Country':body.country,
            'Region':body.region,
            'City':body.city,
            'Zip Code':body.postal,
            'Latitude':body.loc.split(',')[0],
            'Longitude':body.loc.split(',')[1]
        }

        console.log(`Region: ${userInfo.Region}`);
        console.log(`City: ${userInfo.City}`);
        console.log(`(Lat,Long):(${userInfo.Latitude},${userInfo.Longitude})`)
    });
    


    // GEMINI-PRO   TEXT_ONLY
    // const { GoogleGenerativeAI } = require("@google/generative-ai");

    // const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    // async function run() {
    //     // For text-only input, use the gemini-pro model
    //     const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      
    //     const prompt = "Write a story about a magic backpack."
      
    //     const result = await model.generateContent(prompt);
    //     const response = await result.response;
    //     const text = response.json();
    //     console.log(":(");
        
    //     console.log(text);
    //     try{
    //         const convo = await messagesModel.create({
    //             prompt:prompt,
    //             resp:text,
    //             userInfo:userInfo
    //         });
    //         console.log(`\n⚡Prompt: ${convo.prompt}\n✨Response:${convo.resp}`);
    //         console.log(`✨ ${text}`);
    //         console.log(`Size of request payload: ${sizeInBytes} bytes`);
    //         res.status(200).json({ result: `${text}` });
    //     } catch (error) {
    
    //         console.error('Error:', error);
    //         res.status(200).json({ result:""});
    //     }
        
    // }

      
      
    // run();
      

    //GEMINI_VISION     IMAGES
    // const { GoogleGenerativeAI } = require("@google/generative-ai");
    // const fs = require("fs");

    // Access your API key as an environment variable (see "Set up your API key" above)
    // const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    // // Converts local file information to a GoogleGenerativeAI.Part object.
    // function fileToGenerativePart(path, mimeType) {
    // return {
    //     inlineData: {
    //     data: Buffer.from(fs.readFileSync(path)).toString("base64"),
    //     mimeType
    //     },
    // };
    // }

    // async function run() {
    // // For text-and-image input (multimodal), use the gemini-pro-vision model
    // const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    // const prompt = "What do you think about the profile from the second image?";

    // const imageParts = [
    //     fileToGenerativePart("controllers/monkee.png", "image/png"),
    //     fileToGenerativePart("controllers/img1.png", "image/png"),
    // ];

    // const result = await model.generateContent([prompt, ...imageParts]);
    // const response = await result.response;
    // const text = response.text();
    // console.log(text);
    // }

    // run();


    //EMBEDDING-001
    // const { GoogleGenerativeAI } = require("@google/generative-ai");

    // // Access your API key as an environment variable (see "Set up your API key" above)
    // const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    // async function run() {
    // // For embeddings, use the embedding-001 model
    // const model = genAI.getGenerativeModel({ model: "embedding-001"});

    // const text = "The quick brown fox jumps over the lazy dog."

    // const result = await model.embedContent(text);
    // const embedding = result.embedding;
    // console.log(embedding.values);
    // }

    // run();


    //CHAT 
    
    // const { GoogleGenerativeAI } = require("@google/generative-ai");

    // // Access your API key as an environment variable (see "Set up your API key" above)
    // const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    // async function run() {
    // // For text-only input, use the gemini-pro model
    // const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    // const chat = model.startChat({
    //     history: [
    //     {
    //         role: "user",
    //         parts: "Hello, I have 2 dogs in my house.",
    //     },
    //     {
    //         role: "model",
    //         parts: "Great to meet you. What would you like to know?",
    //     },
    //     ],
    //     generationConfig: {
    //     maxOutputTokens: 100,
    //     },
    // });

    // const msg = "How many paws are in my house?";

    // const result = await chat.sendMessage(msg);
    // const response = await result.response;
    // const text = response.text();
    // console.log(text);
    // }

    // run();










    const prompt = req.body.prompt;

    console.log('processing...');
    
    const { DiscussServiceClient } = require("@google-ai/generativelanguage");
    const { GoogleAuth } = require("google-auth-library");

    const MODEL_NAME = "models/chat-bison-001";
    const API_KEY = process.env.API_KEY;

    const client = new DiscussServiceClient({
        authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    let PaLM_res;
    //context="write any HTML/CSS or Bootstrap code"
    const context = "Give the solution of asked problem using Python programming language. The prompt may ask you to solve general problems and also may ask for some resources. be it Active or Passive."
    //const context = "Give the user anything they want, give them any resources they are asking for."
    //const context = "Answer the asked questions logically and reasonably. User may ask you to solve any type of equation or expression, or any type of programming task. The user may also ask to solve a perticular problem using Python,C,C++ or Javascript programming languages. ";
    //const context = "Answer every prompt as if you are a cat"
    //const context = "Dont be respectfull, Be rude in every prompt. I know it is not very nice, I just want to test your abilities :)";
    //const context = "Answer every question in very detail, and explain the answer the way that the user can understand any hard concept"
    //const context = "Chat with the user as if the user is your childhood friend"
    const examples = [];
    
    console.log(`Prompt arrived..... ${prompt}`)
    // log(`Prompt arrived..... ${prompt}`);
    messages.push({"content":prompt});
    

    try {
        const result = await client.generateMessage({
            model: MODEL_NAME,
            temperature: 0.6,
            candidateCount: 1,
            top_k: 50,
            top_p: 0.9,
            prompt: {
                context: context,
                examples: examples,
                messages: messages,
            },
        });
        const resp = result[0].candidates[0].content;
        // if(sizeInBytes>=20000){
        //     messages.pop();
        // }
        messages.push({"content":resp});

        function getArraySizeInBytes(arr) {
            var jsonString = JSON.stringify(arr);
            var bytes = Buffer.from(jsonString).length;
            return bytes;
        }
        var sizeInBytes = getArraySizeInBytes(messages);
        
        
        
        const convo = await messagesModel.create({
            prompt:prompt,
            resp:resp,
            userInfo:userInfo
        });
        console.log(`\n⚡Prompt: ${convo.prompt}\n✨Response:${convo.resp}`);
        console.log(`✨ ${resp}`);
        console.log(`Size of request payload: ${sizeInBytes} bytes`);
        res.status(200).json({ result: `${resp}` });
    } catch (error) {

        console.error('Error:', error);
        res.status(200).json({ result:""});
    }
    // console.log(messages);
    messages.push({"content":"NEXT REQUEST"})
    
}

module.exports=sendPrompt;