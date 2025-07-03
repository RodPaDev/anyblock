import { db } from "@/db";
import { fragmentsTable, messageTable } from "@/db/schema";
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

export const createMessageWithFragment = async (projectId: string, messageData: {
  content: string;
  role: "user" | "assistant";
  type: "result" | "error";
  fragment: {
    sandboxUrl: string;
    title: string;
    files?: any;
  };
}) => {
  // Insert the message first
  const [message] = await db
    .insert(messageTable)
    .values({
      projectId,
      content: messageData.content,
      role: messageData.role,
      type: messageData.type,
    })
    .returning();

  // Insert the related fragment
  const [fragment] = await db
    .insert(fragmentsTable)
    .values({
      messageId: message.id,
      sandboxUrl: messageData.fragment.sandboxUrl,
      title: messageData.fragment.title,
      files: messageData.fragment.files,
    })
    .returning();

  return { message, fragment };
};
