# Backend Integration Tasks

Plan for wiring the Smile app to a real backend: MongoDB for persistence, push for real-time chat/call/video delivery, TanStack Query + Axios for data fetching/mutation on the frontend. Written 2026-08-07, before any of this work starts.

## Current state (ground truth, not assumptions)

**`smile-backend`** (`/home/dev-arome/Documents/GitHub/smile-backend`) is an unmodified NestJS scaffold — no commits yet, one placeholder route (`GET /` → `"Hello World!"`), and none of the following exist: Mongoose/MongoDB connection, auth, domain models, REST endpoints beyond the placeholder, WebSocket/realtime gateway, or push-notification service. Everything in the "Backend" section below is being built from scratch, not integrated against something that already works.

**`smile`** (this repo, the Expo app) already has some of the groundwork laid:
- `axios` (`^1.18.1`) and `@tanstack/react-query` (`^5.101.4`) are already in `package.json`.
- `src/services/api/client.ts` already exists — an Axios instance with a base URL from `EXPO_PUBLIC_API_URL`, a request interceptor that attaches `Authorization: Bearer <token>` from the persisted `useStore`, and a response interceptor that logs the user out on `401`. This matches the pattern documented in `ARCHITECTURE.md`.
- No `QueryClientProvider` is wired into `src/app/_layout.tsx` yet — React Query isn't actually active anywhere.
- No feature has an `api/` folder yet (`ARCHITECTURE.md`'s documented convention is `src/features/<feature>/api/<feature>-api.ts`) — zero network calls happen anywhere in the app today.
- Every screen runs entirely on hardcoded mock data (`src/features/*/data/mock-*.ts`) or local/Zustand ephemeral state. `useStore` (`src/shared/store`) has `user`/`token`/`setUser`/`setToken`/`logout` but nothing currently calls `setToken`/`setUser` — auth screens navigate through steps client-side without ever calling an API.
- `AudioCallScreen`/`VideoCallScreen` are UI-only mockups — a local timer and static images, no real media/signaling of any kind.
- No push-notification library (`expo-notifications`) or realtime client (`socket.io-client`) is installed.
- `EVENTS_BUSINESS_TRACKER.md` (repo root) separately documents which event/business fields exist in the mock data vs. the target spec — read that alongside this doc when building the corresponding backend models, so the schemas aren't designed twice.

## Decisions needed before backend work starts

These materially change the scope below — pin them down first rather than assuming:

- [x] **Auth method.** Resolved by reading the actual screens — there's no password field anywhere in the UI. Signup is email → email OTP → phone → phone OTP → profile; login is just phone number → phone OTP. Phone+OTP is the real login credential; email+OTP is a verified contact channel collected during signup, not used to log in. Implemented as such in Phase B2.
- [ ] **Push delivery provider.** "Push" for chat/calls/video could mean Expo's push service (simplest, works with `expo-notifications` out of the box), or going directly to FCM/APNs. Expo push is the default recommendation unless there's a reason to bypass it.
- [ ] **Realtime transport for in-app delivery.** Push notifications alone aren't enough for a live chat UI or call signaling while the app is foregrounded — you also need a socket/realtime channel (e.g. Socket.IO) for instant message delivery, typing indicators, presence, and call offer/answer/ICE exchange. Confirm this is wanted in addition to push (recommended), not instead of it.
- [ ] **Video/audio call infrastructure.** This is the single biggest unknown and a real cost/vendor decision: self-hosted WebRTC (SFU like mediasoup, more work, no per-minute fees) vs. a third-party SDK (Twilio, Agora, Daily, Stream Video — much faster to ship, ongoing usage cost). Nothing below assumes an answer; call/video backend and frontend tasks are placeholders until this is picked.
- [ ] **File/image storage.** The app has several image-picker flows already (signup photo, avatar, event cover image) that currently only hold a local `file://` URI. Need an upload destination — S3, Cloudinary, or storing directly in Mongo (not recommended for images).
- [ ] **Hosting.** Where does the NestJS API run, and where is MongoDB hosted (Atlas is the obvious default)? Affects `EXPO_PUBLIC_API_URL` and CORS config.

---

## Backend (`smile-backend`)

### Phase B1 — Project foundation
- [ ] Add `@nestjs/config`, load `.env` (Mongo URI, JWT secret, push credentials, CORS origins)
- [ ] Add `@nestjs/mongoose` + `mongoose`, connect to MongoDB via `MongooseModule.forRootAsync`
- [ ] Global `ValidationPipe` + DTO validation (`class-validator`/`class-transformer`)
- [ ] CORS configuration for the Expo app's origin(s)
- [ ] Global exception filter → consistent error response shape
- [ ] Health-check route (`GET /health`)

### Phase B2 — Auth module
*Scope depends on the "Auth method" decision above.*
- [ ] `User` schema (credentials + auth-related fields only; profile fields live on Phase B3's Profile schema, or merge them — decide when the schema is written)
- [ ] Signup endpoint(s) matching the app's existing step order: email → verify email (OTP) → phone → verify phone (OTP) → name → photo → interests → location
- [ ] Login endpoint
- [ ] JWT issuance (access token; decide if a refresh token is needed)
- [ ] Auth guard for protected routes (`Authorization: Bearer <token>`, matching `client.ts`'s existing interceptor)
- [ ] Password reset / account recovery endpoints (the app already has a full "Recover Account" UI flow with no backend behind it)
- [ ] Logout endpoint (if token invalidation/blacklisting is needed — check if JWTs are short-lived enough to skip this)

### Phase B3 — Core domain models & CRUD
Cross-reference `EVENTS_BUSINESS_TRACKER.md` for the full target field list per entity before finalizing each schema — don't just mirror today's mock shapes, since several known-missing fields (event category, business hours, capacity, etc.) should probably be designed in now rather than migrated later.
- [ ] `Profile` schema (name, avatar, bio, interests, location, etc.)
- [ ] `Event` schema + CRUD endpoints (list/detail/create/update/delete, RSVP)
- [ ] `Business` schema + CRUD endpoints (currently zero business endpoints or even a detail screen exist on the frontend — this is a bigger lift than Events)
- [ ] `Post` (feed) schema + CRUD endpoints (create/list/like/comment/delete)
- [ ] `Connection`/Follow schema (people-to-people; check if businesses/events need their own follow relation too)
- [ ] `Notification` schema + list endpoint
- [ ] Search endpoints (people/events, currently backed by separate mock search-result arrays on the frontend)

### Phase B4 — Chat
- [ ] `Conversation` schema
- [ ] `Message` schema
- [ ] REST endpoints: list conversations, list messages (paginated), send message (fallback for when realtime isn't connected)
- [ ] Delete-conversation endpoint (frontend already has this UX built — `useChatsStore.deleteChat`)

### Phase B5 — Realtime layer
*Depends on the "Realtime transport" decision.*
- [ ] Socket.IO (or chosen alternative) gateway, authenticated via the same JWT
- [ ] Message events (send/receive/delivered/read)
- [ ] Typing indicators
- [ ] Online/presence tracking (the frontend already has UI for "Live presence" / status broadcasting with no data behind it — `BroadcastSheet`, `LivePresenceSheet`)
- [ ] Call signaling events (offer/answer/ICE candidates, or whatever the chosen call SDK requires)

### Phase B6 — Push notifications
*Depends on the "Push delivery provider" decision.*
- [ ] Push-token registration endpoint (store Expo push token or FCM/APNs token per user/device)
- [ ] Push-sending service, triggered on: new chat message (recipient offline/backgrounded), incoming call, other notification types already modeled in the frontend's mock notifications
- [ ] Handle multi-device tokens per user

### Phase B7 — File uploads
*Depends on the "File/image storage" decision.*
- [ ] Upload endpoint (signed URL pattern recommended over proxying bytes through the API)
- [ ] Wire to signup photo, profile avatar, event cover image, post images

### Phase B8 — Calls/video infrastructure
*Fully blocked on the "Video/audio call infrastructure" decision — this phase can't be scoped further until that's picked.*
- [ ] Backend piece of whichever approach is chosen (token/room provisioning for a 3rd-party SDK, or signaling+SFU config for self-hosted)
- [ ] Call history/log persistence

---

## Frontend (`smile`)

### Phase F1 — React Query wiring
- [ ] Add `QueryClientProvider` to `src/app/_layout.tsx`
- [ ] Sensible default `QueryClient` config (retry, staleTime, refetch-on-focus behavior for a mobile app)
- [ ] Confirm `EXPO_PUBLIC_API_URL` is set correctly per environment (local dev backend vs. deployed)

### Phase F2 — Auth integration
- [ ] `src/features/auth/api/auth-api.ts` (per `ARCHITECTURE.md` convention)
- [ ] Replace each signup step's client-only `router.push` with a real mutation call (email submit, verify-email OTP, phone submit, verify-phone OTP, name, photo upload, interests, location)
- [ ] Login: wire `LoginScreen` + `LoginVerifyPhoneScreen` to real endpoints
- [ ] On success, persist real token/user into `useStore` (currently nothing calls `setToken`/`setUser` anywhere)
- [ ] Account recovery flow (`Recover*Screen`s) → real endpoints
- [ ] Logout → call backend logout endpoint if one exists, then clear `useStore`

### Phase F3 — Replace mock data with real queries
One `api.ts` + a set of `useQuery`/`useMutation` hooks per feature, replacing the corresponding `mock-*.ts` import. Suggested order (roughly cheapest/most-isolated first):
- [ ] People/profiles (`mock-people.ts` → real profile + connections endpoints)
- [ ] Feed posts (`mock-posts.ts`, `mock-comments.ts`, `mock-saved-posts.ts`)
- [ ] Events (`mock-events.ts`) — creation form (`NewEventScreen`) currently doesn't submit anywhere; wire it to the real create-event mutation
- [ ] Businesses (`mock-businesses.ts`) — same for `CreateBusinessScreen`; also needs the new `BusinessDetailScreen` from `EVENTS_BUSINESS_TRACKER.md` once that's built
- [ ] Notifications (`mock-notifications.ts`)
- [ ] Chat list + messages (`mock-chats.ts`, `mock-messages.ts`, and `useChatsStore` → likely becomes a thin cache layer over React Query instead of holding the source of truth)

### Phase F4 — Realtime chat
- [ ] Install `socket.io-client` (or chosen alternative)
- [ ] Connect/auth socket alongside the JWT session
- [ ] Live message receive → update `ChatScreen` + conversation list without polling
- [ ] Typing indicator UI (none exists today)
- [ ] Online/presence indicator wired to real data (`ChatProfileScreen`'s "Active now" is currently hardcoded text)

### Phase F5 — Push notifications
- [ ] Install `expo-notifications`, request permission, register device push token with the backend (Phase B6)
- [ ] Handle foreground vs. background notification behavior
- [ ] Tapping a message notification → deep-link into the right `ChatScreen`
- [ ] Tapping an incoming-call notification → deep-link into an incoming-call UI (doesn't exist yet — today `AudioCallScreen`/`VideoCallScreen` are only reachable by the callER tapping a button, there's no callee/incoming-call screen at all)

### Phase F6 — Calls/video
*Blocked on the same infra decision as Backend Phase B8.*
- [ ] Build an incoming-call screen/flow (accept/decline) — currently missing entirely
- [ ] Integrate real media into `AudioCallScreen`/`VideoCallScreen` (replace the fake timer-only UI with actual audio/video streams)
- [ ] Wire Mute/End/Flip-camera controls to the real SDK instead of local-only UI state
- [ ] Handle call-ended-by-remote-party, network-drop, permission-denied edge cases

### Phase F7 — File uploads
- [ ] Wire `useImagePicker` call sites (signup photo, profile avatar, event cover) to actually upload and store the resulting URL, instead of just holding a local `file://` URI in state

### Phase F8 — Loading/error/empty states
- [ ] Every screen migrating off mock data needs `isLoading`/`isError`/empty-list handling added — none of this exists today since mock data is always synchronously "loaded"

### Phase F9 — Cleanup
- [ ] Decide per-feature whether `mock-*.ts` files are deleted or kept as fixtures for tests/Storybook-equivalent
- [ ] Remove now-redundant local ephemeral stores once React Query owns the data they used to fake (e.g. `useChatsStore`)

---

## Suggested milestones (sequencing across both repos)

1. **Auth end-to-end** — Backend Phase B1+B2, Frontend Phase F1+F2. Nothing else is useful until login/signup actually authenticates against a real user.
2. **Read-only content** — Backend Phase B3 (list/detail endpoints), Frontend Phase F3 for People/Feed/Events. Proves the query layer works before tackling mutations.
3. **Mutations** — create post/event/business, RSVP, follow/connect.
4. **Chat, realtime** — Backend B4+B5 (chat portion), Frontend F3 (chat) + F4.
5. **Push notifications** — Backend B6, Frontend F5.
6. **Calls/video** — Backend B8, Frontend F6. Left last since it's the most infrastructure-heavy and fully blocked on an unmade vendor decision.
7. **File uploads, polish, cleanup** — Backend B7, Frontend F7–F9, throughout or at the end depending on how urgently real photos are needed.
