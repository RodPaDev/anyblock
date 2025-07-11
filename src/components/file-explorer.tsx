import { CopyCheckIcon, CopyIcon } from "lucide-react";
import {
  useState,
  useMemo,
  useCallback,
  Fragment as ReactFragment,
} from "react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { CodeView } from "@/components/code-view";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { Fragment } from "@/db/schema";
import { convertFilesToTreeItems } from "@/lib/tree-item";
import { TreeView } from "./tree-view";

type FileCollection = Fragment["files"];

function getFirstFilePath(files: FileCollection): string | null {
  const list = Object.keys(files);
  return list.length > 0 ? list[0] : null;
}

function getLanguageFromExtension(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase();
  return extension || "text";
}

interface FileExplorerProps {
  files: FileCollection;
}

export function FileExplorer({ files }: FileExplorerProps) {
  const [copied, setCopied] = useState(false);
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(
    getFirstFilePath(files)
  );

  const treeItems = useMemo(() => {
    return convertFilesToTreeItems(files);
  }, [files]);

  const handleFileSelect = useCallback(
    (filePath: string) => {
      if (filePath in files) {
        setSelectedFilePath(filePath);
      }
    },
    [files]
  );

  function handleCopyClick(e: React.MouseEvent) {
    e.preventDefault();
    if (!selectedFilePath || !files[selectedFilePath]) return;

    navigator.clipboard.writeText(files[selectedFilePath]);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={30} minSize={30} className="bg-sidebar">
        <TreeView
          files={treeItems}
          selectedFilePath={selectedFilePath}
          onSelectFile={handleFileSelect}
        />
      </ResizablePanel>
      <ResizableHandle className="hover:bg-primary transition-colors" />
      <ResizablePanel defaultSize={70} minSize={50}>
        {selectedFilePath && files[selectedFilePath] ? (
          <div className="h-full w-full flex flex-col">
            <div className="border-b bg-sidebar px-4 py-2 flex justify-between items-center gap-x-2">
              <FileBreadcrumb filePath={selectedFilePath} />
              <Hint text="Copy file content" side="bottom">
                <Button
                  variant={copied ? "default" : "outline"}
                  size="icon"
                  className="ml-auto"
                  onClick={handleCopyClick}
                  disabled={false}
                >
                  {copied ? (
                    <CopyCheckIcon className="text-green-500" />
                  ) : (
                    <CopyIcon className="text-muted-foreground" />
                  )}
                </Button>
              </Hint>
            </div>
            <div className="flex-1 overflow-auto">
              <CodeView
                code={files[selectedFilePath]}
                lang={getLanguageFromExtension(selectedFilePath)}
              />
            </div>
          </div>
        ) : (
          <p className="flex h-full items-center justify-center text-muted-foreground">
            Select a file to view it&apos;s contents
          </p>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

interface FileBreadcrumbProps {
  filePath: string;
}

function FileBreadcrumb({ filePath }: FileBreadcrumbProps) {
  const pathSegments = filePath.split("/").filter(Boolean);
  const maxSegments = 4;

  const renderBreadcrumbItem = () => {
    if (pathSegments.length <= maxSegments) {
      return pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;

        return (
          <ReactFragment key={index}>
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage className="font-medium">
                  {segment}
                </BreadcrumbPage>
              ) : (
                <span className="text-muted-foreground">{segment}</span>
              )}
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator />}
          </ReactFragment>
        );
      });
    }

    const firstSegment = pathSegments[0];
    const lastSegment = pathSegments.at(-1);

    return (
      <ReactFragment>
        <BreadcrumbItem>
          <span className="text-muted-foreground">{firstSegment}</span>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">
              {lastSegment}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbItem>
      </ReactFragment>
    );
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>{renderBreadcrumbItem()}</BreadcrumbList>
    </Breadcrumb>
  );
}
