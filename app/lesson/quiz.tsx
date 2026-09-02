"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useEffect, useState, useTransition } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { ResultCard } from "./result-card";
import { Challenge } from "./challenge";
import { QuestionBubble } from "./question-bubble";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useWindowSize, useMount } from "react-use";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import Image from "next/image";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";
import { CurriculumBubble } from "./curriculum-bubble";

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
};
//TODO: quiz is not remounting, so challenges stays undefined. Double check actions, the come up with a way to make Quiz re-mount when the "Continue" button is clicked from footer
export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
}: Props) => {
  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();
  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

  const { width, height } = useWindowSize();

  const router = useRouter();

  const [finishAudio, _f, finishControls] = useAudio({ src: "/finish.mp3" });

  const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });
  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: "/incorrect.wav",
  });

  const [pending, startTransition] = useTransition();
  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed,
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const challenge = challenges[activeIndex];
  const isCurriculum = challenge?.type === "CURRICULUM";
  const options = challenge?.challengeOptions ?? [];

  useEffect(() => {
    if (!challenge) {
      finishControls.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge]);

  const onNext = () => {
    //if Footer button is "Continue", need to revalidate challenges or remount quiz so second lesson also isn't completed
    setActiveIndex((current) => current + 1);
  };

  const onSelect = (id: number) => {
    if (status !== "none") return;

    setSelectedOption(id);
  };
  //TODO: Need to add logic of "CIRRICULUM", which will allow next/continue

  const onContinue = () => {
    //after the last challenge for the last lesson has been completed
     if(!challenge){
      console.log("FIRING LAST CHALLENGE OF LAST LESSON COMPLETE************")
       return;
     }

     if (challenge.type === "CURRICULUM") {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            onNext(); //TODO: see if order of this matters
            setPercentage((prev) => prev + 100 / challenges.length);
            setStatus("none");
            setSelectedOption(undefined);
          })
          .catch(() => toast.error("Something went wrong. Please try again."));
      });
      return
    }

    if (!selectedOption) return; 
    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }
    //after selection
    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.correct);

    if (!correctOption) {
      return;
    }
    //TODO CURRICULUM: add case for curriculum if challenge.type === curriculum, save progress
    //handle status actions
    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            correctControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            //For practice
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."));
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }
            incorrectControls.play();
            setStatus("wrong");

            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again"));
      });
    }
  };

 

  if (!challenge) {
    return (
      <>
        {finishAudio}
        {correctAudio}
        {incorrectAudio}
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
            Great job! <br /> You&apos;ve completed the lesson.
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="hearts" value={hearts} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push("/learn")}
        />
      </>
    );
  }

   if (challenge.type === "CURRICULUM") {
    return (
      <>
        {finishAudio}
        {correctAudio}
        {incorrectAudio}
        <div className="flex gap-y-4 lg:gap-y-4 lg:max-w-4xl mx-auto text-center items-center justify-center h-full">
          <CurriculumBubble question={challenge.question} />
        </div>
        <Footer
          disabled={!isCurriculum}
          status={status}
          onCheck={onContinue}
          isCurriculum={isCurriculum}
        />
        ;
      </>
    );
  } 
  {
    /* TODO CURRICULUM: if type === CURRICULUM don't need to render challenge*/
  }

  const title =
    challenge.type === "ASSIST" ? "Select the best option" : challenge.question;

  return (
    <>
      {finishAudio}
      {incorrectAudio}
      {correctAudio}
      <Header hearts={hearts} percentage={percentage} />
      <div className="flex-1 mb-4">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>

            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
        isCurriculum={isCurriculum}
      />
    </>
  );
};
