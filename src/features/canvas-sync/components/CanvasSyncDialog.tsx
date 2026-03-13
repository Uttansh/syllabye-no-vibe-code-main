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
import { saveCanvasIcsUrl, syncCanvasNow, desyncCanvas } from "../actions";
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
  const [success, setSuccess] = useState<"sync" | "desync" | false>(false);
  const [desyncLoading, setDesyncLoading] = useState(false);
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

    setSuccess("sync");
    setLoading(false);
    router.refresh();
  };

  const handleDesync = async () => {
    setError(null);
    setSuccess(false);
    setDesyncLoading(true);

    const result = await desyncCanvas();
    if (result.error) {
      setError(result.error);
      setDesyncLoading(false);
      return;
    }

    setUrl("");
    setSuccess("desync");
    setDesyncLoading(false);
    router.refresh();
    // Brief delay so user sees success message before dialog closes
    setTimeout(() => onOpenChange(false), 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Sync with Canvas</DialogTitle>
          <p className="text-md text-muted-foreground">
            Canvas → Calendar → Calendar feed (iCal) (usually on the right sidebar).
          </p>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            {/* <Label htmlFor="canvas-url" className="text-md font-bold">Canvas iCal Feed URL</Label> */}
            <Input
              id="canvas-url"
              type="url"
              placeholder="Canvas iCal Feed URL (https://canvas.school.edu/...)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              className="font-mono text-sm"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          {success === "sync" && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              Sync complete! Your assignments have been updated.
            </p>
          )}
          {success === "desync" && (
            <p className="text-sm text-amber-600 dark:text-amber-400">
              Canvas disconnected. All synced assignments have been removed.
            </p>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleSaveAndSync}
              disabled={loading || !url.trim()}
              className="text-lg flex-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:hover:bg-emerald-500/30"
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
            {initialUrl?.trim() && (
              <Button
                onClick={handleDesync}
                disabled={loading || desyncLoading}
                className="text-lg flex-1 bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:hover:bg-rose-500/30"
              >
                {desyncLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Removing...
                  </>
                ) : (
                  "Disconnect Canvas"
                )}
              </Button>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            You can only view Canvas assignments in the calendar.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
