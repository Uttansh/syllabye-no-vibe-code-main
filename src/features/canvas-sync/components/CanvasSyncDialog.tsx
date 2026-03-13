"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveCanvasIcsUrl, syncCanvasNow } from "../actions";
import { Loader2 } from "lucide-react";

function getBrowserTimezone(): string | null {
  if (typeof Intl === "undefined" || typeof Intl.DateTimeFormat === "undefined") {
    return null;
  }
  return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
}

export function CanvasSyncDialog({
  open,
  onOpenChange,
  initialUrl,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialUrl?: string | null;
}) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) setUrl(initialUrl ?? "");
  }, [open, initialUrl]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSaveAndSync = async () => {
    setError(null);
    setSuccess(false);
    setLoading(true);

    const timezone = getBrowserTimezone();
    const saveResult = await saveCanvasIcsUrl(url.trim(), timezone);
    if (saveResult.error) {
      setError(saveResult.error);
      setLoading(false);
      return;
    }

    const syncResult = await syncCanvasNow({ skipThrottle: true });
    if (syncResult.error) {
      setError(syncResult.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold">Sync with Canvas</DialogTitle>
          <p className="text-md text-muted-foreground font-bold">
            Canvas → Calendar → Calendar feed (iCal) (usually on the right sidebar).
          </p>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="canvas-url" className="text-md font-bold">Canvas iCal Feed URL</Label>
            <Input
              id="canvas-url"
              type="url"
              placeholder="https://your-school.instructure.com/feeds/calendars/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              className="font-mono text-sm"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          {success && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              Sync complete! Your assignments have been updated.
            </p>
          )}

          <Button
            onClick={handleSaveAndSync}
            disabled={loading || !url.trim()}
            className="text-lg w-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:hover:bg-emerald-500/30"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Syncing...
              </>
            ) : (
              "Save & Sync"
            )}
          </Button>

          <p className="text-xs text-muted-foreground">
            You can only view Canvas assignments (in amber) in the calendar.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
