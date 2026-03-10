import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ChatWidget from "@/components/ChatWidget";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-imprint-bg">
      <SiteNav />

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12 sm:py-16">
        <h1
          className="mb-8 text-center text-4xl font-normal text-imprint-dark sm:text-5xl"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Privacy Policy
        </h1>
        <p className="text-base leading-relaxed text-imprint-muted">
          The full privacy policy for Imprint would appear here. You can view
          the complete privacy policy on the official Imprint website at{" "}
          <a
            href="https://imprintapp.com/privacypolicy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-imprint underline hover:text-imprint-hover"
          >
            imprintapp.com/privacypolicy
          </a>
          .
        </p>
      </main>

      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
