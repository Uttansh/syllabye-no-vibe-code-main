import { Card, CardContent } from "@/components/ui/card";

interface PolicyCardProps {
  dropPolicyNotes: string | null;
  extensionPolicyNotes: string | null;
}

export default function PolicyCard({
  dropPolicyNotes,
  extensionPolicyNotes,
}: PolicyCardProps) {
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="w-full flex-1 min-h-0 flex flex-col pt-4 px-4 border border-card-foreground/10 shadow-sm bg-card rounded-xl overflow-hidden">
        <h3 className="text-2xl mb-4 font-semibold flex-shrink-0">
          Drop &amp; Extension Policy
        </h3>
        <div className="flex-1 min-h-0 overflow-auto space-y-4 pb-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Drop Policy
            </p>
            {dropPolicyNotes ? (
              <p className="text-sm whitespace-pre-wrap">{dropPolicyNotes}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No policy set
              </p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Extension Policy
            </p>
            {extensionPolicyNotes ? (
              <p className="text-sm whitespace-pre-wrap">
                {extensionPolicyNotes}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No policy set
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
