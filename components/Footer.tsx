export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 text-sm text-neutral-600">
        <div className="flex flex-col gap-2">
          <div className="font-medium text-neutral-900">Franwave</div>
          <div>국내·해외 프랜차이즈 소개 플랫폼</div>
          <div className="pt-4">
            © {new Date().getFullYear()} Franwave. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}