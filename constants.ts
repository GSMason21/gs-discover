import { Question, PersonaProfile } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// QUIZ CONFIG — edit this block to rebrand for a new quiz variant.
// ─────────────────────────────────────────────────────────────────────────────
export const QUIZ_CONFIG = {

  // ── Branding ───────────────────────────────────────────────────────────────
  appName:    "Leadership Persona Explorer",
  pageTitle:  "What Kind of Leader Are You in the Age of Generation Alpha?",
  pageSubtitle:
    "Six big shifts are reshaping education. Discover the leadership persona your " +
    "system needs from you right now — and the competencies to lean into.",

  // ── Welcome card narrative ─────────────────────────────────────────────────
  narrativeTitle: "Leading Through the Melt",
  narrativeBody:
    "Superintendents, principals, and teachers are holding systems together while the " +
    "ground shifts beneath their feet. This assessment helps you identify your dominant " +
    "leadership persona — and the concrete steps to lead strong through rapid change.",

  // ── Form header ────────────────────────────────────────────────────────────
  formHeading:     "You're almost there!",
  formSubheading:  "Where should we send your leadership persona report?",
  formCta:         "Discover My Leadership Persona",
  formLoadingText: "Analyzing your responses...",

  // ── Result page ────────────────────────────────────────────────────────────
  resultTagline: "Great leadership isn't a destination — it's a daily practice.",
  score1Label:   "",   // not used in profile scoring mode
  score2Label:   "",

  // ── Footer ─────────────────────────────────────────────────────────────────
  footerText: `© ${new Date().getFullYear()} Getting Smart. Based on "Leadership in the Age of Generation Alpha."`,

  // ── Mailchimp tag applied to all completions ───────────────────────────────
  completionTag: "Leadership Assessment",
};

// ─────────────────────────────────────────────────────────────────────────────
// QUESTIONS
// 12 questions, 2 per persona (category = persona key).
// Answer 'B' always maps to that persona; 'A' is the alternative tendency.
// Scoring: count 'B' answers per category → highest count wins.
// ─────────────────────────────────────────────────────────────────────────────
export const QUESTIONS: Question[] = [
  // ── Learner (Q1–Q2) ────────────────────────────────────────────────────────
  {
    id: 1,
    category: 'LEARNER',
    text: 'When you face a problem you haven\'t seen before, your first instinct is to:',
    options: [
      { label: 'A', text: 'Find someone who has solved it before and apply their approach quickly.', value: 'A' },
      { label: 'B', text: 'Sit with the question, research deeply, and model that curiosity openly with your team.', value: 'B' },
    ]
  },
  {
    id: 2,
    category: 'LEARNER',
    text: 'A staff member challenges a decision you made. You are most likely to:',
    options: [
      { label: 'A', text: 'Explain your reasoning clearly and move forward with the plan.', value: 'A' },
      { label: 'B', text: 'Pause, listen deeply with compassion, and genuinely reconsider if their perspective reveals a gap.', value: 'B' },
    ]
  },

  // ── Visionary (Q3–Q4) ──────────────────────────────────────────────────────
  {
    id: 3,
    category: 'VISIONARY',
    text: 'When setting goals for your team, you prioritize:',
    options: [
      { label: 'A', text: 'Measurable outcomes tied to current performance benchmarks and accountability metrics.', value: 'A' },
      { label: 'B', text: 'A clear, co-designed community vision that connects daily work to long-term human flourishing.', value: 'B' },
    ]
  },
  {
    id: 4,
    category: 'VISIONARY',
    text: 'When your system faces pressure from multiple directions at once, you:',
    options: [
      { label: 'A', text: 'Focus on the most urgent issue and manage it one crisis at a time.', value: 'A' },
      { label: 'B', text: 'Return to the core vision to filter decisions and communicate transparently about trade-offs.', value: 'B' },
    ]
  },

  // ── Catalyst (Q5–Q6) ───────────────────────────────────────────────────────
  {
    id: 5,
    category: 'CATALYST',
    text: 'When launching a new initiative, you tend to:',
    options: [
      { label: 'A', text: 'Drive it yourself to ensure quality and consistency across the organization.', value: 'A' },
      { label: 'B', text: 'Distribute ownership to your team, building their autonomy and sense of purpose in the work.', value: 'B' },
    ]
  },
  {
    id: 6,
    category: 'CATALYST',
    text: 'You notice a key team member seems disengaged. Your response is to:',
    options: [
      { label: 'A', text: 'Set clearer expectations and monitor their performance more closely.', value: 'A' },
      { label: 'B', text: 'Explore whether their sense of autonomy, belonging, competence, or purpose has eroded — then redesign accordingly.', value: 'B' },
    ]
  },

  // ── Architect (Q7–Q8) ──────────────────────────────────────────────────────
  {
    id: 7,
    category: 'ARCHITECT',
    text: 'When you look at how your team spends its time each week, your instinct is to:',
    options: [
      { label: 'A', text: 'Accept the workload as the cost of running a complex organization.', value: 'A' },
      { label: 'B', text: 'Identify the biggest time-sink and run a design sprint to automate, reallocate, or eliminate it.', value: 'B' },
    ]
  },
  {
    id: 8,
    category: 'ARCHITECT',
    text: 'When a veteran staff member leaves your organization, you typically:',
    options: [
      { label: 'A', text: 'Hire a replacement and rely on the new hire to learn the role organically.', value: 'A' },
      { label: 'B', text: 'Recognize the knowledge loss and prioritize building shared playbooks and systems before they leave.', value: 'B' },
    ]
  },

  // ── Cultivator (Q9–Q10) ────────────────────────────────────────────────────
  {
    id: 9,
    category: 'CULTIVATOR',
    text: 'When thinking about professional development for your staff, you focus on:',
    options: [
      { label: 'A', text: 'Meeting compliance requirements and ensuring staff are trained on current mandates.', value: 'A' },
      { label: 'B', text: 'Co-designing a Portrait of an Educator tied to your learning model and building personalized growth pathways.', value: 'B' },
    ]
  },
  {
    id: 10,
    category: 'CULTIVATOR',
    text: 'When facing stakeholder resistance to change, you:',
    options: [
      { label: 'A', text: 'Push through with strong communication and clear rationale for the direction.', value: 'A' },
      { label: 'B', text: 'Map stakeholders by belief and trust, invest energy in supporters and fence-sitters, and stop spending equity on entrenched opponents.', value: 'B' },
    ]
  },

  // ── Weaver (Q11–Q12) ───────────────────────────────────────────────────────
  {
    id: 11,
    category: 'WEAVER',
    text: 'When your team is stuck on a persistent challenge, your instinct is to:',
    options: [
      { label: 'A', text: 'Convene internal stakeholders and work through the problem from within the organization.', value: 'A' },
      { label: 'B', text: 'Connect the team to external networks and organizations who have already navigated similar terrain.', value: 'B' },
    ]
  },
  {
    id: 12,
    category: 'WEAVER',
    text: 'When thinking about workforce and community alignment, you:',
    options: [
      { label: 'A', text: 'Rely on existing community relationships and occasional employer input to stay informed.', value: 'A' },
      { label: 'B', text: 'Establish a formal Community Advisory Board that maps workforce needs directly to your education system.', value: 'B' },
    ]
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PERSONAS
// id must match the category values used in QUESTIONS above.
// ─────────────────────────────────────────────────────────────────────────────
export const PERSONAS: Record<string, PersonaProfile> = {
  LEARNER: {
    id: 'LEARNER',
    name: 'The Learner',
    subtitle: 'Curiosity-Driven Leadership',
    color: 'bg-sky-600',
    description:
      'You lead by asking better questions rather than projecting all the answers. You model vulnerability, ' +
      'prioritize deep listening, and believe that a leader\'s capacity to grow is the organization\'s greatest asset. ' +
      'In a world of rapid change, your curiosity is contagious — and it builds organizations that can adapt.',
    strengths: [
      { title: 'Radical Curiosity', text: 'You create psychological safety for questions, experimentation, and learning from failure.' },
      { title: 'Compassionate Listening', text: 'You slow down to truly hear stakeholders before designing solutions.' },
      { title: 'Values-Driven Decisions', text: 'Your integrity and reflective practice earn deep organizational trust.' },
      { title: 'High Expectations', text: 'You hold yourself and your team to clear, adaptive, and meaningful goals.' },
    ],
    weaknesses: [
      { title: 'Analysis Paralysis', text: 'Deep inquiry can sometimes slow decision-making when urgency is required.' },
      { title: 'Over-Questioning', text: 'Teams may crave more direction than your questioning style naturally provides.' },
      { title: 'Absorbing Complexity', text: 'You may take on too much uncertainty personally rather than distributing it across the team.' },
    ],
    opportunities: [
      { title: 'Model Learning Publicly', text: 'Share your own learning journey with staff to normalize growth at every level.' },
      { title: 'Design for Curiosity', text: 'Build structured inquiry time into team meetings and professional learning.' },
      { title: 'Pair with a Visionary', text: 'Combine your depth of question with a strong strategic north star to accelerate impact.' },
    ],
    habits: [
      { title: 'Curiosity Audits', text: 'Regularly reflecting on your own learning and modeling that vulnerability with your team.' },
      { title: 'Active Listening Sprints', text: 'Using design sprint noticing phases to deeply understand what stakeholders truly need.' },
      { title: 'Values Reflection', text: 'Pausing before decisions to check alignment with your articulated values and norms.' },
    ],
    nextSteps: [
      'Conduct a personal curiosity audit — when was your last deep learning dive, and how did you share it?',
      'Model active listening during your next team meeting by asking questions before offering solutions.',
      'Articulate a clear set of values and norms for your team and use them explicitly in your next hard decision.',
      'Set adaptive goals for yourself and ask your team to hold you accountable to them.',
    ]
  },

  VISIONARY: {
    id: 'VISIONARY',
    name: 'The Visionary',
    subtitle: 'Strategic Clarity Under Pressure',
    color: 'bg-brand-primary',
    description:
      'You build and sustain strategic clarity even when everything around you is shifting. Whether you\'re a classroom ' +
      'teacher defining success for every student or a superintendent co-designing a system-wide vision, your ability ' +
      'to tie daily work to long-term human flourishing is your superpower.',
    strengths: [
      { title: 'Coherent Direction', text: 'You connect individual and team goals to a shared community vision that guides daily decisions.' },
      { title: 'Accountability Culture', text: 'You build in regular reflection cycles that keep the system honest about progress and roadblocks.' },
      { title: 'Radical Transparency', text: 'You share your own reflections openly, model vulnerability around challenges, and invite input on the roadmap.' },
      { title: 'Human-Centered Focus', text: 'You keep material well-being, life satisfaction, meaning, and relationships at the center of strategy.' },
    ],
    weaknesses: [
      { title: 'Vision Fatigue', text: 'Teams can become numb to vision language if it isn\'t consistently connected to operational reality.' },
      { title: 'Idealism vs. Urgency', text: 'Long-term clarity can sometimes create friction with the short-cycle demands of day-to-day management.' },
      { title: 'Alignment Overhead', text: 'Building shared vision takes time and sustained energy that can be hard to protect.' },
    ],
    opportunities: [
      { title: 'Co-Design the Vision', text: 'Involve students, families, and staff in articulating the community vision to deepen ownership.' },
      { title: 'Operationalize the Vision', text: 'Translate vision into explicit budget, hiring, and scheduling decisions to make it real.' },
      { title: 'Quarterly Vision Check-ins', text: 'Build structured reflection cycles where teams assess progress and surface emerging barriers.' },
    ],
    habits: [
      { title: 'Vision Filtering', text: 'Running every major decision through the lens of the community vision before committing.' },
      { title: 'Transparent Goal Sharing', text: 'Publishing your own goals and progress publicly to model the accountability you expect.' },
      { title: 'Human Flourishing Metrics', text: 'Tracking indicators of well-being, meaning, and connection alongside academic outcomes.' },
    ],
    nextSteps: [
      'Re-ground your system\'s success metrics in human flourishing: stability, satisfaction, health, purpose, character, and relationships.',
      'Tie every team member\'s individual goals explicitly to the community vision — make the connection visible.',
      'Build a quarterly reflection ritual where your team surfaces progress and roadblocks connected to the vision.',
      'Share your own goal reflections openly with staff and invite honest input on the strategic roadmap.',
    ]
  },

  CATALYST: {
    id: 'CATALYST',
    name: 'The Catalyst',
    subtitle: 'Distributed Leadership & Unlocked Motivation',
    color: 'bg-orange-500',
    description:
      'You understand that the most powerful thing a leader can do is unlock the motivation already present in their ' +
      'team. Grounded in self-determination theory, you design for autonomy, relatedness, competence, and purpose — ' +
      'and your teams move faster and more sustainably because of it.',
    strengths: [
      { title: 'Distributed Ownership', text: 'You build clear decision-making structures that give teams genuine authority and accountability.' },
      { title: 'Motivation Architecture', text: 'You diagnose and redesign systems when autonomy, belonging, competence, or purpose erodes.' },
      { title: 'Adaptive Leadership', text: 'You get on the balcony to observe where you\'re enabling vs. micromanaging — and adjust.' },
      { title: 'Catalytic Culture', text: 'You create conditions where teams accelerate toward the vision under their own energy.' },
    ],
    weaknesses: [
      { title: 'Coordination Cost', text: 'Distributed leadership requires strong communication infrastructure to avoid misalignment.' },
      { title: 'Accountability Gaps', text: 'Autonomy without clear accountability structures can leave important work falling through the cracks.' },
      { title: 'Tolerance for Ambiguity', text: 'Not all team members thrive in high-autonomy environments — some need more structure to succeed.' },
    ],
    opportunities: [
      { title: 'Explicit Decision Frameworks', text: 'Build a shared system that clarifies who decides what, how, and when across the organization.' },
      { title: 'Motivation Diagnostics', text: 'Run regular team reflections on autonomy, relatedness, competence, and purpose to catch erosion early.' },
      { title: 'Leadership Pipeline', text: 'Use distributed leadership as a deliberate strategy for developing your next generation of leaders.' },
    ],
    habits: [
      { title: 'Balcony Observation', text: 'Daily or weekly journaling to track where you\'re enabling autonomy vs. inadvertently micromanaging.' },
      { title: 'Decision Mapping', text: 'Maintaining visible clarity on who owns which decisions and how they\'re made.' },
      { title: 'Motivation Check-ins', text: 'Asking teams to reflect on autonomy, relatedness, competence, and purpose before and during major projects.' },
    ],
    nextSteps: [
      'Establish a clear system-wide decision framework: who decides, how it\'s decided, and when.',
      'Start a 5-minute end-of-day observation journal to track where you\'re enabling autonomy vs. micromanaging.',
      'Ask your team to individually reflect on autonomy, relatedness, competency, and purpose — and use the results to redesign.',
      'Identify one leader on your team who is ready for more ownership and deliberately expand their decision-making authority.',
    ]
  },

  ARCHITECT: {
    id: 'ARCHITECT',
    name: 'The Architect',
    subtitle: 'Systems Design for Time and Scale',
    color: 'bg-violet-600',
    description:
      'You are relentlessly focused on designing systems and structures that give your team back the one resource ' +
      'they can never recover: time. By automating, eliminating, and codifying knowledge, you create the conditions ' +
      'for high-quality relationships, better learning experiences, and continuous improvement.',
    strengths: [
      { title: 'Time Recovery', text: 'You identify and eliminate administrative time-sinks that steal capacity from high-value work.' },
      { title: 'Operational Innovation', text: 'You use generative technology and design thinking to reimagine routine tasks.' },
      { title: 'Knowledge Management', text: 'You build shared playbooks that make institutional wisdom portable and resilient to turnover.' },
      { title: 'Continuous Improvement', text: 'You design sprint cycles that give teams structured space to iterate and improve.' },
    ],
    weaknesses: [
      { title: 'Over-Engineering', text: 'Complex systems can create new burdens if not designed with the end user in mind.' },
      { title: 'Change Resistance', text: 'Operational redesign often meets resistance from staff comfortable with existing routines.' },
      { title: 'Execution Dependency', text: 'Great system design requires sustained implementation discipline that can be hard to maintain.' },
    ],
    opportunities: [
      { title: 'AI-Powered Operations', text: 'Use generative AI to reduce time on routine tasks and redirect capacity toward students and staff.' },
      { title: 'Design Sprint Culture', text: 'Embed regular design sprints into the organizational calendar for continuous operational improvement.' },
      { title: 'Onboarding Architecture', text: 'Build robust knowledge management systems that dramatically shorten the ramp time for new hires.' },
    ],
    habits: [
      { title: 'Time Auditing', text: 'Regularly mapping where team time goes and ruthlessly questioning whether each category serves the vision.' },
      { title: 'Playbook Building', text: 'Documenting the community vision, learning model, and key processes in shared, living documents.' },
      { title: 'Sprint Facilitation', text: 'Running structured design sprints to automate, reallocate, or eliminate operational inefficiencies.' },
    ],
    nextSteps: [
      'Identify the single largest non-essential time-sink in your organization and run a design sprint to eliminate or automate it.',
      'Choose one routine task and use generative AI to build a tool that reduces the time your team spends on it.',
      'Build a shared playbook that documents your community vision, learning model, signals, ecosystem, and strategy.',
      'Design an onboarding system that transfers institutional knowledge to new staff in their first 90 days.',
    ]
  },

  CULTIVATOR: {
    id: 'CULTIVATOR',
    name: 'The Cultivator',
    subtitle: 'Conditions, Capacity & Commitment',
    color: 'bg-teal-600',
    description:
      'You shape the invisible architecture of your organization: the conditions, culture, and commitment that ' +
      'determine whether meaningful change takes root or withers. While others focus on programs and initiatives, ' +
      'you tend the soil — ensuring your team has the belief, skills, and environment to sustain transformation.',
    strengths: [
      { title: 'Condition Setting', text: 'You diagnose and remove the systemic barriers that prevent your team from doing their best work.' },
      { title: 'Capacity Building', text: 'You co-design educator portraits and personalized professional learning tied to your learning model.' },
      { title: 'Commitment Growing', text: 'You ensure staff can articulate the reasons for change — and believe in the destination.' },
      { title: 'Stakeholder Strategy', text: 'You map stakeholders with precision and invest your energy where it produces the most leverage.' },
    ],
    weaknesses: [
      { title: 'Slow Burn', text: 'Culture and capacity work takes time — results can feel invisible in the short term.' },
      { title: 'Measurement Challenges', text: 'Conditions and commitment are harder to quantify than program outcomes.' },
      { title: 'Energy Drain', text: 'Tending to culture and individual stakeholders is deeply relational work that can deplete even strong leaders.' },
    ],
    opportunities: [
      { title: 'Portrait of an Educator', text: 'Co-design educator competency portraits that anchor professional learning to the learning model.' },
      { title: 'Barrier Removal Cycles', text: 'Run quarterly staff surveys to surface systemic barriers and use them to drive R&D cycles.' },
      { title: 'Stakeholder Mapping', text: 'Use power/interest or belief/trust matrices to prioritize your relationship investment strategically.' },
    ],
    habits: [
      { title: 'Quarterly Barrier Surveys', text: 'Regularly asking staff what is getting in the way of their best work — and acting on the answers.' },
      { title: 'Stakeholder Mapping', text: 'Maintaining a living map of stakeholders by belief/trust or power/interest to guide relationship energy.' },
      { title: 'Commitment Conversations', text: 'Regularly checking that staff can articulate and believe in the system\'s direction.' },
    ],
    nextSteps: [
      'Launch a quarterly staff survey asking: what are the biggest barriers to achieving the best outcomes for every student?',
      'Co-design a Portrait of an Educator connected to your learning model and build professional learning around its competencies.',
      'Map your stakeholders by belief and trust — invest in supporters and fence-sitters, and stop spending equity on entrenched opponents.',
      'Identify one systemic condition (policy, culture, funding, or structure) that is limiting your team and run an improvement cycle to address it.',
    ]
  },

  WEAVER: {
    id: 'WEAVER',
    name: 'The Weaver',
    subtitle: 'Networks, Talent & Community Connection',
    color: 'bg-amber-600',
    description:
      'You systematically combat the isolation that makes school transformation so hard. You connect your team to ' +
      'the broader ecosystem of networks, talent, and community partners — ensuring your organization is never ' +
      'solving problems in a vacuum and always accelerating through shared knowledge.',
    strengths: [
      { title: 'Network Intelligence', text: 'You tap external knowledge networks to bring outside learning into your organization before others do.' },
      { title: 'Cross-Sector Coordination', text: 'You build formal structures like Community Advisory Boards that align education to workforce needs.' },
      { title: 'Talent Acceleration', text: 'You connect your team to external partners — NAF, New Tech Network, Big Picture, CAPS — to accelerate transformation.' },
      { title: 'Anti-Isolation', text: 'You deliberately break down the silos that keep educators building the same solutions independently.' },
    ],
    weaknesses: [
      { title: 'Breadth vs. Depth', text: 'Wide external networks can sometimes come at the cost of deep internal organizational development.' },
      { title: 'Partnership Overhead', text: 'Managing external relationships requires time and coordination that can strain lean teams.' },
      { title: 'Signal vs. Noise', text: 'Broad network access means filtering for the most relevant insights becomes a critical skill.' },
    ],
    opportunities: [
      { title: 'Regional Network Leadership', text: 'Start or join a regional learning network to pool resources and accelerate collective transformation.' },
      { title: 'Community Advisory Board', text: 'Establish a formal board that maps local workforce needs to your education system.' },
      { title: 'Partner Network Integration', text: 'Plug your team into NAF, New Tech Network, Big Picture Learning, or CAPS to access proven models.' },
    ],
    habits: [
      { title: 'Network Brokering', text: 'Regularly making and offering connections between your team and external organizations with relevant expertise.' },
      { title: 'Advisory Facilitation', text: 'Convening cross-sector stakeholders to keep education aligned with community and workforce evolution.' },
      { title: 'Outward Scanning', text: 'Continuously looking beyond your organization\'s walls for models, partners, and resources.' },
    ],
    nextSteps: [
      'Connect your team to at least one external knowledge network this quarter — Future of Learning Council, Real World Learning, or similar.',
      'Establish a Community Advisory Board that maps local workforce needs directly to your education system.',
      'Explore formal partnerships with networks like NAF, New Tech Network, Big Picture Learning, or CAPS.',
      'Identify one problem your team is solving in isolation and find an external organization that has already cracked it.',
    ]
  },
};
