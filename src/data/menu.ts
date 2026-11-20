/** Ember & Oak dinner menu — fictional, prices in USD. */

export type Tag = 'gf' | 'shellfish' | 'signature' | 'share' | 'seasonal' | 'v';

export interface Dish {
  name: string;
  desc: string;
  price: string;
  tags?: Tag[];
  note?: string;
}

export interface Section {
  id: string;
  title: string;
  kicker: string;
  intro: string;
  dishes: Dish[];
}

export const tagLabels: Record<Tag, string> = {
  signature: 'Signature',
  share: 'For the table',
  seasonal: 'Seasonal',
  gf: 'Gluten-free',
  v: 'Vegetarian',
  shellfish: 'Shellfish',
};

export const menu: Section[] = [
  {
    id: 'raw-bar',
    title: 'Raw Bar',
    kicker: 'I.',
    intro: 'Shellfish from the cold waters of Hood Canal, Puget Sound and Baynes Sound. Shucked to order, served on hand-cut ice.',
    dishes: [
      { name: 'Hama Hama Oysters', desc: 'Hood Canal · bright brine, cucumber finish · mignonette of Douglas fir and shallot', price: '5.5 ea', tags: ['gf', 'shellfish'] },
      { name: 'Kusshi Oysters', desc: 'Deep Bay, BC · small, clean, sweet · smoked lemon', price: '6 ea', tags: ['gf', 'shellfish'] },
      { name: 'Dungeness Crab Cocktail', desc: 'Chilled Westport Dungeness, Meyer lemon aioli, horseradish cocktail sauce', price: '34', tags: ['gf', 'shellfish'] },
      { name: 'The Sound', desc: 'Tower of oysters, Dungeness crab, spot prawns, king crab, geoduck crudo, chilled mussels', price: '165', tags: ['share', 'gf', 'shellfish', 'signature'], note: 'Grand tower for 4–6 · 295' },
      { name: 'Wagyu Tartare', desc: 'Hand-cut Washington Wagyu, cured egg yolk, smoked capers, black garlic, tallow toast', price: '32', tags: ['signature'] },
      { name: 'Golden Osetra Caviar', desc: '30 g, buckwheat blini, crème fraîche, chive · or served over a shucked oyster', price: '160', tags: ['share'] },
    ],
  },
  {
    id: 'starters',
    title: 'To Begin',
    kicker: 'II.',
    intro: 'Plates that wake the appetite and set the tone: smoke, salt and a little indulgence.',
    dishes: [
      { name: 'Ember-Roasted Bone Marrow', desc: 'Split canoe bone, oxtail marmalade, pickled shallot, grilled sourdough', price: '26', tags: ['signature'] },
      { name: 'Dungeness Crab Cake', desc: 'Almost all crab, brown butter hollandaise, fennel and apple slaw', price: '36', tags: ['shellfish'] },
      { name: 'Wild Chanterelles', desc: 'Foraged in the Olympic Peninsula, cooked in the embers, aged sherry, hazelnut, sixty-minute egg', price: '24', tags: ['v', 'gf', 'seasonal'] },
      { name: 'Little Gem Caesar', desc: 'Anchovy-garlic dressing, Parmigiano Reggiano 36 months, tallow croutons', price: '19' },
      { name: 'Oxtail French Onion', desc: 'Sweet Walla Walla onions, oxtail broth, gruyère crust', price: '21' },
      { name: 'Beef Tallow Brioche', desc: 'Warm, glazed with honey and Maldon salt, whipped cultured butter', price: '14', tags: ['share'] },
    ],
  },
  {
    id: 'dry-aged',
    title: 'Dry-Aged & Prime',
    kicker: 'III.',
    intro: 'USDA Prime, aged in our Himalayan-salt chamber, then seared over cherry and Oregon white oak at 900°F. Rested and finished with smoked salt.',
    dishes: [
      { name: 'Bone-In Ribeye', desc: '20 oz · 45 days dry-aged · deep, nutty, almost blue-cheese complexity', price: '108', tags: ['gf', 'signature'] },
      { name: 'New York Strip', desc: '14 oz · 30 days dry-aged · firm bite, generous fat cap', price: '84', tags: ['gf'] },
      { name: 'Filet Mignon', desc: '8 oz · center cut · the most tender cut we serve', price: '76', tags: ['gf'], note: '12 oz · 98' },
      { name: 'Bone-In Filet', desc: '14 oz · the filet with the depth of the bone', price: '112', tags: ['gf'] },
      { name: 'Porterhouse for Two', desc: '36 oz · 45 days dry-aged · strip and tenderloin, carved tableside', price: '185', tags: ['gf', 'share'] },
      { name: 'The Oak Tomahawk', desc: '42 oz · 60 days dry-aged · finished in a bed of embers, for two or three', price: '245', tags: ['gf', 'share', 'signature'] },
    ],
  },
  {
    id: 'wagyu',
    title: 'Wagyu',
    kicker: 'IV.',
    intro: 'Certified Japanese Black from Miyazaki and Kagoshima, alongside Wagyu raised in the Columbia Basin. Served in small portions: richness this pure needs no more.',
    dishes: [
      { name: 'A5 Miyazaki Striploin', desc: 'BMS 10–12 · seared on binchotan, fresh wasabi, smoked shoyu · 3 oz minimum', price: '38 / oz', tags: ['gf', 'signature'] },
      { name: 'A5 Kagoshima Ribeye Cap', desc: 'The rarest cut of the rib, sliced thin, kissed with fire', price: '42 / oz', tags: ['gf'] },
      { name: 'Columbia Basin Wagyu Zabuton', desc: '10 oz · Washington-raised · chimichurri of mountain herbs', price: '88', tags: ['gf'] },
      { name: 'The Wagyu Flight', desc: 'Three cuts, three origins, 2 oz each: Miyazaki A5, Kagoshima A5, Columbia Basin', price: '145', tags: ['gf', 'share', 'signature'] },
    ],
  },
  {
    id: 'sea',
    title: 'From the Sea',
    kicker: 'V.',
    intro: 'The Pacific Northwest is as much ocean as forest. Our fishermen call us when the catch is right.',
    dishes: [
      { name: 'Whole Dungeness Crab', desc: 'Roasted in garlic and brown butter, charred lemon, grilled bread for the sauce', price: 'MP', tags: ['shellfish', 'signature'], note: 'Usually about 72' },
      { name: 'Copper River King Salmon', desc: 'Cedar plank, wild huckleberry beurre blanc, fiddlehead ferns', price: '58', tags: ['gf', 'seasonal'] },
      { name: 'Alaskan Halibut', desc: 'Butter-poached, clam and smoked bacon chowder, potato crisps', price: '54', tags: ['shellfish'] },
      { name: 'Weathervane Scallops', desc: 'Seared in the cast iron, cauliflower, golden raisins, brown butter', price: '52', tags: ['gf', 'shellfish'] },
    ],
  },
  {
    id: 'sides',
    title: 'Sides & Sauces',
    kicker: 'VI.',
    intro: 'Generous sides for the table, sauces made fresh every afternoon.',
    dishes: [
      { name: 'Truffle Pommes Purée', desc: 'One part potato, one part butter, Oregon black truffle', price: '22', tags: ['v', 'gf'] },
      { name: 'Dungeness Crab Mac & Cheese', desc: 'Aged white cheddar, gruyère, toasted breadcrumbs', price: '32', tags: ['shellfish'] },
      { name: 'Ember-Charred Broccolini', desc: 'Chili, garlic, lemon, toasted almonds', price: '16', tags: ['v', 'gf'] },
      { name: 'Hand-Cut Fries in Tallow', desc: 'Rosemary salt, smoked aioli', price: '15', tags: ['gf'] },
      { name: 'Creamed Spinach', desc: 'Nutmeg, Parmigiano, crispy shallots', price: '17', tags: ['v'] },
      { name: 'Sauces', desc: 'Béarnaise · Bordelaise · Au poivre · Black garlic butter · Mountain chimichurri', price: '6 ea', tags: ['gf'] },
      { name: 'Enhancements', desc: 'Oscar style (crab + béarnaise) 34 · Seared foie gras 28 · Shaved black truffle 40', price: '—' },
    ],
  },
  {
    id: 'dessert',
    title: 'To Finish',
    kicker: 'VII.',
    intro: 'Pastry by chef Mara Lindqvist. Paired, if you like, with a twenty-year tawny or a glass of Sauternes.',
    dishes: [
      { name: 'Baked Alaska, Flambéed Tableside', desc: 'Huckleberry ice cream, toasted meringue, Washington apple brandy · for two', price: '32', tags: ['share', 'signature'] },
      { name: 'Burnt Basque Cheesecake', desc: 'Rainier cherry compote, smoked honey', price: '16', tags: ['gf'] },
      { name: 'Dark Chocolate Tart', desc: '72% Valrhona, cherry-wood smoked salt, crème fraîche', price: '17' },
      { name: 'Cheese Selection', desc: 'Three Pacific Northwest cheeses, honeycomb, walnut bread', price: '26', tags: ['v'] },
    ],
  },
];

export const tasting = {
  name: 'The Fire Tasting',
  price: '245',
  pairing: '165',
  courses: [
    'Hama Hama oyster, Douglas fir mignonette',
    'Wagyu tartare, cured yolk, tallow toast',
    'Ember-roasted chanterelles',
    'Dungeness crab, brown butter, charred lemon',
    'A5 Miyazaki, binchotan, fresh wasabi',
    '45-day ribeye, bordelaise, pommes purée',
    'Baked Alaska, flambéed tableside',
  ],
};

export const doneness = [
  { id: 'blue', label: 'Blue', temp: '115°F', c: '46°C', desc: 'Seared outside, cool and deep red throughout. For the purist.' },
  { id: 'rare', label: 'Rare', temp: '125°F', c: '52°C', desc: 'Cool red center, soft and silky. Our dry-aged cuts are at their most expressive here.' },
  { id: 'medium-rare', label: 'Medium Rare', temp: '130°F', c: '54°C', desc: 'Warm red center, the fat beginning to melt. The chef’s recommendation for most cuts.' },
  { id: 'medium', label: 'Medium', temp: '140°F', c: '60°C', desc: 'Warm pink center, firmer texture. Ideal for the Wagyu zabuton and the richer cuts.' },
  { id: 'medium-well', label: 'Medium Well', temp: '150°F', c: '66°C', desc: 'A hint of pink, firm and juicy. Allow a few extra minutes.' },
  { id: 'well', label: 'Well Done', temp: '160°F', c: '71°C', desc: 'Cooked through, slowly, over gentle embers to keep it moist.' },
];
