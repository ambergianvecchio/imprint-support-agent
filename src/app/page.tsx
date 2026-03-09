"use client";

import { useState } from "react";
import ChatWidget from "@/components/ChatWidget";

const FAQ_ITEMS = [
  {
    question: "What is Imprint?",
    answer: `<p>Imprint is a completely new way to learn, with interactive, visual lessons on essential topics. Millions of people use Imprint to learn important insights in psychology, philosophy, finance, leadership, business, health, science, technology, and more.</p><p class="mt-4">Imprint lessons use our unique visual, interactive format that can help you stay engaged, understand complex concepts quickly, and remember what you learn.</p>`,
  },
  {
    question: "Is Imprint worth it?",
    answer: `<p>If you're considering an Imprint subscription, take it from some 50,000+ 5 star reviews we've gotten on the App Store and Google Play store:</p><ul class="mt-4 list-disc pl-6 space-y-3"><li><em>Imprint is completely life changing. As a person that always loves reading but doesn't have much time, this app is perfect for me.</em></li><li><em>Imprint helps me stay engaged. I retain more information than I would if I read on my own. I would recommend it to anyone trying to pick up better habits and learn more.</em></li><li><em>This app is a must-have for the avid reader and learner… The visuals really do wonders!</em></li></ul><p class="mt-4">Try Imprint yourself to see the difference it can make in your learning journey.</p>`,
  },
  {
    question: "What is included in my Imprint subscription?",
    answer: `<p>With a paid Imprint subscription, you get full access to Imprint's entire library of courses, quick reads, and guides to bestselling books.</p>`,
  },
  {
    question: "How do I cancel my Imprint subscription?",
    answer: `<p>Canceling your subscription is easy and should always take less than 2 minutes but instructions will vary depending on where you purchased your subscription.</p><p class="mt-4 italic text-imprint-muted">If you purchased through the Imprint website:</p><ul class="mt-2 list-disc pl-6 space-y-1"><li>Log in to <a href="https://imprintapp.com" class="underline text-imprint hover:text-imprint-hover">imprintapp.com</a> using the Log in link in the header.</li><li>Click 'Manage' near your subscription details.</li><li>Select 'Cancel Plan'</li><li>Click once more to confirm to Cancel your plan.</li></ul><p class="mt-4 italic text-imprint-muted">If you purchased through the App Store:</p><p class="mt-2"><a href="https://support.apple.com/en-us/HT202039" target="_blank" rel="noopener noreferrer" class="underline text-imprint hover:text-imprint-hover">follow Apple's cancelation instructions.</a></p><p class="mt-4 italic text-imprint-muted">If you purchased through Google Play:</p><p class="mt-2"><a href="https://support.google.com/googleplay/answer/7018481" target="_blank" rel="noopener noreferrer" class="underline text-imprint hover:text-imprint-hover">follow Google's cancelation instructions.</a></p><p class="mt-4">If you have any trouble, please reach out to our support team at <a href="mailto:info@imprintapp.com" class="underline text-imprint hover:text-imprint-hover">info@imprintapp.com.</a></p>`,
  },
  {
    question: "There's a problem with my subscription—what do I do?",
    answer: `<p>Please reach out to our support team at <a href="mailto:info@imprintapp.com" class="underline text-imprint hover:text-imprint-hover">info@imprintapp.com.</a></p>`,
  },
];

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-imprint-border transition-transform ${
        isOpen ? "rotate-0" : "rotate-0"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={`h-4 w-4 text-imprint-muted transition-transform ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      >
        <path
          fillRule="evenodd"
          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-imprint-bg">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 sm:px-12 lg:px-20">
        <span
          className="text-2xl font-bold text-imprint-dark"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Imprint
        </span>
        <div className="hidden items-center gap-8 sm:flex">
          <a href="#" className="text-xs font-medium tracking-wide text-imprint-muted transition-colors hover:text-imprint-dark">
            ABOUT
          </a>
          <a href="#" className="text-xs font-medium tracking-wide text-imprint-muted transition-colors hover:text-imprint-dark">
            CAREERS
          </a>
          <a href="#" className="text-xs font-medium tracking-wide text-imprint-muted transition-colors hover:text-imprint-dark">
            CONTACT US
          </a>
          <a href="#" className="border-b border-imprint-dark text-xs font-medium tracking-wide text-imprint-dark">
            FAQ
          </a>
          <a href="#" className="text-xs font-medium tracking-wide text-imprint-muted transition-colors hover:text-imprint-dark">
            LOG IN
          </a>
        </div>
        <a
          href="#"
          className="rounded-full bg-imprint px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-imprint-hover"
        >
          Get Imprint
        </a>
      </nav>

      {/* FAQ Section */}
      <main className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
        <h1
          className="mb-12 text-center text-4xl font-normal text-imprint-dark sm:text-5xl"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Frequently Asked Questions
        </h1>

        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-2xl bg-imprint-surface shadow-sm transition-all ${
                openIndex === index
                  ? "ring-2 ring-imprint"
                  : "ring-1 ring-imprint-border"
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-sm font-medium text-imprint-dark sm:text-base">
                  {item.question}
                </span>
                <ChevronIcon isOpen={openIndex === index} />
              </button>
              {openIndex === index && (
                <div
                  className="px-6 pb-6 text-sm leading-relaxed text-imprint-muted"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-imprint-dark px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Imprint
              </span>
              <p className="mt-2 text-sm text-white/60">
                The world&apos;s most important<br />knowledge, visualized.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-xs font-medium tracking-wide text-white/60 sm:gap-8">
              <a href="#" className="transition-colors hover:text-white">ABOUT</a>
              <a href="#" className="transition-colors hover:text-white">CAREERS</a>
              <a href="#" className="transition-colors hover:text-white">CONTACT US</a>
              <a href="#" className="transition-colors hover:text-white">TERMS OF USE</a>
              <a href="#" className="transition-colors hover:text-white">PRIVACY POLICY</a>
            </div>
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
            <p className="text-xs text-white/40">© 2026 Imprint</p>
            <div className="flex gap-4">
              {/* Instagram */}
              <a href="#" className="text-white/40 transition-colors hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="text-white/40 transition-colors hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* Twitter */}
              <a href="#" className="text-white/40 transition-colors hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Widget */}
      <ChatWidget />
    </div>
  );
}
