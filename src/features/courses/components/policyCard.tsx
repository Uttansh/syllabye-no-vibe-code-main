import { ScrollArea } from "@/components/ui/scroll-area";

interface PolicyCardProps {
  dropPolicyNotes: string | null;
  extensionPolicyNotes: string | null;
}

export default function PolicyCard({
  dropPolicyNotes,
  extensionPolicyNotes,
}: PolicyCardProps) {
  const policies = [
    { title: "Drop Policy", content: dropPolicyNotes },
    { title: "Extension Policy", content: extensionPolicyNotes },
  ].filter((p) => p.content);

  return (
    <div className="flex flex-col h-full min-h-0 border-2 border-border bg-card rounded-md overflow-hidden">
      <div className="flex-shrink-0 px-6 py-3 border-b-2 border-border"> 
        <h3 className="text-2xl font-semibold">Course Links and Policies</h3>
      </div>

      <ScrollArea className="flex-1 min-h-0 p-6">
        {policies.length > 0 ? (
          <ul className="list-disc pl-5 space-y-3 text-sm">
            {policies.map((policy, i) => (
              <li key={i}>
                <span className="font-semibold">{policy.title}: </span>
                <span className="whitespace-pre-wrap">{policy.content}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            No policies set
          </p>
        )}
      </ScrollArea>
    </div>
  );
}