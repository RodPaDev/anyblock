import Logo from "@/components/logo";
import { Card } from "@/components/ui/card";
import { Fragment, MessageRole, MessageType } from "@/db/schema";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ChevronRightIcon, Code2Icon } from "lucide-react";

interface Props {
  content: string;
  role: MessageRole;
  fragment?: Fragment | null;
  createdAt: Date;
  isActiveFragment: boolean;
  onFagmentClick: (fragment: Fragment) => void;
  type: MessageType;
}

export default function MessageCard({
  content,
  role,
  fragment,
  createdAt,
  isActiveFragment,
  onFagmentClick,
  type,
}: Props) {
  if (role === "assistant") {
    return (
      <AssistantMessage
        content={content}
        fragment={fragment}
        createdAt={createdAt}
        isActiveFragment={isActiveFragment}
        onFagmentClick={onFagmentClick}
        type={type}
      />
    );
  }

  return <UserMessage content={content} />;
}

interface UserMessageProps {
  content: string;
}

function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="flex justify-end pb-4 pr-2 pl-10">
      <Card className="rounded-lg bg-muted p-3 shadow-none border-none max-w-[80%] break-words">
        {content}
      </Card>
    </div>
  );
}

type AssistantMessageProps = Omit<Props, "role">;

function AssistantMessage({
  content,
  fragment,
  createdAt,
  isActiveFragment,
  onFagmentClick,
  type,
}: AssistantMessageProps) {
  return (
    <div
      className={cn(
        "flex flex-col group px-2 pb-4",
        type === "error" && "text-red-700 dark:text-red-500"
      )}
    >
      <div className="flex items-center gap-2 pl-2 mb-2">
        <Logo />
        <span className="text-sm font-medium tracking-widest uppercase">
          Anyblock
        </span>
        <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
          {format(createdAt, "HH:mm 'on' MM dd, yyyy")}
        </span>
      </div>
      <div className="pl-8.5 flex flex-col gap-y-4">
        <span>{content}</span>
        {fragment && type === "result" && (
          <FragmentCard
            fragment={fragment}
            isActiveFragment={isActiveFragment}
            onFagmentClick={onFagmentClick}
          />
        )}
      </div>
    </div>
  );
}

interface FragmentCardProps {
  fragment: Fragment;
  isActiveFragment: boolean;
  onFagmentClick: (fragment: Fragment) => void;
}

function FragmentCard({
  fragment,
  isActiveFragment,
  onFagmentClick,
}: FragmentCardProps) {
  function handleClick() {
    onFagmentClick(fragment);
  }
  return (
    <button
      className={cn(
        "flex items-start text-start gap-2 border rounded-lg bg-muted w-fit p-3 hover:bg-secondary transition-colors",
        isActiveFragment &&
          "bg-primary text-primary border-primary hover:bg-primary"
      )}
      onClick={handleClick}
    >
      <Code2Icon className="size-4 mt-0.5" />
      <div className="flex flex-col flex-2">
        <span className="text-sm font-medium line-clamp-1">
          {fragment.title}
        </span>
        <span className="text-sm">Preview</span>
      </div>
      <div className="flex items-center justify-center mt-0.5">
        <ChevronRightIcon className="size-4" />
      </div>
    </button>
  );
}
