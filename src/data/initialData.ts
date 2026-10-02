import { InterventionVideo, BlogArticle, AccessPin, Appointment, User } from '../types';

export const INITIAL_INTERVENTIONS: InterventionVideo[] = [
  {
    id: 'cbt-basics',
    title: 'Cognitive Behavioural Therapy (CBT) Basics',
    typicallyAssignedFor: 'Anxiety, depression, overthinking',
    treatmentArea: 'Anxiety',
    category: 'CBT',
    duration: '14 mins',
    description: 'An foundational clinical orientation to how thoughts, emotions, physiological reactions, and behaviors continually reinforce each other. Learn how to identify cognitive cognitive traps.',
    clinicalRationale: 'Establishes cognitive conceptualization, shifting the patient from passive suffering to active cognitive restructuring.',
    tags: ['CBT', 'Foundations', 'Cognitive Distortions', 'Psychoeducation'],
    type: 'interactive',
    interactiveType: 'cbt-record',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'Catch the automatic negative thought (ANT)',
      'Identify the cognitive distortion (All-or-Nothing, Catastrophizing, Mind Reading)',
      'Examine the objective evidence for and against',
      'Formulate a balanced, adaptive perspective'
    ]
  },
  {
    id: 'cognitive-restructuring',
    title: 'Cognitive Restructuring',
    typicallyAssignedFor: 'Negative or distorted thought patterns',
    treatmentArea: 'Overthinking',
    category: 'CBT',
    duration: '18 mins',
    description: 'A structured, Socratic intervention for dismantling intrusive, catastrophizing, and rigid thought loops. Re-engineer internal dialogues with evidence testing.',
    clinicalRationale: 'Reduces autonomic reactivity to repetitive ruminations by interrupting cognitive cognitive fusion.',
    tags: ['Socratic Questioning', 'De-catastrophizing', 'Evidence Testing'],
    type: 'interactive',
    interactiveType: 'cbt-record',
    thumbnailUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'Specify the precise upsetting thought',
      'Rate emotional conviction from 0% to 100%',
      'Ask: "What is the worst that can happen, and how would I cope?"',
      'Develop alternative, grounded interpretations'
    ]
  },
  {
    id: 'behavioural-activation',
    title: 'Behavioural Activation',
    typicallyAssignedFor: 'Depression, low motivation',
    treatmentArea: 'Depression',
    category: 'Behavioral',
    duration: '16 mins',
    description: 'Counteracts depressive inertia through systematic, graduated scheduling of mastery and pleasure activities, breaking the lethargy-withdrawal cycle.',
    clinicalRationale: 'Reintroduces positive environmental reinforcement, triggering endogenous dopaminergic tone even before motivation is felt.',
    tags: ['Depression', 'Mastery & Pleasure', 'Micro-Goals', 'Inertia'],
    type: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'Understand the "Action Precedes Motivation" principle',
      'Break tasks down into microscopic 5-minute units',
      'Log mood before and after completing each activity',
      'Establish gentle, consistent morning anchoring routines'
    ]
  },
  {
    id: 'erp-ocd',
    title: 'Exposure and Response Prevention (ERP)',
    typicallyAssignedFor: 'OCD',
    treatmentArea: 'OCD',
    category: 'Behavioral',
    duration: '22 mins',
    description: 'The clinical gold-standard intervention for Obsessive Compulsive Disorder. Learn how to tolerate obsessional anxiety without performing neutralizing compulsions.',
    clinicalRationale: 'Facilitates inhibitory learning and natural neurobiological habituation to obsessional distress.',
    tags: ['OCD', 'ERP', 'Habituation', 'Compulsion Blocking'],
    type: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'Map your trigger hierarchy (SUDS 0-100 scale)',
      'Safely enter the exposure without reassurance seeking',
      'Resist physical or mental neutralizing rituals',
      'Observe the anxiety peak, plateau, and subside naturally'
    ]
  },
  {
    id: 'systematic-desensitization',
    title: 'Systematic Desensitization',
    typicallyAssignedFor: 'Fear and phobias',
    treatmentArea: 'Fear & Phobias',
    category: 'Behavioral',
    duration: '19 mins',
    description: 'Step-by-step reciprocal inhibition protocol. Pairs graduated exposure to specific feared stimuli with deep parasympathetic physiological relaxation.',
    clinicalRationale: 'Reconditions autonomic nervous system response from fight-or-flight to safety and homeostasis.',
    tags: ['Phobia', 'Anxiety Hierarchy', 'Reciprocal Inhibition'],
    type: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'Construct a 10-level feared hierarchy',
      'Establish conditioned calm through rapid deep relaxation',
      'Visualize level 1 until distress drops below 20%',
      'Gradually advance through remaining levels at patient pace'
    ]
  },
  {
    id: 'diaphragmatic-breathing',
    title: 'Diaphragmatic (Deep) Breathing',
    typicallyAssignedFor: 'Anxiety, panic, stress',
    treatmentArea: 'Anxiety',
    category: 'Mindfulness & Relaxation',
    duration: '10 mins',
    description: 'Interactive physiological reset utilizing resonant abdominal pacing (4s inhale, 4s hold, 6s extended exhale) to stimulate vagal nerve tone.',
    clinicalRationale: 'Directly downregulates the sympathetic nervous system and terminates hyperventilation-induced panic loops.',
    tags: ['Panic Protocol', 'Vagus Nerve', 'Parasympathetic', 'Interactive Pacer'],
    type: 'interactive',
    interactiveType: 'breathing',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'Place one hand on chest, one hand on belly',
      'Breathe through nose, expanding the lower abdomen for 4 seconds',
      'Hold gently for 4 seconds with relaxed shoulders',
      'Slowly release air through pursed lips for 6 seconds'
    ]
  },
  {
    id: 'progressive-muscle-relaxation',
    title: 'Progressive Muscle Relaxation (PMR)',
    typicallyAssignedFor: 'Anxiety, tension, sleep problems',
    treatmentArea: 'Sleep Problems',
    category: 'Mindfulness & Relaxation',
    duration: '21 mins',
    description: 'Edmund Jacobson clinical sequence systematically tensing and relaxing major muscle groups from toes to forehead to release somatic holding patterns.',
    clinicalRationale: 'Builds somatic awareness and eliminates chronic muscular bracing that triggers nighttime alertness and bodily tension.',
    tags: ['Jacobson PMR', 'Somatic Tension', 'Insomnia Relief'],
    type: 'interactive',
    interactiveType: 'pmr',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'Lie supine in a quiet, temperate room',
      'Tense muscle group for 5-7 seconds at 70% maximum effort',
      'Release abruptly, observing the wave of warm relaxation for 20 seconds',
      'Progress upward: Feet, calves, thighs, abdomen, shoulders, jaw'
    ]
  },
  {
    id: 'grounding-54321',
    title: 'Grounding Technique (5-4-3-2-1)',
    typicallyAssignedFor: 'Panic, anxiety, overwhelm',
    treatmentArea: 'Anxiety',
    category: 'Mindfulness & Relaxation',
    duration: '8 mins',
    description: 'An interactive sensory orientation protocol that pulls awareness away from internal catastrophizing into the concrete physical surroundings.',
    clinicalRationale: 'Re-engages prefrontal cortex sensory processing, breaking depersonalization and acute panic surges.',
    tags: ['Sensory Grounding', 'Panic Intervention', 'Dissociation', '5-4-3-2-1'],
    type: 'interactive',
    interactiveType: 'grounding',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      '5 things you can SEE around you right now',
      '4 things you can physically TOUCH or FEEL',
      '3 distinct sounds you can HEAR in the distance',
      '2 things you can SMELL or imagine smelling',
      '1 thing you can TASTE or a sip of cold water'
    ]
  },
  {
    id: 'mindfulness-meditation',
    title: 'Mindfulness Meditation',
    typicallyAssignedFor: 'Overthinking, stress, general wellbeing',
    treatmentArea: 'Overthinking',
    category: 'Mindfulness & Relaxation',
    duration: '15 mins',
    description: 'Non-judgmental present-moment awareness practice. Trains metacognitive attention to notice mind-wandering and anchor back to the breath without self-criticism.',
    clinicalRationale: 'Reduces Default Mode Network (DMN) hyper-connectivity associated with chronic rumination.',
    tags: ['Mindfulness', 'Attentional Control', 'Vipassana', 'DMN Calming'],
    type: 'interactive',
    interactiveType: 'meditation',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'Sit comfortably upright with an alert yet relaxed posture',
      'Focus attention on the subtle sensation at the tip of the nostrils',
      'When thoughts arise, gently label them: "Thinking, thinking"',
      'Guide awareness back smoothly to the breath sensation'
    ]
  },
  {
    id: 'thought-defusion-worry',
    title: 'Thought Defusion and Worry Postponement',
    typicallyAssignedFor: 'Overthinking, rumination',
    treatmentArea: 'Overthinking',
    category: 'CBT',
    duration: '17 mins',
    description: 'ACT (Acceptance and Commitment Therapy) defusion protocol paired with structured Worry Postponement (scheduling a dedicated 15-minute daily worry window).',
    clinicalRationale: 'Alters the relationship to unwanted thoughts so they lose their coercive power over immediate behavior.',
    tags: ['ACT', 'Defusion', 'Worry Window', 'Rumination'],
    type: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'Say out loud: "I notice I am having the thought that..."',
      'Visualize thoughts floating away like leaves on a moving stream',
      'Designate a 15-minute daily "Worry Zone" (5:00 - 5:15 PM)',
      'Postpone daytime ruminations until your appointed worry window'
    ]
  },
  {
    id: 'cbt-insomnia-sleep-hygiene',
    title: 'CBT for Insomnia and Sleep Hygiene',
    typicallyAssignedFor: 'Sleep problems',
    treatmentArea: 'Sleep Problems',
    category: 'CBT',
    duration: '20 mins',
    description: 'Evidence-based cognitive behavioral protocol for chronic sleeplessness: stimulus control, sleep restriction guidelines, circadian entrainment, and bedroom conditioning.',
    clinicalRationale: 'Restores the brain\'s automatic association between the bed and restorative rapid sleep onset.',
    tags: ['CBT-I', 'Sleep Hygiene', 'Stimulus Control', 'Circadian'],
    type: 'interactive',
    interactiveType: 'sleep-checklist',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'Use bed only for sleep; no screens or problem-solving in bed',
      'The 20-minute rule: If awake after 20 mins, get up to a dim room',
      'Fix your morning wake time unconditionally 7 days a week',
      'Eliminate afternoon caffeine and heavy evening meals'
    ]
  },
  {
    id: 'guided-imagery',
    title: 'Guided Imagery',
    typicallyAssignedFor: 'Anxiety, fear, relaxation',
    treatmentArea: 'Fear & Phobias',
    category: 'Mindfulness & Relaxation',
    duration: '18 mins',
    description: 'Rich sensory visualization transporting the patient into a bespoke neurochemical sanctuary of profound psychological safety and tranquil restorative ease.',
    clinicalRationale: 'The brain activates identical neural pathways during vivid positive visualization as in physical reality, dampening amygdala distress.',
    tags: ['Safe Place Imagery', 'Amygdala Reset', 'Sensory Immersion'],
    type: 'audio',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'Close eyes and scan the body to release facial micro-tensions',
      'Construct a sensory-rich safe sanctuary (mountain glen or coastal cove)',
      'Anchor sight, sound, gentle breeze, and ambient scent',
      'Place a sensory anchor (thumb and forefinger touch) to recall the state'
    ]
  },
  {
    id: 'self-hypnosis-induction',
    title: 'Self-Hypnosis Induction',
    typicallyAssignedFor: 'Clinical hypnotherapy follow-up, relaxation, sleep',
    treatmentArea: 'Sleep Problems',
    category: 'Hypnotherapy',
    duration: '25 mins',
    description: 'Direct clinical follow-up protocol developed by Reality Mind Clinic. Teaches the patient self-directed eye-fixation, progressive deepening, and subconscious ego-strengthening.',
    clinicalRationale: 'Empowers patients to induce therapeutic alpha-theta brainwave states independently for symptom relief and emotional rewiring.',
    tags: ['Clinical Hypnosis', 'Trance Work', 'Ego Strengthening', 'Bijbehara Clinic'],
    type: 'audio',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'Establish fixed-point gaze slightly above normal eye level',
      'Notice the natural eyelid heaviness and allow eyes to drift closed',
      'Descend a tranquil 10-step spiral staircase, doubling relaxation with each count',
      'Install positive therapeutic post-hypnotic affirmations'
    ]
  }
];

export const INITIAL_PINS: AccessPin[] = [
  {
    id: 'pin-1',
    code: 'RMC-2026',
    patientId: 'patient-demo-1',
    patientName: 'Aamir Mir',
    assignedVideoIds: ['cbt-basics', 'diaphragmatic-breathing', 'grounding-54321', 'thought-defusion-worry'],
    createdAt: '2026-09-28T10:00:00Z',
    expiresAt: '2026-10-28T23:59:59Z',
    status: 'active',
    issuedBy: 'Dr. Psychologist (Bijbehara)',
    notes: 'Prescribed following consultation for acute anxiety & overthinking'
  },
  {
    id: 'pin-2',
    code: '123456',
    patientId: 'patient-demo-2',
    patientName: 'Zehra Begum',
    assignedVideoIds: ['progressive-muscle-relaxation', 'cbt-insomnia-sleep-hygiene', 'self-hypnosis-induction'],
    createdAt: '2026-09-30T14:30:00Z',
    expiresAt: '2026-11-30T23:59:59Z',
    status: 'active',
    issuedBy: 'Dr. Psychologist (Bijbehara)',
    notes: 'Sleep hygiene & hypnotherapeutic induction for chronic insomnia'
  },
  {
    id: 'pin-3',
    code: 'CALM-88',
    patientId: 'patient-demo-3',
    patientName: 'Mohammad Farooq',
    assignedVideoIds: ['erp-ocd', 'cognitive-restructuring'],
    createdAt: '2026-09-15T09:00:00Z',
    expiresAt: '2026-10-15T23:59:59Z',
    status: 'active',
    issuedBy: 'Dr. Psychologist (Bijbehara)',
    notes: 'Targeted ERP exposure steps for obsessive checking rituals'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-1082',
    patientId: 'patient-demo-1',
    patientName: 'Aamir Mir',
    patientPhone: '6005754205',
    patientEmail: 'aamir.mir@example.com',
    service: 'Psychotherapy',
    treatmentArea: 'Anxiety',
    type: 'offline', // In-Clinic Bijbehara
    date: '2026-10-05',
    timeSlot: '11:00 AM - 11:45 AM',
    status: 'confirmed',
    notes: 'Follow-up on diaphragmatic pacing homework and work stress',
    createdAt: '2026-10-01T08:30:00Z'
  },
  {
    id: 'APT-1083',
    patientId: 'patient-demo-2',
    patientName: 'Zehra Begum',
    patientPhone: '9419012345',
    patientEmail: 'zehra.b@example.com',
    service: 'Clinical Hypnotherapy',
    treatmentArea: 'Sleep Problems',
    type: 'offline', // In-Clinic Bijbehara
    date: '2026-10-06',
    timeSlot: '03:00 PM - 03:45 PM',
    status: 'confirmed',
    notes: 'Second clinical hypnosis induction for chronic middle-of-night awakening',
    createdAt: '2026-10-01T11:20:00Z'
  },
  {
    id: 'APT-1084',
    patientId: 'patient-demo-4',
    patientName: 'Saima Rashid',
    patientPhone: '7006894321',
    patientEmail: 'saima.r@example.com',
    service: 'Mental Health & Wellbeing',
    treatmentArea: 'Overthinking',
    type: 'online', // Video call
    date: '2026-10-08',
    timeSlot: '04:30 PM - 05:15 PM',
    status: 'pending',
    notes: 'Online consultation request for rumination & examination overwhelm',
    createdAt: '2026-10-02T09:15:00Z'
  }
];

export const INITIAL_ARTICLES: BlogArticle[] = [
  {
    id: 'understanding-overthinking-cbt',
    title: 'The Architecture of Overthinking: How Worry Feeds the Brain',
    subtitle: 'Why analyzing thoughts repeatedly fails to resolve them, and how CBT thought defusion provides genuine cognitive relief.',
    category: 'Overthinking & Anxiety',
    readTime: '6 min read',
    publishedDate: 'Oct 1, 2026',
    author: 'Lead Clinical Psychologist, RMC',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    summary: 'Overthinking is rarely a lack of intelligence; it is an overactive threat-detection circuit trapped in cognitive fusion. Discover the neuroscience of worry postponement.',
    sections: [
      {
        heading: 'The Illusion of Preparedness',
        body: 'When individuals experience chronic anxiety, the prefrontal cortex attempts to solve emotional distress using logical problem-solving tools. However, hypothetical "what if" questions possess no factual resolution in the present moment, creating an infinite mental loop.'
      },
      {
        heading: 'Breaking the Feedback Loop',
        body: 'Through Cognitive Restructuring and Thought Defusion, we teach the nervous system to treat thoughts as transient neurological events rather than absolute reality or urgent commands.'
      },
      {
        heading: 'The Daily 15-Minute Worry Window',
        body: 'Postponing worry to a designated time each afternoon trains the executive network that ruminations can be intentionally shelved without catastrophe.'
      }
    ],
    keyTakeaways: [
      'Worry feels like problem-solving, but functions as avoidance of physiological discomfort',
      'Distinguish between actionable problems and hypothetical catastrophizing',
      'Practice mental defusion: "I am having the thought that..." instead of "This is happening"'
    ]
  },
  {
    id: 'science-of-clinical-hypnotherapy',
    title: 'Clinical Hypnotherapy Demystified: Beyond Stage Tricks to Neural Plasticity',
    subtitle: 'Understanding how focused trance states downregulate autonomic arousal and foster rapid therapeutic shifts.',
    category: 'Clinical Hypnotherapy',
    readTime: '8 min read',
    publishedDate: 'Sep 25, 2026',
    author: 'Reality Mind Clinic Practice',
    coverImage: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=900&q=80',
    summary: 'Clinical hypnotherapy is not mind control—it is focused attentional absorption paired with subconscious receptivity to therapeutic reframing.',
    sections: [
      {
        heading: 'What Occurs in the Hypnotic Brain?',
        body: 'fMRI neuroimaging reveals that during clinical hypnosis, connectivity between the salience network and the dorsal anterior cingulate cortex decreases, reducing physical pain perception and acute anxiety.'
      },
      {
        heading: 'Applications in Bijbehara Practice',
        body: 'At Reality Mind Clinic, we utilize clinical hypnotherapy in conjunction with structured psychotherapy for persistent insomnia, phobias, psychosomatic tension, and habitual rumination.'
      },
      {
        heading: 'Empowering Patient Independence',
        body: 'Our private video library provides assigned self-hypnosis recordings so patients consolidate changes at home with zero dependence on the therapist.'
      }
    ],
    keyTakeaways: [
      'Hypnosis is an innate physiological state similar to deep flow or absorption',
      'The patient remains fully aware and retain complete moral autonomy',
      'Combines seamlessly with CBT for long-term behavioral change'
    ]
  },
  {
    id: 'restoring-sleep-cbt-insomnia',
    title: 'Breaking the Chronic Insomnia Cycle with Stimulus Control',
    subtitle: 'Why counting sheep fails and how reconditioning the bed environment restores restorative slow-wave sleep.',
    category: 'Sleep Problems',
    readTime: '5 min read',
    publishedDate: 'Sep 18, 2026',
    author: 'Lead Clinical Psychologist, RMC',
    coverImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80',
    summary: 'Chronic sleeplessness is maintained by conditioned bed-dread. CBT for Insomnia (CBT-I) restores sleep efficiency without pharmaceutical reliance.',
    sections: [
      {
        heading: 'The Conditioned Arousal Dilemma',
        body: 'After weeks of tossing and turning, the bedroom itself becomes a conditioned stimulus for adrenaline release. The brain learns: "Bed equals problem-solving time."'
      },
      {
        heading: 'The 20-Minute Separation Rule',
        body: 'If you are not asleep within approximately 20 minutes, leave the bed. Go to a softly lit armchair, engage in quiet reading, and return only when biological sleepiness returns.'
      }
    ],
    keyTakeaways: [
      'Preserve the sanctity of the bed exclusively for sleep',
      'Never monitor the clock in the middle of the night',
      'Anchor wake-up time regardless of prior night sleep duration'
    ]
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'patient-demo-1',
    name: 'Aamir Mir',
    email: 'aamir.mir@example.com',
    phone: '6005754205',
    role: 'patient',
    createdAt: '2026-09-20',
    unlockedVideoIds: ['cbt-basics', 'diaphragmatic-breathing', 'grounding-54321', 'thought-defusion-worry']
  },
  {
    id: 'psych-lead',
    name: 'Dr. Psychologist (Bijbehara)',
    email: 'clinic@realitymind.com',
    phone: '6005754205',
    role: 'psychologist',
    createdAt: '2026-01-01',
    unlockedVideoIds: INITIAL_INTERVENTIONS.map(v => v.id)
  }
];
