"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { trackCouponCopy, trackShopClick, trackShareClick } from "@/lib/tracking";

interface Tier {
  name: string;
  emoji: string;
  message: string;
}

interface ResultPageProps {
  score: number;
  tier: Tier;
  couponCode: string;
}

export default function ResultPage({
  score,
  tier,
  couponCode,
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
          작은 습관이 모이면 진짜 바뀜!
        </p>
      </div>

      {/* 쿠폰 카드 */}
      <Card
        style={{
          marginBottom: "var(--space-lg)",
          textAlign: "center",
          background: "linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-accent) 100%)",
        }}
      >
        <div
          style={{
            fontSize: "var(--font-size-caption)",
            color: "var(--color-text-secondary)",
            marginBottom: "var(--space-sm)",
          }}
        >
          쿠폰 겟! 🎁
        </div>
        <div
          style={{
            fontSize: "32px",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-primary)",
            marginBottom: "var(--space-md)",
            fontFamily: "monospace",
            letterSpacing: "2px",
          }}
        >
          {couponCode}
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={handleCopyCoupon}
          style={{
            width: "100%",
          }}
        >
          {copied ? "복사 완료! 이제 쇼핑하러 가자 🛒" : "쿠폰 복사하기"}
        </Button>
      </Card>

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
        더그린랩 보러가기 🛍️
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
