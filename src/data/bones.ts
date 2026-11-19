// Bone list, full-collection route and shopping list, from the
// "Rag and Bone Man III – Bone List" Sheet.

export interface Bone {
  name: string;
  location: string;
  slayer?: number;
  quest?: string;
}

export const BONES: Bone[] = [
  { name: 'Angry Giant Rat', location: "Tolna's rift", quest: "A Soul's Bane" },
  { name: 'Ankou', location: 'Stronghold of Security' },
  { name: 'Armoured Zombie', location: "Zemouregal's base", quest: 'Defender of Varrock (start)' },
  { name: 'Aviansie', location: 'God Wars Dungeon', quest: 'Troll Stronghold (partial)' },
  { name: 'Blue Dragon', location: 'Taverley Dungeon' },
  { name: 'Boar', location: 'West of Kourend Castle' },
  { name: 'Catablepon', location: 'Stronghold of Security' },
  { name: 'Cave Horror', location: "Mos Le'Harmless Cave", slayer: 58, quest: 'Cabin Fever' },
  { name: 'Chicken', location: 'Lumbridge' },
  { name: 'Colonel Radick', location: 'Yanille west gate' },
  { name: 'Cow', location: 'Lumbridge' },
  { name: 'Crawling Hand', location: 'Slayer Tower', slayer: 5, quest: 'Priest in Peril' },
  { name: 'Crocodile', location: 'Kharidian Desert' },
  { name: 'Cyclops', location: "Warriors' Guild (130 Att+Str)" },
  { name: 'Druid', location: 'Taverley' },
  { name: 'Fox', location: 'East of Hosidius Kitchen' },
  { name: 'Frogeel', location: 'Tower of Life', quest: 'Tower of Life' },
  { name: 'Gnome Child', location: 'Grand Tree' },
  { name: 'Goat', location: 'Kharidian Desert' },
  { name: 'Hill Giant', location: 'Edgeville Dungeon' },
  { name: 'Infernal Mage', location: 'Slayer Tower', slayer: 45, quest: 'Priest in Peril' },
  { name: 'Lizardman', location: 'Lizardman Canyon' },
  { name: 'Lynx', location: "South of Shayzien's Secluded Chapel" },
  { name: 'Minotaur', location: 'Stronghold of Security' },
  { name: 'Ork', location: 'God Wars Dungeon', quest: 'Troll Stronghold (partial)' },
  { name: 'Sorebones', location: 'Harmony Island', quest: 'Great Brain Robbery (start)' },
  { name: 'Tortoise', location: 'Tree Gnome Stronghold' },
  { name: 'Turoth', location: 'Fremennik Slayer Dungeon', slayer: 55 },
  { name: 'Ugthanki', location: 'Kharidian Desert' },
  { name: 'Wallasalki', location: 'Waterbirth Island Dungeon' },
];

export interface Stop {
  /** A bone's name, or null for a bank stop. */
  bone: string | null;
  location: string;
  travel: string;
  notes?: string;
}

export interface Trip {
  name: string;
  stops: Stop[];
}

export const ROUTE: Trip[] = [
  {
    name: 'Silvarea',
    stops: [
      {
        bone: null,
        location: 'Varrock East bank',
        travel: 'Varrock Teleport',
        notes: 'Load: grubby key, Digsite pendant, amulet of glory, combat gear, food',
      },
      {
        bone: 'Armoured Zombie',
        location: "Zemouregal's base",
        travel: 'Walk east to the Odd Old Man; base is north of Silvarea at the Wilderness border',
        notes: 'Grubby key',
      },
      {
        bone: 'Angry Giant Rat',
        location: "Tolna's rift",
        travel: 'East of Varrock, just north-west of the Digsite',
      },
    ],
  },
  {
    name: 'Stronghold of Security',
    stops: [
      {
        bone: null,
        location: 'Edgeville bank',
        travel: 'Amulet of glory to Edgeville (lands by the bank)',
        notes: 'Drop the grubby key and pendant; top up food',
      },
      { bone: 'Minotaur', location: 'Stronghold level 1', travel: 'Walk to Barbarian Village' },
      { bone: 'Catablepon', location: 'Stronghold level 2', travel: 'Continue down' },
      { bone: 'Ankou', location: 'Stronghold level 4', travel: 'Continue down' },
    ],
  },
  {
    name: 'Lumbridge',
    stops: [
      { bone: 'Chicken', location: 'Lumbridge farms', travel: 'Lumbridge Home Teleport' },
      { bone: 'Cow', location: 'Lumbridge farms', travel: 'Walk' },
      {
        bone: null,
        location: "Lumbridge Castle cellar (Culinaromancer's Chest)",
        travel: 'Walk back to the castle, down to the cellar',
        notes:
          'Load for trips 4–5: Falador Teleport, dusty key, anti-dragon shield, games necklace',
      },
    ],
  },
  {
    name: 'Taverley',
    stops: [
      {
        bone: 'Druid',
        location: 'Taverley',
        travel:
          'Falador Teleport, walk west (Falador West bank is on the way if you forgot anything)',
      },
      {
        bone: 'Blue Dragon',
        location: 'Taverley Dungeon',
        travel: 'Dungeon entrance south of Taverley',
        notes: 'Dusty key or 70 Agility shortcut; anti-dragon shield',
      },
      { bone: 'Hill Giant', location: 'Taverley Dungeon', travel: 'Same dungeon' },
    ],
  },
  {
    name: 'Burthorpe',
    stops: [
      {
        bone: null,
        location: "Warriors' Guild (ground floor)",
        travel: 'Games necklace to Burthorpe, walk into the guild',
        notes:
          'Swap for GWD: climbing boots, rope, crossbow, mithril grapple, hammer; add slayer ring',
      },
      {
        bone: 'Cyclops',
        location: "Warriors' Guild",
        travel: 'Upper floor of the guild',
        notes: '130 combined Att+Str; food for tokens',
      },
      {
        bone: 'Aviansie',
        location: "God Wars Dungeon (Armadyl's Eyrie)",
        travel: "Climb past Death Plateau to Dad, then north to the dungeon's hole",
        notes:
          'Troll Stronghold (partial); climbing boots; rope (first time); 60 Str or Agi; 70 Ranged, crossbow, mithril grapple',
      },
      {
        bone: 'Ork',
        location: "God Wars Dungeon (Bandos' Stronghold)",
        travel: 'Same dungeon',
        notes: '70 Strength, hammer',
      },
    ],
  },
  {
    name: 'Kandarin',
    stops: [
      {
        bone: 'Gnome Child',
        location: 'Grand Tree',
        travel: 'Slayer ring to Stronghold Slayer Cave, walk to the Grand Tree',
      },
      { bone: 'Tortoise', location: 'Gnome Stronghold pen (NW of Grand Tree)', travel: 'Walk' },
      {
        bone: 'Colonel Radick',
        location: 'Yanille west gate',
        travel: 'Minigame teleport to Nightmare Zone (north-west of Yanille bank)',
        notes: 'Answer "foe" to fight him',
      },
      {
        bone: null,
        location: 'Yanille bank',
        travel: 'Next to Nightmare Zone',
        notes:
          "Drop GWD gear. Load: giant frog legs + raw cave eel; witchwood icon, light source, Mos le'harmless teleport scroll",
      },
      {
        bone: 'Frogeel',
        location: 'Tower of Life',
        travel: 'Walk east from Yanille to the Tower of Life (south of East Ardougne)',
        notes: 'Giant frog legs + raw cave eel (unnoted)',
      },
    ],
  },
  {
    name: 'Morytania',
    stops: [
      {
        bone: 'Crawling Hand',
        location: 'Slayer Tower',
        travel: 'Slayer ring to Slayer Tower',
        notes: '5 Slayer',
      },
      { bone: 'Infernal Mage', location: 'Slayer Tower', travel: 'Same tower', notes: '45 Slayer' },
      {
        bone: 'Sorebones',
        location: 'Harmony Island church',
        travel:
          "Mos le'harmless teleport scroll (or Trouble Brewing minigame teleport if 20 min have passed), then Brother Tranquility north of the docks",
      },
      {
        bone: 'Cave Horror',
        location: "Mos Le'Harmless Cave",
        travel: "Brother Tranquility back to Mos Le'Harmless",
        notes: '58 Slayer; witchwood icon; light source',
      },
      {
        bone: null,
        location: "Mos Le'Harmless bank (in the port)",
        travel: 'Walk to the port',
        notes:
          'Last bank until Kourend. Load desert + Fremennik gear: coins (Shantay pass, carpet, Jarvald), waterskins, leaf-bladed weapon or broad ammo, pet rock, glory',
      },
    ],
  },
  {
    name: 'Desert',
    stops: [
      {
        bone: 'Ugthanki',
        location: 'South of Shantay Pass',
        travel:
          'Amulet of glory to Al Kharid, walk to Shantay Pass (bank chest there if you forgot anything)',
        notes: 'Shantay pass',
      },
      { bone: 'Goat', location: 'North of Pollnivneach', travel: 'Magic carpet to Pollnivneach' },
      { bone: 'Crocodile', location: 'River Elid, south of Pollnivneach', travel: 'Walk south' },
    ],
  },
  {
    name: 'Fremennik',
    stops: [
      {
        bone: 'Turoth',
        location: 'Fremennik Slayer Dungeon',
        travel: 'Slayer ring to Fremennik Slayer Dungeon',
        notes: '55 Slayer; leaf-bladed weapon, broad arrows/bolts, or Magic Dart',
      },
      { bone: 'Fox', location: 'South-east of Rellekka', travel: 'Walk north' },
      {
        bone: 'Wallasalki',
        location: 'Waterbirth Island Dungeon',
        travel: 'Jarvald in Rellekka',
        notes: 'Pet rock (or a second player) for the door',
      },
    ],
  },
  {
    name: 'Kourend',
    stops: [
      {
        bone: null,
        location: "Land's End bank chest (Hugor's house)",
        travel: "Amulet of glory to Draynor, walk to Port Sarim; Veos's ship to Land's End",
        notes: 'Drop Fremennik gear; load for the last trip',
      },
      {
        bone: 'Lizardman',
        location: 'Lizardman Canyon',
        travel: 'Walk',
        notes: "Lizardmen drop Xeric's talisman",
      },
      { bone: 'Lynx', location: "South of Shayzien's Secluded Chapel", travel: 'Walk' },
      { bone: 'Boar', location: 'West of Kourend Castle', travel: 'Walk' },
    ],
  },
];

export interface ShoppingItem {
  item: string;
  qty: string;
  neededFor: string;
  loadAt: string;
  source: string;
}

export const SHOPPING: ShoppingItem[] = [
  {
    item: 'Pots and jugs of vinegar',
    qty: '30 of each',
    neededFor: 'Polishing every bone (boil on a fire or range)',
    loadAt: 'Before starting',
    source: 'Vinegar: Fortunato, Draynor. Pots: general stores',
  },
  {
    item: 'Amulet of glory',
    qty: '1 (3+ charges)',
    neededFor: 'Teleports: Edgeville, Al Kharid, Draynor',
    loadAt: 'Varrock East',
    source: 'Grand Exchange',
  },
  {
    item: 'Slayer ring',
    qty: '1 (3+ charges)',
    neededFor: 'Teleports: Stronghold Slayer Cave, Slayer Tower, Fremennik Slayer Dungeon',
    loadAt: "Warriors' Guild",
    source: 'Slayer Rewards shop (75 points) or craft (75 Crafting)',
  },
  {
    item: 'Varrock Teleport',
    qty: '1',
    neededFor: 'Start of route',
    loadAt: 'Before starting',
    source: 'Runes or tablet (Grand Exchange)',
  },
  {
    item: 'Falador Teleport',
    qty: '1',
    neededFor: 'Trip 4 (Taverley)',
    loadAt: 'Lumbridge',
    source: 'Runes or tablet (Grand Exchange)',
  },
  {
    item: 'Games necklace',
    qty: '1',
    neededFor: 'Trip 5 (Burthorpe)',
    loadAt: 'Lumbridge',
    source: 'Grand Exchange',
  },
  {
    item: "Mos le'harmless teleport scroll",
    qty: '1',
    neededFor: 'Trip 7 (Morytania)',
    loadAt: 'Yanille',
    source: 'Grand Exchange',
  },
  {
    item: 'Grubby key',
    qty: '1',
    neededFor: 'Armoured Zombie',
    loadAt: 'Varrock East',
    source: 'From Defender of Varrock',
  },
  {
    item: 'Digsite pendant',
    qty: '1',
    neededFor: 'Angry Giant Rat (optional; can walk from Varrock)',
    loadAt: 'Varrock East',
    source: 'Grand Exchange',
  },
  {
    item: 'Dusty key',
    qty: '1',
    neededFor: 'Blue Dragon (skip with 70 Agility)',
    loadAt: 'Lumbridge',
    source: "Trapped explorer in the Black Knights' area, or the Legends' Guild",
  },
  {
    item: 'Anti-dragon shield',
    qty: '1',
    neededFor: 'Blue Dragon',
    loadAt: 'Lumbridge',
    source: 'Duke Horacio, Lumbridge Castle',
  },
  {
    item: 'Climbing boots',
    qty: '1',
    neededFor: 'Reaching the God Wars Dungeon',
    loadAt: "Warriors' Guild",
    source: 'Grand Exchange',
  },
  {
    item: 'Rope',
    qty: '1',
    neededFor: 'God Wars Dungeon entrance (first time only)',
    loadAt: "Warriors' Guild",
    source: 'Grand Exchange or general store',
  },
  {
    item: 'Crossbow + mithril grapple',
    qty: '1 each',
    neededFor: "Aviansie (Armadyl's Eyrie)",
    loadAt: "Warriors' Guild",
    source: 'Grand Exchange',
  },
  {
    item: 'Hammer',
    qty: '1',
    neededFor: "Ork (Bandos' Stronghold)",
    loadAt: "Warriors' Guild",
    source: 'General store',
  },
  {
    item: 'Giant frog legs',
    qty: '1',
    neededFor: 'Frogeel (Creature Creation)',
    loadAt: 'Yanille',
    source: 'Grand Exchange',
  },
  {
    item: 'Raw cave eel',
    qty: '1 (unnoted)',
    neededFor: 'Frogeel (Creature Creation)',
    loadAt: 'Yanille',
    source: 'Grand Exchange',
  },
  {
    item: 'Witchwood icon',
    qty: '1',
    neededFor: 'Cave Horror',
    loadAt: 'Yanille',
    source: 'Slayer master',
  },
  {
    item: 'Light source',
    qty: '1',
    neededFor: "Mos Le'Harmless Cave",
    loadAt: 'Yanille',
    source: 'Grand Exchange (a lantern is easiest)',
  },
  {
    item: 'Leaf-bladed weapon, broad arrows/bolts, or Magic Dart runes',
    qty: '1 set',
    neededFor: 'Turoth',
    loadAt: "Mos Le'Harmless",
    source: 'Slayer master or Grand Exchange',
  },
  {
    item: 'Pet rock',
    qty: '1',
    neededFor: 'Wallasalki (door on sublevel 1)',
    loadAt: "Mos Le'Harmless",
    source: 'From The Fremennik Trials; or bring a second player',
  },
  {
    item: 'Waterskins',
    qty: '2–3',
    neededFor: 'Trip 8 (Desert)',
    loadAt: "Mos Le'Harmless",
    source: 'Grand Exchange or Shantay Pass shop',
  },
  {
    item: 'Coins',
    qty: 'A few thousand',
    neededFor: 'Shantay pass, magic carpet, Jarvald, Veos',
    loadAt: "Mos Le'Harmless",
    source: '—',
  },
  {
    item: 'Combat gear + food',
    qty: '—',
    neededFor: 'Whole route',
    loadAt: 'Every bank stop',
    source: '—',
  },
];
