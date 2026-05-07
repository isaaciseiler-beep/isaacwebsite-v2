import { Shuffle } from "lucide-react";

export default function RandomSpotButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label="Choose a random favorite spot"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#f97316] px-4 text-sm font-semibold text-white shadow-lg shadow-orange-950/30 transition hover:bg-[#fb923c] focus:outline-none focus:ring-2 focus:ring-white/80 disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/45 disabled:shadow-none"
    >
      <Shuffle aria-hidden="true" className="h-4 w-4" />
      Random spot
    </button>
  );
}
