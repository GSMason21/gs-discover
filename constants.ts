
import { Question, PersonaProfile } from './types';

export const QUESTIONS: Question[] = [
  // Part I: Innovation Depth
  {
    id: 1,
    category: 'INNOVATION',
    text: 'Primary Learning Goal',
    options: [
      { label: 'A', text: 'We prioritize content recall and proficiency measured primarily by test scores.', value: 'A' },
      { label: 'B', text: 'We prioritize "transferable skills" like curiosity, resilience, and adaptability.', value: 'B' }
    ]
  },
  {
    id: 2,
    category: 'INNOVATION',
    text: 'The Role of the Learner',
    options: [
      { label: 'A', text: 'Learning is teacher-driven; educators determine the what, how, and when.', value: 'A' },
      { label: 'B', text: 'Learning is learner-driven; students take ownership and build agency.', value: 'B' }
    ]
  },
  {
    id: 3,
    category: 'INNOVATION',
    text: 'The Definition of "Classroom"',
    options: [
      { label: 'A', text: 'Learning is primarily confined to a single building or classroom.', value: 'A' },
      { label: 'B', text: 'Learning unfolds across a network of spaces, including internships and community settings.', value: 'B' }
    ]
  },
  {
    id: 4,
    category: 'INNOVATION',
    text: 'Evidence of Success',
    options: [
      { label: 'A', text: 'Success is documented through traditional transcripts limited to courses and grades.', value: 'A' },
      { label: 'B', text: 'Success is documented through mastery-based records that showcase competencies.', value: 'B' }
    ]
  },
  {
    id: 5,
    category: 'INNOVATION',
    text: 'Design Focus',
    options: [
      { label: 'A', text: 'We focus on adopting specific programs or isolated strategies to solve problems.', value: 'A' },
      { label: 'B', text: 'We focus on shared "Design Principles" that guide practices across all classrooms.', value: 'B' }
    ]
  },
  // Part II: System Coherence
  {
    id: 6,
    category: 'COHERENCE',
    text: 'The "North Star" (Mission & Vision)',
    options: [
      { label: 'A', text: 'Our mission lives primarily on posters and rarely guides daily decisions.', value: 'A' },
      { label: 'B', text: 'Our mission is an actionable commitment that shapes budget and hiring.', value: 'B' }
    ]
  },
  {
    id: 7,
    category: 'COHERENCE',
    text: 'Adult Alignment',
    options: [
      { label: 'A', text: 'We have clear outcomes for students, but haven\'t defined the capacities adults need.', value: 'A' },
      { label: 'B', text: 'We use Educator and Leader Portraits to align professional learning and hiring.', value: 'B' }
    ]
  },
  {
    id: 8,
    category: 'COHERENCE',
    text: 'Signaling Consistency',
    options: [
      { label: 'A', text: 'Our reporting, portfolios, and transcripts often feel disconnected from each other.', value: 'A' },
      { label: 'B', text: 'Our signals are an integrated system that clearly communicates growth.', value: 'B' }
    ]
  },
  {
    id: 9,
    category: 'COHERENCE',
    text: 'Scalability of Innovation',
    options: [
      { label: 'A', text: 'Successful practices live in the expertise of individual "hero" teachers.', value: 'A' },
      { label: 'B', text: 'We codify and share effective practices to turn experience into shared knowledge.', value: 'B' }
    ]
  },
  {
    id: 10,
    category: 'COHERENCE',
    text: 'Strategic Pacing',
    options: [
      { label: 'A', text: 'We experience "initiative fatigue"—too many things moving at once.', value: 'A' },
      { label: 'B', text: 'Our strategy ensures change is intentional, paced, and sequenced.', value: 'B' }
    ]
  }
];

export const PERSONAS: Record<string, PersonaProfile> = {
  DRIFTER: {
    id: 'DRIFTER',
    name: 'The Drifter',
    subtitle: 'Low Innovation / Low Coherence',
    color: 'bg-slate-400',
    description: 'The Drifter operates in a landscape that is shifting faster than their current structures can support. They often feel reactive and overwhelmed because they lack a core identity or a clear "why" to anchor their efforts.',
    strengths: [
      { title: 'Willingness to Act', text: 'Motivated to solve problems and quick to reach for new programs.' },
      { title: 'Awareness of Pressure', text: 'Acutely aware of external changes and shifting expectations.' },
      { title: 'Pockets of Dedication', text: 'Individual educators and leaders remain deeply dedicated to students.' }
    ],
    weaknesses: [
      { title: 'Accumulation Without Alignment', text: 'Adopting initiatives without a shared structure leads to inefficiency.' },
      { title: 'Initiative Fatigue', text: 'High activity with low progress leads to staff burnout.' },
      { title: 'Reactive Stance', text: 'Reacting to isolated pain points rather than leading with intention.' }
    ],
    opportunities: [
      { title: 'Power of the Pause', text: 'Stepping back to survey the terrain before doing more.' },
      { title: 'Surfacing Bright Spots', text: 'Identifying where learners thrive to serve as new trail markers.' },
      { title: 'Community Grounding', text: 'Building trust through authentic listening for future transformation.' }
    ],
    habits: [
      { title: 'Solving Symptoms', text: 'Focusing on fires rather than underlying system patterns.' },
      { title: 'Program Chasing', text: 'Adopting pre-packaged plans that may not fit local needs.' },
      { title: 'Disconnected Effort', text: 'Isolated initiatives competing for time and attention.' }
    ],
    nextSteps: [
      'Stop adding new initiatives and focus on making sense of the current landscape.',
      'Conduct a "Listening Tour" to understand what the community truly values.',
      'Look across existing programs to see what is already working well.',
      'Establish a common framework to give the team a shared language.'
    ]
  },
  SENTRY: {
    id: 'SENTRY',
    name: 'The Sentry',
    subtitle: 'Low Innovation / High Coherence',
    color: 'bg-brand-primary',
    description: 'The Sentry manages a highly disciplined, efficient organization that is impeccably aligned—but calibrated for the past. They excel at "the game of school" while often overlooking broader future competencies.',
    strengths: [
      { title: 'Operational Excellence', text: 'Highly organized machine where internal systems work in harmony.' },
      { title: 'Clarity and Consistency', text: 'Transparent expectations for students, parents, and staff.' },
      { title: 'Academic Rigor', text: 'Top performers in traditional metrics and content proficiency.' },
      { title: 'Strong Standards', text: 'Well-defined routines for evaluation and follow-through.' }
    ],
    weaknesses: [
      { title: 'Static Design', text: 'Optimized for legacy needs, can be rigid and resistant to innovation.' },
      { title: 'Ambiguity Paralysis', text: 'Students thrive on clear instructions but struggle with open-ended challenges.' },
      { title: 'Narrow Success Metrics', text: 'May ignore transferable skills like resilience and agency.' },
      { title: 'Compliance over Coherence', text: 'Alignment built on following rules rather than shared purpose.' }
    ],
    opportunities: [
      { title: 'Leveraging Stability', text: 'Using existing capacity to support deep, intentional change.' },
      { title: 'Expanding the "What"', text: 'Opportunity to include interdisciplinary competencies in the rigor.' },
      { title: 'Community Re-Engagement', text: 'Integrating community partnerships to bring academic strengths to life.' }
    ],
    habits: [
      { title: 'Protecting the Standard', text: 'Prioritizing current high-performing metrics.' },
      { title: 'Executing the Playbook', text: 'Disciplined implementation of known legacy practices.' },
      { title: 'Measuring the Known', text: 'Relying on traditional transcripts and seat time.' }
    ],
    nextSteps: [
      'Revisit the community vision to see if the "aligned machine" serves modern aspirations.',
      'Begin defining a "Learner Portrait" that adds collaboration and adaptability.',
      'Introduce small-scale performance tasks or community-connected projects.',
      'Explore mastery-based signals to provide a holistic narrative of growth.'
    ]
  },
  TRAILBLAZER: {
    id: 'TRAILBLAZER',
    name: 'The Trailblazer',
    subtitle: 'Medium Innovation / Low Coherence',
    color: 'bg-orange-500',
    description: 'The Trailblazer demonstrates "brittle brilliance." Exciting bright spots exist but remain disconnected from the larger organization. Innovation relies on "hero" educators rather than institutional structures.',
    strengths: [
      { title: 'Pockets of Innovation', text: 'Launched exciting practices like learner portraits or expanded pathways.' },
      { title: 'High Energy', text: 'Fuelled by educators committed to moving beyond legacy models.' },
      { title: 'Future-Facing Pilots', text: 'Comfortable launching design sprints to test new approaches.' }
    ],
    weaknesses: [
      { title: 'Fragility', text: 'Bright spots are vulnerable to staff turnover or funding changes.' },
      { title: 'Inequitable Access', text: 'Learners across the system have uneven access to quality innovation.' },
      { title: 'Human Weight', text: 'The work feels heavy because the system does not reliably support coherence.' }
    ],
    opportunities: [
      { title: 'Codifying the Learning', text: 'Turning successful local practices into playbooks or guides.' },
      { title: 'Aligning the Signals', text: 'Ensuring transcripts reflect the innovation happening in pilots.' },
      { title: 'Building Adult Capacity', text: 'Defining an Educator Portrait to support all teachers.' }
    ],
    habits: [
      { title: 'Pioneering', text: 'Launching new projects that push traditional boundaries.' },
      { title: 'Relational Trust', text: 'Relying on informal networks to share ideas.' },
      { title: 'Trial and Error', text: 'Using a "hackathon" mindset to test classroom experiences.' }
    ],
    nextSteps: [
      'Move from informal sharing to formal codification to protect practices.',
      'Use a common framework to connect innovations across different areas.',
      'Determine which practices are ready to be expanded system-wide.',
      'Sequence efforts thoughtfully to avoid "initiative fatigue."'
    ]
  },
  SURVEYOR: {
    id: 'SURVEYOR',
    name: 'The Surveyor',
    subtitle: 'Medium Innovation / High Coherence',
    color: 'bg-teal-600',
    description: 'The Surveyor represents a system in transition, mapping new terrain while keeping traditional roads functional. They use steadying tools to identify patterns and clarify priorities.',
    strengths: [
      { title: 'Intentional Movement', text: 'Actively charting a coherent path across all elements.' },
      { title: 'Methodical Alignment', text: 'Skilled at naming what exists and ensuring reinforcement.' },
      { title: 'Strategic Sequencing', text: 'Using strategy to prioritize and sustain work over time.' },
      { title: 'Balanced Perspective', text: 'Recognizing the continuum of traditional and transformational elements.' }
    ],
    weaknesses: [
      { title: 'Tension of Currents', text: 'Pulled between daily legacy realities and future-focused shifts.' },
      { title: 'Operational Friction', text: 'Maintaining dual models simultaneously can create temporary frustration.' },
      { title: 'Pacing Challenges', text: 'Struggling to find the right speed for the culture to absorb.' }
    ],
    opportunities: [
      { title: 'Leading with Coherence', text: 'Building adult capacity to move into transformational territory.' },
      { title: 'Codification of Practice', text: 'Creating a robust system for capturing best practices.' },
      { title: 'Strategic Finance', text: 'Connecting financial decisions explicitly to learner outcomes.' }
    ],
    habits: [
      { title: 'Mapping Progress', text: 'Regularly taking stock of what is shifting and emerging.' },
      { title: 'Checking the Compass', text: 'Aligning daily decisions with the long-term destination.' },
      { title: 'Disciplined Observation', text: 'Gathering evidence about barriers and successes.' }
    ],
    nextSteps: [
      'Ensure the Community Vision actively shapes programmatic choices.',
      'Transition from teacher-driven instruction toward facilitation practices.',
      'Invite partners into the building to blur school/community boundaries.',
      'Analyze how learning can travel with integrity across the entire system.'
    ]
  },
  SCOUT: {
    id: 'SCOUT',
    name: 'The Scout',
    subtitle: 'High Innovation / Low Coherence',
    color: 'bg-emerald-600',
    description: 'The Scout represents a system transformational in its depth of innovation but fragmented in its coherence. They are out in front exploring but lack connectivity to bring discoveries home.',
    strengths: [
      { title: 'Attuned to the Future', text: 'Highly sensitive to the need to move away from legacy models.' },
      { title: 'Bold Experimentation', text: 'Testing new definitions of "classroom" and learning networks.' },
      { title: 'Learner-Driven Mentality', text: 'Prioritizing agency and student ownership of learning.' },
      { title: 'Skill Focus', text: 'Value curiosity, resilience, and adaptability over content recall.' }
    ],
    weaknesses: [
      { title: 'Disconnected Discoveries', text: 'Isolated findings don\'t influence the wider organization.' },
      { title: 'Fragile Progress', text: 'Work is vulnerable to leadership transitions or shifts in focus.' },
      { title: 'Communication Gaps', text: 'Lack internal protocols to share learnings with traditional parts.' },
      { title: 'Initiative Overload', text: 'Contributing to fatigue without a stable, paced strategy.' }
    ],
    opportunities: [
      { title: 'Building the Adult Layer', text: 'Normalizing transformational practices across all educators.' },
      { title: 'System Integration', text: 'Using a shared compass to connect isolated "lookouts."' },
      { title: 'Scaling through Codification', text: 'Turning discoveries into playbooks for others to navigate.' }
    ],
    habits: [
      { title: 'Horizon Scanning', text: 'Constantly looking for new tools and models.' },
      { title: 'Pioneering', text: 'Launching pilots that move beyond physical and time boundaries.' },
      { title: 'Advocating', text: 'Championing mastery-based records and broader success definitions.' }
    ],
    nextSteps: [
      'Revisit mission/vision to ensure they can hold the weight of transformational discoveries.',
      'Build "connective trails" between innovation and existing system supports.',
      'Develop skills for every educator, not just the early adopters.',
      'Transition from solo explorer to a leader of collective movement.'
    ]
  },
  WAYFINDER: {
    id: 'WAYFINDER',
    name: 'The Wayfinder',
    subtitle: 'High Innovation / High Coherence',
    color: 'bg-amber-600',
    description: 'The Wayfinder represents the most advanced stage of system leadership. They use a living compass to navigate uncertainty, moving from compliance toward deep coherence.',
    strengths: [
      { title: 'Actionable Vision', text: 'Mission shapes budget, hiring, and daily project choices.' },
      { title: 'Whole-Learner Focus', text: 'Signals make student growth visible across the entire system.' },
      { title: 'Interconnected Systems', text: 'Staffing, professional learning, and facilities are all aligned.' },
      { title: 'Trust and Culture', text: 'Fostering psychological safety and treating change as shared learning.' }
    ],
    weaknesses: [
      { title: 'Complexity Fatigue', text: 'High volume of "meaningful movement" can lead to burnout.' },
      { title: 'Inward Rotation', text: 'Risk of ignoring external shifts due to intense internal focus.' },
      { title: 'Fidelity vs. Flexibility', text: 'Balancing core design principles with school autonomy.' }
    ],
    opportunities: [
      { title: 'Scaling with Integrity', text: 'Expanding high-impact practices without diluting quality.' },
      { title: 'AI as a Design Partner', text: 'Integrating tools to enhance personalization and coaching.' },
      { title: 'Regional Influence', text: 'Leading networks and marking the trail for neighboring systems.' }
    ],
    habits: [
      { title: 'Noticing', text: 'Keeping leaders attuned to real-time events in the community.' },
      { title: 'Observing', text: 'Applying disciplined attention to evidence and barriers.' },
      { title: 'Reflecting', text: 'Turning insights into actionable learning for the system.' }
    ],
    nextSteps: [
      'Treat coherence not as a destination but as a durable, regular practice.',
      'Continuously look outward for regional partnerships or economic shifts.',
      'Ensure system wisdom is documented in playbooks for future leadership.'
    ]
  }
};
