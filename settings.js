/* ============================================================
   CHRISMANIA: RFS STUMP RUN - GAME SETTINGS
   Edit the numbers, save, refresh the browser. That's it.
   Any setting you delete falls back to the game's default.
   ============================================================ */
window.GAME_SETTINGS = {

  /* ---------- JUMPING ----------
     JUMP_VELOCITY = jump HEIGHT. More negative = higher.
       -5.4 low hop, -6.0 default, -7.0 big air.
     GRAVITY = jump DISTANCE / floatiness. Lower = hang in the
       air longer, so you travel further at the same height.
       0.36 snappy/short, 0.30 default, 0.24 long floaty jumps.
     JUMP_CUT: velocity cap when you release jump early (short hops).
     JUMP_BUFFER_TICKS: press jump this many ticks (60/sec) before
       landing and it still counts. COYOTE_TICKS: grace after
       leaving the ground. */
  JUMP_VELOCITY: -6.0,
  GRAVITY: 0.30,
  JUMP_CUT: -2.2,
  JUMP_BUFFER_TICKS: 7,
  COYOTE_TICKS: 5,

  /* ---------- SPEED & RAMP-UP ----------
     BASE_SPEED: how fast the run starts.
     MAX_SPEED: the hard cap it ramps toward.
     SPEED_RAMP: how quickly it ramps. Bigger = faster ramp.
       0.0002 gentle cruise, 0.00035 default, 0.0008 sweaty. */
  BASE_SPEED: 4.2,
  MAX_SPEED: 9,
  SPEED_RAMP: 0.00025,

  /* ---------- STUMP SPAWNING ----------
     SPAWN_MIN: minimum gap between stumps in pixels (the truck
       is ~48px long - keep this well above ~120 or it gets cruel).
     SPAWN_VAR: random extra gap added on top (0 = metronome
       stumps, bigger = more unpredictable spacing).
     SPAWN_SPEED_PAD: extra gap per unit of current speed, keeps
       reaction time fair as the game speeds up.
     BIG_STUMP_CHANCE: 0..1 odds a stump is the wide tall variant.
     PAIR_CHANCE: 0..1 odds of a tight double-stump (cleared in
       one jump). Only appears once speed passes PAIR_MIN_SPEED. */
  SPAWN_MIN: 130,
  SPAWN_VAR: 150,
  SPAWN_SPEED_PAD: 22,
  /* SPAWN_RHYTHM: true mixes short / normal / long gaps so the spacing
     doesn't feel metronomic. Every gap is still floored at the distance
     the truck needs to land and jump again. false = one flat range. */
  SPAWN_RHYTHM: true,
  BIG_STUMP_CHANCE: 0.2,
  PAIR_CHANCE: 0.2,
  PAIR_MIN_SPEED: 3.1,

  /* ---------- LIVES & GETTING HIT ----------
     HITSTOP_TICKS: freeze-frame length on impact.
     INVULN_TICKS: flashing grace period after a hit (60 = 1 sec). */
  LIVES: 3,
  HITSTOP_TICKS: 14,
  INVULN_TICKS: 100,

  /* ---------- MEDALS & THE SPECIAL MOVE ----------
     SPECIAL_CHARGE_REQUIRED: medals needed to fill the meter.
     MEDAL_MIN / MEDAL_VAR: pixels between free-floating medals
       (min + random extra). Lower = more medals.
     MEDAL_ON_STUMP_CHANCE: 0..1 odds a stump spawns with a medal
       hovering above it (jump the stump, grab the medal).
     SPECIAL_DURATION: total punch length in ticks (48 = 0.8s).
     SPECIAL_ACTIVE_START / END: the window (in ticks from
       activation) where the punch actually destroys stumps.
     SPECIAL_ATTACK_RANGE: how far ahead of the bull bar the
       punch reaches, in pixels (canvas is 320 wide). */
  SPECIAL_CHARGE_REQUIRED: 5,
  MEDAL_MIN: 260,
  MEDAL_VAR: 240,
  MEDAL_ON_STUMP_CHANCE: 0.5,
  SPECIAL_DURATION: 48,
  SPECIAL_ACTIVE_START: 12,
  SPECIAL_ACTIVE_END: 31,
  SPECIAL_ATTACK_RANGE: 150,

  /* ---------- SCORING ---------- */
  CLEAR_BONUS: 50,             // jumping a stump
  MEDAL_BONUS: 25,             // grabbing a medal
  SPECIAL_DESTROY_BONUS: 250,  // punching a stump

  /* ---------- FIRE STUMPS ----------
     At higher speeds stumps can be on fire - the flames add
     FIRE_EXTRA_HEIGHT px to the hitbox, so you must jump higher.
     FIRE_MIN_SPEED: no fire below this speed. FIRE_CHANCE: the
     odds at max speed (scales up between min and max). */
  FIRE_MIN_SPEED: 4.2,
  FIRE_CHANCE: 0.45,
  FIRE_EXTRA_HEIGHT: 13,

  /* ---------- STEVE THE CAPTAIN ----------
     Pixels of driving between his visits (min + random extra).
     Bigger numbers = he leaves Chris alone longer. */
  CAPTAIN_MIN_GAP: 2200,
  CAPTAIN_GAP_VAR: 2000,

  /* ---------- BRETT (SANTA) ----------
     Pixels between Brett appearances. Bumping him doesn't cost a
     life - Santa just goes flying. */
  BRETT_MIN_GAP: 3800,
  BRETT_GAP_VAR: 3200,

  /* ---------- CHARACTER POSITIONS & TIMING ----------
     Canvas is 320 wide x 180 tall; the ground line is y=152.
     X values are screen positions; Y offsets are px below the
     ground line (positive = closer to the viewer).
     STEVE_X: where Steve holds while running alongside.
     STEVE_Y_OFFSET: Steve's lane (the fence, cow and cowpat
       share it).
     COW_POOP_OFFSET_X: how far ahead of Steve the cow stops to
       do the deed.
     POOP_DELAY_TICKS: how long Steve shouts (ticks, 60/sec)
       before the fence-and-cow sequence starts.
     BRETT_SPAWN_X: where Brett walks in (>320 = off the right
       edge). BRETT_HOLD_X: where he hangs about lecturing.
     BRETT_HOLD_TICKS: how long he stays there before drifting
       back into jumping range. */
  STEVE_X: 178,
  STEVE_Y_OFFSET: 20,
  COW_POOP_OFFSET_X: 150,
  POOP_DELAY_TICKS: 120,
  BRETT_SPAWN_X: 344,
  BRETT_Y_OFFSET: 0,
  BRETT_HOLD_X: 240,
  BRETT_HOLD_TICKS: 160,

  /* CAMEO_COOLDOWN: Steve and Brett are never on screen together.
     This is the px of driving after one leaves before the other
     can turn up, so they don't tag-team you. */
  CAMEO_COOLDOWN: 800,

  /* ---------- MUSIC ----------
     MUSIC: false turns the chiptune off entirely.
     MUSIC_VOLUME: 0..1.
     MUSIC_SPEEDUP: true = the song speeds up as the run does.
     MUSIC_SPEEDUP_RATIO: how much faster at max speed
       (0.5 = 50% faster, 1.0 = double time). */
  MUSIC: true,
  MUSIC_VOLUME: 1,
  MUSIC_SPEEDUP: true,
  MUSIC_SPEEDUP_RATIO: 0.5,

  /* Master trim over every sound effect, on top of each vol below.
     Raise this to bring all the effects up against the music at once. */
  SFX_VOLUME: 1,

  /* ---------- AUDIO SOURCES ----------
     Every sound is generated in code by default. To use your own
     recording instead, flip that sound to 'file' and point src at it.

       use: 'synth'  generated in code (src is ignored)
       use: 'file'   loads src instead
       src:          path relative to index.html
       vol:          loudness trim, synth or file alike (default 1).
                     Above 1 boosts: 2 is twice as loud. The generated
                     effects are quiet next to a mastered music track,
                     so lift the ones you want to cut through.

     A file that is missing, blocked or won't decode silently falls
     back to the synth version, so the game is never left silent.

     Any format the browser can decode works - wav, mp3, ogg, m4a.
     Prefer mp3 or ogg: the wavs in assets/audio are roughly ten
     times the size, which matters on phone data.

     NOTE: loading files needs a web server. On GitHub Pages it just
     works. If you open index.html by double-clicking it, the browser
     blocks file:// fetches and you'll hear the synth instead - run
     "python -m http.server 8000" to test sourced audio locally.

     Music note: with a file, MUSIC_SPEEDUP works by nudging playback
     rate, so the track rises slightly in pitch as it speeds up. */
  AUDIO: {
    music: { use:'file', src:'assets/audio/music/stump-run-loop.wav', vol:0.5 },
    jump:  { use:'synth', src:'assets/audio/sfx/jump.wav',  vol:1 },  // truck leaves the ground
    land:  { use:'synth', src:'assets/audio/sfx/land.wav',  vol:1 },  // touches back down
    medal: { use:'synth', src:'assets/audio/sfx/medal.wav', vol:1 },  // RFS medal collected
    ready: { use:'file', src:'assets/audio/sfx/ready.mp3', vol:1 },  // special meter fills
    punch: { use:'file', src:'assets/audio/sfx/punch.mp3', vol:1 },  // special move fires
    smash: { use:'synth', src:'assets/audio/sfx/smash.wav', vol:1 },  // a stump is destroyed
    pop:   { use:'synth', src:'assets/audio/sfx/pop.wav',   vol:1 },  // cowpat, Brett bumped
    crash: { use:'synth', src:'assets/audio/sfx/crash.wav', vol:1 },  // hit a stump, lose a life
    nag:   { use:'synth', src:'assets/audio/sfx/nag.wav',   vol:1 }   // Steve or Brett turns up
  },

  /* ---------- COMEDY BITS ----------
     Turn parts of Steve's trip sequence on or off.
     SHOW_COW: the cow trots in and drops the pat first.
     SHOW_FENCE: the barbed-wire fence Steve hops before the pat.
     Both false = the pat just scrolls in on its own. */
  SHOW_COW: false,
  SHOW_FENCE: true,

  /* ---------- DEBUG ----------
     true = draw hitboxes and the special attack range. */
  DEBUG_COLLISION_BOXES: false
};
