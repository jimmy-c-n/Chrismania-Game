# Audio assets

The game **synthesises all of this live** with WebAudio — it does not load
these files, so it still works if the folder is missing. These are the same
sounds baked out to .wav for reuse elsewhere (trailers, video edits, another
engine, or swapping in hand-made replacements later).

Regenerate after changing any sound in `index.html`:

```bash
node tools/make-audio.js
```

## music/

| File | What it is |
|---|---|
| `stump-run-loop.wav` | The urgent minor-key chiptune at starting tempo (one 32-step bar, loops seamlessly) |
| `stump-run-loop-fast.wav` | Same loop at max-speed tempo — the game ramps between the two |

## sfx/

| File | Plays when |
|---|---|
| `jump.wav` | Chris jumps (also Steve hopping the fence) |
| `land.wav` | Truck lands |
| `medal.wav` | RFS medal collected |
| `ready.wav` | Special meter fills — SPECIAL READY |
| `punch.wav` | Special move fires |
| `smash.wav` | A stump is destroyed by the punch — deep boom plus a woody crack |
| `pop.wav` | Small impacts (cowpat landing, Brett bumped aside) |
| `crash.wav` | Hitting a stump, losing a life |
| `nag.wav` | Steve or Brett turns up to have a word |

Mono, 44.1 kHz, 16-bit PCM.
