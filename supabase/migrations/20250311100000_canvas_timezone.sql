-- Add timezone column for Canvas ICS parsing (when ICS doesn't specify one)
alter table user_canvas_sync
  add column if not exists canvas_timezone text;
