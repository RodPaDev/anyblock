import { TreeItem } from "@/lib/tree-item";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { Collapsible } from "@radix-ui/react-collapsible";
import { CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { cn } from "@/lib/utils";
import { da } from "date-fns/locale";

const normalClasses =
  "data-[active=true]:bg-primary/20 data-[active=true]:hover:bg-primary/30 data-[active=true]:cursor-default ";
const darkClasses =
  "data-[active=true]:dark:bg-muted data-[active=true]:hover:bg-muted/30 data-[active=true]:dark:text-white/80 dark:hover:bg-muted dark:hover:text-muted-foreground";

interface TreeViewProps {
  files: TreeItem[];
  selectedFilePath: string | null;
  onSelectFile: (filePath: string) => void;
}

export function TreeView({
  files,
  selectedFilePath,
  onSelectFile,
}: TreeViewProps) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="none" className="w-full">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {files.map((item, index) => (
                  <Tree
                    key={index}
                    item={item}
                    selectedValue={selectedFilePath}
                    onSelect={onSelectFile}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
}

interface TreeProps {
  item: TreeItem;
  selectedValue: string | null;
  onSelect: (value: string) => void;
  parentPath?: string;
}

function Tree({ item, selectedValue, onSelect, parentPath = "" }: TreeProps) {
  const [name, ...items] = Array.isArray(item) ? item : [item];
  const currentPath = parentPath ? `${parentPath}/${name}` : name;

  if (!items.length) {
    // it's a file
    const isSelected = currentPath === selectedValue;
    return (
      <SidebarMenuButton
        isActive={isSelected}
        className={cn(darkClasses, normalClasses)}
        onClick={() => onSelect(currentPath)}
      >
        <FileIcon />
        <span className="truncate">{name}</span>
      </SidebarMenuButton>
    );
  }

  // it's a directory
  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={true}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className={cn(darkClasses, normalClasses)}>
            <ChevronRightIcon className="transition-transform" />
            <FolderIcon />
            <span className="truncate">{name}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem, index) => (
              <Tree
                key={`${currentPath}-${index}`}
                item={subItem}
                selectedValue={selectedValue}
                onSelect={onSelect}
                parentPath={currentPath}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
