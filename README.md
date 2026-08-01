# Chrismania: NSW RFS Stump Run

A polished, responsive, browser-based pixel-art endless runner. Chris of the
Eungai Brigade rides his NSW RFS-style truck through the Aussie bush, jumping
top-down tree stumps, grabbing RFS medals, and unleashing a buff-arm fire punch.

## Run it locally

Easiest: double-click `index.html` — it runs straight from the filesystem.

Or serve it (recommended for mobile testing on your LAN):

```
python -m http.server 8000
```

then open http://localhost:8000

## Controls

| Action  | Desktop                    | Mobile / touch                     |
|---------|----------------------------|------------------------------------|
| Jump    | Space / ArrowUp / W        | Tap anywhere on the screen         |
| Special | Ctrl (either) / X          | Fist button, lower-left            |
| Pause   | Escape (auto on tab hide)  | Pause button, top-right            |
| Mute    | M                          | Speaker button, top-right          |
| Start / restart | Space or Enter     | Tap                                |

Hold jump longer for a higher arc; release early for a short hop. A small
input buffer means pressing jump just before landing still works.

## Gameplay rules

- 3 lives (helmet icons). Hitting a stump costs a life, resets the special
  meter, knocks the stump away, and grants a brief invulnerability window.
- Floating **RFS medals** are the only way to charge the special meter
  (5 medals = SPECIAL READY). Clearing stumps awards score but not charge.
- The **special move**: Chris winds up his oversized arm and throws a fiery
  punch with a travelling shockwave. It destroys stumps within a limited
  forward range only — timing matters. Big bonus per stump smashed.
- Speed ramps up gradually to a hard cap. Spawn gaps always leave room to
  land and jump again; tight stump pairs (clearable in one jump) only appear
  at higher speeds.
- Best score and mute preference persist in `localStorage`.

## File structure

Single-file build by design: `index.html` contains the CSS, config, and game
code. The spec suggested ES modules, but modules require a web server —
a single file keeps double-click-to-play working (and the whole game is only
a few hundred lines). All art is drawn procedurally on a 320x180 canvas
scaled up with `image-rendering: pixelated`, so there are no image assets to
load (no loading state needed) and no sprite-sheet frame config — the "sprite
sheet" is the `drawTruck`/`drawStump`/`drawMedal` functions.

## Configuration

Everything tunable lives in the `CFG` object at the top of the script:
gravity, jump velocity and cut, jump buffer and coyote ticks, base/max speed
and ramp, spawn spacing, medal frequency, lives, hitstop and invulnerability
duration, `SPECIAL_CHARGE_REQUIRED`, special duration/active window/range/
bonus, scoring values, and `DEBUG_COLLISION_BOXES` (set `true` to see all
hitboxes and the special attack range).

Fixed-timestep 60 Hz update loop — consistent speed on any refresh rate,
with clamped deltas after tab switches. `prefers-reduced-motion` reduces
shake and edge flashes without changing gameplay timing.

## Tests performed

- Start, jump (Space/ArrowUp/W), variable jump height, buffered jump
- Ctrl/X special: no-op when uncharged, wind-up → strike → recover when full
- Special destroys only stumps in range; bonus awarded; meter resets
- Collision: one life lost, meter reset, hitstop + invulnerability, stump
  knocked clear, red edge flash
- Game over after 3 hits with score / stumps cleared / smashed / best
- Restart fully resets; best score persists across refresh
- Escape and tab-hide pause; resume works; no page scroll from Space
- Touch: tap jump, fist button, pause/mute buttons
- No console errors

## Known limitations

- Chris only faces right (gameplay never travels left); the code is
  structured so a left-facing variant could mirror the draw functions.
- HUD buttons are canvas-drawn tap targets rather than DOM buttons, so
  screen-reader operation relies on the keyboard controls and the ARIA
  status region.
