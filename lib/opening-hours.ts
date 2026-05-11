/** Tid i Europe/Oslo (Narvik), brukt til «åpent nå». */
function osloWeekdayAndMinutes(): { jsWeekday: number; minutes: number } {
  const now = new Date();
  const short = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Oslo",
    weekday: "short",
  }).format(now);
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const jsWeekday = map[short] ?? now.getDay();

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Oslo",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return { jsWeekday, minutes: hour * 60 + minute };
}

/** Åpning i minutter fra midnatt */
function todaysWindow(
  jsWeekday: number
): { open: number; close: number } | "closed" {
  switch (jsWeekday) {
    case 0:
      return { open: 12 * 60, close: 21 * 60 };
    case 1:
      return "closed";
    case 2:
    case 3:
    case 4:
      return { open: 12 * 60, close: 20 * 60 };
    case 5:
      return { open: 11 * 60, close: 21 * 60 };
    case 6:
      return { open: 12 * 60, close: 21 * 60 };
    default:
      return "closed";
  }
}

function fmtHm(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export function getLiveOpeningBadge(): {
  status: "open" | "closed";
  line1: string;
  line2: string;
} {
  const { jsWeekday, minutes } = osloWeekdayAndMinutes();
  const win = todaysWindow(jsWeekday);

  if (win === "closed") {
    return {
      status: "closed",
      line1: "Stengt i dag",
      line2: "Se åpningstider ›",
    };
  }

  const { open, close } = win;
  if (minutes >= open && minutes < close) {
    return {
      status: "open",
      line1: "Åpent nå",
      line2: `${fmtHm(open)} – ${fmtHm(close)}`,
    };
  }

  if (minutes < open) {
    return {
      status: "closed",
      line1: "Åpner i dag",
      line2: `${fmtHm(open)} – ${fmtHm(close)}`,
    };
  }

  return {
    status: "closed",
    line1: "Stengt for i dag",
    line2: "Se åpningstider ›",
  };
}
