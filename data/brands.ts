export type Brand = {
  id: string;
  name: string;
  country: "한국" | "일본" | "미국" | "동남아" | "유럽";
  category: string;
  oneLiner: string;
  budgetLabel: "소자본" | "중간" | "고자본";
  tags: string[];
  summary: string;
};

export const brands: Brand[] = [
  {
    id: "fw-001",
    name: "WaveCoffee",
    country: "한국",
    category: "카페",
    oneLiner: "저가·고회전 모델, 소형 상권에 강한 테이크아웃 중심",
    budgetLabel: "소자본",
    tags: ["저가", "테이크아웃", "고회전", "상권유연"],
    summary:
      "소형 점포 기준의 운영 효율과 회전율에 초점을 둔 카페 콘셉트. 메뉴 단순화와 빠른 제조 동선을 강조.",
  },
  {
    id: "fw-002",
    name: "MochiLab",
    country: "일본",
    category: "디저트",
    oneLiner: "현지 디저트 감성, 선물/테이크아웃 특화",
    budgetLabel: "중간",
    tags: ["디저트", "선물", "패키징", "팝업"],
    summary:
      "패키징 완성도가 높은 디저트 브랜드. 팝업 테스트 후 상설 매장 확장에 유리한 타입.",
  },
  {
    id: "fw-003",
    name: "FitMinute",
    country: "미국",
    category: "헬스",
    oneLiner: "짧은 시간 고효율, 구독형 PT 모델",
    budgetLabel: "고자본",
    tags: ["구독", "PT", "리텐션", "커뮤니티"],
    summary:
      "구독 기반의 리텐션을 핵심으로 설계된 모델. 커뮤니티 운영과 앱 기반 예약이 중요.",
  },
];