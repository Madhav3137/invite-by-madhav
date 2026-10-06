// Centralized Animation and Experience Configuration

export const ANIMATION_CONFIG = {
  // Timeline timings in milliseconds matching reference video:
  loadingDuration: 1500,        // 0.0s -> ~1.5s
  spiralFrameInterval: 80,      // interval for spiral animation frames
  revealSettleDuration: 900,    // ~1.5s -> ~2.4s pause before envelope
  envelopeDuration: 1100,       // ~2.4s -> ~3.5s envelope appear & settle
  envelopeOpenDuration: 600,    // envelope opens and card emerges
  
  // Interaction rules:
  noButtonDodgeThreshold: 45,   // distance in px to trigger dodge
  dodgesToKneel: 2,             // after 2 evasions, boy pleads/kneels
  
  // Success & Celebration:
  danceStartDelay: 1200,        // boy jumps to dance 1.2s after success
  danceFrameInterval: 300,      // dance loop alternation speed (ms)
  
  // Outro:
  enableOutro: false,           // disabled per user request
  outroDelayAfterSuccess: 5500, // triggers ~5.5s after YES (~14.5s overall)
  outroFadeInDuration: 800,
  outroInstagramScaleDuration: 700,
  outroHandleDelay: 400,
  outroSunsetGradientDuration: 2200,
  outroWhiteFadeDelay: 2800,
};

export const TEXT_CONTENT = {
  tabTitle: "A Little Surprise ♡",
  headerCaption: "Your sign to ask her out to garba. 🌸",
  questionIntro: "A little question for you...",
  questionLine1: "Mere Sath",
  questionLine2: "garba Khelne Chalogi?? ♡",
  yesButton: "YES ♡",
  noButton: "NO",
  successHeading: "YAYYYYY!! ♡",
  successLine1: "Is bar garba ki",
  successLine2: "fielding settt!! 💕",
  successSub: "LOTS OF LOVE AND FUN AHEAD ♡",
  successDmNotice: "Send me the confirmation in my DMs! 💌",
  instagramHandle: "@CLICKSY.YOURSCUTELY",
};

// Safe positions for evasive NO button in the 478 x 214 scene coordinates:
// Each target has (x, y) relative to the 478 x 214 scene
export const NO_SAFE_POSITIONS = [
  { x: 275, y: 112 },  // Initial: right side inside/adjacent to card
  { x: 305, y: 112 },  // Step 1: pushed slightly further right
  { x: 420, y: 125 },  // Step 2: far right, outside girl (as seen in video frame 5.00s)
  { x: 418, y: 72 },   // Step 3: upper right
  { x: 418, y: 155 },  // Step 4: lower right
  { x: 310, y: 140 },  // Step 5: bottom-right of card
  { x: 310, y: 80 },   // Step 6: top-right of card
];

export const APP_STATES = {
  LOADING: "LOADING",
  REVEAL: "REVEAL",
  ENVELOPE: "ENVELOPE",
  QUESTION: "QUESTION",
  SUCCESS: "SUCCESS",
};
