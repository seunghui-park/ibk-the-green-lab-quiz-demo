"use client";

import { useState, useEffect } from "react";
import IntroPage from "./components/IntroPage";
import QuizPage from "./components/QuizPage";
import ResultPage from "./components/ResultPage";
import quizData from "@/data/quiz.json";
import { trackQuizComplete, trackDropoff } from "@/lib/tracking";

type Page = "intro" | "quiz" | "result";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  // 이탈 추적
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentPage === "quiz") {
        trackDropoff("quiz", quizData.questions[currentQuestionIndex]?.id);
      } else if (currentPage === "intro") {
        trackDropoff("intro");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [currentPage, currentQuestionIndex]);

  const handleStart = () => {
    setCurrentPage("quiz");
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
  };

  const handleAnswer = (isCorrect: boolean) => {
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    // 다음 질문으로 이동 (즉시)
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 퀴즈 완료
      const finalScore = newScore;
      const tier = quizData.tiers.find(
        (t) =>
          finalScore >= t.minScore && finalScore <= t.maxScore
      ) || quizData.tiers[0];

      trackQuizComplete(finalScore, tier.name);
      setCurrentPage("result");
    }
  };

  const getCurrentTier = () => {
    return (
      quizData.tiers.find(
        (t) => score >= t.minScore && score <= t.maxScore
      ) || quizData.tiers[0]
    );
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#A3D47F",
        background: "#A3D47F",
      }}
    >
      {currentPage === "intro" && <IntroPage onStart={handleStart} />}
      {currentPage === "quiz" && (
        <QuizPage
          question={quizData.questions[currentQuestionIndex]}
          currentIndex={currentQuestionIndex + 1}
          totalQuestions={quizData.questions.length}
          onAnswer={handleAnswer}
        />
      )}
      {currentPage === "result" && (
        <ResultPage
          score={score}
          tier={getCurrentTier()}
          couponCode={quizData.coupon.code}
        />
      )}
    </div>
  );
}
