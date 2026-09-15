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
        title: "Front Waiter - Steps of Service",
        imageSrc: "/main-courses.svg",
      },
      //TODO: How to include The Dessert Menu and The Menu as their own stand alone courses. I don't want one single lesson-button for the entire course. Or who cares if its one button.
      {
        id: 3,
        title: "Dessert Menu",
        imageSrc: "/pie.svg",
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
        title: "Back Waiter",
        description: "Steps of Service",
        order: 10,
      },
    ]);
    /**
     * Lessons for Course 1, Unit 1 Back waiter steps of service
     */
    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        order: 10,
        title: "A note on Hospitality",
      },
      {
        id: 2,
        unitId: 1,
        order: 20,
        title: "Greeting Tables - Beverage Service",
      },
      {
        id: 3,
        unitId: 1, // unit 1 : The Basics
        order: 30,
        title: "First Course",
      },
      {
        id: 4,
        unitId: 1, // unit 1 : The Basics
        order: 40,
        title: "Second Course",
      },
      {
        id: 5,
        unitId: 1, // unit 1 : The Basics
        order: 50,
        title: "Serving Dessert and After Dinner Drinks",
      },

      {
        id: 6,
        unitId: 1,
        order: 60,
        title: "The Dessert Menu",
      },
    ]);

    //TODO: Make Dessert a stand alone course as well

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
        order: 10,
        imageSrc: null,
        question:
          "The hospitality we strive to provide is welcoming guests into our own home for a dinner party. Our style is familial but always professional. We greet everyone with a smile and never let anyone walk out without a warm goodbye! Everything we do is aimed at making our guests feel welcome, comfortable, and well cared for.\nWe create the atmosphere with the music we play, how the restaurant is set up and presented, how sharp the team looks, and with decadent smells wafting from the kitchen. Coming to work each day is an opportunity to leave the stress of our personal lives at the door and enter the stage, which is our dining room! We, as hosts, set the tone of the party. It's much easier for everyone to have a good time if it looks like we are.",
      },
      {
        id: 2,
        lessonId: 1,
        type: "CURRICULUM",
        order: 20,
        imageSrc: null,
        question:
          "Service is important. When we are seamless and consistent in our guest interactions, we take all the stress and confusion out of guests' choices. From the appearance of the table when guests are seated to our demeanor as we walk through the dining room, our level of control and professionalism puts guests at ease, even subconsciously. Your energy, whether positive or negative, will be absorbed by both your teammates and guests, so contribute good vibes!",
      },
      {
        id: 3,
        lessonId: 1,
        type: "CURRICULUM",
        order: 30,
        imageSrc: null,
        question:
          "Every guest and every table is different. A key skill for any server, bartender, or manager is identifying how guests are feeling and what style of service they want. Do they look tired? Maybe they just drove into town? Maybe a couple has been fighting. Is this an important business lunch, and should we remain in the background? Is this their first time joining us, and they want the full spiel and all the interaction you can give? Don't force engagement if guests want privacy, and be present if they are excited to hear from you. Either way is okay and provides great service, because it is specifically what the guest wants. Be adaptable and stay attentive.",
      },
      {
        id: 4,
        lessonId: 1,
        type: "CURRICULUM",
        order: 40,
        imageSrc: null,
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
        order: 10,
        imageSrc: null,
        question: `It is your job to support your Front Waiter however possible. The name of the game is communication. \nObserve your station, see which table is being seated, and get the water glasses ready while the Front Waiter greets. \n\nNote: There will be times your Front Waiter is assisting a large or demanding table and is unable to greet a new seating within the 60 second window. Refer to the Front Waiter steps of service to get the table started. As soon as the Front Waiter is free, immediately revert to assigned roles. This avoids miscommunication both with your partner and the guests, and ensures clarity and responsibility of duties.
        `,
      },
      {
        id: 6,
        lessonId: 2,
        type: "CURRICULUM",
        order: 20,
        imageSrc: null,
        question: `Check with your Front Waiter for water preferences. Serve water quickly, always using a tray in your left hand, approaching the guest from the right side, and placing glass down with your right hand at the top right hand side of the guest. Never touch a glass close to or at its rim. Never assume a table would like ice water, changing it looks unprofessional and you potentially lose a sale.\n\nHand signals: Holding your hand across and over your chest and tapping your shoulder means tap water, still hand means bottled still, and wiggling fingers means sparkling.`,
      },
      {
        id: 7,
        lessonId: 2,
        type: "CURRICULUM",
        order: 30,
        imageSrc: null,
        question: `Only bring citrus with bottled water if a guest has requested it. Your front waiter will inform you of their choice. Citrus wedges should be clean and fresh, with enough to serve each guest and presented on a small B+B plate (not on the glass).\n\nDo not let the guest’s water glass become empty. If they are having ice water, top off with a water pitcher. If they are having bottled water, offer another bottle and ring it in. Collect bottled water from the service bar and pour.`,
      },
      {
        id: 8,
        lessonId: 2,
        type: "CURRICULUM",
        order: 40,
        imageSrc: null,
        question: `Screen your section at all times. You’re at your best when you know what’s going on at every table. Where are they at in the meal? What are your next 5 tasks? How can you best consolidate?\n\nIf pouring water for a table, scan the section and top off other tables that also need water. `,
      },
      {
        id: 9,
        lessonId: 2,
        type: "SELECT",
        order: 50,
        imageSrc: null,
        question: `What are the hand signals for tap, sparking, and still water?`,
      },
      {
        id: 10,
        lessonId: 2,
        type: "SELECT",
        order: 60,
        imageSrc: null,
        question: "Upon seating, how soon should a table be greeted?",
      },
      {
        id: 11,
        lessonId: 2,
        type: "SELECT",
        order: 70,
        imageSrc: null,
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
        order: 10,
        imageSrc: null,
        question: `Always keep an eye out for food in the window. Help deliver it whether it is your table's order or not. Hot food out is always our first priority. Never ever take food out without a ticket, even if you are certain you know where it goes. Repeat the name of the dish, the table, and the seat number, to the expediter every time. When dropping food, check that the table has proper presets: share plates, steak knife, etc. Food does not get dropped on an unmarked table.\n\nAll food leaves the window on the right/left, depending on the restaurant. Dishes should always be carried away from your body. Never use any area of your torso to balance dishes, whether serving or bussing. If it feels awkward, it looks awkward.`,
      },
      {
        id: 13,
        lessonId: 3,
        type: "CURRICULUM",
        order: 20,
        imageSrc: null,
        question: `Always manicure tables in your station as you go. This means if something is unnecessary on a table, it goes. Remove excess debris, empty sugar packets, discarded cocktail garnish. If a guest ever gets up while dining be sure to fold their napkin and place neatly on the table before they return. If the napkin is exceptionally dirty, replace it with a new one. Attention to detail is what sets us apart. This can be done discreetly, no need to interject yourself by asking unnecessary questions which can be answered by reading the table. Do not narrate what you're doing.`,
      },
      {
        id: 14,
        lessonId: 3,
        type: "SELECT",
        order: 30,
        imageSrc: null,
        question: `Running what type of food is always the first priority?`,
      },
      {
        id: 15,
        lessonId: 3,
        type: "SELECT",
        order: 40,
        imageSrc: null,
        question: `When should tables be manicured throughout the dining experience?`,
      },
      {
        id: 16,
        lessonId: 3,
        type: "CURRICULUM",
        order: 50,
        imageSrc: null,
        question: `If guests want to order food with a back waiter, let the guest know that you will inform the front waiter that they are ready and immediately make the front waiter aware. Perception is everything and how we communicate this to the guest is critical to maintaining a positive hospitality experience.\n\nNote: If the guest does not want to wait for the front waiter or just starts ordering anyway, write down the order, read it back to the guest to confirm, and then hand it off to the front waiter. Do not ring it in yourself. They will confirm coursing with the guest and ring in the order using proper modifiers.\n\nWhether taking a food or beverage order that is outside our normal steps of service, make sure to find your teammate immediately so we don't ask the table twice about the same thing. Then ring it in.`,
      },
      {
        id: 17,
        lessonId: 3,
        type: "CURRICULUM",
        order: 60,
        imageSrc: null,
        question: `Your Front Waiter will mark the first course before ringing in the order. They may communicate with you about share-plates, marking utensils, drink orders at the bar, etc. Check the POS if the front server is busy to see what is coming.\n\nOnce the Front Waiter has taken the order, serve bread and butter immediately. Use a bread basket for tables of 4 or larger (one butter for every 4-6 guests), and french service for tables of 2.`,
      },
      {
        id: 18,
        lessonId: 3,
        type: "CURRICULUM",
        order: 70,
        imageSrc: null,
        question: `Refill beverages throughout your station, keeping your eyes up and moving. When refilling water and iced tea, glasses stay on the table. Walk around the table. Never stand in one place and pour for everyone. Don't ask, just refill. If you have poured out their water, soda, wine, then ask if they would like another or offer the menu if they would like something else.`,
      },
      {
        id: 19,
        lessonId: 3,
        type: "CURRICULUM",
        order: 80,
        imageSrc: null,
        question: `Before food hits the table, make sure they have everything they need to enjoy their course. Share plates, proper utensils, water, drinks, a clean table.`,
      },
      {
        id: 20,
        lessonId: 3,
        type: "SELECT",
        order: 90,
        imageSrc: null,
        question: `If the guest does not want to wait for the front waiter or just starts ordering with, what are the steps you should follow?`,
      },
      {
        id: 21,
        lessonId: 3,
        type: "SELECT",
        order: 100,
        imageSrc: null,
        question: `Who is responsible for marking the table for the first course?`,
      },

      {
        id: 22,
        lessonId: 3,
        type: "CURRICULUM",
        order: 110,
        imageSrc: null,
        question: `Serve the first course: Women first (if possible), placing plates discreetly from the right side with your right hand. Announce the dish you are serving and always place protein toward the guest (6 o'clock position).\n\nKnow where you're going, know your seat numbers, do NOT auction off food at the table. Watch your elbows and use an open arm when serving guests (chest is facing the guest and you are not backhanding them). Do not lean over the table, avoid reaching in front of a guest whenever possible, and excuse your reach if you can't avoid it.\n\nWhen possible, drop entrees and large format items before sides. Not only are these items more impressive visually, it can be difficult to present larger plates with sides scattered around the table.`,
      },
      {
        id: 23,
        lessonId: 3,
        type: "CURRICULUM",
        order: 120,
        imageSrc: null,
        question: `If your Front Waiter is tied up at another table, check back with guests to ensure their satisfaction within 2 bites or 2 minutes. Manicure table as you go, checking beverage levels including wine.\n\nIf you QC a table, be sure to communicate with your Front Waiter. We want to avoid interrupting the guests' meal multiple times unnecessarily. Multiple servers asking the same questions looks unprofessional and incompetent`,
      },
      {
        id: 24,
        lessonId: 3,
        type: "SELECT",
        order: 130,
        imageSrc: null,
        question: `What is the correct method for delivering food to a table? Choose the best option.`,
      },
      {
        id: 25,
        lessonId: 3,
        type: "CURRICULUM",
        order: 140,
        imageSrc: null,
        question: `Don't be afraid to ask tables what they need. This can usually be accomplished by making eye contact with the guest and giving them an opportunity to express wants/needs, not just interrupting by asking.`,
      },
      {
        id: 26,
        lessonId: 3,
        type: "CURRICULUM",
        order: 150,
        imageSrc: null,
        question: `Clear first course as needed. If possible, wait till the last person finishes eating. Remove all used plates and silverware using open arm service, just like when serving food or drinks.\n\nAsk: "May I take your plate?" Once you've asked one guest, it's unnecessary to continue to ask the others. A guest will let you know if they're not ready.\n\nIf a guest has placed their fork and knife parallel to one another on the right-hand side of the plate, there is no need to ask: "May I take your plate?" This is the guest signaling they are finished. Avoid clearing a table when other people are still eating. Exceptions: stacked plates, napkin on plate, guest is asking for it to be taken or pushes dish away - clear these immediately.`,
      },
      {
        id: 27,
        lessonId: 3,
        type: "SELECT",
        order: 160,
        imageSrc: null,
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
        text: `After the last guest has finished their entrée.`,
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
        order: 10,
        imageSrc: null,
        question: `Whenever moving through the dining room, keep your eyes up, and smile. Be aware of tight spaces and corners. If another server has a wine glass or tray behind their back, surreptitiously take it. Your eyes should be constantly moving between:\\n • Expo Window\\n • Cocktails/wine at the bar\\n • Your Front/Back Waiter\\n • Other Servers' or Customers' eyes\\n • Tables in your section`,
      },
      {
        id: 29,
        lessonId: 4,
        type: "CURRICULUM",
        order: 20,
        imageSrc: null,
        question: `Communicate with your Front Waiter, look on the POS for second course share plates, marking, etc. Properly mark the table for the second course. A table should be marked before the second course arrives. Communicate with the expo if your tables food is in the window and the table hasn't been properly marked yet.\\nCheck beverage and wine levels at all tables, always manicuring as you go. Again, if something is unnecessary on the table, it should be removed.`,
      },
      {
        id: 30,
        lessonId: 4,
        type: "SELECT",
        order: 30,
        imageSrc: null,
        question: `When should a table be marked for the second course?`,
      },
      {
        id: 31,
        lessonId: 4,
        type: "CURRICULUM",
        order: 40,
        imageSrc: null,
        question: `Serve second course: Women first (if possible), placing plates discreetly from the left side with your left hand. Always announce the dish you are presenting.\\nScan your section; know what's going on at all times`,
      },
      {
        id: 32,
        lessonId: 4,
        type: "CURRICULUM",
        order: 50,
        imageSrc: null,
        question: `Guests should be cleared from their right-hand side with your right hand. Place the first plate in the left hand. This plate will act as your tray for off-sized dishes and silver. The second plate is balanced on your left wrist and palm. Subsequent plates are stacked on the second. Do not hover your left arm above a guest when clearing, hold it behind them and be mindful of personal space. Never stack plates on the table before picking them up and don't clear more than you're comfortable with. Again, if it feels awkward, it looks awkward.\\nIf you need help, ask your partner before approaching the table, or make eye contact with a passing server. Take the dirty dishes directly to the kitchen. Never approach another table with full hands, only clear one table at a time.`,
      },
      {
        id: 33,
        lessonId: 4,
        type: "CURRICULUM",
        order: 60,
        imageSrc: null,
        question: `The table should be crumbed (with a server's crumber) and cleaned. Just as at the start of the meal, we never drop menus on a dirty table.`,
      },
      {
        id: 34,
        lessonId: 4,
        type: "SELECT",
        order: 70,
        imageSrc: null,
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
        correct: false,
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
        correct: false,
        text: `maladroit`,
      },
      {
        challengeId: 34,
        imageSrc: "",
        correct: false,
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
        order: 10,
        imageSrc: null,
        question: `Present dessert menus: "If anyone would like something sweet to finish, we have some great options. Dessert wine and after-dinner drink pairings are listed just below each dessert. We also have whiskeys/after-dinner drinks listed on the back of the menu."\n\nSave yourself a trip and offer coffee or tea now. When you return with the coffee, take the dessert order, ladies first, recording everything in your captain's pad with proper seat numbers. Remove dessert menus from the table. Remove Salt & Pepper shakers at this time. Communicate with your Front Waiter that a dessert order has been taken, in addition to the non-verbal cue.`,
      },
      {
        id: 36,
        lessonId: 5,
        type: "CURRICULUM",
        order: 20,
        imageSrc: null,
        question: `Mark for dessert, dropping share plates when appropriate. Silverware should be dropped to the guest's sides, fork on the left, spoon on the right. This should be done prior to ringing in the dessert order. `,
      },
      {
        id: 37,
        lessonId: 5,
        type: "SELECT",
        order: 30,
        imageSrc: null,
        question: `What is the non-verbal cue that a dessert order has been taken?`,
      },
      {
        id: 38,
        lessonId: 5,
        type: "CURRICULUM",
        order: 40,
        imageSrc: null,
        question: `Mark for dessert, dropping share plates when appropriate. Silverware should be dropped to the guest's sides, fork on the left, spoon on the right. Check if anyone needs a new napkin. This should be done prior to ringing in the dessert order.\n\nServe dessert from the guest's left with your left hand, announcing it when dropping. Check back with your guest within 2 bites or 2 minutes. Are the guests involved in conversation? Can this QC should be accomplished by simply topping off drinks and making eye contact with each guest?.`,
      },

      {
        id: 39,
        lessonId: 5,
        type: "CURRICULUM",
        order: 50,
        imageSrc: null,
        question: `Clear desserts, removing all dishes, unused glasses, and napkins placed on the table. Do not let half-finished desserts sit for 5 min. Good eye contact with the guest will let you know when they're ready for the check, if they need more coffee, or if they're ready for the dessert to be cleared. Clearing as much as possible now makes for an easier and quicker reset once the guests leave.`,
      },
      {
        id: 40,
        lessonId: 5,
        type: "CURRICULUM",
        order: 60,
        imageSrc: null,
        question: `Keep refilling water as long as guests are still seated and manicure the table, even after check has been picked up.\n\nThank guests as they are leaving.`,
      },
      {
        id: 41,
        lessonId: 5,
        type: "CURRICULUM",
        order: 70,
        imageSrc: null,
        question: `Once guests leave, inform and assist the floaters to immediately clear the empty table. Clean it properly, and reset it within 3 minutes. Trays are never set on the table or on a chair and use proper form as you would if guests were still seated. The tables nearby can see you.`,
      },
      {
        id: 42,
        lessonId: 5,
        type: "SELECT",
        order: 80,
        imageSrc: null,
        question: `How long should you keep guests' water?`,
      },
      {
        id: 43,
        lessonId: 5,
        type: "SELECT",
        order: 90,
        imageSrc: null,
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
     * Lesson id - 6: Dessert Menu
     */

    await db.insert(schema.challenges).values([
      {
        id: 44,
        lessonId: 6,
        type: "CURRICULUM",
        order: 10,
        imageSrc: null,
        question: `All of our desserts, pastries, and breads come from La Boulangerie. Established in 2000, La Boulangerie is the Link Restaurant Group's neighborhood bakery and cafe. Chef Donald Link has operated the bakery since 2015 with Partner/Chef Stephen Stryjewski and Executive Pastry Chef Maggie Scales. Come in for coffee and a sweet or savory breakfast treat. In the afternoon, meet up with neighbors for a homemade ice cream or visit with friends and enjoy a sandwich, patisserie, a slice of cake, or seasonal pie. Don't forget to take home a loaf of bread for dinner.`,
      },
      {
        id: 45,
        lessonId: 6,
        type: "CURRICULUM",
        order: 20,
        imageSrc: null,
        question: `It is important to communicate with the guest regarding the severity of any potential food allergies. The bakery upholds the same high standards of food safety that all Link Restaurant groups do, but since our desserts are not made in house we cannot 100% guarantee that they are cross-contamination safe as far as guests allergies are concerned.`,
      },
      {
        id: 46,
        lessonId: 6,
        type: "SELECT",
        order: 30,
        imageSrc: null,
        question: `Where are all of our desserts made?`,
      },
      {
        id: 47,
        lessonId: 6,
        type: "SELECT",
        order: 40,
        imageSrc: null,
        question: `Who is the executive pastry chef for the Link Restaurant Group?`,
      },
      {
        id: 48,
        lessonId: 6,
        type: "SELECT",
        order: 50,
        imageSrc: null,
        question: `What is the correct verbiage regarding allergies and cross-contamination concerning our dessert menu?`,
      },
      {
        id: 49,
        lessonId: 6,
        type: "CURRICULUM",
        order: 60,
        imageSrc: "/desserts/banana-brown-butter-tart.svg",
        question: `The Banana Brown Butter Tart:\n\nA shell of pasta frolla dough is filled with slices of banana and a spiced brown butter filling. Pasta frolla is an Italian sweet shortcrust pastry. It's made from flour, butter, sugar, and egg yolks, giving it a rich, sandy, cookie-like texture rather than the flaky layers of a traditional pie crust.`,
      },
      {
        id: 50,
        lessonId: 6,
        type: "CURRICULUM",
        order: 70,
        imageSrc: "/desserts/banana-brown-butter-tart.svg",
        question: `The tart is served with: crème fraîche, which is a slightly soured cream, tangier and thicker than regular whipped cream, with a subtle cultured flavor; salted caramel; as well as brûléed bananas. \n\nSliced bananas are topped with sugar and then torched quickly to create a thin, crackly caramelized shell.\n\nThe Banana brown butter tart has been on the Herbsaint menu since day one. It is by far our most well-known and popular dessert.`,
      },
      {
        id: 51,
        lessonId: 6,
        type: "CURRICULUM",
        order: 80,
        imageSrc: null,
        question: `The Banana Brown Butter Tart can be served à la mode with either vanilla or the ICDJ. It does not contain nuts. It is also not gluten free, due to the crust containing flour.\n\nMarking: Appetizer Fork, Soup spoon if à la mode.`,
      },
      {
        id: 52,
        lessonId: 6,
        type: "SELECT",
        order: 90,
        imageSrc: null,
        question: `What is pasta frolla dough?`,
      },
      {
        id: 53,
        lessonId: 6,
        type: "SELECT",
        order: 100,
        imageSrc: null,
        question: `What best describes crème fraîche?`,
      },
      {
        id: 54,
        lessonId: 6,
        type: "SELECT",
        order: 110,
        imageSrc: null,
        question: `Can the Banana Brown Butter Tart be served with ice cream?`,
      },
      {
        id: 55,
        lessonId: 6,
        type: "SELECT",
        order: 120,
        imageSrc: null,
        question: `Can the Banana Brown Butter Tart be modified to be gluten free?`,
      },
      {
        id: 56,
        lessonId: 6,
        type: "CURRICULUM",
        order: 130,
        imageSrc: null,
        question: `The suggested wine pairing for the Banana Brown Butter Tart is Petit Métris "Chaumes" 2015, Coteaux du Layon.\n\nMade from late-harvest, vine-dried Chenin Blanc. Bright and refreshingly balanced with aromas of apples and pears dressed in cinnamon. More tropical and exotic on the palate. Pronounced acidity. Sweet yet balanced. Pairs beautifully with the Banana Brown Butter Tart — its bright acidity cuts through the richness of the brown butter and caramel, while its notes of apple, pear, and cinnamon echo the tart's warm spice and caramelized banana.`,
      },

      {
        id: 57,
        lessonId: 6,
        type: "SELECT",
        order: 140,
        imageSrc: null,
        question: `What is the suggested wine pairing for the Banana Brown Butter Tart?`,
      },
      {
        id: 58,
        lessonId: 6,
        type: "CURRICULUM",
        order: 150,
        imageSrc: "/desserts/vanilla-pot-de-creme.svg",
        question: `The Vanilla Pot de Crème:\n\nA creamy lemon and vanilla custard topped with local berries — blueberries and blackberries. Served with two Fig Newton cookies.`,
      },
      {
        id: 59,
        lessonId: 6,
        type: "CURRICULUM",
        order: 160,
        imageSrc: "/desserts/vanilla-pot-de-creme.svg",
        question: `The Vanilla Pot de Crème contains dairy, citrus, and gluten (from the cookies).\n\nMarking: Teaspoon.`,
      },
      {
        id: 60,
        lessonId: 6,
        type: "SELECT",
        order: 170,
        imageSrc: null,
        question: `What is the Vanilla Pot de Crème served with?`,
      },
      {
        id: 61,
        lessonId: 6,
        type: "SELECT",
        order: 180,
        imageSrc: null,
        question: `What is the correct marking for the Vanilla Pot de Crème?`,
      },
      {
        id: 62,
        lessonId: 6,
        type: "CURRICULUM",
        order: 190,
        imageSrc: null,
        question: `The suggested wine pairing for the Vanilla Pot de Crème is Château Gravas, Sauternes, 2020.\n\nRound and well balanced, offering candied and exotic fruit notes (mango, guava) and white flowers, with notes of ginger and saffron. A late-harvest blend of Sémillon, Sauvignon Blanc, and possibly some Muscadelle, from Bordeaux, France.`,
      },
      {
        id: 63,
        lessonId: 6,
        type: "SELECT",
        order: 200,
        imageSrc: null,
        question: `What is the suggested wine pairing for the Vanilla Pot de Crème?`,
      },
      {
        id: 64,
        lessonId: 6,
        type: "CURRICULUM",
        order: 210,
        imageSrc: "/desserts/fried-peach-hand-pies.svg",
        question: `The Fried Peach Hand Pies:\n\nPeaches and lemon zest in a crème fraîche pie dough, fried to order in peanut oil and tossed in cinnamon sugar. Served with butter pecan ice cream and ginger cookie crumbs.`,
      },
      {
        id: 65,
        lessonId: 6,
        type: "CURRICULUM",
        order: 220,
        imageSrc: null,
        question: `The Fried Peach Hand Pies contain gluten, dairy, and peanuts (from the frying oil).\n\nMarking: Appetizer Fork, Soup Spoon.`,
      },
      {
        id: 66,
        lessonId: 6,
        type: "SELECT",
        order: 230,
        imageSrc: null,
        question: `What oil are the Fried Peach Hand Pies fried in?`,
      },
      {
        id: 67,
        lessonId: 6,
        type: "SELECT",
        order: 240,
        imageSrc: null,
        question: `What ice cream is served with the Fried Peach Hand Pies?`,
      },
      {
        id: 68,
        lessonId: 6,
        type: "CURRICULUM",
        order: 250,
        imageSrc: null,
        question: `The suggested wine pairing for the Fried Peach Hand Pies is Domaine Durban, Muscat de Beaumes-de-Venise, 2021.\n\nA balance of sweetness, alcohol, and acidity, with notes of honeysuckle, citrus zest, and honey. Fresh and bright. A fortified wine made from Muscat à Petits Grains; Beaumes-de-Venise is the village in the southern Rhône Valley, France, known for this style of sweet wine.`,
      },
      {
        id: 69,
        lessonId: 6,
        type: "SELECT",
        order: 260,
        imageSrc: null,
        question: `What is the suggested wine pairing for the Fried Peach Hand Pies?`,
      },
      {
        id: 70,
        lessonId: 6,
        type: "CURRICULUM",
        order: 270,
        imageSrc: "/desserts/flourless-chocolate-cake.svg",
        question: `The Flourless Chocolate Cake:\n\nAn intense and moussey flourless chocolate cake, served room temperature and dusted with cocoa powder. Topped with dulce de leche sauce (milk caramel), whipped cream, and Spanish peanut brittle.`,
      },
      {
        id: 71,
        lessonId: 6,
        type: "CURRICULUM",
        order: 280,
        imageSrc: "/desserts/flourless-chocolate-cake.svg",
        question: `The Flourless Chocolate Cake contains nuts (from the peanut brittle) and dairy.\n\nMarking: Appetizer Fork, Soup Spoon if à la mode.`,
      },
      {
        id: 72,
        lessonId: 6,
        type: "SELECT",
        order: 290,
        imageSrc: null,
        question: `What sauce is served with the Flourless Chocolate Cake?`,
      },
      {
        id: 73,
        lessonId: 6,
        type: "SELECT",
        order: 300,
        imageSrc: null,
        question: `Does the Flourless Chocolate Cake contain nuts?`,
      },
      {
        id: 74,
        lessonId: 6,
        type: "CURRICULUM",
        order: 310,
        imageSrc: null,
        question: `The suggested wine pairing for the Flourless Chocolate Cake is Domaine La Tour Vieille, Banyuls, Réserve, NV.\n\nFull-bodied and sweet, with notes of raspberry, dried fruit, caramel, and chocolate. Fortified in a style similar to Port, made from Grenache in Languedoc-Roussillon (southernmost area of France).`,
      },
      {
        id: 75,
        lessonId: 6,
        type: "SELECT",
        order: 320,
        imageSrc: null,
        question: `What is the suggested wine pairing for the Flourless Chocolate Cake?`,
      },
      {
        id: 76,
        lessonId: 6,
        type: "CURRICULUM",
        order: 330,
        imageSrc: "/desserts/ice-cream.svg",
        question: `ICDJ & Seasonal Sorbet:\n\nChanges frequently — refer to the current dessert menu for offerings.`,
      },
      {
        id: 77,
        lessonId: 6,
        type: "CURRICULUM",
        order: 340,
        imageSrc: null,
        question: `Our ice cream and sorbet selection changes frequently. Sometimes the ice cream can be made gluten free by omitting the cookie. The sorbet is always gluten-free without the cookie.\n\nMarking: Soup Spoon.`,
      },
      {
        id: 78,
        lessonId: 6,
        type: "SELECT",
        order: 350,
        imageSrc: null,
        question: `Besides the Flourless Chocolate Cake, what other dessert do we offer that is gluten-free or can be modified to be gluten-free?`,
      },

      {
        id: 81,
        lessonId: 6,
        type: "CURRICULUM",
        order: 380,
        imageSrc: null,
        question: `Artisanal Cheese:\n\nAlways a soft, a firm, and a bleu cheese offering, served with a fruit jam, Marcona almonds or pistachios, and lavash crackers.\n\nOur current offerings are:\n\nSoft — Walden, from Sequatchee Cove, Tennessee (cow, pasteurized)\nFirm — Griffin, from Sweet Grass Dairy, Thomasville, Georgia (cow, raw)\nBleu — Roquefort, France (sheep, raw)`,
      },
      {
        id: 82,
        lessonId: 6,
        type: "CURRICULUM",
        order: 390,
        imageSrc: null,
        question: `The Artisanal Cheese contains dairy and nuts.\n\nMarking: Appetizer Fork, Flat Knife.`,
      },
      {
        id: 83,
        lessonId: 6,
        type: "SELECT",
        order: 400,
        imageSrc: null,
        question: `What three cheeses are always included in the Artisanal Cheese offering?`,
      },
      {
        id: 84,
        lessonId: 6,
        type: "SELECT",
        order: 410,
        imageSrc: null,
        question: `What nuts are served with the Artisanal Cheese?`,
      },
      {
        id: 85,
        lessonId: 6,
        type: "CURRICULUM",
        order: 420,
        imageSrc: null,
        question: `The suggested wine pairing for the Artisanal Cheese is Michel Gahier, Macvin du Jura.\n\nMacvin is a traditional Jura vin de liqueur, made from spirit — home-distilled marc du Jura using the domaine's grape pomace — and juice from the Savagnin grape. It has cooked-apple fruit character with some funky, mushroomy notes. Fortified, made from Savagnin, in Arbois (Jura, France, between Burgundy and Switzerland).`,
      },
      {
        id: 86,
        lessonId: 6,
        type: "SELECT",
        order: 430,
        imageSrc: null,
        question: `What is the suggested wine pairing for the Artisanal Cheese?`,
      },
    ]);

    /**
     * ChallengeOptions - lessonId : 6
     */
    //  {
    //     id: 46,
    //     lessonId: 6,
    //     type: "SELECT",
    //     order: 3,
    //     imageSrc: null,
    //     question: `Where are all of our desserts made?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 46,
        imageSrc: "",
        correct: false,
        text: `We make our desserts in house in the back prep kitchen.`,
      },
      {
        challengeId: 46,
        imageSrc: "",
        correct: false,
        text: `Our desserts are all sourced from local farmers.`,
      },
      {
        challengeId: 46,
        imageSrc: "",
        correct: true,
        text: `La Boulangerie - Link Restaurant Group's neighborhood bakery and cafe.`,
      },
      {
        challengeId: 46,
        imageSrc: "",
        correct: false,
        text: `Paul Hollywood from the Great British Bake-off makes all of our desserts.`,
      },
    ]);
    //  {
    //       id: 47,
    //       lessonId: 6,
    //       type: "SELECT",
    //       order: 4,
    //       imageSrc: null,
    //       question: `Who is the executive pastry chef for the Link Restaurant Group?`,
    //     },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 47,
        imageSrc: "",
        correct: false,
        text: `Donald Link`,
      },
      {
        challengeId: 47,
        imageSrc: "",
        correct: false,
        text: `Stephen Stryjewski`,
      },
      {
        challengeId: 47,
        imageSrc: "",
        correct: false,
        text: `Paul Hollywood from the Great British Bake-off.`,
      },
      {
        challengeId: 47,
        imageSrc: "",
        correct: true,
        text: `Maggie Scales`,
      },
    ]);
    // {
    //     id: 48,
    //     lessonId: 6,
    //     type: "SELECT",
    //     order: 5,
    //     imageSrc: null,
    //     question: `What is the correct verbiage regarding allergies and cross-contamination concerning our dessert menu?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 48,
        imageSrc: "",
        correct: true,
        text: `Since our desserts are not made in house we cannot 100% guarantee that they are cross-contamination safe as far as allergies are concerned.`,
      },
      {
        challengeId: 48,
        imageSrc: "",
        correct: false,
        text: `If you have a soy bean allergy you shouldn't even be in the building.`,
      },
      {
        challengeId: 48,
        imageSrc: "",
        correct: false,
        text: `We have epipens on hand just in case anything goes terribly wrong.`,
      },
      {
        challengeId: 48,
        imageSrc: "",
        correct: false,
        text: `We do not need to worry about cross-contamination when it comes to desserts.`,
      },
    ]);
    //  {
    //         id: 52,
    //         lessonId: 6,
    //         type: "SELECT",
    //         order: 9,
    //         imageSrc: null,
    //         question: `What is pasta frolla dough?`,
    //       },

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 52,
        imageSrc: "",
        correct: false,
        text: `A type of pie crust made out of graham crackers and spices.`,
      },
      {
        challengeId: 52,
        imageSrc: "",
        correct: true,
        text: `An Italian sweet shortcrust pastry.`,
      },
      {
        challengeId: 52,
        imageSrc: "",
        correct: false,
        text: `A flourless type of pastry shell.`,
      },
      {
        challengeId: 52,
        imageSrc: "",
        correct: false,
        text: `A rich pastry shell made with equal parts butter and flour.`,
      },
    ]);
    // {
    //   id: 53,
    //   lessonId: 6,
    //   type: "SELECT",
    //   order: 10,
    //   imageSrc: null,
    //   question: `What best describes crème fraîche?`,
    // },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 53,
        imageSrc: "",
        correct: false,
        text: `It is the same as sour cream just with sugar added to it.`,
      },
      {
        challengeId: 53,
        imageSrc: "",
        correct: false,
        text: `It is a really fresh cream. Fraîche is French for "fresh".`,
      },
      {
        challengeId: 53,
        imageSrc: "",
        correct: false,
        text: `It is a cream made from goats milk and honey.`,
      },
      {
        challengeId: 53,
        imageSrc: "",
        correct: true,
        text: `A slightly soured cream, tangier and thicker than regular whipped cream, with a subtle cultured flavor.`,
      },
    ]);
    //  {
    //     id: 54,
    //     lessonId: 6,
    //     type: "SELECT",
    //     order: 11,
    //     imageSrc: null,
    //     question: `Can the Banana Brown Butter Tart be served with ice cream?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 54,
        imageSrc: "",
        correct: true,
        text: `Yes. Either vanilla or the Ice Cream of the Day.`,
      },
      {
        challengeId: 54,
        imageSrc: "",
        correct: false,
        text: `No. It comes as is.`,
      },
    ]);
    // {
    //   id: 55,
    //   lessonId: 6,
    //   type: "SELECT",
    //   order: 12,
    //   imageSrc: null,
    //   question: `Can the Banana Brown Butter Tart be modified to be gluten free?`,
    // },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 55,
        imageSrc: "",
        correct: false,
        text: `Yes. It can be made with a gluten free crust.`,
      },
      {
        challengeId: 55,
        imageSrc: "",
        correct: true,
        text: `No. The pastry dough contains gluten.`,
      },
    ]);

    //  {
    //     id: 58,
    //     lessonId: 6,
    //     type: "SELECT",
    //     order: 15,
    //     imageSrc: null,
    //     question: `What is the suggested wine pairing for the Banana Brown Butter Tart?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 57,
        imageSrc: "",
        correct: false,
        text: `Tawny Port, Niepoort 10y`,
      },
      {
        challengeId: 57,
        imageSrc: "",
        correct: false,
        text: `Fernet-Branca Menta`,
      },
      {
        challengeId: 57,
        imageSrc: "",
        correct: true,
        text: `Petit Métris "Chaumes" 2015, Coteaux du Layon.`,
      },
      {
        challengeId: 57,
        imageSrc: "",
        correct: false,
        text: `Moscato d'Asti. Elio Perrone, 'Sourgal' 2024`,
      },
    ]);

    //  {
    //     id: 60,
    //     type: "SELECT",
    //     question: `What is the Vanilla Pot de Crème served with?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 60,
        imageSrc: "",
        correct: false,
        text: `Crème fraîche, salted caramel, and brûléed bananas.`,
      },
      {
        challengeId: 60,
        imageSrc: "",
        correct: true,
        text: `Local berries (blueberries & blackberries) and two Fig Newton cookies.`,
      },
      {
        challengeId: 60,
        imageSrc: "",
        correct: false,
        text: `Whipped cream and candied ginger.`,
      },
      {
        challengeId: 60,
        imageSrc: "",
        correct: false,
        text: `Teaspoon of high proof rum set on fire right on top.`,
      },
    ]);
    //  {
    //     id: 61,
    //     type: "SELECT",
    //     question: `What is the correct marking for the Vanilla Pot de Crème?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 61,
        imageSrc: "",
        correct: false,
        text: `Appetizer Fork.`,
      },
      {
        challengeId: 61,
        imageSrc: "",
        correct: false,
        text: `Steak Knife.`,
      },
      {
        challengeId: 61,
        imageSrc: "",
        correct: true,
        text: `Teaspoon.`,
      },
      {
        challengeId: 61,
        imageSrc: "",
        correct: false,
        text: `Soup Spoon.`,
      },
    ]);
    //  {
    //     id: 63,
    //     type: "SELECT",
    //     question: `What is the suggested wine pairing for the Vanilla Pot de Crème?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 63,
        imageSrc: "",
        correct: true,
        text: `Château Gravas, Sauternes, 2020.`,
      },
      {
        challengeId: 63,
        imageSrc: "",
        correct: false,
        text: `A light stout beer, like a Guinness.`,
      },
      {
        challengeId: 63,
        imageSrc: "",
        correct: false,
        text: `Michel Gahier, Macvin du Jura.`,
      },
      {
        challengeId: 63,
        imageSrc: "",
        correct: false,
        text: `Adrien Camut, 6yr Calvados.`,
      },
    ]);
    //  {
    //     id: 66,
    //     type: "SELECT",
    //     question: `What oil are the Fried Peach Hand Pies fried in?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 66,
        imageSrc: "",
        correct: false,
        text: `Canola oil.`,
      },
      {
        challengeId: 66,
        imageSrc: "",
        correct: false,
        text: `Vegetable oil.`,
      },
      {
        challengeId: 66,
        imageSrc: "",
        correct: true,
        text: `Peanut oil.`,
      },
      {
        challengeId: 66,
        imageSrc: "",
        correct: false,
        text: `Olive oil.`,
      },
    ]);
    //  {
    //     id: 67,
    //     type: "SELECT",
    //     question: `What ice cream is served with the Fried Peach Hand Pies?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 67,
        imageSrc: "",
        correct: false,
        text: `Vanilla ice cream.`,
      },
      {
        challengeId: 67,
        imageSrc: "",
        correct: true,
        text: `Butter pecan ice cream.`,
      },
      {
        challengeId: 67,
        imageSrc: "",
        correct: false,
        text: `Ice Cream of the Day.`,
      },
      {
        challengeId: 67,
        imageSrc: "",
        correct: false,
        text: `It is not served with ice cream.`,
      },
    ]);
    //  {
    //     id: 69,
    //     type: "SELECT",
    //     question: `What is the suggested wine pairing for the Fried Peach Hand Pies?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 69,
        imageSrc: "",
        correct: false,
        text: `Château Gravas, Sauternes, 2020.`,
      },
      {
        challengeId: 69,
        imageSrc: "",
        correct: true,
        text: `Domaine Durban, Muscat de Beaumes-de-Venise, 2021.`,
      },
      {
        challengeId: 69,
        imageSrc: "",
        correct: false,
        text: `Domaine La Tour Vieille, Banyuls, Réserve, NV.`,
      },
      {
        challengeId: 69,
        imageSrc: "",
        correct: false,
        text: `Carpano Antica, Sweet Vermouth`,
      },
    ]);
    //  {
    //     id: 72,
    //     type: "SELECT",
    //     question: `What sauce is served with the Flourless Chocolate Cake?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 72,
        imageSrc: "",
        correct: false,
        text: `Salted caramel.`,
      },
      {
        challengeId: 72,
        imageSrc: "",
        correct: true,
        text: `Dulce de leche sauce (milk caramel).`,
      },
      {
        challengeId: 72,
        imageSrc: "",
        correct: false,
        text: `A deep and lovely chicken jus.`,
      },
      {
        challengeId: 72,
        imageSrc: "",
        correct: false,
        text: `Chocolate ganache.`,
      },
    ]);
    //  {
    //     id: 73,
    //     type: "SELECT",
    //     question: `Does the Flourless Chocolate Cake contain nuts?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 73,
        imageSrc: "",
        correct: true,
        text: `Yes, from the Spanish peanut brittle.`,
      },
      {
        challengeId: 73,
        imageSrc: "",
        correct: false,
        text: `No, it's nut free.`,
      },
    ]);
    //  {
    //     id: 75,
    //     type: "SELECT",
    //     question: `What is the suggested wine pairing for the Flourless Chocolate Cake?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 75,
        imageSrc: "",
        correct: false,
        text: `Michel Gahier, Macvin du Jura.`,
      },
      {
        challengeId: 75,
        imageSrc: "",
        correct: false,
        text: `Domaine Durban, Muscat de Beaumes-de-Venise, 2021.`,
      },
      {
        challengeId: 75,
        imageSrc: "",
        correct: true,
        text: `Domaine La Tour Vieille, Banyuls, Réserve, NV.`,
      },
      {
        challengeId: 75,
        imageSrc: "",
        correct: false,
        text: `Gamay, Domain Depeuble, Beaujolais, 2024`,
      },
    ]);
    //  {
    //     id: 78,
    //     type: "SELECT",
    //     question: `Besides the Flourless Chocolate Cake, what other dessert do we offer that is gluten-free or can be modified to be gluten-free?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 78,
        imageSrc: "",
        correct: false,
        text: `The Ice Cream of The Day.`,
      },
      {
        challengeId: 78,
        imageSrc: "",
        correct: true,
        text: `The Seasonal Sorbet.`,
      },
      {
        challengeId: 78,
        imageSrc: "",
        correct: false,
        text: `The Fried Pies.`,
      },
      {
        challengeId: 78,
        imageSrc: "",
        correct: false,
        text: `The Flourless Chocolate Cake is the only gluten-free dessert.`,
      },
    ]);

    //  {
    //     id: 83,
    //     type: "SELECT",
    //     question: `What three cheeses are always included in the Artisanal Cheese offering?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 83,
        imageSrc: "",
        correct: false,
        text: `A soft, a smoked, and a firm cheese.`,
      },
      {
        challengeId: 83,
        imageSrc: "",
        correct: true,
        text: `A soft, a firm, and a bleu cheese.`,
      },
      {
        challengeId: 83,
        imageSrc: "",
        correct: false,
        text: `A goat, a sheep, and a cow.`,
      },
      {
        challengeId: 83,
        imageSrc: "",
        correct: false,
        text: `Cream Cheese, pimento cheese, and Kraft American Singles.`,
      },
    ]);
    //  {
    //     id: 84,
    //     type: "SELECT",
    //     question: `What nuts are served with the Artisanal Cheese?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 84,
        imageSrc: "",
        correct: false,
        text: `Walnuts or pecans.`,
      },
      {
        challengeId: 84,
        imageSrc: "",
        correct: true,
        text: `Marcona almonds or pistachios.`,
      },
      {
        challengeId: 84,
        imageSrc: "",
        correct: false,
        text: `Cashews.`,
      },
      {
        challengeId: 84,
        imageSrc: "",
        correct: false,
        text: `Brazil Nuts.`,
      },
    ]);
    //  {
    //     id: 86,
    //     type: "SELECT",
    //     question: `What is the suggested wine pairing for the Artisanal Cheese?`,
    //   },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 86,
        imageSrc: "",
        correct: false,
        text: `Domaine Durban, Muscat de Beaumes-de-Venise, 2021.`,
      },
      {
        challengeId: 86,
        imageSrc: "",
        correct: false,
        text: `Château Gravas, Sauternes, 2020.`,
      },
      {
        challengeId: 86,
        imageSrc: "",
        correct: true,
        text: `Michel Gahier, Macvin du Jura.`,
      },
      {
        challengeId: 86,
        imageSrc: "",
        correct: false,
        text: `A Double hopped IPA.`,
      },
    ]);

    /**
     * Course id - 2: Front Waiter - Steps of Service
     * Unit id - 2: Front Waiter - Steps of Service
     */
    await db.insert(schema.units).values([
      {
        id: 2,
        courseId: 2,
        title: "Front Waiter",
        description: "Steps of Service",
        order: 10,
      },
    ]);

    /**
     * Lessons for Course 2, Unit 2 Front Waiter Steps of Service
     */
    await db.insert(schema.lessons).values([
      {
        id: 8,
        unitId: 2,
        order: 10,
        title: "Greeting the Table and Beverage Service",
      },
      {
        id: 9,
        unitId: 2,
        order: 20,
        title: "Taking the Order",
      },
      {
        id: 10,
        unitId: 2,
        order: 30,
        title: "Ringing in the Order",
      },
      {
        id: 11,
        unitId: 2,
        order: 40,
        title: `The Pass / Expo Window`,
      },
      {
        id: 12,
        unitId: 2,
        order: 50,
        title: "Wine Service",
      },
      {
        id: 13,
        unitId: 2,
        order: 60,
        title: "First Course",
      },
      {
        id: 14,
        unitId: 2,
        order: 70,
        title: "Second Course",
      },
      {
        id: 15,
        unitId: 2,
        order: 80,
        title: "Serving Dessert",
      },
      {
        id: 16,
        unitId: 2,
        order: 90,
        title: "Critical Points of Service",
      },
    ]);

    /**
     * Course id - 2: Front Waiter - Steps of Service
     * Unit id - 2: Front Waiter - Steps of Service
     * Lesson id - 8: Greeting the Table and Beverage Service
     */
    await db.insert(schema.challenges).values([
      {
        id: 107,
        lessonId: 8,
        type: "CURRICULUM",
        order: 10,
        imageSrc: null,
        question: `The Host/Hostess will provide a Resy Chit for the seated table. Read all pertinent information before approaching the table.\n\nThis information may include: XXP status, number of visits, and friends of notes; dietary restrictions and allergies; birthday or anniversary celebration notes; item purchases or pre-orders — often to be immediately brought to the table; and a detailed run of show.`,
      },
      {
        id: 108,
        lessonId: 8,
        type: "CURRICULUM",
        order: 20,
        imageSrc: null,
        question: `Greet the table within 60 seconds of seating. Introduce yourself and your partner, and smile and make eye contact. This greeting will set the tone of the guests' entire meal. You are always knowledgeable and confident.\n\nThis initial interaction is when you make the guest really feel like you know everything about the restaurant, that they can relax, and let you guide them through their dining experience. We're here to create a warm and welcoming environment. The guests should feel like they are in good hands.\n\n"Hi, welcome to Herbsaint. My name is ____."\n"My partner ____ and I will be serving you this afternoon/evening."\n\nOften, this is your table's first time dining with us. Introducing yourself and your partner helps set the expectation of team service, for those not familiar with this style of service.`,
      },
      {
        id: 109,
        lessonId: 8,
        type: "CURRICULUM",
        order: 30,
        imageSrc: null,
        question: `Take this time to make your initial read of the table. This is the most important step in determining how you'll treat the table, from diction and posture, to level of engagement.\n\nIs this an LRG Regular or XXP? Who is the host? Is this a business meeting, a celebration, or a first date? Are the guests already looking at the wine list? Do the guests want to be engaged and guided, or left with minimal interruptions? As you approach the table, are you interrupting, or rescuing?`,
      },
      {
        id: 110,
        lessonId: 8,
        type: "SELECT",
        order: 40,
        imageSrc: null,
        question: `Why is the initial read of the table considered the most important step in determining service style?`,
      },
      {
        id: 111,
        lessonId: 8,
        type: "SELECT",
        order: 50,
        imageSrc: null,
        question: `Within how many seconds should a table be greeted after being seated?`,
      },
      {
        id: 112,
        lessonId: 8,
        type: "CURRICULUM",
        order: 60,
        imageSrc: null,
        question: `While greeting the guests, reach to the center of the table and push the Salt and Pepper shakers together. For patio tables, greet with a Herbsaint logo coaster.\n\nThis is a non-verbal cue, signaling to your partner that the table, inside or outside, has been greeted.`,
      },
      {
        id: 113,
        lessonId: 8,
        type: "CURRICULUM",
        order: 70,
        imageSrc: null,
        question: `Ask for the guests' preferred water service. Never say: "bottled, or just tap?"\n\n"Would you prefer bottled still, sparkling, or ice water this afternoon/evening."\n\nThis is also the time to mention our cocktails, wines by the glass, and beers on the back of the menu.\n\nCommunicate the guests' water preference to your Back Waiter. Never automatically bring ice water. It sets a tone of being rushed and the table's needs being ignored from the beginning.\n\nHand signals are the fastest way to communicate, silently and from across the floor: tap on your shoulder means tap water, "bubble" fingers means sparkling bottled water, and swiping your hand from left to right means still bottled water.`,
      },
      {
        id: 114,
        lessonId: 8,
        type: "SELECT",
        order: 80,
        imageSrc: null,
        question: `What is the hand signal for sparkling bottled water?`,
      },
      {
        id: 115,
        lessonId: 8,
        type: "SELECT",
        order: 90,
        imageSrc: null,
        question: `What should you never ask a table when offering water service?`,
      },
      {
        id: 215,
        lessonId: 8,
        type: "CURRICULUM",
        order: 99,
        imageSrc: null,
        question: `Once your back waiter delivers water service, approach the table to ask if they're ready to order beverages. Use your knowledge of the spirit list to ask for a spirit preference and any qualifying questions for classic cocktails (vermouth, twist, olives, up/rocks, etc). If guests would like to start with a bottle of wine, guide them through the list or suggest to send over a manager if they have more detailed questions.`,
      },
      {
        id: 116,
        lessonId: 8,
        type: "CURRICULUM",
        order: 100,
        imageSrc: null,
        question: `Deliver the drinks from the bar to the table within 3-4 minutes of ordering.\n\nAlways use a tray in your left hand. Announce the beverage as it is served with your right hand, to the guest's right. Hold glasses at the stem or as close to the base as possible. Never touch or get even close to the rim.`,
      },
      {
        id: 117,
        lessonId: 8,
        type: "CURRICULUM",
        order: 110,
        imageSrc: null,
        question: `Do not stand at the bar waiting for drinks. If drinks are taking longer than 5 minutes, alert a manager.\n\nInstead of waiting and staring run another sections drinks, run some food, or check on your section.\n\n.If other drinks are ready when yours are, add them to your tray and deliver multiple tables. Teamwork goes beyond your section!`,
      },
      {
        id: 118,
        lessonId: 8,
        type: "SELECT",
        order: 120,
        imageSrc: null,
        question: `Should you stand at the bar staring at the bartenders while they make your drinks, like you have nothing better to do?`,
      },
      {
        id: 119,
        lessonId: 8,
        type: "CURRICULUM",
        order: 130,
        imageSrc: null,
        question: `As drinks are delivered, this is the opportune time to recite the daily off-menu specials without further interrupting the table. Maintain eye contact with guests and continue smiling.\n\nWhen special cards are printed, do not read the specials. Elaborate on the preparation and ingredients, while highlighting the card and our signature items.\n\nInform the guests of any 86'd items: "Unfortunately, we are out of _____ tonight."\n\nOffer to answer any questions. Be sure of the facts. Never make things up.\n\nPoint out the wine list and offer to suggest wine. If a guest has specific questions about the wine list you're not comfortable answering, offer to send a manager or sommelier to the table.`,
      },
      {
        id: 120,
        lessonId: 8,
        type: "SELECT",
        order: 140,
        imageSrc: null,
        question: `If a guest asks a specific wine list question you are not comfortable answering, what should you do?`,
      },
      {
        id: 121,
        lessonId: 8,
        type: "CURRICULUM",
        order: 150,
        imageSrc: null,
        question: `While at the table, never lean at or over it, or support yourself with one hand on the table or on the back of a chair. Never sit down, crouch next to, or touch a guest.`,
      },
      {
        id: 122,
        lessonId: 8,
        type: "SELECT",
        order: 160,
        imageSrc: null,
        question: `Which of the following should be avoided while at a guest's table?`,
      },
    ]);

    /**
     * ChallengeOptions - lessonId : 8
     */

    // { id: 110, lessonId: 8, type: "SELECT", order: 40, question: `Why is the initial read of the table considered the most important step in determining service style?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 110,
        imageSrc: "",
        correct: true,
        text: `It determines how you'll treat the table, from diction and posture to level of engagement.`,
      },
      {
        challengeId: 110,
        imageSrc: "",
        correct: false,
        text: `It determines how much to charge the table for their meal.`,
      },
      {
        challengeId: 110,
        imageSrc: "",
        correct: false,
        text: `It has no real impact, every table should be treated exactly the same.`,
      },
      {
        challengeId: 110,
        imageSrc: "",
        correct: false,
        text: `It determines whether the table is going to be a pain in the ass or not.`,
      },
    ]);

    // { id: 111, lessonId: 8, type: "SELECT", order: 50, question: `Within how many seconds should a table be greeted after being seated?` },
    await db.insert(schema.challengeOptions).values([
      { challengeId: 111, imageSrc: "", correct: false, text: `45 minutes` },
      { challengeId: 111, imageSrc: "", correct: false, text: `2 minutes` },
      { challengeId: 111, imageSrc: "", correct: false, text: `10 seconds` },
      { challengeId: 111, imageSrc: "", correct: true, text: `60 seconds` },
    ]);

    // { id: 114, lessonId: 8, type: "SELECT", order: 80, question: `What is the hand signal for sparkling bottled water?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 114,
        imageSrc: "",
        correct: false,
        text: `Tap on your shoulder.`,
      },
      {
        challengeId: 114,
        imageSrc: "",
        correct: true,
        text: `"Bubble" fingers.`,
      },
      {
        challengeId: 114,
        imageSrc: "",
        correct: false,
        text: `Swipe your hand from left to right.`,
      },
      { challengeId: 114, imageSrc: "", correct: false, text: `A thumbs up.` },
    ]);

    // { id: 115, lessonId: 8, type: "SELECT", order: 90, question: `What should you never ask a table when offering water service?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 115,
        imageSrc: "",
        correct: true,
        text: `"Bottled, or just tap?"`,
      },
      {
        challengeId: 115,
        imageSrc: "",
        correct: false,
        text: `"Would you prefer bottled still, sparkling, or ice water?"`,
      },
      {
        challengeId: 115,
        imageSrc: "",
        correct: false,
        text: `"Is Mississippi River tap water fine for everyone?"`,
      },
      {
        challengeId: 115,
        imageSrc: "",
        correct: false,
        text: `"Can I start everyone off with some water?"`,
      },
    ]);

    // { id: 118, lessonId: 8, type: "SELECT", order: 120, question: `Should you stand at the bar staring at the bartenders while they make your drinks, like you have nothing better to do?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 118,
        imageSrc: "",
        correct: false,
        text: `Yes, it helps them move faster.`,
      },
      {
        challengeId: 118,
        imageSrc: "",
        correct: false,
        text: `Yes, that way you can run them exactly when they are ready.`,
      },
      {
        challengeId: 118,
        imageSrc: "",
        correct: true,
        text: `No. There is plenty to do. Make yourself useful and circle back for the drinks in a minute or two.`,
      },
      {
        challengeId: 118,
        imageSrc: "",
        correct: false,
        text: `Yes, bartenders like the attention.`,
      },
    ]);

    // { id: 120, lessonId: 8, type: "SELECT", order: 140, question: `If a guest asks a specific wine list question you are not comfortable answering, what should you do?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 120,
        imageSrc: "",
        correct: false,
        text: `Make something up on the spot, they'll never know.`,
      },
      {
        challengeId: 120,
        imageSrc: "",
        correct: false,
        text: `Tell the guest you don't know and walk away.`,
      },
      {
        challengeId: 120,
        imageSrc: "",
        correct: true,
        text: `Offer to send a manager or sommelier to the table.`,
      },
      {
        challengeId: 120,
        imageSrc: "",
        correct: false,
        text: `Anwser their question with a question of your own. Example: do you prefer earthy or more fruit forward wine?`,
      },
    ]);

    // { id: 122, lessonId: 8, type: "SELECT", order: 160, question: `Which of the following should be avoided while at a guest's table?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 122,
        imageSrc: "",
        correct: true,
        text: `Leaning on the table or the back of a guest's chair.`,
      },
      {
        challengeId: 122,
        imageSrc: "",
        correct: false,
        text: `Making eye contact with the guest.`,
      },
      {
        challengeId: 122,
        imageSrc: "",
        correct: false,
        text: `Announcing the dish you're serving.`,
      },
      { challengeId: 122, imageSrc: "", correct: false, text: `Smiling.` },
    ]);

    /**
     * Course id - 2: Front Waiter - Steps of Service
     * Unit id - 2: Front Waiter - Steps of Service
     * Lesson id - 9: Taking the Order
     */
    await db.insert(schema.challenges).values([
      {
        id: 123,
        lessonId: 9,
        type: "CURRICULUM",
        order: 10,
        imageSrc: null,
        question: `Return to the table within 3-5 minutes to take the order. We encourage each table to provide a full order. Women's orders should be taken first if at all possible.\n\nWrite down each order with the corresponding seat number in your server book. Note all special requests, and repeat the order back to the guests. Always write down the order. Don't rely on memory.`,
      },
      {
        id: 124,
        lessonId: 9,
        type: "CURRICULUM",
        order: 20,
        imageSrc: null,
        question: `Let the table know how you plan on grouping and coursing their order. This will remove any uncertainty for you or for the guest. With the full order taken, Chef will be in control of the pacing for each course.`,
      },
      {
        id: 216,
        lessonId: 9,
        type: "CURRICULUM",
        order: 21,
        imageSrc: null,
        question: `As ambassadors for the restaurant, we know the menu inside and out. It is our job to help the guest navigate their meal so they have the optimal experience. Alert tables of items with long cook times so that they are not wondering and waiting where their food is.\n\nSuggest reorganizing their courses if it would enhance their meal and make sense. Know the dishes well enough to answer general questions regarding allergies and possible modifications. Do not “upsell” by being pushy. Describe the menu eloquently, but do not only suggest high priced items or too much food, be intentional and always in the best interest of the guest.`,
      },
      {
        id: 125,
        lessonId: 9,
        type: "SELECT",
        order: 30,
        imageSrc: null,
        question: `Within how many minutes should you return to the table to take the order?`,
      },
      {
        id: 126,
        lessonId: 9,
        type: "SELECT",
        order: 40,
        imageSrc: null,
        question: `Ideally, whose order should be taken first at the table?`,
      },
      {
        id: 127,
        lessonId: 9,
        type: "CURRICULUM",
        order: 50,
        imageSrc: null,
        question: `Handling special requests is part of guiding the guest's experience. If a guest asks if we have anything for vegetarians, let them know we have several vegetarian-friendly items and point them out, communicating any additional dietary restrictions to the kitchen via kitchen modifiers. The chef prepares a vegetarian and vegan friendly entrée daily. It should be posted in the server alley.`,
      },
      {
        id: 217,
        lessonId: 9,
        type: "CURRICULUM",
        order: 51,
        imageSrc: null,
        question: `If asked what we have for kids, point out the child-friendly items on the menu and mention other items the kitchen regularly prepares for children. Ask parents if they'd like the child's order to come out as soon as possible, with the first course, or with the rest of the table's meal. Children's dishes are not available for adults.`,
      },
      {
        id: 128,
        lessonId: 9,
        type: "CURRICULUM",
        order: 60,
        imageSrc: null,
        question: `As a rule of thumb, you can subtract from a dish rather than add to it, unless the item is cooked into the dish. For example: a guest can order the Duck Leg Confit without the Yellow Squash, with a side of Green Beans instead.`,
      },
      {
        id: 218,
        lessonId: 9,
        type: "CURRICULUM",
        order: 61,
        imageSrc: null,
        question: `If a guest mentions an allergy, say "Pardon me for just a moment, and I'll check with the Chef". Use the allergy matrix posted in the server alley as your guide, but always double check with the kitchen expo. Guide them through the approved items on the menu according to their specific sensitivities. Never assume, guess, or try to figure it out on your own. Allergies are a serious liability for which the Chef is solely responsible.`,
      },
      {
        id: 129,
        lessonId: 9,
        type: "SELECT",
        order: 70,
        imageSrc: null,
        question: `What should you do if a guest tells you they have a food allergy?`,
      },
      {
        id: 130,
        lessonId: 9,
        type: "SELECT",
        order: 80,
        imageSrc: null,
        question: `Can you substitue ingredients that aren't cooked into the dish?`,
      },
      {
        id: 131,
        lessonId: 9,
        type: "CURRICULUM",
        order: 90,
        imageSrc: null,
        question: `If a guest requests a swap, like the Blueberry Fried Pie with Vanilla Ice Cream, simply say "Certainly," ring in the substitution, and inform the Expo window of the change.\n\nAny guest may order food to go, with a few exceptions: raw or undercooked food, or food that does not travel well. See the Chef or a manager with any questions. Desserts may be ordered to go as long as they don't include frozen items or items served in a ramekin.`,
      },
      {
        id: 132,
        lessonId: 9,
        type: "CURRICULUM",
        order: 100,
        imageSrc: null,
        question: `Our goal is to always make guests feel comfortable and welcome, even when we can't accommodate a particular request. Rather than telling a guest "No substitutions," try a positive redirection: "I'm happy to order you a side of ______."\n\nThis lets the guest know you'll get them something they'll enjoy, while also letting them know to expect the item on the bill, avoiding awkward situations later.`,
      },
      {
        id: 133,
        lessonId: 9,
        type: "SELECT",
        order: 110,
        imageSrc: null,
        question: `Instead of saying "No substitutions," what should you say to a guest?`,
      },
      {
        id: 134,
        lessonId: 9,
        type: "CURRICULUM",
        order: 120,
        imageSrc: null,
        question: `The Front Waiter is responsible for pre-setting share plates and share spoons for the first course, before the order goes into Toast. This is the time to make room in the center of the table for those shared items to be dropped. Communicate with your Back Waiter, mentioning share plates, marking, and any special needs.`,
      },
      {
        id: 135,
        lessonId: 9,
        type: "CURRICULUM",
        order: 130,
        imageSrc: null,
        question: `Remove menus and bring them to the host stand or wait station. Menus should never be tucked under your arm while you take another order. Looking in control, even when we're on the hustle, makes the dining room appear under control and puts guests at ease.\n\nAfter the order is taken, scan the table and remove excess or unnecessary silver, debris, and glasses that will not be needed.`,
      },
      {
        id: 136,
        lessonId: 9,
        type: "CURRICULUM",
        order: 140,
        imageSrc: null,
        question: `Prior to ringing the order into Toast, be aware of menu items that come out quickly, and time your order so water, bread, and wine or cocktails are on the table before the first course arrives.\n\nIf soups or salads are the only items ordered for the first course, hold the food order for an appropriate amount of time to allow your Back Waiter to serve bread first.`,
      },
      {
        id: 137,
        lessonId: 9,
        type: "SELECT",
        order: 150,
        imageSrc: null,
        question: `Why should you time when you send an order into Toast?`,
      },
    ]);

    /**
     * ChallengeOptions - lessonId : 9
     */

    // { id: 125, lessonId: 9, type: "SELECT", order: 30, question: `Within how many minutes should you return to the table to take the order?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 125,
        imageSrc: "",
        correct: false,
        text: `45-60 minutes.`,
      },
      {
        challengeId: 125,
        imageSrc: "",
        correct: false,
        text: `Immediately after greeting.`,
      },
      { challengeId: 125, imageSrc: "", correct: true, text: `3-5 minutes.` },
      {
        challengeId: 125,
        imageSrc: "",
        correct: false,
        text: `Only once the guest flags you down.`,
      },
    ]);

    // { id: 126, lessonId: 9, type: "SELECT", order: 40, question: `Ideally, whose order should be taken first at the table?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 126,
        imageSrc: "",
        correct: true,
        text: `Women's orders.`,
      },
      {
        challengeId: 126,
        imageSrc: "",
        correct: false,
        text: `The host's order.`,
      },
      {
        challengeId: 126,
        imageSrc: "",
        correct: false,
        text: `Whoever looks the hungriest or has been the pushiest so far.`,
      },
      {
        challengeId: 126,
        imageSrc: "",
        correct: false,
        text: `It doesn't matter, take orders in a clockwise direction.`,
      },
    ]);

    // { id: 129, lessonId: 9, type: "SELECT", order: 70, question: `What should you do if a guest tells you they have a food allergy?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 129,
        imageSrc: "",
        correct: false,
        text: `Use your best judgment to recommend a dish.`,
      },
      {
        challengeId: 129,
        imageSrc: "",
        correct: true,
        text: `Reference the allergy matrix in the server alley, then double check with the kitchen expo according to their specific sensitivities.`,
      },
      {
        challengeId: 129,
        imageSrc: "",
        correct: false,
        text: `Tell them to avoid anything that sounds risky.`,
      },
      {
        challengeId: 129,
        imageSrc: "",
        correct: false,
        text: `Tell them to live a little and just go for it. What's the worst that could happen?`,
      },
    ]);

    // { id: 130, lessonId: 9, type: "SELECT", order: 80, question: `As a general rule, can you add ingredients to a dish that aren't already part of it?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 130,
        imageSrc: "",
        correct: false,
        text: `Yes, but only if it makes the dish spicier though.`,
      },
      {
        challengeId: 130,
        imageSrc: "",
        correct: true,
        text: `No. As a rule, you can subtract from a dish rather than add to it.`,
      },
      {
        challengeId: 130,
        imageSrc: "",
        correct: false,
        text: `Yes, guests can create whatever dish they would like, the Chef loves that actually.`,
      },
      {
        challengeId: 130,
        imageSrc: "",
        correct: false,
        text: `No modifications of any kind are ever allowed.`,
      },
    ]);

    // { id: 133, lessonId: 9, type: "SELECT", order: 110, question: `Instead of saying "No substitutions," what should you say to a guest?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 133,
        imageSrc: "",
        correct: false,
        text: `"I'm sorry, I don't think I quite understand the question."`,
      },
      {
        challengeId: 133,
        imageSrc: "",
        correct: true,
        text: `"I'm happy to order you a side of ______."`,
      },
      {
        challengeId: 133,
        imageSrc: "",
        correct: false,
        text: `"You'll have to ask the kitchen yourself."`,
      },
      {
        challengeId: 133,
        imageSrc: "",
        correct: false,
        text: `"Sorry, this isn't Chipotle."`,
      },
    ]);

    // { id: 137, lessonId: 9, type: "SELECT", order: 150, question: `Why should you time when you send an order into Toast?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 137,
        imageSrc: "",
        correct: true,
        text: `So water, bread, and drinks are on the table before the first course arrives.`,
      },
      {
        challengeId: 137,
        imageSrc: "",
        correct: false,
        text: `So the kitchen can take a break between tickets.`,
      },
      {
        challengeId: 137,
        imageSrc: "",
        correct: false,
        text: `Timing doesn't matter, orders should always be sent in immediately.`,
      },
      {
        challengeId: 137,
        imageSrc: "",
        correct: false,
        text: `So you can doom scroll through your phone before your next table or between courses.`,
      },
    ]);

    /**
     * Course id - 2: Front Waiter - Steps of Service
     * Unit id - 2: Front Waiter - Steps of Service
     * Lesson id - 10: Ringing in the Order
     */
    await db.insert(schema.challenges).values([
      {
        id: 138,
        lessonId: 10,
        type: "CURRICULUM",
        order: 10,
        imageSrc: null,
        question: `When entering the order in Toast, group like items within each course by quantity, note seat numbers for every guest, and place course lines appropriately. Take your time and check the ticket once more before sending it to the kitchen.`,
      },
      {
        id: 139,
        lessonId: 10,
        type: "CURRICULUM",
        order: 20,
        imageSrc: null,
        question: `Before sending the ticket, verify: the ticket name if there's an XXP or allergy; any relevant modifiers, such as share, more to come, only, or drop on top; the correct number of entrées, course lines, seat numbers, and steak temps; and any allergies along with the item removed or altered to comply with them.`,
      },
      {
        id: 140,
        lessonId: 10,
        type: "SELECT",
        order: 30,
        imageSrc: null,
        question: `What should the ticket name reflect if a guest has an allergy or is XXP?`,
      },
      {
        id: 141,
        lessonId: 10,
        type: "CURRICULUM",
        order: 40,
        imageSrc: null,
        question: `Modifiers communicate coursing intent to the kitchen.\n"More to Come" is used when only apps are ordered but more will be ordered shortly.\n"Apps in" is used when ordering entrées while apps are already ordered but not yet on the table. \n"Drop on top" is used when apps are on the table and the guests want the next course to arrive while they still have apps, or when it's an add-on the table wants right away.\n"Only" marks the only course ordered, with no further food or courses to follow.\n"Add as Entrée" is used when adding an item for an entrée, or for a joiner at the table.`,
      },
      {
        id: 142,
        lessonId: 10,
        type: "SELECT",
        order: 50,
        imageSrc: null,
        question: `When would you use the "Drop on top" modifier?`,
      },
      {
        id: 143,
        lessonId: 10,
        type: "SELECT",
        order: 60,
        imageSrc: null,
        question: `When would you use the "More to Come" modifier?`,
      },
      {
        id: 144,
        lessonId: 10,
        type: "CURRICULUM",
        order: 70,
        imageSrc: null,
        question: `When several guests at one table order the same thing and one has a special request, press the quantity on the ordered item and list every seat number, then use "type prep" to add the specific seat number and modification. For example: \n\n3 Gem Lettuce\n\n  seat 1\n\n  seat 2\n\n    "type prep"\\n  seat 3 dressing on side.\n\nWhen a guest orders a specific liquor in a specific cocktail, order the liquor first, then use the modifier to indicate the cocktail it goes in.`,
      },
      {
        id: 145,
        lessonId: 10,
        type: "CURRICULUM",
        order: 80,
        imageSrc: null,
        question: `To ring in an allergy modifier, name the ticket for the allergy itself, for example "Gluten Allergy," then use "type prep" on the affected seat's item to note the modification, such as no bread`,
      },
      {
        id: 146,
        lessonId: 10,
        type: "SELECT",
        order: 90,
        imageSrc: null,
        question: `How should you name a ticket for a guest with an allergy?`,
      },
    ]);

    /**
     * ChallengeOptions - lessonId : 10
     */

    // { id: 140, lessonId: 10, type: "SELECT", order: 30, question: `What should the ticket name reflect if a guest has an allergy or is XXP?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 140,
        imageSrc: "",
        correct: true,
        text: `The relevant status or condition, such as the allergy or the XXP's name at the top of the ticket.`,
      },
      {
        challengeId: 140,
        imageSrc: "",
        correct: false,
        text: `The guest's nick name if you can get it.`,
      },
      {
        challengeId: 140,
        imageSrc: "",
        correct: false,
        text: `The table number only, nothing else.`,
      },
      {
        challengeId: 140,
        imageSrc: "",
        correct: false,
        text: `The ticket should only be named if it's a birthday or an anniversary.`,
      },
    ]);

    // { id: 142, lessonId: 10, type: "SELECT", order: 50, question: `When would you use the "Drop on top" modifier?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 142,
        imageSrc: "",
        correct: false,
        text: `When only apps have been ordered so far.`,
      },
      {
        challengeId: 142,
        imageSrc: "",
        correct: true,
        text: `When apps are on the table and the guests want the next course now, or for an urgent add-on.`,
      },
      {
        challengeId: 142,
        imageSrc: "",
        correct: false,
        text: `When it's the only item ordered for the table.`,
      },
      {
        challengeId: 142,
        imageSrc: "",
        correct: false,
        text: `When adding a joiner's entrée to the table.`,
      },
    ]);

    // { id: 143, lessonId: 10, type: "SELECT", order: 60, question: `When would you use the "More to Come" modifier?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 143,
        imageSrc: "",
        correct: true,
        text: `When only apps are ordered but the table will order more shortly.`,
      },
      {
        challengeId: 143,
        imageSrc: "",
        correct: false,
        text: `When the table has finished ordering entirely.`,
      },
      {
        challengeId: 143,
        imageSrc: "",
        correct: false,
        text: `When apps are already on the table.`,
      },
      {
        challengeId: 143,
        imageSrc: "",
        correct: false,
        text: `When you want to keep the kitchen in suspense.`,
      },
    ]);

    // { id: 146, lessonId: 10, type: "SELECT", order: 90, question: `How should you name a ticket for a guest with an allergy?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 146,
        imageSrc: "",
        correct: false,
        text: `By the guest's seat number only.`,
      },
      {
        challengeId: 146,
        imageSrc: "",
        correct: true,
        text: `By the allergy itself, for example "Gluten Allergy."`,
      },
      {
        challengeId: 146,
        imageSrc: "",
        correct: false,
        text: `By the guest's name and if it's their birthday.`,
      },
      {
        challengeId: 146,
        imageSrc: "",
        correct: false,
        text: `Allergies don't need to be named on the ticket.`,
      },
    ]);

    /**
     * Course id - 2: Front Waiter - Steps of Service
     * Unit id - 2: Front Waiter - Steps of Service
     * Lesson id - 11: "The Pass / Expo Window"
     */
    await db.insert(schema.challenges).values([
      {
        id: 147,
        lessonId: 11,
        type: "CURRICULUM",
        order: 10,
        imageSrc: null,
        question: `The Pass, or expo window, is the most important area of the restaurant. It is both the Front and Back Waiters' number one responsibility: Run Hot Food. Always keep an eye out for food in the window and help deliver it, whether it's your table's order or not.`,
      },
      {
        id: 219,
        lessonId: 11,
        type: "CURRICULUM",
        order: 11,
        imageSrc: null,
        question: `Never take food out without a ticket, even if you're certain you know where it goes. Repeat the name of the dish, the table, and the seat number to the expediter every time. When dropping food, check that the table has proper presets, like share plates or a steak knife. Food does not get dropped on an unmarked table.`,
      },
      {
        id: 148,
        lessonId: 11,
        type: "CURRICULUM",
        order: 20,
        imageSrc: null,
        question: `If food must come back to the window because a table isn't ready, communicate a reason and timeline to the Expo. "Not marked" or "Marking now" means about 30 seconds. "Need to be cleared and marked" means 1-2 minutes.\n\n"Still working on the first course" requires a time estimate before the table will be clear and marked. The kitchen may need to refire the entire order. That will need to be communicated to a manager in case there is a long lag between courses.`,
      },
      {
        id: 149,
        lessonId: 11,
        type: "SELECT",
        order: 30,
        imageSrc: null,
        question: `Roughly how long is the timeline for "Not marked" or "Marking now" at the pass?`,
      },
      {
        id: 150,
        lessonId: 11,
        type: "SELECT",
        order: 40,
        imageSrc: null,
        question: `Who should be informed if the kitchen needs to refire an entire order because of a long lag between courses?`,
      },
      {
        id: 151,
        lessonId: 11,
        type: "CURRICULUM",
        order: 50,
        imageSrc: null,
        question: `All food leaves the window on the left side. Dishes should always be carried away from your body. Never use any area of your torso to balance dishes, whether serving or bussing.\n\nIf it feels awkward, it looks awkward.`,
      },
      {
        id: 152,
        lessonId: 11,
        type: "SELECT",
        order: 60,
        imageSrc: null,
        question: `How should dishes be carried when leaving the expo window?`,
      },
    ]);

    /**
     * ChallengeOptions - lessonId : 11
     */

    // { id: 149, lessonId: 11, type: "SELECT", order: 30, question: `Roughly how long is the timeline for "Not marked" or "Marking now" at the pass?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 149,
        imageSrc: "",
        correct: true,
        text: `About 30 seconds.`,
      },
      {
        challengeId: 149,
        imageSrc: "",
        correct: false,
        text: `About 1-2 minutes.`,
      },
      {
        challengeId: 149,
        imageSrc: "",
        correct: false,
        text: `About 5 minutes.`,
      },
      {
        challengeId: 149,
        imageSrc: "",
        correct: false,
        text: `There's no expected timeline.`,
      },
    ]);

    // { id: 150, lessonId: 11, type: "SELECT", order: 40, question: `Who should be informed if the kitchen needs to refire an entire order because of a long lag between courses?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 150,
        imageSrc: "",
        correct: false,
        text: `No one, this happens all the time.`,
      },
      {
        challengeId: 150,
        imageSrc: "",
        correct: false,
        text: `Only the guests at the table.`,
      },
      { challengeId: 150, imageSrc: "", correct: true, text: `A manager.` },
      {
        challengeId: 150,
        imageSrc: "",
        correct: false,
        text: `Everyone in the server alley.`,
      },
    ]);

    // { id: 152, lessonId: 11, type: "SELECT", order: 60, question: `How should dishes be carried when leaving the expo window?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 152,
        imageSrc: "",
        correct: false,
        text: `Gracefully balanced against your torso for stability.`,
      },
      {
        challengeId: 152,
        imageSrc: "",
        correct: true,
        text: `Carried away from your body.`,
      },
      {
        challengeId: 152,
        imageSrc: "",
        correct: false,
        text: `However is fastest, as long as the food doesn't spill.`,
      },
      {
        challengeId: 152,
        imageSrc: "",
        correct: false,
        text: `Stacked as high as possible to minimize trips.`,
      },
    ]);

    /**
     * Course id - 2: Front Waiter - Steps of Service
     * Unit id - 2: Front Waiter - Steps of Service
     * Lesson id - 12: Wine Service
     */
    await db.insert(schema.challenges).values([
      {
        id: 153,
        lessonId: 12,
        type: "CURRICULUM",
        order: 10,
        imageSrc: null,
        question: `The Front Waiter should open the wine. If the Front Waiter is busy, it's acceptable for the Back Waiter to open it. This should be discussed within the team as soon as the order has been placed.\n\nType prep the seat number of the host or guest ordering the bottle. When the order is placed, the glasses should go down immediately, thinking of them as share plates. Double check that glasses are thoroughly polished, and only touch and carry them at the stem. Remember managers are always available to answer questions and open wine. An experienced server always knows when to ask for help.`,
      },
      {
        id: 154,
        lessonId: 12,
        type: "CURRICULUM",
        order: 20,
        imageSrc: null,
        question: `A wine chit will print in the server alley for a manager to retrieve. This chit will include the bottle name, varietal, and vintage; its storage location in house; and the seat number of the host or guest.`,
      },
      {
        id: 155,
        lessonId: 12,
        type: "CURRICULUM",
        order: 30,
        imageSrc: null,
        question: `Present the bottle with the label facing the host or guest ordering. Have a folded linen with you for wiping the lip of the bottle after each pour; it's unnecessary to drape this linen over your wrist.\n\nPoint out the name of the producer and wine, the vintage, and the wine region. It's perfectly acceptable for a guest to touch the bottle to check the temperature.`,
      },
      {
        id: 156,
        lessonId: 12,
        type: "SELECT",
        order: 40,
        imageSrc: null,
        question: `What information does a wine chit include?`,
      },
      {
        id: 157,
        lessonId: 12,
        type: "CURRICULUM",
        order: 50,
        imageSrc: null,
        question: `Once the guest has confirmed the order, open the bottle, always keeping the label facing the guest. Cut the foil over the cork at the base of the lip of the bottle, and place the foil in your pocket.\n\nOnce opened, remove the cork from the worm and place it next to the host's wine glass. Screw tops should be placed in your pocket.`,
      },
      {
        id: 158,
        lessonId: 12,
        type: "CURRICULUM",
        order: 60,
        imageSrc: null,
        question: `Pour 1.5 to 2 ounces for the guest who ordered the bottle to taste. This taste is to ensure the wine is sound. If a guest refuses a wine simply because they don't like it, never question them: "Very good. I'll have a manager or sommelier right over to help find something you'll enjoy a bit more." Remove the bottle and let your manager know.\n\nWine can be esoteric and intimidating. It's our job to take all pretense out of the process and make the guest feel at ease.`,
      },
      {
        id: 159,
        lessonId: 12,
        type: "SELECT",
        order: 70,
        imageSrc: null,
        question: `How many ounces should you pour for an initial bottle tasting?`,
      },
      {
        id: 160,
        lessonId: 12,
        type: "SELECT",
        order: 80,
        imageSrc: null,
        question: `What should you do if a guest simply doesn't like the wine they tasted?`,
      },
      {
        id: 161,
        lessonId: 12,
        type: "CURRICULUM",
        order: 90,
        imageSrc: null,
        question: `Hold the bottle with your palm on the back label. When the bottle is twisted and raised to finish the pour, the label should again face the guest.\n\nAfter approval, walk clockwise around the table, pouring ladies first, then men, then finally the host, regardless of gender. Never stand in one place and pour for everyone. If the table has eight guests or more, you may pour consecutive seats regardless of gender, being mindful of how many guests you're pouring for.`,
      },
      {
        id: 162,
        lessonId: 12,
        type: "CURRICULUM",
        order: 100,
        imageSrc: null,
        question: `Place the bottle on the table, or in a wine bucket for sparkling and white wines. Offer to remove the cork from the table and place it in your pocket.\n\nWine levels should be kept at 4 ounces full, unless the host or guest requests to pour themselves. If they'd like to pour, communicate this to your Back Waiter and all managers on the floor.`,
      },
      {
        id: 163,
        lessonId: 12,
        type: "SELECT",
        order: 110,
        imageSrc: null,
        question: `What wine level should glasses be kept at?`,
      },
      {
        id: 164,
        lessonId: 12,
        type: "CURRICULUM",
        order: 120,
        imageSrc: null,
        question: `Wine ordered with apps should be poured before the entrées arrive. If one guest is low on wine, fill their glass regardless of the others. Whenever possible, pour from the guest's right side.\n\nDon't ask if a guest wants more wine, just pour. The guest will let you know when they're finished drinking. Communicate this to your Back Waiter.`,
      },
      {
        id: 165,
        lessonId: 12,
        type: "CURRICULUM",
        order: 130,
        imageSrc: null,
        question: `Constantly manicure the table of empty wine glasses, corks, and bottles throughout service.`,
      },
      {
        id: 166,
        lessonId: 12,
        type: "SELECT",
        order: 140,
        imageSrc: null,
        question: `Should you ask a guest if they'd like more wine before pouring?`,
      },
    ]);

    /**
     * ChallengeOptions - lessonId : 12
     */

    // { id: 156, lessonId: 12, type: "SELECT", order: 40, question: `What information does a wine chit include?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 156,
        imageSrc: "",
        correct: true,
        text: `Bottle name, varietal, and vintage; storage location; and seat number of the host or guest.`,
      },
      {
        challengeId: 156,
        imageSrc: "",
        correct: false,
        text: `Only the guest's name.`,
      },
      {
        challengeId: 156,
        imageSrc: "",
        correct: false,
        text: `The price of the bottle only.`,
      },
      {
        challengeId: 156,
        imageSrc: "",
        correct: false,
        text: `Tasting notes specific to that bottle of wine.`,
      },
    ]);

    // { id: 159, lessonId: 12, type: "SELECT", order: 70, question: `How many ounces should you pour for an initial bottle tasting?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 159,
        imageSrc: "",
        correct: false,
        text: `A full 5-6 ounces.`,
      },
      {
        challengeId: 159,
        imageSrc: "",
        correct: true,
        text: `1.5 to 2 ounces.`,
      },
      {
        challengeId: 159,
        imageSrc: "",
        correct: false,
        text: `Just enough to wet the bottom of the glass.`,
      },
      {
        challengeId: 159,
        imageSrc: "",
        correct: false,
        text: `A full glass, so they can properly judge it.`,
      },
    ]);

    // { id: 160, lessonId: 12, type: "SELECT", order: 80, question: `What should you do if a guest simply doesn't like the wine they tasted?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 160,
        imageSrc: "",
        correct: false,
        text: `Question them to understand exactly what's wrong with it.`,
      },
      {
        challengeId: 160,
        imageSrc: "",
        correct: false,
        text: `Let them know they can take it home with them anyway.`,
      },
      {
        challengeId: 160,
        imageSrc: "",
        correct: true,
        text: `Remove the bottle and offer to send a manager or sommelier to help find something they'll enjoy more.`,
      },
      {
        challengeId: 160,
        imageSrc: "",
        correct: false,
        text: `Charge them for the bottle regardless.`,
      },
    ]);

    // { id: 163, lessonId: 12, type: "SELECT", order: 110, question: `What wine level should glasses be kept at?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 163,
        imageSrc: "",
        correct: false,
        text: `Completely full at all times.`,
      },
      {
        challengeId: 163,
        imageSrc: "",
        correct: true,
        text: `4 ounces full.`,
      },
      {
        challengeId: 163,
        imageSrc: "",
        correct: false,
        text: `Half a glass, no more.`,
      },
      {
        challengeId: 163,
        imageSrc: "",
        correct: false,
        text: `Empty the bottle as soon as possilbe to encourage them to order another one.`,
      },
    ]);

    // { id: 166, lessonId: 12, type: "SELECT", order: 140, question: `Should you ask a guest if they'd like more wine before pouring?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 166,
        imageSrc: "",
        correct: false,
        text: `Yes, always ask before pouring.`,
      },
      {
        challengeId: 166,
        imageSrc: "",
        correct: true,
        text: `No, just pour. The guest will let you know when they're finished.`,
      },
      {
        challengeId: 166,
        imageSrc: "",
        correct: false,
        text: `It is up to you to decide who has been over served.`,
      },
      {
        challengeId: 166,
        imageSrc: "",
        correct: false,
        text: `Not if they are drinking it very quickly.`,
      },
    ]);

    /**
     * Course id - 2: Front Waiter - Steps of Service
     * Unit id - 2: Front Waiter - Steps of Service
     * Lesson id - 13: First Course
     */
    await db.insert(schema.challenges).values([
      {
        id: 167,
        lessonId: 13,
        type: "CURRICULUM",
        order: 10,
        imageSrc: null,
        question: `Serve the first course: women first if possible, placing plates discreetly from the left side with your left hand. Always announce the dish you're presenting. Know where you're going, know your seat numbers, and do NOT auction off food at the table.\n\nWatch your elbows. Do not lean over the table, avoid reaching in front of a guest whenever possible, and excuse your reach if you can't avoid it. When possible, drop entrées and large format items before sides, since they're more visually impressive and can be difficult to present with sides already scattered around the table.`,
      },
      {
        id: 168,
        lessonId: 13,
        type: "CURRICULUM",
        order: 20,
        imageSrc: null,
        question: `Refrain from using common house terms for our signature dishes, like calling something a "spag app." Instead: "This is the housemade spaghetti with guanciale and a fried poached egg to share."`,
      },
      {
        id: 169,
        lessonId: 13,
        type: "CURRICULUM",
        order: 30,
        imageSrc: null,
        question: `Check back with guests and make yourself available within 2 bites or 2 minutes. Always manicure the table while doing so, checking beverage levels. This is another opportunity to read the table: is someone picking at or not eating their food? Making eye contact is an effective way to judge a guest's needs and give them an opportunity to communicate.\n\nNever ask, "Are we enjoying everything?"`,
      },
      {
        id: 170,
        lessonId: 13,
        type: "SELECT",
        order: 40,
        imageSrc: null,
        question: `What phrase should you avoid asking a table when checking on their food?`,
      },
      {
        id: 171,
        lessonId: 13,
        type: "SELECT",
        order: 50,
        imageSrc: null,
        question: `Within what timeframe should you check back on a table after dropping a course?`,
      },
      {
        id: 172,
        lessonId: 13,
        type: "CURRICULUM",
        order: 60,
        imageSrc: null,
        question: `If a guest isn't enjoying their dish, take it away. Offer to have it remade or bring a different dish entirely. It's imperative to find out exactly what the guest didn't enjoy about the dish, since Chef will need this information.\n\nBring the dish to the right side of the expo so the information can be relayed. Chef may want to check the quality of the item. Always alert a manager as well.`,
      },
      {
        id: 173,
        lessonId: 13,
        type: "CURRICULUM",
        order: 70,
        imageSrc: null,
        question: `Communicate to the kitchen the new dish or refire needed, along with the table and seat number. Re-ring the new item or refire, modifying it with DON'T MAKE.`,
      },
      {
        id: 174,
        lessonId: 13,
        type: "SELECT",
        order: 80,
        imageSrc: null,
        question: `What modifier should be used when re-ringing a dish that needs to be redone?`,
      },
      {
        id: 175,
        lessonId: 13,
        type: "CURRICULUM",
        order: 90,
        imageSrc: null,
        question: `Clear the first course as needed. If possible, wait until the last person has finished eating. Remove all used plates and silverware. Ask "May I take your plate?" Once you've asked one guest, it's unnecessary to continue asking the others; a guest will let you know if they're not ready.\n\nIf a guest has placed their fork and knife parallel to one another on the right-hand side of the plate, there's no need to ask; this is the guest signaling they're finished. Avoid clearing a table while other people are still eating. Exceptions: stacked plates, a napkin on the plate, or a guest asking for it to be taken.`,
      },
      {
        id: 176,
        lessonId: 13,
        type: "CURRICULUM",
        order: 100,
        imageSrc: null,
        question: `Guests should be cleared from their right-hand side with your right hand. Place the first plate in your left hand; it will act as your tray for off-sized dishes and silver. The second plate is balanced on your left wrist and palm, and subsequent plates are stacked on the second. Never clear more than you're comfortable with. If it feels awkward, it looks awkward.\n\nIf you need help, ask your partner before approaching the table, or make eye contact with a passing server. Take dirty dishes directly to the kitchen. Never approach another table with full hands.`,
      },
      {
        id: 177,
        lessonId: 13,
        type: "SELECT",
        order: 110,
        imageSrc: null,
        question: `Which side should a guest be cleared from?`,
      },
      {
        id: 178,
        lessonId: 13,
        type: "CURRICULUM",
        order: 120,
        imageSrc: null,
        question: `Whenever moving through the dining room, keep your eyes up and smile. Be aware of tight spaces and corners. If another server has a wine glass or tray behind their back, surreptitiously take it.\n\nYour eyes should be constantly moving between the expo window, cocktails and wine at the bar, your Back Waiter, other servers' and customers' eyes, and the tables in your section.`,
      },
      {
        id: 179,
        lessonId: 13,
        type: "CURRICULUM",
        order: 130,
        imageSrc: null,
        question: `Because we all work together as teams in the tip pool, help each other at all times. Offer to assist in resetting a neighboring team's table, clear plates, run drinks, or polish bar glassware.\n\nCommunicate to your Back Waiter any needs for the second course, like share plates, marking, water service, or another round of drinks.`,
      },
      {
        id: 180,
        lessonId: 13,
        type: "SELECT",
        order: 140,
        imageSrc: null,
        question: `Why should you help other servers, even outside your own section?`,
      },
    ]);

    /**
     * ChallengeOptions - lessonId : 13
     */

    // { id: 170, lessonId: 13, type: "SELECT", order: 40, question: `What phrase should you avoid asking a table when checking on their food?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 170,
        imageSrc: "",
        correct: true,
        text: `"Are we enjoying everything?"`,
      },
      {
        challengeId: 170,
        imageSrc: "",
        correct: false,
        text: `"How is everything tasting so far?"`,
      },
      {
        challengeId: 170,
        imageSrc: "",
        correct: false,
        text: `"I told you you would like it."`,
      },
      {
        challengeId: 170,
        imageSrc: "",
        correct: false,
        text: `"Would you like more water?"`,
      },
    ]);

    // { id: 171, lessonId: 13, type: "SELECT", order: 50, question: `Within what timeframe should you check back on a table after dropping a course?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 171,
        imageSrc: "",
        correct: true,
        text: `2 bites or 2 minutes.`,
      },
      { challengeId: 171, imageSrc: "", correct: false, text: `10 minutes.` },
      {
        challengeId: 171,
        imageSrc: "",
        correct: false,
        text: `Only if the guest flags you down.`,
      },
      {
        challengeId: 171,
        imageSrc: "",
        correct: false,
        text: `2 bites or 5 minutes.`,
      },
    ]);

    // { id: 174, lessonId: 13, type: "SELECT", order: 80, question: `What modifier should be used when re-ringing a dish that needs to be redone?` },
    await db.insert(schema.challengeOptions).values([
      { challengeId: 174, imageSrc: "", correct: false, text: `Add as Entrée` },
      { challengeId: 174, imageSrc: "", correct: false, text: `More to Come` },
      { challengeId: 174, imageSrc: "", correct: true, text: `DON'T MAKE` },
      { challengeId: 174, imageSrc: "", correct: false, text: `Heck of a Rush` },
    ]);

    // { id: 177, lessonId: 13, type: "SELECT", order: 110, question: `Which side should a guest be cleared from?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 177,
        imageSrc: "",
        correct: true,
        text: `Their right-hand side, with your right hand.`,
      },
      {
        challengeId: 177,
        imageSrc: "",
        correct: false,
        text: `Their left-hand side, with your left hand.`,
      },
      {
        challengeId: 177,
        imageSrc: "",
        correct: false,
        text: `Whichever side is most convenient.`,
      },
      {
        challengeId: 177,
        imageSrc: "",
        correct: false,
        text: `It doesn't matter which side.`,
      },
    ]);

    // { id: 180, lessonId: 13, type: "SELECT", order: 140, question: `Why should you help other servers, even outside your own section?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 180,
        imageSrc: "",
        correct: true,
        text: `Because everyone works together as teams in the tip pool.`,
      },
      {
        challengeId: 180,
        imageSrc: "",
        correct: false,
        text: `You're only required to help if a manager tells you to.`,
      },
      {
        challengeId: 180,
        imageSrc: "",
        correct: false,
        text: `You shouldn't, it's everyone for themselves out there.`,
      },
      {
        challengeId: 180,
        imageSrc: "",
        correct: false,
        text: `Only if you have nothing else to do.`,
      },
    ]);

    /**
     * Course id - 2: Front Waiter - Steps of Service
     * Unit id - 2: Front Waiter - Steps of Service
     * Lesson id - 14: Second Course
     */
    await db.insert(schema.challenges).values([
      {
        id: 181,
        lessonId: 14,
        type: "CURRICULUM",
        order: 10,
        imageSrc: null,
        question: `Check beverage levels, refill waters and iced tea, pour wine, and offer more drinks. Confirm the table is marked and ready for the next course. This is also the time to offer the next round or bottle of wine before the entrées hit the table. Manicure the table, removing anything unnecessary.`,
      },
      {
        id: 182,
        lessonId: 14,
        type: "CURRICULUM",
        order: 20,
        imageSrc: null,
        question: `Throughout the meal, let guests know what's happening. Being proactive when addressing a guest's discomfort is always best. Often, simply acknowledging a problem or letting the guest know steps are being taken to resolve it is all it takes. People want to feel taken care of, not overlooked.`,
      },
      {
        id: 183,
        lessonId: 14,
        type: "CURRICULUM",
        order: 30,
        imageSrc: null,
        question: `If a guest seems stressed or upset at any time, let a manager know immediately. Moments matter when guests' perceptions are involved; this may be the difference between recovery or failure in service.`,
      },
      {
        id: 184,
        lessonId: 14,
        type: "SELECT",
        order: 40,
        imageSrc: null,
        question: `What should you do if a guest seems stressed or upset?`,
      },
      {
        id: 185,
        lessonId: 14,
        type: "CURRICULUM",
        order: 50,
        imageSrc: null,
        question: `Serve the second course: women first if possible, placing plates discreetly from the left side with your left hand. Always announce the dish you're presenting. Know where you're going, know your seat numbers, and do NOT auction off food at the table.\n\nWatch your elbows. Do not lean over the table, avoid reaching in front of a guest whenever possible, and excuse your reach if you can't avoid it. When possible, drop entrées and large format items before sides.`,
      },
      {
        id: 186,
        lessonId: 14,
        type: "CURRICULUM",
        order: 60,
        imageSrc: null,
        question: `When dropping food, always place the protein toward the guest and say the name of the dish. For example, if a Duck Confit is ordered, twist the plate so the bone is in the 12 o'clock position.`,
      },
      {
        id: 187,
        lessonId: 14,
        type: "SELECT",
        order: 70,
        imageSrc: null,
        question: `Where should the bone be positioned when serving the Duck Confit?`,
      },
      {
        id: 188,
        lessonId: 14,
        type: "CURRICULUM",
        order: 80,
        imageSrc: null,
        question: `Manicure the table after putting plates down, keeping everything as neat as possible.`,
      },
      {
        id: 189,
        lessonId: 14,
        type: "CURRICULUM",
        order: 90,
        imageSrc: null,
        question: `Check back with guests within 2 bites or 2 minutes to make sure they're satisfied. What is your reading of the table? Are the guests involved in conversation? Can this QC be accomplished by simply topping off drinks and making eye contact with each guest? Do they want engagement?`,
      },
      {
        id: 190,
        lessonId: 14,
        type: "SELECT",
        order: 100,
        imageSrc: null,
        question: `How can a QC check sometimes be accomplished without directly interrupting the table?`,
      },
      {
        id: 191,
        lessonId: 14,
        type: "CURRICULUM",
        order: 110,
        imageSrc: null,
        question: `Clear the second course, removing everything but unfinished drinks.`,
      },
      {
        id: 192,
        lessonId: 14,
        type: "CURRICULUM",
        order: 120,
        imageSrc: null,
        question: `The table should be crumbed and cleaned. Just like at the start of the meal, we never drop menus on a dirty table. Communicate to your Back Waiter that the table is ready for dessert menus.`,
      },
      {
        id: 193,
        lessonId: 14,
        type: "SELECT",
        order: 130,
        imageSrc: null,
        question: `What should never happen before dessert menus are dropped on the table?`,
      },
    ]);

    /**
     * ChallengeOptions - lessonId : 14
     */

    // { id: 184, lessonId: 14, type: "SELECT", order: 40, question: `What should you do if a guest seems stressed or upset?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 184,
        imageSrc: "",
        correct: false,
        text: `Ignore it, peoples' problems are their own.`,
      },
      {
        challengeId: 184,
        imageSrc: "",
        correct: true,
        text: `Let a manager know immediately.`,
      },
      {
        challengeId: 184,
        imageSrc: "",
        correct: false,
        text: `Wait until the end of the meal to mention it.`,
      },
      {
        challengeId: 184,
        imageSrc: "",
        correct: false,
        text: `Ask them directly what's wrong in front of the whole table.`,
      },
    ]);

    // { id: 187, lessonId: 14, type: "SELECT", order: 70, question: `Where should the bone be positioned when serving Duck Confit?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 187,
        imageSrc: "",
        correct: false,
        text: `6 o'clock position.`,
      },
      {
        challengeId: 187,
        imageSrc: "",
        correct: false,
        text: `3 o'clock position.`,
      },
      {
        challengeId: 187,
        imageSrc: "",
        correct: true,
        text: `12 o'clock position.`,
      },
      {
        challengeId: 187,
        imageSrc: "",
        correct: false,
        text: `It depends on whether the guest is left or right handed.`,
      },
    ]);

    // { id: 190, lessonId: 14, type: "SELECT", order: 100, question: `How can a QC check sometimes be accomplished without directly interrupting the table?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 190,
        imageSrc: "",
        correct: false,
        text: `By asking loudly if everyone is doing okay.`,
      },
      {
        challengeId: 190,
        imageSrc: "",
        correct: false,
        text: `You should always interrupt directly to ask.`,
      },
      {
        challengeId: 190,
        imageSrc: "",
        correct: false,
        text: `By having a manager come check on the table instead.`,
      },
      {
        challengeId: 190,
        imageSrc: "",
        correct: true,
        text: `By topping off drinks and making eye contact.`,
      },
    ]);

    // { id: 193, lessonId: 14, type: "SELECT", order: 130, question: `What should never happen before dessert menus are dropped on the table?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 193,
        imageSrc: "",
        correct: true,
        text: `Dropping menus on a dirty table.`,
      },
      {
        challengeId: 193,
        imageSrc: "",
        correct: false,
        text: `Clearing the second course.`,
      },
      {
        challengeId: 193,
        imageSrc: "",
        correct: false,
        text: `Communicating with your Back Waiter.`,
      },
      {
        challengeId: 193,
        imageSrc: "",
        correct: false,
        text: `Crumbing the table.`,
      },
    ]);

    /**
     * Course id - 2: Front Waiter - Steps of Service
     * Unit id - 2: Front Waiter - Steps of Service
     * Lesson id - 15: Serving Dessert
     */
    await db.insert(schema.challenges).values([
      {
        id: 194,
        lessonId: 15,
        type: "CURRICULUM",
        order: 10,
        imageSrc: null,
        question: `A dessert order being taken is communicated non-verbally, through several cues: the Salt and Pepper shakers have been removed from the table, dessert menus are no longer on the table, and silverware is pre-set on the table. Talk to each other on the team, and verify that a dessert order is in Toast.`,
      },
      {
        id: 195,
        lessonId: 15,
        type: "SELECT",
        order: 20,
        imageSrc: null,
        question: `Which of the following is a non-verbal cue that a dessert order has been taken?`,
      },
      {
        id: 196,
        lessonId: 15,
        type: "CURRICULUM",
        order: 30,
        imageSrc: null,
        question: `The Front or Back Waiter can take the coffee or dessert order, and should prepare the table for dessert or coffee with the proper silverware, share plates, and/or sugar caddy.`,
      },
      {
        id: 197,
        lessonId: 15,
        type: "CURRICULUM",
        order: 40,
        imageSrc: null,
        question: `Serve dessert from the guest's left with your left hand, announcing it when dropping. Check back with your guest within 2 bites or 2 minutes.`,
      },
      {
        id: 198,
        lessonId: 15,
        type: "CURRICULUM",
        order: 50,
        imageSrc: null,
        question: `Print the check. Have it ready, and carry it on you.`,
      },
      {
        id: 199,
        lessonId: 15,
        type: "SELECT",
        order: 60,
        imageSrc: null,
        question: `Within what timeframe should you check back with a guest after dropping dessert?`,
      },
      {
        id: 200,
        lessonId: 15,
        type: "CURRICULUM",
        order: 70,
        imageSrc: null,
        question: `Help your Back Waiter clear desserts, removing all dishes, unused glasses, and napkins placed on the table. Do not let half-finished desserts sit for 5 minutes. Good eye contact will let you know when they're ready for the check, if they need more coffee, or if they're ready for the dessert to be cleared.`,
      },
      {
        id: 201,
        lessonId: 15,
        type: "CURRICULUM",
        order: 80,
        imageSrc: null,
        question: `Present the check: "Please let me know if there's anything else I can do for you."`,
      },
      {
        id: 202,
        lessonId: 15,
        type: "CURRICULUM",
        order: 90,
        imageSrc: null,
        question: `Process credit cards immediately after collecting, bringing the check straight back to the table. Thank your guest and smile. Always make eye contact with the guest when picking up and dropping off payment. Thanking them by last name is the best way to personalize the close of their dining experience.`,
      },
      {
        id: 203,
        lessonId: 15,
        type: "SELECT",
        order: 100,
        imageSrc: null,
        question: `What is the best way to personalize the close of a guest's dining experience?`,
      },
      {
        id: 204,
        lessonId: 15,
        type: "CURRICULUM",
        order: 110,
        imageSrc: null,
        question: `Collect the check presenter before the guests leave the table. It is your responsibility to obtain correct and full payment for every table.`,
      },
      {
        id: 205,
        lessonId: 15,
        type: "CURRICULUM",
        order: 120,
        imageSrc: null,
        question: `Never question a guest's tip amount, such as "Was service okay, because you only left 10%?" This is grounds for immediate dismissal. We all know how difficult it can be to get stiffed on a big table, but we have to take the 10% along with the 30% tips. It's the nature of the business we're in.`,
      },
      {
        id: 206,
        lessonId: 15,
        type: "SELECT",
        order: 130,
        imageSrc: null,
        question: `What happens if you question a guest's tip amount?`,
      },
      {
        id: 207,
        lessonId: 15,
        type: "CURRICULUM",
        order: 140,
        imageSrc: null,
        question: `Keep refilling water as long as guests are still seated. If they refuse water service, remove the empty glasses.`,
      },
      {
        id: 208,
        lessonId: 15,
        type: "CURRICULUM",
        order: 150,
        imageSrc: null,
        question: `Thank guests as they are leaving. Let the floater know and immediately clean the table properly and reset it within 3 minutes. Trays are never set on the table or on a chair. The Back Waiter should continue performing all side-work while tables remain in your section.\n\nThe Front Waiter should stay on the floor until all tables in their section are finished.`,
      },
      {
        id: 209,
        lessonId: 15,
        type: "SELECT",
        order: 160,
        imageSrc: null,
        question: `How many minutes should it take to reset a table after guests leave?`,
      },
    ]);

    /**
     * ChallengeOptions - lessonId : 15
     */

    // { id: 195, lessonId: 15, type: "SELECT", order: 20, question: `Which of the following is a non-verbal cue that a dessert order has been taken?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 195,
        imageSrc: "",
        correct: false,
        text: `The guest smiling at you.`,
      },
      {
        challengeId: 195,
        imageSrc: "",
        correct: true,
        text: `Salt and Pepper shakers have been removed from the table.`,
      },
      {
        challengeId: 195,
        imageSrc: "",
        correct: false,
        text: `The table asking for the check.`,
      },
      {
        challengeId: 195,
        imageSrc: "",
        correct: false,
        text: `The table ordering more wine.`,
      },
    ]);

    // { id: 199, lessonId: 15, type: "SELECT", order: 60, question: `Within what timeframe should you check back with a guest after dropping dessert?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 199,
        imageSrc: "",
        correct: true,
        text: `2 bites or 2 minutes.`,
      },
      { challengeId: 199, imageSrc: "", correct: false, text: `10 minutes.` },
      {
        challengeId: 199,
        imageSrc: "",
        correct: false,
        text: `Only when they ask for the check.`,
      },
      {
        challengeId: 199,
        imageSrc: "",
        correct: false,
        text: `You don't need to check back after dessert.`,
      },
    ]);

    // { id: 203, lessonId: 15, type: "SELECT", order: 100, question: `What is the best way to personalize the close of a guest's dining experience?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 203,
        imageSrc: "",
        correct: false,
        text: `Giving them a free dessert.`,
      },
      {
        challengeId: 203,
        imageSrc: "",
        correct: true,
        text: `Thanking them by their last name.`,
      },
      {
        challengeId: 203,
        imageSrc: "",
        correct: false,
        text: `Asking them if they'd like a around of shots.`,
      },
      {
        challengeId: 203,
        imageSrc: "",
        correct: false,
        text: `Telling them we really need them to leave now so we can seat the next table.`,
      },
    ]);

    // { id: 206, lessonId: 15, type: "SELECT", order: 130, question: `What happens if you question a guest's tip amount?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 206,
        imageSrc: "",
        correct: true,
        text: `It is grounds for immediate dismissal.`,
      },
      {
        challengeId: 206,
        imageSrc: "",
        correct: false,
        text: `You'll receive a formal warning.`,
      },
      {
        challengeId: 206,
        imageSrc: "",
        correct: false,
        text: `Nothing, it's a totally acceptable thing to ask.`,
      },
      {
        challengeId: 206,
        imageSrc: "",
        correct: false,
        text: `You'll need to split the tip with a manager so you don't get written up.`,
      },
    ]);

    // { id: 209, lessonId: 15, type: "SELECT", order: 160, question: `How many minutes should it take to reset a table after guests leave?` },
    await db.insert(schema.challengeOptions).values([
      { challengeId: 209, imageSrc: "", correct: false, text: `1 minute.` },
      { challengeId: 209, imageSrc: "", correct: false, text: `5 minutes.` },
      {
        challengeId: 209,
        imageSrc: "",
        correct: false,
        text: `15 minutes, no rush.`,
      },
      { challengeId: 209, imageSrc: "", correct: true, text: `3 minutes.` },
    ]);

    /**
     * Course id - 2: Front Waiter - Steps of Service
     * Unit id - 2: Front Waiter - Steps of Service
     * Lesson id - 16: Critical Points of Service
     */
    await db.insert(schema.challenges).values([
      {
        id: 210,
        lessonId: 16,
        type: "CURRICULUM",
        order: 10,
        imageSrc: null,
        question: `Perception of time is not linear. It is very subjective, and dependent on mood. What may feel like a painful twenty minutes waiting for a movie line, a lecture, or a glass of water may have only actually been three minutes.\n\nThere are regular moments during a meal where the server's sensitivity to a guest's subjective sense of time is crucial. People who happily spend three hours at a table will grow impatient and seemingly irrational having to wait three minutes for water they requested.`,
      },
      {
        id: 220,
        lessonId: 16,
        type: "CURRICULUM",
        order: 11,
        imageSrc: null,
        question: `There are regular moments during a meal where the server's sensitivity to a guest's subjective sense of time is crucial. People who happily spend three hours at a table will grow impatient and seemingly irrational having to wait three minutes for water they requested.`,
      },
      {
        id: 211,
        lessonId: 16,
        type: "CURRICULUM",
        order: 20,
        imageSrc: null,
        question: `These are some critical points of service where skewed perceptions of time most commonly occur:\n\nAs soon as the guest has been seated\nWhen a course is finished and they have dirty dishes in front of them\nWhen beverage levels are low; when food is taking an inordinate amount of time\nWhen a guest is alone\nAfter a guest has requested something in particular\nWhen guests have their kids with them\nWhen a guest is waiting for their check and change.`,
      },
      {
        id: 212,
        lessonId: 16,
        type: "SELECT",
        order: 30,
        imageSrc: null,
        question: `Why is it important to recognize critical points of service?`,
      },
      {
        id: 213,
        lessonId: 16,
        type: "SELECT",
        order: 40,
        imageSrc: null,
        question: `Which of the following is an example of a critical point of service?`,
      },
      {
        id: 214,
        lessonId: 16,
        type: "CURRICULUM",
        order: 50,
        imageSrc: null,
        question: `Because these are times when the guest is particularly sensitive to their needs, it is important for the server to be aware of these critical points and read body language. Service that might otherwise be excellent may be perceived as slow, inattentive, or even incompetent if we do not pay extra attention at these critical times.`,
      },
    ]);

    /**
     * ChallengeOptions - lessonId : 16
     */

    // { id: 212, lessonId: 16, type: "SELECT", order: 30, question: `Why is it important to recognize critical points of service?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 212,
        imageSrc: "",
        correct: true,
        text: `Because a guest's perception of time is subjective, and skewed perceptions happen most easily at these moments.`,
      },
      {
        challengeId: 212,
        imageSrc: "",
        correct: false,
        text: `Because guests are always right, regardless of the situation.`,
      },
      {
        challengeId: 212,
        imageSrc: "",
        correct: false,
        text: `Because it determines how much a guest should tip.`,
      },
      {
        challengeId: 212,
        imageSrc: "",
        correct: false,
        text: `Because every guest is important.`,
      },
    ]);

    // { id: 213, lessonId: 16, type: "SELECT", order: 40, question: `Which of the following is an example of a critical point of service?` },
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 213,
        imageSrc: "",
        correct: false,
        text: `When the guest is actively eating a course.`,
      },
      {
        challengeId: 213,
        imageSrc: "",
        correct: false,
        text: `When the restaurant first opens for the day.`,
      },
      {
        challengeId: 213,
        imageSrc: "",
        correct: true,
        text: `When beverage levels are low.`,
      },
      {
        challengeId: 213,
        imageSrc: "",
        correct: false,
        text: `When they can see their server staring at their phone in the corner.`,
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

//There should be no duplicate keys for the challenge

//ChallengeOptions should correspond to the correct challenge
