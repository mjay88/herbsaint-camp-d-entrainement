import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, sql } from "drizzle-orm";

import * as schema from "../db/schema";

const db = drizzle(process.env.DATABASE_URL!);

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Back Waiter - Steps of Service ",
        imageSrc: "/gumbo-circle.svg",
      },
      {
        id: 2,
        title: "Dessert Menu",
        imageSrc: "/pie.svg",
      },
      {
        id: 3,
        title: "Front Waiter - Steps of Service",
        imageSrc: "/main-courses.svg",
      },
      {
        id: 4,
        title: "The Menu",
        imageSrc: "/spaghetti.svg",
      },
      {
        id: 5,
        title: "Wine Service Standards",
        imageSrc: "/wine-red.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Back Waiter - Steps of Service",
        description: "The Basics",
        order: 1,
      },
      {
        id: 2,
        courseId: 2,
        title: "The Dessert Menu",
        description: "The Dessert Menu",
        order: 2,
      },
    ]);
/**
 * Lessons for Course 1, Unit 1 Back waiter steps of service
 */
    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: "A note on Hospitality",
      },
      {
        id: 2,
        unitId: 1,
        order: 2,
        title: "Greeting Tables - Beverage Service",
      },
      {
        id: 3,
        unitId: 1, // unit 1 : The Basics
        order: 3,
        title: "First Course",
      },
      {
        id: 4,
        unitId: 1, // unit 1 : The Basics
        order: 4,
        title: "Second Course",
      },
      {
        id: 5,
        unitId: 1, // unit 1 : The Basics
        order: 5,
        title: "Dessert and After Dinner Drinks",
      },
      //TODO: I want this as the final lesson for the back waiter and a stand alone module?
     
    ]);
   
/**
 * Lessons for Course 2, Unit 1 Desserts
 */
    await db.insert(schema.lessons).values([
      {
        id: 6,
        unitId: 2,
        order: 1,
        title: "The Banana Brown Butter Tart",
      },
      {
        id: 7,
        unitId: 2,
        order: 2,
        title: "Vanilla Pot de Creme",
      },
      {
        id: 8,
        unitId: 2, 
        order: 3,
        title: "Flourless Chocolate Cake",
      },
      {
        id: 9,
        unitId: 2, 
        order: 4,
        title: "Fried Peach Hand Pie",
      },
      {
        id: 10,
        unitId: 2, 
        order: 5,
        title: "Lemon Yuzu Tart",
      },
      {
        id: 11,
        unitId: 2, 
        order: 6,
        title: "Artisanal Cheese",
      },
    
    ]);
    /**
     * Course id - 1: Back Waiter Steps of Service
     * Unit id - 1:  Back Waiter - Steps of Service
     * Lesson id - 1: A note on Hospitality
     */
    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "CURRICULUM",
        order: 1,
        question:
          "The hospitality we strive to provide is welcoming guests into our own home for a dinner party. Our style is familial but always professional. We greet everyone with a smile and never let anyone walk out without a warm goodbye! Everything we do is aimed at making our guests feel welcome, comfortable, and well cared for.\nWe create the atmosphere with the music we play, how the restaurant is set up and presented, how sharp the team looks, and with decadent smells wafting from the kitchen. Coming to work each day is an opportunity to leave the stress of our personal lives at the door and enter the stage, which is our dining room! We, as hosts, set the tone of the party. It's much easier for everyone to have a good time if it looks like we are.",
      },
      {
        id: 2,
        lessonId: 1,
        type: "CURRICULUM",
        order: 2,
        question:
          "Service is important. When we are seamless and consistent in our guest interactions, we take all the stress and confusion out of guests' choices. From the appearance of the table when guests are seated to our demeanor as we walk through the dining room, our level of control and professionalism puts guests at ease, even subconsciously. Your energy, whether positive or negative, will be absorbed by both your teammates and guests, so contribute good vibes!",
      },
      {
        id: 3,
        lessonId: 1,
        type: "CURRICULUM",
        order: 3,
        question:
          "Every guest and every table is different. A key skill for any server, bartender, or manager is identifying how guests are feeling and what style of service they want. Do they look tired? Maybe they just drove into town? Maybe a couple has been fighting. Is this an important business lunch, and should we remain in the background? Is this their first time joining us, and they want the full spiel and all the interaction you can give? Don't force engagement if guests want privacy, and be present if they are excited to hear from you. Either way is okay and provides great service, because it is specifically what the guest wants. Be adaptable and stay attentive.",
      },
      {
        id: 4,
        lessonId: 1,
        type: "CURRICULUM",
        order: 4,
        question:
          "Service can go a long way to making a guest feel satisfied; Hospitality makes people feel at home and excited for their next visit.",
      },
    ]);

    /**
     * Course id - 1: Back Waiter Steps of Service
     * Unit id - 1:  Back Waiter - Steps of Service
     * Lesson id - 2: Greeting Tables - Beverage Service
     * order: 2
     */
    await db.insert(schema.challenges).values([
      {
        id: 5,
        lessonId: 2,
        type: "CURRICULUM",
        order: 1,
        question: `It is your job to support your Front Waiter however possible. The name of the game is communication. \nObserve your station, see which table is being seated, and get the water glasses ready while the Front Waiter greets. \n\nNote: There will be times your Front Waiter is assisting a large or demanding table and is unable to greet a new seating within the 60 second window. Refer to the Front Waiter steps of service to get the table started. As soon as the Front Waiter is free, immediately revert to assigned roles. This avoids miscommunication both with your partner and the guests, and ensures clarity and responsibility of duties.
        `,
      },
      {
        id: 6,
        lessonId: 2,
        type: "CURRICULUM",
        order: 2,
        question: `Check with your Front Waiter for water preferences. Serve water quickly, always using a tray in your left hand, approaching the guest from the right side, and placing glass down with your right hand at the top right hand side of the guest. Never touch a glass close to or at its rim. Never assume a table would like ice water, changing it looks unprofessional and you potentially lose a sale.\n\nHand signals: Holding your hand across and over your chest and tapping your shoulder means tap water, still hand means bottled still, and wiggling fingers means sparkling.`,
      },
      {
        id: 7,
        lessonId: 2,
        type: "CURRICULUM",
        order: 3,
        question: `Only bring citrus with bottled water if a guest has requested it. Your front waiter will inform you of their choice. Citrus wedges should be clean and fresh, with enough to serve each guest and presented on a small B+B plate (not on the glass).\n\nDo not let the guest’s water glass become empty. If they are having ice water, top off with a water pitcher. If they are having bottled water, offer another bottle and ring it in. Collect bottled water from the service bar and pour.`,
      },
      {
        id: 8,
        lessonId: 2,
        type: "CURRICULUM",
        order: 4,
        question: `Screen your section at all times. You’re at your best when you know what’s going on at every table. Where are they at in the meal? What are your next 5 tasks? How can you best consolidate?\n\nIf pouring water for a table, scan the section and top off other tables that also need water. `,
      },
      {
        id: 9,
        lessonId: 2,
        type: "SELECT",
        order: 5,
        question: `What are the hand signals for tap, sparking, and still water?`,
      },
      {
        id: 10,
        lessonId: 2,
        type: "SELECT",
        order: 6,
        question: "Upon seating, how soon should a table be greeted?",
      },
      {
        id: 11,
        lessonId: 2,
        type: "SELECT",
        order: 7,
        question:
          "Should citrus wedges be presented on a B + B plate or on the edge of the glass?",
      },
    ]);
    //  {
    //       id: 9,
    //       lessonId: 2,
    //       type: "SELECT",
    //       order: 5,
    //       question: `What are the hand signals for tap, sparking, and still water?`,
    //     },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 9,
        imageSrc: "",
        correct: true,
        text: `Holding your hand across and over your chest and tapping your shoulder means tap water, still hand means bottled still, and wiggling fingers means sparkling.`,
      },
      {
        challengeId: 9,
        imageSrc: "",
        correct: false,
        text: "A thumbs up means tap water, a thumbs down means still water, and a peace sign means sparkling.",
      },
      {
        challengeId: 9,
        imageSrc: "",
        correct: false,
        text: "Just ask your front waiter.",
      },
      {
        challengeId: 9,
        imageSrc: "",
        correct: false,
        text: "Automatically bring tap water to the table and then ask if anyone would like sparkling or still.",
      },
    ]);

    // {
    //   id: 10,
    //   lessonId: 2,
    //   type: "SELECT",
    //   order: 6,
    //   question: "Upon seating, how soon should a table be greeted?",
    // },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 10,
        imageSrc: "",
        correct: false,
        text: "45 minutes",
      },
      {
        challengeId: 10,
        imageSrc: "",
        correct: false,
        text: "30 seconds",
      },
      {
        challengeId: 10,
        imageSrc: "",
        correct: false,
        text: "2 minutes",
      },
      {
        challengeId: 10,
        imageSrc: "",
        correct: true,
        text: "60 seconds",
      },
    ]);

    // {
    //   id: 11,
    //   lessonId: 2,
    //   type: "SELECT",
    //   order: 7,
    //   question:
    //     "Should citrus wedges be presented on a B + B plate or on the edge of the glass?",
    // },

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 11,
        imageSrc: "",
        correct: false,
        text: "On the edge of the glass.",
      },
      {
        challengeId: 11,
        imageSrc: "",
        correct: true,
        text: "Neatly on a B & B plate.",
      },
    ]);

    /**
     * Course id - 1: Back Waiter Steps of Service
     * Unit id - 1:  Back Waiter - Steps of Service
     * Lesson id - 3: First Course
     * order: 3
     */

    await db.insert(schema.challenges).values([
      {
        id: 12,
        lessonId: 3,
        type: "CURRICULUM",
        order: 1,
        question: `Always keep an eye out for food in the window. Help deliver it whether it is your table's order or not. Hot food out is always our first priority. Never ever take food out without a ticket, even if you are certain you know where it goes. Repeat the name of the dish, the table, and the seat number, to the expediter every time. When dropping food, check that the table has proper presets: share plates, steak knife, etc. Food does not get dropped on an unmarked table.\n\nAll food leaves the window on the right/left, depending on the restaurant. Dishes should always be carried away from your body. Never use any area of your torso to balance dishes, whether serving or bussing. If it feels awkward, it looks awkward.`,
      },
      {
        id: 13,
        lessonId: 3,
        type: "CURRICULUM",
        order: 2,
        question: `Always manicure tables in your station as you go. This means if something is unnecessary on a table, it goes. Remove excess debris, empty sugar packets, discarded cocktail garnish. If a guest ever gets up while dining be sure to fold their napkin and place neatly on the table before they return. If the napkin is exceptionally dirty, replace it with a new one. Attention to detail is what sets us apart. This can be done discreetly, no need to interject yourself by asking unnecessary questions which can be answered by reading the table. Do not narrate what you're doing.`,
      },
      {
        id: 14,
        lessonId: 3,
        type: "SELECT",
        order: 3,
        question: `Running what type of food is always the first priority?`,
      },
      {
        id: 15,
        lessonId: 3,
        type: "SELECT",
        order: 4,
        question: `When should tables be manicured throughout the dining experience?`,
      },
      {
        id: 16,
        lessonId: 3,
        type: "CURRICULUM",
        order: 5,
        question: `If guests want to order food with a back waiter, let the guest know that you will inform the front waiter that they are ready and immediately make the front waiter aware. Perception is everything and how we communicate this to the guest is critical to maintaining a positive hospitality experience.\n\nNote: If the guest does not want to wait for the front waiter or just starts ordering anyway, write down the order, read it back to the guest to confirm, and then hand it off to the front waiter. Do not ring it in yourself. They will confirm coursing with the guest and ring in the order using proper modifiers.\n\nWhether taking a food or beverage order that is outside our normal steps of service, make sure to find your teammate immediately so we don't ask the table twice about the same thing. Then ring it in.`,
      },
      {
        id: 17,
        lessonId: 3,
        type: "CURRICULUM",
        order: 6,
        question: `Your Front Waiter will mark the first course before ringing in the order. They may communicate with you about share-plates, marking utensils, drink orders at the bar, etc. Check the POS if the front server is busy to see what is coming.\n\nOnce the Front Waiter has taken the order, serve bread and butter immediately. Use a bread basket for tables of 4 or larger (one butter for every 4-6 guests), and french service for tables of 2.`,
      },
      {
        id: 18,
        lessonId: 3,
        type: "CURRICULUM",
        order: 7,
        question: `Refill beverages throughout your station, keeping your eyes up and moving. When refilling water and iced tea, glasses stay on the table. Walk around the table. Never stand in one place and pour for everyone. Don't ask, just refill. If you have poured out their water, soda, wine, then ask if they would like another or offer the menu if they would like something else.`,
      },
      {
        id: 19,
        lessonId: 3,
        type: "CURRICULUM",
        order: 8,
        question: `Before food hits the table, make sure they have everything they need to enjoy their course. Share plates, proper utensils, water, drinks, a clean table.`,
      },
      {
        id: 20,
        lessonId: 3,
        type: "SELECT",
        order: 9,
        question: `If the guest does not want to wait for the front waiter or just starts ordering with, what are the steps you should follow?`,
      },
      {
        id: 21,
        lessonId: 3,
        type: "SELECT",
        order: 10,
        question: `Who is responsible for marking the table for the first course?`,
      },

      {
        id: 22,
        lessonId: 3,
        type: "CURRICULUM",
        order: 11,
        question: `Serve the first course: Women first (if possible), placing plates discreetly from the right side with your right hand. Announce the dish you are serving and always place protein toward the guest (6 o'clock position).\n\nKnow where you're going, know your seat numbers, do NOT auction off food at the table. Watch your elbows and use an open arm when serving guests (chest is facing the guest and you are not backhanding them). Do not lean over the table, avoid reaching in front of a guest whenever possible, and excuse your reach if you can't avoid it.\n\nWhen possible, drop entrees and large format items before sides. Not only are these items more impressive visually, it can be difficult to present larger plates with sides scattered around the table.`,
      },
      {
        id: 23,
        lessonId: 3,
        type: "CURRICULUM",
        order: 12,
        question: `If your Front Waiter is tied up at another table, check back with guests to ensure their satisfaction within 2 bites or 2 minutes. Manicure table as you go, checking beverage levels including wine.\n\nIf you QC a table, be sure to communicate with your Front Waiter. We want to avoid interrupting the guests' meal multiple times unnecessarily. Multiple servers asking the same questions looks unprofessional and incompetent`,
      },
      {
        id: 24,
        lessonId: 3,
        type: "SELECT",
        order: 13,
        question: `What is the correct method for delivering food to a table? Choose the best option.`,
      },
      {
        id: 25,
        lessonId: 3,
        type: "CURRICULUM",
        order: 14,
        question: `Don't be afraid to ask tables what they need. This can usually be accomplished by making eye contact with the guest and giving them an opportunity to express wants/needs, not just interrupting by asking.`,
      },
      {
        id: 26,
        lessonId: 3,
        type: "CURRICULUM",
        order: 15,
        question: `Clear first course as needed. If possible, wait till the last person finishes eating. Remove all used plates and silverware using open arm service, just like when serving food or drinks.\n\nAsk: "May I take your plate?" Once you've asked one guest, it's unnecessary to continue to ask the others. A guest will let you know if they're not ready.\n\nIf a guest has placed their fork and knife parallel to one another on the right-hand side of the plate, there is no need to ask: "May I take your plate?" This is the guest signaling they are finished. Avoid clearing a table when other people are still eating. Exceptions: stacked plates, napkin on plate, guest is asking for it to be taken or pushes dish away - clear these immediately.`,
      },
      {
        id: 27,
        lessonId: 3,
        type: "SELECT",
        order: 16,
        question: `Ideally, when should you start clearing the first course?`,
      },
    ]);

    //TODO: check all challenge ids

    /**
     * ChallengeOptions - lessonId : 3
     */

    //  {
    //     id: 14,
    //     lessonId: 3,
    //     type: "SELECT",
    //     order: 3,
    //     question: `Running what type of food is always the first priority?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 14,
        imageSrc: "",
        correct: false,
        text: "Desserts",
      },
      {
        challengeId: 14,
        imageSrc: "",
        correct: true,
        text: "Hot food",
      },
      {
        challengeId: 14,
        imageSrc: "",
        correct: false,
        text: "Cold food",
      },
      {
        challengeId: 14,
        imageSrc: "",
        correct: false,
        text: "You should prioritize running food for your section first, then run other sections food.",
      },
    ]);
    // {
    //   id: 15,
    //   lessonId: 3,
    //   type: "SELECT",
    //   order: 4,
    //   question: `When should tables be manicured throughout the dining experience?`,
    // },

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 15,
        imageSrc: "",
        correct: false,
        text: `Once at the beginning and once at the end of the meal.`,
      },
      {
        challengeId: 15,
        imageSrc: "",
        correct: false,
        text: `Before the main course gets dropped.`,
      },
      {
        challengeId: 15,
        imageSrc: "",
        correct: false,
        text: `After the last guest has finished their entree.`,
      },
      {
        challengeId: 15,
        imageSrc: "",
        correct: true,
        text: `Tables should be manicured continually throughout the meal. Remove excess debris, empty sugar packets, discarded cocktail garnishes, unnecessary utensils, ect...`,
      },
    ]);
    // {
    //   id: 20,
    //   lessonId: 3,
    //   type: "SELECT",
    //   order: 9,
    //   question: `If the guest does not want to wait for the front waiter or just starts ordering with, what are the steps you should follow?`,
    // },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 20,
        imageSrc: "",
        correct: false,
        text: `Politely let them know that you cannot take orders and that the front waiter will be with them shortly.`,
      },
      {
        challengeId: 20,
        imageSrc: "",
        correct: false,
        text: `Take the guests order and ring it in as soon as possible.`,
      },
      {
        challengeId: 20,
        imageSrc: "",
        correct: true,
        text: `Write down the order, read it back to the guest to confirm, and then hand it off to the front waiter. Do not ring it in yourself.`,
      },
      {
        challengeId: 20,
        imageSrc: "",
        correct: false,
        text: `Stall the guest by telling them a joke or a humorous anecdote.`,
      },
    ]);
    //  {
    //     id: 21,
    //     lessonId: 3,
    //     type: "SELECT",
    //     order: 10,
    //     question: `Who is responsible for marking the table for the first course?.`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 21,
        imageSrc: "",
        correct: true,
        text: `The front waiter`,
      },
      {
        challengeId: 21,
        imageSrc: "",
        correct: false,
        text: `The guests can grab what utensils and share plates they need from the guéridon themselves.`,
      },
      {
        challengeId: 21,
        imageSrc: "",
        correct: false,
        text: `The back waiter`,
      },
      {
        challengeId: 21,
        imageSrc: "",
        correct: false,
        text: `The guests already have everything they need when they are first sat, so you don't have to worry about it.`,
      },
    ]);

    //     {
    //   id: 24,
    //   lessonId: 3,
    //   type: "SELECT",
    //   order: 13,
    //   question: `What is the correct method for delivering food to a table? Choose the best option`,
    // },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 24,
        imageSrc: "",
        correct: false,
        text: `Action off food to figure out what guests ordered what item.`,
      },
      {
        challengeId: 24,
        imageSrc: "",
        correct: true,
        text: `Place plates discreetly from the right side of the guest with your right hand. Announce the dish you are serving and always place the protein toward the guest (6 o'clock position).`,
      },
      {
        challengeId: 24,
        imageSrc: "",
        correct: false,
        text: `Place all the food in the middle of the table and the guests will figure it out themselves.`,
      },
      {
        challengeId: 24,
        imageSrc: "",
        correct: false,
        text: `Serve from the left side of the guest with your left hand.`,
      },
    ]);
    // {
    //     id: 27,
    //     lessonId: 3,
    //     type: "SELECT",
    //     order: 16,
    //     question: `Ideally, when should you start clearing the first course?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 27,
        imageSrc: "",
        correct: false,
        text: `When the first guest has placed their fork and knife parallel to one another on the right-hand side of the plate.`,
      },
      {
        challengeId: 27,
        imageSrc: "",
        correct: false,
        text: `When they have signalled to you that they are all done and ready for the next course.`,
      },
      {
        challengeId: 27,
        imageSrc: "",
        correct: false,
        text: `When the expo tells you the next course is coming out.`,
      },
      {
        challengeId: 27,
        imageSrc: "",
        correct: true,
        text: `When the last guest has finished eating.`,
      },
    ]);

    /**
     * Course id - 1: Back Waiter Steps of Service
     * Unit id - 1:  Back Waiter - Steps of Service
     * Lesson id - 4: Second Course
     */
    await db.insert(schema.challenges).values([
      {
        id: 28,
        lessonId: 4,
        type: "CURRICULUM",
        order: 1,
        question: `Whenever moving through the dining room, keep your eyes up, and smile. Be aware of tight spaces and corners. If another server has a wine glass or tray behind their back, surreptitiously take it. Your eyes should be constantly moving between:\\n • Expo Window\\n • Cocktails/wine at the bar\\n • Your Front/Back Waiter\\n • Other Servers' or Customers' eyes\\n • Tables in your section`,
      },
      {
        id: 29,
        lessonId: 4,
        type: "CURRICULUM",
        order: 2,
        question: `Communicate with your Front Waiter, look on the POS for second course share plates, marking, etc. Properly mark the table for the second course. A table should be marked before the second course arrives. Communicate with the expo if your tables food is in the window and the table hasn't been properly marked yet.\\nCheck beverage and wine levels at all tables, always manicuring as you go. Again, if something is unnecessary on the table, it should be removed.`,
      },
      {
        id: 30,
        lessonId: 4,
        type: "SELECT",
        order: 3,
        question: `When should a table be marked for the second course?`,
      },
      {
        id: 31,
        lessonId: 4,
        type: "CURRICULUM",
        order: 4,
        question: `Serve second course: Women first (if possible), placing plates discreetly from the left side with your left hand. Always announce the dish you are presenting.\\nScan your section; know what's going on at all times`,
      },
      {
        id: 32,
        lessonId: 4,
        type: "CURRICULUM",
        order: 5,
        question: `Guests should be cleared from their right-hand side with your right hand. Place the first plate in the left hand. This plate will act as your tray for off-sized dishes and silver. The second plate is balanced on your left wrist and palm. Subsequent plates are stacked on the second. Do not hover your left arm above a guest when clearing, hold it behind them and be mindful of personal space. Never stack plates on the table before picking them up and don't clear more than you're comfortable with. Again, if it feels awkward, it looks awkward.\\nIf you need help, ask your partner before approaching the table, or make eye contact with a passing server. Take the dirty dishes directly to the kitchen. Never approach another table with full hands, only clear one table at a time.`,
      },
      {
        id: 33,
        lessonId: 4,
        type: "CURRICULUM",
        order: 5,
        question: `The table should be crumbed (with a server's crumber) and cleaned. Just as at the start of the meal, we never drop menus on a dirty table.`,
      },
      {
        id: 34,
        lessonId: 4,
        type: "SELECT",
        order: 6,
        question: `What word best completes the phrase: "If it feels _______, it looks _______."`,
      },
    ]);
    /**
     * ChallengeOptions - lessonId : 4
     */

    //  {
    //         id: 30,
    //         lessonId: 4,
    //         type: "SELECT",
    //         order: 2,
    //         question: `When should a table be marked for the second course?`,
    //       },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 30,
        imageSrc: "",
        correct: false,
        text: `As their food is leaving the expo window.`,
      },
      {
        challengeId: 30,
        imageSrc: "",
        correct: false,
        text: `After the food has arrived at the table.`,
      },
      {
        challengeId: 30,
        imageSrc: "",
        correct: true,
        text: `Before the second course arrives at the table.`,
      },
      {
        challengeId: 30,
        imageSrc: "",
        correct: true,
        text: `When the expo tells you the next course is coming out.`,
      },
    ]);

    // {
    //   id: 34,
    //   lessonId: 4,
    //   type: "SELECT",
    //   order: 6,
    //   question: `What word best completes the phrase "If it feels _______, it looks _______`".,
    // },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 34,
        imageSrc: "",
        correct: false,
        text: `cool`,
      },
      {
        challengeId: 34,
        imageSrc: "",
        correct: true,
        text: `awkward`,
      },
      {
        challengeId: 34,
        imageSrc: "",
        correct: true,
        text: `maladroit`,
      },
      {
        challengeId: 34,
        imageSrc: "",
        correct: true,
        text: `acceptable`,
      },
    ]);
    /**
     * Course id - 1: Back Waiter Steps of Service
     * Unit id - 1:  Back Waiter - Steps of Service
     * Lesson id - 5: Dessert
     */
    await db.insert(schema.challenges).values([
      {
        id: 35,
        lessonId: 5,
        type: "CURRICULUM",
        order: 1,
        question: `Present dessert menus: "If anyone would like something sweet to finish, we have some great options. Dessert wine and after-dinner drink pairings are listed just below each dessert. We also have whiskeys/after-dinner drinks listed on the back of the menu."\n\nSave yourself a trip and offer coffee or tea now. When you return with the coffee, take the dessert order, ladies first, recording everything in your captain's pad with proper seat numbers. Remove dessert menus from the table. Remove Salt & Pepper shakers at this time. Communicate with your Front Waiter that a dessert order has been taken, in addition to the non-verbal cue.`,
      },
      {
        id: 36,
        lessonId: 5,
        type: "CURRICULUM",
        order: 2,
        question: `Mark for dessert, dropping share plates when appropriate. Silverware should be dropped to the guest's sides, fork on the left, spoon on the right. This should be done prior to ringing in the dessert order. `,
      },
      {
        id: 37,
        lessonId: 5,
        type: "SELECT",
        order: 3,
        question: `What is the non-verbal cue that a dessert order has been taken?`,
      },
      {
        id: 38,
        lessonId: 5,
        type: "CURRICULUM",
        order: 4,
        question: `Mark for dessert, dropping share plates when appropriate. Silverware should be dropped to the guest's sides, fork on the left, spoon on the right. Check if anyone needs a new napkin. This should be done prior to ringing in the dessert order.\\nServe dessert from the guest's left with your left hand, announcing it when dropping. Check back with your guest within 2 bites or 2 minutes. Are the guests involved in conversation? Can this QC should be accomplished by simply topping off drinks and making eye contact with each guest?.`,
      },

      {
        id: 39,
        lessonId: 5,
        type: "CURRICULUM",
        order: 5,
        question: `Clear desserts, removing all dishes, unused glasses, and napkins placed on the table. Do not let half-finished desserts sit for 5 min. Good eye contact with the guest will let you know when they're ready for the check, if they need more coffee, or if they're ready for the dessert to be cleared. Clearing as much as possible now makes for an easier and quicker reset once the guests leave.`,
      },
      {
        id: 40,
        lessonId: 5,
        type: "CURRICULUM",
        order: 6,
        question: `Keep refilling water as long as guests are still seated and manicure the table, even after check has been picked up.\\nThank guests as they are leaving.`,
      },
      {
        id: 41,
        lessonId: 5,
        type: "CURRICULUM",
        order: 7,
        question: `Once guests leave, inform and assist the floaters to immediately clear the empty table. Clean it properly, and reset it within 3 minutes. Trays are never set on the table or on a chair and use proper form as you would if guests were still seated. The tables nearby can see you.`,
      },
      {
        id: 42,
        lessonId: 5,
        type: "SELECT",
        order: 6,
        question: `How long should you keep guests' water?`,
      },
      {
        id: 43,
        lessonId: 5,
        type: "SELECT",
        order: 7,
        question: `Once the guests' have left, how long should it take to reset the table?`,
      },
    ]);

    /**
     * ChallengeOptions - lessonId : 5
     */

    // {
    //   id: 37,
    //   lessonId: 5,
    //   type: "SELECT",
    //   order: 3,
    //   question: `What is the non-verbal cue that a dessert order has been taken?`,
    // },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 37,
        imageSrc: "",
        correct: false,
        text: `Removing dessert menus.`,
      },
      {
        challengeId: 37,
        imageSrc: "",
        correct: false,
        text: `Dropping the check.`,
      },
      {
        challengeId: 37,
        imageSrc: "",
        correct: false,
        text: `Verbal telling your front waiter that status of the dessert course.`,
      },
      {
        challengeId: 37,
        imageSrc: "",
        correct: true,
        text: `Removing salt and pepper shakers form the table.`,
      },
    ]);
    //  {
    //   id: 42,
    //   lessonId: 5,
    //   type: "SELECT",
    //   order: 6,
    //   question: `How long should you keep guests' water?`,
    // },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 42,
        imageSrc: "",
        correct: true,
        text: `For as long as the guests are still seated.`,
      },
      {
        challengeId: 42,
        imageSrc: "",
        correct: false,
        text: `You can stop refilling their water after the check has been dropped.`,
      },
      {
        challengeId: 42,
        imageSrc: "",
        correct: false,
        text: `Purposefully do not refill the water as a non-verbal que that the guests should leave.`,
      },
      {
        challengeId: 42,
        imageSrc: "",
        correct: false,
        text: `Top of water before the dessert course lands, that should be enough.`,
      },
    ]);
    //  {
    //     id: 43,
    //     lessonId: 6,
    //     type: "SELECT",
    //     order: 7,
    //     question: `Once the guests' have left, how long should it take to reset the table?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 43,
        imageSrc: "",
        correct: false,
        text: `1 minute`,
      },
      {
        challengeId: 43,
        imageSrc: "",
        correct: false,
        text: `5 minutes`,
      },
      {
        challengeId: 43,
        imageSrc: "",
        correct: false,
        text: `15 minutes, no rush.`,
      },
      {
        challengeId: 43,
        imageSrc: "",
        correct: true,
        text: `3 minutes.`,
      },
    ]);

     /**
     * Course id - 1: Back Waiter Steps of Service
     * Unit id - 1:  Back Waiter - Steps of Service
     * Lesson id - 5: Dessert
     */
    await db.insert(schema.challenges).values([
      {
        id: 44,
        lessonId: 6,
        type: "CURRICULUM",
        order: 1,
        question: `Present dessert menus: "If anyone would like something sweet to finish, we have some great options. Dessert wine and after-dinner drink pairings are listed just below each dessert. We also have whiskeys/after-dinner drinks listed on the back of the menu."\n\nSave yourself a trip and offer coffee or tea now. When you return with the coffee, take the dessert order, ladies first, recording everything in your captain's pad with proper seat numbers. Remove dessert menus from the table. Remove Salt & Pepper shakers at this time. Communicate with your Front Waiter that a dessert order has been taken, in addition to the non-verbal cue.`,
      },
    ]);

    //Syncs react-admin and react-simple-data-rest with existing db
    await db.execute(
      sql`SELECT setval('courses_id_seq', (SELECT MAX(id) FROM courses))`,
    );
    await db.execute(
      sql`SELECT setval('units_id_seq', (SELECT MAX(id) FROM units))`,
    );
    await db.execute(
      sql`SELECT setval('lessons_id_seq', (SELECT MAX(id) FROM lessons))`,
    );
    await db.execute(
      sql`SELECT setval('challenges_id_seq', (SELECT MAX(id) FROM challenges))`,
    );
    await db.execute(
      sql`SELECT setval('challenge_options_id_seq', (SELECT MAX(id) FROM challenge_options))`,
    );
    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();

//Skill for prompt

//All challengeOptions should only have one true option

//There should be no duplicate keys for the challenge Ids or orders within a given lesson

//ChallengeOptions should correspond to the correct challenge
