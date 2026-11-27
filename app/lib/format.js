// Text helpers shared by every view: escaping, money, percentages and UTC times.

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

export function money(n) {
  const cents = Math.round(n * 100) % 100 !== 0;
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: 2 });
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const pad = (n) => String(n).padStart(2, '0');

// "Nov 27, 10:59 UTC": times are shown in UTC, the zone they were recorded in, so every shopper reads the same.
export function utcStamp(iso) {
  const d = new Date(iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`;
}

// How long before `later` the moment `earlier` was, in words: "2 h", "3 days".
export function ageBetween(earlier, later) {
  const hours = (new Date(later) - new Date(earlier)) / 3.6e6;
  if (hours < 1) return 'under 1 h';
  if (hours < 36) return `${Math.round(hours)} h`;
  return `${Math.round(hours / 24)} days`;
}

export function hostOf(url) {
  return new URL(url).hostname.replace(/^www\./, '');
}
