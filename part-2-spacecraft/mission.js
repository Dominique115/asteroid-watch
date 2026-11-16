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
  // Four installation slots. Development time is paid once, in the Lab.
  const buildMonths = 3 * Object.keys(hardware).length;
  const driftMonths = monthsLeft() - buildMonths - 10;
  if (!stats.massOK || driftMonths <= 0) return { chance: 0, buildMonths };

  const [low, high] = observation.asteroid?.massRange || [0.15, 0.75];
  const matches = projects.filter(p => Object.values(hardware).includes(p.id)).length;
  // Classroom calibration: DART parts fit this particular spacecraft together.
  const fit = 0.38 + 0.13 * matches;
  const steering = Math.min(stats.scores.targeting, stats.scores.course) / 100;
  const engineering = 0.09 * steering + 0.01 * stats.scores.power / 100;
  let total = 0;
  for (let i = 0; i < 10; i++) {
    const mass = low + (high - low) * i / 9;
    const timeFactor = driftMonths / (driftMonths + 28 * mass);
    total += (fit + engineering) * timeFactor;
  }
  return { chance: Math.round(total * 100) / 10, buildMonths };
}
