export function getPositiveModulo(num: number, mod: number) {
  return ((num % mod) + mod) % mod;
}
