export type WholesaleSite = {
  id: string;
  name: string;
  region: string;
  category: string;
  tags: string[];
  shortDescription: string;

  priceRange: string;
  moq: string;
  shippingCost: string;
  deliveryPeriod: string;
  csResponse: string;
  dropshipping: string;
  businessRequired: string;

  beginnerLevel: string;
  recommendedMode: string;
  mainCategories: string;
  platformType: string;
  language: string;

  marginPotential: string;
  priceCompetitiveness: string;
  differentiationPotential: string;

  views: string;
  website: string;

  strengths: string[];
  cautions: string[];
  recommendedFor: string[];
  imageUrl: string;
};

export const wholesaleSites: WholesaleSite[] = [
  {
    id: "alibaba",
    name: "Alibaba",
    region: "글로벌",
    category: "종합 B2B",
    tags: ["글로벌", "OEM", "제조사", "대량 사입"],
    shortDescription:
      "전 세계 제조사와 공급사를 연결하는 대표적인 글로벌 B2B 플랫폼입니다.",

    priceRange: "중간~낮음",
    moq: "플랫폼/공급사별 상이",
    shippingCost: "공급사별 상이",
    deliveryPeriod: "국가/공급사별 상이",
    csResponse: "공급사별 상이",
    dropshipping: "일부 가능",
    businessRequired: "가입 후 확인",

    beginnerLevel: "보통",
    recommendedMode: "사입 / OEM",
    mainCategories: "전자, 생활용품, 산업재, 패션",
    platformType: "제조 / 도매 / 글로벌 B2B",
    language: "영어",

    marginPotential: "보통~좋음",
    priceCompetitiveness: "좋음",
    differentiationPotential: "좋음",

    views: "24.1k",
    website: "https://www.alibaba.com/",
    strengths: [
      "글로벌 공급처 탐색에 강함",
      "OEM/ODM 소싱에 적합함",
      "카테고리 범위가 매우 넓음",
    ],
    cautions: [
      "공급사마다 MOQ와 조건 차이가 큼",
      "공급사 검증이 중요함",
      "물류·통관 비용까지 함께 계산해야 함",
    ],
    recommendedFor: [
      "대량 사입 셀러",
      "OEM/ODM을 검토하는 사용자",
      "글로벌 공급사를 폭넓게 찾고 싶은 경우",
    ],
    imageUrl: "https://via.placeholder.com/400x250",
  },
  {
    id: "1688",
    name: "1688",
    region: "중국",
    category: "중국 내수 도매",
    tags: ["중국", "저단가", "내수 도매", "가격 경쟁력"],
    shortDescription:
      "중국 내수 시장 중심의 대형 도매 플랫폼으로 저단가 소싱 후보를 넓게 찾을 때 자주 검토됩니다.",

    priceRange: "낮음",
    moq: "플랫폼/공급사별 상이",
    shippingCost: "배대지/포워딩 포함 시 상이",
    deliveryPeriod: "중간~김",
    csResponse: "공급사별 상이",
    dropshipping: "일부 가능",
    businessRequired: "가입 후 확인",

    beginnerLevel: "어려움",
    recommendedMode: "사입",
    mainCategories: "잡화, 의류, 전자, 생활용품",
    platformType: "중국 내수 도매",
    language: "중국어",

    marginPotential: "좋음",
    priceCompetitiveness: "매우 좋음",
    differentiationPotential: "보통",

    views: "18.7k",
    website: "https://www.1688.com/",
    strengths: [
      "저단가 상품이 매우 많음",
      "상품 수가 매우 많음",
      "가격 비교 후보를 넓게 잡기 좋음",
    ],
    cautions: [
      "중국어 기반이라 진입장벽이 있음",
      "배대지/포워딩 흐름 이해가 필요함",
      "셀러별 품질 차이가 큼",
    ],
    recommendedFor: [
      "저단가 중국 소싱이 필요한 셀러",
      "가격 경쟁력이 중요한 사용자",
      "중국 공급처를 넓게 비교하려는 경우",
    ],
    imageUrl: "https://via.placeholder.com/400x250",
  },
  {
    id: "super-delivery",
    name: "Super Delivery",
    region: "일본",
    category: "일본 도매",
    tags: ["일본", "잡화", "라이프스타일", "감성 상품"],
    shortDescription:
      "일본 공급사 중심의 도매 플랫폼으로 라이프스타일·잡화 소싱에 적합합니다.",

    priceRange: "중간~높음",
    moq: "공급사별 상이",
    shippingCost: "국제배송 기준 상이",
    deliveryPeriod: "중간",
    csResponse: "보통",
    dropshipping: "공급사별 상이",
    businessRequired: "가입 후 확인",

    beginnerLevel: "보통",
    recommendedMode: "사입",
    mainCategories: "잡화, 리빙, 라이프스타일",
    platformType: "일본 도매 / 브랜드형",
    language: "일본어 / 영어 일부",

    marginPotential: "보통",
    priceCompetitiveness: "보통",
    differentiationPotential: "좋음",

    views: "6.4k",
    website: "https://www.superdelivery.com/en/",
    strengths: [
      "일본 감성 상품 탐색에 좋음",
      "잡화·라이프스타일 카테고리에 강함",
      "차별화된 상품 구성에 유리함",
    ],
    cautions: [
      "대중형 중국 플랫폼보다 단가가 높을 수 있음",
      "공급사별 조건 차이가 있음",
      "국제 주문 조건을 따로 확인해야 함",
    ],
    recommendedFor: [
      "잡화 편집숍 스타일 셀러",
      "감성 상품 큐레이션 판매자",
      "일본 소싱에 관심 있는 사용자",
    ],
    imageUrl: "https://via.placeholder.com/400x250",
  },
  {
    id: "faire",
    name: "Faire",
    region: "글로벌",
    category: "리테일 도매",
    tags: ["브랜드", "리테일러", "큐레이션", "라이프스타일"],
    shortDescription:
      "독립 리테일러와 브랜드를 연결하는 온라인 도매 마켓플레이스로 라이프스타일 상품에 강합니다.",

    priceRange: "중간~높음",
    moq: "브랜드별 상이",
    shippingCost: "브랜드별 상이",
    deliveryPeriod: "브랜드별 상이",
    csResponse: "보통",
    dropshipping: "브랜드별 상이",
    businessRequired: "가입 후 확인",

    beginnerLevel: "쉬움~보통",
    recommendedMode: "사입",
    mainCategories: "라이프스타일, 기프트, 패션, 식품",
    platformType: "브랜드형 리테일 도매",
    language: "영어",

    marginPotential: "보통",
    priceCompetitiveness: "보통",
    differentiationPotential: "좋음",

    views: "9.2k",
    website: "https://www.faire.com/",
    strengths: [
      "브랜드 큐레이션이 잘 되어 있음",
      "리테일러 친화적 구조",
      "감도 있는 상품 탐색에 적합함",
    ],
    cautions: [
      "공장형 B2B 도매몰과는 다름",
      "브랜드별 주문 조건 차이가 큼",
      "저단가 대량 사입용과는 결이 다름",
    ],
    recommendedFor: [
      "부티크형 셀러",
      "라이프스타일 소품 셀러",
      "차별화 상품을 찾는 사용자",
    ],
    imageUrl: "https://via.placeholder.com/400x250",
  },
  {
    id: "dhgate",
    name: "DHgate",
    region: "중국",
    category: "중국 도매",
    tags: ["중국", "소량 구매", "도매", "크로스보더"],
    shortDescription:
      "중국 판매자와 글로벌 바이어를 연결하는 크로스보더 도매 플랫폼입니다.",

    priceRange: "낮음~중간",
    moq: "공급사별 상이",
    shippingCost: "공급사별 상이",
    deliveryPeriod: "중간~김",
    csResponse: "공급사별 상이",
    dropshipping: "일부 가능",
    businessRequired: "가입 후 확인",

    beginnerLevel: "보통",
    recommendedMode: "사입 / 소량 테스트",
    mainCategories: "잡화, 전자, 패션",
    platformType: "중국 크로스보더 도매",
    language: "영어",

    marginPotential: "보통~좋음",
    priceCompetitiveness: "좋음",
    differentiationPotential: "보통",

    views: "7.8k",
    website: "https://www.dhgate.com/",
    strengths: [
      "소량 발주 상품을 찾기 쉬운 편",
      "중국 기반 상품 탐색이 쉬움",
      "가격 중심 비교에 유리함",
    ],
    cautions: [
      "셀러 신뢰도 확인이 중요함",
      "배송 기간 편차가 있을 수 있음",
      "품질 차이가 발생할 수 있음",
    ],
    recommendedFor: [
      "소량 테스트 소싱 셀러",
      "중국 상품을 비교적 가볍게 소싱하고 싶은 사용자",
      "가격 중심 비교를 많이 하는 경우",
    ],
    imageUrl: "https://via.placeholder.com/400x250",
  },
  {
    id: "tradekorea",
    name: "tradeKorea",
    region: "한국",
    category: "한국 B2B",
    tags: ["한국", "K-제품", "수출", "공급사"],
    shortDescription:
      "한국 상품과 한국 공급사를 글로벌 바이어에게 연결하는 한국 중심 B2B 플랫폼입니다.",

    priceRange: "중간",
    moq: "공급사별 상이",
    shippingCost: "공급사별 상이",
    deliveryPeriod: "공급사별 상이",
    csResponse: "보통",
    dropshipping: "공급사별 상이",
    businessRequired: "가입 후 확인",

    beginnerLevel: "보통",
    recommendedMode: "사입 / B2B 거래",
    mainCategories: "K-뷰티, K-푸드, 생활용품",
    platformType: "한국 공급사 B2B",
    language: "한국어 / 영어",

    marginPotential: "보통",
    priceCompetitiveness: "보통",
    differentiationPotential: "좋음",

    views: "5.9k",
    website: "https://www.tradekorea.com/",
    strengths: [
      "한국 공급사 탐색에 적합함",
      "K-제품 카테고리를 보기 좋음",
      "한국 기반 소싱 후보군으로 유용함",
    ],
    cautions: [
      "내수형 도매몰과는 결이 다를 수 있음",
      "거래 조건은 업체별 차이가 큼",
      "MOQ와 가격 정책이 통일돼 있지 않음",
    ],
    recommendedFor: [
      "한국 제품 소싱 사용자",
      "K-카테고리 중심 셀러",
      "한국 공급사를 찾는 해외 판매자",
    ],
    imageUrl: "https://via.placeholder.com/400x250",
  },
];