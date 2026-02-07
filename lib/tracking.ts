// 이벤트 트래킹 함수
export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  // 개발 환경에서는 console.log로 출력
  if (process.env.NODE_ENV === "development") {
    console.log("[Event Tracking]", eventName, properties);
  }

  // 프로덕션에서는 실제 분석 도구로 전송
  // 예: Google Analytics, Mixpanel, Amplitude 등
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, properties);
  }

  // 커스텀 이벤트 디스패치 (필요시)
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("quizEvent", {
        detail: { eventName, properties },
      })
    );
  }
}

// 퀴즈 시작
export function trackQuizStart() {
  trackEvent("quiz_start");
}

// 퀴즈 답변
export function trackQuizAnswer(
  questionId: number,
  choice: string,
  correct: boolean
) {
  trackEvent("quiz_answer", {
    question_id: questionId,
    choice,
    correct,
  });
}

// 퀴즈 완료
export function trackQuizComplete(score: number, tier: string) {
  trackEvent("quiz_complete", {
    score,
    tier,
  });
}

// 쿠폰 복사
export function trackCouponCopy() {
  trackEvent("coupon_copy");
}

// 쇼핑 CTA 클릭
export function trackShopClick() {
  trackEvent("cta_shop_click");
}

// 공유 클릭
export function trackShareClick() {
  trackEvent("share_click");
}

// 이탈 추적
export function trackDropoff(route: string, questionId?: number) {
  trackEvent("dropoff", {
    route,
    question_id: questionId,
  });
}
