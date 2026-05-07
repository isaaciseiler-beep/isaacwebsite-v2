import { Clock, UserRound } from "lucide-react";

import type { Pin } from "@/lib/fulbrightmap/types";

function relativeTime(createdAt: string) {
  const created = new Date(createdAt).getTime();
  const elapsed = Math.max(0, Date.now() - created);
  const minutes = Math.floor(elapsed / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Added just now";
  if (minutes < 60) return `Added ${minutes} min ago`;
  if (hours < 24) return `Added ${hours} hr ago`;
  if (days < 7) return `Added ${days} day${days === 1 ? "" : "s"} ago`;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(createdAt));
}

export default function PinPopup({ pin }: { pin: Pin }) {
  return (
    <article className="w-[280px] overflow-hidden rounded-[1.25rem] bg-white text-neutral-950 shadow-2xl sm:w-[320px]">
      <div className="relative h-40 w-full overflow-hidden bg-neutral-200">
        <img
          src={pin.imageUrl}
          alt={pin.placeName}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h2 className="line-clamp-2 text-xl font-semibold leading-tight text-white">
            {pin.placeName}
          </h2>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <UserRound aria-hidden="true" className="h-4 w-4 text-orange-600" />
          <span>Shared by {pin.authorName}</span>
        </div>
        <p className="text-sm leading-5 text-neutral-800">{pin.caption}</p>
        <div className="flex items-center gap-2 border-t border-neutral-200 pt-3 text-xs font-medium text-neutral-500">
          <Clock aria-hidden="true" className="h-3.5 w-3.5" />
          {relativeTime(pin.createdAt)}
        </div>
      </div>
    </article>
  );
}
