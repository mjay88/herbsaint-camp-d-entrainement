import Image from "next/image";

type Props = {
  question: string;
};

export const CurriculumBubble = ({ question }: Props) => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center gap-x-4 mb-6">
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
      <div className="relative py-2 px-4 m-3 border-2 rounded-xl text-sm lg:text-base">
        {question}
        <div className="absolute hidden lg:block -left-6 top-1/3 w-3 h-3 border-x-[16px] border-x-transparent border-t-16 transform -translate-y-1/2 rotate-90" />
         <div className="absolute block lg:hidden -bottom-4 right-1/3 w-3 h-3 border-x-[16px] border-x-transparent border-t-16 transform -translate-x-1/2" />
      </div>
      
    </div>
  );
};