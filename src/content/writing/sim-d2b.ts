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
    tips: [
      {
        title: 'Family or society: name the main one',
        text: '"Vurdér, om det er familiens eller samfundets ansvar" is an either/or question. You may say the responsibility is shared, but then say who carries the main part and what each side does, e.g. "Familien skal holde kontakten, men kommunen skal sikre et sikkerhedsnet."',
      },
      {
        title: 'The box gives you both sides',
        text: 'Most statements are society solutions (gratis aktiviteter, bofællesskaber, unge på plejehjem), and one is a family duty (pligt til at besøge). Comment on one of each in bullet 2, and you already have arguments for both sides of the evaluation.',
      },
      {
        title: 'No family nearby? Use your neighbourhood',
        text: 'The experience bullet also allows "dit nærområde": a neighbour, an elderly colleague or someone in your building works just as well. If old people in your home country live with their children, that comparison is a strong argument later.',
      },
      {
        title: 'Living alone is not the same as being lonely',
        text: 'One sentence that separates "at bo alene" from "at føle sig ensom" shows nuance: many elderly people live alone happily, while others feel lonely even in a care home.',
      },
      {
        title: '"Ældre" never changes',
        text: 'Used as a noun it is always "ældre": "de ældre", "en ældre dame", "mange ældre". The only extra form is the genitive "de ældres behov".',
      },
    ],
    words: [
      { da: 'ensomhed blandt ældre', en: 'loneliness among the elderly' },
      { da: 'at føle sig ensom', en: 'to feel lonely' },
      { da: 'et plejehjem (plejehjem)', en: 'a care home (care homes)' },
      { da: 'et bofællesskab', en: 'a shared housing community' },
      { da: 'et spisefællesskab', en: 'a communal dining group' },
      { da: 'en besøgsven', en: 'a volunteer visitor' },
      { da: 'de pårørende', en: 'the relatives (of an elderly or ill person)' },
      { da: 'et netværk', en: 'a (social) network' },
      { da: 'et sikkerhedsnet', en: 'a safety net' },
      { da: 'at holde kontakten med nogen', en: 'to keep in touch with someone' },
      { da: 'at forebygge ensomhed', en: 'to prevent loneliness' },
      { da: 'at have pligt til at …', en: 'to have a duty to …' },
      { da: 'at tage ansvar for …', en: 'to take responsibility for …' },
      { da: 'at blive overset', en: 'to be overlooked' },
    ],
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
    tips: [
      {
        title: '"Først og fremmest" means choose',
        text: 'The evaluation asks who is mainly responsible, consumers or shops. Ending with only "begge har et ansvar" dodges the question; write "Begge kan gøre noget, men først og fremmest …" and give the reason.',
      },
      {
        title: 'These are suggestions, not opinions',
        text: 'The bullet says "Kommentér et eller to af forslagene", so judge them as proposals: would it work, who pays, what could go wrong? For example, paying per kilo of food waste could make some people throw rubbish in the wrong bin.',
      },
      {
        title: '"Bedst før" is not "sidste anvendelsesdato"',
        text: '"Bedst før" means the food is usually fine after the date; "sidste anvendelsesdato" (meat, fish) is about safety. Knowing the difference makes a comment on the label suggestion precise.',
      },
      {
        title: 'Leave restaurants and schools out of the evaluation',
        text: 'The box mentions restaurants and schools, but the evaluation is only about consumers versus shops. Use those suggestions in bullet 2, and keep the evaluation on the two parties it names.',
      },
      {
        title: '"I din hverdag": habits plus one example',
        text: 'For the experience you can use the present tense for habits ("Hver uge smider vi …") and add one past example ("Sidste weekend måtte jeg smide …").',
      },
    ],
    words: [
      { da: 'et madspild', en: 'food waste (the wasting)' },
      { da: 'et madaffald', en: 'food waste (the rubbish)' },
      { da: 'en husholdning (husholdninger)', en: 'a household (households)' },
      { da: 'en forbruger (forbrugere)', en: 'a consumer (consumers)' },
      { da: 'en overskudsvare (overskudsvarer)', en: 'a surplus product' },
      { da: 'rester (en rest)', en: 'leftovers' },
      { da: 'en holdbarhedsdato', en: 'an expiry date' },
      { da: 'en mærkning', en: 'a label, labelling' },
      { da: 'et tilbud', en: 'a special offer' },
      { da: 'spiselig', en: 'edible' },
      { da: 'at smide mad ud', en: 'to throw food away' },
      { da: 'at gå til spilde', en: 'to go to waste' },
      { da: 'at handle ind', en: 'to do the shopping' },
      { da: 'at sætte prisen ned', en: 'to reduce the price' },
      { da: 'at opbevare maden rigtigt', en: 'to store the food properly' },
    ],
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
    tips: [
      {
        title: 'Here pros and cons really are asked',
        text: 'Unlike "Vurdér, om …", this bullet asks "Vurdér fordele og ulemper", so weigh both sides. You still need a position at the end: which side weighs more for you, and why.',
      },
      {
        title: 'Cash, card and phone',
        text: 'The experience bullet names three ways to pay. Mention at least two and why you use them, e.g. "Jeg betaler med MobilePay, men har altid en 200-kroneseddel i pungen."',
      },
      {
        title: '"Helt uden kontanter" is the key',
        text: 'The evaluation is not about whether card payment is nice, but about cash disappearing completely. The strongest arguments are about what happens then: people without a smartphone, power cuts and IT failures, and privacy.',
      },
      {
        title: 'Don\'t argue the same statement twice',
        text: 'The tax and hacker statements in the box are ready-made pro and con arguments. If you comment on one in bullet 2, refer back to it in the evaluation ("Som nævnt …") and add something new instead of repeating it.',
      },
      {
        title: '"Kontanter" is plural',
        text: '"Kontanter" only exists in the plural ("kontanterne forsvinder"), and "at betale kontant" is the adverb. There is no "et kontant".',
      },
    ],
    words: [
      { da: 'kontanter (pl.)', en: 'cash' },
      { da: 'at betale kontant', en: 'to pay cash' },
      { da: 'et betalingskort', en: 'a payment card' },
      { da: 'en pengeseddel (pengesedler)', en: 'a banknote (banknotes)' },
      { da: 'en mønt (mønter)', en: 'a coin (coins)' },
      { da: 'en hæveautomat', en: 'a cash machine, ATM' },
      { da: 'et nedbrud', en: 'a breakdown, an outage' },
      { da: 'et hackerangreb', en: 'a cyber attack' },
      { da: 'en strømafbrydelse', en: 'a power cut' },
      { da: 'sort arbejde', en: 'undeclared work, cash-in-hand work' },
      { da: 'at snyde med skat', en: 'to cheat on tax' },
      { da: 'at spore en betaling', en: 'to trace a payment' },
      { da: 'at bevare overblikket over sit forbrug', en: 'to keep track of your spending' },
      { da: 'at blive holdt udenfor', en: 'to be left out' },
      { da: 'sårbar over for', en: 'vulnerable to' },
    ],
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
  {
    id: 'wgr-d2b-2-12',
    taskId: 'wsim-d2b-2',
    band: '12',
    origin: 'illustrative',
    text: p(
      'Madspild er et problem, som alle kender, men som få tænker over i supermarkedet.',
      'Hjemme hos os gik det især ud over brødet. Vi købte et stort rugbrød hver lørdag, men det blev ofte muggent, før vi nåede at spise det hele. Nu fryser vi det ned i skiver, så intet går til spilde.',
      'Jeg er enig i forslaget om, at man skal planlægge ugens måltider, før man handler ind. Det sparer både mad og penge, fordi man kun køber det, man faktisk skal bruge. Til gengæld er jeg skeptisk over for at afskaffe mærkningen "bedst før". Det er bedre at lære folk, at mange varer sagtens kan spises efter datoen.',
      'Spørgsmålet er, om det først og fremmest er forbrugernes eller butikkernes ansvar at mindske madspild. Det taler for forbrugerne, at meget af spildet sker i private hjem. Det er os selv, der bestemmer, hvad vi køber, hvordan vi opbevarer det, og om vi spiser resterne. På den anden side lokker butikkerne os med tilbud som "tag tre, betal for to". Desuden kasserer supermarkederne selv store mængder varer, der stadig er spiselige.',
      'Når jeg vejer argumenterne op imod hinanden, mener jeg, at butikkerne har det største ansvar. De bestemmer, hvad der bliver tilbudt og i hvilke mængder, og forbrugerne følger efter. Når en butik sætter prisen ned på varer med kort holdbarhed, bliver det nemt for kunderne at gøre det rigtige.',
      'Alt i alt kan vi alle gøre noget, men det er først og fremmest butikkerne, der skal gå forrest.',
    ),
    summary:
      'Top band: a short, concrete experience, two suggestions judged with reasons, and an evaluation of about half the text that weighs consumers against shops and picks a side, in precise, natural Danish.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The experience is brief and concrete (the rye bread that "blev ofte muggent"). Two suggestions are named and judged: agree with planning the week\'s meals, sceptical of abolishing "bedst før", each with a reason. The evaluation, from "Spørgsmålet er" to the end, is about half the text, gives arguments for both consumers and shops and answers the either/or question: "butikkerne har det største ansvar".',
      },
      {
        criterion: 'pragmatic',
        comment:
          'One paragraph per bullet, framed by an opening and a one-line conclusion. The evaluation is signposted ("Det taler for …", "På den anden side …", "Desuden …", "Når jeg vejer argumenterne op imod hinanden …") and ends by restating the position in new words ("skal gå forrest").',
      },
      {
        criterion: 'linguistic',
        comment:
          'Precise topic vocabulary (går til spilde, kasserer, kort holdbarhed, spiselige) and idioms ("gik det især ud over", "gå forrest"). Word order is correct throughout, including inversion after fronted elements ("Nu skærer vi", "Til gengæld er jeg") and adverbs before the verb in subordinate clauses ("fordi man kun køber").',
      },
    ],
    annotations: [
      {
        quote: 'Hjemme hos os gik det især ud over brødet.',
        kind: 'good',
        note: '"gå ud over" (to affect, to suffer) is idiomatic, and the fronted place adverbial correctly triggers inversion ("gik det").',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Til gengæld er jeg skeptisk over for at afskaffe mærkningen "bedst før".',
        kind: 'good',
        note: 'Names the second suggestion and takes a nuanced stand; "skeptisk over for" is the right preposition.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'fordi man kun køber det, man faktisk skal bruge',
        kind: 'good',
        note: 'In a subordinate clause, sentence adverbs like "kun" go before the finite verb, exactly as "ikke" does.',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Det er os selv, der bestemmer, hvad vi køber, hvordan vi opbevarer det, og om vi spiser resterne.',
        kind: 'good',
        note: 'A cleft sentence ("Det er os selv, der …") followed by three parallel questions: a compact, varied way to build the consumer argument.',
      },
      {
        quote: 'Desuden kasserer supermarkederne selv store mængder varer, der stadig er spiselige.',
        kind: 'good',
        note: 'The counter-argument uses a precise verb ("kassere") and a correct relative clause with "der" as subject.',
        ruleId: 'relative-clause',
      },
      {
        quote: 'mener jeg, at butikkerne har det største ansvar',
        kind: 'good',
        note: 'The evaluation asks "først og fremmest" consumers or shops, and this answers it with a clear choice instead of "both".',
      },
    ],
  },
  {
    id: 'wgr-d2b-2-7',
    taskId: 'wsim-d2b-2',
    band: '7',
    origin: 'illustrative',
    text: p(
      'Madspild er et stort problem i dag, både for økonomien og for miljøet.',
      'I min familie vi smider tit mad ud. Vi er fire personer, og vi handler meget ind om lørdagen, fordi der er gode tilbud. Men om torsdagen er der altid grøntsager i køleskabet, som er blevet dårlige, og dem smider vi ud. Især salat og peberfrugter bliver hurtigt dårlige. Det er ærgerligt, fordi det koster mange penge.',
      'Jeg synes, at forslaget om at planlægge ugens måltider er et god idé. Hvis man laver en madplan, man køber kun det, man skal bruge. Vi har prøvet det i min familie i en måned, og det gør sense. Jeg synes også, at supermarkeder skal give overskudsvarer gratis væk, fordi mange mennesker har ikke så mange penge til mad.',
      'Er det forbrugernes eller butikkernes ansvar? Jeg synes, at det mest er forbrugernes ansvar, fordi det er os, der køber maden og smider den ud. Men butikkerne har også et ansvar. De har mange tilbud, og så man køber for meget. De smider også mange forskellig varer ud hver dag. Derfor synes jeg, at butikkerne skal sælge varer billigere, når datoen er tæt på.',
      'Til sidst vil jeg sige, at forbrugerne har det største ansvar, men butikkerne skal også hjælpe.',
    ),
    summary:
      'Solid middle band: all bullets answered and a side is chosen, but the evaluation is thinner and less developed than the rest, "Jeg synes" carries most sentences, and word-order and ending errors recur without blocking understanding.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The experience (vegetables that go off by Thursday) is concrete. Two suggestions are named (madplan, overskudsvarer gratis væk) with a reason each. The evaluation is under 40 % of the text: it gives one argument for each side and chooses consumers, but the shop argument ("De har mange tilbud") is not developed, and the closing proposal about cheaper goods is not linked to the choice.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Paragraphs follow the bullets and the conclusion restates the position. Linking is repetitive ("Jeg synes" five times, "Men", "så"), and the evaluation opens with a bare question instead of a framing sentence such as "Spørgsmålet er, om …".',
      },
      {
        criterion: 'linguistic',
        comment:
          'Everyday vocabulary used correctly most of the time. Recurring errors: missing inversion ("I min familie vi smider", "Hvis man laver en madplan, man køber", "og så man køber"), "ikke" after the verb in a fordi-clause, en/et and an ending ("et god idé", "mange forskellig varer"), and an anglicism ("det gør sense").',
      },
    ],
    annotations: [
      {
        quote: 'I min familie vi smider tit mad ud.',
        kind: 'error',
        note: 'The fronted place adverbial "I min familie" takes the first slot, so the finite verb must come before the subject.',
        fix: 'I min familie smider vi tit mad ud.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'et god idé',
        kind: 'error',
        note: '"idé" is a common-gender (en) noun, so the article is "en" and the adjective has no -t.',
        fix: 'en god idé',
      },
      {
        quote: 'Hvis man laver en madplan, man køber',
        kind: 'error',
        note: 'A whole hvis-clause fills the front slot, so the main clause starts with the verb.',
        fix: 'Hvis man laver en madplan, køber man',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'det gør sense',
        kind: 'error',
        note: 'Anglicism from "it makes sense". Danish says "det giver mening".',
        fix: 'det giver mening',
      },
      {
        quote: 'fordi mange mennesker har ikke så mange penge',
        kind: 'error',
        note: 'In a subordinate clause (after fordi) "ikke" goes before the finite verb.',
        fix: 'fordi mange mennesker ikke har så mange penge',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'og så man køber for meget',
        kind: 'error',
        note: '"så" (then) here is an adverb in the front slot of the second main clause, so the verb comes before the subject.',
        fix: 'og så køber man for meget',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'mange forskellig varer',
        kind: 'error',
        note: 'Adjectives before a plural noun take -e.',
        fix: 'mange forskellige varer',
      },
      {
        quote: 'Men butikkerne har også et ansvar.',
        kind: 'good',
        note: 'Turning to the other side is what makes this an evaluation rather than a one-sided opinion; it now needs a second sentence of argument.',
      },
    ],
  },
  {
    id: 'wgr-d2b-2-4',
    taskId: 'wsim-d2b-2',
    band: '4',
    origin: 'illustrative',
    text: p(
      'Jeg arbejder i en bager i Vejle. Hver aften vi smider mange brød og kager ud, fordi vi kan ikke sælge dem næste dag. Mine kollegere tager nogle gange noget med hjem, men det meste kommer i skraldespanden, selvom brødet er stadig godt. Min kone siger, at jeg skal tage mere med hjem, men det er pinligt for mig. Første gang jeg så det, jeg blev meget overrasket, fordi i mit land man smider ikke mad ud. Min mor lavede altid ny mad af resterne, og vi spiste det hele.',
      'På listen der er mange forslag. Jeg synes, at børn skal lære at lave mad af rester i skolen, fordi det er en god ting at kunne. Mange unge ved ikke, hvordan man laver mad, de køber bare pizza. Og restauranter skal have mindre portioner, fordi portionerne i Danmark er meget stor. Jeg kan ikke spise det hele, og så det bliver spild.',
      'Jeg tror, det er forbrugernes ansvar. Det er os som køber maden, og det er os som smider den ud. Hvis alle er mere forsigtig, når man handler, er problemet løst. Butikkerne kan ikke gøre så meget.',
      'Så madspild er dårligt for alle, og vi skal stoppe det.',
    ),
    summary:
      'Pass: the shop experience is vivid and two suggestions are commented, but the evaluation is short, one-sided and even contradicts the writer\'s own bakery story; errors in word order, plurals and endings are frequent.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The experience bullet is answered with a good example (bread thrown out at the bakery), though it is long. Two suggestions are commented with simple reasons. The evaluation is only about a fifth of the text and one-sided: it says "Butikkerne kan ikke gøre så meget" without arguing it, although the writer\'s own bakery throws out bread every night, which would have been the obvious counter-argument.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Paragraphs follow the bullets, but the text is mainly description and loose opinion. Sentences are short and joined with "og" and "fordi", and the last line ("Så madspild er dårligt for alle") is a general statement rather than an answer to the evaluation question.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Simple vocabulary. Inversion is missed after almost every fronted element ("Hver aften vi smider", "Første gang jeg så det, jeg blev", "På listen der er"), "ikke" is misplaced in subordinate clauses, and there are plural and ending errors ("kollegere", "meget stor", "mere forsigtig").',
      },
    ],
    annotations: [
      {
        quote: 'i en bager',
        kind: 'error',
        note: '"en bager" is the person (baker); the shop is "et bageri", or you work "hos en bager".',
        fix: 'i et bageri',
      },
      {
        quote: 'Hver aften vi smider',
        kind: 'error',
        note: 'Fronted time expression, so the verb comes before the subject.',
        fix: 'Hver aften smider vi',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Mine kollegere',
        kind: 'error',
        note: 'The plural of "en kollega" is "kolleger" (or "kollegaer"), never "kollegere".',
        fix: 'Mine kolleger',
      },
      {
        quote: 'Første gang jeg så det, jeg blev',
        kind: 'error',
        note: 'The whole clause "Første gang jeg så det" is in the front slot, so the main clause must start with the verb.',
        fix: 'Første gang jeg så det, blev jeg',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'fordi i mit land man smider ikke mad ud',
        kind: 'error',
        note: 'A fordi-clause keeps normal subordinate word order: subject first, then "ikke" before the verb. Move the place adverbial to the end.',
        fix: 'fordi man ikke smider mad ud i mit land',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'portionerne i Danmark er meget stor',
        kind: 'error',
        note: 'A predicative adjective agrees with a plural subject: -e.',
        fix: 'portionerne i Danmark er meget store',
      },
      {
        quote: 'Butikkerne kan ikke gøre så meget.',
        kind: 'style',
        note: 'This is the whole case against shops, and your own bakery story contradicts it. Use it: "På den anden side smider butikker som den, jeg arbejder i, store mængder brød ud hver aften."',
      },
    ],
  },
  {
    id: 'wgr-d2b-2-02',
    taskId: 'wsim-d2b-2',
    band: '02',
    origin: 'illustrative',
    text: p(
      'Madspild er en stor problem for verden. Jeg kender det godt fordi jeg har tre børn og de spiser ikke alt maden. Hver dag jeg laver aftensmad og der er altid mad tilbage på tallerkenen. Min yngste søn han kan ikke lide grøntsager så han lader dem ligge. Jeg prøvede at give ham mindre men han spiser stadigvæk ikke det. Så jeg smider det ud i skraldespand. Min mand siger at jeg skal købe mindre, men børnene er altid sulten efter skole og så jeg køber meget. Nogle gange jeg giver det til vores hund, hun er glad haha. Også i køleskab der er tit mælk og yoghurt som er for gammel og så det skal ud.',
      'I listen står at man skal betale for madaffald. Det er ikke god idé fordi mange familie har ikke mange penge og det bliver for dyrt for dem. Hvis man skal betale så man smider det i naturen i stedet og det er også dårligt. Også bedst før skal ikke afskaffes, for så ved man ikke hvornår maden er gammel og man bliver syg af det.',
      'Jeg synes butikker og forbrugere skal gøre noget begge to. Det er vigtig.',
      'Mange hilsner',
    ),
    summary:
      'Bare pass: about 200 understandable words with a real family example and two suggestions touched, but the evaluation is two sentences with no reasons and no choice, and word-order, gender and agreement errors run through the text.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Experience is covered at length (the children\'s leftovers, old milk). Two suggestions are commented (betale for madaffald, "bedst før") with simple reasons. The evaluation, which should be half the answer, is "Jeg synes butikker og forbrugere skal gøre noget begge to. Det er vigtig.": it does not choose between consumers and shops and gives no argument.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Some paragraphing, but long chains with "og" and "så", and a chatty "haha" that does not belong in an essay. "Mange hilsner" is a letter ending; an essay should close with a summary of the writer\'s view.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Basic vocabulary with frequent errors: gender and agreement ("en stor problem", "Det er vigtig", "mange familie"), missing inversion ("Hver dag jeg laver", "Nogle gange jeg giver", "så man smider"), "ikke" misplaced ("fordi mange familie har ikke") and missing definite forms ("i skraldespand", "i køleskab"). The meaning still comes through.',
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
        quote: 'Hver dag jeg laver aftensmad',
        kind: 'error',
        note: 'Fronted time expression, so the verb comes before the subject.',
        fix: 'Hver dag laver jeg aftensmad',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Min yngste søn han kan ikke',
        kind: 'error',
        note: 'Danish does not repeat the subject with a pronoun. One subject is enough.',
        fix: 'Min yngste søn kan ikke',
        ruleId: 'forfelt-single',
      },
      {
        quote: 'Nogle gange jeg giver',
        kind: 'error',
        note: 'Fronted adverbial, so the verb comes before the subject.',
        fix: 'Nogle gange giver jeg',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'fordi mange familie har ikke mange penge',
        kind: 'error',
        note: 'Two errors: the plural of "familie" is "familier", and in a fordi-clause "ikke" goes before the verb.',
        fix: 'fordi mange familier ikke har mange penge',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'så man smider det i naturen',
        kind: 'error',
        note: 'After a fronted hvis-clause, "så" takes the front slot and the verb must follow it directly.',
        fix: 'så smider man det i naturen',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Jeg synes butikker og forbrugere skal gøre noget begge to. Det er vigtig.',
        kind: 'style',
        note: 'This is the whole evaluation. The task asks who is mainly responsible, with reasons, in about half the text. Also: "vigtigt" (neuter, agrees with "det").',
      },
      {
        quote: 'Mange hilsner',
        kind: 'style',
        note: 'An essay is not a letter. End with your view: "Alt i alt mener jeg, at …".',
      },
    ],
  },
  {
    id: 'wgr-d2b-3-12',
    taskId: 'wsim-d2b-3',
    band: '12',
    origin: 'illustrative',
    text: p(
      'For tyve år siden betalte de fleste danskere kontant i supermarkedet. I dag er det blevet en sjældenhed, og nogle butikker tager slet ikke imod sedler og mønter længere.',
      'Selv betaler jeg næsten altid med MobilePay eller mit betalingskort, fordi det er hurtigt. Alligevel har jeg altid en 200-kroneseddel i pungen. Sidste vinter gik betalingssystemet ned i et supermarked, hvor jeg stod i kø, og kun de kunder, der havde kontanter, kunne betale.',
      'Jeg er enig i synspunktet om, at ældre og andre, der ikke er vant til teknologi, bliver holdt udenfor. Min nabo på 83 har hverken smartphone eller netbank. Derimod er jeg ikke enig i, at man mister overblikket over sit forbrug. Banken viser jo hvert køb, så overblikket er snarere blevet bedre.',
      'Der er flere fordele ved et samfund helt uden kontanter. Betalinger går hurtigere, butikkerne slipper for at tælle og transportere penge, og der bliver færre røverier. Desuden bliver det sværere at snyde med skat, når alle betalinger kan spores. Omvendt er der alvorlige ulemper. Hvis strømmen forsvinder, eller et hackerangreb lammer bankerne, kan ingen købe mad eller medicin. Samtidig kan bankerne se alt, hvad vi køber, og det er et indgreb i privatlivet.',
      'Når jeg vejer fordele og ulemper op imod hinanden, mener jeg, at udviklingen overvejende er positiv, men at kontanterne ikke bør forsvinde helt. De er en nødvendig reserve i en krise og en livline for dem, der står uden for den digitale verden.',
      'Samlet set er færre kontanter en gevinst, så længe butikkerne fortsat har pligt til at tage imod dem.',
    ),
    summary:
      'Top band: the experience covers both cash and digital payment with a telling incident, two statements are argued, and the evaluation weighs advantages against disadvantages of going completely cashless before reaching a clear, conditional position.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The experience names card, phone and cash and gives one concrete incident (the supermarket outage). Two statements are named and taken a stand on, one agreed with and one rejected with a counter-argument ("Banken viser jo hvert køb"). The evaluation, from "Der er flere fordele" to the end, is about half the text, weighs three advantages against three disadvantages and ends in a clear position with a condition.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'One paragraph per bullet plus an opening and a conclusion. The evaluation is clearly signposted ("Der er flere fordele …", "Desuden …", "Omvendt …", "Samtidig …", "Når jeg vejer …"), and the outage story from the experience paragraph quietly supports the later argument about crises.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Varied and precise vocabulary (en sjældenhed, lammer, et indgreb i privatlivet, en livline, overvejende). Correct inversion after fronted elements ("Selv betaler jeg", "Alligevel har jeg", "Omvendt er der") and correct placement of "ikke" in subordinate clauses ("at kontanterne ikke bør forsvinde").',
      },
    ],
    annotations: [
      {
        quote: 'Selv betaler jeg næsten altid med MobilePay eller mit betalingskort',
        kind: 'good',
        note: 'Fronting "Selv" gives emphasis, and inversion follows correctly. Naming two ways to pay answers the "kontanter, kort og mobil" bullet.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'kun de kunder, der havde kontanter, kunne betale',
        kind: 'good',
        note: 'One concrete detail that the evaluation can later build on, with a correctly embedded relative clause.',
        ruleId: 'relative-clause',
      },
      {
        quote: 'Derimod er jeg ikke enig i, at man mister overblikket over sit forbrug.',
        kind: 'good',
        note: 'Disagreeing with one statement and giving a counter-argument shows that "kommentér" is more than repeating the box.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Omvendt er der alvorlige ulemper.',
        kind: 'good',
        note: 'A short signpost sentence that turns the evaluation from advantages to disadvantages, as the bullet asks.',
      },
      {
        quote: 'Hvis strømmen forsvinder, eller et hackerangreb lammer bankerne, kan ingen købe mad eller medicin.',
        kind: 'good',
        note: 'Two conditions share one hvis, and the main clause inverts because the whole hvis-clause fills the front slot.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'at kontanterne ikke bør forsvinde helt',
        kind: 'good',
        note: 'In the at-clause "ikke" correctly comes before the finite verb "bør".',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'så længe butikkerne fortsat har pligt til at tage imod dem',
        kind: 'good',
        note: 'Ending with a condition makes the position precise, and it links back to a statement in the box.',
      },
    ],
  },
  {
    id: 'wgr-d2b-3-7',
    taskId: 'wsim-d2b-3',
    band: '7',
    origin: 'illustrative',
    text: p(
      'I dag betaler næsten alle danskere med kort eller mobil, og mange butikker vil ikke have kontanter.',
      'Jeg betaler altid med MobilePay eller mit kort. Jeg kan ikke huske, hvornår jeg sidst havde kontanter i min pung. I Rumænien, hvor jeg kommer fra, er det anderledes. Der betaler mange mennesker stadig kontant, især på landet. Da jeg besøgte min familie sidste sommer, jeg måtte hæve penge i en automat, fordi mange små butikker tager ikke kort.',
      'Jeg er enig i, at ældre bliver holdt udenfor. Min svigermor er 79 år, og hun har ikke en smartphone. Hun synes, at det er svært at betale i butikkerne, og hun føler dum, når hun står ved kassen. Jeg er også enig i, at et samfund uden kontanter er sårbart, fordi hvis der kommer en nedbrud, så kan man ikke betale for noget.',
      'Der er fordele og ulemper ved et samfund uden kontanter. En fordel er, at det er hurtigt og nemt at betale. En anden fordel er, at det er sværere at snyde med skat, fordi alle betalinger er digitale. Men der er også ulemper. Mange ældre kan ikke bruge teknologien, og hvis der kommer et hackerangreb, har vi et stort problem. Jeg synes, at det er godt med mobilbetaling, men jeg synes ikke, at kontanterne skal forsvinde helt.',
      'Til sidst vil jeg sige, at det er vigtigt at tænke på alle mennesker i samfundet.',
    ),
    summary:
      'Solid middle band: every bullet is answered and both advantages and disadvantages appear, but the evaluation lists rather than weighs, repeats points from the comments, and a handful of word-order and gender errors appear.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The experience compares Denmark with Romania and covers card, phone and cash. Two statements are named and agreed with, with an example for the first (the mother-in-law). The evaluation is under 40 % of the text: it lists two advantages and two disadvantages ("En fordel er … En anden fordel er …"), partly repeating the comment paragraph, and the position in its last sentence gets no reason.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Clear paragraphs that follow the bullets. The connectors are repetitive ("Jeg er enig i" twice, "Jeg synes" three times, "En fordel … En anden fordel"), and the conclusion ("det er vigtigt at tænke på alle mennesker") is vaguer than the position just before it.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Generally correct, everyday Danish with some good structures ("I Rumænien, hvor jeg kommer fra, er det anderledes"). Errors: missing inversion after a da-clause, "ikke" after the verb in a fordi-clause, a missing reflexive ("hun føler dum") and a gender slip ("en nedbrud"). None block understanding.',
      },
    ],
    annotations: [
      {
        quote: 'I Rumænien, hvor jeg kommer fra, er det anderledes.',
        kind: 'good',
        note: 'Correct inversion after a fronted place adverbial with an inserted relative clause.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Da jeg besøgte min familie sidste sommer, jeg måtte',
        kind: 'error',
        note: 'A whole da-clause fills the front slot, so the main clause must start with the verb.',
        fix: 'Da jeg besøgte min familie sidste sommer, måtte jeg',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'fordi mange små butikker tager ikke kort',
        kind: 'error',
        note: 'In a subordinate clause (after fordi) "ikke" goes before the finite verb.',
        fix: 'fordi mange små butikker ikke tager kort',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'hun føler dum',
        kind: 'error',
        note: '"føle" needs the reflexive pronoun when it describes how you feel: "føle sig".',
        fix: 'hun føler sig dum',
      },
      {
        quote: 'en nedbrud',
        kind: 'error',
        note: '"nedbrud" is a neuter (et) noun.',
        fix: 'et nedbrud',
      },
      {
        quote: 'En anden fordel er',
        kind: 'style',
        note: 'Listing "En fordel … En anden fordel …" works, but it reads like a list. Vary it and add a reason or consequence: "Desuden bliver det sværere at snyde med skat, fordi …".',
      },
      {
        quote: 'men jeg synes ikke, at kontanterne skal forsvinde helt',
        kind: 'good',
        note: 'A real position on "helt uden kontanter", which the evaluation needs. Add one "fordi …" and it becomes an argument.',
      },
    ],
  },
  {
    id: 'wgr-d2b-3-4',
    taskId: 'wsim-d2b-3',
    band: '4',
    origin: 'illustrative',
    text: p(
      'Jeg betaler altid med min mobil. Det er meget nemt, og jeg behøver ikke at have en pung med. I mit land jeg brugte altid kontanter, men da jeg kom til Danmark i 2019, jeg fik en bankkonto og MobilePay. Nu jeg har ikke kontanter mere. En gang var jeg på et marked i Roskilde, og en mand sælgede honning, men han tog kun kontanter. Jeg kunne ikke købe noget, og det var irriterende.',
      'På listen står der, at det er hurtigere at betale med mobilen. Det er rigtigt, jeg er enig. Det tager kun to sekunder, og man skal ikke tælle mønter. Også butikker skal ikke have pligt til at tage imod kontanter, fordi det er deres egen valg, hvordan kunderne betaler.',
      'Der er mange fordele ved et samfund uden kontanter. Det er hurtigt, man skal ikke vente i køen, og man taber ikke pengene på gaden. Folk kan ikke snyde med skat, og der er ikke så mange tyve, fordi der er ingen penge at stjæle. Også butikkerne sparer tid, fordi de skal ikke tælle penge om aftenen. Ulempen er måske de gamle mennesker, men de kan lære det.',
      'Derfor jeg synes, at Danmark skal være helt uden kontanter. Det er fremtiden.',
    ),
    summary:
      'Pass: the experience is concrete and a position is taken, but the evaluation covers advantages only and dismisses the disadvantages in half a sentence, the comments are thin, and word-order errors are frequent.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The experience is clear (the honey seller at the market who only took cash). Two statements are commented, but the first gets only "Det er rigtigt, jeg er enig" with no reason. The bullet asks for "fordele og ulemper", yet the evaluation lists only advantages and waves away the disadvantages with "Ulempen er måske de gamle mennesker, men de kan lære det"; outages and privacy are never considered, even though the writer\'s own market story points to one.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Paragraphs follow the bullets, and the conclusion states a clear view. The text is mostly short statements joined with "og" and "fordi", with little development, and "Det er fremtiden" is a slogan rather than a reason.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Simple, mostly clear vocabulary. Inversion is missed after most fronted elements ("I mit land jeg brugte", "Nu jeg har ikke", "Derfor jeg synes"), "ikke"/"ingen" are misplaced in fordi-clauses, and there are form errors ("sælgede", "deres egen valg").',
      },
    ],
    annotations: [
      {
        quote: 'I mit land jeg brugte altid kontanter',
        kind: 'error',
        note: 'Fronted place adverbial, so the verb comes before the subject.',
        fix: 'I mit land brugte jeg altid kontanter',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Nu jeg har ikke kontanter mere',
        kind: 'error',
        note: '"Nu" fills the front slot, so the finite verb comes next, then the subject, then "ikke".',
        fix: 'Nu har jeg ikke kontanter mere',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'sælgede',
        kind: 'error',
        note: '"sælge" is irregular: sælger, solgte, har solgt.',
        fix: 'solgte',
      },
      {
        quote: 'deres egen valg',
        kind: 'error',
        note: '"valg" is a neuter (et) noun, so the possessive takes the neuter form "eget".',
        fix: 'deres eget valg',
      },
      {
        quote: 'fordi der er ingen penge at stjæle',
        kind: 'error',
        note: 'In a subordinate clause, "ingen" is split into "ikke … nogen" with "ikke" before the verb.',
        fix: 'fordi der ikke er nogen penge at stjæle',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Ulempen er måske de gamle mennesker, men de kan lære det.',
        kind: 'style',
        note: 'The bullet asks for advantages AND disadvantages. One sentence that dismisses the only disadvantage is not a weighing; add outages, hacker attacks or privacy, and your own market story.',
      },
      {
        quote: 'Derfor jeg synes',
        kind: 'error',
        note: '"Derfor" takes the front slot, so the verb must come before the subject.',
        fix: 'Derfor synes jeg',
        ruleId: 'v2-inversion',
      },
    ],
  },
  {
    id: 'wgr-d2b-3-02',
    taskId: 'wsim-d2b-3',
    band: '02',
    origin: 'illustrative',
    text: p(
      'Jeg vil skrive om kontanter. I Danmark man bruger ikke meget kontanter mere, alle har mobilepay. Jeg har også mobilepay og kort fra banken. Jeg betaler altid med mobilen, også når jeg køber en lille is til mine børn. Men min mor i Irak hun bruger kun kontanter, hun har ikke bankkort fordi hun stoler ikke på banker. Når hun kommer og besøger mig i Danmark, det er svært for hende. Sidste gang vi var i en café og hun ville betale for kaffe, men de sagde nej, kun kort. Hun var meget ked af og vi gik hjem. Det var en dårlig dag. Jeg følte mig skam.',
      'I listen der står at ældre bliver holdt udenfor og det er rigtig. Min mor er ikke så gammel, hun er 61 år men hun kan ikke bruge en smartphone. Mange gamle mennesker er også sådan. De skal lære det men det er svært for dem fordi de ikke vokset op med teknologi. Også der står at det er hurtigere med mobilen, det er rigtig, jeg bruger kun et sekund når jeg betaler.',
      'Jeg synes kontanter er godt og dårligt. Vi skal have begge to.',
      'Tak for at læse.',
    ),
    summary:
      'Bare pass: about 200 words with a touching café story and two statements touched, but the evaluation of advantages and disadvantages is two sentences without a single argument, and errors in word order, verb forms and idiom run through the text.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Experience is covered (the mother from Iraq refused in a café), though the writer\'s own payment habits get only two short sentences before it turns to her story. Two statements are commented with simple reasons. The evaluation, which should be half the answer, is "Jeg synes kontanter er godt og dårligt. Vi skal have begge to.": no advantage or disadvantage is actually named or weighed.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Some paragraphing, but the opening ("Jeg vil skrive om kontanter") announces the topic instead of introducing it, sentences are chained with "og", "men" and commas, and "Tak for at læse" is a translated English closing that does not belong in an essay.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Basic vocabulary with frequent errors: missing inversion ("I Danmark man bruger", "Når hun kommer …, det er", "I listen der står"), "ikke" after the verb in a fordi-clause, a missing auxiliary ("de ikke vokset op"), incomplete idioms ("ked af", "Jeg følte mig skam") and agreement ("det er rigtig"). The meaning is still clear.',
      },
    ],
    annotations: [
      {
        quote: 'I Danmark man bruger ikke',
        kind: 'error',
        note: 'Fronted place adverbial, so the verb comes before the subject.',
        fix: 'I Danmark bruger man ikke',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'fordi hun stoler ikke på banker',
        kind: 'error',
        note: 'In a fordi-clause "ikke" goes before the finite verb.',
        fix: 'fordi hun ikke stoler på banker',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Når hun kommer og besøger mig i Danmark, det er',
        kind: 'error',
        note: 'The når-clause fills the front slot, so the main clause starts with the verb.',
        fix: 'Når hun kommer og besøger mig i Danmark, er det',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Hun var meget ked af og',
        kind: 'error',
        note: 'The fixed expression is "ked af det" (upset); "ked af" alone needs an object.',
        fix: 'Hun var meget ked af det, og',
      },
      {
        quote: 'Jeg følte mig skam.',
        kind: 'error',
        note: '"skam" is a noun. Use the verb "at skamme sig", or "jeg følte skam".',
        fix: 'Jeg skammede mig.',
      },
      {
        quote: 'fordi de ikke vokset op',
        kind: 'error',
        note: 'The perfect tense needs its auxiliary: "vokse op" takes "er" (de er vokset op).',
        fix: 'fordi de ikke er vokset op',
      },
      {
        quote: 'Jeg synes kontanter er godt og dårligt. Vi skal have begge to.',
        kind: 'style',
        note: 'This is the whole evaluation. Name at least two advantages (fast, harder to cheat on tax) and two disadvantages (people like your mother left out, outages), then say which weigh more.',
      },
      {
        quote: 'Tak for at læse.',
        kind: 'style',
        note: 'A translation of "Thanks for reading". An essay ends with your conclusion: "Alt i alt mener jeg, at …".',
      },
    ],
  },
];
