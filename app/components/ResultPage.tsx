"use client";

import { useState } from "react";
import Button from "@/components/Button";
import {
  trackCouponCopy,
  trackShopClick,
  trackShareClick,
} from "@/lib/tracking";

interface Tier {
  name: string;
  emoji: string;
  message: string;
}

interface ResultPageProps {
  score: number;
  tier: Tier;
  couponCode: string;
  couponDiscount?: string;
  couponDescription?: string;
}

export default function ResultPage({
  score,
  tier,
  couponCode,
  couponDiscount = "10%",
  couponDescription = "전 상품 할인 쿠폰",
}: ResultPageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCoupon = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      trackCouponCopy();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = () => {
    trackShareClick();
    if (navigator.share) {
      navigator.share({
        title: "나의 환경 습관 점수는?",
        text: `나의 환경 습관 점수는 ${tier.emoji} ${tier.name}예요! 더그린랩 퀴즈로 확인해보세요!`,
        url: window.location.href,
      });
    } else {
      // Fallback: URL 복사
      handleCopyCoupon();
    }
  };

  const handleShopClick = () => {
    trackShopClick();
    // 실제로는 더그린랩 쇼핑몰로 이동
    window.open("https://thegreenlab.co.kr", "_blank");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        padding: "clamp(var(--space-md), 4vw, var(--space-lg))",
        maxWidth: "500px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* 결과 타이틀 */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "var(--space-xl)",
        }}
      >
        <div
          style={{
            fontSize: "64px",
            marginBottom: "var(--space-md)",
            animation: "pop 0.5s var(--motion-bounce)",
          }}
        >
          {tier.emoji}
        </div>
        <h1
          style={{
            fontSize: "var(--font-size-title)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-text-primary)",
            marginBottom: "var(--space-sm)",
          }}
        >
          {tier.name}
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-body)",
            color: "var(--color-text-secondary)",
            marginBottom: "var(--space-lg)",
          }}
        >
          {tier.message}
        </p>
        <p
          style={{
            fontSize: "var(--font-size-subtitle)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--color-primary)",
            marginTop: "var(--space-md)",
          }}
        >
          A Bit Of Habits ㅣ 환경을 위한 작은 습관
        </p>
      </div>

      {/* 기프트카드 스타일 쿠폰 */}
      <div
        style={{
          marginBottom: "var(--space-xl)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 봉투 느낌의 바깥 컨테이너 */}
        <div
          style={{
            width: "100%",
            maxWidth: "320px",
            padding: "var(--space-lg)",
            paddingBottom: "var(--space-xl)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "24px",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
            position: "relative",
            overflow: "visible",
          }}
        >
          {/* 장식용 컨페티 */}
          <div
            style={{
              position: "absolute",
              top: "-8px",
              right: "20px",
              fontSize: "20px",
              opacity: 0.8,
            }}
          >
            🎉
          </div>
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "16px",
              fontSize: "16px",
              opacity: 0.7,
            }}
          >
            ✨
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              right: "24px",
              fontSize: "18px",
              opacity: 0.7,
            }}
          >
            🌿
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "30px",
              left: "20px",
              fontSize: "14px",
              opacity: 0.6,
            }}
          >
            🎁
          </div>

          {/* 그린 기프트카드 (안쪽 카드) */}
          <div
            style={{
              width: "100%",
              backgroundColor: "var(--color-primary)",
              borderRadius: "18px",
              padding: "var(--space-xl)",
              paddingTop: "var(--space-lg)",
              paddingBottom: "var(--space-lg)",
              boxShadow:
                "0 6px 20px rgba(30, 127, 79, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* 카드 위 패턴 (은은한 흰색 웨이브) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.12,
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255,255,255,0.4) 8px, rgba(255,255,255,0.4) 10px)",
                borderRadius: "18px",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.08)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-10px",
                left: "-10px",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.06)",
                pointerEvents: "none",
              }}
            />

            {/* 카드 텍스트 */}
            <div
              style={{ position: "relative", zIndex: 1, textAlign: "center" }}
            >
              <div
                style={{
                  fontSize: "var(--font-size-caption)",
                  color: "rgba(255, 255, 255, 0.95)",
                  marginBottom: "var(--space-sm)",
                  letterSpacing: "0.5px",
                }}
              >
                더그린랩
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                  gap: "6px",
                  marginBottom: "var(--space-sm)",
                }}
              >
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    letterSpacing: "1px",
                  }}
                >
                  {couponDiscount}
                </span>
                <span
                  style={{
                    fontSize: "var(--font-size-body)",
                    color: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  할인
                </span>
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  fontFamily: "monospace",
                  letterSpacing: "3px",
                  marginTop: "var(--space-md)",
                }}
              >
                {couponCode}
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "rgba(255, 255, 255, 0.8)",
                  marginTop: "var(--space-sm)",
                  lineHeight: 1.4,
                }}
              >
                {couponDescription}
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleCopyCoupon}
          style={{
            width: "100%",
            maxWidth: "320px",
            marginTop: "var(--space-lg)",
          }}
        >
          {copied ? "복사 완료! 이제 쇼핑하러 가자 🛒" : "쿠폰 복사하기"}
        </Button>
      </div>

      {/* 공유 버튼 */}
      <Button
        variant="outline"
        size="md"
        onClick={handleShare}
        style={{
          width: "100%",
          marginBottom: "var(--space-md)",
        }}
      >
        친구한테 자랑하기 ↗
      </Button>

      {/* 최종 CTA */}
      <Button
        variant="primary"
        size="lg"
        onClick={handleShopClick}
        style={{
          width: "100%",
        }}
      >
        더그린랩 바로가기 🛍️
      </Button>

      <style jsx>{`
        @keyframes pop {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
