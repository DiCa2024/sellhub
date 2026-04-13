export type BlogPost = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  excerpt: string;
  date: string;
  author: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: "best-wholesale-sites-2026",
    title: "2026 도매 사이트 추천, 초보 셀러가 먼저 봐야 할 플랫폼 정리",
    category: "도매 가이드",
    imageUrl: "https://via.placeholder.com/400x250",
    excerpt:
      "초보 셀러가 처음 시작할 때 보기 좋은 국내외 도매 플랫폼을 기준별로 정리했습니다.",
    date: "2026-04-08",
    author: "sellhub",
  },
  {
    id: "1688-guide-for-beginners",
    title: "1688 초보 가이드, 중국 도매 소싱 전에 꼭 알아야 할 것",
    category: "해외 소싱",
    imageUrl: "https://via.placeholder.com/400x250",
    excerpt:
      "1688을 처음 보는 사람도 이해할 수 있게 가입 전 체크할 점과 소싱 흐름을 정리했습니다.",
    date: "2026-04-07",
    author: "sellhub",
  },
  {
    id: "alibaba-vs-1688",
    title: "Alibaba vs 1688 비교, 어떤 플랫폼이 내 판매 방식에 더 맞을까",
    category: "비교 분석",
    imageUrl: "https://via.placeholder.com/400x250",
    excerpt:
      "대량 사입, 저단가 소싱, OEM 관점에서 Alibaba와 1688의 차이를 비교합니다.",
    date: "2026-04-06",
    author: "sellhub",
  },
  {
    id: "dropshipping-vs-wholesale",
    title: "위탁판매와 사입의 차이, 초보 셀러는 무엇부터 시작해야 할까",
    category: "운영 전략",
    imageUrl: "https://via.placeholder.com/400x250",
    excerpt:
      "위탁판매와 사입의 구조적 차이, 장단점, 초보자에게 더 맞는 시작 방식을 정리했습니다.",
    date: "2026-04-05",
    author: "sellhub",
  },
  {
    id: "japan-wholesale-guide",
    title: "일본 잡화 도매 찾는 법, 감성 상품 셀러를 위한 소싱 가이드",
    category: "일본 소싱",
    imageUrl: "https://via.placeholder.com/400x250",
    excerpt:
      "일본 잡화와 라이프스타일 상품을 찾는 셀러를 위해 플랫폼 특징과 체크 포인트를 정리했습니다.",
    date: "2026-04-04",
    author: "sellhub",
  },
  {
    id: "oem-checklist",
    title: "OEM 제작 전 체크리스트, 도매 플랫폼에서 제조사 찾을 때 주의할 점",
    category: "제조/OEM",
    imageUrl: "https://via.placeholder.com/400x250",
    excerpt:
      "OEM/ODM 생산을 고려할 때 공급사와 소통하며 꼭 확인해야 할 핵심 항목을 정리했습니다.",
    date: "2026-04-03",
    author: "sellhub",
  },
];