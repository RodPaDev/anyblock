import { Sandbox } from "@e2b/code-interpreter";

export async function getSandbox(sandboxId: string): Promise<Sandbox> {
  const sandbox = await Sandbox.connect(sandboxId);
  return sandbox;
}