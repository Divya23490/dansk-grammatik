import type { GradedAnswer, PracticeTask, TaskBullet } from './types';

/**
 * Original Delprøve 1 practice tasks (written for the app, not taken from a
 * past paper) and an illustrative grade ladder for the first one.
 */

const THANKS: TaskBullet = {
  key: 'thanks',
  danish: 'Tak for mailen.',
  english: 'Thank your friend for the mail.',
};

const UNDERLINED: TaskBullet = {
  key: 'underlined',
  danish: 'Kom ind på de understregede dele i mailen.',
  english: 'Answer every underlined part of the mail.',
};

export const SIM_TASKS_D1: PracticeTask[] = [
  {
    id: 'wsim-d1-1',
    type: 'd1-email',
    title: 'Far skal måske flytte ind',
    origin: 'simulated',
    intro:
      'Du har fået en mail fra din danske ven Lars. Hans mor døde sidste år, og hans far på 79 år bor nu alene i et stort hus i Ringkøbing. Lars og hans kone Hanne overvejer, om faren skal flytte ind hos dem i Odense. En del af mailen står nedenfor.',
    mail: {
      from: 'Lars',
      paragraphs: [
        '… Tak for sidst! Det var dejligt at se dig til min fødselsdag. Du fortalte, at du lige var begyndt i dit nye job på et plejehjem. Hvordan går det med det nye job?',
        'Jeg har tænkt meget på min far. Siden mor døde, har han boet alene i huset i Ringkøbing, og han virker ensom. Han kører ikke længere bil om aftenen, og jeg kan kun besøge ham hver anden weekend. Nu har Hanne foreslået, at vi bygger vores garage om til en lille lejlighed, så far kan flytte ind hos os. Hvad synes du – er det en god idé?',
        'Jeg er også lidt bekymret for børnene. Emma er 14, og Oskar er 11. De er glade for deres farfar, men de er vant til at have huset for sig selv. Hvordan tror du, de vil have det med at bo sammen med ham hver dag?',
        'Far siger selv, at han ikke vil være en byrde for nogen, så vi skal i hvert fald tale grundigt med ham først. Nå, jeg må hellere slutte for i dag. Skriv snart! …',
      ],
      underlined: [
        'Hvordan går det med det nye job?',
        'Hvad synes du – er det en god idé?',
        'Hvordan tror du, de vil have det med at bo sammen med ham hver dag?',
      ],
    },
    bullets: [
      THANKS,
      UNDERLINED,
      {
        key: 'proposal',
        danish: 'Foreslå, at I mødes for at tale mere om det.',
        english: 'Suggest that you meet to talk more about it.',
      },
    ],
    slots: {
      greeting: {
        hint: 'Greet Lars by name and thank him for the mail. He thanks you for coming to his birthday, so you can say you enjoyed the party too.',
        starters: [
          { da: 'Kære Lars', en: 'Dear Lars' },
          { da: 'Tak for din mail, og tak for en dejlig fødselsdag.', en: 'Thanks for your mail, and thanks for a lovely birthday.' },
          { da: 'Det var rigtig hyggeligt at se dig og Hanne til festen, og …', en: 'It was really nice to see you and Hanne at the party, and …' },
        ],
      },
      smalltalk: {
        hint: 'Answer "Hvordan går det med det nye job?": tell Lars about your new job at the care home, e.g. how long you have been there, your colleagues and the residents, and one thing that is hard or nice.',
        starters: [
          { da: 'Du spørger, hvordan det går med mit nye job på plejehjemmet. Jeg har nu været der i …', en: "You ask how my new job at the care home is going. I've now been there for …" },
          { da: 'På plejehjemmet har jeg søde kolleger, og beboerne …', en: 'At the care home I have nice colleagues, and the residents …' },
          { da: 'Selvom vagterne kan være hårde, synes jeg …', en: 'Even though the shifts can be hard, I think …' },
        ],
      },
      'dilemma-1': {
        hint: 'Answer "Hvad synes du – er det en god idé?": should his father move into the converted garage in Odense? Give your view with a reason, e.g. he would be less lonely but needs his own entrance and kitchen, or he could try it for a month first.',
        starters: [
          { da: 'Med hensyn til din far synes jeg, at det er en god idé, hvis …', en: "As for your father, I think it's a good idea if …" },
          { da: 'Hvis I bygger garagen om, får han …', en: 'If you convert the garage, he gets …' },
          { da: 'Det vigtigste er efter min mening, at han selv …', en: 'In my opinion the most important thing is that he himself …' },
          { da: 'Måske kunne han prøve at bo hos jer i en måned, før …', en: 'Perhaps he could try living with you for a month before …' },
        ],
      },
      'dilemma-2': {
        hint: 'Answer "Hvordan tror du, de vil have det med at bo sammen med ham hver dag?": say how Emma (14) and Oskar (11) will feel living with their grandfather, e.g. he can help with homework, but Emma as a teenager needs her own space.',
        starters: [
          { da: 'Hvad angår Emma og Oskar, tror jeg, at de …', en: 'As for Emma and Oskar, I think they …' },
          { da: 'Til gengæld kan det blive svært for Emma, fordi hun …', en: 'On the other hand it could be hard for Emma, because she …' },
          { da: 'Hvis I aftaler nogle klare regler fra starten, vil børnene …', en: 'If you agree on some clear rules from the start, the children will …' },
        ],
      },
      proposal: {
        hint: 'Suggest meeting to talk more about his father moving in, with a day or a place, e.g. you could come to Odense on Saturday afternoon.',
        starters: [
          { da: 'Skal vi ikke mødes en dag i næste uge og snakke mere om det?', en: "Shouldn't we meet one day next week and talk more about it?" },
          { da: 'Jeg kan komme forbi på lørdag eftermiddag, hvis det passer jer.', en: 'I can drop by on Saturday afternoon, if that suits you.' },
          { da: 'Hvad siger du til, at vi tager en kop kaffe sammen og …', en: 'How about having a coffee together and …' },
        ],
      },
      closing: {
        hint: 'Wish Lars and his father well and send greetings to Hanne and the children, then a sign-off such as "Mange hilsner" and your first name.',
        starters: [
          { da: 'Hils Hanne og børnene – og din far!', en: 'Say hi to Hanne and the kids – and your father!' },
          { da: 'Jeg håber, I finder en god løsning.', en: 'I hope you find a good solution.' },
          { da: 'Mange hilsner', en: 'Best wishes' },
        ],
      },
    },
  },
  {
    id: 'wsim-d1-2',
    type: 'd1-email',
    title: 'Bil eller ladcykel',
    origin: 'simulated',
    intro:
      'Du har fået en mail fra din danske ven Jonas. Han bor i København med sin kone Line og deres to børn på 3 og 6 år. Familiens gamle bil er gået i stykker, og nu overvejer de, om de skal købe en ny bil eller klare sig med en ladcykel. En del af mailen står nedenfor.',
    mail: {
      from: 'Jonas',
      paragraphs: [
        '… Tusind tak for de flotte billeder fra jeres efterårsferie! Det så ud til, at I havde fantastisk vejr. Hvor var I henne, og hvad lavede I?',
        'Som du måske ved, gik vores gamle bil i stykker i sidste uge, og mekanikeren siger, at det ikke kan betale sig at reparere den. Line vil gerne købe en ladcykel i stedet for en ny bil. Den koster omkring 25.000 kr., og hun mener, at vi både kan spare penge og få mere motion. Jeg er ikke helt overbevist – især ikke om vinteren, når det regner og blæser. Synes du, vi kan klare os uden bil?',
        'Det store problem er weekenderne. Vi besøger tit mine forældre, der bor på landet uden for Svendborg, og der kører kun en bus et par gange om dagen. Har du en idé til, hvordan vi kan løse det?',
        'Børnene synes i øvrigt, at det lyder sjovt at køre i ladcykel, så de er slet ikke i tvivl. …',
      ],
      underlined: [
        'Hvor var I henne, og hvad lavede I?',
        'Synes du, vi kan klare os uden bil?',
        'Har du en idé til, hvordan vi kan løse det?',
      ],
    },
    bullets: [
      THANKS,
      UNDERLINED,
      {
        key: 'proposal',
        danish: 'Foreslå, at I mødes og snakker mere om det.',
        english: 'Suggest that you meet and talk more about it.',
      },
    ],
    slots: {
      greeting: {
        hint: 'Greet Jonas by name and thank him for the mail. He liked your holiday photos, and you can say you are sorry to hear about the car.',
        starters: [
          { da: 'Hej Jonas', en: 'Hi Jonas' },
          { da: 'Tak for din mail. Hvor er jeg glad for, at du kunne lide billederne!', en: "Thanks for your mail. I'm so glad you liked the photos!" },
          { da: 'Hvor ærgerligt, at jeres bil er gået i stykker!', en: 'What a shame your car has broken down!' },
        ],
      },
      smalltalk: {
        hint: 'Answer "Hvor var I henne, og hvad lavede I?": say where you went in the autumn break and two or three things you did there, in the past tense.',
        starters: [
          { da: 'I efterårsferien var vi i …, og vi …', en: 'In the autumn break we were in …, and we …' },
          { da: 'Den første dag tog vi …', en: 'On the first day we took …' },
          { da: 'Det bedste ved turen var, at …', en: 'The best thing about the trip was that …' },
        ],
      },
      'dilemma-1': {
        hint: 'Answer "Synes du, vi kan klare os uden bil?": give your view on a cargo bike (about 25,000 kr.) instead of a new car in Copenhagen: it saves money and gives exercise, but rain and wind in winter with two small children are a real problem.',
        starters: [
          { da: 'Med hensyn til ladcyklen synes jeg, at Line har ret, fordi …', en: 'As for the cargo bike, I think Line is right, because …' },
          { da: 'I København kan man sagtens klare sig uden bil, men om vinteren …', en: 'In Copenhagen you can easily manage without a car, but in winter …' },
          { da: 'Jeg forstår godt, at du er i tvivl, især når det regner og blæser.', en: "I understand that you're unsure, especially when it rains and blows." },
          { da: 'Hvis I køber en ladcykel, sparer I …', en: 'If you buy a cargo bike, you save …' },
        ],
      },
      'dilemma-2': {
        hint: 'Answer "Har du en idé til, hvordan vi kan løse det?": suggest how they can visit his parents outside Svendborg at weekends without a car, e.g. renting a car or using a car-sharing scheme, or taking the train and being picked up at the station.',
        starters: [
          { da: 'Til weekendturene kunne I måske leje en bil eller bruge en delebil.', en: 'For the weekend trips you could perhaps rent a car or use a shared car.' },
          { da: 'Hvis I tager toget til Svendborg, kan dine forældre måske …', en: 'If you take the train to Svendborg, your parents could perhaps …' },
          { da: 'En anden løsning kunne være at …', en: 'Another solution could be to …' },
        ],
      },
      proposal: {
        hint: 'Suggest meeting to talk more about the car and the cargo bike, e.g. test-riding a cargo bike together on Saturday or coffee at your place.',
        starters: [
          { da: 'Skal vi ikke mødes og snakke mere om det?', en: "Shouldn't we meet and talk more about it?" },
          { da: 'Hvad siger du til, at vi prøvekører en ladcykel sammen på lørdag?', en: 'How about test-riding a cargo bike together on Saturday?' },
          { da: 'Du er velkommen til at komme forbi til en kop kaffe, så kan vi …', en: "You're welcome to drop by for coffee, then we can …" },
        ],
      },
      closing: {
        hint: 'Send greetings to Line and the children and wish them luck with the decision, then a sign-off and your first name.',
        starters: [
          { da: 'Hils Line og børnene!', en: 'Say hi to Line and the kids!' },
          { da: 'Held og lykke med beslutningen.', en: 'Good luck with the decision.' },
          { da: 'Kærlig hilsen', en: 'Love / Warm regards' },
        ],
      },
    },
  },
  {
    id: 'wsim-d1-3',
    type: 'd1-email',
    title: 'Familiens bageri',
    origin: 'simulated',
    intro:
      'Du har fået en mail fra din danske ven Sara. Hendes forældre har haft et bageri i Horsens i over 30 år, og nu vil de gå på pension. De har spurgt Sara, om hun vil overtage bageriet. Sara arbejder i dag som sygeplejerske. En del af mailen står nedenfor.',
    mail: {
      from: 'Sara',
      paragraphs: [
        '… Tak for sidst – det var så hyggeligt at gå en tur med dig i skoven. Du nævnte, at du snart skal op til danskprøven. Hvordan forbereder du dig, og er du nervøs?',
        'Jeg har en stor beslutning foran mig. Mine forældre vil gå på pension til sommer, og de håber, at jeg vil overtage bageriet. Jeg elsker at bage, og jeg er vokset op i butikken, men jeg har aldrig drevet en virksomhed. Desuden skal en bager stå op klokken fire hver morgen, og det er hårdt med to små børn. Synes du, jeg skal sige ja?',
        'Hvis jeg siger nej, bliver bageriet sandsynligvis solgt til en kæde, og det vil gøre min far meget ked af det. Hvordan skal jeg fortælle ham det, hvis jeg vælger at fortsætte som sygeplejerske?',
        'Og så et lille spørgsmål til sidst: Kender du en god opskrift på et brød, som børn kan lide? Jeg har lovet at bage til min datters klassefest. …',
      ],
      underlined: [
        'Hvordan forbereder du dig, og er du nervøs?',
        'Synes du, jeg skal sige ja?',
        'Hvordan skal jeg fortælle ham det, hvis jeg vælger at fortsætte som sygeplejerske?',
        'Kender du en god opskrift på et brød, som børn kan lide?',
      ],
    },
    bullets: [
      THANKS,
      UNDERLINED,
      {
        key: 'proposal',
        danish: 'Foreslå, at I mødes en dag og taler mere om det.',
        english: 'Suggest that you meet one day and talk more about it.',
      },
    ],
    slots: {
      greeting: {
        hint: 'Greet Sara by name and thank her for the mail and for the walk in the woods ("Tak for sidst").',
        starters: [
          { da: 'Kære Sara', en: 'Dear Sara' },
          { da: 'Tak for din mail og tak for en dejlig tur i skoven.', en: 'Thanks for your mail and for a lovely walk in the woods.' },
          { da: 'Det var rigtig hyggeligt at gå tur med dig, og …', en: 'It was really nice to go for a walk with you, and …' },
        ],
      },
      smalltalk: {
        hint: 'Answer "Hvordan forbereder du dig, og er du nervøs?": say how you are preparing for the Danish exam (e.g. writing practice mails, reading the news) and how nervous you are.',
        starters: [
          { da: 'Du spørger, hvordan jeg forbereder mig til danskprøven.', en: "You ask how I'm preparing for the Danish exam." },
          { da: 'Hver aften skriver jeg …', en: 'Every evening I write …' },
          { da: 'Jeg er lidt nervøs, især for …', en: "I'm a bit nervous, especially about …" },
        ],
      },
      'dilemma-1': {
        hint: 'Answer "Synes du, jeg skal sige ja?": should Sara take over the bakery in Horsens? She loves baking and grew up in the shop, but she has never run a business and must get up at four with two small children. You could suggest hiring a baker.',
        starters: [
          { da: 'Med hensyn til bageriet synes jeg, at du skal …', en: 'As for the bakery, I think you should …' },
          { da: 'På den ene side elsker du at bage, men på den anden side …', en: 'On the one hand you love baking, but on the other hand …' },
          { da: 'Hvis du siger ja, kunne du måske ansætte en bager, så du ikke selv …', en: "If you say yes, you could perhaps hire a baker so you don't have to …" },
        ],
      },
      'dilemma-2': {
        hint: 'Answer "Hvordan skal jeg fortælle ham det, hvis jeg vælger at fortsætte som sygeplejerske?": advise how to tell her father gently, e.g. thank him, explain her reasons, and offer to help find a good buyer.',
        starters: [
          { da: 'Hvis du vælger at sige nej, synes jeg, du skal fortælle din far …', en: 'If you choose to say no, I think you should tell your father …' },
          { da: 'Det er vigtigt, at han forstår, at …', en: "It's important that he understands that …" },
          { da: 'Måske bliver han mindre ked af det, hvis …', en: 'Perhaps he will be less upset if …' },
        ],
      },
      proposal: {
        hint: 'Answer the fourth underlined question, "Kender du en god opskrift på et brød, som børn kan lide?", together with the proposal: offer a recipe (e.g. boller) and suggest meeting one day to bake and talk more about the bakery.',
        starters: [
          { da: 'Jeg kender faktisk en god opskrift på boller, som alle børn elsker.', en: 'I actually know a good recipe for buns that all children love.' },
          { da: 'Skal vi ikke mødes en dag og bage sammen? Så kan vi også snakke om …', en: "Shouldn't we meet one day and bake together? Then we can also talk about …" },
          { da: 'Hvad siger du til, at jeg kommer forbi på søndag med opskriften?', en: 'How about I come by on Sunday with the recipe?' },
        ],
      },
      closing: {
        hint: 'Wish Sara luck with the decision and the class party, then a warm sign-off and your first name.',
        starters: [
          { da: 'Held og lykke med beslutningen – og med klassefesten!', en: 'Good luck with the decision – and with the class party!' },
          { da: 'Knus', en: 'Hugs' },
          { da: 'Kærlig hilsen', en: 'Love / Warm regards' },
        ],
      },
    },
  },
];

export const GRADED_D1: GradedAnswer[] = [
  {
    id: 'wgr-d1-1-12',
    taskId: 'wsim-d1-1',
    band: '12',
    origin: 'illustrative',
    text: `Kære Lars

Tak for din mail, og tak for en rigtig hyggelig fødselsdag. Det var dejligt at se hele familien igen.

Du spørger, hvordan det går med mit nye job. Jeg har nu været på plejehjemmet i seks uger, og jeg er rigtig glad for det. Mine kolleger har taget godt imod mig, og selvom vagterne kan være hårde, får jeg meget igen fra beboerne. Faktisk minder flere af dem mig om din far.

Det er derfor, jeg godt forstår, at du er bekymret. Jeg synes, det er en god idé at bygge garagen om, men kun hvis din far selv har lyst. Det er vigtigt, at han får sin egen indgang og sit eget køkken, så han kan bevare sin frihed. Han skal også have mulighed for at holde kontakten med sine venner i Ringkøbing. Måske kunne han prøve at bo hos jer en måned, før I bestemmer jer endeligt?

Hvad angår Emma og Oskar, tror jeg faktisk, at det kan blive en gave for dem. De kender jo deres farfar godt, og han kan hjælpe med lektier eller hente Oskar fra fodbold. Til gengæld bør I aftale nogle klare regler fra starten, så børnene ikke føler, at de mister deres privatliv. Hvis I taler åbent om det som familie, tror jeg, at det nok skal gå.

Skal vi ikke mødes en dag i næste uge og snakke mere om det? Jeg kan komme forbi lørdag eftermiddag, hvis det passer jer.

Mange hilsner
Amira`,
    summary:
      'Every underlined question answered and developed with reasons and a concrete idea, in a warm, natural register with near-flawless language.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'All three bullets are covered: thanks in the first line, a closing proposal with a concrete day ("lørdag eftermiddag"), and each underlined question gets its own paragraph. The answers are developed, not just stated: the dilemma gets a condition ("men kun hvis din far selv har lyst"), practical points (own entrance and kitchen) and a fresh idea — a one-month trial.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'One paragraph per question, each opened with a signpost ("Du spørger, hvordan…", "Hvad angår Emma og Oskar…"), so the reader can tick off his questions. Linking is varied — "selvom", "derfor", "til gengæld", "hvis" — and the bridge "Faktisk minder flere af dem mig om din far" ties the small talk to the main topic. The tone is warm and personal, exactly right for a friend.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Word order is secure throughout: inversion after fronted clauses ("selvom vagterne kan være hårde, får jeg") and "ikke" before the verb in subordinate clauses ("så børnene ikke føler"). Vocabulary is precise and idiomatic ("tage godt imod", "bevare sin frihed", "bestemme sig endeligt"). Agreement is correct ("sin egen indgang", "sit eget køkken"). Only one cleft sentence reads slightly translated.',
      },
    ],
    annotations: [
      {
        quote: 'Du spørger, hvordan det går med mit nye job.',
        kind: 'good',
        note: 'Repeating the question as a signpost shows the examiner straight away which underlined part is being answered.',
      },
      {
        quote: 'selvom vagterne kan være hårde, får jeg meget igen fra beboerne',
        kind: 'good',
        note: 'The subordinate clause fills the front slot, so the main clause inverts: "får jeg", not "jeg får".',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Det er derfor, jeg godt forstår, at du er bekymret.',
        kind: 'style',
        note: 'Correct, but the cleft "Det er derfor, …" echoes English "That is why…". A plain fronted adverb is tighter and more Danish.',
        fix: 'Derfor forstår jeg godt, at du er bekymret.',
      },
      {
        quote: 'sin egen indgang og sit eget køkken',
        kind: 'good',
        note: 'Reflexive possessive and agreement both right: "en indgang" → "sin egen", "et køkken" → "sit eget".',
      },
      {
        quote: 'Måske kunne han prøve at bo hos jer en måned, før I bestemmer jer endeligt?',
        kind: 'good',
        note: 'Adds a concrete solution of the writer\'s own — this is what "uddyb" (develop) means. Note the inversion after "Måske".',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Hvad angår Emma og Oskar',
        kind: 'good',
        note: 'A neat transition phrase to move to the next underlined question.',
      },
      {
        quote: 'så børnene ikke føler',
        kind: 'good',
        note: 'In a subordinate clause "ikke" comes before the finite verb.',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Skal vi ikke mødes en dag i næste uge og snakke mere om det?',
        kind: 'good',
        note: 'The proposal is friendly and specific, and the next sentence even offers a time.',
      },
    ],
  },
  {
    id: 'wgr-d1-1-7',
    taskId: 'wsim-d1-1',
    band: '7',
    origin: 'illustrative',
    text: `Hej Lars

Tak for din mail. Det var en rigtig god fest på din fødselsdag.

Mit nye job går godt. Jeg arbejder på et plejehjem i Vejle, og jeg har mange søde kolleger. Arbejdet er nogle gange hårdt, men jeg kan godt lide det. I næste måned jeg skal på et kursus om demens.

Om din far synes jeg, det er en god idé, at han flytter ind hos jer. Det er ikke godt for en gammel mand at bo alene i et stort hus. Hvis han bor hos jer, kan I hjælpe ham, og han er ikke ensom mere. Men det er vigtig, at han har sin egen lejlighed med et køkken og en badeværelse. Så kan han være alene, når han vil.

Jeg tror også, at børnene bliver glade. De kan godt lide deres farfar, og han kan hjælpe dem med lektier. Men det er måske svært for Emma, at hun kan ikke have huset for sig selv, fordi hun er teenager. I skal snakke med børnene, før I beslutter noget.

Skal vi mødes og snakke mere om det? Du kan komme til mig på søndag, så bager jeg en kage.

Kærlige hilsner
Amira`,
    summary:
      'All questions answered with a clear opinion, but the points are thinner and a handful of word-order and agreement slips show.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'All bullets are there, and every underlined question gets an answer with at least one reason ("Det er ikke godt for en gammel mand at bo alene"). The development stays general, though: the job paragraph lists facts, and the children paragraph only half-explores Emma\'s side before ending with generic advice ("I skal snakke med børnene").',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Paragraphing follows the mail, and "Om din far…" signals the topic well. Connectors are limited and repetitive — "og" and "men" carry most of the text, and three sentences begin with "Men"/"Så". The register is friendly and suitable.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Mostly correct simple and compound sentences, but with typical slips: a missed inversion ("I næste måned jeg skal"), "ikke" in the wrong place in an at-clause ("at hun kan ikke have"), a gender error ("en badeværelse") and a missing -t ("det er vigtig"). None of them blocks understanding.',
      },
    ],
    annotations: [
      {
        quote: 'I næste måned jeg skal',
        kind: 'error',
        note: '"I næste måned" fills the front slot, so the verb must come next and the subject after it.',
        fix: 'I næste måned skal jeg',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Om din far synes jeg',
        kind: 'good',
        note: 'Correct inversion after a fronted phrase — and a clear signpost for the second question.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'det er vigtig',
        kind: 'error',
        note: 'An adjective used about "det" takes the neuter -t form.',
        fix: 'det er vigtigt',
      },
      {
        quote: 'en badeværelse',
        kind: 'error',
        note: '"Badeværelse" is a t-word (et værelse).',
        fix: 'et badeværelse',
      },
      {
        quote: 'at hun kan ikke have huset for sig selv',
        kind: 'error',
        note: 'In an at-clause "ikke" moves in front of the finite verb.',
        fix: 'at hun ikke kan have huset for sig selv',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'I skal snakke med børnene, før I beslutter noget.',
        kind: 'style',
        note: 'Sensible but generic. Say what they could agree on (e.g. rules for the living room, Emma\'s own space) to really develop the point.',
      },
      {
        quote: 'Du kan komme til mig på søndag, så bager jeg en kage.',
        kind: 'good',
        note: 'A concrete, friendly proposal with correct inversion after "så".',
      },
    ],
  },
  {
    id: 'wgr-d1-1-4',
    taskId: 'wsim-d1-1',
    band: '4',
    origin: 'illustrative',
    text: `Hej Lars

Tak for din mail. Jeg er glad for at høre fra dig.

Min nye job er godt. Jeg arbejder på plejehjem, der er mange gamle mennesker. Nogle dage jeg er meget træt, fordi jeg arbejde om natten også. Men kollegerne er søde.

Det er trist at din far er alene. Jeg synes han skal flytte til jer, så han ikke er ensom. I mit land de gamle mennesker bor altid med familien, det er normal. Jeg tror det er bedst for ham. Han kan få en lejlighed i garagen og han kan spise med jer om aftenen. Hvis han ikke vil, så er det hans problem.

Børnene er også gode.

Vi kan mødes en dag og snakke om det. Ring til mig.

Mange hilsen
Amira`,
    summary:
      'Two questions answered simply, the one about the children barely touched; frequent errors and a few unclear or blunt sentences.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks and a proposal are present, and the job and the father get short answers with a reason ("så han ikke er ensom"). The third underlined question is not really answered: "Børnene er også gode." does not say how the children will feel about living with their grandfather.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'There are paragraphs, but the sentences are short and mostly joined with "og" and "men", or not joined at all ("…plejehjem, der er mange gamle mennesker"). "Hvis han ikke vil, så er det hans problem." sounds harsh to a friend who is worried about his father. The proposal is very brief.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Frequent basic errors: missed inversion twice ("Nogle dage jeg er", "I mit land de gamle mennesker bor"), a missing present-tense -r ("jeg arbejde"), gender ("Min nye job") and agreement ("det er normal"). The message is still understandable, but the reader has to work in places.',
      },
    ],
    annotations: [
      {
        quote: 'Min nye job',
        kind: 'error',
        note: '"Job" is a t-word, so the possessive is "mit".',
        fix: 'Mit nye job',
      },
      {
        quote: 'Jeg arbejder på plejehjem, der er mange gamle mennesker.',
        kind: 'error',
        note: 'Missing article, and "der er" after a comma does not link the clauses. Use "hvor" to say where.',
        fix: 'Jeg arbejder på et plejehjem, hvor der bor mange gamle mennesker.',
      },
      {
        quote: 'Nogle dage jeg er meget træt, fordi jeg arbejde om natten også.',
        kind: 'error',
        note: 'Fronted "Nogle dage" requires inversion, and the present tense needs -r: "arbejder". "Også" sits better before the time phrase.',
        fix: 'Nogle dage er jeg meget træt, fordi jeg også arbejder om natten.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'I mit land de gamle mennesker bor altid med familien, det er normal.',
        kind: 'error',
        note: 'Inversion after "I mit land", "bor sammen med", and the neuter -t after "det".',
        fix: 'I mit land bor de gamle altid sammen med familien. Det er helt normalt.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'så han ikke er ensom',
        kind: 'good',
        note: '"ikke" correctly placed before the verb in the subordinate clause.',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Hvis han ikke vil, så er det hans problem.',
        kind: 'style',
        note: 'Too blunt for a worried friend. Show understanding instead.',
        fix: 'Hvis han ikke har lyst, skal I selvfølgelig respektere det.',
      },
      {
        quote: 'Børnene er også gode.',
        kind: 'error',
        note: 'Does not answer the underlined question (how will the children feel living with their grandfather?) and the meaning is unclear. A missed question costs a lot under task fulfilment.',
        fix: 'Jeg tror, børnene vil blive glade, men de skal have deres eget værelse i fred.',
      },
      {
        quote: 'Mange hilsen',
        kind: 'error',
        note: 'After "mange" the noun is plural.',
        fix: 'Mange hilsner',
      },
    ],
  },
  {
    id: 'wgr-d1-1-02',
    taskId: 'wsim-d1-1',
    band: '02',
    origin: 'illustrative',
    text: `Hej Lars

Tak for mail. Det var godt fest.

Min arbejde er god. Jeg arbejde med gammel mennesker på plejehjemmet. Det er hård men jeg kan lide det.

Din far han er alene nu, det er ikke godt for ham. Jeg tænker han kan bo hos dig i garage. Så du skal ikke køre til Ringkøbing hver weekend, og han har ikke ensom. Hvis han vil ikke bo der, du kan spørge ham igen.

Børn de kan lide han, ikke problem.

Måske vi kan ses snart og snakke.

Hilsen
Amira`,
    summary:
      'Barely passes: every point is touched in a sentence or two, but the answers are undeveloped and errors appear in almost every line.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks, the three underlined questions and a proposal are all touched, which is why the text just passes. Each answer is one or two sentences with almost no development — the children are dismissed with "ikke problem", and the proposal ("Måske vi kan ses snart") is vague.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'The paragraphs follow the mail, but sentences are strung together with commas or stand as fragments ("Så du skal ikke køre…"). There is almost no linking beyond "og" and "men". The tone is friendly enough, but the text reads like notes rather than a mail.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Errors in almost every sentence: gender ("Min arbejde", "godt fest"), verb form ("jeg arbejde", "han har ikke ensom"), word order ("Hvis han vil ikke", "du kan spørge" after the hvis-clause) and pronoun case ("lide han"). The main meaning still comes through.',
      },
    ],
    annotations: [
      {
        quote: 'Det var godt fest.',
        kind: 'error',
        note: '"Fest" is an n-word and needs an article: "en god fest".',
        fix: 'Det var en god fest.',
      },
      {
        quote: 'Min arbejde er god. Jeg arbejde med gammel mennesker',
        kind: 'error',
        note: '"Arbejde" is a t-word (mit … godt), the present tense needs -r, and the adjective takes -e in the plural.',
        fix: 'Mit arbejde er godt. Jeg arbejder med gamle mennesker',
      },
      {
        quote: 'Din far han er alene nu',
        kind: 'error',
        note: 'The subject is said twice. Danish uses either "din far" or "han", not both.',
        fix: 'Din far er alene nu',
      },
      {
        quote: 'han har ikke ensom',
        kind: 'error',
        note: 'With an adjective like "ensom" Danish uses "være", not "have".',
        fix: 'han er ikke ensom',
      },
      {
        quote: 'Hvis han vil ikke bo der, du kan spørge ham igen.',
        kind: 'error',
        note: 'Two word-order errors: "ikke" goes before the verb in the hvis-clause, and the main clause after it must invert.',
        fix: 'Hvis han ikke vil bo der, kan du spørge ham igen.',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Børn de kan lide han, ikke problem.',
        kind: 'error',
        note: 'Object pronoun is "ham", the subject is doubled, and the answer is too thin to count as developing the question.',
        fix: 'Børnene kan godt lide ham, så det bliver ikke et problem.',
      },
      {
        quote: 'Måske vi kan ses snart og snakke.',
        kind: 'error',
        note: 'In writing, fronted "Måske" should be followed by the verb. The proposal would also be stronger with a time or place.',
        fix: 'Måske kan vi ses snart og snakke om det.',
        ruleId: 'v2-inversion',
      },
    ],
  },
];
