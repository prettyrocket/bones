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
  { name: 'Gnome Child', location: 'Grand Tree (second floor)' },
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
  /** Shown as small tags under the stop. */
  notes: string[];
  /** Shopping list items (by their `item` name) that you load at this bank. */
  loads: string[];
}

export interface Trip {
  name: string;
  stops: Stop[];
}

const bank = (
  location: string,
  travel: string,
  loads: string[] = [],
  notes: string[] = [],
): Stop => ({
  bone: null,
  location,
  travel,
  loads,
  notes,
});

const bone = (name: string, location: string, travel: string, notes: string[] = []): Stop => ({
  bone: name,
  location,
  travel,
  loads: [],
  notes,
});

export const ROUTE: Trip[] = [
  {
    name: 'Silvarea',
    stops: [
      bank('Varrock East bank', 'Varrock Teleport', [
        'Amulet of glory (3)',
        'Grubby key',
        'Digsite pendant',
      ]),
      bone(
        'Armoured Zombie',
        "Zemouregal's base",
        'Walk east to the Odd Old Man; the base is north of Silvarea at the Wilderness border',
        ['Grubby key'],
      ),
      bone('Angry Giant Rat', "Tolna's rift", 'East of Varrock, just north-west of the Digsite'),
    ],
  },
  {
    name: 'Stronghold of Security',
    stops: [
      bank(
        'Edgeville bank',
        'Amulet of glory to Edgeville (lands by the bank)',
        [],
        ['Drop the grubby key and pendant', 'Top up food'],
      ),
      bone('Minotaur', 'Stronghold level 1', 'Walk to Barbarian Village'),
      bone('Catablepon', 'Stronghold level 3 (Pit of Pestilence)', 'Continue down past level 2'),
      bone('Ankou', 'Stronghold level 4', 'Continue down'),
    ],
  },
  {
    name: 'Lumbridge',
    stops: [
      bone('Chicken', 'Lumbridge farms', 'Lumbridge Home Teleport'),
      bone('Cow', 'Lumbridge farms', 'Walk'),
      bank(
        "Lumbridge Castle cellar (Culinaromancer's Chest)",
        'Walk back to the castle, down to the cellar',
        ['Falador Teleport', 'Games necklace', 'Dusty key', 'Anti-dragon shield'],
        ['For trips 4–5'],
      ),
    ],
  },
  {
    name: 'Taverley',
    stops: [
      bone(
        'Druid',
        'Taverley',
        'Falador Teleport, walk west (Falador West bank is on the way if you forgot anything)',
      ),
      bone('Blue Dragon', 'Taverley Dungeon', 'Dungeon entrance south of Taverley', [
        'Dusty key or 70 Agility shortcut',
        'Anti-dragon shield',
      ]),
      bone('Hill Giant', 'Taverley Dungeon', 'Same dungeon'),
    ],
  },
  {
    name: 'Burthorpe',
    stops: [
      bank(
        "Warriors' Guild (ground floor)",
        'Games necklace to Burthorpe, walk into the guild',
        ['Slayer ring (3)', 'Climbing boots', 'Rope', 'Crossbow + mithril grapple', 'Hammer'],
        ['Swap gear for the God Wars Dungeon'],
      ),
      bone('Cyclops', "Warriors' Guild", 'Upper floor of the guild', [
        '130 combined Att+Str',
        'Food for tokens',
        '100 tokens to enter, 10 drain per minute; earn 150+ in the ground-floor Animation room (rune armour gives 40 per kill)',
        'Melee only (immune to Ranged and Magic)',
      ]),
      bone(
        'Aviansie',
        "God Wars Dungeon (Armadyl's Eyrie)",
        "Climb past Death Plateau to Dad, then north to the dungeon's hole (or Ghommal's hilt 2+ teleports to the entrance boulder: 5 a day at tier 2, unlimited from tier 3)",
        [
          'Troll Stronghold (partial)',
          'Climbing boots',
          'Rope (first time)',
          '60 Str or Agi',
          '70 Ranged, crossbow, mithril grapple',
        ],
      ),
      bone('Ork', "God Wars Dungeon (Bandos' Stronghold)", 'Same dungeon', [
        '70 Strength',
        'Hammer',
      ]),
    ],
  },
  {
    name: 'Kandarin',
    stops: [
      bone(
        'Gnome Child',
        'Grand Tree (second floor)',
        'Slayer ring to Stronghold Slayer Cave, walk to the Grand Tree (or Royal seed pod straight to the Grand Tree, from Monkey Madness II)',
      ),
      bone('Tortoise', 'Gnome Stronghold pen (NW of Grand Tree)', 'Walk'),
      bone(
        'Colonel Radick',
        'Yanille west gate',
        'Minigame teleport to Nightmare Zone (north-west of Yanille bank)',
        ['Answer “foe” to fight him'],
      ),
      bank(
        'Yanille bank',
        'Next to Nightmare Zone',
        [
          "Mos le'harmless teleport scroll",
          'Giant frog legs',
          'Raw cave eel (unnoted)',
          'Witchwood icon',
          'Light source',
        ],
        ['Drop the God Wars gear'],
      ),
      bone(
        'Frogeel',
        'Tower of Life',
        'Walk east from Yanille to the Tower of Life (south of East Ardougne)',
        ['Giant frog legs + raw cave eel (unnoted)'],
      ),
    ],
  },
  {
    name: 'Morytania',
    stops: [
      bone('Crawling Hand', 'Slayer Tower', 'Slayer ring to Slayer Tower', ['5 Slayer']),
      bone('Infernal Mage', 'Slayer Tower', 'Same tower', ['45 Slayer']),
      bone(
        'Sorebones',
        'Harmony Island church',
        "Mos le'harmless teleport scroll (or Trouble Brewing minigame teleport if 20 min have passed), then Brother Tranquility north of the docks",
      ),
      bone('Cave Horror', "Mos Le'Harmless Cave", "Brother Tranquility back to Mos Le'Harmless", [
        '58 Slayer',
        'Witchwood icon',
        'Light source',
      ]),
      bank(
        "Mos Le'Harmless bank (in the port)",
        'Walk to the port',
        [
          'Leaf-bladed weapon, broad arrows/bolts, or Magic Dart runes',
          'Pet rock',
          'Waterskins',
          'Coins (a few thousand)',
        ],
        ['Last bank until Kourend'],
      ),
    ],
  },
  {
    name: 'Desert',
    stops: [
      bone(
        'Ugthanki',
        'South of Shantay Pass',
        'Amulet of glory to Al Kharid, walk to Shantay Pass (bank chest there if you forgot anything)',
        ['Shantay pass'],
      ),
      bone('Goat', 'North of Pollnivneach', 'Magic carpet to Pollnivneach'),
      bone('Crocodile', 'River Elid, south of Pollnivneach', 'Walk south'),
    ],
  },
  {
    name: 'Fremennik',
    stops: [
      bone('Turoth', 'Fremennik Slayer Dungeon', 'Slayer ring to Fremennik Slayer Dungeon', [
        '55 Slayer',
        'Leaf-bladed weapon, broad arrows/bolts, or Magic Dart',
      ]),
      bone('Fox', 'South-east of Rellekka', 'Walk north'),
      bone('Wallasalki', 'Waterbirth Island Dungeon', 'Jarvald in Rellekka', [
        'Pet rock (or a second player) for the door',
      ]),
    ],
  },
  {
    name: 'Kourend',
    stops: [
      bank(
        "Land's End bank chest (Hugor's house)",
        "Amulet of glory to Draynor, walk to Port Sarim; Veos's ship to Land's End",
        [],
        ['Drop the Fremennik gear'],
      ),
      bone('Lizardman', 'Lizardman Canyon', 'Walk', ["Lizardmen drop Xeric's talisman"]),
      bone('Lynx', "South of Shayzien's Secluded Chapel", 'Walk'),
      bone('Boar', 'West of Kourend Castle', 'Walk'),
    ],
  },
];

export interface ShoppingItem {
  item: string;
  /** How many to bring, shown as "30x Item". Left out when a count doesn't fit. */
  qty?: string;
  neededFor: string;
  loadAt: string;
  source: string;
}

export const SHOPPING: ShoppingItem[] = [
  {
    item: 'Pots and jugs of vinegar',
    qty: '30',
    neededFor: 'Polishing every bone (boil on a fire or range)',
    loadAt: 'Before starting',
    source: 'Vinegar: Fortunato, Draynor. Pots: general stores',
  },
  {
    item: 'Amulet of glory (3)',
    qty: '1',
    neededFor: 'Teleports: Edgeville, Al Kharid, Draynor',
    loadAt: 'Varrock East',
    source: 'Grand Exchange',
  },
  {
    item: 'Slayer ring (3)',
    qty: '1',
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
    qty: '1',
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
    item: 'Raw cave eel (unnoted)',
    qty: '1',
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
    item: 'Coins (a few thousand)',
    neededFor: 'Shantay pass, magic carpet, Jarvald, Veos',
    loadAt: "Mos Le'Harmless",
    source: '—',
  },
  {
    item: 'Combat gear + food',
    neededFor: 'Whole route',
    loadAt: 'Every bank stop',
    source: '—',
  },
];
