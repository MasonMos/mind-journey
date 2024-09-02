// import { NextResponse } from 'next/server'; // Import NextResponse from Next.js for handling responses
// import OpenAI from 'openai';

// const systemPrompt = 
// `
// Generate a 3 of mental health meditations / relation practices to help users improve their mental well-being. Each card should contain a mental health tip, mindfulness exercise, or self-care practice.
// `

// export async function POST(req) {
//   const openai = new OpenAI({
//     baseURL: "https://openrouter.ai/api/v1",
//     apiKey: process.env.OPENROUTER_API_KEY,
//   })
//   const data = await req.json()

// const completion = await openai.chat.completions.create({
//   messages: [
//     { role: "system", content: systemPrompt }, ...data
//   ],
//   model: "openai/gpt-3.5-turbo", // ai model being used
//   stream: true, // enables streaming responses
// });


// const stream = new ReadableStream({
//   async start(controller) {
//     const encoder = new TextEncoder(); // Create a TextEncoder to convert strings to Uint8Array
//     try {
//       // Iterate over the streamed chunks of the response
//       for await (const chunk of completion) {
//         const content = chunk.choices[0]?.delta?.content; // Extract the content from the chunk
//         if (content) {
//           const text = encoder.encode(content); // Encode the content to Uint8Array
//           controller.enqueue(text); // Enqueue the encoded text to the stream
//         }
//       }
//     } catch (err) {
//       controller.error(err); // Handle any errors that occur during streaming
//     } finally {
//       controller.close(); // Close the stream when done
//     }
//   },
// });
//   return new NextResponse(stream);
// }

import { NextResponse } from 'next/server'; 
import OpenAI from 'openai';

const systemPrompt = `
Generate 3 creative titles for meditation/relaxation cards that encourage mental well-being. Each card should contain a mental health tip, mindfulness exercise, or self-care practice.
`;

export async function POST(req) {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  try {
    const data = await req.json();
    console.log('Request Data:', data); // Log request data for debugging

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: data.prompt }, // Adjust based on your request structure
      ],
      model: "gpt-3.5-turbo",
      stream: false, // Disable streaming for simplicity
    });

    // Log completion response for debugging
    console.log('Completion Response:', completion);

    // Assuming completion.choices is an array with a text response
    const titles = completion.choices.map(choice => choice.message.content.trim());
    
    return NextResponse.json({ titles });
  } catch (error) {
    console.error('API Route Error:', error);
    return new NextResponse('Error processing request', { status: 500 });
  }
}

