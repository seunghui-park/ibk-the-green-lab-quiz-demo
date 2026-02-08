# 더그린랩(The GREEN Lab) 퀴즈형 마이크로 사이트

20대 타겟을 위한 귀엽고 재밌는 환경 습관 퀴즈 사이트입니다.

## 프로젝트 개요

- **브랜드**: 더그린랩(The GREEN Lab)
- **목적**: 
  1. 퀴즈로 브랜드 스토리/친환경 특성을 가볍게 학습
  2. 완료 시 할인 쿠폰 제공으로 구매 전환(CVR) 상승
  3. 데모 페이지로 UX 이탈/전환 이벤트 트래킹

## 주요 기능

- 📱 Mobile First 설계
- 🎨 귀엽고 재밌는 UI/UX (둥글둥글+말랑 느낌)
- ✨ 미세 애니메이션 (바운스, 팝, 흔들, confetti)
- 🎯 이벤트 트래킹 (퀴즈 시작, 답변, 완료, 쿠폰 복사 등)
- 🎁 쿠폰 제공 시스템
- 📊 점수/등급 시스템 (새싹 습관러 / 지구친구 / 에코 마스터)

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Variables + Tailwind CSS 4
- **Font**: Pretendard (CDN)
- **Deployment**: Vercel

## 프로젝트 구조

```
├── app/
│   ├── components/      # 페이지 컴포넌트
│   │   ├── IntroPage.tsx
│   │   ├── QuizPage.tsx
│   │   └── ResultPage.tsx
│   ├── globals.css      # 디자인 토큰 정의
│   ├── layout.tsx
│   └── page.tsx         # 메인 페이지 (라우팅)
├── components/          # 공통 컴포넌트
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Progress.tsx
│   └── Badge.tsx
├── data/
│   └── quiz.json       # 퀴즈 데이터
└── lib/
    └── tracking.ts     # 이벤트 트래킹 함수
```

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

### 배포

Vercel에 배포하려면:

```bash
vercel
```

## 디자인 토큰

모든 디자인 토큰은 `app/globals.css`에 CSS Variables로 정의되어 있습니다.

- **Colors**: Primary Green 계열, Accent Mint
- **Typography**: Pretendard 폰트
- **Spacing**: 4px 단위 시스템
- **Radius**: 둥글둥글한 느낌 (10px ~ 999px)
- **Shadows**: 스티커 느낌의 그림자
- **Animations**: Bounce, Pop 등 미세 애니메이션

## 이벤트 트래킹

다음 이벤트들이 트래킹됩니다:

- `quiz_start`: 퀴즈 시작
- `quiz_answer`: 답변 선택 (question_id, choice, correct)
- `quiz_complete`: 퀴즈 완료 (score, tier)
- `coupon_copy`: 쿠폰 복사
- `cta_shop_click`: 쇼핑몰 이동 클릭
- `share_click`: 공유 클릭
- `dropoff`: 이탈 추적 (route, question_id)

## 커스터마이징

### 퀴즈 데이터 수정

`data/quiz.json` 파일을 수정하여 질문, 보기, 설명, 등급, 쿠폰 정보를 변경할 수 있습니다.

### 디자인 토큰 수정

`app/globals.css`의 `:root` 섹션에서 색상, 폰트, 간격 등을 수정할 수 있습니다.

## 라이선스

이 프로젝트는 더그린랩(The GREEN Lab)을 위한 데모 프로젝트입니다.
