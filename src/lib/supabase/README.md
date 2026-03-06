# Supabase clients: server vs client

This app uses two Supabase clients so that Row Level Security (RLS) works with Clerk auth in both server and client environments.

## Server client — `createClerkSupabaseClient()` ([server.ts](server.ts))

- **Use in:** Server Components, Server Actions, API routes, and any Node/server-only code.
- **Auth:** Calls `auth()` from `@clerk/nextjs/server` to get the current user’s JWT. That token is passed to Supabase as the access token so RLS policies see the same user as Clerk.
- **When it runs:** On the server during a request. No React hooks; it’s an async function you `await` to get a client.
- **Example:** Rate limiting, inserting/updating data in server actions, loading data for a page.

```ts
const supabase = await createClerkSupabaseClient();
const { data } = await supabase.from("courses").select("*").eq("user_id", userId);
```

## Client Supabase — `useClerkSupabaseClient()` ([client.ts](client.ts))

- **Use in:** Client Components only (components with `"use client"`).
- **Auth:** Uses `useSession()` from `@clerk/nextjs` to get the session and then the JWT. That token is passed to Supabase so RLS still applies in the browser.
- **When it runs:** In the browser. It’s a React hook, so you call it inside a component.
- **Example:** Real-time subscriptions, client-side fetches, or any Supabase access from the UI.

```ts
const supabase = useClerkSupabaseClient();
const { data } = await supabase.from("courses").select("*");
```

## Why two clients?

- **Server:** No `useSession()` (that’s a client hook). You need the server-side `auth()` to get the token.
- **Client:** No `auth()` in the browser in the same way. You need the session from Clerk’s client SDK.
- **Security:** Both clients send the same kind of JWT to Supabase, so RLS policies (e.g. “users can only see their own rows”) work the same on server and client. Never use the server client in a Client Component (it would require server-only APIs and can leak secrets). Never use the client hook in a Server Component (hooks only work in client components).

## Rule of thumb

- **Server Component / Server Action / API route** → `createClerkSupabaseClient()`.
- **Client Component** → `useClerkSupabaseClient()`.
