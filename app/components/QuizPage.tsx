"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Progress from "@/components/Progress";
import { trackQuizAnswer } from "@/lib/tracking";

interface Option {
  id: string;
  text: string;
  correct: boolean;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
  explanation: string;
}

interface QuizPageProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuizPage({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
}: QuizPageProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shake, setShake] = useState(false);
  const [pop, setPop] = useState(false);

  // 질문이 변경될 때 상태 리셋
  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setShake(false);
    setPop(false);
  }, [question.id]);

  const handleOptionClick = (optionId: string, correct: boolean) => {
    if (selectedOption) return; // 이미 선택된 경우 무시

    setSelectedOption(optionId);
    setIsCorrect(correct);
    setShowFeedback(true);

    // 이벤트 트래킹
    trackQuizAnswer(question.id, optionId, correct);

    // 애니메이션
    if (correct) {
      setPop(true);
      // Confetti 효과 (간단한 버전)
      createConfetti();
      
      // 마지막 문제이고 정답이면 자동으로 결과 페이지로 이동
      if (currentIndex === totalQuestions) {
        setTimeout(() => {
          onAnswer(correct);
        }, 2000); // 피드백을 잠깐 보여준 후 이동
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleNext = () => {
    // 상태를 먼저 리셋하여 깜빡임 방지
    setSelectedOption(null);
    setShowFeedback(false);
    setShake(false);
    setPop(false);
    // 다음 질문으로 이동
    onAnswer(isCorrect);
  };

  const handleRetry = () => {
    // 다시 풀기 - 상태만 리셋
    setSelectedOption(null);
    setShowFeedback(false);
    setShake(false);
    setPop(false);
  };

  const createConfetti = () => {
    // 간단한 confetti 효과
    const colors = ["#1E7F4F", "#9BE7C4", "#22C55E", "#E6F4ED"];
    const emojis = ["🌿", "🌱", "🌳", "✨"];
    const confettiCount = 15;
    
    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        const isEmoji = Math.random() > 0.5;
        const useEmoji = isEmoji && i % 3 === 0; // 일부만 이모지
        
        confetti.style.position = "fixed";
        confetti.style.left = `${50 + (Math.random() - 0.5) * 40}%`;
        confetti.style.top = "40%";
        confetti.style.fontSize = useEmoji ? "24px" : "12px";
        confetti.style.width = useEmoji ? "auto" : "12px";
        confetti.style.height = useEmoji ? "auto" : "12px";
        confetti.style.backgroundColor = useEmoji
          ? "transparent"
          : colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = useEmoji ? "0" : "50%";
        confetti.style.pointerEvents = "none";
        confetti.style.zIndex = "9999";
        confetti.style.transition = "all 1.2s cubic-bezier(0.2, 1.4, 0.4, 1)";
        confetti.textContent = useEmoji
          ? emojis[Math.floor(Math.random() * emojis.length)]
          : "";
        document.body.appendChild(confetti);

        setTimeout(() => {
          const angle = (Math.random() - 0.5) * 360;
          const distance = 100 + Math.random() * 100;
          confetti.style.transform = `translate(${
            Math.cos((angle * Math.PI) / 180) * distance
          }px, ${
            Math.sin((angle * Math.PI) / 180) * distance
          }px) rotate(${angle}deg)`;
          confetti.style.opacity = "0";
          confetti.style.scale = "0";
        }, 10);

        setTimeout(() => {
          if (document.body.contains(confetti)) {
            document.body.removeChild(confetti);
          }
        }, 1200);
      }, i * 40);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        position: "relative",
        maxWidth: "500px",
        margin: "0 auto",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* 상단 캐릭터 영역 */}
      <div
        style={{
          height: showFeedback && isCorrect ? "30vh" : "50vh",
          minHeight: showFeedback && isCorrect ? "150px" : "250px",
          maxHeight: showFeedback && isCorrect ? "220px" : "350px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: showFeedback && isCorrect ? "clamp(10px, 3vh, 20px)" : "clamp(20px, 5vh, 40px)",
          paddingLeft: "var(--space-lg)",
          paddingRight: "var(--space-lg)",
          paddingBottom: 0,
          position: "relative",
          zIndex: 1,
          transition: "all 0.5s var(--motion-bounce)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "clamp(180px, 40vw, 260px)",
            height: "clamp(180px, 40vw, 260px)",
          }}
        >
          <Image
            src="/thegreenlab_character.png"
            alt="더그린랩 마스코트"
            width={260}
            height={260}
            priority
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "drop-shadow(0 8px 16px rgba(30, 127, 79, 0.2))",
            }}
          />
        </div>
      </div>

      {/* 하단 질문 카드 (캐릭터와 겹치도록) */}
      <div
        style={{
          position: "absolute",
          top: showFeedback && isCorrect ? "15vh" : "25vh",
          left: 0,
          right: 0,
          width: "100%",
          paddingLeft: "var(--space-lg)",
          paddingRight: "var(--space-lg)",
          paddingTop: "var(--space-lg)",
          paddingBottom: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-md)",
          transition: "top 0.5s var(--motion-bounce)",
        }}
      >
        {/* 퀴즈 카드 */}
        <Card
          style={{
            backgroundColor: "#FFFFFF",
            transform: pop
              ? "scale(1.02)"
              : shake
              ? "translateX(5px)"
              : "scale(1)",
            transition: "transform var(--transition-normal) var(--motion-bounce)",
            boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
          }}
        >
          {/* 진행 상태 */}
          <div style={{ marginBottom: "var(--space-md)" }}>
            <Progress current={currentIndex} total={totalQuestions} />
          </div>

          {/* Q 번호 */}
          <div
            style={{
              fontSize: "var(--font-size-subtitle)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-primary)",
              marginBottom: "var(--space-sm)",
            }}
          >
            Q{currentIndex}.
          </div>

          {/* 질문 */}
          <h2
            style={{
              fontSize: "var(--font-size-subtitle)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-text-primary)",
              marginBottom: "var(--space-lg)",
              lineHeight: "1.5",
              whiteSpace: "pre-line",
            }}
          >
            {question.question}
          </h2>

          {/* 보기 버튼들 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-sm)",
              marginTop: "var(--space-md)",
            }}
          >
            {question.options.map((option) => {
              const isSelected = selectedOption === option.id;
              const showCorrect = showFeedback && option.correct;
              const showIncorrect = showFeedback && isSelected && !option.correct;

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.id, option.correct)}
                  disabled={!!selectedOption}
                  aria-label={`${option.text} 선택`}
                  style={{
                    minHeight: "52px",
                    padding: "var(--space-md) var(--space-lg)",
                    borderRadius: "var(--radius-md)",
                    border: showCorrect
                      ? "2px solid var(--color-success)"
                      : showIncorrect
                      ? "2px solid var(--color-error)"
                      : "2px solid var(--color-primary-light)",
                    backgroundColor: showCorrect
                      ? "var(--color-primary-light)"
                      : showIncorrect
                      ? "rgba(239, 68, 68, 0.1)"
                      : "var(--color-primary-light)",
                    color: showCorrect
                      ? "var(--color-primary)"
                      : showIncorrect
                      ? "var(--color-error)"
                      : "var(--color-primary)",
                    fontSize: "var(--font-size-body)",
                    fontWeight: "var(--font-weight-medium)",
                    textAlign: "left",
                    cursor: selectedOption ? "not-allowed" : "pointer",
                    transition: "all var(--transition-normal)",
                    opacity:
                      selectedOption && !isSelected && !option.correct ? 0.5 : 1,
                    boxShadow: isSelected ? "var(--shadow-sm)" : "none",
                  }}
                >
                  {option.text}
                </button>
              );
            })}
          </div>
        </Card>

        {/* 피드백 카드 (새로운 카드) */}
        {showFeedback && (
          <Card
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
              animation: "slideUp 0.4s var(--motion-bounce)",
              marginBottom: "clamp(var(--space-lg), 5vh, var(--space-xl))",
            }}
          >
            {/* 피드백 메시지 */}
            <div
              style={{
                padding: "var(--space-md)",
                borderRadius: "var(--radius-md)",
                backgroundColor: isCorrect
                  ? "var(--color-primary-light)"
                  : "rgba(239, 68, 68, 0.1)",
                color: isCorrect ? "var(--color-primary)" : "var(--color-error)",
                marginBottom: "var(--space-md)",
                fontSize: "var(--font-size-body)",
                fontWeight: "var(--font-weight-medium)",
                textAlign: "center",
              }}
            >
              {isCorrect ? "정답! 🥳" : "아깝다…! 다음엔 맞출 수 있음 😤"}
            </div>

            {/* 설명 */}
            <p
              style={{
                fontSize: "var(--font-size-caption)",
                color: "var(--color-text-secondary)",
                lineHeight: "var(--line-height-base)",
                marginBottom: "var(--space-lg)",
              }}
            >
              {question.explanation}
            </p>

            {/* 버튼 영역 */}
            {!(isCorrect && currentIndex === totalQuestions) && (
              <div
                style={{
                  display: "flex",
                  gap: "var(--space-sm)",
                  marginTop: "var(--space-md)",
                }}
              >
                {isCorrect ? (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleNext}
                    style={{
                      flex: 1,
                      width: "100%",
                    }}
                  >
                    다음 문제로 →
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="md"
                    onClick={handleRetry}
                    style={{
                      flex: 1,
                      width: "100%",
                    }}
                  >
                    다시 풀기 🔄
                  </Button>
                )}
              </div>
            )}
          </Card>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }

        @keyframes bouncePop {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15) rotate(5deg);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
