import { NumberAr } from "@/helpers/helper";

export default function Stepper({
  value,
  onInc,
  onDec,
}: {
  value: number;
  onInc: () => void;
  onDec: () => void;
}) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex shrink-0 items-center gap-1 rounded-full border border-amber-800/30 bg-white p-1"
    >
      <button
        type="button"
        aria-label="زود"
        onClick={onInc}
        className="grid size-9 place-items-center rounded-full bg-amber-100 text-xl text-amber-800 transition active:scale-90"
      >
        +
      </button>
      <span className="min-w-6 text-center text-sm font-bold text-amber-900">
        {NumberAr(value)}
      </span>
      <button
        type="button"
        aria-label="نقص"
        onClick={onDec}
        className="grid size-9 place-items-center rounded-full bg-amber-100 text-xl text-amber-800 transition active:scale-90"
      >
        −
      </button>
    </div>
  );
}
