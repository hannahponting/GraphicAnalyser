import OpenAI from "openai";

export default async function sendRequest(base64Image: string) {

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: [
        {
            role: "system",
            content: "You are a helpful assistant that checks images for any mistakes"
        },
            {
            role: "user",
            content: [
                { type: "input_text", text: "There is text on the image. Is it spelt correctly, grammatically correct and sound the best it could? Offer a better way of phrasing the writing if not. Boxers names need to be spelt right and any facts writen about the boxer/boxers need to be right"
                },
                {type: "input_image",
                image_url: `data:image/jpeg;base64,${base64Image}`,
                detail: "auto"
                },
            ],
        },
    ],
});
return(response.output_text)
}