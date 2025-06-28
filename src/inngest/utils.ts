import { Sandbox } from "@e2b/code-interpreter";
import { AgentResult, TextMessage } from "@inngest/agent-kit";

export async function getSandbox(sandboxId: string): Promise<Sandbox> {
  const sandbox = await Sandbox.connect(sandboxId);
  return sandbox;
}

export function lastAssitantTextMessageContent(result: AgentResult) {
  const lastAssistantTextMeessage = result.output.findLastIndex(
    (message) => message.role === "assistant"
  );

  const message = result.output[lastAssistantTextMeessage] as
    | TextMessage
    | undefined;
  
  return message?.content
   ? typeof message.content === "string"
     ? message.content
     : message.content.map((c) => c.text).join("") 
    : undefined;
}
