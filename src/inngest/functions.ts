import { Sandbox } from "@e2b/code-interpreter"
import { openai as openai, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("anyblock-nextjs-test")
      return sandbox.sandboxId
    });



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

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000)
      return `https://${host}`
    });
    
    return { output, sandboxUrl }
  }
);
