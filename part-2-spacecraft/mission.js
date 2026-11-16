const projects = [
  { id: 'draco', name: 'DRACO + SMART Nav', months: 8, benefit: 'Help the spacecraft find its target.' },
  { id: 'rosa', name: 'ROSA solar wings', months: 6, benefit: 'Make electricity with folding solar wings.' },
  { id: 'hydra', name: 'DART hydrazine thrusters', months: 12, benefit: 'Make quick turns using stored fuel.' },
  { id: 'rlsa', name: 'RLSA high-gain antenna', months: 6, benefit: 'Send pictures back to Earth.' }
];
function readMission(key, fallback) {
  try { return JSON.parse(sessionStorage.getItem('asteroidWatch.' + key)) ?? fallback; }
  catch { return fallback; }
}
const lab = readMission('lab', { spent: 0, researched: [] });
const observation = readMission('observation', { time: 96, done: [] });
function monthsLeft() { return Math.max(0, observation.time); }
function predictDeflection(stats, hardware) {
  const buildMonths = 3 * Object.keys(hardware).length;
  const matches = projects.filter(project => Object.values(hardware).includes(project.id)).length;
  // A game score for this mission, calibrated so the complete DART design succeeds.
  const engineering = 0.09 * Math.min(stats.scores.targeting, stats.scores.course)
    + 0.01 * stats.scores.power;
  const chance = matches === projects.length
    ? 100
    : Math.round((38 + 13 * matches + engineering) * 10) / 10;
  return { chance: matches === projects.length ? 100 : Math.min(99, chance), buildMonths };
}
