// Where every price on Tagtruth was read. Each deal names one of these by key.
//   name    the deals source (it names the store and the price it saw there)
//   url     the post the price was read in
//   posted  when the source published or last updated that post (UTC)
//   read    when we read it, in our own session (UTC)
// We never quote a price we did not read in one of these posts.

const FEED_READ = '2026-11-27T10:59:00Z';
const ARTICLE_READ = '2026-11-27T11:04:00Z';

export const sources = {
  airpodsLive: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/27/airpods-pro-3-live-100-off-black-friday/', posted: '2026-11-27T08:39:00Z', read: FEED_READ },
  soloStove: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/solo-stove-surround-42-inch-fire-pit/', posted: '2026-11-27T07:47:00Z', read: ARTICLE_READ },
  sonicare: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/black-friday-philips-sonicare-electric-toothbrushes-water-flossers/', posted: '2026-11-27T07:08:00Z', read: ARTICLE_READ },
  lunaUltra: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/insta360-flagship-luna-ultra-8k-camera-gets-its-first-ever-discount-black-friday/', posted: '2026-11-27T07:05:00Z', read: FEED_READ },
  nebula: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/anker-nebula-projector-and-accessory-savings-from-28/', posted: '2026-11-27T05:59:00Z', read: ARTICLE_READ },
  goveeLamp: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/govee-matter-outdoor-lamp-post/', posted: '2026-11-26T16:29:00Z', read: ARTICLE_READ },
  backbone: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/backbone-iphone-android-gaming-controllers-drop-to-60-for-thanksgiving/', posted: '2026-11-26T15:30:00Z', read: FEED_READ },
  appleAudio: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/best-black-friday-deal-already-live-airpods-pro-3/', posted: '2026-11-26T15:11:00Z', read: FEED_READ },
  games: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/20-best-switch-2-ps5-game-deals-thanksgiving-day/', posted: '2026-11-26T14:35:00Z', read: FEED_READ },
  hub: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/thanksgiving-deals-hub-best-now-live/', posted: '2026-11-26T14:08:00Z', read: FEED_READ },
  odyssey: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/samsung-5k-dual-mode-odyssey-g8-gaming-monitor-new-all-time-low/', posted: '2026-11-26T13:00:00Z', read: FEED_READ },
  goveeWall: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/govee-matter-outdoor-updown-wall-light-2-pack/', posted: '2026-11-26T08:56:00Z', read: ARTICLE_READ },
  eastOak: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/east-oak-30-inch-electric-smoker/', posted: '2026-11-26T08:37:00Z', read: ARTICLE_READ },
  p9: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/samsung-512gb-p9-switch-2-express-microsd-card-hits-lowest-since-price-hikes-2/', posted: '2026-11-26T08:33:00Z', read: FEED_READ },
  egoMower: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/ego-21-inch-select-cut-touch-drive-cordless-lawn-mower-with-2x-batteries/', posted: '2026-11-26T07:40:00Z', read: ARTICLE_READ },
  ninjaWaffle: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/ninja-waffle-maker-pro-black-friday/', posted: '2026-11-26T07:05:00Z', read: ARTICLE_READ },
  gamesirX5: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/gamesir-all-new-xbox-25th-anniversary-controller-discounted-black-friday/', posted: '2026-11-26T05:28:00Z', read: FEED_READ },
  eveAqua: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/eve-aqua-homekit-smart-water-controller/', posted: '2026-11-25T17:58:00Z', read: ARTICLE_READ },
  worx: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/worx-40v-20-inch-cordless-powershare-snow-blower-2x-batteries/', posted: '2026-11-25T17:21:00Z', read: ARTICLE_READ },
  ugreenCharger: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/ugreen-pocket-sized-qi2-2-25w-magflow-pro-travel-charger-over-50-off/', posted: '2026-11-25T17:19:00Z', read: FEED_READ },
  verbatim: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/best-black-friday-ssd-deal-keychain-sized-512gb-drive-all-time-low/', posted: '2026-11-25T16:41:00Z', read: FEED_READ },
  airwrap: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/dyson-airwrap-i-d-multi-styler-with-chitosan-serum-2/', posted: '2026-11-25T15:34:00Z', read: ARTICLE_READ },
  legionGo: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/black-friday-discount-lenovo-legion-go-s-steamos-handheld/', posted: '2026-11-25T15:04:00Z', read: FEED_READ },
  switchGames: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/black-friday-nintendo-switch-2-console-bundle-under-tree/', posted: '2026-11-25T14:20:00Z', read: FEED_READ },
  alienware: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/one-of-the-best-black-friday-gaming-monitor-deals-alienware-4k-display/', posted: '2026-11-25T14:10:00Z', read: FEED_READ },
  egoNexus: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/egos-nexus-1400w-portable-inverter-and-generator/', posted: '2026-11-25T14:05:00Z', read: ARTICLE_READ },
  egoLight: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/ego-foldable-portable-area-light/', posted: '2026-11-25T13:01:00Z', read: ARTICLE_READ },
  mxMaster: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/logitech-mx-master-3s-just-hit-its-lowest-price-for-black-friday-week/', posted: '2026-11-25T12:07:00Z', read: FEED_READ },
  dysonV9: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/24/dyson-v9-motorbar-cordless-vacuum/', posted: '2026-11-24T22:14:00Z', read: ARTICLE_READ },
  hisenseC3: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/24/hisense-c3-triple-color-rgb-smart-laser-projector-black-friday/', posted: '2026-11-24T20:47:00Z', read: ARTICLE_READ },
  pocketTaco: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/24/gamesir-pocket-taco-black-friday-all-time-low/', posted: '2026-11-24T18:57:00Z', read: ARTICLE_READ },
  redtiger: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/24/redtiger-4k-dash-cam-deals/', posted: '2026-11-24T17:56:00Z', read: ARTICLE_READ },
  hisenseM2: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/24/hisense-m2-pro-triple-laser-smart-portable-projector-black-friday/', posted: '2026-11-24T17:31:00Z', read: ARTICLE_READ },
  ugreenBank: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/24/ugreen-liquid-cooled-25w-qi2-2-magsafe-power-bank-new-all-time-low/', posted: '2026-11-24T16:26:00Z', read: FEED_READ },
  greenworks: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/24/greenworks-cordless-snow-blower-and-snow-shovel-kits-black-friday/', posted: '2026-11-24T15:51:00Z', read: ARTICLE_READ },
  g309: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/24/logitech-g309-lightspeed-gaming-mouse-54-off-black-friday/', posted: '2026-11-24T14:53:00Z', read: FEED_READ },
  appleDuo: { name: '9to5Mac', url: 'https://9to5mac.com/2026/11/23/these-are-my-two-must-have-iphone-duo-accessories/', posted: '2026-11-24T14:45:00Z', read: FEED_READ },
  techbargains: { name: 'TechBargains', url: 'https://www.techbargains.com/rss.xml', posted: '2026-11-27T10:55:00Z', read: '2026-11-27T10:58:00Z' },
};
