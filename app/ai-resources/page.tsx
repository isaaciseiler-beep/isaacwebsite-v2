// app/ai-resources/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Isaac's AI Resources",
  robots: { index: false, follow: false },
};

type Item = {
  title: string;
  href: string;
  desc: string;
  source?: string | string[]; // pill(s) under title (except Publications)
};

type Section = {
  name: string;
  items: Item[];
};

const SECTIONS: Section[] = [
  {
    name: "Trainings 🏋",
    items: [
      {
        title: "OpenAI Forum",
        source: "OpenAI",
        href: "https://forum.openai.com/home",
        desc: "Community discussions on best practices, workflows, and problem-solving with OpenAI tools. Great when you want examples from real users and quick answers to common questions. Application required to join",
      },
      {
        title: "Anthropic Academy",
        source: "Anthropic",
        href: "https://www.anthropic.com/learn",
        desc: "Guides and training materials on using Claude effectively and responsibly. Lots of technical explainations of LLMs, model behavior, and more - all for free.",
      },
      {
        title: "OpenAI Academy",
        source: "OpenAI",
        href: "https://academy.openai.com/",
        desc: "Courses on AI and how to maximize ChatGPT, all for free, curated by experts. Included topics: prompt engineering, education, journalism, and more.",
      },
      {
        title: "OpenAI K–12 Educators Group",
        source: "OpenAI",
        href: "https://academy.openai.com/home/clubs/k-12-education-aacga/overview",
        desc: "Educator-focused community group with recorded sessions and classroom-ready ideas. Useful for seeing how teachers leverage AI in their work.",
      },
      {
        title: "Google AI Trainings",
        source: "Google",
        href: "https://grow.google/ai/",
        desc: "Free AI courses from Google focusing on upskilling using Gemini and getting a vocabulary for what AI tools can (and can’t) do.",
      },
      {
        title: "How Transformer LLMs Work",
        source: "DeepLearning.AI",
        href: "https://www.deeplearning.ai/short-courses/how-transformer-llms-work/",
        desc: "A quick 101 on how Large Language Models, the technical innovation that makes tools like ChatGPT possible, work and function under the surface.",
      },
      {
        title: "Codecademy: Intro to OpenAI GPT API",
        source: "Codecademy",
        href: "https://www.codecademy.com/learn/intro-to-open-ai-gpt-api",
        desc: "Learn how to plug in OpenAI's models in different projects, for free. Great starter if you want to build technical skills!",
      },
    ],
  },
  {
    name: "News 🗞️",
    items: [
      {
        title: "Platformer",
        href: "https://www.platformer.news/",
        desc: "A news publication run by Casey Newton, a veteran reporter. He and his team primarily focus on AI, and have an excellent paid and free newsletter.",
      },
      {
        title: "Ben’s Bites",
        href: "https://www.bensbites.com/",
        desc: "If you want to understand the latest controverseys, products, companies, and developments in the AI industry, this is the Substack to subscribe to.",
      },
      {
        title: "The Verge",
        href: "https://www.theverge.com/",
        desc: "This is by far my favorite tech publication. There's high quality reporting on AI, and it is well worth the pretty menial subscription fee.",
      },
      {
        title: "Sources",
        href: "https://sources.news/p/introducing-sources",
        desc: "The ex-Verge reporter, Alex Heath, started this Substack earlier this year and regularly breaks news on his newsletter.",
      },
    ],
  },
  {
    name: "Reading 📖",
    items: [
      {
        title: "Co-Intelligence",
        source: "Ethan Mollick",
        href: "https://www.penguinrandomhouse.com/books/741805/co-intelligence-by-ethan-mollick/",
        desc: "A  guide to collaborating with AI in work and education. Focuses on habits that improve results: clear goals, iteration, verification, and building AI into workflows.",
      },
      {
        title: "Empire of AI",
        source: "Karen Hao",
        href: "https://www.penguinrandomhouse.com/books/743569/empire-of-ai-by-karen-hao/",
        desc: "Investigative reporting on the LLM-powered AI industry - particularly OpenAI. Hao is critical of the AI industry, but regardless of where you are coming from, her work is helpful context.",
      },
      {
        title: "AI 2027",
        source: [
          "Daniel Kokotajlo",
          "Scott Alexander",
          "Thomas Larsen",
          "Eli Lifland",
          "Romeo Dean",
        ],
        href: "https://ai-2027.com/",
        desc: "Scary projections of the impacts of superintelligence.",
      },
      {
        title: "A Brief History of Intelligence",
        source: "Max Bennett",
        href: "https://www.amazon.com/Brief-History-Intelligence-Humans-Breakthroughs/dp/0063286343",
        desc: "Big-picture context on intelligence across disciplines.",
      },
      {
        title: "The Alignment Problem",
        source: "Brian Christian",
        href: "https://www.amazon.com/Brief-History-Intelligence-Humans-Breakthroughs/dp/0063286343",
        desc: "History of modern AI that argues the real danger isn’t rogue machines, but our failure distill and embed human values.",
      },
      {
        title: "Artificial Intelligence: A Guide for Thinking Humans",
        source: "Melanie Mitchell",
        href: "https://www.amazon.com/Brief-History-Intelligence-Humans-Breakthroughs/dp/0063286343",
        desc: "Clear explanation of how AI works, what its limits are, and disagreements on development in the field.",
      },
      {
        title: "The Algorithm",
        source: "Hilke Schellmann",
        href: "https://www.amazon.com/Algorithm-Decides-Hired-Monitored-Promoted/dp/0593713110",
        desc: "A reporting-driven look at how AI is already used in hiring and management, showing real potential harms at work.",
      },
      {
        title: "Progressive Capitalism",
        source: "Ro Khanna",
        href: "https://www.amazon.com/Progressive-Capitalism-Make-Tech-Work/dp/198219186X",
        desc: "A policy argument for governing AI so economic gains are shared broadly.",
      },
      {
        title: "AI 2041",
        source: "Kai-Fu Lee and Chen Qiufan",
        href: "https://www.amazon.com/AI-2041-Ten-Visions-Future/dp/0593132460",
        desc: "Speculative short stories paired with technical analysis to explore plausible AI futures.",
      },
    ],
  },
  {
    name: "Articles 📰",
    items: [
      {
        title: "It’s the great AGI rebrand",
        source: "Hayden Field",
        href: "https://www.theverge.com/ai-artificial-intelligence/845890/ai-companies-rebrand-agi-artificial-general-intelligence",
        desc: "Explains the shift away from “AGI” as common terminology.",
      },
      {
        title: "The companies making the most money from AI",
        source: ["Josh Dzieza", "Hayden Field"],
        href: "https://www.theverge.com/cs/features/831818/ai-mercor-handshake-scale-surge-staffing-companies",
        desc: "A deep look at the ecosystem powering frontier AI, who benefits first, and what scale requires behind the scenes.",
      },
      {
        title: "It’s their job to keep AI from destroying everything",
        source: "Hayden Field",
        href: "https://www.theverge.com/ai-artificial-intelligence/836335/anthropic-societal-impacts-team-ai-claude-effects",
        desc: "An insider look at Anthropic's safety team.",
      },
      {
        title: "A Teen Was Suicidal. ChatGPT Was the Friend He Confided In.",
        source: "Kashmir Hill",
        href: "https://www.nytimes.com/2025/08/26/technology/chatgpt-openai-suicide.html",
        desc: "The tragic story of what happens when LLMs go off the rails, and a reminder of how critical LLM safety is",
      },
      {
        title: "When your AI boyfriend gets you better than your spouse",
        source: "Noel King",
        href: "https://www.vox.com/podcasts/471982/chatgpt-boyfriend-love-dating-ai",
        desc: "Explores synthetic AI companions and the pitfalls of “always available” conversational LLM-powered partners.",
      },
    ],
  },
  {
    name: "Videos 📺",
    items: [
      {
        title: "Stanford CS229: Building LLMs",
        source: "Stanford University",
        href: "https://www.youtube.com/watch?v=9vM4p9NN0Ts",
        desc: "The best explanation of LLMs that exists. It's a long watch, but is well worth it.",
      },
      {
        title: "How AI Systems Reason",
        source: "Dwarkesh Patel",
        href: "https://www.youtube.com/watch?v=64lXQP6cs5M",
        desc: "Visual walkthrough of modern AI capabilities and limitations, with concrete examples. Good for building intuition about why models can sound confident while still being wrong.",
      },
    ],
  },
  {
    name: "Podcasts 🎧",
    items: [
      {
        title: "The Vergecast",
        source: "The Verge",
        href: "https://www.theverge.com/the-vergecast",
        desc: "Freeform discussion on AI, policy, and tech - great starter podcast if you don't already listen to tech news.",
      },
      {
        title: "Access",
        source: "Vox",
        href: "https://podcasts.voxmedia.com/show/access",
        desc: "Features conversations between two Silicon Valley insiders and CEOs from some of the most important tech and AI companies.",
      },
      {
        title: "Hard Fork",
        source: "The New York Times",
        href: "https://www.nytimes.com/column/hard-fork",
        desc: "NYT’s tech podcast covering AI. One of the best podcasts to keep up with developments in AI.",
      },
      {
        title: "She Fell in Love With ChatGPT — An Update",
        source: "The Dailty",
        href: "https://podcasts.apple.com/tw/podcast/she-fell-in-love-with-chatgpt-an-update/id1200361736?i=1000743300165",
        desc: "NYT reporter Kashmir Hill on relationships with chatbots. Primary theme: fallout and limitations of synthetic companionship.",
      },
      {
        title: "Trapped in a ChatGPT Spiral",
        source: "The Daily",
        href: "https://www.youtube.com/watch?v=AxQVf7Ikaso",
        desc: "A story that highlights the dark side of LLMs, and the urgent work that needs to be done to safeguard them.",
      },
      {
        title: "OpenAI Podcast",
        source: "OpenAI",
        href: "https://openai.com/podcast/",
        desc: "OpenAI's podcast that serves as a good way to keep up with new products and hear from the people who built them.",
      },
    ],
  },
  {
    name: "Tools 🧰",
    items: [
      {
        title: "Dia Browser",
        source: "The Browser Company",
        href: "https://www.diabrowser.com/invite/N1M0E0",
        desc: "This is my favorite AI application - a browser I use on my laptop. Feel free to use my referral link to join for free.",
      },
      {
        title: "Claude",
        source: "Anthropic",
        href: "https://claude.ai/new",
        desc: "Conversational AI often used for writing, analysis, and longer context tasks. Useful as a second model to compare outputs and reduce single-tool dependence.",
      },
      {
        title: "ChatGPT Desktop App",
        source: "OpenAI",
        href: "https://chatgpt.com/features/desktop/",
        desc: "Test out ChatGPT's desktop app - download for free!",
      },
      {
        title: "Claude Code",
        source: "Anthropic",
        href: "https://claude.com/product/claude-code",
        desc: "Agentic coding tool that can edit files, run commands, and help debug within your workflow. Helpful for turning natural-language changes into real code safely and iteratively.",
      },
      {
        title: "Cursor",
        source: "Cursor",
        href: "https://cursor.com/home?from=agents",
        desc: "AI code editor with agent workflows for planning, editing, and refactoring across projects. Useful if you want an IDE experience where AI can understand and change multiple files.",
      },
      {
        title: "Perplexity",
        source: "Perplexity",
        href: "https://www.perplexity.ai/",
        desc: "AI-powered search that is designed to replace traditional search engines. Useful for quick research and getting a starting set of links to verify claims.",
      },
      {
        title: "Gemini",
        source: "Google",
        href: "https://gemini.google/students/",
        desc: "Google's LLM offering: make sure to check out free trials they often run for students, around holidays, or at other times of the year",
      },
      {
        title: "NotebookLM",
        source: "Google",
        href: "https://notebooklm.google/",
        desc: "Makes podcasts out of whatever sources you want, for free.",
      },
      {
        title: "ChatGPT Study Mode",
        source: "OpenAI",
        href: "https://openai.com/index/chatgpt-study-mode/",
        desc: "This feature from ChatGPT is designed to maximize learning, witholding answers and testing knowledge.",
      },
      {
        title: "Deep Research with ChatGPT",
        source: "OpenAI",
        href: "https://openai.com/index/introducing-deep-research/",
        desc: "Describes an agentic workflow for multi-step research with citations and synthesis. Helpful if you want a repeatable way to explore a topic and track sources in one place.",
      },
      {
        title: "OpenAI Agent Builder Guide",
        source: "OpenAI",
        href: "https://platform.openai.com/docs/guides/agent-builder",
        desc: "101 intro for OpenAI's Agent Builder.",
      },
    ],
  },
];

function Pill({ text }: { text: string }) {
  return (
    <span
      className={[
        "inline-flex w-fit max-w-full self-start",
        "whitespace-normal break-words",
        "rounded-full border border-black/10",
        "bg-white text-black/90",
        "px-2.5 py-1",
        "text-[12px] leading-[1.15]",
      ].join(" ")}
    >
      {text}
    </span>
  );
}

function SourcePills({ source }: { source: Item["source"] }) {
  if (!source) return null;
  const arr = Array.isArray(source) ? source : [source];

  return (
    <div className="flex flex-wrap gap-2">
      {arr.map((name) => (
        <Pill key={name} text={name} />
      ))}
    </div>
  );
}

function SectionRail({ name, items }: { name: string; items: Item[] }) {
  const showPills = name !== "Publications";

  return (
    <section className="mt-12">
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <h2 className="text-[22px] tracking-[-0.01em]">{name}</h2>
      </div>

      <div className="relative">
        <div className="relative -mx-6 sm:-mx-10">
          <div
            className={[
              "railScroller",
              "flex gap-3",
              "overflow-x-auto overflow-y-hidden",
              "px-6 sm:px-10", // aligns start with header buffer
              "snap-x snap-mandatory",
              "overscroll-x-contain",
              "[-ms-overflow-style:none] [scrollbar-width:none]",
              "pb-3",
              "scroll-smooth",
              "touch-pan-x touch-pan-y",
              "[scroll-padding-left:24px] [scroll-padding-right:24px]",
              "sm:[scroll-padding-left:40px] sm:[scroll-padding-right:40px]",
              "[-webkit-overflow-scrolling:touch]",
              "[&::-webkit-scrollbar]:hidden",
            ].join(" ")}
            aria-label={name}
          >
            {items.map((it) => (
              <a
                key={it.href + it.title}
                href={it.href}
                target="_blank"
                rel="noreferrer"
                className={[
                  "snap-start shrink-0",
                  "bg-[#000000] border border-[#232327]",
                  "rounded-[22px] p-4",
                  "w-[196px] sm:w-[220px] lg:w-[240px]",
                  "aspect-[9/16] min-h-[340px]",
                  "flex flex-col",
                  "hover:border-[#3a3a40] transition-colors",
                ].join(" ")}
              >
                <div className="grid gap-2">
                  <div className="text-[22px] sm:text-[26px] font-[580] leading-[1.12] tracking-[-0.01em]">
                    {it.title}
                  </div>

                  {showPills ? <SourcePills source={it.source} /> : null}
                </div>

                <div className="mt-auto text-[#a1a1aa] text-[14px] sm:text-[15px] leading-[1.6]">
                  {it.desc}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AiResourcesPage() {
  return (
    <div className="w-full overflow-x-hidden px-6 sm:px-10 pt-10 pb-20">
      <header className="mx-auto w-full max-w-[1100px] lg:max-w-[1200px] 2xl:max-w-[1400px]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#a1a1aa] mb-5"
        >
          <span className="text-sm">←</span>
          <span className="text-sm">Go to main site</span>
        </Link>

        <h1 className="text-[42px] sm:text-[60px] leading-[1.02] tracking-[-0.03em] m-0">
          Isaac&apos;s AI Resources
        </h1>

        <div className="text-[#a1a1aa] text-[16px] sm:text-[17px] leading-[1.55] mt-3">
          Getting the most out of Generative AI
        </div>

        <div className="mt-6 grid gap-3">
          <a
            href="https://www.linkedin.com/in/isaacseiler/"
            target="_blank"
            rel="noreferrer"
            className="bg-[#141416] border border-[#232327] rounded-[18px] px-4 py-3 flex items-center justify-between hover:border-[#3a3a40] transition-colors"
          >
            <span>Connect with me</span>
            <span>↗</span>
          </a>
          <a
            href="https://www.canva.com/design/DAG8YdaFsts/jond_Q6Px5_qtZezEkoF_Q/edit?utm_content=DAG8YdaFsts&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
            target="_blank"
            rel="noreferrer"
            className="bg-[#141416] border border-[#232327] rounded-[18px] px-4 py-3 flex items-center justify-between hover:border-[#3a3a40] transition-colors"
          >
            <span>Slides to workshop presentation</span>
            <span>↗</span>
          </a>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1100px] lg:max-w-[1200px] 2xl:max-w-[1400px]">
        {SECTIONS.map((s) => (
          <SectionRail key={s.name} name={s.name} items={s.items} />
        ))}
      </div>
    </div>
  );
}
