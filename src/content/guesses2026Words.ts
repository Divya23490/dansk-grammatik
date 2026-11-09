/**
 * Word lists for the "November 2026 guesses" page, two per task:
 *   - likely: the words most likely to appear, ranked by how often they have
 *     appeared in published PD3 papers (counts are given in the notes);
 *   - revise: a bigger list of the same kinds of words, for revision.
 *
 * Reading counts come from all 17 transcribed reading papers (2015–2024).
 * In the gap-fill task (today's Delprøve 3, Delprøve 2B before Nov 2022) that is
 * 136 gaps and 544 options. "Offered" counts every time a word was one of the
 * four options, and "right" counts how often it was the answer.
 */

export interface Term {
  da: string;
  en: string;
  /** Why it is here, or how to use it. */
  note?: string;
}

export interface TermGroup {
  title: string;
  note?: string;
  items: Term[];
}

export interface WordLists {
  likely: { intro: string; groups: TermGroup[] };
  revise: { intro: string; groups: TermGroup[] };
}

// ─── Delprøve 3: the gap-fill ───────────────────────────────────────────────

export const LF3_WORDS: WordLists = {
  likely: {
    intro:
      'Ranked by how often each word has been one of the four options in the 17 published gap-fills, and how often it was the answer. Expect 2–3 connectors, 2 words with a fixed preposition, and 2 verbs among the 8 gaps.',
    groups: [
      {
        title: 'Connectors that are often the answer',
        items: [
          { da: 'nemlig', en: 'you see / because (explains the sentence before)', note: 'Offered 7 times, right 6. Comes after the verb, never first: "Det skyldes nemlig, at …".' },
          { da: 'samtidig', en: 'at the same time / also', note: 'Offered 5 times, right all 5. Adds a second fact that is true alongside the first.' },
          { da: 'desuden', en: 'furthermore / besides', note: 'Offered 13 times, right 4. Adds another point in the same direction.' },
          { da: 'derfor', en: 'therefore / that is why', note: 'Offered 11 times, right 4. The sentence after is a result of the one before.' },
          { da: 'som nævnt', en: 'as mentioned', note: 'Offered 6 times, right 4. Only right if the fact really was mentioned earlier in the text.' },
          { da: 'imidlertid', en: 'however', note: 'Offered 11 times, right 3. Formal contrast: what follows limits or goes against what came before.' },
          { da: 'dermed', en: 'thereby / so / with that', note: 'Offered 6 times, right 3. A result that follows directly.' },
          { da: 'derimod', en: 'by contrast / on the other hand', note: 'Offered 12 times, right 2. Compares two groups or things that differ.' },
          { da: 'blandt andet / eksempelvis', en: 'among other things / for example', note: 'Right 4 of the 5 times offered. What follows is an example of the general point.' },
          { da: 'således', en: 'thus / in this way', note: 'Offered 3 times, right 1. Sums up or draws a conclusion.' },
        ],
      },
      {
        title: 'Connectors that are usually the wrong option',
        note: 'Classic distractors: they appear again and again, but rarely fit. Do not rule them out blindly; check the logic.',
        items: [
          { da: 'alligevel', en: 'even so / still', note: 'Offered 15 times, right once. Only fits when something happens despite what you would expect.' },
          { da: 'omvendt', en: 'conversely / the other way round', note: 'Offered 11 times, never right. Needs a true reversal: A affects B, and B affects A.' },
          { da: 'tværtimod', en: 'on the contrary', note: 'Offered 7 times, never right. Only after a negative sentence: "Det er ikke dyrt. Tværtimod …".' },
          { da: 'ligeledes', en: 'likewise / also', note: 'Offered 7 times, never right.' },
          { da: 'til gengæld', en: 'on the other hand / in return', note: 'Offered 6 times, never right. A plus that balances a minus.' },
        ],
      },
      {
        title: 'Words with a fixed preposition',
        note: 'If the preposition is part of the option, decide the direction: is the thing a cause, an effect, a purpose or an opinion?',
        items: [
          { da: 'årsag(en) til / grund(en) til', en: 'the cause of / the reason for', note: 'Offered 12 times (in all its forms), right 2. The cause comes before "til", the effect after.' },
          { da: 'konsekvens(en) af / følge(n) af', en: 'the consequence of / the result of', note: 'Offered 9 times, right 6. The opposite direction: the effect comes before "af", the cause after.' },
          { da: 'forklaring(en) på', en: 'the explanation of', note: 'Offered 5 times, right 2.' },
          { da: 'formålet med', en: 'the purpose of', note: 'Offered 3 times.' },
          { da: 'fordele ved / ulemper ved / udfordringer ved', en: 'the advantages / disadvantages / challenges of', note: 'Offered 5 times, right 1.' },
          { da: 'holdning(er) til', en: 'attitude(s) to / opinion(s) on', note: 'Offered 4 times, right 1.' },
          { da: 'indflydelse på', en: 'influence on / a say in', note: 'Right in 2021.' },
          { da: 'effekten af', en: 'the effect of', note: 'Right in 2021.' },
          { da: 'tid til / råd til / behov for / mulighed for', en: 'time for / can afford / need for / opportunity to', note: 'Offered 13 times together, right 2. Often after har or have.' },
          { da: 'ønske om / uenighed om', en: 'a wish for / disagreement about', note: 'Each right once.' },
          { da: 'modstand mod', en: 'opposition to / resistance to', note: 'Right in 2023.' },
          { da: 'mangel på', en: 'a lack of / a shortage of', note: 'Right once.' },
          { da: 'baggrunden for / forudsætning for / betingelse for', en: 'the background for / a precondition for / a condition for', note: 'Offered 7 times, right 1.' },
        ],
      },
      {
        title: 'Verbs',
        items: [
          { da: 'afvise', en: 'to reject / to deny', note: 'Offered 6 times (with afviser), right 2. Followed by a "no".' },
          { da: 'bekræfte', en: 'to confirm', note: 'Right in 2023. Followed by a "yes".' },
          { da: 'påpege', en: 'to point out', note: 'Right in 2023. Neutral: an expert draws attention to a fact.' },
          { da: 'indrømme / erkende', en: 'to admit / to acknowledge', note: 'Offered 4 times together. Admitting something negative or unexpected.' },
          { da: 'skyldes', en: 'to be due to / to be caused by', note: 'Offered 3 times, right 2. "X skyldes Y" = Y causes X.' },
          { da: 'medføre / betyde', en: 'to lead to / to mean', note: 'Offered 3 times, right 1. The opposite of skyldes: "X medfører Y" = X causes Y.' },
          { da: 'kræve', en: 'to require / to demand', note: 'Right in 2021.' },
          { da: 'reducere', en: 'to reduce', note: 'Offered 2 times, right both.' },
          { da: 'forlænge / forkorte', en: 'to extend / to shorten', note: 'Both offered in 2023.' },
          { da: 'forebygge / forhindre', en: 'to prevent (before it happens) / to stop, to hinder', note: 'Each offered once, forebygge right once.' },
          { da: 'sikre / garantere', en: 'to ensure / to guarantee', note: 'garantere right in 2023.' },
          { da: 'opleve', en: 'to experience', note: 'Right in 2022. "Mange oplever, at …" = many find that …' },
          { da: 'overholde', en: 'to comply with / to keep (a rule)', note: 'Right in 2022.' },
        ],
      },
      {
        title: 'Evaluating words',
        note: 'Many papers have one adjective gap, often "Det er ___, at …". Read what follows: a problem, a surprise or a need.',
        items: [
          { da: 'nødvendigt', en: 'necessary', note: 'Offered 5 times, right 1.' },
          { da: 'muligt', en: 'possible', note: 'Offered 2 times, right 1.' },
          { da: 'overraskende', en: 'surprising', note: 'Offered 2 times, right both. Fits when the fact goes against expectation.' },
          { da: 'bekymrende', en: 'worrying', note: 'Right in 2022. Fits when a problem follows.' },
          { da: 'vanskeligt / forventeligt', en: 'difficult / to be expected', note: 'Each offered twice.' },
        ],
      },
    ],
  },
  revise: {
    intro: 'A wider list of the same kinds of words, grouped by what they do. If you can explain the difference inside each group, you can answer almost any connector or preposition gap.',
    groups: [
      {
        title: 'Connectors: adding',
        items: [
          { da: 'desuden / derudover / herudover', en: 'furthermore / in addition / on top of this' },
          { da: 'endvidere', en: 'moreover (formal)' },
          { da: 'ligeledes', en: 'likewise' },
          { da: 'samtidig', en: 'at the same time' },
          { da: 'ikke alene … men også', en: 'not only … but also' },
          { da: 'både … og', en: 'both … and' },
          { da: 'oven i købet / tilmed', en: 'on top of that / even' },
        ],
      },
      {
        title: 'Connectors: cause',
        items: [
          { da: 'fordi / da / eftersom', en: 'because / as / since', note: 'Start a clause: subject before verb.' },
          { da: 'idet', en: 'as / since (formal)' },
          { da: 'nemlig', en: 'you see (explains)', note: 'After the verb.' },
          { da: 'på grund af / som følge af', en: 'because of / as a result of', note: 'Followed by a noun, not a clause.' },
          { da: 'takket være', en: 'thanks to', note: 'A positive cause.' },
        ],
      },
      {
        title: 'Connectors: result',
        items: [
          { da: 'derfor', en: 'therefore' },
          { da: 'dermed / hermed', en: 'thereby / with this' },
          { da: 'således', en: 'thus / in this way' },
          { da: 'altså', en: 'so / that is' },
          { da: 'følgelig', en: 'consequently (formal)' },
          { da: 'det betyder, at …', en: 'this means that …' },
        ],
      },
      {
        title: 'Connectors: contrast',
        items: [
          { da: 'men / dog', en: 'but / however', note: 'dog usually after the verb: "Det er dog dyrt."' },
          { da: 'imidlertid', en: 'however (formal)' },
          { da: 'derimod', en: 'by contrast', note: 'Two different groups or things.' },
          { da: 'til gengæld', en: 'on the other hand / in return', note: 'A plus that balances a minus.' },
          { da: 'alligevel', en: 'even so / still', note: 'Despite expectations.' },
          { da: 'omvendt', en: 'conversely' },
          { da: 'tværtimod', en: 'on the contrary', note: 'Only after a negative.' },
          { da: 'på den anden side', en: 'on the other hand' },
          { da: 'i stedet (for)', en: 'instead (of)' },
          { da: 'selvom / på trods af, at', en: 'even though / despite the fact that' },
          { da: 'uanset (om)', en: 'regardless of (whether)' },
          { da: 'bortset fra (at)', en: 'apart from (the fact that)' },
        ],
      },
      {
        title: 'Connectors: example, explanation, summary',
        items: [
          { da: 'for eksempel (fx) / eksempelvis', en: 'for example' },
          { da: 'blandt andet (bl.a.)', en: 'among other things' },
          { da: 'især / navnlig', en: 'especially / particularly' },
          { da: 'med andre ord', en: 'in other words' },
          { da: 'det vil sige (dvs.)', en: 'that is (i.e.)' },
          { da: 'alt i alt / samlet set / kort sagt', en: 'all in all / overall / in short' },
        ],
      },
      {
        title: 'Connectors: time, condition and reference',
        items: [
          { da: 'først / dernæst / derefter / herefter / til sidst', en: 'first / next / after that / after this / finally' },
          { da: 'imens / i mellemtiden', en: 'while / meanwhile' },
          { da: 'indtil', en: 'until' },
          { da: 'efterhånden', en: 'gradually / by now' },
          { da: 'hvis / medmindre / forudsat at', en: 'if / unless / provided that' },
          { da: 'som nævnt / som tidligere nævnt', en: 'as mentioned / as mentioned before' },
          { da: 'ovennævnte / førnævnte', en: 'the above-mentioned / the aforementioned' },
          { da: 'i den forbindelse', en: 'in this connection' },
        ],
      },
      {
        title: 'Prepositions: til',
        items: [
          { da: 'årsag til / grund til', en: 'cause of / reason for' },
          { da: 'holdning til / forslag til', en: 'attitude to / proposal for' },
          { da: 'adgang til / krav til', en: 'access to / requirements for' },
          { da: 'forventninger til / tillid til', en: 'expectations of / trust in' },
          { da: 'opbakning til', en: 'support for' },
          { da: 'lyst til / tid til / råd til', en: 'wanting to / time for / afford' },
          { da: 'bidrage til / føre til', en: 'contribute to / lead to' },
          { da: 'have ret til', en: 'be entitled to' },
        ],
      },
      {
        title: 'Prepositions: af',
        items: [
          { da: 'konsekvens af / følge af', en: 'consequence of / result of' },
          { da: 'effekt af / resultat af', en: 'effect of / result of' },
          { da: 'brug af / udvikling af', en: 'use of / development of' },
          { da: 'afhængig af / afhænge af', en: 'dependent on / depend on', note: 'English "on", Danish "af".' },
          { da: 'påvirket af / bestå af', en: 'affected by / consist of' },
          { da: 'tilhænger af / modstander af', en: 'supporter of / opponent of' },
        ],
      },
      {
        title: 'Prepositions: på',
        items: [
          { da: 'indflydelse på', en: 'influence on' },
          { da: 'forklaring på / svar på', en: 'explanation of / answer to' },
          { da: 'eksempel på', en: 'example of', note: 'Not "eksempel af".' },
          { da: 'reaktion på', en: 'reaction to' },
          { da: 'mangel på', en: 'lack of' },
          { da: 'fokus på / pege på', en: 'focus on / point to' },
          { da: 'forskel på', en: 'difference between' },
          { da: 'satse på / tro på / tvivle på', en: 'bet on / believe in / doubt' },
          { da: 'opmærksom på', en: 'aware of / attentive to' },
        ],
      },
      {
        title: 'Prepositions: for',
        items: [
          { da: 'interesse for', en: 'interest in', note: 'English "in", Danish "for".' },
          { da: 'forudsætning for / betingelse for', en: 'precondition for / condition for' },
          { da: 'baggrund for / grundlag for', en: 'background for / basis for' },
          { da: 'ansvar for / ansvarlig for', en: 'responsibility for / responsible for' },
          { da: 'risiko for', en: 'risk of' },
          { da: 'behov for / mulighed for', en: 'need for / opportunity to' },
          { da: 'eksponeret for / udsat for', en: 'exposed to', note: 'English "to", Danish "for".' },
          { da: 'sørge for / kæmpe for', en: 'make sure / fight for' },
        ],
      },
      {
        title: 'Prepositions: om, med, mod, ved, i, over, fra',
        items: [
          { da: 'ønske om / debat om / viden om', en: 'wish for / debate about / knowledge about' },
          { da: 'aftale om / advarsel om / krav om', en: 'agreement on / warning about / demand for' },
          { da: 'uenighed om / handle om', en: 'disagreement about / be about' },
          { da: 'problemer med / formålet med', en: 'problems with / the purpose of' },
          { da: 'erfaring med / tilfreds med', en: 'experience of / satisfied with' },
          { da: 'sammenlignet med / i forbindelse med', en: 'compared with / in connection with' },
          { da: 'modstand mod / beskyttet mod / advare mod', en: 'opposition to / protected against / warn against' },
          { da: 'fordele ved / ulemper ved', en: 'advantages of / disadvantages of' },
          { da: 'interesseret i / deltage i / investere i', en: 'interested in / take part in / invest in' },
          { da: 'stigning i / fald i', en: 'increase in / fall in' },
          { da: 'klage over / overrasket over', en: 'complain about / surprised at' },
          { da: 'forskellig fra', en: 'different from' },
        ],
      },
      {
        title: 'Verbs: what people say',
        note: 'Sort them by direction: agreeing, disagreeing or neutral.',
        items: [
          { da: 'sige / fortælle / forklare', en: 'say / tell / explain', note: 'Neutral.' },
          { da: 'påpege / understrege / fremhæve', en: 'point out / stress / highlight', note: 'Neutral, with emphasis.' },
          { da: 'tilføje / konstatere / vurdere', en: 'add / state / assess', note: 'Neutral.' },
          { da: 'bekræfte / indrømme / erkende', en: 'confirm / admit / acknowledge', note: 'A yes, often reluctant.' },
          { da: 'afvise / benægte / tvivle på', en: 'reject / deny / doubt', note: 'A no.' },
          { da: 'påstå / fastholde', en: 'claim / maintain', note: 'The writer may not agree.' },
          { da: 'advare mod / anbefale / foreslå', en: 'warn against / recommend / suggest' },
          { da: 'kritisere / opfordre til', en: 'criticise / urge, call for' },
        ],
      },
      {
        title: 'Verbs: cause and effect',
        items: [
          { da: 'skyldes', en: 'be due to', note: 'Effect first: "Stigningen skyldes …".' },
          { da: 'medføre / føre til / resultere i', en: 'lead to / result in', note: 'Cause first.' },
          { da: 'betyde / forårsage', en: 'mean / cause' },
          { da: 'bidrage til / påvirke', en: 'contribute to / affect' },
          { da: 'afhænge af / hænge sammen med', en: 'depend on / be linked to' },
        ],
      },
      {
        title: 'Verbs: up, down and change',
        items: [
          { da: 'stige / falde', en: 'rise / fall', note: 'Without an object: "Priserne stiger."' },
          { da: 'øge / mindske', en: 'increase / reduce', note: 'With an object: "Det øger risikoen."' },
          { da: 'reducere / nedbringe', en: 'reduce / bring down' },
          { da: 'forbedre / forværre', en: 'improve / worsen' },
          { da: 'forlænge / forkorte', en: 'extend / shorten' },
          { da: 'udvide / begrænse', en: 'expand / limit' },
        ],
      },
      {
        title: 'Verbs: enable, prevent, handle',
        items: [
          { da: 'muliggøre / sikre / garantere', en: 'make possible / ensure / guarantee' },
          { da: 'kræve / forudsætte', en: 'require / presuppose' },
          { da: 'forhindre / forebygge / undgå', en: 'stop / prevent / avoid' },
          { da: 'udelukke / tillade', en: 'rule out / allow' },
          { da: 'overholde / opfylde', en: 'comply with / fulfil' },
          { da: 'indføre / afskaffe', en: 'introduce / abolish' },
          { da: 'prioritere / håndtere / løse', en: 'prioritise / handle / solve' },
        ],
      },
    ],
  },
};

// ─── Delprøve 1 ─────────────────────────────────────────────────────────────

export const LF1_WORDS: WordLists = {
  likely: {
    intro: 'The words in the questions themselves. Recognising them instantly tells you what kind of answer to look for.',
    groups: [
      {
        title: 'Question phrases',
        items: [
          { da: 'Hvad hedder …?', en: 'What is … called?', note: 'Answer with a name copied from the text.' },
          { da: 'Hvad koster …?', en: 'How much does … cost?', note: 'Check who pays: adults, children, groups.' },
          { da: 'Hvor lang tid tager / varer …?', en: 'How long does … take / last?' },
          { da: 'Hvor stor en andel / del …?', en: 'How large a share / part …?', note: 'Answer as a fraction or percentage.' },
          { da: 'Hvilken type …?', en: 'What kind of …?' },
          { da: 'Hvad … ud over / udover …?', en: 'What … apart from …?', note: 'About 1 question in 10. The answer is the other thing, never the one named.' },
          { da: 'Svar ’ja’ eller ’nej’.', en: 'Answer yes or no.', note: 'About once per paper.' },
        ],
      },
      {
        title: 'Conditions hidden in the question',
        items: [
          { da: 'om søndagen / på hverdage', en: 'on Sundays / on weekdays' },
          { da: 'i højsæsonen / uden for sæsonen', en: 'in high season / out of season' },
          { da: 'i forvejen', en: 'in advance' },
          { da: 'for grupper / for børn under …', en: 'for groups / for children under …' },
          { da: 'gratis', en: 'free (of charge)' },
          { da: 'normalt / i nogle situationer', en: 'normally / in some situations', note: 'Look for the exception in the text.' },
        ],
      },
    ],
  },
  revise: {
    intro: 'Words that fill the place and heritage texts Delprøve 1 always uses. Knowing them makes scanning much faster.',
    groups: [
      {
        title: 'Visiting',
        items: [
          { da: 'en seværdighed / en attraktion', en: 'a sight / an attraction' },
          { da: 'en udstilling / en samling', en: 'an exhibition / a collection' },
          { da: 'en rundvisning / en guide', en: 'a guided tour / a guide' },
          { da: 'en entré / en billetpris', en: 'admission / a ticket price' },
          { da: 'åbningstider / helårsåbent', en: 'opening hours / open all year' },
          { da: 'højsæson / lavsæson', en: 'high season / low season' },
          { da: 'at bestille / booke i forvejen', en: 'to book in advance' },
          { da: 'rabat / gratis adgang', en: 'discount / free admission' },
          { da: 'en pensionist / en studerende', en: 'a pensioner / a student' },
        ],
      },
      {
        title: 'Travel and nature',
        items: [
          { da: 'en afgang / en ankomst', en: 'a departure / an arrival' },
          { da: 'en færge / en køreplan', en: 'a ferry / a timetable' },
          { da: 'en vandrerute / en cykelrute / en sti', en: 'a walking route / a cycle route / a path' },
          { da: 'et underlag', en: 'a surface (to walk on)' },
          { da: 'fredet', en: 'protected (by law)' },
          { da: 'en kyst / en klint / en hede / en skov', en: 'a coast / a cliff / a heath / a forest' },
        ],
      },
      {
        title: 'History',
        items: [
          { da: 'et slot / en borg / en kirke', en: 'a palace / a castle, fort / a church' },
          { da: 'middelalderen / vikingetiden / jernalderen', en: 'the Middle Ages / the Viking Age / the Iron Age' },
          { da: '1800-tallet', en: 'the 1800s (the 19th century)', note: 'A classic trap: 1800-tallet is not the 18th century.' },
          { da: 'et århundrede', en: 'a century' },
          { da: 'opført / grundlagt / restaureret', en: 'built / founded / restored' },
          { da: 'en indbygger', en: 'an inhabitant' },
        ],
      },
      {
        title: 'Events, food and culture',
        items: [
          { da: 'en festival / et marked / et arrangement', en: 'a festival / a market / an event' },
          { da: 'en tradition / en specialitet / en ret', en: 'a tradition / a speciality / a dish' },
          { da: 'en forestilling / en anmeldelse / en anmelder', en: 'a performance / a review / a reviewer' },
          { da: 'en målgruppe', en: 'a target group' },
          { da: 'en frivillig', en: 'a volunteer' },
        ],
      },
      {
        title: 'Numbers in words',
        items: [
          { da: 'halvdelen / en tredjedel / en fjerdedel', en: 'half / a third / a quarter' },
          { da: 'hver anden / hver tredje', en: 'every second / every third (one in two / one in three)' },
          { da: 'knap / godt', en: 'just under / just over', note: '"knap 100" = a bit under 100; "godt 100" = a bit over.' },
          { da: 'et døgn', en: '24 hours, a day and night' },
        ],
      },
    ],
  },
};

// ─── Delprøve 2A ────────────────────────────────────────────────────────────

export const LF2A_WORDS: WordLists = {
  likely: {
    intro: 'Phrases from the multiple-choice questions, counted across all 17 papers.',
    groups: [
      {
        title: 'Question phrases',
        items: [
          { da: 'grund / årsag', en: 'reason / cause', note: 'In about 25 questions. Find the reason the text marks as most important.' },
          { da: 'i overensstemmelse med', en: 'in line with / consistent with', note: 'In 17 questions: "Hvilket udsagn er i overensstemmelse med teksten?" = which statement matches the text.' },
          { da: 'ifølge teksten', en: 'according to the text', note: 'In 15 questions. Only the text counts, not your own opinion.' },
          { da: 'giver udtryk for', en: 'expresses / says', note: 'In 8 questions. An opinion or a feeling of a named person.' },
          { da: 'mest afgørende / primære', en: 'most decisive / main', note: 'In 7 questions.' },
          { da: 'både … og …', en: 'both … and …', note: 'True for both people.' },
        ],
      },
      {
        title: 'Words that make an option wrong',
        note: 'Wrong options often take the text’s idea and make it absolute. Read these words slowly.',
        items: [
          { da: 'altid / aldrig', en: 'always / never' },
          { da: 'kun / udelukkende', en: 'only / exclusively' },
          { da: 'alle / ingen', en: 'all / none' },
          { da: 'ikke længere / endnu ikke', en: 'no longer / not yet' },
        ],
      },
    ],
  },
  revise: {
    intro: 'The texts are working-life stories. These words, and the paraphrases the options use instead of the text’s own words, come up again and again.',
    groups: [
      {
        title: 'Work and career',
        items: [
          { da: 'at skifte branche / et karriereskift', en: 'to change field / a career change' },
          { da: 'selvstændig / en iværksætter', en: 'self-employed / an entrepreneur' },
          { da: 'en leder / ledelse / at lede', en: 'a manager / management / to lead' },
          { da: 'en arbejdsbyrde / krav / forventninger', en: 'a workload / demands / expectations' },
          { da: 'sygemeldt / at sygemelde sig', en: 'on sick leave / to call in sick' },
          { da: 'en uddannelse / at efteruddanne sig', en: 'an education / to retrain' },
        ],
      },
      {
        title: 'Feelings and attitudes',
        items: [
          { da: 'tilfreds / utilfreds', en: 'satisfied / dissatisfied' },
          { da: 'presset / stresset / udbrændt', en: 'under pressure / stressed / burnt out' },
          { da: 'motiveret / engageret', en: 'motivated / committed' },
          { da: 'usikker / tvivlende', en: 'unsure / doubtful' },
          { da: 'lettet / skuffet / overrasket', en: 'relieved / disappointed / surprised' },
          { da: 'at trives', en: 'to thrive, to be happy (at work, at school)' },
          { da: 'at fortryde / at savne', en: 'to regret / to miss' },
        ],
      },
      {
        title: 'Paraphrase pairs: text word → option word',
        note: 'The right option rarely repeats the text. It says the same thing in other words.',
        items: [
          { da: 'afgørende → det vigtigste', en: 'decisive → the most important' },
          { da: 'en udfordring → et problem, en vanskelighed', en: 'a challenge → a problem, a difficulty' },
          { da: 'erkende → indrømme', en: 'acknowledge → admit' },
          { da: 'trives → have det godt', en: 'thrive → feel good' },
          { da: 'fravælge → sige nej til', en: 'opt out of → say no to' },
          { da: 'at gå ned med stress → blive syg af stress', en: 'to break down with stress → to fall ill from stress' },
          { da: 'ikke turde → være bange for', en: 'not dare → be afraid to' },
        ],
      },
    ],
  },
};

// ─── Delprøve 2B ────────────────────────────────────────────────────────────

export const LF2B_WORDS: WordLists = {
  likely: {
    intro: 'How the missing paragraphs begin. In the 4 papers so far, more than half of the 28 paragraphs (extras included) opened with a word that points back to the paragraph before.',
    groups: [
      {
        title: 'Openings that point back',
        items: [
          { da: 'Det betyder …', en: 'This means …', note: 'A result of what came just before.' },
          { da: 'Det samme …', en: 'The same …', note: 'Something already described.' },
          { da: 'Men det, der …', en: 'But what …', note: 'A contrast to the paragraph before.' },
          { da: 'Faktisk …', en: 'In fact …', note: 'Corrects or strengthens the previous point.' },
          { da: 'Der er dog … / Man må dog …', en: 'There is, however … / One must, however …', note: 'A limitation of what was just said.' },
          { da: 'Konsekvensen vil nemlig …', en: 'The consequence will be …', note: 'nemlig explains the paragraph before.' },
          { da: 'Fx er der …', en: 'For example, there is …', note: 'An example of the general point before.' },
          { da: 'Måske fordi …', en: 'Perhaps because …', note: 'Answers a question asked just before the gap.' },
        ],
      },
      {
        title: 'How people are quoted',
        note: 'Counted in the 2A and 2B texts of all 17 papers.',
        items: [
          { da: '…, siger hun / han', en: '…, she / he says', note: '95 times. The person must already have been introduced.' },
          { da: 'mener', en: 'thinks / believes', note: '67 times.' },
          { da: 'viser', en: 'shows', note: '22 times: "En undersøgelse viser, at …".' },
          { da: 'ifølge …', en: 'according to …', note: '17 times.' },
          { da: 'fortæller / oplever', en: 'tells / experiences', note: '17 and 14 times.' },
        ],
      },
    ],
  },
  revise: {
    intro: 'Words that tie paragraphs together. Each one tells you what must come just before it.',
    groups: [
      {
        title: 'Reference words',
        items: [
          { da: 'det / dette / denne / disse', en: 'it, this / this (et-word) / this (en-word) / these' },
          { da: 'den slags / sådan / sådanne', en: 'that kind of / like that / such' },
          { da: 'her / hertil / heraf / hermed', en: 'here / to this / of this / with this' },
          { da: 'de nævnte / ovennævnte', en: 'the ones mentioned / the above' },
          { da: 'begge / de to', en: 'both / the two', note: 'Two people or things must be named before.' },
        ],
      },
      {
        title: 'Openings that change direction',
        items: [
          { da: 'Til gengæld … / Derimod …', en: 'On the other hand … / By contrast …' },
          { da: 'Alligevel … / Trods det …', en: 'Even so … / Despite that …' },
          { da: 'Ikke desto mindre …', en: 'Nevertheless …' },
          { da: 'Spørgsmålet er …', en: 'The question is …', note: 'Often followed by an answer in the next paragraph.' },
        ],
      },
      {
        title: 'Openings that continue',
        items: [
          { da: 'Derudover … / Desuden …', en: 'In addition … / Furthermore …' },
          { da: 'Samtidig …', en: 'At the same time …' },
          { da: 'Det gælder også …', en: 'This also applies to …' },
          { da: 'Ifølge … / En ny undersøgelse viser …', en: 'According to … / A new survey shows …', note: 'Often opens a new section with numbers.' },
          { da: 'Det skyldes …', en: 'This is due to …', note: 'Explains the paragraph before.' },
        ],
      },
    ],
  },
};

// ─── Writing ────────────────────────────────────────────────────────────────

const WRITING_PREPOSITIONS: TermGroup = {
  title: 'Verb + preposition pairs writers get wrong',
  items: [
    { da: 'have indflydelse på', en: 'have an influence on' },
    { da: 'have betydning for', en: 'matter for' },
    { da: 'tage ansvar for', en: 'take responsibility for' },
    { da: 'være afhængig af', en: 'depend on' },
    { da: 'hænge sammen med', en: 'be linked to' },
    { da: 'føre til / bidrage til', en: 'lead to / contribute to' },
    { da: 'lægge vægt på / sætte fokus på', en: 'emphasise / focus on' },
    { da: 'investere i / satse på', en: 'invest in / bet on' },
    { da: 'tage stilling til', en: 'take a position on' },
    { da: 'være enig i (en påstand) / enig med (en person)', en: 'agree with (a statement) / agree with (a person)' },
    { da: 'gå ind for / være imod', en: 'support / be against' },
  ],
};

export const D1_WORDS: WordLists = {
  likely: {
    intro: 'The words on the task sheet, and the expressions the four mails since 2021 have needed.',
    groups: [
      {
        title: 'On the task sheet',
        items: [
          { da: 'Tak for mailen.', en: 'Thank (your friend) for the mail.', note: 'Bullet 1, every time.' },
          { da: 'Kom ind på de understregede dele i mailen.', en: 'Deal with the underlined parts of the mail.', note: 'Bullet 2, every time.' },
          { da: 'Foreslå, at I mødes / ringer sammen …', en: 'Suggest that you meet / call each other …', note: 'Bullet 3. Meeting 3 times, phone once.' },
        ],
      },
      {
        title: 'Verb + preposition you will need',
        items: [
          { da: 'glæde sig til', en: 'look forward to', note: 'Not "glæde sig at".' },
          { da: 'tænke på / tænke over', en: 'think of / think about (consider)' },
          { da: 'være bange for / være nervøs for', en: 'be afraid of / be nervous about' },
          { da: 'have lyst til / have tid til', en: 'want to / have time for' },
          { da: 'hjælpe med', en: 'help with' },
          { da: 'høre fra / snakke om', en: 'hear from / talk about' },
          { da: 'flytte ind hos / flytte hjemmefra', en: 'move in with / leave home' },
          { da: 'blive leder for', en: 'become the manager of' },
        ],
      },
    ],
  },
  revise: {
    intro: 'Small words that make a mail sound natural, and the pairs learners mix up.',
    groups: [
      {
        title: 'Natural mail words',
        items: [
          { da: 'jo / da / nok / vel', en: 'small softeners: "you know", "surely", "probably", "I suppose"', note: '"Det er jo svært" = it is difficult, you know.' },
          { da: 'egentlig / faktisk', en: 'actually / in fact' },
          { da: 'helt klart / selvfølgelig', en: 'definitely / of course' },
          { da: 'i hvert fald', en: 'at least / in any case' },
          { da: 'Hvad med …?', en: 'What about …?' },
        ],
      },
      {
        title: 'Pairs learners mix up',
        items: [
          { da: 'hjem / hjemme', en: 'home (movement) / at home (place)', note: '"Jeg går hjem" / "Jeg er hjemme".' },
          { da: 'ud / ude, ind / inde, op / oppe', en: 'movement / place', note: 'The same rule as hjem / hjemme.' },
          { da: 'om / hvis', en: 'whether / if (condition)', note: '"Jeg ved ikke, om …" = I don’t know whether …' },
          { da: 'kende / vide', en: 'know a person or place / know a fact' },
          { da: 'lære / undervise', en: 'learn / teach' },
          { da: 'synes / tro / mene', en: 'think (opinion from experience) / think (believe, guess) / think (hold a view)' },
        ],
      },
      WRITING_PREPOSITIONS,
    ],
  },
};

export const D2A_WORDS: WordLists = {
  likely: {
    intro: 'The words bullets 1 and 2 use every time, and the words for describing a bar chart.',
    groups: [
      {
        title: 'On the task sheet',
        items: [
          { da: 'Beskriv kort hovedtrækkene i diagrammet.', en: 'Briefly describe the main features of the chart.', note: 'Bullet 1, word for word every time.' },
          { da: 'Fortæl, hvilke årsager der kan være til de forskelle, diagrammet viser.', en: 'Explain what could cause the differences the chart shows.', note: 'Bullet 2, every time.' },
          { da: 'Vurdér … Begrund dine synspunkter.', en: 'Assess … Give reasons for your views.', note: 'Bullet 3, about 50%.' },
        ],
      },
      {
        title: 'Describing the chart',
        items: [
          { da: 'en andel / en del', en: 'a share / a part' },
          { da: 'ligge på / udgøre', en: 'be at (a level) / make up', note: '"Andelen ligger på ca. 12 %." / "De udgør 12 %."' },
          { da: 'flest / færrest', en: 'the most / the fewest' },
          { da: 'højest / lavest', en: 'highest / lowest' },
          { da: 'dobbelt så mange som / halvt så mange som', en: 'twice as many as / half as many as' },
          { da: 'procent / procentpoint', en: 'per cent / percentage points', note: 'From 5 % to 10 % is 5 percentage points, but 100 per cent more.' },
          { da: 'ca. / knap / godt', en: 'about / just under / just over' },
        ],
      },
    ],
  },
  revise: {
    intro: 'Words for trends, causes and weighing up, for any chart topic.',
    groups: [
      {
        title: 'Trends',
        items: [
          { da: 'stige / falde (steg, faldt)', en: 'rise / fall (rose, fell)' },
          { da: 'en stigning / et fald', en: 'an increase / a decrease' },
          { da: 'være stabil / ligge nogenlunde stille', en: 'be stable / stay roughly level' },
          { da: 'markant / en smule', en: 'significantly / slightly' },
          { da: 'fordelt på', en: 'broken down by' },
          { da: 'i forhold til / sammenlignet med', en: 'relative to / compared with' },
        ],
      },
      {
        title: 'Causes',
        items: [
          { da: 'skyldes / hænge sammen med', en: 'be due to / be linked to' },
          { da: 'have betydning for', en: 'matter for' },
          { da: 'typisk / i højere grad / i mindre grad', en: 'typically / to a greater extent / to a lesser extent' },
          { da: 'fysisk hårdt arbejde / skiftende arbejdstider', en: 'physically hard work / shift work' },
          { da: 'livsfase / børnefamilier', en: 'stage of life / families with children' },
        ],
      },
      {
        title: 'Weighing up',
        items: [
          { da: 'en fordel / en ulempe', en: 'an advantage / a disadvantage' },
          { da: 'et argument for / imod', en: 'an argument for / against' },
          { da: 'på kort sigt / på lang sigt', en: 'in the short term / in the long term' },
          { da: 'arbejdsgiveren / medarbejderne / ledelsen', en: 'the employer / the employees / the management' },
          { da: 'samfundsøkonomisk', en: 'for the economy as a whole' },
        ],
      },
      WRITING_PREPOSITIONS,
    ],
  },
};

export const D2B_WORDS: WordLists = {
  likely: {
    intro: 'The words bullets 1–3 use every time, and the words for taking a position.',
    groups: [
      {
        title: 'On the task sheet',
        items: [
          { da: 'Fortæl kort om …', en: 'Briefly tell about …', note: 'Bullet 1: your experience.' },
          { da: 'Kommentér et eller to af eksemplerne / forslagene / holdningerne fra listen.', en: 'Comment on one or two of the examples / suggestions / views in the list.', note: 'Bullet 2.' },
          { da: 'Vurdér, om … Begrund dine synspunkter.', en: 'Assess whether … Give reasons for your views.', note: 'Bullet 3, about 50%.' },
        ],
      },
      {
        title: 'Taking a position',
        items: [
          { da: 'den enkelte / samfundet', en: 'the individual / society', note: 'Bullet 3 asked "the individual or society" in 2021.' },
          { da: 'et ansvar / at tage ansvar for', en: 'a responsibility / to take responsibility for' },
          { da: 'være enig i / være uenig i', en: 'agree / disagree with (a statement)' },
          { da: 'tilhænger af / modstander af', en: 'in favour of / against' },
          { da: 'have større indflydelse end', en: 'have more influence than' },
          { da: 'det vigtigste er …', en: 'the most important thing is …' },
        ],
      },
    ],
  },
  revise: {
    intro: 'Words for the actors and arguments that come back in every opinion topic.',
    groups: [
      {
        title: 'Who is responsible?',
        items: [
          { da: 'staten / kommunen / politikerne', en: 'the state / the municipality / the politicians' },
          { da: 'arbejdsgiveren / virksomheden', en: 'the employer / the company' },
          { da: 'forældrene / skolen', en: 'the parents / the school' },
          { da: 'borgerne / forbrugerne', en: 'citizens / consumers' },
        ],
      },
      {
        title: 'Arguing',
        items: [
          { da: 'et synspunkt / en holdning', en: 'a point of view / an opinion' },
          { da: 'et argument for / imod', en: 'an argument for / against' },
          { da: 'have ret i', en: 'be right about' },
          { da: 'i teorien / i praksis', en: 'in theory / in practice' },
          { da: 'det kommer an på', en: 'it depends on' },
          { da: 'på den ene side / på den anden side', en: 'on the one hand / on the other hand' },
          { da: 'frivillighed / tvang', en: 'choice / compulsion', note: 'Useful for "should it be a rule?" topics.' },
          { da: 'lighed / ulighed / retfærdighed', en: 'equality / inequality / fairness' },
        ],
      },
      WRITING_PREPOSITIONS,
    ],
  },
};
