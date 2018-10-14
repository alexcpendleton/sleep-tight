export function formatMilliseconds(milliseconds) {
  const seconds = parsePad((milliseconds / 1000) % 60);
  const minutes = parsePad((milliseconds / (1000 * 60)) % 60);
  const hours = parsePad((milliseconds / (1000 * 60 * 60)) % 24, 1);
  return `${hours}:${minutes}:${seconds}`;
}

export function parsePad(i, length = 2) {
  return parseInt(i)
    .toString()
    .padStart(length, "0");
}
