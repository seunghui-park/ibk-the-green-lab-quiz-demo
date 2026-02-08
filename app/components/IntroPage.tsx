"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { trackQuizStart } from "@/lib/tracking";

interface IntroPageProps {
  onStart: () => void;
}

export default function IntroPage({ onStart }: IntroPageProps) {
  const handleStart = () => {
    trackQuizStart();
    onStart();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100dvh",
        padding: "clamp(var(--space-md), 4vw, var(--space-lg))",
        textAlign: "center",
        maxWidth: "500px",
        margin: "0 auto",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 배경 장식 요소 */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          fontSize: "32px",
          opacity: 0.2,
          animation: "float 3s ease-in-out infinite",
          animationDelay: "0s",
        }}
      >
        🌿
      </div>
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "8%",
          fontSize: "24px",
          opacity: 0.2,
          animation: "float 3s ease-in-out infinite",
          animationDelay: "1s",
        }}
      >
        ✨
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          left: "8%",
          fontSize: "28px",
          opacity: 0.2,
          animation: "float 3s ease-in-out infinite",
          animationDelay: "1.5s",
        }}
      >
        🌱
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "5%",
          fontSize: "20px",
          opacity: 0.2,
          animation: "float 3s ease-in-out infinite",
          animationDelay: "0.5s",
        }}
      >
        🌎
      </div>

      <div>
        <Image
          src="/thegreenlab_logo.png"
          alt="더그린랩 로고"
          width={203}
          height={18}
          priority
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 8px 16px rgba(30, 127, 79, 0.2))",
          }}
        />
      </div>

      {/* 마스코트 캐릭터 */}
      <div
        style={{
          position: "relative",
          marginBottom: "var(--space-xl)",
          animation: "bounce 2s ease-in-out infinite",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "clamp(180px, 40vw, 240px)",
            height: "clamp(180px, 40vw, 240px)",
            margin: "0 auto",
          }}
        >
          <Image
            src="/thegreenlab_character.png"
            alt="더그린랩 마스코트"
            width={240}
            height={240}
            priority
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "drop-shadow(0 8px 16px rgba(30, 127, 79, 0.2))",
            }}
          />
        </div>
        {/* 캐릭터 주변 반짝이는 효과 */}
        <div
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            fontSize: "24px",
            animation: "twinkle 2s ease-in-out infinite",
            animationDelay: "0s",
          }}
        >
          ✨
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "-10px",
            fontSize: "20px",
            animation: "twinkle 2s ease-in-out infinite",
            animationDelay: "1s",
          }}
        >
          🌿
        </div>
      </div>

      {/* 헤드라인
      <h1
        style={{
          fontSize: "clamp(22px, 5.5vw, 26px)",
          fontWeight: "var(--font-weight-bold)",
          color: "var(--color-text-primary)",
          marginBottom: "var(--space-md)",
          lineHeight: "1.4",
          animation: "fadeInUp 0.6s ease-out",
        }}
      >
        퀴즈 풀고 할인쿠폰 받기 🎁
      </h1> */}

      {/* 서브 텍스트 */}
      <p
        style={{
          fontSize: "var(--font-size-body)",
          color: "var(--color-text-primary)",
          marginBottom: "var(--space-xl)",
          lineHeight: "var(--line-height-base)",
          animation: "fadeInUp 0.6s ease-out 0.2s both",
        }}
      >
        퀴즈 풀고 할인 쿠폰 받아가기! 🎁
      </p>

      {/* IntroPage.tsx 내부의 CTA 버튼 부분 */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px", // 이 값을 키우면 버튼이 더 넓어집니다 (예: 100% 혹은 450px)
          padding: "0 20px", // 양옆 최소 여백
          animation: "fadeInUp 0.6s ease-out 0.4s both",
        }}
      >
        <Button
          variant="primary"
          size="lg" // 이제 위 코드 수정으로 인해 아주 크고 아름다운 버튼이 나옵니다.
          onClick={handleStart}
        >
          시작하기 🌿
        </Button>
      </div>

      {/* 하단 브랜드 메시지 */}
      <p
        style={{
          fontSize: "var(--font-size-caption)",
          color: "var(--color-text-secondary)",
          marginTop: "var(--space-xl)",
          lineHeight: "var(--line-height-base)",
          animation: "fadeInUp 0.6s ease-out 0.6s both",
        }}
      >
        All copyrights reserved by The GREEN Lab
      </p>

      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(2deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(5px);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes fadeInUp {
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
