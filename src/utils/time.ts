export function getMillisecondsAfterSeconds(secondsPastEpoch: number): number {
  const currentTimeMillis = Date.now();
  const additionalMillis = secondsPastEpoch * 1000;
  return currentTimeMillis + additionalMillis;
}
