import Image from "next/image"
import { toBengaliNumber } from "@/lib/utils"

interface ChildQuestion {
  type: "normal" | "multiStatement"
  question: string
  options: string[]
  image?: string
  statements?: string[]
  questionEnd?: string
}

interface PassageQuestionProps {
  startNumber: number
  passage: string
  questions: ChildQuestion[]
  passageImage?: string
}

export default function PassageQuestion({ startNumber, passage, questions, passageImage }: PassageQuestionProps) {
  const optionLabels = ["ক", "খ", "গ", "ঘ"]

  return (
    <div className="mb-4 break-inside-avoid">
      {/* Passage Section */}
      <div className="bg-gray-50 border-l-2 border-gray-400 pl-3 pr-2 py-2 mb-2 print:bg-gray-100">
        <p className="font-serif text-sm leading-snug italic text-gray-800">{passage}</p>
        {passageImage && (
          <div className="mt-2">
            <Image
              src={passageImage || "/placeholder.svg"}
              alt="Passage illustration"
              width={250}
              height={150}
              className="rounded border border-gray-300"
            />
          </div>
        )}
      </div>

      {/* Child Questions */}
      <div className="space-y-2.5 ml-2">
        {questions.map((childQ, idx) => {
          const questionNum = startNumber + idx

          if (childQ.type === "multiStatement") {
            return (
              <div key={idx} className="break-inside-avoid">
                <div className="flex gap-1.5">
                  <span className="font-semibold font-serif text-sm shrink-0">{toBengaliNumber(questionNum)}।</span>
                  <div className="flex-1">
                    <p className="font-serif text-sm leading-snug mb-1">{childQ.question}</p>
                    {childQ.image && (
                      <div className="mb-2">
                        <Image
                          src={childQ.image || "/placeholder.svg"}
                          alt="Question illustration"
                          width={250}
                          height={150}
                          className="rounded border border-gray-300"
                        />
                      </div>
                    )}
                    <div className="ml-3 mb-1 space-y-0.5">
                      {childQ.statements?.map((statement, sIdx) => (
                        <p key={sIdx} className="font-serif text-sm leading-snug">
                          {statement}
                        </p>
                      ))}
                    </div>
                    {childQ.questionEnd && <p className="font-serif text-sm mb-1.5 ml-3">{childQ.questionEnd}</p>}
                    <div className="space-y-0.5 ml-3">
                      {childQ.options.map((option, oIdx) => (
                        <div key={oIdx} className="flex gap-1.5">
                          <span className="font-serif text-sm">({optionLabels[oIdx]})</span>
                          <span className="font-serif text-sm">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          // Normal child question
          return (
            <div key={idx} className="break-inside-avoid">
              <div className="flex gap-1.5">
                <span className="font-semibold font-serif text-sm shrink-0">{toBengaliNumber(questionNum)}।</span>
                <div className="flex-1">
                  <p className="font-serif text-sm leading-snug mb-1.5">{childQ.question}</p>
                  {childQ.image && (
                    <div className="mb-2">
                      <Image
                        src={childQ.image || "/placeholder.svg"}
                        alt="Question illustration"
                        width={250}
                        height={150}
                        className="rounded border border-gray-300"
                      />
                    </div>
                  )}
                  <div className="space-y-0.5 ml-3">
                    {childQ.options.map((option, oIdx) => (
                      <div key={oIdx} className="flex gap-1.5">
                        <span className="font-serif text-sm">({optionLabels[oIdx]})</span>
                        <span className="font-serif text-sm">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
