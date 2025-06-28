import { openai as openai, createAgent } from "@inngest/agent-kit";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system: `
          You are an expert Next.js and React.js developer.
          Your responses must be only the requested code snippet, in the language specified in the prompt.
          Do not include explanations, comments, markdown formatting, or any extra text.
          Write clean, idiomatic, and production-ready code.
      `.trim(),
      tools: [],
      model: openai({ model: "gpt-4o" }),
    });

    const { output } = await codeAgent.run(
      `Write the following Next.JS code snippet:
      ${event.data.value}`
    );
    
    return { output }
  }
);
