// app/ai-resources/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Isaac's AI Resources",
  description: "Getting the most out of Generative AI",
  robots: { index: false, follow: false }, // hosted, but not meant to be discoverable
};

type Item = {
  title: string;
  href: string;
  desc: string;
  source?: string; // shown as a pill under the title (except Publications)
};

type Section = {
  name: string;
  items: Item[];
};

const SECTIONS: Section[] = [
  {
    name: "Trainings",
    items: [
      {
        title: "OpenAI Forum",
        source: "OpenAI",
        href: "https://forum.openai.com/home",
        desc: "Community discussions on best practices, workflows, and problem-solving with OpenAI tools. Great when you want examples from real users and quick answers to common questions.",
      },
      {
        title: "OpenAI Academy",
        source: "OpenAI",
        href: "https://academy.openai.com/",
        desc: "Structured learning paths on prompting, practical use cases, and responsible adoption. A solid starting point if you want a guided sequence rather than scattered tips.",
      },
      {
        title: "OpenAI K–12 Educators Group",
        source: "OpenAI",
        href: "https://academy.openai.com/home/clubs/k-12-education-aacga/overview",
        desc: "Educator-focused club with examples, recorded sessions, and classroom-ready ideas. Useful for seeing how other teachers design assignments, guardrails, and policies.",
      },
      {
        title: "Getting Started with ChatGPT Edu",
        source: "OpenAI",
        href: "https://academy.openai.com/home/clubs/k-12-education-aacga/videos/getting-started-with-chatgpt-edu-2025-05-06",
        desc: "Intro recording covering what ChatGPT Edu is, how schools use it, and practical ways to start. Helpful if you’re setting norms for students and staff from day one.",
      },
      {
        title: "ChatGPT Fundamentals",
        source: "OpenAI",
        href: "https://academy.openai.com/home/clubs/work-users-ynjqu/resources/chatgpt-basics",
        desc: "Core concepts for getting value fast: clear instructions, iteration, and checking outputs. Good as a baseline before exploring more advanced prompting patterns.",
      },
      {
        title: "Prompting Training",
        source: "OpenAI",
        href: "https://academy.openai.com/home/clubs/work-users-ynjqu/resources/prompting",
        desc: "Tactics for writing prompts that are specific, constrained, and repeatable. Includes patterns like roles, examples, checklists, and feedback loops to improve consistency.",
      },
      {
        title: "ChatGPT 101",
        source: "OpenAI",
        href: "https://academy.openai.com/home/clubs/work-users-ynjqu/videos/chatgpt-101-a-guide-to-your-ai-superassistant-recording",
        desc: "A practical walkthrough of everyday workflows (drafting, planning, rewriting, summarizing). Great for building a small set of reliable “go-to” prompts for work and school.",
      },
      {
        title: "ChatGPT 102",
        source: "OpenAI",
        href: "https://academy.openai.com/home/clubs/work-users-ynjqu/videos/chatgpt-102-leveraging-ai-to-do-your-best-work-recording",
        desc: "More advanced techniques: multi-step prompting, evaluation, and using AI as a collaborator. Helpful for projects where quality control and revision cycles matter.",
      },
      {
        title: "Anthropic Academy",
        source: "Anthropic",
        href: "https://www.anthropic.com/learn",
        desc: "Guides and training materials on using LLMs effectively and responsibly. Especially useful for understanding model behavior, safety concepts, and real-world limitations.",
      },
      {
        title: "Teaching AI Fluency",
        source: "Anthropic",
        href: "https://anthropic.skilljar.com/teaching-ai-fluency",
        desc: "Professional development designed for educators teaching AI literacy. Focuses on practical classroom integration, student skills, and avoiding common failure modes.",
      },
      {
        title: "Google AI Trainings",
        source: "Google",
        href: "https://grow.google/ai/",
        desc: "Free AI courses and short modules focused on real-world application. Good for quick upskilling and getting a vocabulary for what tools can (and can’t) do.",
      },
      {
        title: "How Transformer LLMs Work",
        source: "DeepLearning.AI",
        href: "https://www.deeplearning.ai/short-courses/how-transformer-llms-work/",
        desc: "Accessible explanation of how transformer-based language models are trained and why they behave the way they do. Great for demystifying hallucinations, context limits, and grounding.",
      },
      {
        title: "Codecademy: Intro to OpenAI GPT API",
        source: "Codecademy",
        href: "https://www.codecademy.com/learn/intro-to-open-ai-gpt-api",
        desc: "Learn how to plug in OpenAI's models in different projects, for free.",
      },
    ],
  },
  {
    name: "Publications",
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
    ],
  },
  {
    name: "Books",
    items: [
      {
        title: "Co-Intelligence — Ethan Mollick",
        source: "Book",
        href: "https://www.penguinrandomhouse.com/books/741805/co-intelligence-by-ethan-mollick/",
        desc: "A practical guide to collaborating with AI in work and education. Focuses on habits that improve results: clear goals, iteration, verification, and building AI into real workflows.",
      },
      {
        title: "Empire of AI — Karen Hao",
        source: "Book",
        href: "https://www.penguinrandomhouse.com/books/743569/empire-of-ai-by-karen-hao/",
        desc: "Investigative reporting on power, labor, and politics behind the AI industry. particularly OpenAI. Hao is critical of the AI industry, but regardless of where you are coming from, her work is helpful context..",
      },
      {
        title: "A Brief History of Intelligence — Max Bennett",
        source: "Book",
        href: "https://www.amazon.com/Brief-History-Intelligence-Humans-Breakthroughs/dp/0063286343",
        desc: "Big-picture context on intelligence across biology, history, and computation. Useful for grounding AI hype in longer arcs of cognition, tools, and societal change.",
      },
    ],
  },
  {
    name: "Articles",
    items: [
      {
        title: "It’s the great AGI rebrand — Hayden Field",
        source: "The Verge",
        href: "https://www.theverge.com/ai-artificial-intelligence/845890/ai-companies-rebrand-agi-artificial-general-intelligence",
        desc: "Explains why major labs are shifting away from “AGI” language and what they’re emphasizing instead. Useful for decoding marketing terms and evaluating claims more clearly.",
      },
      {
        title: "The companies making the most money from AI — Josh Dzieza & Hayden Field",
        source: "The Verge",
        href: "https://www.theverge.com/cs/features/831818/ai-mercor-handshake-scale-surge-staffing-companies",
        desc: "A deep look at the ecosystem of data, labor, and vendors powering frontier AI. Helpful for seeing who benefits first—and what scale actually requires behind the scenes.",
      },
      {
        title: "It’s their job to keep AI from destroying everything — Hayden Field",
        source: "The Verge",
        href: "https://www.theverge.com/ai-artificial-intelligence/836335/anthropic-societal-impacts-team-ai-claude-effects",
        desc: "Inside a team focused on societal impacts: persuasion, manipulation, labor displacement, and safety. Good for thinking about AI as a social system, not just a tool.",
      },
      {
        title: "Introducing study mode — OpenAI",
        source: "OpenAI",
        href: "https://openai.com/index/chatgpt-study-mode/",
        desc: "Overview of a learning-focused ChatGPT experience intended to support step-by-step practice. Useful if you’re designing assignments or studying and want more structure than freeform chat.",
      },
      {
        title: "Introducing deep research — OpenAI",
        source: "OpenAI",
        href: "https://openai.com/index/introducing-deep-research/",
        desc: "Describes an agentic workflow for multi-step research with citations and synthesis. Helpful if you want a repeatable way to explore a topic and track sources in one place.",
      },
      {
        title: "A Teen Was Suicidal. ChatGPT Was the Friend He Confided In. — Kashmir Hill",
        source: "The New York Times",
        href: "https://www.nytimes.com/2025/08/26/technology/chatgpt-openai-suicide.html",
        desc: "Reporting on how vulnerable users can be influenced by AI systems in high-stakes moments. A strong reminder to set boundaries, avoid over-trusting outputs, and prioritize human support.",
      },
      {
        title: "When your AI boyfriend gets you better than your spouse — Noel King",
        source: "Vox",
        href: "https://www.vox.com/podcasts/471982/chatgpt-boyfriend-love-dating-ai",
        desc: "Explores AI companions and the tradeoffs of “always available” conversational partners. Useful for thinking about attachment, persuasion, and where the line is between comfort and dependency.",
      },
    ],
  },
  {
    name: "Videos",
    items: [
      {
        title: "Stanford CS229: Building LLMs",
        source: "YouTube",
        href: "https://www.youtube.com/watch?v=9vM4p9NN0Ts",
        desc: "A technical overview of how large language models are trained and evaluated. Best for viewers who want more than metaphors and are okay with some ML vocabulary.",
      },
      {
        title: "How AI Systems Reason",
        source: "YouTube",
        href: "https://www.youtube.com/watch?v=64lXQP6cs5M",
        desc: "Visual walkthrough of modern AI capabilities and limitations, with concrete examples. Good for building intuition about why models can sound confident while still being wrong.",
      },
      {
        title: "Trapped in a ChatGPT Spiral",
        source: "YouTube",
        href: "https://www.youtube.com/watch?v=AxQVf7Ikaso",
        desc: "A reported audio story about heavy chatbot use and how feedback loops can become harmful. Useful for discussing boundaries, guardrails, and mental-health-adjacent risks.",
      },
    ],
  },
  {
    name: "Podcasts",
    items: [
      {
        title: "OpenAI Podcast",
        source: "OpenAI",
        href: "https://openai.com/podcast/",
        desc: "Conversations with researchers and builders about how AI is developed and deployed. Good for hearing technical ideas explained through real product and research decisions.",
      },
      {
        title: "The Vergecast",
        source: "The Verge",
        href: "https://www.theverge.com/the-vergecast",
        desc: "Weekly discussion of tech news, culture, and AI storylines. Good if you want context and debate rather than just headlines.",
      },
      {
        title: "Access (Vox)",
        source: "Vox",
        href: "https://podcasts.voxmedia.com/show/access",
        desc: "Explores how technology shapes power, work, and access in everyday life. Useful for connecting AI to broader questions about society, inequality, and institutions.",
      },
      {
        title: "Hard Fork (NYT)",
        source: "The New York Times",
        href: "https://www.nytimes.com/column/hard-fork",
        desc: "NYT’s tech audio + newsletter covering AI, business, and internet culture. Good for staying current with thoughtful reporting and occasional skepticism.",
      },
      {
        title: "The Daily: She Fell in Love With ChatGPT — An Update",
        source: "Apple Podcasts",
        href: "https://podcasts.apple.com/tw/podcast/she-fell-in-love-with-chatgpt-an-update/id1200361736?i=1000743300165",
        desc: "Follow-up episode featuring NYT reporter Kashmir Hill on relationships with chatbots. Useful for discussing companionship, vulnerability, and how “helpful” can blur into dependence.",
      },
    ],
  },
  {
    name: "Tools",
    items: [
      {
        title: "ChatGPT Desktop",
        source: "OpenAI",
        href: "https://chatgpt.com/features/desktop/",
        desc: "Native desktop app experience for ChatGPT, designed for faster switching and daily use. Helpful if you use AI alongside docs, email, lesson planning, or coding workflows.",
      },
      {
        title: "Claude",
        source: "Anthropic",
        href: "https://claude.ai/new",
        desc: "Conversational AI often used for writing, analysis, and longer context tasks. Useful as a second model to compare outputs and reduce single-tool dependence.",
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
        desc: "AI-powered search that emphasizes sources and citations. Useful for quick research, triangulation, and getting a starting set of links to verify claims.",
      },
      {
        title: "Mistral",
        source: "Mistral",
        href: "https://mistral.ai/",
        desc: "Model provider with both open and commercial offerings. Useful for learning the broader LLM landscape beyond the most common consumer tools.",
      },
      {
        title: "Gemini",
        source: "Google",
        href: "https://gemini.google/students/",
        desc: "Google’s multimodal AI tools aimed at students and everyday tasks. Useful for comparing capabilities across ecosystems, especially if you already use Google Workspace.",
      },
      {
        title: "NotebookLM",
        source: "Google",
        href: "https://notebooklm.google/",
        desc: "Research and note assistant grounded in your uploaded sources. Great for turning a stack of PDFs/notes into summaries, Q&A, and study guides with less hallucination risk.",
      },
      {
        title: "Dia Browser",
        source: "Dia",
        href: "https://www.diabrowser.com/invite/N1M0E0",
        desc: "AI-first browser concept designed to help you search, summarize, and act faster. Useful if you live in tabs and want lighter-weight summarization built into browsing.",
      },
      {
        title: "Lovable",
        source: "Lovable",
        href: "https://lovable.dev/",
        desc: "AI-powered app and prototype builder for quick iteration and simple deployments. Useful for turning an idea into a working demo without a full engineering workflow.",
      },
      {
        title: "OpenAI Agent Builder Guide",
        source: "OpenAI",
        href: "https://platform.openai.com/docs/guides/agent-builder",
        desc: "Documentation for building tool-using agents with structured workflows. Useful if you want your AI to do multi-step tasks that involve retrieval, tools, and guardrails.",
      },
    ],
  },
  {
    name: "Additional Resources",
    items: [
      {
        title: "openai.com",
        source: "OpenAI",
        href: "https://openai.com/",
        desc: "Official research updates, product announcements, and safety notes from OpenAI. Useful for primary-source reading rather than secondhand summaries.",
      },
    ],
  },
];

function Pill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 px-2.5 py-1 text-[12px] leading-none text-white/80">
      {text}
    </span>
  );
}

function SectionRail({
  name,
  items,
  bleedClass,
}: {
  name: string;
  items: Item[];
  bleedClass: string;
}) {
  const showPills = name !== "Publications";

  return (
    <section className="mt-12">
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <h2 className="text-[22px] tracking-[-0.01em]">{name}</h2>
      </div>

      {/* bleed past the side padding so cards can be seen “above” the buffers,
          but keep the first card aligned to the same buffer via inner padding */}
      <div className={bleedClass}>
        <div
          className={[
            "flex gap-3 overflow-x-auto pr-1 pb-3",
            "snap-x snap-mandatory",
            "overscroll-x-contain",
            "[-webkit-overflow-scrolling:touch]",
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
                "bg-[#141416] border border-[#232327]",
                "rounded-[22px] p-4",
                "w-[196px] sm:w-[220px] lg:w-[240px]",
                "aspect-[9/16] min-h-[340px]",
                "grid content-start gap-3",
                "hover:border-[#3a3a40] transition-colors",
              ].join(" ")}
            >
              <div className="grid gap-2">
                <div className="text-[22px] sm:text-[26px] font-[580] leading-[1.12] tracking-[-0.01em]">
                  {it.title}
                </div>

                {showPills && it.source ? <Pill text={it.source} /> : null}
              </div>

              <div className="text-[#a1a1aa] text-[14px] sm:text-[15px] leading-[1.6]">
                {it.desc}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AiResourcesPage() {
  // outer padding (buffers) for the page
  // rails then “bleed” to show card edges beyond the buffer, while keeping start aligned.
  const railBleed =
    "-mx-6 px-6 sm:-mx-10 sm:px-10"; // match the page buffers

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

        <h1 className="text-[34px] sm:text-[40px] leading-[1.08] tracking-[-0.02em] m-0">
          Isaac&apos;s AI Resources
        </h1>
        <div className="text-[#a1a1aa] text-[16px] sm:text-[17px] leading-[1.55] mt-2">
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
          <SectionRail
            key={s.name}
            name={s.name}
            items={s.items}
            bleedClass={railBleed}
          />
        ))}
      </div>
    </div>
  );
}

