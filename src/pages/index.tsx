import ApologySection from "@/components/apology-section";
import FloatingSadEmotes from "@/components/floating-hearts";
import ForgiveSection from "@/components/forgive-section";
import HeroSection from "@/components/hero-secton";
import PromiseSection from "@/components/promise-section";
import ReasonsSection from "@/components/reason-section";
import type { NextPageWithLayout } from "@/pages/_app";
import { PAGE_LIST } from "@/utils/constant/common";

type Props = {
  error: string;
  csrfToken: string;
  token: string;
};

const TopPage: NextPageWithLayout<Props> = () => {
  return <>
    <div className="relative min-h-screen overflow-x-hidden">
       <FloatingSadEmotes />
      <main className="relative z-10">
        <HeroSection />
        <ApologySection />
        <ReasonsSection />
        <PromiseSection />
        <ForgiveSection />
        <footer className="py-12 text-center">
          <p className="font-body text-muted-foreground/60 text-sm">
            Made with love, for you ♥
          </p>
        </footer>
      </main>
    </div>
  </>;
};

TopPage.pageId = PAGE_LIST.USER.TOP.ID;
TopPage.auth = PAGE_LIST.USER.TOP.AUTH;

export default TopPage;
