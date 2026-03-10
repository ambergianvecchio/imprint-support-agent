import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ChatWidget from "@/components/ChatWidget";

const TEAM_MEMBERS = [
  { name: "Daniel Terry", title: "Founder" },
  { name: "Jeff Feldman", title: "CEO" },
  { name: "Crosby Ignasher", title: "Director of Animation" },
  { name: "Olivia Kang", title: "VP of Learning" },
  { name: "Maya Liebman", title: "UX Designer" },
  { name: "Jasmyne Eastmond", title: "Content Producer" },
  { name: "Conor O'Byrne", title: "Content Editor" },
  { name: "Nick Sarno", title: "Lead iOS Engineer" },
  { name: "Sophia Hadley", title: "Content Editor" },
  { name: "Jon Lee", title: "Senior Product Manager" },
  { name: "Andre Ficerai", title: "Head of Growth" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-imprint-bg">
      <SiteNav activePage="ABOUT" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-imprint px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Learn visually, with Imprint.
            </h1>
          </div>
        </section>

        {/* Body Text Section */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl">
            <p className="text-base leading-relaxed text-imprint-muted sm:text-lg">
              At Imprint, we take the world&apos;s most important knowledge and
              make it easy to learn. We use beautiful visuals to transform the
              way complex, abstract ideas are communicated. In less than 10
              minutes a day, people can understand topics like psychology,
              history, finance, and more.
            </p>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="px-6 pb-16 sm:pb-20">
          <div className="mx-auto max-w-4xl">
            <h2
              className="mb-12 text-center text-3xl font-normal text-imprint-dark sm:text-4xl"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Our Team
            </h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.name}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-imprint-light">
                    <span
                      className="text-lg font-semibold text-imprint"
                      style={{
                        fontFamily: "Georgia, 'Times New Roman', serif",
                      }}
                    >
                      {getInitials(member.name)}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-imprint-dark">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-imprint-muted">
                    {member.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Careers Section */}
        <section id="careers" className="bg-imprint-surface px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="mb-6 text-3xl font-normal text-imprint-dark sm:text-4xl"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Careers
            </h2>
            <p className="text-base leading-relaxed text-imprint-muted">
              Want to work at Imprint? We don&apos;t have open roles at the
              moment, but feel free to reach out at{" "}
              <a
                href="mailto:jobs@imprintapp.com"
                className="text-imprint underline hover:text-imprint-hover"
              >
                jobs@imprintapp.com
              </a>{" "}
              and we&apos;ll follow up if an opportunity opens up that&apos;s a
              good fit.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
