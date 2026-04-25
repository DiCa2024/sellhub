import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.wholesaleSite.createMany({
    data: [
      {
        category: "종합",
        name: "1688",
        region: "중국",
        imageUrl: "https://via.placeholder.com/150",
        tags: "중국,도매,대량구매",
        website: "https://www.1688.com",
        dropshipping: "가능",
        businessRequired: "필요",
        usageFee: "무료",
        imageProvided: "제공",
        shortDescription: "중국 최대 B2B 도매 플랫폼",
      },
      {
        category: "종합",
        name: "타오바오",
        region: "중국",
        imageUrl: "https://via.placeholder.com/150",
        tags: "중국,쇼핑,리테일",
        website: "https://www.taobao.com",
        dropshipping: "가능",
        businessRequired: "불필요",
        usageFee: "무료",
        imageProvided: "제공",
        shortDescription: "중국 대표 온라인 쇼핑 플랫폼",
      },
      {
        category: "종합",
        name: "쿠팡 도매",
        region: "한국",
        imageUrl: "https://via.placeholder.com/150",
        tags: "한국,배송,빠름",
        website: "https://www.coupang.com",
        dropshipping: "가능",
        businessRequired: "필요",
        usageFee: "무료",
        imageProvided: "제공",
        shortDescription: "한국 대표 이커머스 플랫폼",
      },
    ],
  });

  console.log("✅ seed 데이터 입력 완료");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });