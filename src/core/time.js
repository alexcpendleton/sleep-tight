export function formatMilliseconds(milliseconds) {
  return formatLetterly(milliseconds);
}

export function formatNumerically(milliseconds) {
  const seconds = parsePad((milliseconds / 1000) % 60);
  const minutes = parsePad((milliseconds / (1000 * 60)) % 60);
  const hours = parsePad((milliseconds / (1000 * 60 * 60)) % 24, 1);
  return `${hours}:${minutes}:${seconds}`;
}

export function formatLetterly(milliseconds) {
  const seconds = parsePad((milliseconds / 1000) % 60, 1);
  const minutes = parsePad((milliseconds / (1000 * 60)) % 60, 1);
  const hours = parsePad((milliseconds / (1000 * 60 * 60)) % 24, 1);
  const parts = [];
  if (hours > 0) {
    parts.push(`${hours}h`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }
  if (seconds > 0) {
    parts.push(`${seconds}s`);
  }
  return parts.join(" ");
}

export function parsePad(i, length = 2) {
  return parseInt(i)
    .toString()
    .padStart(length, "0");
}
