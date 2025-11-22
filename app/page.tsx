import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 py-4">
            <div className="flex items-center gap-3">
              <div className="size-6 text-primary">
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8v-2h3V7h2v4h3v2h-3v4h-2z"></path>
                </svg>
              </div>
              <h2 className="text-gray-900 text-xl font-bold tracking-tight">CareNavi</h2>
            </div>
            <nav className="hidden items-center gap-8 md:flex">
              <a className="text-sm font-medium text-gray-500 hover:text-primary" href="#features">주요 기능</a>
              <a className="text-sm font-medium text-gray-500 hover:text-primary" href="#how-it-works">사용 방법</a>
              <a className="text-sm font-medium text-gray-500 hover:text-primary" href="#testimonial">고객 후기</a>
            </nav>
            <div className="flex gap-2">
              <Link href="/login">
                <Button variant="outline" className="rounded-full">
                  로그인
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="rounded-full">
                  무료 시작하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="flex flex-col gap-8 text-center lg:text-left">
                <div className="flex flex-col gap-4">
                  <h1 className="text-gray-900 text-4xl font-black leading-tight tracking-tighter md:text-5xl lg:text-6xl">
                    가족 모두를 위한<br />스마트 건강 관리
                  </h1>
                  <h2 className="text-gray-500 text-lg font-normal leading-normal md:text-xl">
                    건강 기록을 중앙화하고, 복약을 추적하며, AI 기반 인사이트를 받아보세요.<br />모두 안전한 한 곳에서.
                  </h2>
                </div>
                <div className="flex justify-center lg:justify-start">
                  <Link href="/signup">
                    <Button className="rounded-full h-12 px-6 shadow-lg shadow-primary/30 text-base">
                      무료로 시작하기
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="w-full h-80 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                <div className="text-6xl">💊</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-center gap-12">
              <div className="flex flex-col gap-4 text-center max-w-3xl">
                <h2 className="text-gray-900 text-3xl font-bold tracking-tight md:text-4xl">
                  가족의 건강, 간편하게
                </h2>
                <p className="text-gray-500 text-lg font-normal leading-normal">
                  CareNavi는 가족의 모든 건강 정보를 안전하고 사용하기 쉬운 대시보드로 통합합니다.
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-glass backdrop-blur-md hover:scale-[1.02] transition-all">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-gray-900 text-lg font-bold leading-tight">통합 건강 대시보드</h3>
                    <p className="text-gray-500 text-base font-normal leading-normal">
                      가족 모두의 의료 기록, 예약, 건강 지표를 하나의 직관적인 대시보드에서 관리하세요.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-glass backdrop-blur-md hover:scale-[1.02] transition-all">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-gray-900 text-lg font-bold leading-tight">스마트 복약 알림</h3>
                    <p className="text-gray-500 text-base font-normal leading-normal">
                      가족의 모든 복약 일정에 대한 지능형 알림과 스케줄링으로 복약을 절대 놓치지 마세요.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-glass backdrop-blur-md hover:scale-[1.02] transition-all">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-gray-900 text-lg font-bold leading-tight">AI 건강 인사이트</h3>
                    <p className="text-gray-500 text-base font-normal leading-normal">
                      개인화된 데이터 기반 인사이트를 받아 건강 트렌드를 이해하고 정보에 기반한 결정을 내리세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="w-full h-96 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="text-8xl">📱</div>
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-900 text-3xl font-bold tracking-tight md:text-4xl">사용 방법</h2>
                  <p className="text-gray-500 text-lg">간단한 몇 단계로 시작하세요.</p>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-6">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">1</div>
                    <div className="w-px grow bg-gray-200"></div>
                  </div>
                  <div className="flex flex-col pb-6">
                    <p className="text-gray-900 text-lg font-medium leading-normal">안전한 가족 계정 만들기</p>
                    <p className="text-gray-500 text-base font-normal leading-normal">빠르게 가입하고 각 가족 구성원의 프로필을 설정하세요. 우리 플랫폼은 HIPAA를 준수하며 데이터는 항상 암호화됩니다.</p>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-px h-full bg-gray-200"></div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">2</div>
                    <div className="w-px grow bg-gray-200"></div>
                  </div>
                  <div className="flex flex-col pb-6">
                    <p className="text-gray-900 text-lg font-medium leading-normal">건강 데이터 & 일정 연결</p>
                    <p className="text-gray-500 text-base font-normal leading-normal">복약 일정을 추가하고, 문서를 업로드하고, 예약을 가족의 중앙 대시보드에 동기화하세요.</p>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-px h-full bg-gray-200"></div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">3</div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-900 text-lg font-medium leading-normal">마음의 평화 얻기</p>
                    <p className="text-gray-500 text-base font-normal leading-normal">스마트 알림과 실행 가능한 인사이트를 받아 가족의 건강을 능동적으로 관리하세요.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section id="testimonial" className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex flex-col items-center gap-8 text-center">
              <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
              </svg>
              <blockquote className="text-2xl font-medium text-gray-900 md:text-3xl">
                "CareNavi는 부모님의 복약 관리와 아이들의 병원 예약을 관리하는 데 생명의 은인이었습니다. 모든 것이 한곳에 있고, 마음의 평화는 값을 매길 수 없습니다."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                  김
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">김서연</p>
                  <p className="text-gray-500">어머니 & 간병인</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="rounded-xl bg-primary/90 p-10 text-center md:p-16">
              <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  가족의 건강을 관리할 준비가 되셨나요?
                </h2>
                <p className="text-lg text-white/80">
                  더 간단하고 스마트한 건강 관리 방법을 위해 CareNavi를 신뢰하는 수천 가족과 함께하세요. 오늘 무료로 가입하세요.
                </p>
                <Link href="/signup">
                  <Button className="rounded-full h-12 px-6 bg-white text-primary hover:bg-gray-100 shadow-lg">
                    지금 가입하기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="size-6 text-primary">
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8v-2h3V7h2v4h3v2h-3v4h-2z"></path>
                </svg>
              </div>
              <h2 className="text-gray-900 text-xl font-bold">CareNavi</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
              <a className="hover:text-primary" href="#">개인정보처리방침</a>
              <a className="hover:text-primary" href="#">이용약관</a>
              <a className="hover:text-primary" href="#">문의하기</a>
            </div>
            <p className="text-sm text-gray-500">© 2025 CareNavi Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
