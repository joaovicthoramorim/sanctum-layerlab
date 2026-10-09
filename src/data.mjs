// SANCTUM — concept by LAYER LAB. All content below is taken from wearesanctum.com (Oct 2026).
// Anything marked [A CONFIRMAR] must be confirmed by Sanctum before going live.

export const config = {
  brand: 'SANCTUM',
  // Final domain unknown for the concept — change in one place.
  domain: 'https://www.wearesanctum.com',
  prototype: true, // adds noindex,nofollow everywhere + blocks crawlers in robots.txt
  booking: 'https://www.wearesanctum.com/daily-classes',
  appStore: 'https://apps.apple.com/app/id6757913161',
  playStore: 'https://play.google.com/store/apps/details?id=com.sanctum.android',
  social: {
    instagram: 'https://www.instagram.com/wearesanctum/',
    spotify: 'https://open.spotify.com/user/6enqzfx85rvh29bpstpxipnls',
    linkedin: 'https://www.linkedin.com/company/sanctum-the-social-wellness-concept',
  },
  email: '[A CONFIRMAR]',
  layerlab: 'https://layerlab.studio', // [A CONFIRMAR] final LAYER LAB url
};

export const press = [
  { quote: 'The future of working out.', source: 'British Vogue & American Vogue' },
  { quote: 'Better than therapy.', source: 'The Times' },
  { quote: 'Sanctum brings people together in a fun way that is unlike anything else.', source: 'Wallpaper*' },
];

export const journey = [
  { id: 'arrival', n: '00', min: '00:00', label: 'Arrival', title: 'You enter.', text: 'The lights go down. The headphones light up. For the next 55 minutes, nothing else exists.' },
  { id: 'ignite', n: '01', min: '08:00', label: 'Ignite', title: 'Move. Sweat. Release.', text: 'High-intensity movement led by music and storytelling. Find your physical edge, together.' },
  { id: 'breathe', n: '02', min: '27:00', label: 'Breathe', title: 'Every breath a bridge.', text: 'Breathwork brings you back into the body. Breathe with us.' },
  { id: 'stillness', n: '03', min: '41:00', label: 'Stillness', title: 'Between who you were and who you are becoming.', text: 'Kundalini, meditation and stillness. The mind quiets. Something shifts.' },
  { id: 'euphoria', n: '04', min: '55:00', label: 'Euphoria', title: 'One class. One ritual.', text: 'A weekly reset to remember what you are made of.' },
];

const T = (q) => q; // testimonials kept verbatim

export const cities = [
  {
    slug: 'london', name: 'London', code: 'LDN', country: 'United Kingdom',
    img: 'studio', intro: 'Sunday rituals in Marylebone, moon specials beneath the vaults of Holy Trinity Church and Sanctum & Sauna in Shoreditch.',
    venues: ['Triplebond, Marylebone', 'Holy Trinity Church, South Kensington', '&Soul, Shoreditch'],
    events: [
      { name: 'Sunday Ritual · Triplebond', venue: 'Triplebond, Marylebone', date: 'Every Sunday in October 2026', time: '10:30', iso: '2026-10-11T10:30', text: 'Start your Sunday differently. An immersive 55-minute ritual of movement, music, breathwork and stillness, designed to reset, reconnect and energise.', url: 'https://www.wearesanctum.com/event/london/new-venue-launch-triplebond' },
      { name: 'New Moon Special', venue: 'Holy Trinity Church, South Kensington', date: '10 October 2026', time: '10:30', iso: '2026-10-10T10:30', text: 'Are you over-giving to keep the peace? This New Moon in Libra invites a reset around balance and boundaries.', url: 'https://www.wearesanctum.com/event/london/new-moon-special' },
      { name: 'Sanctum & Sauna', venue: '&Soul, Shoreditch', date: '25 October 2026', time: '10:30', iso: '2026-10-25T10:30', text: '55 minutes of Sanctum movement, music and breathwork, followed by a 20-minute guided sauna meditation.', url: 'https://www.wearesanctum.com/event/london/sanctum-sauna' },
      { name: 'Full Moon Special', venue: 'Holy Trinity Church, South Kensington', date: '26 October 2026', time: '19:30', iso: '2026-10-26T19:30', text: 'What if enough is already here? This Full Moon in Taurus champions stillness, self-worth and safety.', url: 'https://www.wearesanctum.com/event/london/full-moon-special' },
    ],
    guides: ['Luuk', 'Kaya', 'Meg', 'Amy', 'Abdallah', 'Cassie', 'Jack', 'Fiona', 'Gareth', 'Maria', 'Mani'],
    reviews: [
      T('An incredible experience. Did not expect to work a sweat in this class. Felt so calm and was an amazing way to release stress. A lovely community feel and very different to any other class I’ve done in London. Perfect balance of movement and spirituality.'),
      T('A very different experience but overall an amazing one. The setting and smell of the church was unlike any event I’ve been to. The energy of the class was amazing and whilst I didn’t realise how physically demanding it would be, I am so glad I went and I would recommend to everyone!'),
    ],
  },
  {
    slug: 'amsterdam', name: 'Amsterdam', code: 'AMS', country: 'Netherlands',
    img: 'church', intro: 'Where Sanctum was born. Moon specials in historic synagogues and churches, and ADE nights at Clink.',
    venues: ['Uilenburgersjoel', 'Clink', 'Dominicuskerk'],
    events: [
      { name: 'New Moon in Libra Special', venue: 'Uilenburgersjoel, Amsterdam', date: '11 October 2026', time: '10:00', iso: '2026-10-11T10:00', text: 'Are you over-giving to keep the peace? A reset around balance, boundaries and relating to others without losing yourself.', url: 'https://www.wearesanctum.com/event/amsterdam/new-moonspecial' },
      { name: 'ADE Special', venue: 'Clink, Amsterdam', date: '22 October 2026', time: '19:00', iso: '2026-10-22T19:00', text: 'A 55-minute session of movement, music and breathwork, followed by a non-alcoholic drink before the DJ.', url: 'https://www.wearesanctum.com/event/amsterdam/the-clink' },
      { name: 'Full Moon in Taurus Special', venue: 'Dominicuskerk', date: '26 October 2026', time: '20:00', iso: '2026-10-26T20:00', text: 'What if enough is already here? Ground, feel, appreciate, release and receive.', url: 'https://www.wearesanctum.com/event/amsterdam/full-moon-special' },
    ],
    guides: ['Luuk', 'Kaya', 'Marie', 'Mitchell', 'Larissa', 'Zoe', 'Amber', 'Alicia', 'Michelle', 'Nikki'],
    reviews: [],
  },
  {
    slug: 'dubai', name: 'Dubai', code: 'DXB', country: 'United Arab Emirates',
    img: 'dubai', intro: 'Moon specials at SIRO, One Za’abeel and fully immersive projection classes at TODA.',
    venues: ['SIRO, One Za’abeel', 'TODA, Dubai'],
    events: [
      { name: 'New Moon in Libra Special', venue: 'SIRO, One Za’abeel', date: '10 October 2026', time: '10:00', iso: '2026-10-10T10:00', text: 'A reset around balance, boundaries and staying true to yourself in relationships.', url: 'https://www.wearesanctum.com/event/dubai/new-moon-special' },
      { name: 'Immersive Special', venue: 'TODA, Dubai', date: '18 October 2026', time: '10:00', iso: '2026-10-18T10:00', text: 'A 55-minute class with immersive projections across the walls and ceiling.', url: 'https://www.wearesanctum.com/event/dubai/sanctum-immersive-experience' },
      { name: 'Full Moon in Taurus Special', venue: 'SIRO, One Za’abeel', date: '25 October 2026', time: '10:00', iso: '2026-10-25T10:00', text: 'Stillness, self-worth and releasing the need for more.', url: 'https://www.wearesanctum.com/event/dubai/full-moon-special' },
    ],
    guides: ['Luuk', 'Kaya', 'Phoebe', 'Joanne', 'Elisabeth', 'Daria', 'Soniya'],
    reviews: [T('If you feel stuck, go to Sanctum. Whatever you feel, just go to Sanctum.')],
  },
  {
    slug: 'stockholm', name: 'Stockholm', code: 'STO', country: 'Sweden',
    img: 'chapel', intro: 'Sunday Sanctum + Sauna by the water at Hagastrand.',
    venues: ['Hagastrand, Stockholm'],
    events: [
      { name: 'Sanctum + Sauna', venue: 'Hagastrand, Stockholm', date: 'Sundays, 2026', time: '10:00', iso: '2026-10-11T10:00', text: 'A 55-minute Signature Sequence followed by a 15-minute Sanctum Guided Sauna Ritual.', url: 'https://www.wearesanctum.com/event/stockholm/sanctum-sauna' },
    ],
    guides: ['Luuk', 'Kaya', 'Julia', 'Malin', 'Marius'],
    reviews: [],
  },
  {
    slug: 'new-york', name: 'New York', code: 'NYC', country: 'United States',
    img: 'church', intro: 'Monday nights beneath the Byzantine domes of St Bartholomew’s Church, Manhattan.',
    venues: ['St Bartholomew’s Church, Manhattan', 'Lightning Society, Broadway', 'Othership, Flatiron'],
    events: [
      { name: 'St Bart’s · Mondays', venue: 'St Bartholomew’s Church, Manhattan', date: 'Mondays from 3 August 2026', time: '18:30', iso: '2026-10-12T18:30', text: 'A musical moving meditation, the Sanctum Signature Sequence, combining breathwork, movement and primal exercise beneath Byzantine domes.', url: 'https://www.wearesanctum.com/event/new-york/st-barts' },
      { name: 'Othership Special', venue: 'Othership, Flatiron', date: '[A CONFIRMAR] dates', time: '', iso: '', text: 'A Sanctum session before Othership’s “Guided Up: Feel Good Now”: movement, heat, cold and breath.', url: 'https://www.wearesanctum.com/event/new-york/othership-nyc' },
    ],
    guides: [],
    reviews: [],
  },
];

export const membership = {
  badge: 'Save 50%',
  title: 'Make SANCTUM your ritual.',
  lead: 'Movement you return to. A community you belong to.',
  items: [
    { k: '4', t: 'experiences per month', d: 'Make movement your ritual.' },
    { k: '∞', t: 'digital access', d: 'SANCTUM content whenever and wherever you need it.' },
    { k: '2', t: 'guest passes per month', d: 'Because it feels better together.' },
    { k: '★', t: 'member access', d: 'Priority booking, special events and exclusive benefits.' },
  ],
  cities: ['london', 'amsterdam', 'dubai', 'stockholm'],
  url: 'https://www.wearesanctum.com/memberships',
};

export const digital = {
  title: 'Take a class anytime, anywhere.',
  lead: 'The first fully immersive digital platform blending sound, movement, mindfulness and spectacular locations.',
  features: ['Founder-led and master-guide experiences', 'Iconic locations + cinematic soundscapes', 'Audio-led journeys, no screen needed', 'New experiences every week'],
  categories: ['Morning energizers', 'Daily meditations', 'Nature walks', 'Signature Sequence'],
};

export const privateBookings = {
  title: 'Curated exclusive experiences.',
  lead: 'Private Sanctum sessions for groups, teams and communities looking for a deeper, more visceral form of connection.',
  offers: [
    { name: 'Signature Sequence', dur: '60 min', tag: 'Unstuck, amplify potential, and spark transformation.', text: 'A cathartic, mindful movement experience designed to empower the body and expand the mind.', body: ['Our 60 minute Signature Sequence is a cathartic, mindful movement experience designed to empower the body and expand the mind.', 'Participants are guided to their physical, emotional and mental edge, unlocking new levels of focus, creativity and self-awareness within a shared, energising atmosphere.'], img: '/assets/img/pb-signature.webp' },
    { name: 'Focus Energiser', dur: '10 to 20 min', tag: 'Reignite energy, focus and creativity, anywhere, anytime.', text: 'A condensed, high-impact version of the Sanctum class for offices and conference main stages.', body: ['Perfect for a Friday morning, a mid-day office boost, or as a main stage experience at conferences, this 10 to 20 minute session is a condensed, high-impact version of the Sanctum class.', 'Designed to reconnect participants, spark creativity and energise teams efficiently, wherever they are. Maximum impact in minimal time.'], img: 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6943edcd54f07ef5dd060b64_focus.jpg' },
    { name: 'Mindful Nature Walk', dur: '120 min', tag: 'Reimagine connection within, between and beyond.', text: 'A curated mindful walk through natural landscapes with reflection stations and a Grande Finale.', body: ['One of our most iconic offerings: a 120 minute curated mindful walk through serene natural landscapes, integrating movement and reflection at curated stations along the journey.', 'Each station inspires introspection and connection, culminating in a breathtaking “Grande Finale” that leaves participants energised, aligned and inspired to lead with purpose.'], img: 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6943edcd6ad7239439f5f9c5_nature-walk.jpg' },
    { name: 'Bespoke Experience', dur: 'Tailored', tag: 'Designed around your intention.', text: 'Corporate activations, conferences and private celebrations, designed around your intention.', body: ['Each experience is tailored, from corporate activations and conferences to private celebrations, helping teams and friends bond, release and reset together.', 'Music-driven movement, breath and shared energy, in a venue and format built around your group and what you want them to feel.'], img: '/assets/img/pb-bespoke.webp' },
  ],

  stats: [
    { v: 90, t: 'felt physically empowered after their session' },
    { v: 76, t: 'felt more motivated and creatively stimulated' },
    { v: 69, t: 'felt more connected to others' },
    { v: 68, t: 'reported reduced stress and anxiety' },
  ],
  statsSource: 'Internal Sanctum Survey, 2024 (n = 250)',
  testimonials: [
    { name: 'Iain Stirling', role: 'International Portfolio Director, Mash Media Group', quote: 'The day began with a Morning Energiser by SANCTUM, the global mindful movement helping delegates find peace and perspective before diving into a packed agenda.' },
    { name: 'Mala Dorasamy', role: 'CEO, MITEC', quote: 'This morning at the ICCA Congress, I experienced a truly transformative session ‘Unlocking Eve: The Power of Two Experience’ by SANCTUM. It was unlike anything I’ve encountered before.' },
    { name: 'Guy Heywood', role: 'Professional Luxury Hotelier', quote: 'SANCTUM and their classes … are totally uplifting and fun, not to mention good for you.' },
    { name: 'Ben Lephilibert', role: 'CEO, LightBlue & Co-Founder, The PLEDGE on Food Waste', quote: 'This morning started at 7am with an unexpected CEO meeting coached by mindful wellness experts SANCTUM. I cried twice.' },
  ],
  benefits: [
    ['Strengthens team cohesion and communication', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6937fd34ae756da162042084_image%2030.jpg'],
    ['Enhances focus and creative flow', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6937fd462e016831c11a9b47_image%2032.jpg'],
    ['Reduces stress and burnout', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6937fd5dae756da162042c26_Reduce-stress%201.jpg'],
    ['Fosters belonging and mutual trust', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6924318a2ed5d4cd56895c17_zz%201.webp'],
    ['Promotes holistic wellbeing at work', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6937fd9131f849d669afc7bf_Holistic-wellbeing-at-work%201.jpg'],
  ],
  featured: [
    { kicker: 'Global Wellness Summit', img: 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6993430c3aab3c66fb44d0b0_cf347827a221cef4a19027e01fb91735_Featured-in-IGwithReport-shadow.png', text: 'Wellness is no longer quiet, clinical, or solitary. As recognized by the Global Wellness Summit, the next era of wellbeing is expressive, communal, and neurologically intelligent.', url: 'https://www.wearesanctum.com/articles/article-global-wellness-summit' },
    { kicker: 'World Economic Forum · Davos 2026', logo: 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/699341674d55cfcf7d78409a_09b6dd37df3f693a74bbc6bef80b93af_wef-logo.png', img: 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/69934167fb5b6270bf75e6f6_davos.jpg', text: 'In an era defined by complexity, acceleration, and disconnection, leadership can no longer be purely cognitive.', url: 'https://www.wearesanctum.com/articles/article-sanctum-wef-2026' },
  ],
  partners: [
    ['Publications', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/697f712c3d40ae38080a3013_bbe04727217eb53e79475275c5b7d95e_01-Publications.png'],
    ['Organisations', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/697f830d57c07e0b02e95553_c68890c76219c7b7fe589c7b7619e2a6_02-Organisations.png'],
    ['Fashion & luxury', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/697f830d0b32440d89ac21b9_438918d7c3538c1da0182787b3b94dbc_03-Fashion%20%26%20lux.png'],
    ['Hospitality', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/697f830d40085f76eeb1b8bd_09600698326f149cda204e8cb005da30_04-Hospitality-1.png'],
    ['Hotels & resorts', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/697f830dc251f37c1896a6fa_5e9bd2998434043c5bfcfddc152eeb59_04-Hospitality-2.png'],
  ],

  intentions: ['Team Energy & Alignment', 'Leadership Reset', 'Brand Activation', 'Private Gathering', 'Other'],
  locations: ['Netherlands', 'United Kingdom', 'UAE', 'Sweden', 'Other'],
  url: 'https://www.wearesanctum.com/private-bookings',
};

export const festival = {
  title: 'Frequency Festival',
  tag: 'A collective ritual of connection.',
  lead: 'Sanctum amplified: a large-scale moving ritual where thousands move, breathe and release together inside iconic spaces charged with music, light and emotion.',
  facts: [{ v: '1,000+', t: 'people per edition' }, { v: '3', t: 'hours' }],
  editions: [
    { city: 'Amsterdam', venue: 'Centrale Markthal', date: '26 September 2026' },
    { city: 'London', venue: 'Truman Brewery', date: '27 September 2026' },
  ],
  next: '[A CONFIRMAR] 2027 editions',
  press: [
    { quote: 'Best for: something a little different.', source: 'National Geographic', img: 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6a437b60b4d672465c5313f1_Screenshot%202026-06-30%20at%2009.15.20.jpg', url: 'https://www.nationalgeographic.com/travel/article/best-wellness-festivals-uk' },
    { quote: 'Sanctum brings people together in a fun way that is unlike anything else.', source: 'Wallpaper*', img: 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6a437d5e40e4a2c2f53a2257_Untitled%20design%20(1).jpg', url: 'https://www.wallpaper.com/fashion-beauty/wellness/wellness-report-2025-analogue-living-digital-burnout' },
  ],
  events: [
    { city: 'Amsterdam', venue: 'Centrale Markthal, Amsterdam', date: 'September 26, 2026', img: 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6a4375bd4f00da8fbe17a8e4_MILAN_GOLDBACH_MRG_5979_FULLRES_300dpi_sRGB.jpeg', url: 'https://www.wearesanctum.com/event/amsterdam/frequency-festival' },
    { city: 'London', venue: 'Truman Brewery, London', date: 'September 27, 2026', img: 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6a43789636f30cdad42cc90d_MILAN_GOLDBACH_MRG_5945_FULLRES_300dpi_sRGB.jpeg', url: 'https://www.wearesanctum.com/event/london/frequency-festival' },
  ],
  reels: ['https://s3.amazonaws.com/webflow-prod-assets/6924318a2ed5d4cd56895681/693b0ade16a0dd77ae6ea2de_ff-video-01_v1%20(540p).mp4', 'https://s3.amazonaws.com/webflow-prod-assets/6924318a2ed5d4cd56895681/693b0b553043479744d7ffaf_ff-video-02_v1%20(720p).mp4'],
  benefits: [
    ['Immersive large-scale Sanctum experience', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/69493478f28f33a78ebb03fb_SFF-OLYMPIC-59.jpeg'],
    ['Community of global seekers', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/693b2c7e26e7103652475ba5_ff-benefits-02.jpg'],
    ['World-class sound and lighting design', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/694934b4d1622f5d9b54c1c3_MILAN_GOLDBACH_MRG_5945_FULLRES_300dpi_sRGB.jpeg'],
    ['Transformative energy from start to finish', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/693b2c7e236dc30140aa6e33_ff-benefits-04.jpg'],
    ['Safe, alcohol-free space for true connection', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/693b2c7e04afbed89c99ec83_ff-benefits-05.jpg'],
  ],
  past: ['https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6a4384412a8b82ac751daade_IMG_8599.jpg', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/693b652bfe92fd8e41468046_ff-amsterdam-2025-05.jpg', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/693b652b38c6b299f741c1dd_ff-amsterdam-2025-03.jpg', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/693b652b554c10ab11c31091_ff-amsterdam-2025-01.jpg'],
  reel: 'https://www.instagram.com/reel/DEcJUmUyI3g/',
  url: 'https://www.wearesanctum.com/frequency-festival',
};

export const retreats = [
  { name: 'Crystal Wellness Cruise', place: 'Lisbon → Morocco → Spain', date: '11 to 17 October 2026', iso: '2026-10-11', text: 'A curated voyage through Portugal, Morocco and Spain focused on mental and physical health.', url: 'https://www.crystalcruises.com/cruises/none-cse-006-261011', img: 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6a05e20b67d7b556134cb306_8b32565116d7a6e111fb8b9732f268176ebcc863-4449x2943-p-1600.webp', long: 'The wonders of Portugal, Morocco and Spain serve as a backdrop for this specially curated journey. Tune into your mental and physical health on this transformational voyage.' },
  { name: 'Marbella Club Hotel', place: 'Marbella, Spain', date: '31 October to 1 November 2026', iso: '2026-10-31', text: 'Movement, breathwork and reconnection in Mediterranean gardens.', url: 'https://www.wearesanctum.com/event/international/marbella-club', img: 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/697b63a9062afdd7ec517b11_GLD_7390_LQ-p-1600.jpg', long: 'Join us at the iconic Marbella Club Hotel, where Mediterranean beauty, lush gardens and serene surroundings create the perfect setting to move, breathe and reconnect.' },
  { name: 'Four Seasons Geneva', place: 'Geneva, Switzerland', date: '7 October 2026', iso: '2026-10-07', text: 'An exclusive wellness experience with Spa Mont-Blanc and Club des Bergues.', url: 'https://www.wearesanctum.com/event/international/four-seasons-geneva', img: 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6a82e8da5a890f1415c3ac13_image.png', long: 'This October, Sanctum lands in Geneva for an exclusive wellness experience at the Four Seasons, organised in collaboration with Spa Mont-Blanc and Club des Bergues.' },
];

export const about = {
  lead: 'SANCTUM is an unmatched moving sequence to empower the body and expand the mind, designed to unlock human potential by guiding you to your physical edge and mindful euphoria within a single class.',
  story: 'Founded in Amsterdam and led by founder Luuk Melisse and a collective of experienced Guides, Sanctum draws on kundalini, Zen Buddhism, qigong, somatic movement, HIIT and energy work. The body is the route to the mind: release stress, self-regulate, unblock.',
  purpose: 'To build a worldwide community of happiness and fulfilment through elevated consciousness and connection.',
  reach: ['Olympic stadiums', 'Urban studios in London, Amsterdam and Dubai', 'The World Economic Forum, Davos'],
};

export const faqs = [
  { q: 'What is a Sanctum class?', a: 'A 55-minute, music-led immersive class that fuses high-intensity movement, breathwork, meditation and storytelling. More than a workout, more than meditation.' },
  { q: 'How do I sign up for a class?', a: 'Choose your city, pick a class and buy the package you want. You will need a Sanctum account to complete the booking.' },
  { q: 'What is your cancellation policy?', a: 'You can cancel a reservation up to 12 hours before class. Cancelling inside that window means the credit is lost.' },
  { q: 'Can I join the waitlist when a class is full?', a: 'Yes. A waitlist button appears on full classes. You receive an email confirming your place and another one when a spot opens.' },
  { q: 'I’m pregnant. Can I join?', a: 'Yes. Take extra precautions, listen carefully to your body and let the crew know if you feel comfortable doing so.' },
  { q: 'Is there a minimum age?', a: 'There is no strict minimum, but we advise attendees to be 16 or older. Parents decide what is appropriate for their child.' },
  { q: 'How do I redeem a gift card?', a: 'Enter the unique code and PIN you received by email at checkout.' },
  { q: 'How long is my package valid?', a: 'Each package has its own expiry date, shown on the pricing page of your city.' },
];

export const retreatsPage = {
  hero: 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/694420dc3483f6af8412b1dc_92087732c0603e37a24102aca95ffc0b_Hero-Retreats-Desktop.jpg',
  videos: ['https://s3.amazonaws.com/webflow-prod-assets/6924318a2ed5d4cd56895681/693b13013485c97d1bc66f1a_Sanctum-events-SIRO-Mindful%20Desert%20Hike-480.mov', 'https://s3.amazonaws.com/webflow-prod-assets/6924318a2ed5d4cd56895681/693b11a35073d9ddde54094c_Sanctum-events-six%20senses_alma-480.mov'],
  benefits: [
    ['Transformative travel through mindful movement', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6943b98882c222f7c95c1d07_ca9710740a5b6753d86ad4ac52a5ad2e_GLD_1891_LQ.jpg'],
    ['Expert-guided workshops and sound journeys', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6943c5003502445f5cce775e_GLD_4788_LQ%20(1).jpg'],
    ['Connection with nature and self', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6936d8f8f332082533556bcd_54a9cf76f4ef7f545b74ad5ba66fbc85_DSC07805%201.png'],
    ['Reset for nervous system and creativity', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6943bbdb72a183a6cabe40db_9d1bbdd1a214ea405f0ba72182c8e41f_DSC07928%20%282%29.jpeg'],
    ['Intimate global community', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6943c78fdea94f91c0315fd1_GLD_4486_LQ.jpg'],
  ],
  times: { img: 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/693700fd472659f877f533de_image%2027.jpg', logo: 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/69450e3fb9d1dd20fe3bd67c_image%20(7).png' },
  insta: [
    ['https://www.instagram.com/p/DMxQxcPSxMF/', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/693b32e77d7515b5b57bf7bd_Instagram-01.jpg'],
    ['https://www.instagram.com/p/DQKI65ECgIm/', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/693b32e7c952d708fcb0bd66_Instagram-02.jpg'],
    ['https://www.instagram.com/p/DP5UGhPDN0S/', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/693b32e742ac64473b55e837_Instagram-03.jpg'],
    ['https://www.instagram.com/p/DQvx1IQkv0_/', 'https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/693b32e73968737ab688da6d_227089c8dc5c649cf10c435653ced68d_Instagram-04.jpg'],
  ],
};
