export function jitterFor(key: string | number) {

  let h = 2166136261 >>> 0;
  const s = String(key);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const rnd = (seed: number) => ((seed >>> 0) / 4294967295);

  const r1 = rnd(h);
  const r2 = rnd((h ^ 0x9e3779b9) >>> 0);
  const r3 = rnd((h ^ 0x7f4a7c15) >>> 0);
  const r4 = rnd((h ^ 0x85ebca6b) >>> 0);

  return {
    rot:  (r1 - 0.5) * 18, 
    jx:   (r2 - 0.5) * 12, 
    jy:   (r3 - 0.5) * 10, 
    delay: r4 * 0.06,    
  };
}
