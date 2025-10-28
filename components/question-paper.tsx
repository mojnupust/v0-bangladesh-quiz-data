"use client"

import { useState } from "react"
import NormalQuestion from "./normal-question"
import PassageQuestion from "./passage-question"
import MultiStatementQuestion from "./multi-statement-question"
import { rawQuestions } from "@/lib/questions-data"
import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

export default function QuestionPaper() {
  const [mainTitle, setMainTitle] = useState("রসায়ন সাজেসন্স")
  const [subtitle, setSubtitle] = useState("বহুনির্বাচনি প্রশ্ন")
  const [chapter, setChapter] = useState("অধ্যায় ৩ - পরমাণুর গঠন")

  const handlePrint = () => {
    window.print()
  }

  let questionNumber = 1

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      {/* Print Button - Hidden during print */}
      <div className="print:hidden py-6 flex justify-center">
        <Button onClick={handlePrint} size="lg" className="gap-2">
          <Printer className="w-5 h-5" />
          প্রশ্নপত্র প্রিন্ট করুন
        </Button>
      </div>

      {/* Question Paper Container */}
      <div className="max-w-[210mm] mx-auto bg-white shadow-lg print:shadow-none print:max-w-full">
        <div className="text-center pt-8 pb-4 px-8 border-b border-gray-300">
          <h1 className="text-2xl font-bold mb-2">{mainTitle}</h1>
          <p className="text-lg font-semibold mb-1">{subtitle}</p>
          <p className="text-base text-gray-700">{chapter}</p>
        </div>

        {/* Questions Section */}
        <div className="px-8 py-6 print:px-10 print:py-8">
          <div className="question-columns">
            {rawQuestions.map((item, index) => {
              if (item.type === "normal") {
                const currentNumber = questionNumber++
                return (
                  <NormalQuestion
                    key={index}
                    questionNumber={currentNumber}
                    question={item.question}
                    options={item.options}
                    image={item.image}
                  />
                )
              } else if (item.type === "passage") {
                const startNumber = questionNumber
                questionNumber += item.questions.length
                return (
                  <PassageQuestion
                    key={index}
                    startNumber={startNumber}
                    passage={item.passage}
                    questions={item.questions}
                    passageImage={item.image}
                  />
                )
              } else if (item.type === "multiStatement") {
                const currentNumber = questionNumber++
                return (
                  <MultiStatementQuestion
                    key={index}
                    questionNumber={currentNumber}
                    question={item.question}
                    statements={item.statements}
                    questionEnd={item.questionEnd}
                    options={item.options}
                    image={item.image}
                  />
                )
              }
              return null
            })}
          </div>
        </div>

        <div className="border-t border-gray-300 px-8 py-4 text-center text-sm">
          <p className="font-semibold mb-1">প্রস্তুতকারক: মজনু মিয়া</p>
          <p className="text-gray-700 mb-1">কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং বিভাগ, পাবনা বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়</p>
          <p className="text-gray-600">Phone: 01788262433 | Email: mojnu.cse@pust.ac.bd</p>
        </div>
      </div>
    </div>
  )
}
