"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { PrismaHeroBackground } from "@/components/ui/prisma-hero";

type Locale = "en" | "ja";

type Project = {
  id: string;
  title: string;
  category: Record<Locale, string>;
  image: string;
  aspect: number;
  role: Record<Locale, string>;
  summary: Record<Locale, string>;
  href: string;
};

const routes = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const aboutCopy = {
  en: {
    eyebrow: "About",
    title: "Creative developer building interactive web experiences.",
    body: "I design and implement digital experiences that naturally connect motion, WebGL, 3D modeling, and interface behavior. I specialize in interactive front-end development that brings visual expression and a tactile sense of interaction together.",
    nameLabel: "Name",
    nameValue: "Hiroto Sato",
    roleLabel: "Role",
    roleValue: "Creative Developer",
    contactLabel: "Contact",
    emailValue: "sauravedu.official@gmail.com",
    linkedInValue: "LinkedIn",
  },
  ja: {
    eyebrow: "About",
    title: "インタラクティブなWeb体験をつくるクリエイティブデベロッパー。",
    body: "モーション、WebGL、3Dモデリング、インターフェースを組み合わせ、自然に連動するデジタル体験を設計・実装しています。視覚表現と操作感をつなぐ、インタラクティブなフロントエンド制作を得意としています。",
    nameLabel: "名前",
    nameValue: "佐藤ヒロト",
    roleLabel: "職業",
    roleValue: "クリエイティブデベロッパー",
    contactLabel: "コンタクト",
    emailValue: "sauravedu.official@gmail.com",
    linkedInValue: "LinkedIn",
  },
};

const projectUi = {
  en: {
    ariaProjectSelector: "Project selector",
    category: "Category",
    role: "Role",
    viewProject: "View site",
  },
  ja: {
    ariaProjectSelector: "プロジェクトを選択",
    category: "カテゴリー",
    role: "担当",
    viewProject: "サイトを見る",
  },
};

const projectHeading = [
  "Projects that explore",
  "design, motion, 3D, and",
  "interactive front-end",
  "development.",
];

const projects: Project[] = [
  {
    id: "dbrain",
    title: "d.brain",
    category: { en: "Web site", ja: "Webサイト" },
    image: "https://www.hirotos.com/projects/dbrain.png",
    aspect: 844 / 594,
    role: {
      en: "DESIGN / FRONT-END DEVELOPMENT",
      ja: "デザイン / フロントエンド開発",
    },
    summary: {
      en: "Corporate site design and frontend implementation for d.brain.",
      ja: "d.brain のコーポレートサイトにおけるデザインとフロントエンド開発。",
    },
    href: "https://www.dbrain1991.co.jp",
  },
  {
    id: "wired",
    title: "WIRED",
    category: { en: "Web site", ja: "Webサイト" },
    image: "https://www.hirotos.com/projects/wired.png",
    aspect: 2400 / 1794,
    role: {
      en: "DESIGN / FRONT-END DEVELOPMENT / 3D MODELING",
      ja: "デザイン / フロントエンド開発 / 3Dモデリング",
    },
    summary: {
      en: "Web experience for WIRED Innovation Award 2025.",
      ja: "WIRED Innovation Award 2025 のWebサイト実装。",
    },
    href: "https://wired.jp/article/wired-innovation-award-2025/",
  },
  {
    id: "portfolio-proto-2026",
    title: "PROTO 2026",
    category: { en: "Web site", ja: "Webサイト" },
    image: "https://www.hirotos.com/projects/prtfolio_proto_2026.png",
    aspect: 2538 / 1584,
    role: {
      en: "DESIGN / FRONT-END DEVELOPMENT / 3D MODELING",
      ja: "デザイン / フロントエンド開発 / 3Dモデリング",
    },
    summary: {
      en: "Prototype portfolio site exploring interactive 3D presentation and frontend motion.",
      ja: "インタラクティブな3D表現とフロントエンドモーションを試したポートフォリオサイトのプロトタイプ。",
    },
    href: "https://archive-proto-2026.hirotos.com",
  },
  {
    id: "demo01",
    title: "Noodle",
    category: { en: "Demo site", ja: "デモサイト" },
    image: "https://www.hirotos.com/projects/demo01.png",
    aspect: 3226 / 1716,
    role: {
      en: "DESIGN / FRONT-END DEVELOPMENT / 3D MODELING",
      ja: "デザイン / フロントエンド開発 / 3Dモデリング",
    },
    summary: {
      en: "3D motion demo focused on spatial composition and interaction.",
      ja: "空間構成とインタラクションにフォーカスした3Dモーションのデモサイト。",
    },
    href: "https://demo-01-3d-motion.hirotos.com",
  },
  {
    id: "track",
    title: "TRACK",
    category: { en: "Demo site", ja: "デモサイト" },
    image: "https://www.hirotos.com/projects/track.png",
    aspect: 1371 / 976,
    role: {
      en: "DESIGN / FRONT-END DEVELOPMENT / 3D MODELING",
      ja: "デザイン / フロントエンド開発 / 3Dモデリング",
    },
    summary: {
      en: "Demo site exploring project browsing and motion-driven interaction.",
      ja: "プロジェクト閲覧とモーションによるインタラクションを試したデモサイト。",
    },
    href: "https://demo-03-track.hirotos.com",
  },
  {
    id: "portfolio2022",
    title: "PORTFOLIO 2022",
    category: { en: "Web site", ja: "Webサイト" },
    image: "https://www.hirotos.com/projects/portfolio2022.png",
    aspect: 1500 / 1440,
    role: {
      en: "DESIGN / FRONT-END DEVELOPMENT",
      ja: "デザイン / フロントエンド開発",
    },
    summary: {
      en: "Earlier portfolio edition focused on editorial rhythm and spatial transitions.",
      ja: "エディトリアルなリズムと空間的な遷移にフォーカスした旧ポートフォリオ。",
    },
    href: "https://2022.hirotos.com",
  },
];

function PageReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

function SiteNav({ inverted = false }: { inverted?: boolean }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className={`fixed right-[clamp(14px,2.6vw,44px)] top-[clamp(18px,2.8vw,40px)] z-50 flex items-end gap-2 text-right uppercase tracking-[0.18em] ${
        inverted ? "text-[#1a1a1a]/60" : "text-[#0b0b0a]/45"
      }`}
    >
      <div className="flex flex-col items-end gap-2 text-[11px] font-medium sm:text-[12px]">
        {routes.map((route) => {
          const active = pathname === route.href;

          return (
            <Link
              key={route.href}
              href={route.href}
              aria-current={active ? "page" : undefined}
              className={`transition duration-200 hover:-translate-x-0.5 hover:opacity-100 ${
                active
                  ? inverted
                    ? "text-[#1a1a1a]"
                    : "text-[#0b0b0a]"
                  : ""
              }`}
            >
              {route.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function BackButton() {
  return (
    <Link
      href="/"
      aria-label="Back to home"
      className="inline-grid size-10 place-items-center rounded-full bg-[#0b0b0a] text-white transition duration-200 hover:scale-95 hover:bg-black sm:size-11"
    >
      <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2">
        <path d="M14 6.5 8.5 12 14 17.5" />
      </svg>
    </Link>
  );
}

function ExternalArrow({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <polygon points="7.7 17.7 6.3 16.3 14.6 8 7.7 8 9 6 18 6 18 15 16 16.3 16 9.4 7.7 17.7" />
    </svg>
  );
}

function LocaleToggle({
  value,
  onChange,
}: {
  value: Locale;
  onChange: (locale: Locale) => void;
}) {
  return (
    <div className="inline-flex gap-3 text-[12px] uppercase tracking-[0.18em] text-[#0b0b0a]/45">
      {(["en", "ja"] as const).map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => onChange(locale)}
          aria-pressed={value === locale}
          className={`transition duration-200 hover:-translate-y-0.5 hover:text-[#0b0b0a] ${
            value === locale ? "text-[#0b0b0a]" : ""
          }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function PageHeader({
  toggle,
}: {
  toggle?: React.ReactNode;
}) {
  return (
    <header className="grid grid-cols-[auto_1fr] items-center gap-6 pr-[clamp(120px,18vw,260px)] text-[12px] font-medium uppercase tracking-[0.18em] text-[#0b0b0a]/55 sm:grid-cols-[auto_auto]">
      <BackButton />
      {toggle ? <div>{toggle}</div> : <div className="hidden sm:block" />}
    </header>
  );
}

function DetailList({
  items,
  dark = false,
}: {
  items: { label: string; value: string }[];
  dark?: boolean;
}) {
  return (
    <dl className="grid gap-4 sm:grid-cols-3 sm:gap-6">
      {items.map((item) => (
        <div
          key={item.label}
          className={`border-t pt-3 ${
            dark ? "border-white/15" : "border-[#0b0b0a]/15"
          }`}
        >
          <dt className={dark ? "hiroto-meta-label-dark" : "hiroto-meta-label"}>
            {item.label}
          </dt>
          <dd className={`mt-2 text-[12px] font-medium uppercase tracking-[0.08em] sm:text-[13px] ${dark ? "text-[#1a1a1a]/80" : "text-[#0b0b0a]"}`}>
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function HomePage() {
  return (
    <>
      <SiteNav inverted />
      <PageReveal>
        <section className="hiroto-home relative min-h-screen overflow-hidden bg-[#f3f1ee] text-[#d8d0c4]">
          <div className="hiroto-home__noise" />
          <div className="hiroto-home__halo" />
          <div className="hiroto-home__beam" />
          <PrismaHeroBackground />

          <div className="relative z-10 grid min-h-screen grid-rows-[auto_1fr_auto] gap-10 px-[clamp(18px,5vw,54px)] py-[clamp(18px,4vw,40px)]">
            <div className="max-w-md self-start pt-[clamp(84px,12vw,144px)]">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.55 }}
                className="mb-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/70"
              >
                Creative Developer
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.7 }}
                className="max-w-md text-[clamp(38px,7vw,92px)] font-semibold uppercase leading-[0.92] tracking-[0.05em] text-[#111111]"
              >
                Hiroto Sato
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="pointer-events-none flex items-center justify-center"
            >
              <div className="h-[1px] w-full max-w-[480px] bg-[#1a1a1a]/20" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.7 }}
              className="self-end pb-2"
            >
              <DetailList
                dark
                items={[
                  { label: "Base", value: "Tokyo, Japan" },
                  { label: "Focus", value: "Creative development / Motion / 3D modeling" },
                  { label: "Index", value: "Portfolio 2026" },
                ]}
              />
            </motion.div>
          </div>
        </section>
      </PageReveal>
    </>
  );
}

export function AboutPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const copy = aboutCopy[locale];

  return (
    <>
      <SiteNav />
      <PageReveal>
        <section className="min-h-screen bg-white px-[clamp(18px,5vw,54px)] py-[clamp(18px,4vw,40px)] text-[#0b0b0a]">
          <div className="grid min-h-screen grid-rows-[auto_1fr] gap-10">
            <PageHeader toggle={<LocaleToggle value={locale} onChange={setLocale} />} />

            <div className="mx-auto flex w-full max-w-4xl flex-col justify-center pb-8 pt-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="mb-4 text-[12px] uppercase tracking-[0.2em] text-[#0b0b0a]/45">
                  {copy.eyebrow}
                </p>
                <h1 className="text-balance text-[clamp(34px,5vw,70px)] font-medium leading-[0.96] tracking-[-0.02em]">
                  {copy.title}
                </h1>
              </div>

              <div className="mx-auto mt-10 w-full max-w-3xl border-t border-[#0b0b0a]/15 pt-6 sm:mt-14 sm:pt-8">
                <p className="mx-auto max-w-2xl text-center text-[15px] leading-7 text-[#0b0b0a]/65 sm:text-[17px] sm:leading-8">
                  {copy.body}
                </p>

                <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-3 sm:gap-6">
                  <div className="border-t border-[#0b0b0a]/15 pt-3">
                    <dt className="hiroto-meta-label">{copy.nameLabel}</dt>
                    <dd className="mt-2 text-[13px] uppercase tracking-[0.08em] text-[#0b0b0a]/82">
                      {copy.nameValue}
                    </dd>
                  </div>
                  <div className="border-t border-[#0b0b0a]/15 pt-3">
                    <dt className="hiroto-meta-label">{copy.roleLabel}</dt>
                    <dd className="mt-2 text-[13px] uppercase tracking-[0.08em] text-[#0b0b0a]/82">
                      {copy.roleValue}
                    </dd>
                  </div>
                  <div className="border-t border-[#0b0b0a]/15 pt-3">
                    <dt className="hiroto-meta-label">{copy.contactLabel}</dt>
                    <dd className="mt-2 grid gap-2 text-[13px] text-[#0b0b0a]/82">
                      <a
                        href="mailto:sauravedu.official@gmail.com"
                        className="inline-flex items-center gap-2 transition hover:text-[#0b0b0a]"
                      >
                        <span>{copy.emailValue}</span>
                        <ExternalArrow className="size-4 fill-current" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/sauravkumar81"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 transition hover:text-[#0b0b0a]"
                      >
                        <span>{copy.linkedInValue}</span>
                        <ExternalArrow className="size-4 fill-current" />
                      </a>
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageReveal>
    </>
  );
}

export function ContactPage() {
  const links = [
    { href: "mailto:sauravedu.official@gmail.com", label: "sauravedu.official@gmail.com" },
    {
      href: "https://www.linkedin.com/in/sauravkumar81",
      label: "LinkedIn",
    },
  ];

  return (
    <>
      <SiteNav />
      <PageReveal>
        <section className="min-h-screen bg-white px-[clamp(18px,5vw,54px)] py-[clamp(18px,4vw,40px)] text-[#0b0b0a]">
          <div className="grid min-h-screen grid-rows-[auto_1fr] gap-10">
            <PageHeader />

            <div className="mx-auto flex w-full max-w-4xl flex-col justify-center pb-8 pt-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="mb-4 text-[12px] uppercase tracking-[0.2em] text-[#0b0b0a]/45">
                  Contact
                </p>
                <h1 className="text-[clamp(34px,5vw,74px)] font-medium leading-[0.96] tracking-[-0.02em]">
                  Get in touch.
                </h1>
              </div>

              <div className="mx-auto mt-10 w-full max-w-2xl border-t border-[#0b0b0a]/15 pt-5 sm:mt-14 sm:pt-6">
                <div className="grid justify-items-center gap-3">
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      className="group relative inline-flex max-w-full items-center justify-center text-center text-[22px] font-medium tracking-[-0.02em] text-[#0b0b0a] transition hover:text-black sm:text-[30px]"
                    >
                      <span className="break-all">{link.label}</span>
                      <ExternalArrow className="absolute left-[calc(100%+10px)] top-1/2 size-5 -translate-y-1/2 fill-current transition duration-200 group-hover:translate-x-1 sm:size-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageReveal>
    </>
  );
}

export function ProjectsPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(projects[0]?.id ?? null);

  const selected = useMemo(
    () => projects.find((project) => project.id === selectedId) ?? null,
    [selectedId],
  );
  const hovered = useMemo(
    () => projects.find((project) => project.id === hoveredId) ?? projects[0],
    [hoveredId],
  );
  const ui = projectUi[locale];
  const marqueeProjects = [...projects, ...projects];

  return (
    <>
      <SiteNav />
      <PageReveal>
        <section className="min-h-screen overflow-hidden bg-[#f7f5ef] px-[clamp(18px,5vw,54px)] py-[clamp(18px,4vw,40px)] text-[#0b0b0a]">
          <div className="grid min-h-screen grid-rows-[auto_auto_1fr_auto] gap-6 sm:gap-8">
            <PageHeader toggle={<LocaleToggle value={locale} onChange={setLocale} />} />

            <div className="max-w-xl pt-4 sm:pt-6">
              <p className="mb-4 text-[12px] uppercase tracking-[0.2em] text-[#0b0b0a]/45">
                Projects
              </p>
              <h1 className="text-[clamp(30px,4vw,64px)] font-medium leading-[1.04] tracking-[-0.02em]">
                {projectHeading.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </div>

            <div className="relative -mx-[clamp(18px,5vw,54px)] overflow-hidden py-2">
              <div className="hiroto-marquee flex gap-5 px-[clamp(18px,5vw,54px)] sm:gap-7">
                {marqueeProjects.map((project, index) => {
                  const tall = index % 4 === 1 || index % 4 === 3;
                  const wide = index % 5 === 2;

                  return (
                    <button
                      key={`${project.id}-${index}`}
                      type="button"
                      onClick={() => setSelectedId(project.id)}
                      onMouseEnter={() => setHoveredId(project.id)}
                      onFocus={() => setHoveredId(project.id)}
                      className={`group relative shrink-0 overflow-hidden bg-[#e9e6df] transition duration-300 hover:-translate-y-1 hover:opacity-100 ${
                        tall
                          ? "w-[180px] sm:w-[220px]"
                          : wide
                            ? "w-[320px] sm:w-[420px]"
                            : "w-[250px] sm:w-[320px]"
                      }`}
                      style={{ aspectRatio: tall ? "4 / 5.4" : wide ? "16 / 9" : "4 / 3" }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="min-h-12">
              {hovered ? (
                <div className="max-w-md">
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-[#0b0b0a]/48 sm:text-[12px]">
                    {hovered.category[locale]} / {hovered.role[locale]}
                  </span>
                  <strong className="mt-2 block text-[16px] font-medium sm:text-[18px]">
                    {hovered.title}
                  </strong>
                </div>
              ) : null}
            </div>
          </div>

          <AnimatePresence>
            {selected ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[70] bg-white/92 p-[clamp(18px,4vw,40px)] backdrop-blur-md"
              >
                <div className="grid h-full grid-rows-[auto_1fr_auto] gap-6 lg:grid-cols-[minmax(280px,440px)_minmax(0,1fr)] lg:grid-rows-[1fr_auto] lg:items-center lg:gap-10">
                  <div className="flex items-center justify-between lg:absolute lg:left-[clamp(18px,4vw,40px)] lg:top-[clamp(18px,4vw,40px)] lg:z-10 lg:gap-6">
                    <button
                      type="button"
                      aria-label="Close project preview"
                      onClick={() => setSelectedId(null)}
                      className="inline-grid size-10 place-items-center rounded-full bg-[#0b0b0a] text-white transition duration-200 hover:scale-95 hover:bg-black sm:size-11"
                    >
                      <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2">
                        <path d="m7 7 10 10M17 7 7 17" />
                      </svg>
                    </button>
                    <div className="hidden lg:block">
                      <LocaleToggle value={locale} onChange={setLocale} />
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 18 }}
                    transition={{ duration: 0.45 }}
                    className="order-2 lg:order-1 lg:max-w-[440px]"
                  >
                    <span className="block text-[12px] uppercase tracking-[0.18em] text-[#0b0b0a]/45">
                      {String(projects.findIndex((project) => project.id === selected.id) + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-4 text-balance text-[clamp(34px,5vw,70px)] font-medium leading-[0.9] tracking-[-0.03em]">
                      {selected.title}
                    </h2>
                    <p className="mt-5 max-w-lg text-[15px] leading-7 text-[#0b0b0a]/68 sm:text-[17px] sm:leading-8">
                      {selected.summary[locale]}
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      <div className="border-t border-[#0b0b0a]/15 pt-3">
                        <dt className="hiroto-meta-label">{ui.category}</dt>
                        <dd className="mt-2 text-[13px] uppercase tracking-[0.08em] text-[#0b0b0a]/85">
                          {selected.category[locale]}
                        </dd>
                      </div>
                      <div className="border-t border-[#0b0b0a]/15 pt-3">
                        <dt className="hiroto-meta-label">{ui.role}</dt>
                        <dd className="mt-2 text-[13px] uppercase tracking-[0.08em] text-[#0b0b0a]/85">
                          {selected.role[locale]}
                        </dd>
                      </div>
                    </div>

                    <a
                      href={selected.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex min-h-10 items-center justify-center rounded-full border border-[#0b0b0a]/25 px-5 text-[12px] font-medium uppercase tracking-[0.18em] text-[#0b0b0a] transition hover:-translate-y-0.5 hover:bg-[#0b0b0a] hover:text-white"
                    >
                      {ui.viewProject}
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45 }}
                    className="order-1 overflow-hidden bg-[#e9e6df] lg:order-2 lg:justify-self-end"
                    style={{ aspectRatio: "16 / 10" }}
                  >
                    <img
                      src={selected.image}
                      alt={selected.title}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>

                  <ul
                    aria-label={ui.ariaProjectSelector}
                    className="order-3 flex gap-2 overflow-x-auto pb-1 lg:col-span-2 lg:justify-end"
                  >
                    {projects.map((project) => (
                      <li key={project.id} className="shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedId(project.id)}
                          className={`overflow-hidden transition duration-200 ${
                            project.id === selected.id
                              ? "opacity-100"
                              : "opacity-35 hover:-translate-y-0.5 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-16 w-24 object-cover"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </section>
      </PageReveal>
    </>
  );
}
