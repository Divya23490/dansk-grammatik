import type { GradedAnswer, PracticeTask, TaskBullet } from './types';

/**
 * Delprøve 2B — original simulated tasks (≥200 words, a box of six
 * statements). Written for the app; none of these topics has been set on a
 * real PD3 paper.
 */

const EVALUATE_SHARE = 0.5;
const HALF = '(Besvarelsen af dette punkt skal udgøre ca. 50 % af den samlede besvarelse).';

const bullets = (
  experience: [string, string],
  viewpoints: [string, string],
  evaluate: [string, string],
): TaskBullet[] => [
  { key: 'experience', danish: experience[0], english: experience[1] },
  { key: 'viewpoints', danish: viewpoints[0], english: viewpoints[1] },
  { key: 'evaluate', danish: `${evaluate[0]} Begrund dine synspunkter. ${HALF}`, english: evaluate[1], share: EVALUATE_SHARE },
];

export const SIM_TASKS_D2B: PracticeTask[] = [
  {
    id: 'wsim-d2b-1',
    type: 'd2b-list',
    title: 'Ensomhed blandt ældre',
    origin: 'simulated',
    intro:
      'Mange ældre i Danmark føler sig ensomme, især hvis de bor alene og har svært ved at komme ud. Der er forskellige holdninger til, hvad der skal gøres for at mindske ensomheden.',
    list: [
      'Kommunen skal tilbyde gratis aktiviteter for ældre.',
      'Familien har pligt til at besøge sine ældre jævnligt.',
      'Ældre skal lære at bruge videoopkald og sociale medier.',
      'Unge skal kunne bo billigt på plejehjem mod at hjælpe de ældre.',
      'Der skal bygges flere bofællesskaber, hvor unge og ældre bor sammen.',
      'Ældre skal have lov til at arbejde, så længe de har lyst.',
    ],
    bullets: bullets(
      [
        'Fortæl kort om dine egne erfaringer med ældre mennesker i din familie eller dit nærområde.',
        'Briefly describe your own experience with older people in your family or neighbourhood.',
      ],
      [
        'Kommentér et eller to af synspunkterne fra listen.',
        'Comment on one or two of the viewpoints in the box — name them, agree or disagree, and say why.',
      ],
      [
        'Vurdér, om det er familiens eller samfundets ansvar at forhindre ensomhed blandt ældre.',
        "Evaluate whether preventing loneliness among the elderly is the family's or society's responsibility. Give reasons. This part should be about half the answer.",
      ],
    ),
    minWords: 200,
    slots: {
      intro: {
        hint: 'Introduce loneliness among the elderly in your own words: many live alone, often after losing a partner, and find it hard to get out.',
        starters: [
          { da: 'Ensomhed blandt ældre er et problem, som mange først får øje på, når …', en: 'Loneliness among the elderly is a problem many only notice when …' },
          { da: 'I Danmark bor mange ældre alene, og derfor …', en: 'In Denmark many elderly people live alone, and therefore …' },
          { da: 'Der er delte meninger om, hvem der skal hjælpe ensomme ældre, men …', en: 'Opinions differ on who should help lonely elderly people, but …' },
        ],
      },
      experience: {
        hint: 'Describe one older person in your family or neighbourhood (a grandparent, a neighbour, someone you met at work) and one detail that shows how they lived or whether they were lonely. Past tense, 3–4 sentences.',
        starters: [
          { da: 'Min bedstemor boede alene, efter at …', en: 'My grandmother lived alone after …' },
          { da: 'Da jeg arbejdede på et plejehjem, oplevede jeg, at …', en: 'When I worked in a care home, I experienced that …' },
          { da: 'I mit hjemland bor de ældre ofte sammen med deres børn, men i Danmark …', en: 'In my home country the elderly often live with their children, but in Denmark …' },
        ],
      },
      viewpoints: {
        hint: 'An easy pair: agree with "Ældre skal lære at bruge videoopkald og sociale medier" (it keeps them in touch with family far away), and disagree with "Familien har pligt til at besøge sine ældre jævnligt" (visits made out of duty rarely help, and not everyone lives nearby).',
        starters: [
          { da: 'Jeg er enig i synspunktet om, at ældre skal lære at bruge videoopkald, fordi …', en: 'I agree with the view that the elderly should learn to use video calls, because …' },
          { da: 'Derimod er jeg uenig i, at familien har pligt til at …', en: 'On the other hand, I disagree that the family has a duty to …' },
          { da: 'Forslaget om bofællesskaber, hvor unge og ældre bor sammen, synes jeg er godt, fordi …', en: 'I think the suggestion of shared housing where young and old live together is good, because …' },
        ],
      },
      for: {
        hint: 'Argue for the family\'s responsibility: the family knows the person best and can give a closeness that no municipality can replace; regular contact with children and grandchildren matters most.',
        starters: [
          { da: 'Spørgsmålet er, om det er familiens eller samfundets ansvar at forhindre ensomhed blandt ældre.', en: 'The question is whether it is the family\'s or society\'s responsibility to prevent loneliness among the elderly.' },
          { da: 'Det taler for familiens ansvar, at …', en: 'What speaks for the family\'s responsibility is that …' },
          { da: 'For det første kender familien den ældre bedst, og derfor …', en: 'Firstly, the family knows the elderly person best, and therefore …' },
        ],
      },
      against: {
        hint: 'Argue for society\'s responsibility: many elderly people have no family or relatives far away, working families have little time, and only the municipality can offer activities, meeting places and home visits to everyone.',
        starters: [
          { da: 'På den anden side har mange ældre slet ingen familie, og …', en: 'On the other hand, many elderly people have no family at all, and …' },
          { da: 'Desuden har mange familier travlt med arbejde og børn, så …', en: 'Besides, many families are busy with work and children, so …' },
          { da: 'Kun kommunen kan sørge for, at …', en: 'Only the municipality can make sure that …' },
        ],
      },
      opinion: {
        hint: 'Take a clear position, e.g. the responsibility is shared, but society must guarantee a safety net because the loneliest often have no family. Back it with one concrete example such as shared meals or a visiting service.',
        starters: [
          { da: 'Når jeg vejer argumenterne op imod hinanden, mener jeg, at ansvaret må deles, fordi …', en: 'When I weigh the arguments against each other, I believe the responsibility must be shared, because …' },
          { da: 'Efter min mening bør samfundet have hovedansvaret, da …', en: 'In my opinion society should have the main responsibility, since …' },
          { da: 'Et godt eksempel er kommunale spisefællesskaber, hvor …', en: 'A good example is municipal communal dining, where …' },
        ],
      },
      conclusion: {
        hint: 'Sum up in one or two sentences who carries the responsibility and why, perhaps linking back to the person from your experience paragraph.',
        starters: [
          { da: 'Samlet set mener jeg, at ensomhed blandt ældre er et fælles ansvar, fordi …', en: 'All things considered, I believe loneliness among the elderly is a shared responsibility, because …' },
          { da: 'Alt i alt er det efter min mening samfundets opgave at …', en: 'All in all, it is in my view society\'s task to …' },
          { da: 'Hvis vi ikke gør noget, vil flere ældre …', en: 'If we don\'t do anything, more elderly people will …' },
        ],
      },
    },
  },
  {
    id: 'wsim-d2b-2',
    type: 'd2b-list',
    title: 'Madspild',
    origin: 'simulated',
    intro:
      'Hvert år smider danske husholdninger, butikker og restauranter store mængder spiselig mad ud. Der er kommet mange forslag til, hvordan man kan mindske madspildet.',
    list: [
      'Supermarkeder skal give overskudsvarer gratis væk.',
      'Mærkningen "bedst før" skal afskaffes.',
      'Børn skal lære at lave mad af rester i skolen.',
      'Restauranter skal tilbyde mindre portioner til en lavere pris.',
      'Husholdninger skal betale efter, hvor meget madaffald de smider ud.',
      'Man skal planlægge ugens måltider, før man handler ind.',
    ],
    bullets: bullets(
      [
        'Fortæl kort om dine egne erfaringer med madspild i din hverdag.',
        'Briefly describe your own experience with food waste in everyday life.',
      ],
      [
        'Kommentér et eller to af forslagene fra listen.',
        'Comment on one or two of the suggestions in the box — name them, agree or disagree, and say why.',
      ],
      [
        'Vurdér, om det først og fremmest er forbrugernes eller butikkernes ansvar at mindske madspild.',
        'Evaluate whether reducing food waste is mainly the responsibility of consumers or of shops. Give reasons. This part should be about half the answer.',
      ],
    ),
    minWords: 200,
    slots: {
      intro: {
        hint: 'Introduce food waste in your own words: households, shops and restaurants throw out a lot of edible food, which costs money and harms the climate.',
        starters: [
          { da: 'Hvert år smider danskerne tonsvis af spiselig mad ud, og …', en: 'Every year Danes throw out tons of edible food, and …' },
          { da: 'Madspild er både dårligt for økonomien og for klimaet, og derfor …', en: 'Food waste is bad both for the economy and for the climate, and therefore …' },
          { da: 'Der er kommet mange forslag til, hvordan vi kan mindske madspildet, men …', en: 'Many suggestions have been made for how we can reduce food waste, but …' },
        ],
      },
      experience: {
        hint: 'Tell about food waste in your own everyday life: bread or vegetables you threw out because you bought too much, leftovers nobody ate, or a job in a shop or restaurant where food was binned at closing time.',
        starters: [
          { da: 'Hjemme hos os smider vi tit … ud, fordi …', en: 'At home we often throw out … because …' },
          { da: 'Da jeg arbejdede i et supermarked, så jeg, at …', en: 'When I worked in a supermarket, I saw that …' },
          { da: 'I mit hjemland smider man sjældent mad ud, fordi …', en: 'In my home country people rarely throw food out, because …' },
        ],
      },
      viewpoints: {
        hint: 'Agree with "Man skal planlægge ugens måltider, før man handler ind" (it saves both food and money, ideally with your own example), and be sceptical of the suggestion to abolish the "bedst før" label (it is useful; it is better to teach people that food is often fine after the date).',
        starters: [
          { da: 'Jeg er enig i forslaget om, at man skal planlægge ugens måltider, fordi …', en: 'I agree with the suggestion that one should plan the week\'s meals, because …' },
          { da: 'Til gengæld er jeg skeptisk over for at afskaffe mærkningen "bedst før", da …', en: 'On the other hand, I am sceptical about abolishing the "best before" label, since …' },
          { da: 'At supermarkeder skal give overskudsvarer gratis væk, lyder godt, men …', en: 'That supermarkets should give surplus goods away for free sounds good, but …' },
        ],
      },
      for: {
        hint: 'Argue that it is mainly the consumers\' responsibility: most food waste happens in private homes, and each of us decides what we buy, how we store it and whether we eat the leftovers.',
        starters: [
          { da: 'Spørgsmålet er, om det først og fremmest er forbrugernes eller butikkernes ansvar at mindske madspild.', en: 'The question is whether reducing food waste is mainly the responsibility of consumers or of shops.' },
          { da: 'Det taler for forbrugernes ansvar, at det er os selv, der …', en: 'What speaks for the consumers\' responsibility is that it is we ourselves who …' },
          { da: 'Hvis vi selv planlagde bedre, ville vi …', en: 'If we planned better ourselves, we would …' },
        ],
      },
      against: {
        hint: 'Argue for the shops: they tempt us with "tag tre, betal for to" offers and big packs, they throw out large amounts themselves, and they could sell food close to its date cheaply or donate it.',
        starters: [
          { da: 'På den anden side lokker butikkerne os med tilbud som "tag tre, betal for to", så …', en: 'On the other hand, shops tempt us with offers like "take three, pay for two", so …' },
          { da: 'Desuden smider supermarkederne selv store mængder ud, når …', en: 'Besides, supermarkets themselves throw out large amounts when …' },
          { da: 'Butikkerne kunne i stedet sælge varer med kort holdbarhed billigere, så …', en: 'Instead, shops could sell goods with a short shelf life more cheaply, so …' },
        ],
      },
      opinion: {
        hint: 'Choose one side, e.g. shops carry the most responsibility because they control offers and pack sizes, and consumers then follow. Support it with an example such as discount stickers or the app Too Good To Go.',
        starters: [
          { da: 'Når jeg vejer argumenterne op imod hinanden, hælder jeg mest til, at …', en: 'When I weigh the arguments against each other, I lean most towards …' },
          { da: 'Efter min mening har butikkerne det største ansvar, fordi …', en: 'In my opinion the shops have the greatest responsibility, because …' },
          { da: 'Et godt eksempel er appen Too Good To Go, hvor …', en: 'A good example is the app Too Good To Go, where …' },
        ],
      },
      conclusion: {
        hint: 'Sum up whose responsibility it mainly is in one or two sentences, and add what everyone can still do.',
        starters: [
          { da: 'Samlet set mener jeg, at madspild først og fremmest er … ansvar, men …', en: 'All things considered, I believe food waste is first and foremost …\'s responsibility, but …' },
          { da: 'Alt i alt kan vi alle gøre noget, men …', en: 'All in all, we can all do something, but …' },
          { da: 'Konklusionen er derfor, at …', en: 'The conclusion is therefore that …' },
        ],
      },
    },
  },
  {
    id: 'wsim-d2b-3',
    type: 'd2b-list',
    title: 'Et samfund uden kontanter',
    origin: 'simulated',
    intro:
      'Flere og flere danskere betaler med kort eller mobil, og nogle butikker tager slet ikke imod kontanter længere. Der er delte meninger om, hvorvidt det er en god udvikling.',
    list: [
      'Det er hurtigere og nemmere at betale med mobilen.',
      'Ældre og andre, der ikke er vant til teknologi, bliver holdt udenfor.',
      'Når alle betalinger er digitale, bliver det sværere at snyde med skat.',
      'Man mister overblikket over sit forbrug, når man ikke kan se pengene.',
      'Butikker skal have pligt til at tage imod kontanter.',
      'Et samfund uden kontanter er sårbart over for nedbrud og hackerangreb.',
    ],
    bullets: bullets(
      [
        'Fortæl kort om dine egne erfaringer med at betale med kontanter, kort og mobil.',
        'Briefly describe how you yourself pay for things: cash, card or phone.',
      ],
      [
        'Kommentér et eller to af synspunkterne fra listen.',
        'Comment on one or two of the viewpoints in the box — name them, agree or disagree, and say why.',
      ],
      [
        'Vurdér fordele og ulemper ved, at Danmark bliver et samfund helt uden kontanter.',
        'Evaluate the advantages and disadvantages of Denmark becoming a completely cashless society. Give reasons. This part should be about half the answer.',
      ],
    ),
    minWords: 200,
    slots: {
      intro: {
        hint: 'Introduce the topic: most Danes now pay by card or phone, and some shops no longer accept cash at all.',
        starters: [
          { da: 'I dag betaler de fleste danskere med kort eller MobilePay, og …', en: 'Today most Danes pay by card or MobilePay, and …' },
          { da: 'Flere butikker tager ikke længere imod kontanter, hvilket …', en: 'Several shops no longer accept cash, which …' },
          { da: 'Spørgsmålet om et samfund uden kontanter berører os alle, fordi …', en: 'The question of a cashless society affects us all, because …' },
        ],
      },
      experience: {
        hint: 'Describe how you yourself pay: card, phone or cash, and why. Add one situation where it mattered, e.g. a shop that refused cash, a payment that failed, or how it is in your home country.',
        starters: [
          { da: 'Selv betaler jeg næsten altid med …, fordi …', en: 'I myself almost always pay with …, because …' },
          { da: 'Jeg kan ikke huske, hvornår jeg sidst …', en: 'I can\'t remember when I last …' },
          { da: 'I mit hjemland betaler man stadig tit kontant, men i Danmark …', en: 'In my home country people still often pay cash, but in Denmark …' },
          { da: 'Engang oplevede jeg, at …', en: 'Once I experienced that …' },
        ],
      },
      viewpoints: {
        hint: 'Agree with "Ældre og andre, der ikke er vant til teknologi, bliver holdt udenfor" (e.g. an older relative without a smartphone), and partly disagree with "Man mister overblikket over sit forbrug, når man ikke kan se pengene" (a bank app actually shows every purchase).',
        starters: [
          { da: 'Jeg er enig i synspunktet om, at ældre bliver holdt udenfor, fordi …', en: 'I agree with the view that the elderly are left out, because …' },
          { da: 'Derimod er jeg ikke enig i, at man mister overblikket over sit forbrug, da …', en: 'On the other hand, I don\'t agree that you lose track of your spending, since …' },
          { da: 'På listen står der, at et samfund uden kontanter er sårbart over for nedbrud. Det er jeg enig i, fordi …', en: 'The list says that a cashless society is vulnerable to breakdowns. I agree, because …' },
        ],
      },
      for: {
        hint: 'Advantages: payments are faster and easier, there is less robbery and black money because digital payments can be traced (harder to cheat on tax), and shops save the cost of handling cash.',
        starters: [
          { da: 'Der er flere fordele ved et samfund uden kontanter. For det første …', en: 'There are several advantages to a cashless society. Firstly …' },
          { da: 'Det taler for udviklingen, at det bliver sværere at snyde med skat, når …', en: 'What speaks for this development is that it becomes harder to cheat on tax when …' },
          { da: 'Desuden slipper butikkerne for at …', en: 'Besides, shops don\'t have to …' },
        ],
      },
      against: {
        hint: 'Disadvantages: people without a smartphone or a bank account are left out, the system is vulnerable to power cuts, IT failures and hacker attacks, and every purchase can be tracked, which threatens privacy.',
        starters: [
          { da: 'Omvendt er der også alvorlige ulemper.', en: 'Conversely, there are also serious disadvantages.' },
          { da: 'Hvis betalingssystemet går ned, kan man ikke …', en: 'If the payment system goes down, you cannot …' },
          { da: 'Desuden kan bankerne se alt, hvad vi køber, og det …', en: 'Besides, the banks can see everything we buy, and that …' },
        ],
      },
      opinion: {
        hint: 'Give a clear position, e.g. going cashless is mostly positive, but cash should not disappear completely: shops should keep a duty to accept it, as a backup for the elderly and for emergencies.',
        starters: [
          { da: 'Når jeg vejer fordele og ulemper op imod hinanden, mener jeg, at …', en: 'When I weigh the advantages and disadvantages against each other, I believe that …' },
          { da: 'Efter min mening bør kontanterne ikke forsvinde helt, fordi …', en: 'In my opinion cash should not disappear completely, because …' },
          { da: 'Derfor synes jeg, at butikker fortsat skal have pligt til at …', en: 'That is why I think shops should still be obliged to …' },
        ],
      },
      conclusion: {
        hint: 'Sum up in one or two sentences whether the advantages or the disadvantages weigh most, and on what condition.',
        starters: [
          { da: 'Samlet set er et samfund uden kontanter efter min mening …, så længe …', en: 'All things considered, a cashless society is in my view …, as long as …' },
          { da: 'Alt i alt giver de digitale betalinger mange fordele, men …', en: 'All in all, digital payments bring many advantages, but …' },
        ],
      },
    },
  },
];

const p = (...paragraphs: string[]) => paragraphs.join('\n\n');

export const GRADED_D2B: GradedAnswer[] = [
  {
    id: 'wgr-d2b-1-12',
    taskId: 'wsim-d2b-1',
    band: '12',
    origin: 'illustrative',
    text: p(
      'Ensomhed blandt ældre er et problem, som mange først får øje på, når det rammer en, de holder af.',
      'Min egen farmor boede alene i en lille by i Polen, efter at min farfar var død. Hun klagede aldrig, men da jeg besøgte hende, fortalte hun, at der kunne gå flere dage, uden at hun talte med et andet menneske. Det gjorde stort indtryk på mig.',
      'Jeg er enig i synspunktet om, at ældre skal lære at bruge videoopkald. Da min farmor lærte at ringe til os på sin tablet, fik hun kontakt med sine børnebørn hver uge. Derimod er jeg uenig i, at familien har pligt til at besøge de ældre. Besøg, der sker af pligt, bliver sjældent gode, og mange familier bor langt væk.',
      'Spørgsmålet er, om det er familiens eller samfundets ansvar at forhindre ensomhed. På den ene side kender familien den ældre bedst og kan give en nærhed, som ingen kommune kan erstatte. På den anden side har mange ældre slet ingen familie, eller også bor familien i et andet land, ligesom i mit tilfælde. Hvis ansvaret alene lå hos familien, ville de mest ensomme blive overset.',
      'Efter min mening må ansvaret derfor deles. Familien bør holde kontakten, så godt den kan, mens kommunen skal sørge for mødesteder, hvor ældre kan være sammen med andre, for eksempel spisefællesskaber og motionshold. Samtidig kunne man med fordel bygge flere bofællesskaber, hvor unge og ældre bor side om side.',
      'Alt i alt mener jeg, at ensomhed ikke er et privat problem, men et fælles ansvar. Jo tidligere vi handler, desto færre ældre kommer til at sidde alene.',
    ),
    summary:
      'Top band: every bullet answered in proportion, two named viewpoints argued with an example, a balanced evaluation that reaches a clear position, and near-flawless, varied Danish.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The experience paragraph is short and concrete (the grandmother who could go "flere dage, uden at hun talte med et andet menneske"). Two viewpoints are named and taken a stand on — agree with videoopkald, disagree with pligt til at besøge — each with a reason. The evaluation (from "Spørgsmålet er" to the end) is about half the text, weighs both sides and ends in a reasoned position and a summary.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'One paragraph per bullet plus an opening and a conclusion. The evaluation is signposted with "På den ene side … På den anden side … Efter min mening … Alt i alt", and the personal story is reused as evidence ("ligesom i mit tilfælde"), which ties the parts together.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Varied, precise vocabulary (få øje på, nærhed, blive overset, med fordel, side om side), correct inversion after fronted elements ("Derimod er jeg", "Samtidig kunne man"), correct ikke-placement in subordinate clauses ("at ensomhed ikke er") and a hypothetical with past tense ("Hvis ansvaret alene lå …, ville …").',
      },
    ],
    annotations: [
      {
        quote: 'der kunne gå flere dage, uden at hun talte med et andet menneske',
        kind: 'good',
        note: 'One vivid, concrete detail does the job of the whole experience bullet — no need for a long life story.',
      },
      {
        quote: 'Jeg er enig i synspunktet om, at ældre skal lære at bruge videoopkald.',
        kind: 'good',
        note: 'Names the viewpoint from the box and takes a stand straight away; "enig i" is the correct preposition.',
      },
      {
        quote: 'Derimod er jeg uenig i',
        kind: 'good',
        note: 'Fronted "Derimod" correctly triggers inversion (verb before subject) and signals the contrast with the first viewpoint.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'På den ene side kender familien den ældre bedst',
        kind: 'good',
        note: 'Classic two-sided evaluation frame; inversion after the fronted adverbial is correct.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Hvis ansvaret alene lå hos familien, ville de mest ensomme blive overset.',
        kind: 'good',
        note: 'Hypothetical condition in the past tense followed by "ville" — an advanced structure used accurately; the main clause inverts because the hvis-clause fills the front slot.',
      },
      {
        quote: 'Efter min mening må ansvaret derfor deles.',
        kind: 'good',
        note: 'A clear own position, which the evaluation bullet asks for, rather than only listing pros and cons.',
      },
      {
        quote: 'Jo tidligere vi handler, desto færre ældre kommer til at sidde alene.',
        kind: 'good',
        note: '"Jo … desto …" gives the conclusion a memorable final sentence and shows range.',
      },
    ],
  },
  {
    id: 'wgr-d2b-1-7',
    taskId: 'wsim-d2b-1',
    band: '7',
    origin: 'illustrative',
    text: p(
      'Ensomhed blandt ældre',
      'I min familie har jeg en bedstefar, som bor alene i Aarhus. Han er 84 år og han kan ikke gå så godt længere. Jeg besøger ham en gang om måneden, men han siger tit at han keder sig og at han ikke har nogen at snakke med. Det er trist.',
      'Jeg er enig med synspunktet, at ældre skal lære at bruge videoopkald og sociale medier. Min bedstefar har fået en iPad og nu han kan se billeder af sine oldebørn. Men det er ikke det samme som at møde mennesker i virkeligheden. Jeg synes også, at kommunen skal tilbyde gratis aktiviteter, fordi mange ældre har ikke så mange penge.',
      'Er det familiens eller samfundets ansvar? Jeg synes, at familien har et stort ansvar, fordi de kender den ældre person bedst. Men mange mennesker har travlt med deres arbejde og børn, og de har ikke tid til at besøge deres forældre hver uge. Derfor synes jeg også, at samfundet skal hjælpe. Kommunen kan for eksempel lave et café for ældre, hvor de kan mødes og spille kort. Det er også en god idé med bofællesskaber, fordi det bor unge mennesker der, og så er de ældre ikke alene om aftenen.',
      'Til sidst vil jeg sige, at både familien og samfundet har ansvar, og at vi skal tænke mere på de ældre.',
    ),
    summary:
      'Solid middle band: all three bullets are there and the viewpoints are named, but the evaluation lists ideas rather than weighing them, "Jeg synes" carries the argument, and several word-order and preposition errors appear (none block understanding).',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Experience, viewpoints and evaluation are all answered, and two viewpoints are named (videoopkald, gratis aktiviteter). The evaluation is long enough and does consider both family and society, but it is thin: it lists ideas (a café, bofællesskaber) instead of weighing them, and the conclusion just repeats "både familien og samfundet" without saying how the responsibility should be shared. The second viewpoint gets a reason but no example.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Clear paragraphing that follows the bullets, and a short conclusion. Linking is repetitive — "Jeg synes" four times, many sentences starting with "Men" — and the evaluation opens with a bare question instead of a framing sentence.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Mostly correct, everyday vocabulary. Recurring errors: missing inversion ("nu han kan se"), ikke after the verb in subordinate clauses ("fordi mange ældre har ikke"), a wrong preposition ("enig med synspunktet") and a gender slip ("et café"). Commas before at-clauses are inconsistent.',
      },
    ],
    annotations: [
      {
        quote: 'Jeg er enig med synspunktet',
        kind: 'error',
        note: 'You agree with a person ("enig med Peter") but agree in a statement or viewpoint ("enig i").',
        fix: 'Jeg er enig i synspunktet',
      },
      {
        quote: 'nu han kan se',
        kind: 'error',
        note: '"nu" fills the front slot of the main clause, so the finite verb must come before the subject.',
        fix: 'nu kan han se',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'fordi mange ældre har ikke så mange penge',
        kind: 'error',
        note: 'In a subordinate clause (after fordi) "ikke" goes before the finite verb.',
        fix: 'fordi mange ældre ikke har så mange penge',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'et café',
        kind: 'error',
        note: '"café" is a common-gender (en) noun.',
        fix: 'en café',
      },
      {
        quote: 'fordi det bor unge mennesker der',
        kind: 'error',
        note: 'When a sentence only states that something exists or is somewhere, Danish uses "der" as the formal subject, not "det".',
        fix: 'fordi der bor unge mennesker',
      },
      {
        quote: 'Jeg synes, at familien har et stort ansvar',
        kind: 'style',
        note: 'The fourth "Jeg synes". Vary with "Efter min mening …", "Jeg mener, at …", "Det er oplagt, at …" — range of expression counts in the pragmatic criterion.',
      },
      {
        quote: 'Men mange mennesker har travlt med deres arbejde og børn',
        kind: 'good',
        note: 'A real counter-argument to the family position — this is what moves the evaluation beyond a one-sided opinion.',
      },
    ],
  },
  {
    id: 'wgr-d2b-1-4',
    taskId: 'wsim-d2b-1',
    band: '4',
    origin: 'illustrative',
    text: p(
      'Da jeg kom til Danmark i 2015, jeg boede i en lejlighed i Odense. Ved siden af mig boede en gammel dame som hed Inge. Hun var meget søde og hun hjalp mig med min dansk. Hver søndag hun inviterede mig til kaffe og kage, og vi snakkede om hendes liv. Hendes mand var død og hendes søn bor i Jylland og han kom næsten aldrig. Hun fortalte mig at hun var meget ensom især om vinter. Da jeg flyttede til København, jeg ringede til hende nogle gange, men så hun kom på plejehjem og jeg har ikke set hende mere. Jeg tænker meget på hende.',
      'Jeg synes, at nogle af synspunkterne er gode og nogle er ikke så gode. Det er rigtigt at ældre skal have noget at lave. Og det er vigtigt med familien.',
      'Jeg synes at det er familiens ansvar. Hvis man har en mor eller far, man skal besøge dem. Det er ikke kommunens job. Men kommunen kan også hjælpe lidt, fordi der er mange ældre som har ikke familie. I mit land det er normalt at de gamle bor sammen med deres børn, og så de er ikke ensom. Det er bedre end i Danmark synes jeg.',
      'Det var min mening om ensomhed.',
    ),
    summary:
      'Pass, just: a warm but over-long personal story eats half the answer, the viewpoints are discussed without saying which ones, the evaluation is short and one-sided, and word-order errors are frequent.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The experience bullet takes about half the text instead of "kort". The viewpoint paragraph never names a viewpoint ("nogle af synspunkterne er gode") — a reader cannot tell which ones are meant. The evaluation is roughly a quarter of the answer, takes one side and only briefly admits a counter-argument.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Paragraphs follow the bullets, but the text is chronological storytelling rather than argument. Linking is mostly "og" and "men", and the closing line "Det var min mening om ensomhed" announces an end rather than summing up.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Simple vocabulary. Inversion is missed after almost every fronted element ("Da jeg kom …, jeg boede", "Hver søndag hun inviterede", "I mit land det er"); adjective endings are shaky ("meget søde", "de er ikke ensom"); tense slips between past and present ("hendes søn bor").',
      },
    ],
    annotations: [
      {
        quote: 'Da jeg kom til Danmark i 2015, jeg boede',
        kind: 'error',
        note: 'A whole da-clause fills the front slot, so the main clause must start with the verb.',
        fix: 'Da jeg kom til Danmark i 2015, boede jeg',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Hun var meget søde',
        kind: 'error',
        note: 'Predicative adjective agrees with a singular common-gender subject: no -e.',
        fix: 'Hun var meget sød',
      },
      {
        quote: 'Hver søndag hun inviterede',
        kind: 'error',
        note: 'Fronted time expression → verb before subject.',
        fix: 'Hver søndag inviterede hun',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'om vinter',
        kind: 'error',
        note: 'Recurring seasons take the definite form: "om vinteren" (every winter).',
        fix: 'om vinteren',
      },
      {
        quote: 'Jeg synes, at nogle af synspunkterne er gode og nogle er ikke så gode.',
        kind: 'style',
        note: 'Too vague to count as commenting: say which viewpoint you mean, e.g. "Jeg er enig i, at familien har pligt til at besøge sine ældre, fordi …".',
      },
      {
        quote: 'som har ikke familie',
        kind: 'error',
        note: 'In a relative (som-)clause "ikke" goes before the finite verb.',
        fix: 'som ikke har nogen familie',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'I mit land det er normalt',
        kind: 'error',
        note: 'Fronted place adverbial → inversion.',
        fix: 'I mit land er det normalt',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'så de er ikke ensom',
        kind: 'error',
        note: 'Two errors: "så" (then) fills the front slot, so the verb comes before the subject; and a plural subject takes a plural adjective.',
        fix: 'så er de ikke ensomme',
      },
    ],
  },
  {
    id: 'wgr-d2b-1-02',
    taskId: 'wsim-d2b-1',
    band: '02',
    origin: 'illustrative',
    text: p(
      'Ensomhed er en stor problem i Danmark. Mange gamle mennesker sidder alene i deres hus hele dagen og der er ingen som kommer. Jeg kender det fordi min nabo er en gammel mand og han bor alene. Han hedder Poul og han er 87 år gammel og har en lille hund som hedder Max. Jeg ser ham hver dag når jeg går til arbejde, han sidder i vindue og kigger ud. Nogle gange jeg siger hej til ham og han er glad. Han har ikke børn og hans kone er død for mange år siden. Om sommer han sidder i haven men om vinter han er altid inde. Jeg tror han er meget ensom men jeg ved ikke det.',
      'I listen der står at kommunen skal lave aktiviteter for ældre og det er godt. Også de ældre skal lære at bruge computer og telefon, så de kan snakke med familien. Min mor har lærte at bruge Facebook og nu hun skriver til mig hver dag. Det er sjov. Men min far vil ikke lære det, han siger det er kun for unge mennesker. Jeg synes det er dumt fordi han kan ikke se billeder af sine børnebørn.',
      'Jeg mener at alle skal hjælpe de gamle mennesker. Det er vigtig.',
      'Tak for læsning.',
    ),
    summary:
      'Bare pass: about 200 words and understandable, but the evaluation that should be half the answer is two sentences with no reasons, and errors in word order, gender and endings run through every line.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Experience is covered at length (the neighbour Poul). The viewpoints are touched by paraphrase ("I listen der står …") with only "det er godt" as comment. The evaluation — the heaviest bullet — is "Jeg mener at alle skal hjælpe de gamle mennesker. Det er vigtig.": it never addresses family versus society and gives no reason.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Some paragraphing, but sentences are strung together with "og" and "men"; a comma splice joins two main clauses ("når jeg går til arbejde, han sidder"). "Tak for læsning" is a letter formula that does not fit an essay.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Basic vocabulary with frequent errors: ikke-placement ("fordi han kan ikke se"), gender and agreement ("en stor problem", "Det er vigtig", "Det er sjov"), missing inversion ("Nogle gange jeg siger", "Om sommer han sidder", "nu hun skriver"), wrong past participle ("har lærte"), missing definite forms ("i vindue", "om vinter"). The meaning still comes through.',
      },
    ],
    annotations: [
      {
        quote: 'en stor problem',
        kind: 'error',
        note: '"problem" is a neuter (et) noun, and the adjective agrees: stort.',
        fix: 'et stort problem',
      },
      {
        quote: 'Nogle gange jeg siger',
        kind: 'error',
        note: 'Fronted adverbial → verb before subject.',
        fix: 'Nogle gange siger jeg',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Om sommer han sidder',
        kind: 'error',
        note: 'Two problems: recurring season needs the definite form, and the fronted adverbial needs inversion.',
        fix: 'Om sommeren sidder han',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'jeg ved ikke det',
        kind: 'error',
        note: 'An unstressed pronoun object moves in front of "ikke" in a main clause with a simple verb.',
        fix: 'jeg ved det ikke',
      },
      {
        quote: 'I listen der står',
        kind: 'error',
        note: 'Things are written "på listen", and the fronted adverbial needs inversion with "der" as formal subject.',
        fix: 'På listen står der',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'har lærte',
        kind: 'error',
        note: 'After "har" use the past participle, not the past tense.',
        fix: 'har lært',
      },
      {
        quote: 'Jeg mener at alle skal hjælpe de gamle mennesker. Det er vigtig.',
        kind: 'style',
        note: 'This is the whole evaluation. The task asks family or society, about half the text, with reasons — e.g. one paragraph for each side and a conclusion. Also: "vigtigt" (neuter, agrees with "det").',
      },
      {
        quote: 'Tak for læsning.',
        kind: 'style',
        note: 'An essay ends with a summary of your view, not a thank-you. Try "Alt i alt mener jeg, at …".',
      },
    ],
  },
];
