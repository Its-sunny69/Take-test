"use client";

import { createContext, ReactNode, useState } from "react";

type TestQuestionsContextType = {
  questions: string[];
  setQuestions: (questions: string[]) => void;
  time: number;
  setTime: (time: number) => void;
};

export const TestQuestionsContext = createContext<
  TestQuestionsContextType | undefined
>(undefined);

export const TestQuestionsProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [time, setTime] = useState(0);

  return (
    <TestQuestionsContext.Provider
      value={{ questions, setQuestions, time, setTime }}
    >
      {children}
    </TestQuestionsContext.Provider>
  );
};
