import { toBengaliNumber } from "@/lib/utils";
import Image from "next/image";
import MathParagraph from "./MathParagraph";

interface NormalQuestionProps {
  questionNumber: number;
  question: string;
  options: string[];
  image?: string;
}

export default function NormalQuestion({
  questionNumber,
  question,
  options,
  image,
}: NormalQuestionProps) {
  const optionLabels = ["ক", "খ", "গ", "ঘ"];

  return (
    <div className="mb-3 break-inside-avoid">
      <div className="flex gap-1.5">
        <span className="font-semibold font-serif text-sm shrink-0">
          {toBengaliNumber(questionNumber)}।
        </span>
        <div className="flex-1">
          <p className="font-serif text-sm leading-snug mb-1.5">
            <MathParagraph>{question}</MathParagraph>
          </p>
          {image && (
            <div className="mb-2">
              <Image
                src={image || "/placeholder.svg"}
                alt="Question illustration"
                width={250}
                height={150}
                className="rounded border border-gray-300"
              />
            </div>
          )}
          <div className="space-y-0.5 ml-3">
            {options.map((option, idx) => (
              <div key={idx} className="flex gap-1.5">
                <span className="font-serif text-sm">
                  ({optionLabels[idx]})
                </span>
                <span className="font-serif text-sm">
                  <MathParagraph>{option}</MathParagraph>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
