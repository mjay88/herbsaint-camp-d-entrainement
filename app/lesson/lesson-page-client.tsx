"use client";

import {
  challengeOptions,
  challenges,
  lessons,
  userProgress,
} from "@/db/schema";

import { Quiz } from "./quiz";
import { redirect } from "next/navigation";
import { ResultCard } from "./result-card";
import { Footer } from "./footer";
import Image from "next/image";
import Confetti from "react-confetti";
import { useAudio, useWindowSize } from "react-use";
import { useEffect } from "react";

type Props = {
  lesson:
    | (typeof lessons.$inferSelect & {
        challenges: (typeof challenges.$inferSelect & {
          completed: boolean;
          challengeOptions: (typeof challengeOptions.$inferSelect)[];
        })[];
      })
    | null;
  userProgress: typeof userProgress.$inferSelect | null;
};
/**
 * LessonPageClient was created to handle the case where there are no more lessons. 
 * LessonPage was redirecting to /learn if there were no lessons or no userProgress found
 * skipping the Confetti screen. Confetti and hooks could not be called from LessonPage, 
 * so I needed to add a "use client" wrapper  
 */
const LessonPageClient = ({ lesson, userProgress }: Props) => {
  const { width, height } = useWindowSize();

  const [finishAudio, _f, finishControls] = useAudio({ src: "/finish.mp3" });

  useEffect(() => {
    if (!lesson || !userProgress) {
      finishControls.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson, userProgress]);

  if (!lesson || !userProgress) {
    return (
      <>
        {finishAudio}

        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            src="/finish.svg"
            alt="Finish"
            className="hidden lg:block"
            height={100}
            width={100}
          />
          <Image
            src="/finish.svg"
            alt="Finish"
            className="block lg:hidden"
            height={50}
            width={50}
          />
          <h1 className="text-xl leg:text-3xl font-bold text-neutral-700">
            Great job! <br /> You&apos;ve completed all the lessons.
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard variant="points" value={userProgress?.points} />
            <ResultCard variant="hearts" value={userProgress?.hearts} />
          </div>
        </div>
        <Footer status="completed" onCheck={() => redirect("/learn")} />
      </>
    );
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <>
      {finishAudio}
      <Quiz
        initialLessonId={lesson.id}
        initialLessonChallenges={lesson?.challenges}
        initialHearts={userProgress?.hearts}
        initialPercentage={initialPercentage}
      />
    </>
  );
};

export default LessonPageClient;
