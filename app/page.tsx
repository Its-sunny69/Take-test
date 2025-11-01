"use client";

import useTestQuestions from "@/context/useTestQuestions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [testQuestions, setTestQuestions] = useState<string[]>([]);
  const [testTime, setTestTime] = useState(1);
  const [warning, setWarning] = useState("");
  const { setQuestions, setTime } = useTestQuestions();

  const handleQuestionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    const questionsArray = value
      .split(",")
      .map((q) => q.trim())
      .filter(Boolean);
    setTestQuestions(questionsArray);

    if (questionsArray.length > 0) setWarning("");
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    setTestTime(value);
  };

  const handleclick = () => {
    if (testQuestions.length === 0) {
      setWarning("Please enter at least one question.");
      return;
    }

    setWarning("");
    setQuestions(testQuestions);
    setTime(testTime);
    router.push("/taketest");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <h1 className="text-6xl font-bold mb-4">Take Test</h1>

      <div className="border p-4 grid md:grid-cols-6 gap-4">
        <div className="md:col-span-4">
          <p>Please enter the questions or words.</p>
          <textarea
            className="border-zinc-50 border min-h-28 max-h-56 mt-8 w-full p-2"
            placeholder="kind,good,rich..."
            onChange={handleQuestionsChange}
          />
          {warning && <div className="text-red-500 mt-2">{warning}</div>}
        </div>

        <div className="md:col-span-2">
          <p>Please enter time. (in seconds)</p>
          <input
            type="number"
            className="border-zinc-50 border mt-8 w-full p-2"
            placeholder="1,2,3..."
            min="1"
            defaultValue={1}
            onChange={handleTimeChange}
          />
        </div>

        <div className="flex justify-end md:col-span-6 mt-4">
          <button
            className="border-zinc-50 border py-1 px-3 hover:cursor-pointer"
            onClick={handleclick}
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}
