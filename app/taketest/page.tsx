"use client";

import useTestQuestions from "@/context/useTestQuestions";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TakeTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [end, setEnd] = useState(false);
  const { questions, time } = useTestQuestions();

  useEffect(() => {
    if (questions.length === 0 || time <= 0) return;

    const interval = setInterval(() => {
      setCurrentQuestionIndex((prevIndex) => {
        if (prevIndex < questions.length - 1) {
          return prevIndex + 1;
        } else {
          clearInterval(interval);
          setEnd(true);
          return prevIndex;
        }
      });
    }, time * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <div className="border border-zinc-50 p-4 w-[90%] md:w-[50%] mb-2">
        {questions.length !== 0 ? currentQuestionIndex + 1 : 0}/
        {questions.length}
      </div>

      <div className="border border-zinc-50 h-52 w-[90%] md:w-[50%] flex items-center justify-center text-3xl">
        {questions.length === 0 ? (
          <div className="text-center">
            <p>No questions available.</p>

            <Link
              href="/"
              className="text-base border border-zinc-50 p-2 mt-4 inline-block"
            >
              Go Back Home
            </Link>
          </div>
        ) : (
          <>
            {!end ? (
              <p>{questions[currentQuestionIndex]}</p>
            ) : (
              <div className="text-center">
                <p>Test Ended</p>

                <Link
                  href="/"
                  className="text-base border border-zinc-50 p-2 mt-4 inline-block"
                >
                  Go Back Home
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
