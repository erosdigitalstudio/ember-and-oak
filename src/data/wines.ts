/** Ember & Oak wine list — a curated selection. Prices are illustrative restaurant prices in USD. */

export type WineType = 'Sparkling' | 'White' | 'Rosé' | 'Red' | 'Dessert';

export interface Wine {
  producer: string;
  name: string;
  vintage: string;
  region: string;
  country: string;
  area: 'Washington' | 'Oregon' | 'California' | 'France' | 'Italy' | 'Spain' | 'Argentina' | 'Australia' | 'Portugal';
  type: WineType;
  grape: string;
  bottle: number;
  glass?: number;
  notes: string;
  pick?: boolean;
}

export const wines: Wine[] = [
  // Sparkling
  { producer: 'Krug', name: 'Grande Cuvée 172ème Édition', vintage: 'NV', region: 'Champagne', country: 'France', area: 'France', type: 'Sparkling', grape: 'Pinot Noir · Chardonnay · Meunier', bottle: 520, notes: 'Brioche, toasted hazelnut, candied citrus. Endless finish.', pick: true },
  { producer: 'Billecart-Salmon', name: 'Brut Rosé', vintage: 'NV', region: 'Champagne', country: 'France', area: 'France', type: 'Sparkling', grape: 'Chardonnay · Pinot Noir', bottle: 225, glass: 38, notes: 'Wild strawberry, rose petal, fine chalky bead.' },
  { producer: 'Pierre Péters', name: 'Cuvée de Réserve Blanc de Blancs', vintage: 'NV', region: 'Côte des Blancs', country: 'France', area: 'France', type: 'Sparkling', grape: 'Chardonnay', bottle: 165, glass: 29, notes: 'Saline, green apple, chalk. Built for oysters.', pick: true },
  { producer: 'Argyle', name: 'Extended Tirage Brut', vintage: '2012', region: 'Willamette Valley', country: 'USA', area: 'Oregon', type: 'Sparkling', grape: 'Pinot Noir · Chardonnay', bottle: 145, notes: 'A decade on the lees: honeyed toast and Meyer lemon.' },

  // White
  { producer: 'Poet’s Leap', name: 'Riesling', vintage: '2023', region: 'Columbia Valley', country: 'USA', area: 'Washington', type: 'White', grape: 'Riesling', bottle: 64, glass: 16, notes: 'Lime blossom, white peach, a whisper of sweetness.' },
  { producer: 'Domaine Vacheron', name: 'Sancerre', vintage: '2023', region: 'Loire Valley', country: 'France', area: 'France', type: 'White', grape: 'Sauvignon Blanc', bottle: 98, glass: 22, notes: 'Flint, grapefruit pith, crushed herbs.' },
  { producer: 'William Fèvre', name: 'Chablis 1er Cru Montée de Tonnerre', vintage: '2022', region: 'Burgundy', country: 'France', area: 'France', type: 'White', grape: 'Chardonnay', bottle: 148, notes: 'Oyster shell, lemon curd, laser-cut acidity.' },
  { producer: 'Bergström', name: 'Sigrid Chardonnay', vintage: '2021', region: 'Willamette Valley', country: 'USA', area: 'Oregon', type: 'White', grape: 'Chardonnay', bottle: 245, notes: 'Oregon’s answer to grand cru Burgundy. Toasted almond and pear.', pick: true },
  { producer: 'Kistler', name: 'Les Noisetiers Chardonnay', vintage: '2022', region: 'Sonoma Coast', country: 'USA', area: 'California', type: 'White', grape: 'Chardonnay', bottle: 190, glass: 34, notes: 'Hazelnut, baked apple, creamy texture with lift.' },
  { producer: 'Domaine Leflaive', name: 'Puligny-Montrachet', vintage: '2021', region: 'Burgundy', country: 'France', area: 'France', type: 'White', grape: 'Chardonnay', bottle: 395, notes: 'Precision and grace: white flowers, citrus oil, stone.' },
  { producer: 'Eyrie Vineyards', name: 'Original Vines Pinot Gris', vintage: '2022', region: 'Dundee Hills', country: 'USA', area: 'Oregon', type: 'White', grape: 'Pinot Gris', bottle: 82, notes: 'From America’s oldest Pinot Gris vines. Quince and ginger.' },

  // Rosé
  { producer: 'Domaines Ott', name: 'Château de Selle Rosé', vintage: '2023', region: 'Provence', country: 'France', area: 'France', type: 'Rosé', grape: 'Grenache · Cinsault', bottle: 115, glass: 24, notes: 'Pale salmon, white peach, garrigue.' },
  { producer: 'Gramercy Cellars', name: 'Olsen Vineyard Rosé', vintage: '2023', region: 'Yakima Valley', country: 'USA', area: 'Washington', type: 'Rosé', grape: 'Cinsault · Grenache', bottle: 68, glass: 17, notes: 'Watermelon, blood orange, bone dry.' },

  // Red — Washington
  { producer: 'Quilceda Creek', name: 'Cabernet Sauvignon', vintage: '2021', region: 'Columbia Valley', country: 'USA', area: 'Washington', type: 'Red', grape: 'Cabernet Sauvignon', bottle: 495, notes: 'Washington’s benchmark: cassis, graphite, velvet tannin.', pick: true },
  { producer: 'Leonetti Cellar', name: 'Cabernet Sauvignon', vintage: '2021', region: 'Walla Walla Valley', country: 'USA', area: 'Washington', type: 'Red', grape: 'Cabernet Sauvignon', bottle: 385, notes: 'Black cherry, cedar box, dark chocolate.' },
  { producer: 'Cayuse Vineyards', name: 'Cailloux Vineyard Syrah', vintage: '2020', region: 'The Rocks District', country: 'USA', area: 'Washington', type: 'Red', grape: 'Syrah', bottle: 420, notes: 'Smoked meat, olive, violet. Wild and unforgettable.' },
  { producer: 'DeLille Cellars', name: 'D2', vintage: '2021', region: 'Columbia Valley', country: 'USA', area: 'Washington', type: 'Red', grape: 'Merlot · Cabernet Sauvignon', bottle: 135, glass: 28, notes: 'Plush plum and mocha, Bordeaux-style elegance.' },
  { producer: 'Betz Family Winery', name: 'Père de Famille', vintage: '2020', region: 'Columbia Valley', country: 'USA', area: 'Washington', type: 'Red', grape: 'Cabernet Sauvignon', bottle: 210, notes: 'Blackcurrant, tobacco leaf, firm and polished.' },
  { producer: 'Woodward Canyon', name: 'Old Vines Cabernet Sauvignon', vintage: '2020', region: 'Walla Walla Valley', country: 'USA', area: 'Washington', type: 'Red', grape: 'Cabernet Sauvignon', bottle: 240, notes: 'Dark fruit, sage, the gravity of old vines.' },
  { producer: 'L’Ecole Nº 41', name: 'Ferguson Vineyard', vintage: '2020', region: 'Walla Walla Valley', country: 'USA', area: 'Washington', type: 'Red', grape: 'Cabernet Blend', bottle: 145, glass: 32, notes: 'Our house steak wine. Bright, savory, beautifully structured.', pick: true },

  // Red — Oregon
  { producer: 'Domaine Serene', name: 'Evenstad Reserve Pinot Noir', vintage: '2021', region: 'Willamette Valley', country: 'USA', area: 'Oregon', type: 'Red', grape: 'Pinot Noir', bottle: 230, notes: 'Black cherry, forest floor, silky and long.' },
  { producer: 'Beaux Frères', name: 'The Beaux Frères Vineyard Pinot Noir', vintage: '2021', region: 'Ribbon Ridge', country: 'USA', area: 'Oregon', type: 'Red', grape: 'Pinot Noir', bottle: 215, glass: 42, notes: 'Raspberry, spice, a subtle earthy core.' },

  // Red — California
  { producer: 'Ridge Vineyards', name: 'Monte Bello', vintage: '2019', region: 'Santa Cruz Mountains', country: 'USA', area: 'California', type: 'Red', grape: 'Cabernet Sauvignon', bottle: 520, notes: 'Mountain fruit, mineral, cedar. A collector’s classic.' },
  { producer: 'Opus One', name: 'Opus One', vintage: '2019', region: 'Napa Valley', country: 'USA', area: 'California', type: 'Red', grape: 'Bordeaux Blend', bottle: 850, notes: 'Blackberry, violet, cocoa. Opulent and precise.' },
  { producer: 'Caymus', name: 'Special Selection Cabernet Sauvignon', vintage: '2020', region: 'Napa Valley', country: 'USA', area: 'California', type: 'Red', grape: 'Cabernet Sauvignon', bottle: 420, notes: 'Ripe cassis, vanilla, a velvet wall of fruit.' },

  // Red — Europe & South America
  { producer: 'Château Lynch-Bages', name: 'Pauillac 5ème Cru Classé', vintage: '2016', region: 'Bordeaux', country: 'France', area: 'France', type: 'Red', grape: 'Cabernet Sauvignon · Merlot', bottle: 495, notes: 'Cassis, pencil shavings, a great vintage entering its prime.' },
  { producer: 'Domaine Jean-Louis Chave', name: 'Hermitage', vintage: '2018', region: 'Northern Rhône', country: 'France', area: 'France', type: 'Red', grape: 'Syrah', bottle: 690, notes: 'Smoke, iron, blackberry. Monumental with the tomahawk.' },
  { producer: 'Antinori', name: 'Tignanello', vintage: '2020', region: 'Tuscany', country: 'Italy', area: 'Italy', type: 'Red', grape: 'Sangiovese · Cabernet', bottle: 395, notes: 'Sour cherry, leather, Tuscan herbs.' },
  { producer: 'Gaja', name: 'Barbaresco', vintage: '2019', region: 'Piedmont', country: 'Italy', area: 'Italy', type: 'Red', grape: 'Nebbiolo', bottle: 620, notes: 'Rose, tar, red cherry. Ethereal structure.' },
  { producer: 'Vega Sicilia', name: 'Único', vintage: '2013', region: 'Ribera del Duero', country: 'Spain', area: 'Spain', type: 'Red', grape: 'Tempranillo · Cabernet', bottle: 1100, notes: 'Spain’s legend: dried fig, cigar box, sandalwood.' },
  { producer: 'Catena Zapata', name: 'Adrianna Vineyard Malbec', vintage: '2019', region: 'Mendoza', country: 'Argentina', area: 'Argentina', type: 'Red', grape: 'Malbec', bottle: 290, glass: 58, notes: 'High-altitude Malbec: violet, plum, crushed stone.' },
  { producer: 'Penfolds', name: 'Grange', vintage: '2018', region: 'South Australia', country: 'Australia', area: 'Australia', type: 'Red', grape: 'Shiraz', bottle: 1250, notes: 'Dense, regal, decades ahead of it. Mocha and blackberry.' },

  // Dessert
  { producer: 'Château d’Yquem', name: 'Sauternes (375 ml)', vintage: '2015', region: 'Bordeaux', country: 'France', area: 'France', type: 'Dessert', grape: 'Sémillon · Sauvignon Blanc', bottle: 480, notes: 'Apricot, saffron, crème brûlée.' },
  { producer: 'Taylor Fladgate', name: '20 Year Old Tawny Port', vintage: 'NV', region: 'Douro', country: 'Portugal', area: 'Portugal', type: 'Dessert', grape: 'Touriga Nacional blend', bottle: 145, glass: 24, notes: 'Walnut, toffee, orange peel. Perfect with the chocolate tart.' },
];
