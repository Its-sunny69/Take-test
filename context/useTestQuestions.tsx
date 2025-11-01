import { useContext } from "react";
import { TestQuestionsContext } from "./TestQuestions";

export default function useTestQuestions() {
  const context = useContext(TestQuestionsContext);
  if (!context) {
    throw new Error(
      "useTestQuestions must be used within a TestQuestionsProvider"
    );
  }
  return context;
}
