import { Fragment } from "@/db/schema";
import { ExternalLinkIcon, RefreshCwIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import { Hint } from "@/components/hint";

interface Props {
  fragment: Fragment;
}

export default function FragmentWeb({ fragment }: Props) {
  const [fragmentKey, setFragmentKey] = useState(nanoid());
  const [copied, setCopied] = useState(false);

  function handleExternalLinkClick(e: React.MouseEvent) {
    e.preventDefault();
    if (fragment.sandboxUrl) {
      window.open(fragment.sandboxUrl, "_blank");
    }
  }

  function handleRefreshClick(e: React.MouseEvent) {
    e.preventDefault();
    setFragmentKey(nanoid());
  }

  function handleCopyClick(e: React.MouseEvent) {
    e.preventDefault();
    navigator.clipboard.writeText(fragment.sandboxUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-2 border-b bg-sidebar flex items-center gap-x-2 ">
        <Hint text="Refresh" side="bottom" align="start">
          <Button size="sm" variant="outline" onClick={handleRefreshClick}>
            <RefreshCwIcon />
          </Button>
        </Hint>
        <Hint text="Click to copy URL" side="bottom" align="start">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyClick}
            className="flex-1 justify-start font-normal"
            disabled={!fragment.sandboxUrl || copied}
          >
            <span className="trucate">{fragment.sandboxUrl}</span>
          </Button>
        </Hint>
        <Hint text="Open in new tab" side="bottom" align="start">
          <Button
            size="sm"
            variant="outline"
            disabled={!fragment.sandboxUrl}
            className="ml-2"
            onClick={handleExternalLinkClick}
          >
            <ExternalLinkIcon />
          </Button>
        </Hint>
      </div>
      <iframe
        key={fragmentKey}
        className="h-full w-full"
        sandbox="allow-same-origin allow-scripts allow-forms"
        loading="lazy"
        src={fragment.sandboxUrl}
      />
    </div>
  );
}
