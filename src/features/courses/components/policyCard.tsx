import { ScrollArea } from "@/components/ui/scroll-area";

interface PolicyCardProps {
  dropPolicyNotes: string | null;
  extensionPolicyNotes: string | null;
}

export default function PolicyCard({
  dropPolicyNotes,
  extensionPolicyNotes,
}: PolicyCardProps) {
  return (
    <div className="flex flex-col h-full min-h-0 gap-4">

      {/* Drop Policy */}
      <div className="w-full flex-1 min-h-0 flex flex-col pt-4 px-4 border border-white/10 bg-card rounded-xl overflow-hidden">
        <div className="mb-2 flex-shrink-0">
          <h3 className="text-2xl mb-2 font-semibold">Drop Policy</h3>
        </div>

        <ScrollArea className="flex-1 min-h-0 pb-4">
          {dropPolicyNotes ? (
            <p className="text-sm whitespace-pre-wrap">{dropPolicyNotes}</p>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No policy set
            </p>
          )}
        </ScrollArea>
      </div>

      {/* Extension Policy */}
      <div className="w-full flex-1 min-h-0 flex flex-col pt-4 px-4 border border-white/10 bg-card rounded-xl overflow-hidden">
        <div className="mb-2 flex-shrink-0">
          <h3 className="text-2xl mb-2 font-semibold">Extension Policy</h3>
        </div>

        <ScrollArea className="flex-1 min-h-0 pb-4">
          {extensionPolicyNotes ? (
            <p className="text-sm whitespace-pre-wrap">
              {extensionPolicyNotes}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No policy set
            </p>
          )}
        </ScrollArea>
      </div>

    </div>
  );
}