/* Renders the game's procedural audio to .wav files in assets/audio/.
   The game itself synthesises these live via WebAudio - these files are
   the same sounds baked out for reuse (trailers, edits, other engines).

   Run:  node tools/make-audio.js
*/
const fs = require('fs');
const path = require('path');

const RATE = 44100;
const OUT_SFX = path.join(__dirname, '..', 'assets', 'audio', 'sfx');
const OUT_MUS = path.join(__dirname, '..', 'assets', 'audio', 'music');

/* ---------- tiny synth ---------- */
function osc(type, freq, i){
  const p = (i * freq / RATE) % 1;
  if(type === 'square')   return p < .5 ? 1 : -1;
  if(type === 'sawtooth') return 2*p - 1;
  if(type === 'triangle') return 4*Math.abs(p - .5) - 1;
  if(type === 'noise')    return Math.random()*2 - 1;
  return Math.sin(2*Math.PI*p);                       // sine
}
// exponential ramp between two values, matching WebAudio's curve
const ramp = (a, b, tt) => a * Math.pow(Math.max(b,1e-4)/Math.max(a,1e-4), tt);

function render(dur, fn){
  const n = (RATE*dur)|0, buf = new Float32Array(n);
  for(let i=0;i<n;i++) buf[i] = fn(i/RATE, i);
  return buf;
}
function mix(...bufs){
  const n = Math.max(...bufs.map(b=>b.length)), out = new Float32Array(n);
  for(const b of bufs) for(let i=0;i<b.length;i++) out[i]+=b[i];
  return out;
}
function writeWav(file, buf){
  const n = buf.length, b = Buffer.alloc(44 + n*2);
  b.write('RIFF',0); b.writeUInt32LE(36+n*2,4); b.write('WAVE',8);
  b.write('fmt ',12); b.writeUInt32LE(16,16); b.writeUInt16LE(1,20);
  b.writeUInt16LE(1,22); b.writeUInt32LE(RATE,24); b.writeUInt32LE(RATE*2,28);
  b.writeUInt16LE(2,32); b.writeUInt16LE(16,34);
  b.write('data',36); b.writeUInt32LE(n*2,40);
  for(let i=0;i<n;i++){
    const s = Math.max(-1, Math.min(1, buf[i]));
    b.writeInt16LE((s*32767)|0, 44+i*2);
  }
  fs.mkdirSync(path.dirname(file), {recursive:true});
  fs.writeFileSync(file, b);
  console.log('wrote', path.relative(path.join(__dirname,'..'), file), (b.length/1024).toFixed(1)+'kb');
}

/* ---------- sound effects (mirrors sfx() in index.html) ---------- */
const SFX = {
  jump:  () => render(.20, (t,i)=> osc('square', ramp(230,540,Math.min(t/.12,1)), i) * .07*ramp(1,.001,Math.min(t/.18,1))),
  land:  () => render(.10, (t,i)=> osc('square', ramp(160,90,Math.min(t/.07,1)), i) * .05*ramp(1,.001,Math.min(t/.09,1))),
  medal: () => render(.17, (t,i)=> osc('sine',   ramp(920,1500,Math.min(t/.09,1)), i) * .09*ramp(1,.001,Math.min(t/.16,1))),
  ready: () => render(.32, (t,i)=> osc('square', t<.09?660:t<.18?880:1320, i) * .08*ramp(1,.001,Math.min(t/.3,1))),
  punch: () => render(.42, (t,i)=> osc('sawtooth', ramp(120,30,Math.min(t/.35,1)), i) * .16*ramp(1,.001,Math.min(t/.4,1))),
  pop:   () => render(.13, (t,i)=> osc('square', ramp(420,120,Math.min(t/.1,1)), i) * .06*ramp(1,.001,Math.min(t/.12,1))),
  crash: () => render(.62, (t,i)=> osc('triangle', ramp(150,28,Math.min(t/.55,1)), i) * .15*ramp(1,.001,Math.min(t/.6,1))),
  nag:   () => render(.28, (t,i)=> osc('square', t<.09?520:t<.18?390:470, i) * .06*ramp(1,.001,Math.min(t/.26,1))),
  // the STUMP SMASH: deep boom + woody crack of noise
  smash: () => mix(
    render(.36, (t,i)=> osc('sawtooth', ramp(180,35,Math.min(t/.3,1)), i) * .18*ramp(1,.001,Math.min(t/.35,1))),
    render(.12, (t)=> (Math.random()*2-1) * .15 * (1 - t/.12))
  )
};

/* ---------- music loop (mirrors musicLoop() in index.html) ---------- */
const MEL  = [0,null,12,null, 7,3,7,null, 0,null,12,null, 8,7,3,null, 8,null,15,null, 12,8,12,null, 10,null,14,null, 12,10,7,5];
const BARS = [0,0,8,10];
function music(stepDur){
  const steps = 32, total = steps*stepDur;
  const out = new Float32Array((RATE*total)|0);
  const add = (start, dur, type, freq, vol) => {
    const s0 = (RATE*start)|0, n = (RATE*dur)|0;
    for(let i=0;i<n && s0+i<out.length;i++)
      out[s0+i] += osc(type, freq, i) * vol * ramp(1,.001,i/n);
  };
  for(let s=0;s<steps;s++){
    const at = s*stepDur, m = MEL[s];
    if(m!==null) add(at, .09, 'square',   220*Math.pow(2,m/12), .08);
    add(at, .08, 'sawtooth', 110*Math.pow(2,BARS[(s>>3)%4]/12), .07);
    if(s&1)     add(at, .02, 'square', 5200, .02);
  }
  return out;
}

for(const [name, make] of Object.entries(SFX)) writeWav(path.join(OUT_SFX, name+'.wav'), make());
writeWav(path.join(OUT_MUS, 'stump-run-loop.wav'),      music(.135));   // starting tempo
writeWav(path.join(OUT_MUS, 'stump-run-loop-fast.wav'), music(.090));   // max-speed tempo
