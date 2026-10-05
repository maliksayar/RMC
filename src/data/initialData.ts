import { InterventionVideo, BlogArticle, AccessPin, Appointment, User } from '../types';

export const INITIAL_INTERVENTIONS: InterventionVideo[] = [
  // ==========================================
  // CATEGORY A: THERAPEUTIC INTERVENTION VIDEOS
  // Longer, practical, personally guided practice
  // Can be PIN-protected/unlocked per client
  // ==========================================
  {
    id: 'diaphragmatic-breathing',
    title: 'Deep Breathing — Complete Guided Practice',
    resourceKind: 'intervention',
    isRestricted: false, // Public sample intervention
    typicallyAssignedFor: 'Anxiety, panic attacks, stress, somatic hyperventilation',
    treatmentArea: 'Anxiety',
    category: 'Mindfulness & Relaxation',
    duration: '12 mins',
    description: 'A comprehensive, therapist-guided deep breathing practice. Learn how to downregulate the autonomic nervous system using rhythmic abdominal pacing.',
    clinicalRationale: 'Directly stimulates the vagus nerve, initiating parasympathetic tone and terminating hyperventilation-induced panic loops.',
    type: 'interactive',
    interactiveType: 'breathing',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    whatItIs: 'A structured physiological breathing technique that expands the diaphragm and lower abdomen rather than the upper chest.',
    whyUsed: 'During anxiety or panic, breathing becomes rapid and shallow (thoracic), expelling too much CO2 and causing dizziness, tingling, and racing heart. Diaphragmatic breathing restores physiological balance.',
    howToPerform: 'Place one hand on your chest and one on your belly. Inhale smoothly through the nose for 4 seconds allowing the belly to rise. Hold gently for 4 seconds. Exhale slowly through pursed lips for 6 seconds.',
    commonMistakes: 'Over-inflating the upper chest, forcing breath too aggressively, or hyper-focusing on perfection rather than gentle rhythm.',
    whatYouMightExperience: 'Initial slight unfamiliarity or self-consciousness, followed by a spreading wave of bodily warmth, slower pulse, and muscle softening.',
    questionsDoubts: '"What if I feel dizzy at first?" — Slow down and pause between breaths; you may simply be breathing too deeply too fast.',
    howAndWhenToPractise: 'Practise twice daily for 5-10 minutes when calm to build muscle memory, and deploy immediately at the first sign of emotional or physical tension.',
    keySteps: [
      'What the intervention is: Diaphragmatic abdominal regulation',
      'Why it is being used: Vagus nerve activation & panic loop interruption',
      'How to perform it: 4s inhale, 4s hold, 6s smooth exhale',
      'Demonstration: Therapist demonstrates correct belly-rise movement',
      'Guided practice: Follow the live visual and audio pacing counter',
      'Common mistakes: Chest lifting, rushing the exhale',
      'What to expect: Heart rate deceleration and bodily ease',
      'How and when to practise: Twice daily for 10 minutes'
    ]
  },
  {
    id: 'grounding-54321',
    title: 'Grounding (5-4-3-2-1 Sensory Reset) — Guided Practice',
    resourceKind: 'intervention',
    isRestricted: false, // Public sample intervention
    typicallyAssignedFor: 'Panic surges, acute anxiety, dissociation, derealization',
    treatmentArea: 'Anxiety',
    category: 'Mindfulness & Relaxation',
    duration: '10 mins',
    description: 'An interactive somatic orientation practice that pulls focus away from internal catastrophizing into concrete external sensory anchors.',
    clinicalRationale: 'Re-engages prefrontal cortex sensory processing, breaking depersonalization and acute distress surges.',
    type: 'interactive',
    interactiveType: 'grounding',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    whatItIs: 'A sequential 5-step sensory anchoring protocol engaging sight, touch, sound, smell, and taste.',
    whyUsed: 'During acute panic or dissociation, the mind disconnects from the physical environment. Grounding forcefully re-anchors the nervous system to the present moment.',
    howToPerform: 'Name 5 things you can see, 4 things you can physically touch, 3 distinct sounds you hear, 2 scents you can smell, and 1 taste or sensation in your mouth.',
    commonMistakes: 'Rushing through the numbers mentally like a checklist without genuinely noticing tactile textures or auditory details.',
    whatYouMightExperience: 'Immediate feeling of your feet resting on the floor, reduced mental fog, and decreased heart pounding.',
    questionsDoubts: '"What if I cannot find something to smell or taste?" — Use neutral anchors like room air, or take a sip of cool water.',
    howAndWhenToPractise: 'Practise once daily in different rooms to build familiarity, and deploy whenever dissociation, panic, or acute worry spikes.',
    keySteps: [
      'Notice 5 things you can see with your eyes',
      'Notice 4 things you can physically touch with your hands/feet',
      'Listen for 3 distinct ambient sounds in your environment',
      'Identify 2 subtle scents or aromas nearby',
      'Notice 1 taste or take a mindful sip of water'
    ]
  },
  {
    id: 'progressive-muscle-relaxation',
    title: 'Progressive Muscle Relaxation (PMR) — Guided Practice',
    resourceKind: 'intervention',
    isRestricted: true, // PIN-restricted
    typicallyAssignedFor: 'Chronic muscular tension, anxiety, insomnia, psychosomatic pain',
    treatmentArea: 'Sleep Problems',
    category: 'Mindfulness & Relaxation',
    duration: '22 mins',
    description: 'Full-body Edmund Jacobson clinical sequence systematically tensing and relaxing major muscle groups from feet to facial forehead.',
    clinicalRationale: 'Eliminates subconscious muscular bracing, providing deep neuro-somatic relief and promoting restorative sleep onset.',
    type: 'interactive',
    interactiveType: 'pmr',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    whatItIs: 'A clinical protocol of deliberate isometric muscle contraction followed by sudden complete release.',
    whyUsed: 'Chronic stress causes ongoing muscular bracing that the brain interprets as continued danger. PMR breaks this somatic feedback loop.',
    howToPerform: 'Tense each muscle group for 5-7 seconds at approximately 70% effort, then release abruptly. Attend to the contrast for 20 seconds.',
    commonMistakes: 'Tensing too hard (causing cramps) or releasing too slowly.',
    whatYouMightExperience: 'Heavy, limp limbs, tingling warmth, and deep mental drowsiness.',
    questionsDoubts: '"Can I do this in bed?" — Yes, PMR is an exceptional bedtime routine for sleep problems and insomnia.',
    howAndWhenToPractise: 'Practise 20 minutes before sleep or mid-day during high somatic tension.',
    keySteps: [
      'Feet & Toes: Curl tightly, then release',
      'Calves & Shins: Flex upward, then release',
      'Thighs & Glutes: Squeeze firmly, then release',
      'Abdomen: Tighten core, then release',
      'Shoulders & Neck: Shrug towards ears, then release',
      'Face & Forehead: Scrunch facial muscles, then release'
    ]
  },
  {
    id: 'cognitive-restructuring',
    title: 'Cognitive Restructuring & Thought Record — Guided Practice',
    resourceKind: 'intervention',
    isRestricted: true, // PIN-restricted
    typicallyAssignedFor: 'Catastrophizing, intrusive thoughts, negative self-talk, depression',
    treatmentArea: 'Overthinking',
    category: 'CBT',
    duration: '18 mins',
    description: 'A structured Socratic practice for identifying automatic negative thoughts (ANTs), examining evidence, and developing realistic, balanced alternatives.',
    clinicalRationale: 'De-fuses rigid cognitive distortions and replaces them with balanced cognitive reappraisal.',
    type: 'interactive',
    interactiveType: 'cbt-record',
    thumbnailUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
    whatItIs: 'A systematic method to evaluate whether upsetting thoughts are facts or cognitive distortions.',
    whyUsed: 'Emotions follow interpretations, not situations. Changing the interpretation changes the emotional response.',
    howToPerform: 'Write down the upsetting event, identify the automatic thought, label the distortion, list evidence for/against, and write a balanced thought.',
    commonMistakes: 'Attempting "toxic positivity" instead of realistic, objective evidence testing.',
    whatYouMightExperience: 'Initial mental resistance, followed by emotional relief and cognitive clarity.',
    questionsDoubts: '"What if the worst-case scenario really happens?" — Focus on coping strategies and actual probability rather than imaginary catastrophe.',
    howAndWhenToPractise: 'Complete one thought record whenever strong anxiety, guilt, or low mood arises.',
    keySteps: [
      'Catch the upsetting thought',
      'Rate initial emotional distress (0-100%)',
      'Examine hard evidence for and against',
      'Formulate a rational, balanced conclusion'
    ]
  },
  {
    id: 'erp-ocd',
    title: 'Exposure and Response Prevention (ERP) — Guided Practice',
    resourceKind: 'intervention',
    isRestricted: true, // PIN-restricted
    typicallyAssignedFor: 'OCD, obsessional doubts, compulsive checking, washing',
    treatmentArea: 'OCD',
    category: 'Behavioral',
    duration: '22 mins',
    description: 'The clinical gold-standard intervention for OCD. Step-by-step guidance on confronting triggers while completely resisting neutralizing rituals.',
    clinicalRationale: 'Promotes inhibitory learning and teaches the nervous system that obsessional anxiety dissipates naturally without compulsion.',
    type: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?auto=format&fit=crop&w=800&q=80',
    whatItIs: 'Deliberate, graduated contact with feared thoughts or situations without performing the ritual that temporarily eases distress.',
    whyUsed: 'Compulsions keep OCD alive by preventing the brain from learning that feared outcomes do not occur.',
    howToPerform: 'Enter the exposure exercise slowly, track subjective units of distress (SUDS), and commit to ritual prevention.',
    commonMistakes: 'Replacing a physical ritual with subtle mental neutralizing or reassurance seeking.',
    whatYouMightExperience: 'A temporary rise in anxiety that peaks and then naturally declines over 20-30 minutes.',
    questionsDoubts: '"Will the anxiety ever go down without my ritual?" — Yes, clinical neurobiology proves habituation occurs every time.',
    howAndWhenToPractise: 'Practise step-by-step according to the exposure hierarchy established with your therapist.',
    keySteps: [
      'Identify the obsessional trigger',
      'Resist physical and mental neutralizing compulsions',
      'Track the anxiety curve until it drops by 50%',
      'Record your habituation log'
    ]
  },
  {
    id: 'self-hypnosis-induction',
    title: 'Self-Hypnosis Induction — Guided Practice',
    resourceKind: 'intervention',
    isRestricted: true, // PIN-restricted
    typicallyAssignedFor: 'Clinical hypnotherapy follow-up, emotional rewiring, sleep',
    treatmentArea: 'Sleep Problems',
    category: 'Hypnotherapy',
    duration: '25 mins',
    description: 'A personal clinical follow-up protocol developed by Reality Mind Clinic. Teaches self-directed eye fixation, progressive deepening, and ego-strengthening.',
    clinicalRationale: 'Empowers clients to induce therapeutic alpha-theta trance states independently for sustained emotional resilience.',
    type: 'audio',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    whatItIs: 'A clinical hypnosis technique to access a state of focused attention, heightened receptivity, and bodily calm.',
    whyUsed: 'Allows direct communication with subconscious learned associations and autonomic stress conditioning.',
    howToPerform: 'Fix eye gaze upward, observe eyelid heaviness, descend a tranquil 10-step staircase mentally, and recite personalized affirmations.',
    commonMistakes: 'Expecting to "go unconscious" or lose control; clinical hypnosis is actually a state of heightened, alert relaxation.',
    whatYouMightExperience: 'Pleasant floating or heaviness, time distortion, and profound mental tranquility.',
    questionsDoubts: '"Can I get stuck in hypnosis?" — No, you remain fully in control and can return to full wakefulness at any moment.',
    howAndWhenToPractise: 'Practise in a quiet room or before sleep with headphones.',
    keySteps: [
      'Gaze fixation and eyelid closure',
      'Progressive relaxation deepening (10 to 1)',
      'Installation of personalized therapeutic suggestions',
      'Gentle re-alerting (1 to 5) or drifting into sleep'
    ]
  },

  // ==========================================
  // CATEGORY B: EDUCATIONAL / EXPLANATION VIDEOS
  // Short, conceptual, publicly accessible videos
  // No PIN required
  // ==========================================
  {
    id: 'edu-what-is-anxiety',
    title: 'What is Anxiety?',
    resourceKind: 'educational',
    isRestricted: false,
    typicallyAssignedFor: 'General education, understanding autonomic arousal',
    treatmentArea: 'Anxiety',
    category: 'Psychoeducation',
    duration: '5 mins',
    description: 'An educational breakdown of anxiety: how the evolutionary fight-or-flight response operates, why false alarms occur, and how anxiety differs from everyday stress.',
    clinicalRationale: 'Normalizes physiological symptoms and demystifies the anxiety alarm mechanism.',
    type: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'The evolutionary purpose of fear and anxiety',
      'The sympathetic vs. parasympathetic nervous system',
      'Why the body triggers false alarms in modern life',
      'When anxiety crosses into an anxiety disorder'
    ]
  },
  {
    id: 'edu-what-is-panic',
    title: 'What is a Panic Attack?',
    resourceKind: 'educational',
    isRestricted: false,
    typicallyAssignedFor: 'Panic disorder, sudden surges of intense fear',
    treatmentArea: 'Anxiety',
    category: 'Psychoeducation',
    duration: '6 mins',
    description: 'A clinical explanation of why panic attacks peak within 10 minutes, why racing hearts and shortness of breath are safe adrenaline surges, and why panic is not dangerous.',
    clinicalRationale: 'Eliminates catastrophic misinterpretation of bodily sensations (e.g., "I am having a heart attack").',
    type: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'What happens physiologically during acute panic',
      'The catastrophic misinterpretation cycle',
      'Why panic attacks cannot cause a heart attack or fainting',
      'How to ride the adrenaline wave without fighting it'
    ]
  },
  {
    id: 'edu-what-is-psychotherapy',
    title: 'What is Psychotherapy?',
    resourceKind: 'educational',
    isRestricted: false,
    typicallyAssignedFor: 'Understanding clinical therapy and what to expect',
    treatmentArea: 'Anxiety',
    category: 'Psychoeducation',
    duration: '7 mins',
    description: 'Explores how professional psychotherapy goes far beyond casual conversation to systematically understand and rework emotional and behavioral patterns.',
    clinicalRationale: 'Clarifies therapeutic goals and establishes realistic treatment expectations.',
    type: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'How psychotherapy differs from talking with friends',
      'Case formulation and identifying maintaining patterns',
      'The collaborative therapeutic partnership',
      'Translating clinic insights into lasting behavioral change'
    ]
  },
  {
    id: 'edu-what-is-cbt',
    title: 'What is CBT?',
    resourceKind: 'educational',
    isRestricted: false,
    typicallyAssignedFor: 'Cognitive Behavioural Therapy orientation',
    treatmentArea: 'Overthinking',
    category: 'Psychoeducation',
    duration: '6 mins',
    description: 'A clear guide to the cognitive triangle: how thoughts, feelings, and actions interact, and how changing unhelpful thinking patterns breaks cycles of distress.',
    clinicalRationale: 'Prepares clients for evidence-based cognitive restructuring and behavioural experiments.',
    type: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'The Cognitive Triangle (Thoughts, Emotions, Behaviours)',
      'Identifying cognitive distortions and automatic thoughts',
      'Empirical testing vs. emotional reasoning',
      'Homework and active skill building between sessions'
    ]
  },
  {
    id: 'edu-what-is-hypnotherapy',
    title: 'What is Clinical Hypnotherapy?',
    resourceKind: 'educational',
    isRestricted: false,
    typicallyAssignedFor: 'Hypnosis myths, trance phenomena, clinical application',
    treatmentArea: 'Anxiety',
    category: 'Psychoeducation',
    duration: '8 mins',
    description: 'Demystifying clinical hypnotherapy: dispelling stage hypnosis myths, explaining alpha-theta brain states, and detailing how therapeutic suggestion works.',
    clinicalRationale: 'Removes misconceptions and establishes trust in clinical hypnosis protocols.',
    type: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'Clinical hypnotherapy vs. stage entertainment myths',
      'The neurobiology of trance and focused attention',
      'How suggestions interact with subconscious learned patterns',
      'Suitability and integration with psychotherapy'
    ]
  },
  {
    id: 'edu-what-is-dissociation',
    title: 'What is Dissociation?',
    resourceKind: 'educational',
    isRestricted: false,
    typicallyAssignedFor: 'Depersonalization, derealization, emotional numbing',
    treatmentArea: 'Anxiety',
    category: 'Psychoeducation',
    duration: '7 mins',
    description: 'A clinical explanation of dissociation: feeling detached from one\'s body (depersonalization) or surroundings (derealization) as a defense mechanism under high stress.',
    clinicalRationale: 'Grounding-focused psychoeducation to reduce panic surrounding dissociative sensations.',
    type: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'The spectrum of dissociation (daydreaming to depersonalization)',
      'Why the nervous system temporarily numbs experience',
      'Common triggers and somatic sensations',
      'Effective grounding techniques to re-orient awareness'
    ]
  },
  {
    id: 'edu-when-to-consider-help',
    title: 'When Should You Consider Professional Help?',
    resourceKind: 'educational',
    isRestricted: false,
    typicallyAssignedFor: 'Decision making, recognizing severity of psychological difficulties',
    treatmentArea: 'Depression',
    category: 'Psychoeducation',
    duration: '5 mins',
    description: 'Practical clinical guidelines on distinguishing temporary situational distress from difficulties requiring structured professional psychological consultation.',
    clinicalRationale: 'Encourages timely help-seeking before symptoms become chronically entrenched.',
    type: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=800&q=80',
    keySteps: [
      'Duration and persistence: When symptoms last weeks or months',
      'Functional impairment: Impact on work, sleep, and relationships',
      'The feeling of running out of coping strategies',
      'How early therapeutic intervention prevents chronicity'
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
