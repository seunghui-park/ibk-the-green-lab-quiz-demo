"use client";

import { useEffect } from "react";

export default function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css";
    document.head.appendChild(link);

    return () => {
      // Cleanup: 컴포넌트 언마운트 시 제거 (선택사항)
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return null;
}
