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
Generate 3 mental health meditations/relaxation practices to help users improve their mental well-being. Each card should contain a mental health tip, mindfulness exercise, or self-care practice.
`;

export async function POST(req) {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  try {
    const data = await req.json();

    // Log incoming request data for debugging
    console.log('Request Data:', data);

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt }, 
        ...data.messages // Ensure this is properly structured
      ],
      model: "openai/gpt-3.5-turbo",
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              const text = encoder.encode(content);
              controller.enqueue(text);
            }
          }
        } catch (err) {
          console.error('Streaming Error:', err);
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(stream);
  } catch (error) {
    console.error('API Route Error:', error);
    return new NextResponse('Error processing request', { status: 500 });
  }
}
