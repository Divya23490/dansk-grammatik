import type { TaskBullet, TaskTypeGuide, WritingTaskType } from './types';

/**
 * Original guidance for the three PD3 writing task types, written for the app.
 * Bullet wording follows the official sheets 2013–2024. Where a paper varies
 * the wording, the most common form is shown with "…" and the variants are
 * mentioned in the English gloss.
 */

const EVALUATE_SHARE_NOTE = '(Besvarelsen af dette punkt skal udgøre ca. 50 % af den samlede besvarelse).';

// ─── Delprøve 1 · e-mail ──────────────────────────────────────────────────

const D1_BULLETS: TaskBullet[] = [
  {
    key: 'thanks',
    danish: 'Tak for mailen.',
    english: 'Thank your friend for the mail, ideally in the first line after the greeting.',
  },
  {
    key: 'underlined',
    danish: 'Kom ind på de understregede dele i mailen.',
    english:
      'Respond to every underlined part of the mail. There are usually 3–4 questions (the 2022 paper had 4): normally one or two about your own life and two about a dilemma your friend is facing. A question you skip counts as a missing point.',
  },
  {
    key: 'proposal',
    danish: 'Foreslå, at I mødes, når …',
    english:
      'Do the one concrete action the sheet asks for. Usually it is to propose a meeting. Some papers instead say "Inviter …" or "Foreslå en aktivitet, I kan lave sammen". Give a time, a place or an activity.',
  },
];

const D1: TaskTypeGuide = {
  type: 'd1-email',
  name: 'E-mail to a friend',
  danish: 'Delprøve 1 · e-mail',
  summary:
    "A friendly, informal reply to a Danish friend's mail. Thank them, answer every underlined question (usually one or two about your life and two about their dilemma), and end with the action the sheet asks for, usually proposing a meeting. There is no word count. It weighs less than Delprøve 2, and answering only Delprøve 1 cannot pass, while skipping it rules out a 12.",
  time: 'about 40–45 min',
  targetWords: [170, 250],
  officialBullets: D1_BULLETS,
  tips: [
    {
      phase: 'before',
      tips: [
        {
          title: 'Number the underlined questions',
          text: 'Before you write anything, number every underlined phrase in the mail (1, 2, 3, 4) and write a key word next to each, e.g. "1 køreprøve, 2 kolleger, 3 børn/venner, 4 bil/tog". That is your paragraph plan, and you will tick each one off at the end.',
        },
        {
          title: 'Read the Situation box',
          text: 'The "Situation" paragraph tells you who the friend is and what is happening, e.g. "Hun har været udstationeret i New York i tre år". Use those facts. An answer that ignores the situation reads as generic and loses task-fulfilment points.',
        },
        {
          title: 'Decide your advice before you write',
          text: 'For each dilemma question, choose one side in a few seconds, e.g. "toget". A clear answer with one reason ("…fordi det er billigere og mere miljøvenligt") is better than a vague "det kommer an på".',
        },
        {
          title: 'Keep it to about 40 minutes',
          text: 'Delprøve 2 counts more. Spend about 5 min planning, 30 min writing and 5 min checking, then move on even if you would like to polish more.',
        },
      ],
    },
    {
      phase: 'while',
      tips: [
        {
          title: 'One question, one paragraph',
          text: 'Give each underlined question its own short paragraph, in the same order as in the mail. Start by repeating the key word ("Med hensyn til din køreprøve …", "Du spørger, om børnene kan holde kontakten …") so the censor can see at a glance that the question is answered.',
        },
        {
          title: 'Answer, then give a reason, then add a detail',
          text: 'For dilemma questions use a three-step move: your answer ("Hvis jeg var dig, ville jeg tage toget"), a reason ("…fordi du kan læse eller slappe af undervejs"), and one concrete detail or example. That is what "uddybe" means in the criteria.',
        },
        {
          title: 'Show empathy before advice',
          text: 'Friends do not just give orders. Add one sentence that shows you understand the situation ("Jeg kan godt forstå, at du er lidt nervøs") before your advice. It makes the register natural and adds range.',
        },
        {
          title: 'Small-talk questions need real content',
          text: 'Questions about your own life ("Hvordan gik det med …?") also count. Invent a short, believable answer with one or two details in the past tense: "Det gik heldigvis godt. Jeg bestod i første forsøg, og bagefter fejrede vi det med kage."',
        },
        {
          title: 'Make the proposal concrete',
          text: 'Do not just write "Vi ses". Propose when, where and what: "Hvad siger du til, at vi mødes på en café i byen lørdag den 12., når I er kommet hjem?" The sheet says "foreslå", so a question or a suggestion with "skal vi …?" fits perfectly.',
        },
        {
          title: 'Informal but correct',
          text: 'Write the way you would to a good friend: du, short sentences mixed with longer ones, a warm tone. Informal does not mean careless. Spelling and word order are still graded.',
        },
      ],
    },
    {
      phase: 'proofread',
      tips: [
        {
          title: 'Tick off every question',
          text: 'Go back to your numbered list. Can you point to a sentence that answers each underlined question, and one that does the proposal? If not, add it now. A missing point is worse than any grammar slip.',
        },
        {
          title: 'Check V2 after every fronted word',
          text: 'Scan the first word of each sentence. If it is not the subject (I weekenden, Derfor, Bagefter, Når du kommer hjem), the verb must come next: "I weekenden var jeg …", "Derfor synes jeg …".',
        },
        {
          title: 'Check greeting, sign-off and name',
          text: "Check that the friend's name is spelt exactly as in the mail, that there is a greeting (Hej / Kære) and a sign-off (Kærlig hilsen, Mange hilsner, Knus), and that you signed with a first name only.",
        },
        {
          title: 'Use the dictionary for en/et and plurals',
          text: 'Dictionaries are allowed. Use them for the nouns you are unsure of: en or et, and the plural (ting, not "tinger"; kolleger, not "kollegere"). This is quick and removes the most common errors.',
        },
      ],
    },
  ],
  template: [
    {
      key: 'greeting',
      title: 'Hilsen og tak',
      purpose: 'Greet your friend by name and thank them for the mail. This answers bullet 1.',
      words: [15, 25],
      bullet: 'thanks',
      starters: [
        { da: 'Hej Mia', en: 'Hi Mia' },
        { da: 'Tak for din mail – det var dejligt at høre fra dig.', en: 'Thanks for your mail – it was lovely to hear from you.' },
        { da: 'Tusind tak for mailen. Hvor er det spændende, at I snart kommer hjem!', en: "Thanks a lot for the mail. How exciting that you're coming home soon!" },
        { da: 'Undskyld, at jeg først svarer nu – jeg har haft travlt på arbejdet.', en: "Sorry I'm only replying now – I've been busy at work." },
      ],
    },
    {
      key: 'smalltalk',
      title: 'Svar om dig selv',
      purpose: 'Answer the underlined question about your own life with two or three concrete details in the past tense.',
      words: [30, 50],
      bullet: 'underlined',
      starters: [
        { da: 'Du spørger, hvordan det gik med …', en: 'You ask how … went' },
        { da: 'Det gik heldigvis rigtig godt med …', en: '… went really well, luckily' },
        { da: 'Det er sødt, at du spørger til …', en: "It's sweet of you to ask about …" },
        { da: 'Ellers går det fint her. For tiden har jeg travlt med …', en: "Otherwise things are fine here. At the moment I'm busy with …" },
      ],
    },
    {
      key: 'dilemma-1',
      title: 'Svar på dilemma 1',
      purpose: "Take a position on your friend's first problem: empathy, then advice, then a reason.",
      words: [40, 60],
      bullet: 'underlined',
      starters: [
        { da: 'Med hensyn til dine nye kolleger synes jeg, at …', en: 'As for your new colleagues, I think that …' },
        { da: 'Jeg kan godt forstå, at du er lidt nervøs.', en: 'I can understand that you are a bit nervous.' },
        { da: 'Hvis jeg var dig, ville jeg …', en: 'If I were you, I would …' },
        { da: 'Det vigtigste er efter min mening, at …', en: 'In my opinion the most important thing is that …' },
      ],
    },
    {
      key: 'dilemma-2',
      title: 'Svar på dilemma 2',
      purpose: 'Answer the second dilemma question. Weigh the options briefly, then choose one and say why.',
      words: [40, 60],
      bullet: 'underlined',
      starters: [
        { da: 'Du spørger også, om …', en: 'You also ask whether …' },
        { da: 'Jeg tror godt, at det kan lade sig gøre, fordi …', en: 'I think it can be done, because …' },
        { da: 'På den ene side … På den anden side …', en: 'On the one hand … On the other hand …' },
        { da: 'Jeg ville nok vælge …, fordi …', en: 'I would probably choose …, because …' },
      ],
    },
    {
      key: 'proposal',
      title: 'Forslag',
      purpose: 'Do the action from bullet 3: propose a meeting or activity with a time, a place or an activity.',
      words: [20, 35],
      bullet: 'proposal',
      starters: [
        { da: 'Når du kommer hjem, skal vi ses!', en: "When you're back, we must meet up!" },
        { da: 'Hvad siger du til, at vi mødes på en café i byen på lørdag?', en: 'How about meeting at a café in town on Saturday?' },
        { da: 'Har du lyst til at komme til middag hos mig, når I er faldet på plads?', en: "Would you like to come to dinner at mine once you've settled in?" },
        { da: 'Skal vi tage en tur i skoven, hvis vejret er godt?', en: 'Shall we go for a walk in the woods if the weather is nice?' },
      ],
    },
    {
      key: 'closing',
      title: 'Afslutning',
      purpose: 'A warm closing line, a sign-off and your first name.',
      words: [5, 15],
      starters: [
        { da: 'Jeg glæder mig til at høre fra dig.', en: 'I look forward to hearing from you.' },
        { da: 'Hils familien!', en: 'Say hi to the family!' },
        { da: 'Kærlig hilsen', en: 'Love / Warm regards' },
        { da: 'Mange hilsner', en: 'Best wishes' },
      ],
    },
  ],
  phrases: [
    {
      function: 'Opening the mail',
      items: [
        { da: 'Hej Peter', en: 'Hi Peter' },
        { da: 'Kære Mia', en: 'Dear Mia' },
        { da: 'Tak for din mail.', en: 'Thanks for your mail.' },
        { da: 'Tak for sidst – det var rigtig hyggeligt.', en: 'Thanks for last time – it was really nice.' },
        { da: 'Hvor var det dejligt at høre fra dig!', en: 'How lovely to hear from you!' },
        { da: 'Undskyld, at jeg først svarer nu.', en: "Sorry I'm only replying now." },
      ],
    },
    {
      function: 'Pointing to the question',
      items: [
        { da: 'Du spørger, om …', en: 'You ask whether …' },
        { da: 'Med hensyn til …', en: 'As for … / Regarding …' },
        { da: 'Hvad angår …', en: 'When it comes to …' },
        { da: 'Nu til dit spørgsmål om …', en: 'Now to your question about …' },
        { da: 'Du skriver, at du er i tvivl om …', en: "You write that you're unsure about …" },
      ],
    },
    {
      function: 'Showing empathy',
      items: [
        { da: 'Jeg kan godt forstå, at du er i tvivl.', en: 'I can understand that you are unsure.' },
        { da: 'Det lyder som en svær situation.', en: 'That sounds like a difficult situation.' },
        { da: 'Det er helt normalt at være nervøs.', en: "It's completely normal to be nervous." },
        { da: 'Hvor er det ærgerligt!', en: 'What a shame!' },
        { da: 'Det lyder rigtig spændende.', en: 'That sounds really exciting.' },
        { da: 'Tillykke med det nye job!', en: 'Congratulations on the new job!' },
      ],
    },
    {
      function: 'Giving advice',
      items: [
        { da: 'Hvis jeg var dig, ville jeg …', en: 'If I were you, I would …' },
        { da: 'Jeg synes, du skal …', en: 'I think you should …' },
        { da: 'Måske kunne du prøve at …', en: 'Maybe you could try to …' },
        { da: 'Det er en god idé at …', en: "It's a good idea to …" },
        { da: 'Jeg vil anbefale dig at …', en: 'I would recommend that you …' },
        { da: 'Du skal ikke være bekymret for …', en: "You shouldn't worry about …" },
        { da: 'Det vigtigste er, at …', en: 'The most important thing is that …' },
      ],
    },
    {
      function: 'Weighing two options',
      items: [
        { da: 'På den ene side … på den anden side …', en: 'On the one hand … on the other hand …' },
        { da: 'Fordelen ved … er, at …', en: 'The advantage of … is that …' },
        { da: 'Til gengæld …', en: 'On the other hand … / In return …' },
        { da: 'Jeg ville nok vælge …, fordi …', en: 'I would probably choose …, because …' },
        { da: 'Det kommer selvfølgelig an på …, men …', en: 'Of course it depends on …, but …' },
      ],
    },
    {
      function: 'Telling about yourself',
      items: [
        { da: 'Det gik heldigvis godt.', en: 'It went well, luckily.' },
        { da: 'Jeg har haft meget travlt med …', en: 'I have been very busy with …' },
        { da: 'I weekenden var jeg …', en: 'At the weekend I was …' },
        { da: 'Bagefter fejrede vi det med …', en: 'Afterwards we celebrated with …' },
        { da: 'Det var en stor oplevelse.', en: 'It was a great experience.' },
        { da: 'Ellers går det fint her.', en: 'Otherwise things are fine here.' },
      ],
    },
    {
      function: 'Proposing a meeting',
      items: [
        { da: 'Skal vi mødes, når du kommer hjem?', en: "Shall we meet when you're back?" },
        { da: 'Hvad siger du til, at vi …?', en: 'How about we …?' },
        { da: 'Har du lyst til at …?', en: 'Would you like to …?' },
        { da: 'Jeg vil gerne invitere dig på middag.', en: "I'd like to invite you to dinner." },
        { da: 'Passer det dig på lørdag?', en: 'Does Saturday suit you?' },
        { da: 'Så kan vi snakke videre om det.', en: 'Then we can talk more about it.' },
      ],
    },
    {
      function: 'Closing the mail',
      items: [
        { da: 'Jeg glæder mig til at se dig.', en: 'I look forward to seeing you.' },
        { da: 'Skriv snart igen!', en: 'Write again soon!' },
        { da: 'Hils familien!', en: 'Say hi to the family!' },
        { da: 'Kærlig hilsen', en: 'Love / Warm regards' },
        { da: 'Mange hilsner', en: 'Best wishes' },
        { da: 'Knus', en: 'Hugs (close friends)' },
      ],
    },
  ],
  pitfalls: [
    {
      id: 'd1-greeting-register',
      title: 'Too formal for a friend',
      explanation:
        'The reader is a friend, so the pragmatic criterion includes register. Openings and closings from a job application ("Med venlig hilsen", "Jeg skriver til dig angående …") sound cold and odd in a mail to a friend.',
      wrong: 'Kære Mia. Jeg skriver angående din henvendelse. Med venlig hilsen, Anna Hansen',
      right: 'Hej Mia! Tak for din mail – det var dejligt at høre fra dig. Kærlig hilsen, Anna',
      seenIn: 'general',
    },
    {
      id: 'd1-de-formal',
      title: '"De" instead of "du"',
      explanation:
        'Modern Danish uses du with almost everyone, and always with a friend. "De/Dem/Deres" is reserved for royalty and very formal letters. In this mail it reads as a mistake, not politeness.',
      wrong: 'Hvordan har De det? Jeg håber, at Deres familie har det godt.',
      right: 'Hvordan har du det? Jeg håber, at din familie har det godt.',
      seenIn: 'general',
    },
    {
      id: 'd1-missed-underlined',
      title: 'Skipping an underlined question',
      explanation:
        'Every underlined part is part of bullet 2, so a skipped question means a bullet is not fully answered. That is a task-fulfilment error that grammar cannot make up for. Questions about your own life are the ones most often forgotten.',
      wrong: 'Tak for mailen! Du skal tage toget. Skal vi ses snart? Hilsen Anna',
      right: 'Tak for mailen! Køreprøven gik godt … Med hensyn til dine kolleger … Du spørger også, om børnene … Hvis jeg var dig, ville jeg tage toget … Skal vi ses, når I er kommet hjem?',
      seenIn: 'general',
    },
    {
      id: 'd1-thin-answers',
      title: 'One-line answers with no reason',
      explanation:
        'The criteria ask whether the relevant points are developed ("uddybes"). "Ja, det tror jeg" answers the question but shows no language. Add a reason and a detail.',
      wrong: 'Tror du, børnene kan holde kontakten? Ja, det tror jeg.',
      right: 'Ja, det tror jeg faktisk godt. Unge i dag skriver sammen på de sociale medier hver dag, og de kan jo besøge hinanden i ferierne.',
      seenIn: 'general',
    },
    {
      id: 'd1-vague-proposal',
      title: 'A proposal with no content',
      explanation:
        'Bullet 3 asks you to propose something. "Vi ses" is a goodbye, not a proposal. Name a time, a place or an activity so the censor can see you did the task.',
      wrong: 'Vi ses!',
      right: 'Hvad siger du til, at vi mødes på en café i Odense, når I er faldet på plads? Så kan du fortælle om New York.',
      seenIn: 'general',
    },
    {
      id: 'd1-v2-fronted-time',
      title: 'Verb second after a fronted time expression',
      explanation:
        'When a sentence starts with anything other than the subject, such as a time, a place or "derfor", the finite verb must come next and the subject follows it. English word order ("At the weekend I was …") pulls you the wrong way.',
      wrong: 'I weekenden jeg var i Tivoli med min familie.',
      right: 'I weekenden var jeg i Tivoli med min familie.',
      ruleId: 'v2-inversion',
      seenIn: 'own-mails',
    },
    {
      id: 'd1-svaret-spelling',
      title: '"svart" → "svaret"',
      explanation:
        'The noun is "et svar", so the definite form is "svaret" (the answer). The past participle of "at svare" is also "svaret". "Svart" does not exist in Danish. It is a mix of the English sound and Norwegian/Swedish spelling.',
      wrong: 'Tak for dit hurtige svart. Jeg har ikke svart før nu.',
      right: 'Tak for dit hurtige svar. Jeg har ikke svaret før nu.',
      seenIn: 'own-mails',
    },
    {
      id: 'd1-ting-plural',
      title: '"tinger" → "ting"',
      explanation:
        'Some Danish nouns do not change in the plural: en ting – to ting – tingene. Adding -er by analogy with "en avis – aviser" is a very visible error. Check irregular plurals in the dictionary.',
      wrong: 'Jeg har mange tinger at fortælle dig.',
      right: 'Jeg har mange ting at fortælle dig.',
      seenIn: 'own-mails',
    },
    {
      id: 'd1-en-et-gender',
      title: 'en/et slips',
      explanation:
        'Gender controls the article and the adjective ending: en god idé, et nyt job. Learners often get the noun right but the adjective wrong, or the other way round. When in doubt, look the noun up. The dictionary shows en or et.',
      wrong: 'Jeg har fået en nyt job, og det er et god idé at tage toget.',
      right: 'Jeg har fået et nyt job, og det er en god idé at tage toget.',
      seenIn: 'own-mails',
    },
    {
      id: 'd1-glaede-sig-til',
      title: '"glæder mig at" → "glæder mig til at"',
      explanation:
        '"At glæde sig til" (to look forward to) always takes "til". It is one of the most common closing lines, so the censor sees it at the very end of your mail.',
      wrong: 'Jeg glæder mig at se dig.',
      right: 'Jeg glæder mig til at se dig.',
      seenIn: 'general',
    },
    {
      id: 'd1-hjem-hjemme',
      title: '"hjem" (movement) vs "hjemme" (place)',
      explanation:
        'With verbs of movement (komme, tage, rejse) use "hjem". For being somewhere use "hjemme". The same pattern applies to ud/ude, ind/inde and op/oppe.',
      wrong: 'Hvad med at vi mødes, når I kommer hjemme?',
      right: 'Hvad med at vi mødes, når I kommer hjem?',
      seenIn: 'general',
    },
  ],
};

// ─── Delprøve 2A · diagram ────────────────────────────────────────────────

const D2A_BULLETS: TaskBullet[] = [
  {
    key: 'describe',
    danish: 'Beskriv kort hovedtrækkene i diagrammet.',
    english:
      'Briefly describe the main features of the diagram: the biggest and smallest values, the overall trend, and one or two striking differences. "Kort" means do not go through every number.',
  },
  {
    key: 'causes',
    danish: 'Fortæl, hvilke årsager der kan være til de forskelle, diagrammet viser.',
    english:
      'Suggest possible causes of the differences or the development the diagram shows. Sometimes the wording is "… til udviklingen". Give two or three causes, each with a short explanation.',
  },
  {
    key: 'evaluate',
    danish: `Vurdér fordele og ulemper ved … Begrund dine synspunkter. ${EVALUATE_SHARE_NOTE}`,
    english:
      'Weigh advantages and disadvantages of the topic, take a position and give reasons. This point must be about half of your text. The wording varies: "Hvilke fordele og ulemper mener du, der kan være for …?", "Diskutér …" or "Vurdér, om …". Answer exactly the question that is asked.',
    share: 0.5,
  },
];

const D2A: TaskTypeGuide = {
  type: 'd2a-diagram',
  name: 'Diagram task',
  danish: 'Delprøve 2A · diagram',
  summary:
    'A short factual essay of at least 200 words built on a diagram about a social topic. Describe the main features, suggest causes for what it shows, then spend about half the text weighing pros and cons and giving your own reasoned view. Choose 2A if you are comfortable with numbers and trends. The censor checks every bullet against its exact wording.',
  time: 'about 80–90 min, plus 10–15 min proofreading',
  minWords: 200,
  targetWords: [210, 260],
  officialBullets: D2A_BULLETS,
  tips: [
    {
      phase: 'before',
      tips: [
        {
          title: 'Read the title, axes and source first',
          text: 'Before looking at the bars, read what is measured (andel, antal, procent), for whom and when. Many describe-errors come from mixing up "antal" (number) and "andel" (share), or from misreading the years.',
        },
        {
          title: 'Find two or three main features',
          text: 'Circle the highest value, the lowest value and the clearest trend or gap. That is your whole description. You do not need every bar. "Hovedtræk" means main features.',
        },
        {
          title: 'Underline the exact evaluation question',
          text: 'The third bullet decides the grade. Underline its key words, e.g. "fordele og ulemper for samfundet ved, at unge bekymrer sig …". Answer that question, not the general topic. Censors judge against the exact wording.',
        },
        {
          title: 'Plan your word budget',
          text: 'Aim for about 210–260 words: about 45 for the description, 50 for causes and 110–130 for the evaluation. Staying close to 200 is wise. Teachers have marked down 350-word answers as too long, and long texts mean more errors.',
        },
        {
          title: 'Jot causes in note form',
          text: 'Write three possible causes as key words (økonomi, alder, uddannelse, teknologi, lovgivning …) and pick the two you can explain best in Danish.',
        },
      ],
    },
    {
      phase: 'while',
      tips: [
        {
          title: 'Describe trends, not lists of numbers',
          text: 'Use rounded figures and comparisons: "Ca. en tredjedel af de 18–34-årige cykler til arbejde, mens det kun gælder hver ottende af de over 65-årige." One or two numbers per sentence, linked by mens, til gengæld or derimod.',
        },
        {
          title: 'Do not invent facts the chart does not show',
          text: 'The description must match the diagram. Save your interpretations for the causes paragraph and mark them as possibilities: "En mulig årsag kan være …", "Det skyldes måske, at …". Do not present a guess as a fact from the chart.',
        },
        {
          title: 'Causes: claim plus explanation',
          text: 'Each cause should have two sentences: the cause ("En årsag kan være, at unge bruger de sociale medier mere") and why it explains the difference ("Der møder de mange nyheder om klimaet, og det kan skabe bekymring").',
        },
        {
          title: 'Build the evaluation in four steps',
          text: 'Fordele (2 points with reasons), then ulemper (1–2 points), then your own view ("Efter min mening …"), then a reason and an example ("…fordi … Et eksempel er …"). That shape gets you to about 50% without padding.',
        },
        {
          title: 'Use the bullet words as signposts',
          text: 'Open each paragraph with the words from its bullet: "Diagrammet viser …", "Der kan være flere årsager til …", "Der er både fordele og ulemper ved …". The censor sees immediately which bullet you are answering.',
        },
        {
          title: 'End with a short summary',
          text: 'The criteria ask whether the answer is summed up ("sammenfattes besvarelsen?"). Finish with two sentences starting "Samlet set …" or "Alt i alt …" that restate your position.',
        },
      ],
    },
    {
      phase: 'proofread',
      tips: [
        {
          title: 'Count and compare',
          text: 'Count words roughly (words per line × lines). Check that you have at least 200 and that the evaluation is clearly the longest part.',
        },
        {
          title: 'Check figures against the chart',
          text: 'Check every number and every "flest/færrest" against the diagram, and make sure you wrote "procentpoint" for differences between percentages.',
        },
        {
          title: 'Hunt the high-frequency errors',
          text: 'Check in this order: V2 after a fronted word ("Derfor bruger …"), ikke before the verb in subordinate clauses ("…fordi de ikke har råd"), "have" after modal verbs ("kan have"), and en/et with adjective endings.',
        },
        {
          title: 'Dictionary for doubtful words',
          text: 'Look up the nouns you used for the topic: gender, plural and spelling, e.g. arbejdsplads, kolleger, undersøgelse, udvikling. Fixing two spelling errors takes a minute and helps the linguistic score.',
        },
      ],
    },
  ],
  template: [
    {
      key: 'intro',
      title: 'Indledning',
      purpose: 'One or two sentences: what the diagram shows, about whom and when. No numbers yet.',
      words: [10, 20],
      bullet: 'describe',
      starters: [
        { da: 'Diagrammet viser …, fordelt på …', en: 'The diagram shows …, broken down by …' },
        { da: 'Tallene stammer fra … og dækker perioden fra … til …', en: 'The figures come from … and cover the period from … to …' },
        { da: 'Undersøgelsen handler om …', en: 'The survey is about …' },
      ],
    },
    {
      key: 'features',
      title: 'Hovedtræk',
      purpose: 'The two or three main features: highest and lowest value, overall trend, one striking gap. Round the numbers.',
      words: [35, 45],
      bullet: 'describe',
      starters: [
        { da: 'Det mest iøjnefaldende er, at …', en: 'The most striking thing is that …' },
        { da: 'Andelen af … er steget fra ca. … % i … til ca. … % i …', en: 'The share of … rose from about …% in … to about …% in …' },
        { da: 'Flest … findes blandt …, mens færrest …', en: 'Most … are found among …, while fewest …' },
        { da: 'Til sammenligning gælder det kun …', en: 'By comparison, this applies to only …' },
      ],
    },
    {
      key: 'causes',
      title: 'Årsager',
      purpose: 'Two possible causes of the differences, each with a sentence of explanation. Mark them as possibilities.',
      words: [40, 55],
      bullet: 'causes',
      starters: [
        { da: 'Der kan være flere årsager til denne forskel.', en: 'There may be several reasons for this difference.' },
        { da: 'En mulig årsag er, at …', en: 'One possible reason is that …' },
        { da: 'En anden forklaring kan være, at …', en: 'Another explanation may be that …' },
        { da: 'Desuden spiller det sandsynligvis en rolle, at …', en: 'It probably also plays a part that …' },
      ],
    },
    {
      key: 'pros',
      title: 'Vurdering: fordele',
      purpose: 'Start of the evaluation (about 50% in total): two advantages, each with a reason or consequence.',
      words: [30, 40],
      bullet: 'evaluate',
      starters: [
        { da: 'Der er både fordele og ulemper ved …', en: 'There are both advantages and disadvantages to …' },
        { da: 'En stor fordel er, at …', en: 'A big advantage is that …' },
        { da: 'For det første … For det andet …', en: 'Firstly … Secondly …' },
        { da: 'Det betyder blandt andet, at …', en: 'Among other things, this means that …' },
      ],
    },
    {
      key: 'cons',
      title: 'Vurdering: ulemper',
      purpose: 'One or two disadvantages, again with a reason or consequence. Signal the turn clearly.',
      words: [30, 40],
      bullet: 'evaluate',
      starters: [
        { da: 'Der er dog også ulemper.', en: 'However, there are also disadvantages.' },
        { da: 'Til gengæld kan det være et problem, at …', en: 'On the other hand, it can be a problem that …' },
        { da: 'En ulempe er, at …, og det kan føre til, at …', en: 'A disadvantage is that …, and that can lead to …' },
      ],
    },
    {
      key: 'opinion',
      title: 'Vurdering: min holdning',
      purpose: 'Your own position, with a reason and a concrete example. This is "Begrund dine synspunkter".',
      words: [40, 50],
      bullet: 'evaluate',
      starters: [
        { da: 'Efter min mening opvejer fordelene ulemperne, fordi …', en: 'In my opinion the advantages outweigh the disadvantages, because …' },
        { da: 'Jeg mener, at …, og det begrunder jeg med, at …', en: 'I believe that …, and my reason is that …' },
        { da: 'Et eksempel fra min egen hverdag er …', en: 'An example from my own everyday life is …' },
        { da: 'Derfor synes jeg, at …', en: 'That is why I think that …' },
      ],
    },
    {
      key: 'conclusion',
      title: 'Afslutning',
      purpose: 'Sum up in one or two sentences and restate your position. This rounds off the evaluation.',
      words: [15, 20],
      bullet: 'evaluate',
      starters: [
        { da: 'Samlet set kan man sige, at …', en: 'All things considered, one can say that …' },
        { da: 'Alt i alt mener jeg, at …', en: 'All in all, I believe that …' },
        { da: 'Derfor bør vi efter min mening …', en: 'Therefore, in my view, we should …' },
      ],
    },
  ],
  phrases: [
    {
      function: 'Introducing the diagram',
      items: [
        { da: 'Diagrammet viser …', en: 'The diagram shows …' },
        { da: 'Af diagrammet fremgår det, at …', en: 'It appears from the diagram that …' },
        { da: 'Ifølge undersøgelsen …', en: 'According to the survey …' },
        { da: '… fordelt på alder / køn / år', en: '… broken down by age / gender / year' },
        { da: 'Tallene er fra …', en: 'The figures are from …' },
        { da: 'Kilden er Danmarks Statistik.', en: 'The source is Statistics Denmark.' },
      ],
    },
    {
      function: 'Describing numbers and trends',
      items: [
        { da: 'stiger / er steget fra … til …', en: 'rises / has risen from … to …' },
        { da: 'falder / er faldet markant', en: 'falls / has fallen markedly' },
        { da: 'ligger stabilt på omkring …', en: 'stays stable at around …' },
        { da: 'ca. en fjerdedel / en tredjedel / halvdelen', en: 'about a quarter / a third / half' },
        { da: 'næsten hver femte', en: 'almost one in five' },
        { da: 'en stigning på 10 procentpoint', en: 'an increase of 10 percentage points' },
        { da: 'er mere end fordoblet', en: 'has more than doubled' },
        { da: 'topper i …', en: 'peaks in …' },
      ],
    },
    {
      function: 'Comparing groups',
      items: [
        { da: 'Flest … / Færrest …', en: 'Most … / Fewest …' },
        { da: 'den største / mindste andel', en: 'the largest / smallest share' },
        { da: '… mens …', en: '… while …' },
        { da: 'Til sammenligning …', en: 'By comparison …' },
        { da: 'Derimod …', en: 'In contrast …' },
        { da: 'dobbelt så mange som …', en: 'twice as many as …' },
        { da: 'Forskellen mellem … og … er størst blandt …', en: 'The gap between … and … is largest among …' },
      ],
    },
    {
      function: 'Giving possible causes',
      items: [
        { da: 'En mulig årsag er, at …', en: 'One possible cause is that …' },
        { da: 'Det skyldes måske, at …', en: 'It may be due to the fact that …' },
        { da: 'Det kan hænge sammen med, at …', en: 'It may be connected with the fact that …' },
        { da: 'En anden forklaring kan være …', en: 'Another explanation may be …' },
        { da: 'Det spiller også en rolle, at …', en: 'It also plays a part that …' },
        { da: 'Det kan føre til, at …', en: 'It can lead to …' },
      ],
    },
    {
      function: 'Advantages and disadvantages',
      items: [
        { da: 'Der er både fordele og ulemper ved …', en: 'There are both pros and cons to …' },
        { da: 'En fordel er, at …', en: 'One advantage is that …' },
        { da: 'Den største ulempe er nok, at …', en: 'The biggest drawback is probably that …' },
        { da: 'Til gengæld …', en: 'On the other hand …' },
        { da: 'Det positive ved … er, at …', en: 'The positive thing about … is that …' },
        { da: 'Omvendt kan man sige, at …', en: 'Conversely, one could say that …' },
        { da: 'Bagsiden af medaljen er, at …', en: 'The other side of the coin is that …' },
      ],
    },
    {
      function: 'Giving your opinion with reasons',
      items: [
        { da: 'Efter min mening …', en: 'In my opinion …' },
        { da: 'Jeg mener, at …, fordi …', en: 'I believe that …, because …' },
        { da: 'Jeg er overbevist om, at …', en: 'I am convinced that …' },
        { da: 'Det begrunder jeg med, at …', en: 'My reason for this is that …' },
        { da: 'Et godt eksempel på det er …', en: 'A good example of this is …' },
        { da: 'Fordelene opvejer efter min mening ulemperne.', en: 'In my view the advantages outweigh the disadvantages.' },
      ],
    },
    {
      function: 'Concluding',
      items: [
        { da: 'Samlet set …', en: 'All things considered …' },
        { da: 'Alt i alt …', en: 'All in all …' },
        { da: 'Konklusionen er, at …', en: 'The conclusion is that …' },
        { da: 'Derfor mener jeg, at …', en: 'That is why I believe that …' },
        { da: 'Sammenfattende kan man sige, at …', en: 'To sum up, one can say that …' },
      ],
    },
  ],
  pitfalls: [
    {
      id: 'd2a-number-dump',
      title: 'Reading out every number',
      explanation:
        'The bullet says "Beskriv kort hovedtrækkene". Listing every bar uses up your word budget, adds nothing to the evaluation and shows little language. Pick the main features and compare them.',
      wrong: 'De 18–34-årige er 32 %. De 35–49-årige er 24 %. De 50–64-årige er 17 %. De over 65 år er 12 %.',
      right: 'Jo ældre man er, desto færre cykler til arbejde: ca. en tredjedel af de 18–34-årige cykler, mens det kun gælder ca. hver ottende over 65 år.',
      seenIn: 'general',
    },
    {
      id: 'd2a-invented-facts',
      title: 'Claiming what the chart does not show',
      explanation:
        'The description must stay true to the diagram. If it shows age groups only, you cannot "describe" a difference between men and women or a development over time. Put interpretations in the causes paragraph as possibilities.',
      wrong: 'Diagrammet viser, at unge cykler mere, fordi de er mere miljøbevidste end de ældre.',
      right: 'Diagrammet viser, at de unge cykler mest. En mulig årsag kan være, at mange unge ikke har råd til en bil.',
      seenIn: 'general',
    },
    {
      id: 'd2a-procent-vs-procentpoint',
      title: 'procent vs procentpoint',
      explanation:
        'A rise from 10 % to 15 % is 5 procentpoint (percentage points) but 50 procent in relative terms. Using "procent" for the difference between two percentages is a factual error in the description.',
      wrong: 'Andelen er steget fra 10 % til 15 %, altså en stigning på 5 procent.',
      right: 'Andelen er steget fra 10 % til 15 %, altså en stigning på 5 procentpoint.',
      seenIn: 'general',
    },
    {
      id: 'd2a-missing-position',
      title: 'Pros and cons, but no position',
      explanation:
        '"Vurdér" and "Begrund dine synspunkter" require your own view. A neutral list of pros and cons answers only half the bullet. Finish the evaluation with "Efter min mening …, fordi …".',
      wrong: 'Der er fordele og ulemper. Det kommer an på situationen.',
      right: 'Efter min mening er fordelene størst, fordi unge, der bekymrer sig, også ændrer deres vaner – for eksempel spiser mange mindre kød.',
      seenIn: 'general',
    },
    {
      id: 'd2a-too-long',
      title: 'Writing far too much',
      explanation:
        'A teacher marked a 357-word 2A answer down as too long: "en god idé at holde dig tæt på de 200 ord". Extra length does not earn points. It adds errors and usually means the evaluation does not reach 50%. Aim for 210–260 words.',
      wrong: '350+ words with a long description and a short evaluation',
      right: 'About 230 words: ~45 description, ~50 causes, ~130 evaluation and conclusion',
      seenIn: 'teacher',
    },
    {
      id: 'd2a-der-er-mange',
      title: '"Det er mange, der …" → "Der er mange, der …"',
      explanation:
        'To say that something exists or that there are many people who do something, Danish uses "der er". "Det er" points to something specific ("Det er en god idé"). Mixing them up was a repeated teacher correction.',
      wrong: 'Det er mange unge, som bekymrer sig om klimaet.',
      right: 'Der er mange unge, der bekymrer sig om klimaet.',
      ruleId: 'subject-required',
      seenIn: 'teacher',
    },
    {
      id: 'd2a-modal-have',
      title: '"kan har" → "kan have"',
      explanation:
        'After a modal verb (kan, skal, vil, må, bør) the next verb is in the infinitive: kan have, skal have, vil være. The present tense "har" after a modal is a frequent slip because "har" is so common.',
      wrong: 'Det kan har store fordele for samfundet, og vi skal har flere grønne løsninger.',
      right: 'Det kan have store fordele for samfundet, og vi skal have flere grønne løsninger.',
      seenIn: 'teacher',
    },
    {
      id: 'd2a-mere-mest',
      title: 'mere (comparative) vs mest (superlative)',
      explanation:
        'Use "mere … end" when comparing two groups and "mest" when one group stands out from all the others. The diagram task invites both, so mixing them up is easy to spot.',
      wrong: 'De unge er de mere bekymrede af alle aldersgrupper.',
      right: 'De unge er de mest bekymrede af alle aldersgrupper, og de er mere bekymrede end de ældre.',
      seenIn: 'teacher',
    },
    {
      id: 'd2a-v2-derfor',
      title: 'Verb second after "derfor", "desuden", "til gengæld"',
      explanation:
        'Linking adverbs are exactly what 2A asks for, and every one of them in the front slot triggers inversion. Write the verb immediately after the linking word.',
      wrong: 'Derfor de unge bruger mere tid på nyheder.',
      right: 'Derfor bruger de unge mere tid på nyheder.',
      ruleId: 'v2-inversion',
      seenIn: 'own-mails',
    },
    {
      id: 'd2a-ikke-subordinate',
      title: '"ikke" before the verb after fordi/at/hvis',
      explanation:
        'In subordinate clauses (after fordi, at, hvis, når, selvom) the adverb ikke comes before the finite verb. Cause sentences are full of "fordi", so this error shows up again and again in the causes paragraph.',
      wrong: 'Mange ældre tager toget, fordi de har ikke en bil.',
      right: 'Mange ældre tager toget, fordi de ikke har en bil.',
      ruleId: 'ikke-regel',
      seenIn: 'general',
    },
  ],
};

// ─── Delprøve 2B · list of viewpoints ─────────────────────────────────────

const D2B_BULLETS: TaskBullet[] = [
  {
    key: 'experience',
    danish: 'Fortæl kort om dine egne erfaringer med …',
    english:
      'Briefly tell about your own experience with the topic, from Denmark or your home country. "Kort" means a short paragraph, not your life story. Some papers ask "Fortæl kort om et/en … du har oplevet eller hørt om".',
  },
  {
    key: 'viewpoints',
    danish: 'Kommentér et eller to af synspunkterne fra listen.',
    english:
      'Pick one or two of the six statements in the box (also called "faktorerne" or "eksemplerne" on some papers) and comment on them: agree or disagree, give a reason and an example. Do not discuss all six.',
  },
  {
    key: 'evaluate',
    danish: `Vurdér … Begrund dine synspunkter. ${EVALUATE_SHARE_NOTE}`,
    english:
      'Weigh the question in the bullet and reach a reasoned conclusion. It is often "Vurdér fordele og ulemper ved …" or "Vurdér, om …". It must be about half of your text. Answer exactly the question that is asked.',
    share: 0.5,
  },
];

const D2B: TaskTypeGuide = {
  type: 'd2b-list',
  name: 'Viewpoints task',
  danish: 'Delprøve 2B · synspunkter',
  summary:
    'An opinion essay of at least 200 words built on a box of six statements about a social topic. Tell briefly about your own experience, comment on one or two of the statements, then spend about half the text on the evaluation question with a clear, reasoned position. Choose 2B if you would rather argue than describe numbers.',
  time: 'about 80–90 min, plus 10–15 min proofreading',
  minWords: 200,
  targetWords: [210, 260],
  officialBullets: D2B_BULLETS,
  tips: [
    {
      phase: 'before',
      tips: [
        {
          title: 'Pick the two easiest statements',
          text: 'Read the six statements and tick the two you have the most to say about, ideally one you agree with and one you partly disagree with. That gives the comment paragraph natural contrast.',
        },
        {
          title: 'Underline the exact evaluation question',
          text: 'The third bullet is often a specific question ("Vurdér, om det er lederens personlige eller faglige kvalifikationer, der er vigtigst …"). Underline it and answer that question, not the general topic. Censors judge against the exact wording.',
        },
        {
          title: 'Choose one experience, fast',
          text: 'Use a real or plausible experience: a job, a school, your home country compared with Denmark. Choose something that also leads into the evaluation, so the paragraphs connect.',
        },
        {
          title: 'Plan your word budget',
          text: 'Aim for 210–260 words: about 40 for the experience, 55 for the comments and 110–140 for the evaluation and conclusion. The evaluation should be clearly the longest part.',
        },
      ],
    },
    {
      phase: 'while',
      tips: [
        {
          title: 'Keep the experience short and concrete',
          text: 'Three or four sentences in the past tense with one telling detail ("Da jeg arbejdede på et hotel i Aarhus, havde vi fleksible vagter …"). Then stop. It is the shortest bullet.',
        },
        {
          title: 'How to "kommentér" a statement',
          text: 'Quote or name the statement, give your position, a reason and an example: "På listen står der, at god løn er vigtigst. Det er jeg kun delvist enig i, fordi … For eksempel …". A comment is not a summary of the statement.',
        },
        {
          title: 'Structure the evaluation',
          text: 'Arguments for, then arguments against, then your position, then the reason with an example ("Når jeg vejer argumenterne op imod hinanden, mener jeg, at …, fordi …"). If the bullet asks "om A eller B", choose one, even if you mention that both matter.',
        },
        {
          title: 'Signpost each bullet',
          text: 'Start each paragraph with words from the bullet: "Jeg har selv erfaring med …", "Et af synspunkterne på listen er …", "Spørgsmålet er, om …". The censor ticks bullets as they read.',
        },
        {
          title: 'Write your own sentences',
          text: 'You may reuse key words from the sheet, but copying the intro or the statements word for word adds length without showing your Danish. Rephrase: "god løn" → "en høj løn", "at man tjener godt".',
        },
        {
          title: 'Finish with a summary',
          text: 'Close with "Samlet set …" and your answer to the evaluation question in one or two sentences. The criteria ask whether the answer is summed up.',
        },
      ],
    },
    {
      phase: 'proofread',
      tips: [
        {
          title: 'Check the 50% rule',
          text: 'Count the words in the evaluation and conclusion. If they are not about half, cut from the experience paragraph and add a reason or example to the evaluation.',
        },
        {
          title: 'Check V2 and ikke placement',
          text: 'Look at every sentence that starts with a subordinate clause or an adverb ("Hvis man har børn, skal man …", "Derfor mener jeg …") and every "fordi … ikke".',
        },
        {
          title: 'Check the words of the topic',
          text: 'The topic words come up again and again, so one misspelling becomes five. Look them up once: arbejdsplads, kolleger, erfaring, mulighed, fællesskab.',
        },
        {
          title: 'Check relative clauses',
          text: 'Every "hvem" or "hvad" in the middle of a sentence is suspect. In relative clauses use "der/som" ("folk, der …"), and "den, der …" for "the one who".',
        },
        {
          title: 'Read once for tone',
          text: 'The text is a short opinion essay, not a mail. Remove greetings, "du" addressed to the reader and chatty fillers ("haha", "ok").',
        },
      ],
    },
  ],
  template: [
    {
      key: 'intro',
      title: 'Indledning',
      purpose: 'One or two sentences that introduce the topic in your own words.',
      words: [10, 20],
      starters: [
        { da: 'Der er meget debat om … i Danmark i disse år.', en: 'There is a lot of debate about … in Denmark these days.' },
        { da: 'Mange har en holdning til …, og det har jeg også.', en: 'Many people have an opinion on …, and so do I.' },
        { da: 'Spørgsmålet om … berører næsten alle.', en: 'The question of … affects almost everyone.' },
      ],
    },
    {
      key: 'experience',
      title: 'Egne erfaringer',
      purpose: 'A short, concrete experience in the past tense: from Denmark or a comparison with your home country.',
      words: [35, 50],
      bullet: 'experience',
      starters: [
        { da: 'Jeg har selv erfaring med …, fordi …', en: 'I have experience with … myself, because …' },
        { da: 'Da jeg boede i …, oplevede jeg, at …', en: 'When I lived in …, I experienced that …' },
        { da: 'På min arbejdsplads har vi for eksempel …', en: 'At my workplace we have, for example, …' },
        { da: 'I mit hjemland er det almindeligt at …, men i Danmark …', en: 'In my home country it is common to …, but in Denmark …' },
      ],
    },
    {
      key: 'viewpoints',
      title: 'Kommentar til synspunkter',
      purpose: 'Comment on one or two statements: position, reason, example.',
      words: [50, 65],
      bullet: 'viewpoints',
      starters: [
        { da: 'På listen står der, at … Det er jeg enig i, fordi …', en: 'The list says that … I agree, because …' },
        { da: 'Jeg er kun delvist enig i synspunktet om, at …', en: 'I only partly agree with the view that …' },
        { da: 'Et godt eksempel på det er …', en: 'A good example of that is …' },
        { da: 'Et andet synspunkt er, at … Her er jeg mere skeptisk.', en: "Another view is that … Here I'm more sceptical." },
      ],
    },
    {
      key: 'for',
      title: 'Vurdering: argumenter for',
      purpose: 'Start of the evaluation (about 50% in total): one or two arguments for, with reasons.',
      words: [30, 40],
      bullet: 'evaluate',
      starters: [
        { da: 'Spørgsmålet er, om …', en: 'The question is whether …' },
        { da: 'Der er gode argumenter for … For det første …', en: 'There are good arguments for … Firstly …' },
        { da: 'Det taler for …, at …', en: 'What speaks for … is that …' },
      ],
    },
    {
      key: 'against',
      title: 'Vurdering: argumenter imod',
      purpose: 'One or two arguments against, with reasons. Signal the turn clearly.',
      words: [30, 40],
      bullet: 'evaluate',
      starters: [
        { da: 'Omvendt er der også argumenter imod.', en: 'Conversely, there are also arguments against.' },
        { da: 'Det taler imod …, at …', en: 'What speaks against … is that …' },
        { da: 'Mange vil nok indvende, at …', en: 'Many would probably object that …' },
      ],
    },
    {
      key: 'opinion',
      title: 'Vurdering: min holdning',
      purpose: 'Your answer to the exact evaluation question, with a reason and an example.',
      words: [30, 40],
      bullet: 'evaluate',
      starters: [
        { da: 'Når jeg vejer argumenterne op imod hinanden, mener jeg, at …', en: 'When I weigh the arguments against each other, I believe that …' },
        { da: 'Jeg hælder mest til …, fordi …', en: 'I lean most towards …, because …' },
        { da: 'For mig er det vigtigste, at …', en: 'For me, the most important thing is that …' },
      ],
    },
    {
      key: 'conclusion',
      title: 'Afslutning',
      purpose: 'Sum up your answer to the evaluation question in one or two sentences.',
      words: [15, 20],
      bullet: 'evaluate',
      starters: [
        { da: 'Samlet set mener jeg, at …', en: 'All things considered, I believe that …' },
        { da: 'Konklusionen er derfor, at …', en: 'The conclusion is therefore that …' },
        { da: 'Alt i alt er … efter min mening vigtigere end …', en: 'All in all, … is in my view more important than …' },
      ],
    },
  ],
  phrases: [
    {
      function: 'Introducing the topic',
      items: [
        { da: 'Der er meget debat om …', en: 'There is a lot of debate about …' },
        { da: '… er et emne, der optager mange.', en: '… is a topic many people care about.' },
        { da: 'I dag er det almindeligt at …', en: 'Today it is common to …' },
        { da: 'Mange danskere mener, at …', en: 'Many Danes believe that …' },
        { da: 'Spørgsmålet er, om …', en: 'The question is whether …' },
      ],
    },
    {
      function: 'Telling about your experience',
      items: [
        { da: 'Jeg har selv oplevet, at …', en: 'I have experienced myself that …' },
        { da: 'Da jeg arbejdede som …, …', en: 'When I worked as …, …' },
        { da: 'I mit hjemland …, mens man i Danmark …', en: 'In my home country …, whereas in Denmark …' },
        { da: 'Det overraskede mig, at …', en: 'It surprised me that …' },
        { da: 'Min erfaring er, at …', en: 'My experience is that …' },
        { da: 'Jeg har hørt om en, der …', en: 'I have heard of someone who …' },
      ],
    },
    {
      function: 'Agreeing',
      items: [
        { da: 'Det er jeg helt enig i.', en: 'I completely agree with that.' },
        { da: 'Jeg er enig i synspunktet om, at …', en: 'I agree with the view that …' },
        { da: 'Det har man ret i, fordi …', en: 'That is right, because …' },
        { da: 'Det passer godt med min egen erfaring.', en: 'That fits well with my own experience.' },
        { da: 'Jeg kan kun bakke op om, at …', en: 'I can only support the idea that …' },
      ],
    },
    {
      function: 'Disagreeing or partly agreeing',
      items: [
        { da: 'Det er jeg ikke enig i.', en: "I don't agree with that." },
        { da: 'Jeg er kun delvist enig, fordi …', en: 'I only partly agree, because …' },
        { da: 'Det er rigtigt, at …, men …', en: "It's true that …, but …" },
        { da: 'Her er jeg mere skeptisk.', en: "Here I'm more sceptical." },
        { da: 'Man skal dog huske, at …', en: 'One must remember, however, that …' },
        { da: 'Det gælder ikke for alle.', en: "That doesn't apply to everyone." },
      ],
    },
    {
      function: 'Giving examples',
      items: [
        { da: 'For eksempel …', en: 'For example …' },
        { da: 'Et godt eksempel på det er …', en: 'A good example of this is …' },
        { da: 'Det ser man blandt andet, når …', en: 'You can see this, for instance, when …' },
        { da: 'Tag for eksempel …', en: 'Take … for example' },
        { da: 'Det gælder især …', en: 'This applies especially to …' },
      ],
    },
    {
      function: 'Weighing arguments',
      items: [
        { da: 'Det taler for …, at …', en: 'In favour of … is the fact that …' },
        { da: 'Det taler imod …, at …', en: 'Against … is the fact that …' },
        { da: 'På den ene side … På den anden side …', en: 'On the one hand … On the other hand …' },
        { da: 'Mange vil nok indvende, at …', en: 'Many would probably object that …' },
        { da: 'Når jeg vejer argumenterne op imod hinanden, …', en: 'When I weigh the arguments against each other, …' },
        { da: 'Jeg hælder mest til …', en: 'I lean most towards …' },
        { da: 'Det afgørende for mig er …', en: 'The deciding factor for me is …' },
      ],
    },
    {
      function: 'Concluding',
      items: [
        { da: 'Samlet set mener jeg, at …', en: 'All things considered, I believe that …' },
        { da: 'Alt i alt …', en: 'All in all …' },
        { da: 'Konklusionen er, at …', en: 'The conclusion is that …' },
        { da: 'Derfor er jeg overbevist om, at …', en: 'That is why I am convinced that …' },
        { da: 'Kort sagt …', en: 'In short …' },
      ],
    },
  ],
  pitfalls: [
    {
      id: 'd2b-all-six',
      title: 'Commenting on all six statements',
      explanation:
        'The bullet says "et eller to". Going through all six gives one shallow sentence each, eats the word budget the evaluation needs, and does not answer the bullet better. Two well-argued comments score higher.',
      wrong: 'God løn er vigtigt. Fleksible arbejdstider er også vigtigt. Efteruddannelse er godt. Personalegoder er rart …',
      right: 'På listen står der, at god løn er vigtig. Det er jeg kun delvist enig i, fordi et godt samarbejde betyder mere for, om man trives.',
      seenIn: 'general',
    },
    {
      id: 'd2b-comment-no-reason',
      title: 'A "comment" that only repeats the statement',
      explanation:
        'To "kommentér" means taking a position and backing it up. Restating the statement or writing "det er rigtigt" alone shows neither opinion nor language. Add why, and one example.',
      wrong: 'Fleksible arbejdstider er vigtige. Det er rigtigt.',
      right: 'Fleksible arbejdstider er vigtige for mig, fordi jeg har små børn. Når jeg selv kan bestemme, hvornår jeg møder, kan jeg nå at aflevere dem i børnehaven.',
      seenIn: 'general',
    },
    {
      id: 'd2b-wrong-question',
      title: 'Evaluating the topic instead of the question',
      explanation:
        'Censors judge the evaluation against the exact wording. If the bullet asks whether personal or professional qualities matter most, a general essay about good workplaces does not answer it, however well written.',
      wrong: 'Der er mange ting, der gør en arbejdsplads god, for eksempel løn og kolleger.',
      right: 'Spørgsmålet er, om lederens personlige eller faglige kvalifikationer er vigtigst. Jeg mener, at de personlige er vigtigst, fordi …',
      seenIn: 'general',
    },
    {
      id: 'd2b-long-experience',
      title: 'An experience paragraph that takes over',
      explanation:
        'The experience bullet says "kort". If it grows to 100 words, the evaluation cannot reach 50% without the text becoming far too long. Keep it to about 40 words.',
      wrong: '120 words about your first job, 60 words of evaluation',
      right: '~40 words of experience, ~55 of comments, ~130 of evaluation and conclusion',
      seenIn: 'general',
    },
    {
      id: 'd2b-hvem-relative',
      title: '"hvem" as a relative pronoun → "der/som", "den, der"',
      explanation:
        'In Danish "hvem" is a question word ("Hvem kommer?"). It is not used like English "who" in the middle of a sentence. Use "der" or "som" after a noun, and "den, der" / "de, der" for "the one(s) who".',
      wrong: 'Hvem som har små børn, har brug for fleksible arbejdstider. Mine kolleger, hvem jeg arbejder med, er søde.',
      right: 'Den, der har små børn, har brug for fleksible arbejdstider. Mine kolleger, som jeg arbejder sammen med, er søde.',
      seenIn: 'teacher',
    },
    {
      id: 'd2b-blevet-vaeret',
      title: '"blevet" vs "været"',
      explanation:
        '"Været" (from være) describes a state or a stretch of time and takes "har": "Jeg har været ansat i to år". "Blevet" (from blive) describes a change, becoming something, and takes "er": "Jeg er blevet leder".',
      wrong: 'Jeg har blevet ansat på hotellet i to år, og nu har jeg været leder.',
      right: 'Jeg har været ansat på hotellet i to år, og nu er jeg blevet leder.',
      seenIn: 'teacher',
    },
    {
      id: 'd2b-bedst',
      title: '"beder" → "bedre" / "bedst"',
      explanation:
        '"Beder" is the verb at bede (to ask, to pray). The comparative of god is "bedre" and the superlative is "bedst". "Kan bedst lide" means to like most. The word appears in nearly every opinion essay, so the slip is costly.',
      wrong: 'Det, jeg kan beder lide ved mit job, er kollegerne.',
      right: 'Det, jeg bedst kan lide ved mit job, er kollegerne.',
      seenIn: 'teacher',
    },
    {
      id: 'd2b-kolleger',
      title: '"kollegere" → "kolleger"',
      explanation:
        'The plural of "en kollega" is "kolleger" (definite: kollegerne). Adding another -e by analogy with -ere words (lærere, læsere) is a common slip. Check the plural in the dictionary.',
      wrong: 'Jeg har gode kollegere, og kollegererne hjælper mig.',
      right: 'Jeg har gode kolleger, og kollegerne hjælper mig.',
      seenIn: 'own-mails',
    },
    {
      id: 'd2b-arbejdsplads',
      title: '"arbejdeplads" → "arbejdsplads"',
      explanation:
        'Many Danish compounds have a linking -s-: arbejdsplads, arbejdsgiver, arbejdsløs, uddannelsessted. The word appears again and again in work topics, so one misspelling becomes many. The dictionary shows the exact form.',
      wrong: 'En god arbejdeplads har en flink arbejdegiver.',
      right: 'En god arbejdsplads har en flink arbejdsgiver.',
      seenIn: 'own-mails',
    },
    {
      id: 'd2b-v2-after-subclause',
      title: 'Verb second after a fronted "hvis/når" clause',
      explanation:
        'A whole subordinate clause in the front slot counts as one element, so the main clause must continue with the verb, then the subject. It is easy to miss because the comma makes it feel like a new sentence.',
      wrong: 'Hvis man har børn, man har brug for fleksible arbejdstider.',
      right: 'Hvis man har børn, har man brug for fleksible arbejdstider.',
      ruleId: 'v2-inversion',
      seenIn: 'general',
    },
    {
      id: 'd2b-mail-register',
      title: 'Writing the essay like a mail',
      explanation:
        'Delprøve 2 is a short opinion essay, not a letter. A greeting, "du" addressed to the reader or a sign-off look off-task and weaken the pragmatic score. Use "man" for general statements.',
      wrong: 'Hej! Du ved jo godt, at løn er vigtigt. Hilsen Anna',
      right: 'Mange mener, at løn er det vigtigste. Når man skal vælge job, tænker man ofte først på lønnen.',
      seenIn: 'general',
    },
  ],
};

export const TASK_TYPE_GUIDES: Record<WritingTaskType, TaskTypeGuide> = {
  'd1-email': D1,
  'd2a-diagram': D2A,
  'd2b-list': D2B,
};
