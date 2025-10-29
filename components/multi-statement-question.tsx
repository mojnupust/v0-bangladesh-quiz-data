import { toBengaliNumber } from "@/lib/utils";
import Image from "next/image";
import MathParagraph from "./MathParagraph";

interface MultiStatementQuestionProps {
  questionNumber: number;
  question: string;
  statements: string[];
  questionEnd: string;
  options: string[];
  image?: string;
}

export default function MultiStatementQuestion({
  questionNumber,
  question,
  statements,
  questionEnd,
  options,
  image,
}: MultiStatementQuestionProps) {
  const optionLabels = ["ক", "খ", "গ", "ঘ"];

  return (
    <div className="mb-3 break-inside-avoid">
      <div className="flex gap-1.5">
        <span className="font-semibold font-serif text-sm shrink-0">
          {toBengaliNumber(questionNumber)}।
        </span>
        <div className="flex-1">
          <p className="font-serif text-sm leading-snug mb-1">
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
          <div className="ml-3 mb-1 space-y-0.5">
            {statements.map((statement, idx) => (
              <p key={idx} className="font-serif text-sm leading-snug">
                <MathParagraph>{statement}</MathParagraph>
              </p>
            ))}
          </div>
          <p className="font-serif text-sm mb-1.5 ml-3">{questionEnd}</p>
          <div className="space-y-0.5 ml-3">
            {options.map((option, idx) => (
              <div key={idx} className="flex gap-1.5">
                <span className="font-serif text-sm">
                  ({optionLabels[idx]})
                </span>
                <span className="font-serif text-sm">{option}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
