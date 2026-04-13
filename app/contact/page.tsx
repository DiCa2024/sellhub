import { prisma } from "@/lib/prisma";
import ContactBoardForm from "@/components/ContactBoardForm";

export default async function ContactPage() {
  const posts = await prisma.contactPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <section className="rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">문의 게시판</h1>
        <p className="mt-2 text-neutral-600">
          방문자가 자유롭게 문의글을 남길 수 있는 게시판입니다.
        </p>
      </section>

      <section className="rounded-3xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">글 작성</h2>
        <div className="mt-4">
          <ContactBoardForm />
        </div>
      </section>

      <section className="space-y-4">
        {posts.length === 0 ? (
          <div className="rounded-2xl border bg-white p-6 text-neutral-500 shadow-sm">
            아직 등록된 문의글이 없습니다.
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="mt-1 text-sm text-neutral-500">
                작성자: {post.author}
              </p>
              <p className="mt-3 whitespace-pre-line text-neutral-700">
                {post.content}
              </p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}