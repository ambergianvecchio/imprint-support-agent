"use client";

import { useState } from "react";
import ChatWidget from "@/components/ChatWidget";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

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
    <div className="flex min-h-screen flex-col bg-imprint-bg">
      <SiteNav activePage="FAQ" />

      {/* FAQ Section */}
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12 sm:py-16">
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

      <SiteFooter />

      {/* Floating Chat Widget */}
      <ChatWidget />
    </div>
  );
}
