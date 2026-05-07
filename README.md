# Isaac's Site (V2) (next.js)

## Fulbright Map

The unlinked map page lives at `/fulbrightmap`. It is a Next.js App Router page
for sharing favorite spots in New Taipei with Mapbox markers, image uploads, a
three-pin anonymous user limit, and a random spot picker.

### Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000/fulbrightmap`.

### Required Mapbox token

Create `.env.local` and add:

```bash
MAPBOX_ACCESS_TOKEN=pk_your_token_here
```

The app shows a setup screen instead of crashing if this value is missing.

### Optional Supabase shared persistence

Without Supabase, pins are saved in `localStorage` and only exist in the current
browser. To enable shared pins for all visitors, add both values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_public_anon_key
```

Then run `supabase/schema.sql` in the Supabase SQL editor. The schema creates
the `pins` table, row-level security policies, and guidance/policies for a
public storage bucket named `fulbrightmap-pin-images`.

### Image uploads

Images are validated on the client as common image types under 5MB. They are
compressed in-browser before persistence. In Supabase mode, compressed JPGs are
uploaded to the `fulbrightmap-pin-images` bucket and the public URL is saved in
the `pins` table. In local demo mode, compressed images are stored as data URLs
inside browser `localStorage`.

### Assumptions

- Public anonymous posting is intentional for this unlinked community map.
- Supabase storage uses a public bucket so popups can render images directly.
- Each browser gets one anonymous user id stored in `localStorage`, and that id
  can add up to three pins.
