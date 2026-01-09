// components/ProjectModal.tsx
"use client";

import { useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export type ProjectTemplate = {
  slug: string;
  title: string;
  subtitle?: string;
  source?: string;
  coverSlot?: ReactNode;
  headerSlot?: ReactNode;
  body: ReactNode;
};

function ImageHold({
  variant,
  label,
}: {
  variant: "cover" | "header";
  label: string;
}) {
  const cls =
    variant === "cover"
      ? "h-[160px] w-[118px] rounded-2xl"
      : "h-full w-full";

  return (
    <div
      className={[
        "relative overflow-hidden",
        "border border-white/10 bg-white/5",
        "shadow-[0_0_18px_rgba(0,0,0,0.25)]",
        cls,
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
      <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
        <div className="text-xs uppercase tracking-[0.22em] text-white/55">
          {label}
        </div>
      </div>
    </div>
  );
}

function ProjectImage({
  variant,
  src,
  alt,
}: {
  variant: "cover" | "header";
  src: string;
  alt: string;
}) {
  const cls =
    variant === "cover"
      ? "h-[160px] w-[118px] rounded-2xl"
      : "h-full w-full";

  return (
    <div
      className={[
        "relative overflow-hidden",
        "border border-white/10 bg-white/5",
        "shadow-[0_0_18px_rgba(0,0,0,0.25)]",
        cls,
      ].join(" ")}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/25" />
    </div>
  );
}

function LinkOut({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "group inline-flex items-baseline gap-1",
        "no-underline",
        "text-white/90 hover:text-white",
        "transition-colors",
      ].join(" ")}
    >
      <span className="underline decoration-white/20 underline-offset-4 group-hover:decoration-white/40 transition-colors">
        {children}
      </span>
      <span
        aria-hidden="true"
        className={[
          "text-[0.95em] text-white/70 group-hover:text-white/90",
          "transition-transform duration-200 ease-out",
          "group-hover:-translate-y-[1px] group-hover:translate-x-[1px]",
        ].join(" ")}
      >
        ↗
      </span>
    </a>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-6 mb-2 text-xl font-semibold tracking-tight text-white">
      {children}
    </h3>
  );
}

function LinksList({ children }: { children: ReactNode }) {
  return <div className="mt-2 space-y-3 leading-relaxed">{children}</div>;
}

const FAKE_ESSAY = (
  <div className="space-y-8">
    <p>
      This is a deliberately long placeholder essay to verify that the entire
      modal content scrolls as one unit (image, title block, and body).
    </p>
    <h3 className="text-lg font-semibold">scroll test</h3>
    <div className="space-y-6">
      {Array.from({ length: 30 }).map((_, i) => (
        <p key={i}>
          Extra paragraph {i + 1}. This is filler content to force scrolling.
        </p>
      ))}
    </div>
  </div>
);

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    slug: "artificial-intelligence-in-state-government-index",
    title: "Artificial Intelligence in State Government Index",
    source: "Project",
    coverSlot: (
      <ProjectImage
        variant="cover"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/9.aiindexbanner.png"
        alt="Artificial Intelligence in State Government Index"
      />
    ),
    headerSlot: (
      <ProjectImage
        variant="header"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/9.aiindexbanner.png"
        alt="Artificial Intelligence in State Government Index"
      />
    ),
    body: (
      <div className="space-y-4">
        <p>
          This work, published with the{" "}
          <LinkOut href="https://www.csg.org/">
            Council of State Governments
          </LinkOut>
          , translates the GenAI hype cycle into a measurable picture of how
          state and territory governments are actually responding. I built a
          public-information benchmark that scores all states and territories on
          concrete adoption signals - employee guidance, training, sandboxes,
          pilots, governance structures, and transparency - then paired the
          index with a policy roadmap for what leaders should do next.
        </p>
        <p>
          <strong>
            The headline result was stark: most states scored below 50/100, and
            only a small handful cleared 80, suggesting the U.S. state landscape
            is early, uneven, and often opaque.
          </strong>{" "}
          The accompanying write-up turns the data into a practical playbook:
          standardize workforce guidance and training, safely enable consumer
          tools, run measurable pilots (sandbox or enterprise), publish action
          plans, stand up permanent AI capacity, and lead with transparency so
          constituents can see what’s happening and why.
        </p>

        <SectionTitle>What I Built</SectionTitle>
        <ul className="mt-2 list-disc pl-5 space-y-2">
          <li>
            <strong>GenAI Preparedness Score:</strong> a 15-criteria scoring
            framework grounded in publicly verifiable evidence (implementation,
            government infrastructure, employee resources).
          </li>
          <li>
            <strong>Composite scoring:</strong> a weighted model combining
            preparedness (70%) with an efficiency adjustment (30%) to account
            for resource differences across governments.
          </li>
          <li>
            <strong>State-by-state analysis + rankings:</strong> categorization
            tiers (excellent &gt; non-adopters), with concise synopses
            explaining why each government landed where it did.
          </li>
          <li>
            <strong>Practitioner roadmap:</strong> a six-part implementation
            guide tied directly to observed gaps (policy, training, allowed use,
            pilots, action plans, permanent structures, transparency).
          </li>
          <li>
            <strong>Publishable deliverables:</strong> an index product plus
            narrative analysis designed for decision-makers, not researchers.
          </li>
        </ul>

        <SectionTitle>Final Products</SectionTitle>
        <LinksList>
          <div>
            <LinkOut href="https://docs.google.com/spreadsheets/d/1BhOYYJF75hnKdcfi5IejWD8tHovsdnay/edit?usp=sharing&ouid=107923489516143255873&rtpof=true&sd=true">
              The GenAI Benchmark
            </LinkOut>
          </div>
          <div>
            <LinkOut href="https://docs.google.com/document/d/1jvnT2yJo47LchswQmj4DRZGEHYOoMGZB/edit">
              Study Methodology and Background
            </LinkOut>
          </div>
          <div>
            <LinkOut href="https://docs.google.com/document/d/1z1hLEEtHXN6JlZp3XSpEGSV2wMdmoTHD/edit">
              Recommendations to State Lawmakers
            </LinkOut>
          </div>
          <div>
            <LinkOut href="https://docs.google.com/presentation/d/1jAaItGFd-F7s-wUSZRsxjfbmZnqmAT5V/edit?slide=id.p1#slide=id.p1">
              Executive Summary Presentation
            </LinkOut>
          </div>
        </LinksList>
      </div>
    ),
  },

  {
    slug: "congressional-office-setup-100-day-report",
    title: "Congressional Office Setup and 100 Day Report",
    source: "Project",
    coverSlot: (
      <ProjectImage
        variant="cover"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/1.ushouse.png"
        alt="Congressional Office Setup and 100 Day Report"
      />
    ),
    headerSlot: (
      <ProjectImage
        variant="header"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/1.ushouse.png"
        alt="Congressional Office Setup and 100 Day Report"
      />
    ),
    body: (
      <div className="space-y-4">
        <p>
          This report captures the work I led to stand up a brand-new
          congressional office from zero and benchmark its first 100 days of
          operation. I helped design the office’s internal systems, set early
          priorities, and define what success would look like before we opened
          the doors. From there, I worked across functions to make those goals
          real: including pulling expertise from our legislative,
          communications, operations, and constituent services teams.
        </p>
        <p>
          I led the collection and verification of office-wide metrics,
          identified and summarized qualitative and quantitative wins, designed
          the final report, and coordinated its release to media and
          stakeholders.
        </p>
        <p>
          Overall, this was a reflection of the work I led to set up and
          operationalize the new congressional office.
        </p>

        <SectionTitle>My Contributions</SectionTitle>
        <ul className="mt-2 list-disc pl-5 space-y-2">
          <li>Building core office infrastructure and workflows</li>
          <li>Hiring a core team and directing recruiting processes</li>
          <li>Tracking early performance benchmarks</li>
          <li>Managing schedule and logistics for a new member of Congress</li>
        </ul>

        <SectionTitle>Final Products</SectionTitle>
        <LinksList>
          <div>
            <LinkOut href="https://drive.google.com/file/d/1gdSr7RjjmidqJkLTWkyIbesVPIkECizn/view">
              100 Day Report Executive Summary
            </LinkOut>
          </div>
        </LinksList>
      </div>
    ),
  },

  {
    slug: "senior-thesis-local-journalism",
    title: "AI, Digital Platforms, and Journalism Research",
    source: "Project",
    coverSlot: (
      <ProjectImage
        variant="cover"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/2.thesisbanner.png"
        alt="AI, Digital Platforms, and Journalism Research"
      />
    ),
    headerSlot: (
      <ProjectImage
        variant="header"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/2.thesisbanner.png"
        alt="AI, Digital Platforms, and Journalism Research"
      />
    ),
    body: (
      <div className="space-y-4">
        <p>
          My senior thesis is a qualitative honors project analyzing the
          structural decline of local journalism in Australia and its
          implications for democratic accountability, labor, and media policy.{" "}
          <strong>
            Drawing on 17 in-depth interviews with current and former
            journalists, editors, newsroom owners, and industry experts, the
            study examines how economic contraction, platform dominance,
            newsroom consolidation, and emerging technologies, including
            generative AI, are reshaping local and regional news ecosystems.
          </strong>
        </p>
        <p>
          I designed and executed the research end-to-end, including literature
          review across journalism studies and political economy; interview
          recruitment; transcription verification; flexible qualitative coding;
          and thematic analysis. The project situates journalism as a public
          good and interrogates why market-based and regulatory interventions,
          such as platform bargaining codes, advertising subsidies, and public
          broadcasting, have produced mixed or unsustainable outcomes. Key
          findings include persistent career precarity among journalists,
          widespread skepticism toward platform regulation, limited awareness of
          AI’s longer-term effects, and the absence of policy consensus on
          preserving local news.
        </p>

        <SectionTitle>Core Outputs</SectionTitle>
        <ul className="mt-2 list-disc pl-5 space-y-2">
          <li>
            <strong>Original qualitative dataset:</strong> 17 semi-structured
            interviews with journalists, editors, newsroom owners, academics,
            and policy experts (12+ hours of audio; ~100,000 words of verified
            transcripts).
          </li>
          <li>
            <strong>Rigorous qualitative analysis:</strong> flexible coding and
            thematic synthesis mapping labor precarity, newsroom contraction,
            platform dependence, and technological disruption in local and
            regional news.
          </li>
          <li>
            <strong>Business model evaluation:</strong> comparative analysis of
            print, digital, hybrid, nonprofit, and subscription-based news
            models under consolidation and declining ad revenue.
          </li>
          <li>
            <strong>Policy and platform assessment:</strong> evidence-based
            evaluation of the News Media Bargaining Code, public broadcasting,
            advertising subsidies, and digital training programs.
          </li>
          <li>
            <strong>Applied policy synthesis:</strong> cross-national insights
            linking Australian media reforms to structural constraints and
            political realities in the United States.
          </li>
        </ul>

        <SectionTitle>Final Products</SectionTitle>
        <LinksList>
          <div>
            <LinkOut href="https://drive.google.com/file/d/1Z6-RR1Zw7z2RieJwVHdk0yOtycRIN1ia/view?usp=sharing">
              Final Thesis Draft: Holding the Line: Local Journalists&apos;
              Experiences Amidst Economic Crisis and Digital Transformation in
              Australia&apos;s News Ecosystem
            </LinkOut>
          </div>
        </LinksList>
      </div>
    ),
  },

  {
    slug: "electric-vehicle-access-analysis",
    title: "Electric Vehicle Charging Access Analysis",
    source: "Project",
    coverSlot: (
      <ProjectImage
        variant="cover"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/3.evbanner.png"
        alt="Electric Vehicle Charging Access Analysis"
      />
    ),
    headerSlot: (
      <ProjectImage
        variant="header"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/3.evbanner.png"
        alt="Electric Vehicle Charging Access Analysis"
      />
    ),
    body: (
      <div className="space-y-4">
        <p>
          This project used geographic information systems (GIS) and
          quantitative analysis to examine electric vehicle access,
          infrastructure, and access. I worked with spatial datasets covering
          population, infrastructure, and policy variables to identify where EV
          adoption is accelerating, and where structural gaps remain.
        </p>
        <p>
          My role focused on data cleaning, spatial joins, and statistical
          interpretation. I translated raw geographic data into interpretable
          findings through maps, charts, and written analysis. The project
          culminates in a clear conclusion: at the time of publication, income
          and racial identity do not have a significant spatial relationship to
          EV charging infrastructure.
        </p>

        <SectionTitle>Key Takeaways</SectionTitle>
        <ul className="mt-2 list-disc pl-5 space-y-2">
          <li>
            <strong>Race and income:</strong> regression results indicate very
            weak relationships between charger proximity and both income and
            race at the national and Wayne County levels (all R² values close to
            zero).
          </li>
          <li>
            <strong>Geography and policy:</strong> charger gaps appear regional
            and urban–rural, with higher density in states that prioritize EV
            policy and large charger deserts in parts of the South, Midwest, and
            Great Plains.
          </li>
          <li>
            <strong>Next research steps:</strong> county-level analysis and a
            single local case study limit conclusions; future work should
            examine tract-level national data and rural access over time.
          </li>
        </ul>

        <SectionTitle>Final Products</SectionTitle>
        <LinksList>
          <div>
            <LinkOut href="https://drive.google.com/file/d/11lfGLY0n4XqNRCgFE3Yk_ph7zb2OlH3d/view?usp=sharing">
              Initial Report
            </LinkOut>
          </div>
          <div>
            <LinkOut href="https://drive.google.com/file/d/1a8RYeorbJRYYcGRrFKe6x2rKmQMft95j/view?usp=sharing">
              Presentation Poster with Spatial Analysis
            </LinkOut>
          </div>
        </LinksList>
      </div>
    ),
  },

  {
    slug: "communications-consultancy-supporting-local-candidates",
    title: "Communications Consultancy and Supporting Local Candidates",
    source: "Project",
    coverSlot: (
      <ProjectImage
        variant="cover"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/7.consultbanner.png"
        alt="Communications Consultancy and Supporting Local Candidates"
      />
    ),
    headerSlot: (
      <ProjectImage
        variant="header"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/7.consultbanner.png"
        alt="Communications Consultancy and Supporting Local Candidates"
      />
    ),
    body: (
      <div className="space-y-4">
        <p>
          In 2024, I decided I wanted to build my own consultancy, supporting
          local and federal candidates that I believed in by delivering digital
          and communications assets.
        </p>
        <p>
          One of the campaigns I supported was Allyson Damikolas for Tustin
          Unified School Board in Tustin, California. I led the campaign’s
          digital and communications strategy, with the website functioning as
          the central hub for messaging, organizing, and voter-facing
          information.
        </p>
        <p>
          In addition to building the site, I managed social media messaging and
          supported rapid-response and crisis communications during high-pressure
          moments in the race. The work required quick iteration, tight message
          discipline, and constant coordination across functions to ensure
          consistency and credibility.
        </p>

        <SectionTitle>Scope of Work</SectionTitle>
        <ul className="mt-2 list-disc pl-5 space-y-2">
          <li>Website strategy, design, and execution</li>
          <li>Social media messaging and content design</li>
          <li>Rapid-response and crisis communications support</li>
          <li>Strategic advising on campaign narrative and positioning</li>
        </ul>

        <SectionTitle>Final Products</SectionTitle>
        <LinksList>
          <div>
            <LinkOut href="https://www.allysonfortustin.com/">
              Allyson&apos;s Campaign Website
            </LinkOut>
          </div>
        </LinksList>
      </div>
    ),
  },

  {
    slug: "fulbright-focus-group-sponsored-by-openai",
    title: "Fulbright Focus Group Sponsored by OpenAI",
    source: "Project",
    coverSlot: (
      <ProjectImage
        variant="cover"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/6.chatlabbanner.png"
        alt="Fulbright Focus Group Sponsored by OpenAI"
      />
    ),
    headerSlot: (
      <ProjectImage
        variant="header"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/6.chatlabbanner.png"
        alt="Fulbright Focus Group Sponsored by OpenAI"
      />
    ),
    body: (
      <div className="space-y-4">
        <p>
          I founded and led the Fulbright Taiwan ChatGPT Lab, the first
          educator-focused lab of its kind supported by OpenAI. The Lab brought
          together Fulbright educators to explore practical, responsible uses of
          ChatGPT in education.
        </p>
        <p>
          <strong>
            Over six structured sessions, I designed the curriculum,
            facilitated discussions, and guided participants toward concrete
            classroom use cases.
          </strong>{" "}
          The Lab produced a shared framework for thinking about AI in education
          and culminated in a published Substack with specific, lightweight use
          cases of ChatGPT that educators of all kinds can utilize in their
          daily workflows.
        </p>

        <SectionTitle>Key Components of the Lab</SectionTitle>
        <ul className="mt-2 list-disc pl-5 space-y-2">
          <li>Co-developed the Lab’s structure with OpenAI staff</li>
          <li>Independently facilitated six stakeholder sessions</li>
          <li>
            Produced nine specific uses of ChatGPT for educators, summarized in
            a Substack post authored by me.
          </li>
        </ul>

        <SectionTitle>Final Products</SectionTitle>
        <LinksList>
          <div>
            <LinkOut href="https://edunewsletter.openai.com/p/top-chats-from-the-fulbright-taiwan">
              Substack Post: Top Chats from the Fulbright Taiwan ChatGPT Lab
            </LinkOut>
          </div>
          <div>
            <LinkOut href="https://notion.so/ChatGPT-Lab-x-Fulbright-Taiwan-261aaef174d680579138e8c1c658ab41">
              Fulbright Taiwan ChatGPT Lab Notion Page
            </LinkOut>
          </div>
          <div>
            <LinkOut href="https://docs.google.com/presentation/d/1ZqOp_1KQte52BNBR5OBmOJThCufkNnBtVLBhNW_rkps/edit?slide=id.g38cd4d0aa4c_0_33#slide=id.g38cd4d0aa4c_0_33">
              PowerPoint Introduction to the Lab
            </LinkOut>
          </div>
        </LinksList>
      </div>
    ),
  },

  {
    slug: "political-reporting-at-washu",
    title: "Political Reporting at WashU",
    source: "Project",
    coverSlot: (
      <ProjectImage
        variant="cover"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/10.studlifebanner.png"
        alt="Political Reporting at WashU"
      />
    ),
    headerSlot: (
      <ProjectImage
        variant="header"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/10.studlifebanner.png"
        alt="Political Reporting at WashU"
      />
    ),
    body: (
      <div className="space-y-4">
        <p>
          As a student journalist, I covered politics and power on campus,
          reporting on issues where institutional authority, student activism,
          and national politics intersected. My reporting focused on moments of
          controversy and transition, pairing on-the-ground student perspectives
          with analysis of how the university responded through policy,
          governance, and public messaging.
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <h3 className="mb-1 text-xl font-semibold tracking-tight text-white">
              <LinkOut href="https://www.studlife.com/news/2024/09/18/disorienting-suspended-student-protesters-speak-out">
                Disorienting’: Suspended student protesters speak out
              </LinkOut>
            </h3>
            <p className="text-white/85">
              The article centers on students suspended after campus protests,
              detailing their accounts of the disciplinary process and its
              academic and emotional consequences. It examines tensions between
              student activism, university policy, and due process within
              WashU’s protest response framework.
            </p>
          </div>

          <div>
            <h3 className="mb-1 text-xl font-semibold tracking-tight text-white">
              <LinkOut href="https://www.studlife.com/news/2024/12/04/washu-abs-respond-to-racist-text-messages-after-election-discuss-combating-hate">
                WashU ABS respond to racist text messages after election,
                discuss combating hate
              </LinkOut>
            </h3>
            <p className="text-white/85">
              This piece reports on racist text messages sent to Black students
              following the 2024 election and the university’s response through
              the Association of Black Students. It analyzes institutional
              accountability, campus safety, and broader patterns of
              post-election harassment.
            </p>
          </div>

          <div>
            <h3 className="mb-1 text-xl font-semibold tracking-tight text-white">
              <LinkOut href="https://www.studlife.com/news/2024/09/11/disagree-without-being-disagreeable-chancellor-martin-hosts-panel-on-free-speech-protest-and-democracy">
                ‘Disagree without being disagreeable’: Chancellor Martin hosts
                panel on free speech, protest, and democracy
              </LinkOut>
            </h3>
            <p className="text-white/85">
              The article covers a university-hosted panel on free speech and
              protest, featuring senior administrators and faculty
              perspectives. It explores how WashU leadership frames democratic
              engagement amid rising campus polarization.
            </p>
          </div>

          <div>
            <h3 className="mb-1 text-xl font-semibold tracking-tight text-white">
              <LinkOut href="https://www.studlife.com/news/2024/04/30/its-getting-hotter-anxiety-and-hope-among-washu-students-staff-and-faculty">
                ‘It’s getting hotter’: Anxiety and hope among WashU students,
                staff, and faculty
              </LinkOut>
            </h3>
            <p className="text-white/85">
              This story examines campus reactions to climate change, capturing
              anxiety, skepticism, and cautious optimism across different
              university constituencies. It situates individual concerns within
              institutional climate commitments and policy debates.
            </p>
          </div>

          <div>
            <h3 className="mb-1 text-xl font-semibold tracking-tight text-white">
              <LinkOut href="https://www.studlife.com/news/2024/10/31/before-election-day-washu-students-reflect-on-candidates-and-civic-engagement-2">
                Before Election Day, WashU students reflect on candidates and
                civic engagement
              </LinkOut>
            </h3>
            <p className="text-white/85">
              The piece documents how students across the political spectrum
              were thinking about candidates, voting, and participation ahead
              of the election. It highlights varying levels of enthusiasm,
              disillusionment, and perceived civic responsibility.
            </p>
          </div>

          <div>
            <h3 className="mb-1 text-xl font-semibold tracking-tight text-white">
              <LinkOut href="https://www.studlife.com/news/2024/02/14/university-forms-naming-review-board">
                University forms naming review board
              </LinkOut>
            </h3>
            <p className="text-white/85">
              This article reports on WashU’s creation of a formal board to
              review contested building and space names. It analyzes how the
              university is institutionalizing decisions around history, legacy,
              and donor influence.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  {
    slug: "boehringer-cares-foundation-rebrand-strategy-shift",
    title: "Boehringer Cares Foundation Rebrand and Strategy Shift",
    source: "Project",
    coverSlot: (
      <ProjectImage
        variant="cover"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/5.bicfbanner.png"
        alt="Boehringer Cares Foundation Rebrand and Strategy Shift"
      />
    ),
    headerSlot: (
      <ProjectImage
        variant="header"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/5.bicfbanner.png"
        alt="Boehringer Cares Foundation Rebrand and Strategy Shift"
      />
    ),
    body: (
      <div className="space-y-4">
        <p>
          At Boehringer Cares, I helped lead a full rebrand including visual
          design and a broader strategic redirect. I played a central role in
          redefining how the organization presented its mission, priorities, and
          impact: primarily internally, but also externally.
        </p>
        <p>
          I led data collection and synthesis to inform the rebrand, then
          translated those insights into a new website through working with the
          user experience team and visual identity through collaboration with
          the brand strategy team. I was deeply involved in both strategy and
          aesthetics, ensuring the final product was coherent, modern, and
          aligned with new long-term goals.
        </p>

        <SectionTitle>Major Contributions</SectionTitle>
        <ul className="mt-2 list-disc pl-5 space-y-2">
          <li>
            <strong>Revamping Brand and Strategy:</strong> led research to help
            clarify BICF’s direction and narrative, contributing to a broader
            brand and strategy shift.
          </li>
          <li>
            <strong>Website and UX Redesign:</strong> designed and launched a
            new website, using UX changes and targeted communications to
            increase employee volunteering by 25% in 2025.
          </li>
          <li>
            <strong>Increasing Internal Engagement:</strong> shipped over 25
            assets and built a company-wide newsletter system that reached an
            80% open rate, improving how work and opportunities were shared
            internally.
          </li>
        </ul>

        <SectionTitle>Final Products</SectionTitle>
        <LinksList>
          <div>
            <LinkOut href="https://www.boehringer-ingelheim.com/us/boehringer-ingelheim-cares-foundation">
              Revamped Boehringer Cares Website
            </LinkOut>
          </div>
        </LinksList>
      </div>
    ),
  },

  {
    slug: "2022-institute-for-nonprofit-news-index-survey",
    title: "The 2022 Institute for Nonprofit News Index Survey",
    source: "Project",
    coverSlot: (
      <ProjectImage
        variant="cover"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/8.innbanner.png"
        alt="The 2022 Institute for Nonprofit News Index Survey"
      />
    ),
    headerSlot: (
      <ProjectImage
        variant="header"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/8.innbanner.png"
        alt="The 2022 Institute for Nonprofit News Index Survey"
      />
    ),
    body: (
      <div className="space-y-4">
        <p>
          As a research assistant on the INN Index, I contributed to both the
          qualitative and quantitative components of a large-scale research
          project measuring nonprofit news organizations.
        </p>
        <p>
          <strong>
            I collected and cleaned data, synthesized survey responses, and
            conducted individual outreach to a significant subset of
            respondents.
          </strong>{" "}
          This work required attention to methodological rigor as well as clear
          communication with participants.
        </p>

        <SectionTitle>Key Contributions</SectionTitle>
        <ul className="mt-2 list-disc pl-5 space-y-2">
          <li>Data Collection and Database Management</li>
          <li>Direct Stakeholder Engagement</li>
        </ul>

        <SectionTitle>Final Products</SectionTitle>
        <LinksList>
          <div>
            <LinkOut href="https://inn.org/research/inn-index/inn-index-2022/about-the-index/">
              2022 INN Index Report
            </LinkOut>
          </div>
        </LinksList>
      </div>
    ),
  },

  {
    slug: "exclusive-interview-with-high-visibility-congressperson",
    title: "Exclusive Interview with High-Visibility Congressperson",
    source: "Project",
    coverSlot: (
      <ProjectImage
        variant="cover"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/11.chimesbanner.png"
        alt="Exclusive Interview with High-Visibility Congressperson"
      />
    ),
    headerSlot: (
      <ProjectImage
        variant="header"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/11.chimesbanner.png"
        alt="Exclusive Interview with High-Visibility Congressperson"
      />
    ),
    body: (
      <div className="space-y-4">
        <p>
          My reporting for The Calvin Chimes focused on then-Congressman Peter
          Meijer during a volatile period early in his tenure, following his
          vote to impeach President Trump. As a college freshman, I conducted
          direct interviews and covered intra-party backlash, policy positions,
          and the political risks facing a first-term member of Congress.
        </p>
        <p>
          The reporting centers on accountability, institutional norms, and the
          consequences of dissent within a polarized party environment,
          demonstrating early access-driven political reporting and on-the-record
          sourcing.
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <h3 className="mb-1 text-xl font-semibold tracking-tight text-white">
              <LinkOut href="https://calvinchimes.org/2021/04/08/rep-meijer-defends-filibuster-merit-based-immigration-vote-for-impeachment/">
                Rep. Meijer defends filibuster, merit-based immigration, vote
                for impeachment
              </LinkOut>
            </h3>
            <p className="text-white/85">
              This article reports on Rep. Meijer’s defense of his impeachment
              vote and broader policy views, including the filibuster and
              merit-based immigration. It situates his positions within debates
              over constitutional responsibility and party loyalty.
            </p>
          </div>

          <div>
            <h3 className="mb-1 text-xl font-semibold tracking-tight text-white">
              <LinkOut href="https://calvinchimes.org/2021/02/24/rep-meijer-faces-censures-primary-challenge-over-impeachment-vote/">
                Rep. Meijer faces censures, primary challenge over impeachment
                vote
              </LinkOut>
            </h3>
            <p className="text-white/85">
              This piece covers the immediate political fallout of Meijer’s
              impeachment vote, including formal censures and a looming primary
              challenge. It documents internal party fractures and the risks
              faced by first-term lawmakers breaking with party leadership.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  {
    slug: "sustainable-development-health-access-report",
    title: "Sustainable Development and Health Access Report",
    source: "Project",
    coverSlot: (
      <ProjectImage
        variant="cover"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/4.bibanner.png"
        alt="Sustainable Development and Health Access Report"
      />
    ),
    headerSlot: (
      <ProjectImage
        variant="header"
        src="https://pub-176caad97cac44369ba9cef0291eb27d.r2.dev/4.bibanner.png"
        alt="Sustainable Development and Health Access Report"
      />
    ),
    body: (
      <div className="space-y-4">
        <p>
          While working at Boehringer Ingelheim, part of my work was to shape
          the strategy and narrative around a company’s health access policies.
          My work sat at the intersection of research, communications, and
          operations: clarifying what the company stood for, how it communicated
          that stance, and how it operationalized those commitments.
        </p>
        <p>
          At the end of my rotation with the sustainable development team, I
          authored an internal report summarizing the state of health access
          within the company, getting everyone on the same page for the first
          time.
        </p>
        <p>
          Another major component of this work involved collaboration with the
          Sustainable Development Excellence (SDX) program through the
          University of Georgia’s Terry College of Business. I supported program
          operations while ensuring that external partnerships aligned with the
          company’s evolving health access strategy.
        </p>
        <p>
          The SDX program, thanks in part to my strategic positioning of the
          program as a leader in the field, was selected for a Brandon Hall
          Group Award.
        </p>

        <SectionTitle>More Information</SectionTitle>
        <LinksList>
          <div>
            <LinkOut href="https://www.boehringer-ingelheim.com/us/about-us/sustainable-development/more-potential/boehringer-wins-10-brandon-hall-group-awards">
              SDX Brandon Hall Group Award Announcement
            </LinkOut>
          </div>
          <div>
            <LinkOut href="https://www.boehringer-ingelheim.com/us/about-us/sustainable-development">
              Boehringer&apos;s Sustainable Development Strategy
            </LinkOut>
          </div>
        </LinksList>
      </div>
    ),
  },
];

function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

export default function ProjectModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const slug = searchParams.get("project");
  const project = useMemo(
    () => (slug ? PROJECT_TEMPLATES.find((p) => p.slug === slug) : undefined),
    [slug]
  );

  const isOpen = Boolean(project);
  useBodyScrollLock(isOpen);

  const close = () => {
    const raw = sessionStorage.getItem("__project_bg_y__");
    sessionStorage.setItem(
      "__project_restore_y__",
      raw ?? String(window.scrollY || 0)
    );

    const next = new URLSearchParams(searchParams.toString());
    next.delete("project");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          aria-modal="true"
          role="dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-black/55 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseDown={close}
          />

          <motion.div
            className={[
              "relative mx-4",
              "w-[min(92vw,900px)]",
              "h-[min(84vh,720px)]",
              "overflow-hidden rounded-3xl",
              "border border-white/10 bg-neutral-950",
              "shadow-[0_0_60px_rgba(0,0,0,0.55)]",
            ].join(" ")}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="close"
              className={[
                "absolute right-4 top-4 z-20",
                "p-2",
                "text-white/75 hover:text-white",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
              ].join(" ")}
            >
              <span className="text-2xl leading-none">×</span>
            </button>

            <div className="h-full overflow-y-auto">
              <div
                className={[
                  "w-full",
                  "h-[206px] sm:h-[258px]",
                  "overflow-hidden",
                  "border-b border-white/10",
                ].join(" ")}
              >
                {project.headerSlot ? (
                  <div className="h-full w-full">{project.headerSlot}</div>
                ) : (
                  <ImageHold variant="header" label="header hold" />
                )}
              </div>

              <div className="px-6 py-7">
                {project.source && (
                  <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/60">
                    {project.source}
                  </div>
                )}
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  {project.title}
                </h2>
                {project.subtitle && (
                  <p className="mt-1 text-sm text-white/65">
                    {project.subtitle}
                  </p>
                )}

                <div className="mt-7 border-b border-white/10" />

                <div className="mt-7 prose prose-invert max-w-none">
                  {project.body}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
