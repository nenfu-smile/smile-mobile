# Events & Business Feature Tracker

Gap analysis between the target spec (below) and what actually exists in the codebase today, as of 2026-08-07. Statuses:

- ✅ **Done** — field/feature exists and is wired to real UI
- 🟡 **Partial** — exists in some form, but incomplete, unwired, or repurposed from something else
- ❌ **Missing** — nothing exists yet

Check items off (`- [x]`) as they're built. Re-run an audit periodically since this snapshot will drift.

---

## Event Information

### Basic Information
- [x] Event name — `EventListItem.name`, `EventDetails.title`, `NewEventScreen` title field
- [ ] Short tagline — ❌ Missing (no tagline field anywhere)
- [x] Description — `EventDetails.about`, `NewEventScreen` description (250-word cap)
- [ ] Category (Music, Sports, Business, Tech, Food, Party, Education, Religious, etc.) — ❌ Missing. `NewEventScreen`'s "Interest" picker (`Connect, Tech meetup, Friends, Networking, Workshop, Party`) is a tag list, not a single event-type category
- [ ] Cover image/banner — 🟡 Partial. `NewEventScreen` collects a single `coverUri` via image picker, but `EventDetailScreen` doesn't consume it — it renders a hardcoded gray placeholder block instead. `EventDetails` has no image field to store it
- [ ] Gallery (optional) — ❌ Missing (no multi-photo concept anywhere in the app)

### Time & Location
- [ ] Venue name — ❌ Missing (only a single free-text `location`/`address` string, no separate venue name)
- [x] Address — `EventListItem.address`, `NewEventScreen` location field (free text)
- [ ] GPS location — 🟡 Partial. `EventListItem.offset` is a synthetic lat/lng jitter for map-pin placement, not a real geocoded coordinate from the creation form. `NewEventScreen`'s location field is free text with no map/address picker
- [x] Start date & time — `EventDetails.date`/`.time`, `NewEventScreen` date/time fields (free text, no native picker)
- [ ] End date & time — ❌ Missing. `EventDetails.time` is a single string like `"9:00AM -6:00PM"` (start+end baked into one string), not structured start/end fields
- [ ] Time zone — ❌ Missing
- [ ] Indoor/Outdoor — ❌ Missing

### Organizer
- [ ] Organizer name — ❌ Missing
- [ ] Organizer profile — ❌ Missing (no link from an event to a person/business profile)
- [ ] Contact phone — ❌ Missing
- [ ] Email — ❌ Missing
- [ ] Website (optional) — ❌ Missing
- [ ] Verified badge (if applicable) — ❌ Missing (no verification concept exists anywhere in the app, for any entity)

### Attendance
- [ ] Free or Paid — ❌ Missing
- [ ] Ticket price(s) — ❌ Missing
- [ ] Total capacity — ❌ Missing
- [ ] Remaining spots — ❌ Missing (depends on capacity, which doesn't exist)
- [ ] Registration deadline — ❌ Missing
- [ ] RSVP button — 🟡 Partial. Button exists on `EventDetailScreen` but `onPress={() => {}}` — purely decorative, no RSVP state stored anywhere
- [x] Join/Interested buttons — `AddButton` (+/✓ toggle) used on event rows and detail screen, though it's a generic stateless component shared with People (see Shared Fields notes)

### Features
- [ ] Live attendees on the map — ❌ Missing
- [ ] Check-in — ❌ Missing (confirmed no "check-in" concept anywhere in the codebase, including assets)
- [ ] Invite friends — ❌ Missing
- [x] Share event — 🟡 Partial. `ShareSheet` opens from `EventDetailScreen`, but it's hardcoded with feed-post copy ("Share this article") and none of its 8 share-destination buttons have an `onPress` handler — visually present, functionally inert, and not actually parameterized per-event
- [ ] Comments — ❌ Missing (comments exist for feed posts via `CommentsSheet`, not for events)
- [ ] Photos & videos — ❌ Missing
- [ ] Live updates — ❌ Missing
- [ ] Ratings & reviews — ❌ Missing (no rating/review UI exists anywhere in the app for any entity)

### Additional Information
- [ ] Dress code — ❌ Missing
- [ ] Age restriction — ❌ Missing
- [ ] Parking — ❌ Missing
- [ ] Accessibility — ❌ Missing
- [ ] FAQs — ❌ Missing
- [ ] Rules & policies — ❌ Missing

---

## Business Information

### Basic Information
- [x] Business name — `BusinessListItem.name`, `CreateBusinessScreen` name field
- [ ] Logo — ❌ Missing
- [ ] Cover image — ❌ Missing. `CreateBusinessScreen` has no `Image`/image-picker of any kind (confirmed — unlike `NewEventScreen`, which at least has one)
- [x] Business description — `CreateBusinessScreen` description field (no word cap, unlike events)
- [ ] Business category — 🟡 Partial, and **miswired**: the "Category" chip picker on `CreateBusinessScreen` is byte-for-byte the `LivePresenceSheet` mood list (Happy/Relaxed/Excited/Tired emoji), not a real business taxonomy. The mock data (`BusinessListItem.category`) DOES use real categories ("Fashion", "Hospitality", "Retail", "Services") but the creation form can't actually produce those values today
- [ ] Established year — ❌ Missing

### Contact Information
- [ ] Phone number — 🟡 Partial. Collected on `CreateBusinessScreen` but not stored on `BusinessListItem`
- [ ] Email — ❌ Missing
- [ ] Website — 🟡 Partial. Collected on `CreateBusinessScreen` but not stored on `BusinessListItem`
- [ ] Social media links — ❌ Missing (only a single generic "website" field; no Instagram/Twitter/Facebook/TikTok)

### Location
- [x] Address — `BusinessListItem.address`, `CreateBusinessScreen` address field
- [ ] GPS location — 🟡 Partial. `CreateBusinessScreen` collects raw Latitude/Longitude as two manually-typed number fields (no map picker); `BusinessListItem.offset` is synthetic jitter for map display, disconnected from the form
- [ ] Directions — ❌ Missing (no business detail screen exists at all, so there's nowhere to put a directions action)
- [ ] Service radius (if mobile) — ❌ Missing

### Opening Hours
- [ ] Monday–Sunday schedule — ❌ Missing
- [ ] Holiday hours — ❌ Missing
- [ ] Open/Closed status — ❌ Missing
- [ ] 24-hour indicator — ❌ Missing

### Products & Services
- [ ] Products — ❌ Missing
- [ ] Services — ❌ Missing
- [ ] Pricing (optional) — ❌ Missing
- [ ] Catalog — ❌ Missing
- [ ] Menu (for restaurants) — ❌ Missing

### Business Features
- [ ] Delivery available — ❌ Missing
- [ ] Pickup available — ❌ Missing
- [ ] Online booking — ❌ Missing
- [ ] Reservations — ❌ Missing
- [ ] Wheelchair accessible — ❌ Missing
- [ ] Wi-Fi — ❌ Missing
- [ ] Parking — ❌ Missing
- [ ] Pet friendly — ❌ Missing
- [ ] Payment methods accepted — ❌ Missing

### Trust & Social
- [ ] Verification badge — ❌ Missing (no verification concept anywhere in the app)
- [ ] Ratings — ❌ Missing
- [ ] Reviews — ❌ Missing
- [ ] Followers — 🟡 Partial. A generic follow/connection pattern exists for People (`ConnectionsScreen`, `MOCK_FOLLOWERS`/`MOCK_FOLLOWING`) but nothing equivalent exists for businesses
- [ ] Photos — ❌ Missing
- [ ] Videos — ❌ Missing
- [ ] Owner replies — ❌ Missing (depends on reviews existing first)

**Bigger gap:** there is no `BusinessDetailScreen`, no business list screen, and no `/business/[id]` route at all — the only business screen today is the creation form. Businesses only otherwise appear as map pins on `HomeMapScreen`, and tapping a business's preview card does nothing (`href: null`) since there's nowhere to navigate to.

---

## Smile-Specific Features
- [ ] Live Presence – count of Smile users currently there — ❌ Missing for businesses. (A *personal* live-presence broadcast exists — `BroadcastSheet`/`LivePresenceSheet` — but it's not attached to a business/venue.) `HomeMapScreen`'s "182 people active" text is a hardcoded number, not derived from real presence data
- [ ] Presence Aura™ (Energetic, Calm, Busy, Romantic, Creative, etc.) — 🟡 Seed exists, wrong scope. `LivePresenceSheet.MOODS` (Happy/Relaxed/Excited/Tired) is conceptually this feature, but scoped to a person's own status — and it's the same array that got mistakenly reused as `CreateBusinessScreen`'s "Category" picker. Building real Presence Aura means giving businesses their own mood/atmosphere field, separate from that reuse
- [ ] Busy times graph — ❌ Missing
- [ ] Trending indicator — 🟡 Partial, events only. `EventsListScreen` has a hardcoded "★ Trending" text badge (`EventListItem.trending`), not a computed/real trending signal, and no equivalent exists for businesses
- [ ] Nearby friends — ❌ Missing (as a business-specific signal; general nearby-people exists on the home map, unrelated to a specific business)
- [ ] Current promotions — ❌ Missing
- [ ] Events hosted by the business — ❌ Missing (no link between the Business and Event models at all)
- [ ] Check-in history — ❌ Missing
- [ ] Loyalty rewards — ❌ Missing
- [ ] Instant messaging with the business — ❌ Missing (chat exists person-to-person only; no business-as-chat-participant concept)
- [ ] Follow business — ❌ Missing
- [ ] Save to favorites — 🟡 Partial, feed-posts only. `SavedPostsScreen`/`SavedPost` exists but is feed-post-specific and purely cosmetic mock data — no equivalent for businesses or events

---

## Business Analytics (Owner Only)
- [ ] Views — ❌ Missing
- [ ] Profile visits — ❌ Missing
- [ ] Map impressions — ❌ Missing
- [ ] Check-ins — ❌ Missing
- [ ] New followers — ❌ Missing
- [ ] Customer demographics — ❌ Missing
- [ ] Peak visiting hours — ❌ Missing
- [ ] Revenue from Smile promotions — ❌ Missing

Nothing in this section exists yet — there's no analytics screen, no owner-only view mode, and no data model to back any of these numbers.

---

## Shared Fields (Both Events and Businesses)
- [x] Name — exists on both models
- [x] Description — exists on both models
- [ ] Category — 🟡 Partial on both, and both are currently wrong/incomplete (see notes above — events conflate category with interest tags; business category picker is a mood-list mistake)
- [ ] Cover image — 🟡 Partial for events (collected but not displayed), ❌ Missing for business
- [ ] Gallery — ❌ Missing for both
- [ ] GPS location — 🟡 Partial for both — only synthetic map-display jitter exists (`offset` field), not real geocoding tied to the creation forms
- [ ] Contact information — 🟡 Partial for business (phone/website collected but not persisted to the list model), ❌ Missing for events (no organizer contact fields at all)
- [ ] Verification status — ❌ Missing for both (no verification concept exists anywhere in the app yet, for people, events, or businesses)
- [ ] Ratings & reviews — ❌ Missing for both
- [ ] Share link — 🟡 Partial for events (`ShareSheet` opens but isn't parameterized/functional), ❌ Missing for business (no share entry point since there's no business detail screen)
- [ ] Report option — 🟡 Partial for events? No — confirmed ❌ **Missing**. `ReportScreen` only supports `kind: "user"` or `"post"`; there is no report entry point on `EventDetailScreen` or any business screen, and passing an unsupported `kind` silently falls back to "Report Post" copy

---

## Suggested near-term priorities

Rough ordering if picking this up incrementally (not part of the original spec — just a practical starting point):

1. **Fix the business category mistake** — swap the mood-emoji picker on `CreateBusinessScreen` for a real category taxonomy matching what `BusinessListItem.category` already expects.
2. **Wire up the event cover image** — `NewEventScreen` already collects `coverUri`; add an image field to `EventDetails`/`EventListItem` and render it on `EventDetailScreen` instead of the gray placeholder.
3. **Build a minimal `BusinessDetailScreen` + route** — businesses currently have nowhere to go; even a bare-bones detail screen (mirroring `EventDetailScreen`) unblocks everything else in the Business section (follow, share, report, hours, etc.).
4. **Persist the fields already being collected but dropped** — business phone/website/lat/long are typed into the form and then thrown away; add them to `BusinessListItem` so the data isn't lost.
5. **Generalize `ShareSheet` and `ReportScreen`** — both are hardcoded to feed-post language/kinds; parameterizing them (title/content props, extra `kind` values) unlocks real sharing/reporting for events and businesses with relatively little new code.
