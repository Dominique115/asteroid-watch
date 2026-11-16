# Asteroid Watch

An educational planetary defense game for elementary school students. Players investigate a fictional asteroid, plan a DART-inspired spacecraft, and see whether their mission changes its path.

## Project status

- **Part 1: Observation and risk assessment** — playable prototype in [`observation-mvp.html`](observation-mvp.html). Players follow a decision tree, spend observation opportunities and time, and build an asteroid fact file.
- **Part 2: Spacecraft design and assembly** — playable in [`part-2-spacecraft/index.html`](part-2-spacecraft/index.html).
- **Part 3: Launch and intercept** — playable simulation in [`part-2-spacecraft/launch.html`](part-2-spacecraft/launch.html).
- **Earlier prototype** — an earlier asteroid game is preserved in [`earlier-asteroid-prototype.html`](earlier-asteroid-prototype.html).

The game scenario, time costs, and numerical results are illustrative. The first part links to NASA and JPL sources in its Science notes.

## Run the prototype

Open `observation-mvp.html` in a modern browser. No installation or build step is required. Fonts use Google Fonts; the page also has local fallback fonts.

Alternatively, from the repository root, run `python3 -m http.server 8000`, then visit `http://localhost:8000/observation-mvp.html`.

## Collaborate

This repository is private. The owner must invite each teammate and the teammate must accept before accessing or forking it, subject to repository and organization settings. Teammates can work in their own branches or permitted private forks and open pull requests to combine changes.

Suggested division: keep observation work in `observation-mvp.html`; create `part-2-spacecraft/` and `part-3-intercept/` for the other stages. Coordinate the data passed between stages before integrating them. The observation page carries its fact file and remaining time to design using sessionStorage. The design shows a game-only hit probability, assembly requires all four parts, and launch uses that probability for a simulated hit or miss. The chance is an illustrative rule, not a real NASA prediction; observation details are shown as context and do not yet affect the chance. Use a local server for consistent browser storage.

Avoid committing credentials, local configuration, or personal information. The hosted Sites configuration is intentionally excluded from this repository.
