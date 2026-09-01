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
        title: "Unit 1",
        description: "The Basics",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // unit 1 : The Basics
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
      {
        id: 6,
        unitId: 1, // unit 1 : The Basics
        order: 6,
        title: "Resetting the Table",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Basics
        type: "CURRICULUM",
        order: 1,
        question:
          "The hospitality we strive to provide is welcoming guests into our own home for a dinner party. Our style is familial but always professional. We greet everyone with a smile and never let anyone walk out without a warm goodbye! Everything we do is aimed at making our guests feel welcome, comfortable, and well cared for. We create the atmosphere with the music we play, how the restaurant is set up and presented, how sharp the team looks, and with decadent smells wafting from the kitchen. Coming to work each day is an opportunity to leave the stress of our personal lives at the door and enter the stage, which is our dining room! We, as hosts, set the tone of the party. It’s much easier for everyone to have a good time if it looks like we are.",
      },
      {
        id: 2,
        lessonId: 1, // Basics
        type: "SELECT",
        order: 2,
        question: "Upon seating, how soon should a table be greeted?",
      },
      {
        id: 3,
        lessonId: 1, // Basics
        type: "SELECT",
        order: 3,
        question: "What are our water options?",
      },
      {
        id: 4,
        lessonId: 1, // Basics
        type: "SELECT",
        order: 4,
        question:
          "Who is responsible for marking the table for the first course?",
      },
    ]);
    //'Upon seating, how soon should a table be greeted?'
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        imageSrc: "",
        correct: true,
        text: "60 seconds",
      },
      {
        challengeId: 2,
        imageSrc: "",
        correct: false,
        text: "30 seconds",
      },
      {
        challengeId: 2,
        imageSrc: "",
        correct: false,
        text: "2 minutes",
      },
      {
        challengeId: 2,
        imageSrc: "",
        correct: false,
        text: "45 minutes",
      },
    ]);
    //'What are our water options?'
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        imageSrc: "",
        correct: false,
        text: "Tap water and Mountain Valley.",
      },
      {
        challengeId: 3,
        imageSrc: "",
        correct: false,
        text: "The water is bad here, order a cocktail or wine.",
      },
      {
        challengeId: 3,
        imageSrc: "",
        correct: true,
        text: 'sparking, still, or ice water. Never say "tap" water to a guest',
      },
      {
        challengeId: 3,
        imageSrc: "",
        correct: false,
        text: "We don't offer water.",
      },
    ]);

    //'Who is responsible for marking the table for the first course'
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 4,
        imageSrc: "",
        correct: false,
        text: "The back waiter",
      },
      {
        challengeId: 4,
        imageSrc: "",
        correct: false,
        text: "The guests can grab their own utensils and share plates from the girdon",
      },
      {
        challengeId: 4,
        imageSrc: "",
        correct: false,
        text: "There is no need to mark the table for the first course, it is already set up.",
      },
      {
        challengeId: 4,
        imageSrc: "",
        correct: true,
        text: "The front waiter",
      },
    ]);
    //Add challenges for lesson 2
    await db.insert(schema.challenges).values([
      {
        id: 5,
        lessonId: 2, // Basics
        type: "SELECT",
        order: 1,
        question: "Upon seating, how soon should a table be greeted lesson2?",
      },
      {
        id: 6,
        lessonId: 2, // Basics
        type: "SELECT",
        order: 2,
        question: "What are our water options?",
      },
      {
        id: 7,
        lessonId: 2, // Basics
        type: "SELECT",
        order: 3,
        question:
          "Who is responsible for marking the table for the first course?",
      },
    ]);

    //'Upon seating, how soon should a table be greeted?'
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 5,
        imageSrc: "",
        correct: true,
        text: "60 seconds",
      },
      {
        challengeId: 5,
        imageSrc: "",
        correct: false,
        text: "30 seconds",
      },
      {
        challengeId: 5,
        imageSrc: "",
        correct: false,
        text: "2 minutes",
      },
      {
        challengeId: 5,
        imageSrc: "",
        correct: false,
        text: "45 minutes",
      },
    ]);
    //'What are our water options?'
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 6,
        imageSrc: "",
        correct: false,
        text: "Tap water and Mountain Valley.",
      },
      {
        challengeId: 6,
        imageSrc: "",
        correct: false,
        text: "The water is bad here, order a cocktail or wine.",
      },
      {
        challengeId: 6,
        imageSrc: "",
        correct: true,
        text: 'sparking, still, or ice water. Never say "tap" water to a guest',
      },
      {
        challengeId: 6,
        imageSrc: "",
        correct: false,
        text: "We don't offer water.",
      },
    ]);

    //'Who is responsible for marking the table for the first course'
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 7,
        imageSrc: "",
        correct: false,
        text: "The back waiter",
      },
      {
        challengeId: 7,
        imageSrc: "",
        correct: false,
        text: "The guests can grab their own utensils and share plates from the girdon",
      },
      {
        challengeId: 7,
        imageSrc: "",
        correct: false,
        text: "There is no need to mark the table for the first course, it is already set up.",
      },
      {
        challengeId: 7,
        imageSrc: "",
        correct: true,
        text: "The front waiter",
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
