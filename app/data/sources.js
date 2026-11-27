// Where every price on Tagtruth was read. Each deal names one of these by key.
//   name    the deals source (it names the store and the price it saw there)
//   url     the post the price was read in (TechBargains publishes its deals only as a feed whose items link
//           straight to the store, so the feed itself is the page we read)
//   posted  when the source published or last updated that post (UTC)
//   read    when we read it, in our own session (UTC)
// We never quote a price we did not read in one of these posts.

const FEED_READ = '2026-11-27T10:59:00Z';

export const sources = {
  airpodsLive: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/27/airpods-pro-3-live-100-off-black-friday/', posted: '2026-11-27T08:39:00Z', read: FEED_READ },
  lunaUltra: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/insta360-flagship-luna-ultra-8k-camera-gets-its-first-ever-discount-black-friday/', posted: '2026-11-27T07:05:00Z', read: FEED_READ },
  backbone: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/backbone-iphone-android-gaming-controllers-drop-to-60-for-thanksgiving/', posted: '2026-11-26T15:30:00Z', read: FEED_READ },
  appleAudio: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/best-black-friday-deal-already-live-airpods-pro-3/', posted: '2026-11-26T15:11:00Z', read: FEED_READ },
  games: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/20-best-switch-2-ps5-game-deals-thanksgiving-day/', posted: '2026-11-26T14:35:00Z', read: FEED_READ },
  hub: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/thanksgiving-deals-hub-best-now-live/', posted: '2026-11-26T14:08:00Z', read: FEED_READ },
  odyssey: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/samsung-5k-dual-mode-odyssey-g8-gaming-monitor-new-all-time-low/', posted: '2026-11-26T13:00:00Z', read: FEED_READ },
  p9: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/26/samsung-512gb-p9-switch-2-express-microsd-card-hits-lowest-since-price-hikes-2/', posted: '2026-11-26T08:33:00Z', read: FEED_READ },
  gamesirX5: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/gamesir-all-new-xbox-25th-anniversary-controller-discounted-black-friday/', posted: '2026-11-26T05:28:00Z', read: FEED_READ },
  ugreenCharger: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/ugreen-pocket-sized-qi2-2-25w-magflow-pro-travel-charger-over-50-off/', posted: '2026-11-25T17:19:00Z', read: FEED_READ },
  verbatim: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/best-black-friday-ssd-deal-keychain-sized-512gb-drive-all-time-low/', posted: '2026-11-25T16:41:00Z', read: FEED_READ },
  legionGo: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/black-friday-discount-lenovo-legion-go-s-steamos-handheld/', posted: '2026-11-25T15:04:00Z', read: FEED_READ },
  switchGames: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/black-friday-nintendo-switch-2-console-bundle-under-tree/', posted: '2026-11-25T14:20:00Z', read: FEED_READ },
  alienware: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/one-of-the-best-black-friday-gaming-monitor-deals-alienware-4k-display/', posted: '2026-11-25T14:10:00Z', read: FEED_READ },
  mxMaster: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/25/logitech-mx-master-3s-just-hit-its-lowest-price-for-black-friday-week/', posted: '2026-11-25T12:07:00Z', read: FEED_READ },
  ugreenBank: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/24/ugreen-liquid-cooled-25w-qi2-2-magsafe-power-bank-new-all-time-low/', posted: '2026-11-24T16:26:00Z', read: FEED_READ },
  g309: { name: '9to5Toys', url: 'https://9to5toys.com/2026/11/24/logitech-g309-lightspeed-gaming-mouse-54-off-black-friday/', posted: '2026-11-24T14:53:00Z', read: FEED_READ },
  appleDuo: { name: '9to5Mac', url: 'https://9to5mac.com/2026/11/23/these-are-my-two-must-have-iphone-duo-accessories/', posted: '2026-11-24T14:45:00Z', read: FEED_READ },
  techbargains: { name: 'TechBargains deals feed', url: 'https://www.techbargains.com/rss.xml', posted: '2026-11-27T10:55:00Z', read: '2026-11-27T10:58:00Z' },
};
