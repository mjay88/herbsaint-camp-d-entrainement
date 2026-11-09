import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "drizzle-orm";

import * as schema from "../db/schema";

const db = drizzle(process.env.DATABASE_URL!);

const main = async () => {
  try {
    console.log("Seeding flash cards");

    await db.delete(schema.cards);
    await db.delete(schema.wineCards);

    /**
     * ============================================================
     * SOUPS & SALADS
     * ============================================================
     */
    await db.insert(schema.cards).values([
      {
        category: "SOUPS & SALADS",
        title: "Gumbo",
        description: `The most important thing on the menu. Chef Donald Link's recipe. The gumbo begins with a dark Roux of flour and soy bean oil. Onion, bellpepper, serano pepper, garlic and Cajun seasonings (cayenne, paprika, chili powder, white pepper, black pepper, and file) are added to the roux and cooked down.\n\nThe following day a fortified stock (stock poured over roasted chicken bones then simmered overnight) is added along with Chicken, Andouille (coarse ground smoked sausage made using pork, garlic, pepper, onions, and seasonings) and Tasso [a smoked, spiced, and cured meat, a specialty of south Louisiana cuisine made from pork shoulder (Chili powder, cayenne, curing salt, black and white pepper, oregano)] Okra is sautéed with oil and added in last, the finished Gumbo rests overnight before being served.\n\nThe Gumbo is served with louisiana rice and green onions. Our Gumbo recipe is specific to Herbsaint — recipes vary between LRG restaurants. The Andouille is made at Butcher, and the Tasso is made in house at Herbsaint.`,
        allergies: `Gluten, Allium, Dairy (rice), Soy oil, Nightshade (Cayenne and Paprika), capsaicin`,
        modifications: `NO RICE, NO GREEN ONION`,
        imageSrc: "/menu-drawings/gumbo.webp",
      },
      {
        category: "SOUPS & SALADS",
        title: "Farm Lettuces",
        description: `Assorted farm lettuces (mustard greens, arugula, and baby kale) dressed with an herb-buttermilk dressing — a fancy ranch that contains mayo, buttermilk, sour cream, onion, garlic, dill, chives, and tarragon.\n\nThe salad is then topped with shaved radish, toasted breadcrumbs (contains dairy and EVOO), and fresh dill.`,
        allergies: `Gluten, Dairy (toasted breadcrumbs, dressing), Alliums, Nightshade, capsaicin`,
        modifications: null,
        imageSrc: "/menu-drawings/farm-lettuces.webp",
      },
      {
        category: "SOUPS & SALADS",
        title: "Compostella Arugula",
        description: `Compostella arugula salad, seasoned with salt and pepper and dressed with an apple cider-Dijon vinaigrette (Dijon mustard, verjus, apple cider vinegar, salt, sugar, and EVOO).\n\nThe arugula is tossed with julienned Fuji apples, then topped with chevre and spiced pecans (melted butter, salt, sugar, black pepper, cayenne, corn starch, and cane syrup).\n\nIt is all set on top of a squash and miso puree — roasted fall squash pureed with a miso base of sake, mirin, white sugar, and white miso. The greens come from Compostella Farms and Fat Cat Farms.`,
        allergies: `Dairy, Capsaicin, Nightshade, tree nut`,
        modifications: `no chevre, no dressing, no apple, no pecans`,
        imageSrc: "/menu-drawings/compostella-arugula.webp",
      },
    ]);

    /**
     * ============================================================
     * SMALL PLATES
     * ============================================================
     */
    await db.insert(schema.cards).values([
      {
        category: "SMALL PLATES",
        title: "Cornmeal Fried Oysters",
        description: `5-8 Louisiana oysters (depending on size) dusted with cornmeal and flour, then deep fried. Our oysters come from P&J.\n\nServed with sesame slaw (napa cabbage, sesame vinaigrette, carrots, green onions), house hot sauce (Louisiana Hot Sauce, lemon juice, Worcestershire, and horseradish) and lemon.`,
        allergies: `Bivalve, Allium, Peanut oil, Gluten, Nightshade (Chili in the hot sauce), Citrus, Finfish, capsaicin`,
        modifications: `Gluten Free Dredge (Corn flour only), No slaw, No Hot, No Citrus (No Lemon or Hot Sauce)`,
        imageSrc: "/menu-drawings/cornmeal-fried-oysters.webp",
      },
      {
        category: "SMALL PLATES",
        title: "Beef Short Rib",
        description: `Beef short ribs are braised in red wine, mirepoix, bay leaves, black peppercorns, thyme, and chicken stock for 3-5 hours until they are fork-tender, then they are cut into 2oz portions. They are pan roasted in the oven to order.\n\nServed with a wedge of potato rosti — grated Kennebec potatoes pressed into a pan to form a cake. The potato is pan roasted and finished in an oven, then the rosti is cut into wedges and deep fried to order.\n\nFinished with a horseradish sauce (horseradish, Worcestershire, sour cream, vinegar, hot sauce, salt and pepper) and salsa verde (blanched parsley and basil with garlic and EVOO).`,
        allergies: `Allium, Peanut, Gluten, Finfish`,
        modifications: `Peanut/Gluten - Pan fried rosti, No sauces, Sauces on side`,
        imageSrc: "/menu-drawings/beef-short-rib.webp",
      },
      {
        category: "SMALL PLATES",
        title: "Housemade Spaghetti",
        description: `Signature small plate. The pasta is made in house. House-cured guanciale (pork jowls cured like pancetta) is cured with garlic, warm spices, lots of black pepper and salt.\n\nThe guanciale is diced up and rendered in a pan with garlic, shallot, chicken stock, and cream. The pasta is tossed in and finished with Grana Padano cheese, lemon and parsley, and a dash of Wang (Korean seedless chili pepper flake).\n\nThe dish is topped with a farm egg that has been poached, panko-breaded, and then deep fried. Finally, it is garnished with a crispy slice of guanciale.`,
        allergies: `Allium, Dairy, Gluten, Citrus, Nightshade (Wang), capsaicin`,
        modifications: `No Meat, No Egg, Egg on Side, No wang`,
        imageSrc: "/menu-drawings/housemade-spaghetti.webp",
      },
      {
        category: "SMALL PLATES",
        title: "Kanpachi Crudo",
        description: `Kanpachi is a clean, firm white fish (greater amberjack). The dish is 1.5 ounces of sliced kanpachi.\n\nWe add our jalapeno-lime vinaigrette (serrano, jalapeno, lime juice, palm sugar, fish sauce), chili relish (roasted peppers, yuzu kosho, and sugar), crispy shallots, and chiffonade shiso.`,
        allergies: `Finfish, chili, citrus, Allium, Nightshade (Serrano & Jalapeno), capsaicin`,
        modifications: `No Sauce, Sauce on side, No Chili, No Shallot, No Added Salt`,
        imageSrc: "/menu-drawings/kanpachi-crudo.webp",
      },
      {
        category: "SMALL PLATES",
        title: "Bluefin Tuna Tartare",
        description: `We take 2 ounces of chopped bluefin tuna, ranched off the coast of Baja. We toast white bread, then shmear it with yuzu aioli, then top it with the tuna.\n\nWe drizzle tare (contains sake, mirin, soy, sugar, ginger, garlic, and green onions) and top it with togarashi (contains sesame, espellette, nori, criolla sella chilis) and sea salt.`,
        allergies: `Gluten, soy sauce, finfish, allium (aioli), sesame, Nightshade (Chili), capsaicin`,
        modifications: `No Mayo, No Tare, No Togarashi`,
        imageSrc: "/menu-drawings/bluefin-tuna-tartare.webp",
      },
      {
        category: "SMALL PLATES",
        title: "Grilled Lamb Kofta",
        description: `Lamb kofta is a Turkish style meatball with all lamb, grated onion, mint, parsley, garlic, bulgar wheat (gluten), aleppo, cumin, coriander, cinnamon, and black pepper.\n\nIt is grilled and served on top of Southern Maid yogurt mixed with grated cucumbers, aleppo, EVOO, and lemon. The lima beans are lightly pickled, and fresh dill goes over the top.`,
        allergies: `Gluten, Dairy, onion, garlic, legume, Nightshade (Aleppo), capsaicin`,
        modifications: `No Yogurt, No limas, no dill`,
        imageSrc: "/menu-drawings/grilled-lamb-kofta.webp",
      },
      {
        category: "SMALL PLATES",
        title: "Fried Green Tomatoes",
        description: `Sliced green tomatoes are dredged in AP flour, then an egg wash (egg and milk), then panko breadcrumbs. They are fried in peanut oil.\n\nThe gribiche is made of mayo, boiled eggs, capers, cornichons, shallots, mustard, lemon juice, and EVOO. We dress about 4 chilled poached shrimp with the gribiche, then lay them on top of the F.G.T.\n\nThen we top everything with fines herbes (parsley, chives, tarragon, and celery leaf).`,
        allergies: `Gluten, shellfish, egg, Dairy, Soy oil, Allium, Citrus, capsaicin`,
        modifications: `shrimp on the side, Sauce on the side`,
        imageSrc: "/menu-drawings/fried-green-tomatoes.webp",
      },
    ]);

    /**
     * ============================================================
     * MAIN COURSES
     * ============================================================
     */
    await db.insert(schema.cards).values([
      {
        category: "MAIN COURSES",
        title: "Grilled Tuna Sandwich",
        description: `3 oz of Gulf yellowfin tuna, grilled to med-rare unless specified, and sliced.\n\nDressed with shaved red onions, tomatoes, bibb lettuce, sliced avocado, and preserved lemon-caper aioli (mayo with chopped preserved lemons and capers) on grilled olive bread.\n\nServed with house made potato chips and cucumbers tossed in sherry vinegar and olive oil. The tuna is sourced from the Gulf of Mexico.`,
        allergies: `Seafood, Allium, Gluten, Nightshades`,
        modifications: `No Bread. No Onion. No avocado. No Chips (Chips cannot be substituted for anything else). Never do open faced`,
        imageSrc: "/menu-drawings/grilled-tuna-sandwich.webp",
      },
      {
        category: "MAIN COURSES",
        title: "Louisiana Jumbo Shrimp",
        description: `We use 5 ounces of peeled shrimp (fresh, never frozen) NEVER DEVEINED. They are seasoned with cajun spice (similar to blackening spice — paprika, garlic powder, bay, white and black pepper, allspice, mustard seed) and finished with lemon juice.\n\nWe roast off local sweet corn, cut it off the cob, and chill it. We char cucumbers and chill them down. We mix the chilled corn, cucumbers, freshly cut tomatoes, and chopped pickled banana peppers, then dress it with a creamy tomato dressing (contains mayo, butter, tomato, salt, paprika, and pepper).\n\nWe top it with cilantro and a lime wedge. All shrimp are harvested by Captain Dino of Jean Lafitte, LA.`,
        allergies: `Allium, Nightshade, butter in the dressing, Shellfish, tomato, cilantro, capsaicin`,
        modifications: `no dressing, no cilantro, no cajun spice`,
        imageSrc: "/menu-drawings/louisiana-jumbo-shrimp.webp",
      },
      {
        category: "MAIN COURSES",
        title: "Muscovy Duck Leg Confit",
        description: `Signature entree. Duck legs are dusted with salt, pepper, allspice, and fennel to cure overnight. They are then confit at a low temperature in duck fat with rosemary, sage, thyme, and whole garlic cloves.\n\nThe duck leg is crisped in a pan, then placed on top of the dirty rice [a mixture of ground pork shoulder, chicken livers, garlic, onion, celery and traditional Cajun seasonings (paprika, cayenne, black and white pepper, chili powder, and oregano)] with seasonal vegetables. The dirty rice is sautéed with butter, garlic, chicken stock, and a small addition of popcorn rice (1:2 dirty to rice ratio).\n\nThe dish is finished with an orange gastrique (caramelized sugar, reduced orange juice, cane vinegar, lemon juice, and olive oil).`,
        allergies: `Allium, Dairy (Dirty Rice), Nightshade, capsaicin`,
        modifications: `No dirty rice, No Veg, No sauce`,
        imageSrc: "/menu-drawings/muscovy-duck-leg-confit.webp",
      },
      {
        category: "MAIN COURSES",
        title: "Credo Farms Chicken",
        description: `Grilled skin-on airline breast that is marinated in olive oil, thyme, and lemon zest.\n\nOn the bottom is Carolina Gold rice grits (rice grits, butter, cream, milk, salt, pepper, sugar). Then we sauté chanterelle mushrooms and add a dijon chicken jus (made with roasted chicken wings, chicken feet, onion, celery, carrot, garlic, thyme, tomato paste, and white wine, then seasoned with dijon).\n\nGarnished with tarragon.`,
        allergies: `Allium, dairy (butter, milk, heavy cream), mushroom, nightshade (tomato)`,
        modifications: `no mush, no grits`,
        imageSrc: "/menu-drawings/credo-farms-chicken.webp",
      },
      {
        category: "MAIN COURSES",
        title: "Grilled Wagyu Bavette",
        description: `6oz Texas wagyu bavette grilled to the desired temperature. It is sliced and garnished with chimichurri (contains parsley, cilantro, oregano, garlic, lemon zest, ANCHOVIES, pickled fresno chilies, and EVOO). Served with house made french fries and pimenton aioli.\n\nThe bavette steak, also known as flap steak, is a long, flat and tender cut of meat that comes from the bottom sirloin, near the flank steak. It is a lean cut with a long, thin shape and a rich, beefy flavor, very similar to the flavor profile of a flank steak.\n\nWagyu is any of the four Japanese breeds of beef cattle. The wagyu that we are serving is farmed in Texas.`,
        allergies: `Fish, Allium, capsaicin, nightshade`,
        modifications: `No Sauce. SOS. No Fries`,
        imageSrc: "/menu-drawings/grilled-wagyu-bavette.webp",
      },
      {
        category: "MAIN COURSES",
        title: "14 oz. Wagyu Striploin",
        description: `Listed on the menu under "For The Table." 14 oz Australian wagyu (Mayura Station — 100% wagyu) striploin, seared in beef tallow and thyme.\n\nIt is sliced and served with sea salt and EVOO.`,
        allergies: null,
        modifications: `N/A`,
        imageSrc: "/menu-drawings/14-oz-wagyu-striploin.webp",
      },
    ]);

    /**
     * ============================================================
     * SIDES
     * ============================================================
     */
    await db.insert(schema.cards).values([
      {
        category: "SIDES",
        title: "Dirty Rice",
        description: `A mixture of ground pork shoulder, chicken livers, garlic, onion, celery and traditional Cajun seasonings (paprika, cayenne, black and white pepper, chili powder and oregano).\n\nThe dirty rice is finished with a quick sauté of butter, garlic, chicken stock, and a small addition of popcorn rice (1:2 dirty to rice ratio) and green onions.`,
        allergies: `Allium, Dairy (rice), nightshade, capsaicin`,
        modifications: `None`,
        imageSrc: "/menu-drawings/dirty-rice.webp",
      },
      {
        category: "SIDES",
        title: "French Fries",
        description: `Russet potatoes are cut in house, then soaked overnight in water. The potatoes are then blanched 3 times in peanut oil at 250, and fried at 350 when fired.\n\nServed with a ramekin of pimenton aioli. This is made from a true aioli (no mayo) with egg yolks, smoked paprika, sherry vinegar, lemon juice, soy oil, and confit garlic.`,
        allergies: `Peanut oil, Gluten (cross contamination), Nightshade, capsaicin`,
        modifications: `No Aioli`,
        imageSrc: "/menu-drawings/french-fries.webp",
      },
      {
        category: "SIDES",
        title: "Mustard Marinated Beets",
        description: `Beets from the farm are braised, then peeled and chopped. We cut up apples, then add wholegrain mustard, cane syrup, and criolla sella hot sauce.\n\nThe chicken liver mousse is made with chicken livers, shallots, thyme, cognac, heavy cream, and butter.\n\nThe pistachios are seasoned with cornstarch, egg whites, salt, pepper, garlic powder, and dried thyme, then baked until crispy. The beets come from Joe's.`,
        allergies: `dairy (butter/cream), tree nuts, capsaicin, nightshade`,
        modifications: `no tree nuts, no liver mousse`,
        imageSrc: "/menu-drawings/mustard-marinated-beets.webp",
      },
      {
        category: "SIDES",
        title: "Bacon-Miso Braised Turnips and Greens",
        description: `Local turnips and greens (sometimes turnips, mustards, or collards — it just depends on availability) cooked down with bacon, white miso, onions, and garlic, then seasoned with vinegar.\n\nThis is old fashioned pot cooking, like your memaw's. The turnips and greens come from da farms.`,
        allergies: `pork, alliums`,
        modifications: `no mods - its all cooked together`,
        imageSrc: "/menu-drawings/bacon-miso-braised-turnips-and-greens.webp",
      },
    ]);

    /**
     * ============================================================
     * DESSERTS
     * ============================================================
     */
    await db.insert(schema.cards).values([
      {
        category: "DESSERTS",
        title: "Banana Brown Butter Tart",
        description: `A shell of sweet pasta frolla dough filled with slices of banana and a spiced brown butter filling.\n\nServed with whipped crème fraîche sweetened with vanilla sugar, and salted caramel.`,
        allergies: `CONTAINS GLUTEN (crust). DOES NOT CONTAIN NUTS. Dairy.`,
        modifications: null,
        imageSrc: "/menu-drawings/banana-brown-butter-tart.webp",
      },
      {
        category: "DESSERTS",
        title: "Vanilla Pot de Creme",
        description: `A creamy and lemony vanilla custard served with red wine poached pears.\n\nServed with molasses spiced sandwich cookies.`,
        allergies: `CONTAINS GLUTEN (molasses spiced cookies). DOES NOT CONTAIN NUTS. Dairy, egg.`,
        modifications: null,
        imageSrc: "/menu-drawings/vanilla-pot-de-creme.webp",
      },
      {
        category: "DESSERTS",
        title: "Flourless Chocolate Cake",
        description: `A dark chocolate flourless cake served with dulce de leche sauce and whipped cream.\n\nIt is also served with a Spanish peanut brittle.`,
        allergies: `CONTAINS NUTS (peanuts). DOES NOT CONTAIN GLUTEN. Dairy, egg.`,
        modifications: null,
        imageSrc: "/menu-drawings/flourless-chocolate-cake.webp",
      },
      {
        category: "DESSERTS",
        title: "Apple Hand Pies",
        description: `Warm spiced apples fried in a light and flaky crème fraîche dough, then tossed in cinnamon sugar.\n\nServed with burnt honey ice cream and ginger cookie crumbs.`,
        allergies: `CONTAINS GLUTEN (crust & crumbs). DOES NOT CONTAIN NUTS. Dairy.`,
        modifications: null,
        imageSrc: "/menu-drawings/apple-hand-pies.webp",
      },
      {
        category: "DESSERTS",
        title: "Ice Cream & Sorbet",
        description: `A rotating selection of house made ice cream and sorbet.\n\nServed with shortbread cookies that are topped with Sugar in the Raw and vanilla sugar.`,
        allergies: `CONTAINS GLUTEN (shortbread cookie). Dairy (ice cream).`,
        modifications: null,
        imageSrc: "/menu-drawings/ice-cream-and-sorbet.webp",
      },
    ]);

    /**
     * ============================================================
     * COCKTAILS
     * Source: Herbsaint Fall 2026 - Cocktail Descriptions
     * allergies, modifications and imageSrc are null for all cocktails
     * ============================================================
     */
    await db.insert(schema.cards).values([
      {
        category: "COCKTAILS",
        title: "Sazerac",
        description: `The original New Orleans boozy cocktail. Rye whiskey, dashed with Peychaud's Bitters, and a touch of sugar.\n\nIt is chilled and poured into a rocks glass lined with Herbsaint Legendre, a local absinthe substitute that lends a slight anise flavor. Finished with a lemon twist and served neat.`,
        allergies: null,
        modifications: null,
        imageSrc: null,
      },
      {
        category: "COCKTAILS",
        title: "Herbsaint Old Fashioned",
        description: `A classic Old-Fashioned made with Cochon Blend Pinhook Bourbon, demerara sugar, and a dash each of Angostura and Regan's Orange Bitters.\n\nServed over a big ice cube with an orange swath and a cherry (no muddling!!).\n\nThe bourbon is a private, 8-barrel blend that is exclusive to LRG restaurants. It can also be ordered with the Pinhook Collaboration Series pour.`,
        allergies: null,
        modifications: null,
        imageSrc: null,
      },
      {
        category: "COCKTAILS",
        title: "Louisa Spritz",
        description: `A light, but complex, bitter Italian style spritz. Cardamaro gives a warmer, richer, and more floral alternative to Aperol, while grapefruit liqueur and Meletti amaro balance fruit and bitterness.\n\nFinished with bubbly prosecco and garnished with grapefruit and a sprig of fresh rosemary.`,
        allergies: null,
        modifications: null,
        imageSrc: null,
      },
      {
        category: "COCKTAILS",
        title: "Naples Underground",
        description: `An Italian bitter, but light and clean, Boulevardier variation. This spirit forward cocktail uses our Pinhook Cochon Blend bourbon with Amaro CioCiaro and two different vermouths.\n\nCarpano Antica brings a deep herbaceousness, while blanc vermouth lends a light sweetness to bring it all together.\n\nThis cocktail is stirred and strained into a rocks glass over a big cube, then garnished with an orange peel.`,
        allergies: null,
        modifications: null,
        imageSrc: null,
      },
      {
        category: "COCKTAILS",
        title: "Out Of Office",
        description: `Out of Office is a tiki inspired tequila punch. It contains Cimarron blanco, golden falernum, agua de Jamaica, grapefruit, lime, and CioCiaro amaro to round things out.\n\nThe flavor profile is tangy and layered, with warm spices from the golden falernum and CioCiaro amaro. Garnished with grapefruit peel and mint for the aromatic aspect.`,
        allergies: null,
        modifications: null,
        imageSrc: null,
      },
      {
        category: "COCKTAILS",
        title: "Alma Daiquiri",
        description: `The fall iteration of our seasonal Oxbow rum daiquiri. A twist on a classic rum daiquiri, made with Oxbow Barrel Aged rum. Fresh lemon and lime juices provide the sour component.\n\nIt is sweetened with a house made citrus and cardamom oleo saccharum (a syrup made from steeping citrus peels in sugar to extract the oils). This particular syrup is unique because it also uses raw sugar from the Oxbow sugar cane farm, creating an essentially single estate cocktail.\n\nOrange and grapefruit peels provide an array of citrus flavors, complemented by green cardamom for a hint of spice.`,
        allergies: null,
        modifications: null,
        imageSrc: null,
      },
      {
        category: "COCKTAILS",
        title: "Maxime #2",
        description: `A spirit forward, gin based sipper, in the style of a Bijou cocktail. London Dry gin provides the backbone for this cocktail, and calvados adds depth and sweetness.\n\nIt is balanced with Cocchi Torino, an Italian vermouth that brings warm notes of fall spices, and a dash of orange bitters rounds out the drink.\n\nStirred and served up, with an orange peel expression and a Luxardo cherry.`,
        allergies: null,
        modifications: null,
        imageSrc: null,
      },
      {
        category: "COCKTAILS",
        title: "Sweater Weather",
        description: `Our zero proof cocktail for the fall, built in the style of a shandy. A citrus and pomegranate base is lengthened with bubbles for a bright, lightly tart drink that carries no alcohol.\n\nThe pomegranate brings depth and a deep garnet color, while the fresh citrus keeps it crisp and refreshing rather than sweet.\n\nThis is the drink to offer guests who are not drinking but still want something seasonal and festive in a real cocktail glass.`,
        allergies: null,
        modifications: null,
        imageSrc: null,
      },
    ]);

    /**
     * ============================================================
     * BEER & CIDER
     * ============================================================
     */
    await db.insert(schema.cards).values([
      {
        category: "BEER & CIDER",
        title: "Miller High Life",
        description: `Our lager. An American lager from Milwaukee, Wisconsin, first brewed in 1903 and known as "The Champagne of Beers" for its high carbonation and its tapered, clear glass bottle.\n\nLight bodied, crisp, and clean, with a mild grain sweetness and very little hop bitterness. Around 4.6% ABV.\n\nThis is the easy drinking, inexpensive option on the list — a good call for a guest who just wants something simple and cold.`,
        allergies: `Gluten (barley, corn)`,
        modifications: null,
        imageSrc: null,
      },
      {
        category: "BEER & CIDER",
        title: "Weihenstephaner",
        description: `Our hefeweizen. Brewed by Bayerische Staatsbrauerei Weihenstephan in Freising, Bavaria, which claims to be the oldest continuously operating brewery in the world, dating back to 1040.\n\nAn unfiltered wheat beer, cloudy and pale gold, with the banana and clove character that comes from the weizen yeast. Soft, full bodied, and lightly sweet, with low bitterness. Around 5.4% ABV.\n\nThe yeast is left in suspension, so the cloudiness is correct and not a flaw. Worth mentioning to a guest who asks why it looks hazy.`,
        allergies: `Gluten (wheat, barley)`,
        modifications: null,
        imageSrc: null,
      },
      {
        category: "BEER & CIDER",
        title: "Einbecker",
        description: `Our pilsner. A German pilsner from Einbecker Brauhaus in Einbeck, Lower Saxony — a brewing town best known as the birthplace of bock beer.\n\nPale gold and brilliantly clear, with a firm, bready malt backbone and a pronounced noble hop bitterness in the classic German style. Dry and bracing on the finish, around 4.9% ABV.\n\nCrisper and more bitter than the Miller High Life, and a strong pairing with the fried oysters and the french fries.`,
        allergies: `Gluten (barley)`,
        modifications: null,
        imageSrc: null,
      },
      {
        category: "BEER & CIDER",
        title: "Chandeleur Island 'Lil Smack'",
        description: `Our IPA, and our local craft option. Brewed by Chandeleur Island Brewing Company in Gulfport, Mississippi.\n\nAn easy drinking American IPA with tropical and citrus hop flavor over a light malt base. Around 6.5% ABV and 69 IBU.\n\nThe hop bitterness stands up well to spicy and fried food, which makes it a good suggestion alongside the gumbo or the fried green tomatoes.`,
        allergies: `Gluten (barley, wheat)`,
        modifications: null,
        imageSrc: null,
      },
      {
        category: "BEER & CIDER",
        title: "Celliers de l'Odet 'Aval'",
        description: `Our rosé cidre. An artisanal cider from Brittany, France, pressed from Breton cider apples that include the red-fleshed Baya Marisa, which is where the color comes from.\n\nBright pink, with aromas of fresh raspberry and grapefruit zest. Tart and crisp on the palate, with clean acidity, very little tannin, and a dry, lifted finish. Fermented with no additives or added sweeteners, around 6% ABV.\n\nThis is our naturally gluten free option. It pairs well with the fried oysters and with the pork dishes.`,
        allergies: `Naturally gluten free. Contains sulfites.`,
        modifications: null,
        imageSrc: null,
      },
      {
        category: "BEER & CIDER",
        title: "Athletic Brewing Co.",
        description: `Our non-alcoholic beer. Athletic Brewing Company is a Connecticut brewery that brews only non-alcoholic beer, using a proprietary brewing process rather than stripping the alcohol out after fermentation.\n\nIt comes in under 0.5% ABV, which is the legal threshold for non-alcoholic in the United States. It drinks like a full craft beer, with real hop aroma and malt body instead of the thin character of older NA beers.\n\nThis is the standard recommendation for a guest who is not drinking but still wants a beer in front of them.`,
        allergies: `Gluten (barley, wheat)`,
        modifications: null,
        imageSrc: null,
      },
    ]);

    /**
     * ============================================================
     * WINES BY THE GLASS
     * Source: 15* Herbsaint BTG Matrix
     * ============================================================
     */

    /** SPARKLING */
    await db.insert(schema.wineCards).values([
      {
        category: "WINES BY THE GLASS",
        title: "Sommariva Prosecco Superiore Brut NV",
        description: `Our by-the-glass sparkling pour and the lightest, most versatile bubbles on the list.\n\nA Conegliano-Valdobbiadene Prosecco Superiore made by the tank (Charmat) method, which keeps the wine fresh, fruity and uncomplicated rather than bready like Champagne.\n\nThis is the default suggestion for a guest who wants a glass of bubbles to start.`,
        country: `Italy (Veneto)`,
        grapes: `Glera`,
        characteristics: `Light body, high acid; green apple, lime, white flowers; tank method sparkling.`,
        tastingNotes: `Uncomplicated, refreshing bubbles.`,
        suggestedPairings: `As an aperitif, spicy foods, lighter seafood, crab, oysters, light fried foods.`,
        producerInfo: `Made by the Sommariva family in the Veneto. Charmat (tank) method. Sloped vineyards in the hills of San Pietro di Feletto, in Conegliano Valdobbiadene.`,
        imageSrc: null,
      },
      {
        category: "WINES BY THE GLASS",
        title: "Charles Heidsieck 'Brut Réserve Special Edition' NV",
        description: `Our Champagne by the glass, and the most serious sparkling wine on the list.\n\nCharles Heidsieck is known for using an unusually high proportion of reserve wine, which gives the Brut Réserve far more depth and age character than most non-vintage Champagne.\n\nIf a guest wants to celebrate something, this is the pour.`,
        country: `Champagne, France`,
        grapes: `40% Chardonnay, 40% Pinot Noir, 20% Pinot Meunier`,
        characteristics: `Airy brioche aromas that quickly evolve to more iodized mineral notes and floral honeysuckle aromatics. After aeration, the wine reveals perfectly ripe yellow fruits reminiscent of apricot or white peaches.`,
        tastingNotes: `Lively and mineral, with a dark, graphite-like minerality. A beautifully structured power follows, with dark notes of cocoa and plum on the mid-palate. The finish is remarkably long with a vibrant, citrus-driven freshness.`,
        suggestedPairings: `Champagne goes with everything. Always.`,
        producerInfo: `50% reserve wines aged up to 20 years. 60 different vineyard sources, with all harvests vinified separately then blended into the house style. 36 months of extended ageing in their chalk cellars.`,
        imageSrc: null,
      },
    ]);

    /** WHITE */
    await db.insert(schema.wineCards).values([
      {
        category: "WINES BY THE GLASS",
        title: "J. & H. Selbach Riesling Kabinett 2023",
        description: `Our Riesling, from the Saar in Germany, and the lowest priced white on the list.\n\nKabinett is a ripeness level, not a sweetness level, but in practice this style carries a touch of residual sugar balanced by very high acidity, so it reads as off-dry and refreshing rather than sweet.\n\nThis is the wine to reach for with anything spicy, because the hint of sweetness cools the heat.`,
        country: `Saar Valley, Mosel-Saar-Ruwer, Germany`,
        grapes: `Riesling`,
        characteristics: `Bracing, laser-focused acidity and steely minerality, electric tension, vibrant citrus and orchard fruit flavors.`,
        tastingNotes: `Aromatic, with orchard fruits (green apple, pear) and crisp citrus, stony minerality. Light-bodied and vibrant. White peach, bright lemon, and hints of herbal complexity.`,
        suggestedPairings: `Watermelon Gazpacho, Tuna Tartare, Fried Oysters, Fried Green Tomatoes, Kanpachi Crudo, Jumbo Shrimp, anything spicy.`,
        producerInfo: `J&H Selbach is a renowned family-run winery and négociant based in the Mosel region of Germany, with heritage dating back to 1660. Managed by Johannes and Barbara Selbach, the estate is celebrated for crafting world-class, terroir-driven Rieslings that capture the classic minerality and elegance of the steep, blue Devonian slate slopes.`,
        imageSrc: null,
      },
      {
        category: "WINES BY THE GLASS",
        title: "Jean Reverdy 'La Reine Blanche' Sancerre 2025",
        description: `Our Sancerre, and the benchmark expression of Sauvignon Blanc.\n\nSancerre sits in the eastern Loire, where limestone and flint soils give the grape a mineral, citrus-driven character rather than the tropical, grassy profile of New Zealand.\n\nFermented entirely in stainless steel with no malolactic conversion, so it stays taut, clean and dry.`,
        country: `France (Loire)`,
        grapes: `100% Sauvignon Blanc`,
        characteristics: `Crisp acidity, minerality, citrus. Light to medium body. 100% stainless, no malolactic.`,
        tastingNotes: `Flintstone minerality, citrus, white peach, and linden flowers. Rich yet fresh, clean, and dry with lively acidity, lime zest, and a long mineral finish.`,
        suggestedPairings: `Salads, raw fish, Oysters.`,
        producerInfo: `The domaine spreads over 12 hectares (29.64 acres) — 9 hectares Sauvignon Blanc and 3 hectares Pinot Noir — and produces red, rosé and white wine. Vines are 25+ years old, and the vineyard is divided into 15 parcels located on the hills of Verdigny, Saint Satur, Sancerre and Thauvenay. The soil is a mix of "Terres a Silex" (silicious clay), "Caillottes" (pebbly limestone), and "Terres Blanches", also known as Kimmeridgian marl (white clay and limestone soil).`,
        imageSrc: null,
      },
      {
        category: "WINES BY THE GLASS",
        title: "Domaine Kresic Graševina 2025",
        description: `The most unusual white on the list, and a great wine to hand to a guest who wants to try something new.\n\nGraševina is Croatia's most widely planted white grape (known elsewhere as Welschriesling). It is unrelated to Riesling despite the name.\n\nClean, tart and food friendly, with a texture closer to Chenin Blanc than to Sauvignon Blanc.`,
        country: `Danube, Croatia`,
        grapes: `Graševina`,
        characteristics: `Fresh and floral aromas with notes of green apple, citrus, ginger, spice, and a stony, mineral-like finish.`,
        tastingNotes: `Clean, tart and refreshing. Citrus driven but with a Chenin-like texture.`,
        suggestedPairings: `Salads, raw fish, Oysters, chicken, cooked fish, tomatoes.`,
        producerInfo: `Podrumi Kresic was established by Dario Kresic in the village of Sarengrad on the banks of the Danube, with 22 hectares of vines. Riper fruit flavors with notes of ginger and spice complement apple and citrus, with a stony, mineral-like finish.`,
        imageSrc: null,
      },
      {
        category: "WINES BY THE GLASS",
        title: "Marine Layer 'Aires' Chardonnay 2023",
        description: `Our California Chardonnay, and the richer of the two Chardonnays on the list.\n\nSonoma Coast is a cool, fog-influenced region, so the wine keeps bright acidity even though it carries barrel influence and more weight than the Burgundy.\n\nThis is the pour for a guest who wants a Chardonnay with some body but not a heavy, oaky style.`,
        country: `Sonoma Coast, California`,
        grapes: `Chardonnay`,
        characteristics: `Aromas of lemongrass and Meyer lemon curd, wrapped in notes of brioche and graham cracker.`,
        tastingNotes: `Vibrant acidity carries the layered flavors seamlessly, while a touch of barrel influence adds depth. With its poised structure and refined character, this is a classic, cool-climate, coastal Californian Chardonnay.`,
        suggestedPairings: `Richer fish dishes, housemade spaghetti, jumbo shrimp, chicken, short rib.`,
        producerInfo: `A carefully curated selection of premier lots from Sonoma Coast's finest vineyards, including Green Valley, Petaluma Gap, and the estate's own Marine Layer Vineyard in the Sebastopol Hills. Bathed in cool, foggy nights and nurtured by diverse soils and distinctive microclimates, these sites yield a Chardonnay that is bright and vibrant, yet beautifully mineral-driven, layered with nuance and elegance.`,
        imageSrc: null,
      },
      {
        category: "WINES BY THE GLASS",
        title: "Jean-Philippe Fichet Bourgogne Côte d'Or 2024",
        description: `Our white Burgundy, and the leaner, more mineral of the two Chardonnays.\n\nFichet is based in Meursault and is widely regarded as a producer whose village-level and regional wines drink well above their classification.\n\nTight, saline and energetic — the choice for a guest who finds California Chardonnay too rich.`,
        country: `Burgundy, France`,
        grapes: `Chardonnay`,
        characteristics: `Bright citrus, green apple, white flowers, and subtle mineral notes, with a crisp, energetic palate and a clean, lingering finish. The 2024 vintage shows excellent freshness and tension, making this an outstanding value for lovers of white Burgundy.`,
        tastingNotes: `Bright citrus zest, green apple, white peach, and a chalky, saline minerality.`,
        suggestedPairings: `Richer fish dishes, housemade spaghetti, jumbo shrimp, chicken, short rib.`,
        producerInfo: `Fichet has flown largely under the world's radar. He began as a grower in 1981 but was forced to rebuild his domaine from scratch in the 1990s, having lost all his best fruit sources — including a piece of Meursault-Perrières — for lack of long-term contracts. But he learned from this experience. By 2000, he had used carefully negotiated long-term fermage and métayage agreements to create an extraordinary new domaine, brimming with exceptional sites.`,
        imageSrc: null,
      },
    ]);

    /** ROSÉ & ORANGE */
    await db.insert(schema.wineCards).values([
      {
        category: "WINES BY THE GLASS",
        title: "Domaine des Terres Promises 'L'Apostrophe' 2025",
        description: `Our rosé, from Provence — the reference point for the dry, pale, savory style of rosé.\n\nMade from 50 to 100 year-old vines and fermented with wild yeasts in large concrete tanks, which gives it more texture and weight than most Provençal rosé.\n\nDry and herbal rather than sweet, so it works as a food wine and not just an aperitif.`,
        country: `Provence, France`,
        grapes: `45% Grenache, 30% Carignan, 25% Cinsault`,
        characteristics: `Strawberry juice, ripe peaches, watermelon, and fresh citrus/grapefruit zest with a herbal hint of thyme and a creamy, textural, persistent palate.`,
        tastingNotes: `Pale salmon in the glass. Red berry and stone fruit lead, with grapefruit zest and a savory thyme note underneath. The concrete fermentation gives it a creamy mid-palate, and it finishes dry and persistent rather than fruity.`,
        suggestedPairings: `As an aperitif, farm lettuces, compostella arugula, fried green tomatoes, jumbo shrimp, grilled tuna sandwich, lamb kofta.`,
        producerInfo: `Domaine des Terres Promises is located in the wild heart of Provence — no oligarch yachts parked here — between the tiny towns of Jouques and Rians, at an altitude of more than 1300 feet, just across from the rocky and imposing Mont Saint Victoire. Pierre Michelland is able to make some of the most authentic, joyful wines we know in the area, and this pale rosé is the real deal, made from 50 to 100 year-old vines and fermented with wild yeasts in huge concrete tanks.`,
        imageSrc: null,
      },
      {
        category: "WINES BY THE GLASS",
        title: "Cantina Furlani 'Altopiano Orange' 2025",
        description: `Our orange wine. Orange wine is a white grape fermented on its skins, the way a red wine is made, which gives it color, texture and a light grip of tannin.\n\nThis one is made from Müller-Thurgau grown biodynamically above Trento, fermented with no temperature control, no added yeast and no sulfur.\n\nSet expectations before you pour it. It looks and feels unlike a normal white, and guests should know that going in.`,
        country: `Alto Adige, Italy`,
        grapes: `Müller-Thurgau`,
        characteristics: `A bright and fresh wine with notes of peach, lemon, rose petal, and lime.`,
        tastingNotes: `Light bodied and aromatic, with white flowers and fresh alpine herbs on the nose. Peach, lemon, rose petal and lime on the palate, with a lightly tannic, dried-tea finish from the skin contact.`,
        suggestedPairings: `Kanpachi crudo, bluefin tuna tartare, lamb kofta, fried green tomatoes, housemade spaghetti, cheese.`,
        producerInfo: `Soils are surface clay over schist and broken granite, known as sasso dolomitico, planted in several small parcels surrounding the village of Povo, directly above Trento. Vines are trained in the traditional 'Pergola Trentina' allowing for proper ventilation, drying and sun exposure. Wines are fermented either in cement tanks or small glass demijohns with no temperature control, no yeast, and no sulfur.`,
        imageSrc: null,
      },
    ]);

    /** RED */
    await db.insert(schema.wineCards).values([
      {
        category: "WINES BY THE GLASS",
        title: "Domaine de la Prébende Beaujolais 2024",
        description: `Our lightest red, and the most food-friendly glass on the list.\n\nBeaujolais is made from Gamay, a thin-skinned grape that produces wines with bright red fruit, high acidity and very little tannin — this one can take a slight chill.\n\nThe one red that works with the gumbo, and a good suggestion for a guest who says they do not usually drink red.`,
        country: `Beaujolais, France`,
        grapes: `Gamay`,
        characteristics: `Light to medium-bodied, high acidity, low tannin, and vibrant red fruit aromas. The region's signature is often enhanced by carbonic maceration, yielding bright, fruity expressions.`,
        tastingNotes: `A light-bodied, juicy Gamay that delivers bright red fruit flavors, including wild cherry, raspberry, and red currant. It balances succulent acidity and soft tannins with a crisp, refreshing, and subtly earthy finish.`,
        suggestedPairings: `Gumbo, lamb kofta, salmon, duck.`,
        producerInfo: `Domaine de la Prébende produces a deeply mineral Beaujolais from a predominantly clay and limestone terroir, a rarity in a region dominated by granite soils. "Une prébende" essentially means "a tax," and the domaine sits on the location where monks used to collect taxes from the villagers. As Ghislaine Dupeuble puts it, "Monks didn't like to own low end vineyards!"`,
        imageSrc: null,
      },
      {
        category: "WINES BY THE GLASS",
        title: "Division Wine Co. 'Yama' Pinot Noir 2023",
        description: `Our Oregon Pinot Noir, and the lighter and more approachable of the two Pinots on the list.\n\nFrom organically farmed Willamette Valley sites, made with natural fermentations and low intervention in the cellar, which keeps the alcohol down and the fruit fresh.\n\nThis is the easy-drinking red — simple, juicy, and a safe recommendation for almost anyone.`,
        country: `Willamette Valley, Oregon`,
        grapes: `Pinot Noir`,
        characteristics: `Wild strawberry, raspberry, black cherry, medium minus body, medium plus acid, silky tannins.`,
        tastingNotes: `Fresh and fruity, simple but delicious. Crushable red fruits, lighter in alcohol.`,
        suggestedPairings: `Duck, tuna sandwich, poultry, mushrooms.`,
        producerInfo: `Division Winemaking Company is a Portland, Oregon based winery founded in 2010 by Kate Norris and Thomas Monroe. Inspired by the wineries of the Loire, Beaujolais, Burgundy and the Northern Rhone, where Kate and Thomas first learned winemaking and viticulture, Division crafts approachable and balanced wines with an emphasis on minimal manipulation in the cellar. YAMA is their Willamette Valley line, offering exceptional value from organically farmed sites made with natural fermentations and low intervention techniques in the cellar.`,
        imageSrc: null,
      },
      {
        category: "WINES BY THE GLASS",
        title: "Domaine Charles Audoin Bourgogne Côte d'Or 2023",
        description: `Our red Burgundy, and the more structured and savory of the two Pinot Noirs.\n\nAudoin is based in Marsannay, at the northern end of the Côte de Nuits. The estate is largely responsible for putting that appellation on the map.\n\nCompared to the Oregon Pinot, this is earthier and more mineral, with finer tannins and a savory finish.`,
        country: `Côte d'Or, Burgundy, France`,
        grapes: `Pinot Noir`,
        characteristics: `Bright ruby color with aromas of sour cherry, raspberry, red plums, subtle florals, and crushed minerals; juicy, vibrant, and light-to-medium-bodied with fine tannins and a savory finish.`,
        tastingNotes: `Sour cherry and red plum on the nose with crushed mineral and a subtle floral lift. Juicy and vibrant on the palate, light to medium bodied, with fine tannins carrying into a savory finish.`,
        suggestedPairings: `Roast chicken, poultry with herb or mushroom sauces, pork tenderloin, and duck.`,
        producerInfo: `Domaine Charles Audoin is an estate that is responsible in large part for putting Marsannay on the map. Initially considered a less-favorable terroir and not even given its own AOC until 1987, winemakers like Charles Audoin have shown that this is an appellation well worthy of recognition. All the wines undergo natural yeast fermentation. Red grapes are entirely destemmed, an evolution from previous vintages, and extractions are gentle, with an average of two weeks of maceration. The wines age for about one year in barrel, mainly used, but with some new oak depending on the cuvée, and are bottled unfined and unfiltered.`,
        imageSrc: null,
      },
      {
        category: "WINES BY THE GLASS",
        title: "Pecchenino 'Botti' Langhe Nebbiolo 2024",
        description: `Our Nebbiolo, from the Langhe in Piedmont — the same grape used for Barolo and Barbaresco, but in a younger, more approachable form.\n\nNebbiolo is the classic trick wine: it is pale in the glass and smells delicate, then delivers firm tannin and acidity on the finish.\n\nAs the matrix puts it, Nebbiolo is like being kicked in the face by a ballerina. Warn guests who expect a dark, soft red.`,
        country: `Langhe, Piedmont, Italy`,
        grapes: `Nebbiolo`,
        characteristics: `It has been said that Nebbiolo is like being kicked in the face by a ballerina — red fruit with hints of mushroom on the nose and front palate, tannin on the back.`,
        tastingNotes: `Tart red fruit with mushroom notes, light to medium body, bright acidity and, of course, tannin.`,
        suggestedPairings: `Chicken, duck, lamb, beef.`,
        producerInfo: `Pecchenino is located in Dogliani, in Piedmont. The estate is best known for its Dolcetto, and its calcareous soils lead to better maturation of the grapes, producing elegant wines with soft, integrated tannins and a classic deep ruby to purple hue.`,
        imageSrc: null,
      },
      {
        category: "WINES BY THE GLASS",
        title: "David Arthur 'DAV' Cabernet Sauvignon 2021",
        description: `Our Napa Cabernet, and the biggest, richest red on the by-the-glass list.\n\nA Bordeaux-style blend built around mountain-grown Cabernet Sauvignon, aged an average of 20 months in French oak.\n\nThis is the steak wine. Recommend it with the bavette and the wagyu striploin.`,
        country: `Napa, California`,
        grapes: `76% Cabernet Sauvignon, 24% Merlot`,
        characteristics: `Baked cherry, blackberry, toasted oak, vanilla, tobacco leaf, firm tannin.`,
        tastingNotes: `The palate is richly layered, framed by grained tannins that provide both tension and breadth. The finish is smooth and persistent, carrying flavors of black cherry, cassis, and a touch of toasted walnut.`,
        suggestedPairings: `All steak, duck.`,
        producerInfo: `This Bordeaux-style blend allows the winery to weave together the rich, concentrated elegance and power of their mountain-grown Bordeaux varietals with the best of surrounding vineyards within the Napa Valley. The wine is aged an average of 20 months in French oak barrels, blended with meticulous care and bottled at the vineyard estate. The result is a complex array of aromas and flavors that deliver plush, mouth-filling structure with soft, elegant tannins.`,
        imageSrc: null,
      },
    ]);

    // Syncs react-admin and react-simple-data-rest with existing db
    await db.execute(
      sql`SELECT setval('cards_id_seq', (SELECT MAX(id) FROM cards))`,
    );
    await db.execute(
      sql`SELECT setval('wine_cards_id_seq', (SELECT MAX(id) FROM wine_cards))`,
    );

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the cards");
  }
};

main();