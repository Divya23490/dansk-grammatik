/**
 * "November 2026 guesses": a forecast for the PD3 sitting in November–December
 * 2026, built from the most recent four years of published PD3 material.
 *
 * Nothing here is a leaked or real task. SIRI has not published anything after
 * May–June 2024, so the window is:
 *   - reading: the 7 papers from May–June 2021 to May–June 2024;
 *   - writing: 2021 summer and winter, 2022 summer (SIRI's public paper) and 2024 summer;
 *   - speaking: the full May–June 2024 set and the 2023 topic titles, with 2019–2020 for the question pattern.
 *
 * Only theme titles, counts and our own analysis are kept here. The official
 * texts, mails and chart values stay in the owner-only private content.
 */

import { D1_WORDS, D2A_WORDS, D2B_WORDS, LF1_WORDS, LF2A_WORDS, LF2B_WORDS, LF3_WORDS, type WordLists } from './guesses2026Words';

export interface Phrase {
  da: string;
  en: string;
}

/** One thing that has come up, with when. */
export interface SeenItem {
  session: string;
  theme: string;
}

export interface Likely {
  title: string;
  /** Why we expect it, in English. */
  why: string;
}

export interface Tip {
  title: string;
  text: string;
}

export interface PhraseGroup {
  title: string;
  note?: string;
  items: Phrase[];
}

export interface TaskForecast {
  key: string;
  name: string;
  danish: string;
  /** Format, time and points in one line. */
  format: string;
  /** What the last four years have actually set. */
  seen: SeenItem[];
  /** The pattern behind `seen`, with counts. */
  pattern: string;
  likely: Likely[];
  /** Question types (reading, speaking) or bullet types (writing), with counts where we have them. */
  questionTypes?: { label: string; share?: string; example?: string; note: string }[];
  tips: Tip[];
  cheatSheet?: PhraseGroup[];
  /** Two word lists: the most likely words, and a bigger one for revision. */
  words?: WordLists;
  links?: { label: string; path: string }[];
}

export type ForecastSection = 'reading' | 'writing' | 'speaking';

export const FORECAST_SECTIONS: { key: ForecastSection; label: string }[] = [
  { key: 'reading', label: 'Reading' },
  { key: 'writing', label: 'Writing' },
  { key: 'speaking', label: 'Speaking' },
];

export const FORECAST_INTRO = {
  title: 'November 2026 guesses',
  lede:
    'What the November–December 2026 PD3 is most likely to look like, task by task, judged from the last four years of published papers. These are forecasts, not real or leaked tasks. Use them to decide what to practise.',
  window: [
    'Reading: all 7 papers from May–June 2021 to May–June 2024.',
    'Writing: May–June 2021, Nov–Dec 2021, May–June 2022 and May–June 2024, plus Nov–Dec 2020 for 2A and 2B, because SIRI’s public 2022 paper is the only one from 2022.',
    'Speaking: the full May–June 2024 set, the 2023 topic titles, and 2019–2020 for the question pattern.',
    'SIRI has published nothing from Nov–Dec 2024 or from 2025, so those sittings cannot be counted.',
  ],
};

// ─── Reading ────────────────────────────────────────────────────────────────

const LF1: TaskForecast = {
  key: 'lf1',
  words: LF1_WORDS,
  name: 'Delprøve 1',
  danish: 'Læseforståelse 1',
  format: '25 minutes · 15 short-answer questions · 1 point each · a text collection of about 14 pages',
  seen: [
    { session: 'May–June 2021', theme: 'Danish theatre: reviews, three theatres, backstage tours, theatre prizes' },
    { session: 'Nov–Dec 2021', theme: 'Odense: H.C. Andersen, festivals, attractions, places to eat, city history' },
    { session: 'May–June 2022', theme: 'The small Danish islands: tourism, businesses, three islanders' },
    { session: 'Nov–Dec 2022', theme: 'The Viking heritage: attractions, films and TV, Vikings as a brand' },
    { session: 'May–June 2023', theme: 'Sønderjylland: history, attractions, food traditions, walking routes' },
    { session: 'Nov–Dec 2023', theme: 'Bornholm: nature, sights, Folkemødet, cycling, three novels' },
    { session: 'May–June 2024', theme: 'Viborg: town history, attractions, Hærvejsmarchen, three residents' },
  ],
  pattern:
    'All 7 sittings were a guide to a Danish place or a national heritage theme: 5 places and 2 themes (theatre, the Vikings). It is always 4–5 sections from websites and brochures. They mix history, attractions (prices, opening hours, what you can see), an event or festival, food or walking/cycling routes, and personal voices ("tre borgere fortæller", reviews, novels).',
  likely: [
    {
      title: 'Another Danish town or region',
      why: 'Odense, the small islands, Sønderjylland, Bornholm and Viborg have been used. Not yet used as the main theme: Nordjylland/Skagen, Aarhus, Aalborg, Lolland-Falster, Møn, Roskilde and Helsingør (Ribe and the Wadden Sea appeared only inside the Viking and small-island papers). Expect a history section, attractions, an annual event, and local people talking.',
    },
    {
      title: 'Or a heritage or culture theme',
      why: 'Theatre (2021) and the Vikings (2022) show that a national theme can replace a place: museums, Danish design, castles and manors, Christmas traditions, Danish film or music.',
    },
    {
      title: 'Always: numbers, names and "why" details',
      why: 'Prices, years, durations and "what is it called" questions appear every time, and about 1 in 8 questions asks why.',
    },
  ],
  questionTypes: [
    { label: 'Hvad …?', share: '35%', example: 'Hvad hedder det sted, hvor …?', note: 'What / what is it called. The answer is a noun or a short phrase from the text.' },
    { label: 'Hvilken / hvilket / hvilke …?', share: '21%', example: 'Hvilken type industri …?', note: 'Which one. Give the name or the thing, not a sentence.' },
    { label: 'Hvorfor …?', share: '12%', example: 'Hvorfor er … fredet?', note: 'Why. Look for fordi, da, på grund af, derfor or for at in the text.' },
    { label: 'Hvornår / hvor / hvor mange / hvor lang / hvor stor …?', share: '17%', example: 'Hvor lang tid tager …?', note: 'Times, places, numbers and durations. Check the unit and the condition (weekday vs weekend, high season, adults vs children).' },
    { label: 'Svar ’ja’ eller ’nej’', share: '6%', example: 'Kan man få … gratis? Svar ’ja’ eller ’nej’.', note: 'About one per paper. Write only ja or nej.' },
    { label: 'Hvem / hvordan …?', share: '5%', note: 'Who / how. A name, a group, or a short "by …" answer.' },
  ],
  tips: [
    { title: 'Question first, text second', text: 'Never read the collection from the start. Read the question, find its key word (a name, place or event), use the table of contents to jump to that section, then scan for that word.' },
    { title: 'The trap: "ud over" / "udover"', text: 'About 1 question in 10 says "Hvad … ud over X?" (what else apart from X). The text mentions X right next to the answer. The answer is the other thing, never X.' },
    { title: 'Answer in a few words, copied from the text', text: 'Copy the word or phrase you find in the text, spelled as it is there. A short, exact answer is safest, so do not waste time on full sentences.' },
    { title: 'Read the condition in the question', text: 'Many questions add a condition: "om søndagen i højsæsonen", "for grupper", "uden for sæsonen". The text usually gives several values, and only one matches the condition.' },
    { title: 'Use the text, not what you know', text: 'Even if you know the answer (a date, a famous name), check it in the text. The key is what the text says.' },
    { title: 'Mind the clock: 100 seconds a question', text: 'There are 15 questions in 25 minutes. If you cannot find an answer in about 2 minutes, mark it, move on and come back.' },
    { title: 'Two things asked = two things answered', text: 'If the question says "Hvilke to ord …" or uses a plural, give both.' },
  ],
  links: [{ label: 'Practise on the real papers', path: '/exam/papers' }],
};

const LF2A: TaskForecast = {
  key: 'lf2a',
  words: LF2A_WORDS,
  name: 'Delprøve 2A',
  danish: 'Læseforståelse 2A',
  format: 'Part of 65 minutes for 2A, 2B and 3 · 3 multiple-choice questions (3 options) · 2 points each · a text of about 1½ pages',
  seen: [
    { session: 'Nov–Dec 2022', theme: 'Livet som selvstændig: two people who started their own business' },
    { session: 'May–June 2023', theme: 'Read fiction and become a better leader: one manager’s story' },
    { session: 'Nov–Dec 2023', theme: 'New leaders struggle at work: two new ward managers' },
    { session: 'May–June 2024', theme: 'At skifte branche: changing career, with one person’s story' },
    { session: 'Before the Nov 2022 change', theme: 'Two texts and 7 questions: climate habits (2021 S), stress among young people (2021 W), the first job and personality tests (2022 S)' },
  ],
  pattern:
    'The current format has run in 4 sittings, and all 4 were about working life told through one or two named people: starting a business, being a leader, changing career. The questions follow the order of the text.',
  likely: [
    {
      title: 'A work or career story about named people',
      why: 'The topic has been working life 4 times out of 4. Good candidates: burnout and coming back to work, part-time or a shorter week, working from home, retiring late or early, going back to study as an adult, being a young or new leader, AI changing a job.',
    },
    {
      title: 'At least one "main cause" question',
      why: '3 of the 4 papers ask what was "mest afgørende", "den primære årsag", "den største udfordring" or "den mest almindelige grund". All 4 have at least one why-question.',
    },
    {
      title: 'With two people: what both say',
      why: 'Both texts with two people (Nov 2022, Nov 2023) ended with a question about what both of them would do or were not good at ("Hvad ville både A og B …?").',
    },
  ],
  questionTypes: [
    { label: 'The main cause', example: 'Hvad var den primære årsag til, at …?', note: 'Several causes are mentioned. The right one is the one the text marks as most important.' },
    { label: 'What a person expresses', example: 'Hvilket af følgende udsagn er i overensstemmelse med det, X giver udtryk for?', note: 'An opinion or feeling. The right option paraphrases it; wrong options use the text’s own words with a twist.' },
    { label: 'What both have in common', example: 'Hvad giver både A og B udtryk for …?', note: 'Wrong options are usually true for only one of the two.' },
  ],
  tips: [
    { title: 'Find the paragraph first', text: 'The questions follow the text. Question 1 is near the start, question 3 near the end. Read the question, then the matching part of the text closely.' },
    { title: 'Look for the signal words of importance', text: '"det afgørende var", "først og fremmest", "især", "den egentlige grund", "det, der virkelig gjorde forskellen". These mark the answer to "mest afgørende" questions. The other causes in the text become the wrong options.' },
    { title: 'Distrust options that copy the text', text: 'The right answer usually says the same thing in other words. A wrong option often repeats the text’s words but changes who said it, adds "ikke", or turns "sometimes" into "always".' },
    { title: '"Både" means both', text: 'For "både A og B", check each option against both people. An option true for only one is wrong.' },
    { title: 'Spend the time here', text: '3 questions × 2 points = 6 of the 39 points. Give 2A about 12–15 minutes.' },
  ],
};

const LF2B: TaskForecast = {
  key: 'lf2b',
  words: LF2B_WORDS,
  name: 'Delprøve 2B',
  danish: 'Læseforståelse 2B',
  format: 'Part of 65 minutes · put 5 missing paragraphs back into a 2-page text · 2 extra paragraphs fit nowhere · 2 points each',
  seen: [
    { session: 'Nov–Dec 2022', theme: 'Iværksætteri (entrepreneurship)' },
    { session: 'May–June 2023', theme: 'Job og handicap (jobs and disability)' },
    { session: 'Nov–Dec 2023', theme: 'Datasikkerhed (data security)' },
    { session: 'May–June 2024', theme: 'En fire-dages arbejdsuge? (a four-day week?)' },
  ],
  pattern:
    'All 4 sittings since the format began used a news-style article on a work or society issue. 3 of the 4 were directly about the labour market.',
  likely: [
    {
      title: 'A labour-market or workplace issue',
      why: 'Candidates: senior workers and retirement age, recruiting foreign labour, AI at work, flexible hours, sick leave and wellbeing, the green transition creating new jobs, apprenticeships, young people without education.',
    },
    {
      title: 'Or a digital or society issue',
      why: 'Data security (2023) shows tech topics can appear: screen time, online fraud, digital welfare (MitID, digital post), social media and democracy.',
    },
  ],
  tips: [
    { title: 'Skim the whole text first', text: 'Before looking at the paragraphs, read the article quickly and note in two or three words what comes before and after each gap.' },
    { title: 'The first sentence of a paragraph is the key', text: 'Look at how each missing paragraph begins. A connector (Derudover, Til gengæld, Det betyder, Samtidig) or a pronoun (hun, de, det, denne udvikling) must link to what was just said before the gap.' },
    { title: 'Follow the people', text: 'In Danish articles a person is usually introduced once with full name and job title ("siger Mette Holm, der er professor …"). After that the text says "Mette Holm" or "hun". A paragraph using only the surname or "hun" must come after the introduction.' },
    { title: 'Check both edges', text: 'A paragraph must fit the gap on both sides: the end of the paragraph must also lead into the text after the gap. That is often where an almost-right paragraph fails.' },
    { title: 'Spot the 2 extras', text: 'The two extra paragraphs are on topic but contradict the text, repeat something already said, or refer to a person who is never introduced.' },
    { title: 'Easiest gap first', text: 'Place the paragraph you are surest of, cross out its letter, then do the rest. Read the whole sequence once at the end.' },
  ],
};

const LF3: TaskForecast = {
  key: 'lf3',
  words: LF3_WORDS,
  name: 'Delprøve 3',
  danish: 'Læseforståelse 3 (cloze)',
  format: 'Part of 65 minutes · a 1-page text with 8 gaps · 4 options each · 1 point each',
  seen: [
    { session: 'May–June 2021', theme: 'Unemployment among new graduates' },
    { session: 'Nov–Dec 2021', theme: 'More say over working hours for public employees' },
    { session: 'May–June 2022', theme: 'More people work from home' },
    { session: 'Nov–Dec 2022', theme: 'Danes are active in their free time' },
    { session: 'May–June 2023', theme: 'Wind turbines meet resistance' },
    { session: 'Nov–Dec 2023', theme: 'Many choose to study the humanities' },
    { session: 'May–June 2024', theme: 'Online shopping and malls threaten town centres' },
  ],
  pattern:
    'Before Nov 2022 this was Delprøve 2B, and it is the same task, so all 7 count (56 gaps). It is always a short news article about a trend in Danish society, usually with numbers from a survey and an expert’s comment. What is tested is very stable: connectors 30% (17 of 56), word + fixed preposition 23% (13), verbs 21% (12), nouns 16% (9), adjectives and adverbs 9% (5).',
  likely: [
    {
      title: '2–3 connectors',
      why: 'At least 2 in every one of the 7 papers. Most repeated: derfor (3 times), som nævnt (2), and then nemlig, dermed, desuden, derimod, alligevel, imidlertid, således, med andre ord, blandt andet, eksempelvis, ikke alene.',
    },
    {
      title: '1–3 words with a fixed preposition',
      why: 'en konsekvens af (2 times), følge(n) af (2), årsag til, holdninger til, indflydelse på, effekten af, fordele ved, ønske om, modstand mod, behov for, forskelligt fra.',
    },
    {
      title: '1–3 reporting or change verbs',
      why: 'afvise (2 times), påpege, bekræfte, kræve, skyldes, opleve, overholde, reducere, forlænge, garantere.',
    },
    {
      title: 'A trend topic',
      why: 'Work, education, leisure, energy and shopping have all appeared. Expect something like housing prices, sick leave, screen time, the cost of food, or electric cars.',
    },
  ],
  tips: [
    { title: 'Decide the logic before reading the options', text: 'Read the sentence before and after the gap and ask: is this a cause → effect (derfor, dermed, således), a contrast (derimod, alligevel, imidlertid, til gengæld, omvendt), an addition (desuden, herudover, ikke alene … men også), an example (eksempelvis, blandt andet), a restatement (med andre ord, altså) or an explanation of what came before (nemlig)?' },
    { title: '"Som nævnt" only if it was mentioned', text: '"Som nævnt" (as mentioned) is right only if the fact really appears earlier in the text. Check before you pick it.' },
    { title: 'Cause or effect?', text: 'When every option includes its preposition (årsag til / konsekvens af / gevinst ved / forhindring for), work out the direction: is the word before the gap causing the thing after it, or caused by it?' },
    { title: 'Let the preposition choose the noun', text: 'If the preposition is outside the gap: indflydelse på, interesse for, ønske om, modstand mod, fordele ved, problemer med, holdning til, effekten af.' },
    { title: 'Reporting verbs: agree or disagree?', text: 'afvise (reject) and benægte (deny) introduce a no; bekræfte (confirm), påpege (point out) and indrømme (admit) a yes. Read what the expert says next and match it.' },
    { title: 'Grammar removes options', text: 'After "kan / skal / at" you need an infinitive; "et" needs an et-word; a fronted connector is followed by the verb (Derfor er …). Rule out the options that do not fit before choosing on meaning.' },
  ],
  links: [
    { label: 'Train connectors (conjunctions drill)', path: '/drill/conjunctions' },
    { label: 'Train fixed prepositions', path: '/drill/prepositions' },
    { label: 'Train verb word choice', path: '/drill/word-choice-verbs' },
  ],
};

// ─── Writing ────────────────────────────────────────────────────────────────

const CONNECTORS: PhraseGroup = {
  title: 'Connectors that work in every text',
  note: 'After derfor, desuden, til gengæld, alligevel and similar words at the start of a sentence, the verb comes next: "Derfor mener jeg …", not "Derfor jeg mener …". After fordi, da, selvom, hvis and at, the subject comes first and ikke goes before the verb: "… fordi jeg ikke har tid".',
  items: [
    { da: 'For det første … For det andet … Endelig …', en: 'Firstly … Secondly … Finally …' },
    { da: 'Desuden / Derudover', en: 'Furthermore / In addition' },
    { da: 'Derfor / Det betyder, at …', en: 'Therefore / This means that …' },
    { da: 'Til gengæld / Derimod', en: 'On the other hand / By contrast' },
    { da: 'Alligevel', en: 'Even so / Still' },
    { da: 'fordi … / da … / på grund af …', en: 'because … / as … / because of …' },
    { da: 'selvom …', en: 'even though …' },
    { da: 'for eksempel / blandt andet', en: 'for example / among other things' },
    { da: 'Med andre ord …', en: 'In other words …' },
    { da: 'Alt i alt / Samlet set', en: 'All in all / Overall' },
  ],
};

const D1: TaskForecast = {
  key: 'd1',
  words: D1_WORDS,
  name: 'Delprøve 1',
  danish: 'E-mail til en ven',
  format: 'Part of 2½ hours · reply to a friend’s mail · answer all the underlined parts · no word limit (aim for 200–250 words) · about 40 minutes',
  seen: [
    { session: 'May–June 2021', theme: 'A friend’s sister is divorcing: should she move in while she waits for a flat? Can we still see the ex-husband? Small talk: your e-bike. Propose meeting to talk about your Danish.' },
    { session: 'Nov–Dec 2021', theme: 'A friend becomes leader over his colleagues: will it be hard? Longer days and family life. Car or train to the new office? Small talk: a concert. Propose meeting.' },
    { session: 'May–June 2022', theme: 'Mia (SIRI’s public paper): driving test, new colleagues, teenagers keeping in touch, car or train. Propose meeting.' },
    { session: 'May–June 2024', theme: 'A friend with a new job in a new town: your plans after your Danish course, inviting colleagues home, dropping cake at meetings, help moving things. Propose a phone call.' },
  ],
  pattern:
    'It is always a friend with a life change (new job, family crisis, moving), with 4 underlined questions. 1 is small talk about you (often your Danish, a purchase or an event). 2 are dilemmas where you give advice. 1 is a practical choice or favour (car or train came up twice; help moving once). The last bullet is always to propose contact: meeting 3 times, a phone call once.',
  likely: [
    { title: 'A friend with a new job, new home or new family situation', why: 'Every one of the four. Expect questions about new colleagues, being a leader, longer hours, children or the family.' },
    { title: 'A question about your own Danish or your plans', why: 'In 2 of 4 (your Danish course, your plans after it). Have three sentences ready about your exam, your course and your next step.' },
    { title: 'A transport or practical choice', why: 'Car or train came up twice; help with moving once. Have a ready "what would I do and why" answer.' },
  ],
  questionTypes: [
    { label: 'Small talk about you', example: 'Hvordan gik det med …?', note: 'Answer in the past tense with two concrete details.' },
    { label: 'Dilemma: what do you think?', example: 'Hvad tror du er bedst? / Tror du, det bliver svært?', note: 'Empathy, then a clear opinion, then a reason.' },
    { label: 'Choice or favour', example: 'Hvad ville du gøre? / Har du mulighed for at hjælpe mig?', note: 'Choose one option, or say yes or no with a time.' },
    { label: 'Bullet 3: the proposal', example: 'Foreslå, at I mødes / ringer sammen …', note: 'Do exactly what it says. A phone call is not a café meeting.' },
  ],
  tips: [
    { title: 'Number the underlined parts', text: 'Before writing, number the underlined parts 1–4 on the sheet. Write one paragraph per number, in that order, and tick them off at the end. A missed question is the most expensive mistake.' },
    { title: 'Answer + reason + example', text: 'Each paragraph: your answer in the first sentence, a reason with fordi or da, then one concrete detail or example. Three to four sentences per question is enough.' },
    { title: 'Copy the bullet’s verb for the proposal', text: 'If it says "Foreslå, at I ringer sammen", propose a phone call with a day and time. If it says "mødes", give a place, a day and an activity.' },
    { title: 'du, hej and kærlig hilsen', text: 'It is a friend: du-form, "Hej + name", warm small talk, and an informal sign-off with your first name. Do not write like a formal letter.' },
    { title: 'Keep it to about 40 minutes', text: 'Delprøve 2 is worth more. Do the mail in about 40 minutes and save the rest for 2A or 2B.' },
  ],
  cheatSheet: [
    {
      title: 'Opening (works for any mail)',
      items: [
        { da: 'Hej [navn]', en: 'Hi [name]' },
        { da: 'Tak for din mail – og tak for sidst. Det var rigtig hyggeligt.', en: 'Thanks for your mail – and for last time. It was really nice.' },
        { da: 'Hvor er det spændende at høre om dit nye job!', en: 'How exciting to hear about your new job!' },
      ],
    },
    {
      title: 'Small talk about your Danish and plans',
      note: 'Came up in 2021 S and 2024 S. Change the details to fit your life.',
      items: [
        { da: 'Det går faktisk godt med dansken. Lige nu øver jeg mig til Prøve i Dansk 3, som jeg skal op til i november.', en: 'My Danish is actually going well. Right now I am practising for Prøve i Dansk 3, which I am taking in November.' },
        { da: 'Jeg prøver at tale dansk så meget som muligt, både på arbejdet og med mine naboer.', en: 'I try to speak Danish as much as possible, both at work and with my neighbours.' },
        { da: 'Når jeg er færdig, vil jeg gerne begynde på en uddannelse / søge et nyt job.', en: 'When I have finished, I would like to start an education / look for a new job.' },
      ],
    },
    {
      title: 'Advice on a dilemma',
      items: [
        { da: 'Jeg kan godt forstå, at du er i tvivl, for det er ikke en nem situation.', en: 'I can understand that you are unsure, because it is not an easy situation.' },
        { da: 'Hvis jeg var dig, ville jeg …, fordi …', en: 'If I were you, I would …, because …' },
        { da: 'Det vigtigste er efter min mening, at I taler åbent sammen om det.', en: 'In my opinion the most important thing is that you talk openly about it.' },
        { da: 'Måske kunne du prøve at … i en periode og se, hvordan det går.', en: 'Maybe you could try to … for a while and see how it goes.' },
      ],
    },
    {
      title: 'New job, colleagues and being a leader',
      note: 'A work situation came up in 3 of the 4 mails.',
      items: [
        { da: 'Det kan godt blive svært i starten, men hvis du er ærlig og lytter til dine kolleger, tror jeg, at de nok skal acceptere dig som leder.', en: 'It may be hard at first, but if you are honest and listen to your colleagues, I think they will accept you as their leader.' },
        { da: 'Det er en god idé at invitere dine kolleger, for så lærer I hinanden bedre at kende uden for arbejdet.', en: 'It is a good idea to invite your colleagues, because then you get to know each other better outside work.' },
        { da: 'Længere arbejdsdage betyder mindre tid sammen med familien, så I må aftale, hvem der henter børnene.', en: 'Longer working days mean less time with the family, so you will have to agree who picks up the children.' },
      ],
    },
    {
      title: 'A choice: car or train, yes or no',
      items: [
        { da: 'Jeg ville nok tage toget. Så kan du læse eller slappe af på vejen, og det er bedre for miljøet.', en: 'I would probably take the train. Then you can read or relax on the way, and it is better for the environment.' },
        { da: 'Til gengæld er bilen mere fleksibel, hvis du skal hente børn efter arbejde.', en: 'On the other hand, the car is more flexible if you have to pick up children after work.' },
        { da: 'Selvfølgelig vil jeg gerne hjælpe dig! Jeg har fri på lørdag, så jeg kan komme ved ti-tiden.', en: 'Of course I would like to help you! I am free on Saturday, so I can come at around ten.' },
        { da: 'Desværre kan jeg ikke i weekenden, fordi …, men hvad med på onsdag efter arbejde?', en: 'Unfortunately I can’t this weekend, because …, but what about Wednesday after work?' },
      ],
    },
    {
      title: 'The proposal and the ending',
      items: [
        { da: 'Skal vi ikke mødes over en kop kaffe på torsdag og snakke videre om det? Hvad med kl. 16 på caféen ved stationen?', en: 'Shall we meet for a coffee on Thursday and talk more about it? What about 4 pm at the café by the station?' },
        { da: 'Lad os ringe sammen i weekenden og snakke videre. Passer det dig søndag eftermiddag?', en: 'Let’s call each other at the weekend and talk more. Does Sunday afternoon suit you?' },
        { da: 'Jeg glæder mig til at høre fra dig. Kærlig hilsen [dit navn]', en: 'I look forward to hearing from you. Love, [your name]' },
      ],
    },
  ],
  links: [{ label: 'Full template, graded examples and timed practice', path: '/writing/d1-email' }],
};

const D2A: TaskForecast = {
  key: 'd2a',
  words: D2A_WORDS,
  name: 'Delprøve 2A',
  danish: 'Diagramopgave',
  format: 'Choose 2A or 2B · at least 200 words (aim for 250–300) · about 1 hour 50 minutes after the mail · bullet 3 = about 50%',
  seen: [
    { session: 'Nov–Dec 2020', theme: 'Working from home, by education. Bullet 3: does it raise or lower the risk of stress?' },
    { session: 'May–June 2021', theme: 'Job turnover, by age. Bullet 3: pros and cons for a company when staff change.' },
    { session: 'Nov–Dec 2021', theme: 'Sick leave, by job type. Bullet 3: is it the management’s or the employees’ responsibility to reduce it?' },
    { session: 'May–June 2024', theme: 'Volunteering, by area. Bullet 3: can volunteers solve the shortage of nurses and care workers?' },
  ],
  pattern:
    'All 4 were bar charts from a Danish source (Danmarks Statistik, a research centre, Jobindsats) comparing 3–5 groups: education, age, job type or area. Bullets 1 and 2 are word for word the same every time: "Beskriv kort hovedtrækkene" and "Fortæl, hvilke årsager der kan være til (nogle af) de forskelle". Only bullet 3 changes, and all 4 were tied to working life.',
  likely: [
    { title: 'Work data compared across groups', why: 'All four charts were about working life. Candidates: job satisfaction by age, part-time work by gender, commuting time by region, overtime by sector, retirement age, use of AI at work.' },
    { title: 'Bullet 3 will be one of four shapes', why: '"Vurdér fordele og ulemper for X ved Y", "Vurdér, om det er A’s eller B’s ansvar", "Vurdér, om X øger eller mindsker Y", or "Vurdér, om man kan løse X ved hjælp af Y". Prepare one paragraph plan for each.' },
  ],
  questionTypes: [
    { label: 'Fordele og ulemper', example: 'Vurdér fordele og ulemper for … ved, at …', note: 'Two pros, two cons, then your conclusion.' },
    { label: 'Hvis ansvar?', example: 'Vurdér, om det er …s eller …s ansvar at …', note: 'Give each side a reason, then choose (or say "both, but mostly …").' },
    { label: 'Øger eller mindsker?', example: 'Vurdér, om det øger eller mindsker …', note: 'Show how it can go both ways, then choose one.' },
    { label: 'Kan X løse Y?', example: 'Vurdér, om man kan løse … ved hjælp af …', note: 'Yes partly / no: say what it can and cannot do.' },
  ],
  tips: [
    { title: 'Describe 3 things, not every bar', text: 'The highest, the lowest, and one striking comparison ("dobbelt så mange", "kun halvt så stor"). Use "ca." because you read the numbers off the chart. 40–50 words is enough.' },
    { title: 'Causes are about the groups', text: 'Explain the differences through what the groups are like: education (type of job, desk work), age (family, career stage), job type (physical work, contact with people, shift work).' },
    { title: 'Spend half your words on bullet 3', text: 'With 280 words: about 50 describe, 80 causes, 150 evaluate. Bullet 3 decides the grade.' },
    { title: 'Always end with a position', text: 'A list of pros and cons without a verdict misses the "Vurdér". End with "Samlet set mener jeg, at …, fordi …".' },
    { title: 'Do not invent facts', text: 'Only describe what the chart shows. Your causes are guesses, so mark them as guesses: "kan skyldes", "hænger sandsynligvis sammen med".' },
  ],
  cheatSheet: [
    {
      title: 'Bullet 1: describe the chart',
      items: [
        { da: 'Diagrammet viser, hvor stor en andel af danskerne der …, fordelt på …', en: 'The chart shows what share of Danes …, broken down by …' },
        { da: 'Tallene er fra … og stammer fra Danmarks Statistik.', en: 'The figures are from … and come from Statistics Denmark.' },
        { da: 'Det fremgår tydeligt, at …', en: 'It is clear that …' },
        { da: 'Den største andel finder man blandt …, nemlig ca. … %.', en: 'The biggest share is found among …, namely about … %.' },
        { da: 'Til sammenligning gælder det kun ca. … % af …', en: 'By comparison, this applies to only about … % of …' },
        { da: '… er næsten dobbelt så mange som …', en: '… are almost twice as many as …' },
        { da: 'Der er altså stor forskel på …', en: 'So there is a big difference between …' },
      ],
    },
    {
      title: 'Bullet 2: causes',
      items: [
        { da: 'En af årsagerne til forskellen kan være, at …', en: 'One of the reasons for the difference may be that …' },
        { da: 'Det hænger sandsynligvis sammen med, at …', en: 'This is probably linked to the fact that …' },
        { da: 'Det kan også skyldes, at …', en: 'It may also be due to the fact that …' },
        { da: 'En anden forklaring kunne være, at …', en: 'Another explanation could be that …' },
        { da: 'Mange med … har typisk et job, hvor …', en: 'Many people with … typically have a job where …' },
      ],
    },
    {
      title: 'Bullet 3: evaluate',
      items: [
        { da: 'Der er både fordele og ulemper ved, at …', en: 'There are both advantages and disadvantages to …' },
        { da: 'En vigtig fordel er, at … En ulempe er derimod, at …', en: 'An important advantage is that … A disadvantage, on the other hand, is that …' },
        { da: 'Nogle vil mene, at …, men efter min mening …', en: 'Some will argue that …, but in my opinion …' },
        { da: 'Jeg mener, at ansvaret ligger både hos … og hos …, men først og fremmest hos …', en: 'I think the responsibility lies with both … and …, but above all with …' },
        { da: 'På den ene side kan det mindske …, fordi … På den anden side kan det øge …, hvis …', en: 'On the one hand it can reduce …, because … On the other hand it can increase …, if …' },
        { da: 'Frivillige kan hjælpe med …, men de kan ikke erstatte uddannet personale.', en: 'Volunteers can help with …, but they cannot replace trained staff.' },
        { da: 'Samlet set mener jeg, at …, fordi …', en: 'Overall I think that …, because …' },
      ],
    },
    CONNECTORS,
  ],
  links: [{ label: 'Full template, graded examples and timed practice', path: '/writing/d2a-diagram' }],
};

const D2B: TaskForecast = {
  key: 'd2b',
  words: D2B_WORDS,
  name: 'Delprøve 2B',
  danish: 'Synspunktsopgave',
  format: 'Choose 2A or 2B · at least 200 words (aim for 250–300) · a box of 6 examples or views · bullet 3 = about 50%',
  seen: [
    { session: 'Nov–Dec 2020', theme: 'Staff benefits. Bullet 3: do benefits matter for the working environment?' },
    { session: 'May–June 2021', theme: 'Young people and health. Bullet 3: do friends influence young people’s lifestyle more than parents?' },
    { session: 'Nov–Dec 2021', theme: 'Climate change and responsibility. Bullet 3: is cutting CO2 the individual’s or society’s job?' },
    { session: 'May–June 2022', theme: 'An attractive workplace (SIRI’s public paper). Bullet 3: are a leader’s personal or professional qualities more important?' },
    { session: 'May–June 2024', theme: 'Pay differences. Bullet 3: pros and cons for Danish society of small pay gaps.' },
  ],
  pattern:
    'It is always 6 short examples, suggestions or views in a box. The bullets are always the same three: "Fortæl kort om …" (your experience), "Kommentér et eller to af …" (the list) and "Vurdér …" (about 50%). Of the 5 topics, 3 were about work (benefits, workplace, pay), 1 health and 1 climate. Bullet 3 is a weighing question: individual or society, A or B, or pros and cons.',
  likely: [
    { title: 'Work and the workplace', why: '3 of 5: a good workplace, wellbeing, flexible hours, a four-day week, older workers, the work–life balance.' },
    { title: 'Health or lifestyle', why: 'Young people’s health (2021). Candidates: screen time, mental health, sleep, exercise, alcohol, loneliness.' },
    { title: 'Climate and everyday responsibility', why: 'Climate (2021). Candidates: what each of us can do, food waste, transport, second-hand clothes.' },
    { title: 'Welfare and fairness', why: 'Pay (2024). Candidates: taxes, care for the elderly, free education, the gap between town and country.' },
  ],
  questionTypes: [
    { label: 'Den enkelte eller samfundet?', example: 'Vurdér, om det er den enkeltes eller samfundets ansvar …', note: 'The individual vs society: both sides, then choose.' },
    { label: 'A eller B vigtigst / størst?', example: 'Vurdér, om A har større indflydelse end B …', note: 'Compare and pick one. Do not stop at "both".' },
    { label: 'Fordele og ulemper', example: 'Vurdér fordele og ulemper for samfundet ved …', note: 'For society, not just for you.' },
    { label: 'Er det vigtigt?', example: 'Vurdér, om det er vigtigt for …, at …', note: 'Yes or no, with two reasons and one counter-argument.' },
  ],
  tips: [
    { title: 'Keep the experience short', text: 'Bullet 1 wants a short, concrete experience: 40–60 words. One situation, in the past tense, with a detail.' },
    { title: 'Comment on two, not six', text: 'Pick the two examples you have the most to say about. For each: agree or disagree, then a reason, then a consequence. Do not just repeat the sentence from the box.' },
    { title: 'Answer the exact bullet 3', text: 'Read bullet 3 twice and underline its key words. If it asks "den enkelte eller samfundet", your verdict must name one of them (or say how the two share it).' },
    { title: 'Signpost every bullet', text: 'Start each part with a signpost sentence, so the censor sees you cover all three: "Selv har jeg …", "Jeg vil kommentere to af forslagene …", "Spørgsmålet er, om …".' },
    { title: 'Write the essay, not a mail', text: 'No "Hej" and no "du". It is a short essay with an introduction sentence and a conclusion.' },
  ],
  cheatSheet: [
    {
      title: 'Introduction',
      items: [
        { da: 'I dag diskuterer mange, om …', en: 'Today many people discuss whether …' },
        { da: 'Emnet … er vigtigt, fordi det påvirker os alle i hverdagen.', en: 'The topic … is important, because it affects us all in everyday life.' },
      ],
    },
    {
      title: 'Bullet 1: your experience',
      items: [
        { da: 'Selv har jeg oplevet, at …', en: 'I have experienced myself that …' },
        { da: 'Da jeg arbejdede som …, fik jeg …', en: 'When I worked as a …, I got …' },
        { da: 'Jeg har en veninde/ven, der …', en: 'I have a friend who …' },
        { da: 'I mit hjemland er det anderledes, fordi …', en: 'In my home country it is different, because …' },
      ],
    },
    {
      title: 'Bullet 2: comment on the box',
      items: [
        { da: 'Jeg vil kommentere to af forslagene fra listen.', en: 'I will comment on two of the suggestions in the list.' },
        { da: 'Jeg er helt enig i forslaget om …, fordi …', en: 'I completely agree with the suggestion about …, because …' },
        { da: 'Derimod tror jeg ikke, at … vil virke, da …', en: 'By contrast, I don’t think that … will work, as …' },
        { da: 'Forslaget om … lyder godt i teorien, men i praksis …', en: 'The suggestion about … sounds good in theory, but in practice …' },
        { da: 'Hvis man indførte …, ville det betyde, at …', en: 'If … were introduced, it would mean that …' },
      ],
    },
    {
      title: 'Bullet 3: evaluate',
      items: [
        { da: 'Spørgsmålet er, om det er den enkeltes eller samfundets ansvar at …', en: 'The question is whether it is the individual’s or society’s responsibility to …' },
        { da: 'Der er gode argumenter for begge sider.', en: 'There are good arguments on both sides.' },
        { da: 'Et argument for, at det er samfundets ansvar, er, at …', en: 'One argument that it is society’s responsibility is that …' },
        { da: 'Omvendt kan man sige, at hver enkelt selv må tage ansvar for …', en: 'Conversely, one can say that each person must take responsibility for …' },
        { da: 'For samfundet er fordelen, at … Ulempen er, at …', en: 'For society the advantage is that … The disadvantage is that …' },
        { da: 'Hvis jeg skal vælge, mener jeg, at … har den største betydning, fordi …', en: 'If I have to choose, I think that … matters most, because …' },
      ],
    },
    {
      title: 'Conclusion',
      items: [
        { da: 'Samlet set mener jeg, at …, fordi …', en: 'Overall I believe that …, because …' },
        { da: 'Derfor er min konklusion, at både … og … har et ansvar, men at … bør gå forrest.', en: 'So my conclusion is that both … and … have a responsibility, but that … should lead the way.' },
      ],
    },
    CONNECTORS,
  ],
  links: [{ label: 'Full template, graded examples and timed practice', path: '/writing/d2b-list' }],
};

/** Topic words for every writing task and the oral exam, with gender so they can be used correctly. */
export const WORD_BANKS: PhraseGroup[] = [
  {
    title: 'Work (the most likely topic in every part)',
    items: [
      { da: 'et arbejdsmiljø', en: 'a working environment' },
      { da: 'trivsel på arbejdspladsen', en: 'wellbeing at work' },
      { da: 'et sygefravær', en: 'sick leave / absence' },
      { da: 'balancen mellem arbejdsliv og familieliv', en: 'the work–life balance' },
      { da: 'fleksible arbejdstider / hjemmearbejde', en: 'flexible hours / working from home' },
      { da: 'en medarbejder, en kollega (kolleger), en leder', en: 'an employee, a colleague (colleagues), a manager' },
      { da: 'en ledelse', en: 'a management' },
      { da: 'en efteruddannelse', en: 'further training' },
      { da: 'mangel på arbejdskraft', en: 'labour shortage' },
      { da: 'udenlandsk arbejdskraft', en: 'foreign labour' },
      { da: 'en løn / et personalegode (personalegoder)', en: 'a salary / a staff benefit (benefits)' },
      { da: 'at skifte job / et jobskifte', en: 'to change jobs / a job change' },
      { da: 'deltid / fuldtid', en: 'part-time / full-time' },
    ],
  },
  {
    title: 'Health and lifestyle',
    items: [
      { da: 'en livsstil', en: 'a lifestyle' },
      { da: 'motion / kost / søvn', en: 'exercise / diet / sleep' },
      { da: 'at forebygge sygdom', en: 'to prevent illness' },
      { da: 'mental sundhed / ensomhed', en: 'mental health / loneliness' },
      { da: 'et sundhedsvæsen', en: 'a health service' },
      { da: 'en skærmtid', en: 'screen time' },
    ],
  },
  {
    title: 'Climate and consumption',
    items: [
      { da: 'en CO2-udledning', en: 'CO2 emissions' },
      { da: 'bæredygtig', en: 'sustainable' },
      { da: 'en grøn omstilling', en: 'the green transition' },
      { da: 'et genbrug / at sortere affald', en: 'reuse, recycling / to sort waste' },
      { da: 'et forbrug', en: 'consumption' },
      { da: 'vedvarende energi', en: 'renewable energy' },
    ],
  },
  {
    title: 'Society, welfare and education',
    items: [
      { da: 'et velfærdssamfund', en: 'a welfare society' },
      { da: 'en skat / at betale skat', en: 'a tax / to pay tax' },
      { da: 'en ulighed / lønforskelle', en: 'inequality / pay differences' },
      { da: 'en borger / en kommune / staten', en: 'a citizen / a municipality / the state' },
      { da: 'en frivillig / frivilligt arbejde', en: 'a volunteer / voluntary work' },
      { da: 'en uddannelse / en studerende', en: 'an education / a student' },
      { da: 'et præstationspres', en: 'pressure to perform' },
      { da: 'kunstig intelligens / digitalisering', en: 'artificial intelligence / digitalisation' },
    ],
  },
];

// ─── Speaking ───────────────────────────────────────────────────────────────

const ORAL1: TaskForecast = {
  key: 'oral1',
  name: 'Delprøve 1',
  danish: 'Mundtlig: dit eget emne',
  format: 'About 2 minutes’ presentation + 2½ minutes of follow-up questions · prepared · one sheet of notes',
  seen: [
    { session: 'Every sitting', theme: 'The topic is set by your own language school, not nationally, so there is no list to analyse.' },
  ],
  pattern:
    'Because each school sets its own topics, nobody can forecast your subject. What is fixed is the shape: about 2 minutes (neither shorter nor longer), then follow-up questions of four kinds: clarify, elaborate, explain and take a position.',
  likely: [
    { title: 'A social issue from the same pool as Delprøve 2', why: 'Schools tend to use the same society themes the exam uses: work, health, family, education, climate, digital life.' },
    { title: 'The follow-up: "Hvorfor tror du …?" and "Hvad mener du …?"', why: 'The four follow-up types are fixed by the exam rules. You will be asked for a reason and an opinion.' },
  ],
  tips: [
    { title: 'Practise to 2 minutes exactly', text: 'Time yourself. Under 1½ minutes looks unprepared; over 2½ gets cut. That is about 250–280 spoken words.' },
    { title: 'Use one fixed structure for any topic', text: 'Introduction (what and why it matters) → 2–3 points with an example each → your opinion → one sentence to finish.' },
    { title: 'Notes, not a script', text: 'Your sheet should have key words and connectors, not full sentences. Reading aloud is marked down.' },
    { title: 'Always add a reason', text: 'If an answer has no reason, the examiner has to ask again, and that costs you. Answer, then "fordi …".' },
  ],
  cheatSheet: [
    {
      title: 'A 2-minute frame that fits any topic',
      items: [
        { da: 'Mit emne er …. Jeg har valgt det, fordi det er noget, der fylder meget i Danmark i dag.', en: 'My topic is …. I chose it because it is something that matters a lot in Denmark today.' },
        { da: 'Først vil jeg fortælle lidt om …, og derefter vil jeg komme ind på …', en: 'First I will say a little about …, and then I will turn to …' },
        { da: 'Et godt eksempel er …', en: 'A good example is …' },
        { da: 'I mit hjemland er det anderledes, for der …', en: 'In my home country it is different, because there …' },
        { da: 'Personligt mener jeg, at …', en: 'Personally I think that …' },
        { da: 'Så alt i alt …', en: 'So all in all …' },
      ],
    },
    {
      title: 'Handling follow-up questions',
      items: [
        { da: 'Det er et godt spørgsmål. Lad mig lige tænke …', en: 'That’s a good question. Let me just think …' },
        { da: 'Undskyld, vil du gentage spørgsmålet?', en: 'Sorry, could you repeat the question?' },
        { da: 'Hvis jeg skal forklare det lidt nærmere, så …', en: 'If I explain it a bit more, then …' },
        { da: 'Det kommer an på situationen. Hvis …, så …, men hvis …', en: 'It depends on the situation. If …, then …, but if …' },
      ],
    },
  ],
  links: [{ label: 'Oral topic archive with model answers', path: '/topics' }],
};

const ORAL2: TaskForecast = {
  key: 'oral2',
  name: 'Delprøve 2',
  danish: 'Mundtlig: billeder og spørgsmål',
  format: 'About 4½ minutes · unprepared · you draw topic A, B or C with two pictures',
  seen: [
    { session: 'May–June 2023', theme: 'Using social media · Students and money · Job search and unemployment' },
    { session: 'Nov–Dec 2023', theme: 'Going to the doctor · Work and age · Climate and lifestyle' },
    { session: 'May–June 2024', theme: 'Support for culture · Labour shortage · Teaching in the folkeskole' },
    { session: '2019–2020', theme: 'Transport, working hours, culture, gender and work, diet, student housing, children online, the health service, work and language, work and family life, young people and health' },
  ],
  pattern:
    'Every one of the sittings above had a work topic (7 of 7). The rest come from health, education, digital life, culture and money. The questions follow one fixed pattern in all 14 topics published with full questions since 2019. First comes "Hvorfor tror du, (at) …?" about one picture, with a follow-up such as "Synes du, det er en god idé …?". Then a broader "Hvilke fordele og ulemper er der ved …?".',
  likely: [
    { title: 'One topic about work', why: '7 of 7 sittings. Candidates: senior workers and retirement, working from home, a four-day week, stress, AI and jobs, foreign labour.' },
    { title: 'One about health, welfare or money', why: 'The doctor, the health service, students’ money, diet, young people’s health. Candidates: waiting lists, mental health, the cost of living.' },
    { title: 'One about education, culture or digital life', why: 'The folkeskole, culture funding, social media, children online. Candidates: mobile phones in school, screen time, libraries, sport.' },
  ],
  questionTypes: [
    { label: 'Hvorfor tror du, …?', share: 'every topic', example: 'Hvorfor tror du, de gør det?', note: 'Give 2–3 causes: "Jeg tror, det skyldes flere ting. For det første …"' },
    { label: 'Synes du, det er en god idé …?', example: 'Synes du, det er en god idé? Hvorfor/hvorfor ikke?', note: 'A clear yes or no, then a reason and an example.' },
    { label: 'Hvilke fordele og ulemper …?', share: 'every topic', example: 'Hvilke fordele og ulemper er der ved det?', note: 'Two of each, then your own view.' },
  ],
  tips: [
    { title: 'Name the picture first', text: 'Start with a sentence about what you see: "På billedet ser jeg …". It gives you a few seconds to think.' },
    { title: 'Answer "Hvorfor tror du" with several causes', text: 'Practical (money, time), personal (habits, feelings) and social (rules, culture). Three short causes beat one long one.' },
    { title: 'Fordele og ulemper: both, then you', text: 'Give at least one advantage and one disadvantage, then say which side you lean to. Without your view the answer feels unfinished.' },
    { title: 'Bring your own experience', text: 'A short example from your life or home country makes an answer concrete and longer: "I mit hjemland …", "Da jeg …".' },
  ],
  cheatSheet: [
    {
      title: 'Answering "Hvorfor tror du …?"',
      items: [
        { da: 'På billedet ser jeg …', en: 'In the picture I see …' },
        { da: 'Jeg tror, det skyldes flere ting. For det første … For det andet …', en: 'I think it is due to several things. Firstly … Secondly …' },
        { da: 'Mange har nok ikke tid / råd til …', en: 'Many people probably don’t have time for / can’t afford …' },
        { da: 'Det hænger også sammen med, at …', en: 'It is also linked to the fact that …' },
      ],
    },
    {
      title: 'Answering "Hvilke fordele og ulemper …?"',
      items: [
        { da: 'Der er både fordele og ulemper ved det.', en: 'There are both advantages and disadvantages to it.' },
        { da: 'En fordel er, at … En anden fordel er, at …', en: 'One advantage is that … Another advantage is that …' },
        { da: 'Til gengæld er der også ulemper. Fx kan det …', en: 'On the other hand there are also disadvantages. For example, it can …' },
        { da: 'Hvis jeg skal sige min mening, så synes jeg, at fordelene er størst, fordi …', en: 'If I give my opinion, I think the advantages outweigh the disadvantages, because …' },
      ],
    },
  ],
  links: [
    { label: 'Real topics with model answers', path: '/topics' },
    { label: 'Practice topics in the same pattern', path: '/topics/practice' },
  ],
};

export const FORECASTS: Record<ForecastSection, TaskForecast[]> = {
  reading: [LF1, LF2A, LF2B, LF3],
  writing: [D1, D2A, D2B],
  speaking: [ORAL1, ORAL2],
};
