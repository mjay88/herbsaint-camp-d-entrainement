import Image from "next/image";

type Props = {
  question: string;
  imageSrc: string | null;
};

export const CurriculumBubble = ({ question, imageSrc }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-evenly gap-y-10 gap-x-4 mb-6">
      {imageSrc ? (
        <>
        <Image
          src={`/desserts/banana-brown-butter-tart.svg`}
          alt="Mascot"
          height={300}
          width={300}
          className="hidden lg:block"
          />
          <Image
          src={`/desserts/banana-brown-butter-tart.svg`}
          alt="Mascot"
          height={200}
          width={200}
        className="block lg:hidden"
          />
      
          </>
      ) : (
        <>
          <Image
            src="/mascot.svg"
            alt="Mascot"
            height={300}
            width={300}
            className="hidden lg:block"
          />
          <Image
            src="/mascot.svg"
            alt="Mascot"
            height={150}
            width={150}
            className="block lg:hidden"
          />
        </>
      )}

      <div className="relative py-2 px-4 m-3 border-2 rounded-xl text-sm lg:text-base text-left  whitespace-pre-line">
        {question}
        {!imageSrc && (
          <>
            <div className="absolute hidden lg:block -left-6 top-1/3 w-3 h-3 border-x-[16px] border-x-transparent border-t-16 transform -translate-y-1/2 rotate-90" />
            <div className="absolute block lg:hidden -bottom-4 right-1/3 w-3 h-3 border-x-[16px] border-x-transparent border-t-16 transform -translate-x-1/2" />
          </>
        )}
      </div>
     
    </div>
  );
};
