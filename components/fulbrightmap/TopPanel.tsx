import { Database, HardDrive, MapPin } from "lucide-react";

import type { StorageMode } from "@/lib/fulbrightmap/types";
import RandomSpotButton from "./RandomSpotButton";

export default function TopPanel({
  userPinCount,
  totalPins,
  storageMode,
  loading,
  onRandomSpot,
}: {
  userPinCount: number;
  totalPins: number;
  storageMode: StorageMode;
  loading: boolean;
  onRandomSpot: () => void;
}) {
  const ModeIcon = storageMode === "supabase" ? Database : HardDrive;

  return (
    <section
      aria-label="Map controls"
      className="fixed left-3 right-3 top-3 z-30 rounded-[1.35rem] border border-white/20 bg-neutral-950/55 p-4 text-white shadow-2xl shadow-black/25 backdrop-blur-2xl sm:left-5 sm:right-auto sm:top-5 sm:w-[390px]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-100/75">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
            New Taipei
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Favorite Spots
          </h1>
          <p className="mt-1 max-w-[32ch] text-sm leading-5 text-white/70">
            Drop up to three pins and share places worth discovering.
          </p>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-center">
          <div className="text-lg font-semibold leading-none">
            {userPinCount}/3
          </div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
            added
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <RandomSpotButton disabled={loading} onClick={onRandomSpot} />
        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/75">
          {loading ? "Loading spots" : `${totalPins} shared spot${totalPins === 1 ? "" : "s"}`}
        </span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/75"
          title={
            storageMode === "local"
              ? "Local mode stores pins only in this browser because Supabase env vars are not configured."
              : "Shared mode is enabled with Supabase."
          }
        >
          <ModeIcon aria-hidden="true" className="h-3.5 w-3.5" />
          {storageMode === "local" ? "Local browser mode" : "Shared mode"}
        </span>
      </div>

      {userPinCount >= 3 ? (
        <div className="mt-3 rounded-2xl border border-emerald-200/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-50">
          You&apos;ve added your three favorite spots.
        </div>
      ) : null}
    </section>
  );
}
