import type { GradedAnswer, PracticeTask, TaskBullet } from './types';

/**
 * Original Delprøve 1 practice tasks (written for the app, not taken from a
 * past paper), with tips, a word bank and an illustrative grade ladder for each.
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
    tips: [
      {
        title: 'Judge the garage plan, not "old people" in general',
        text: '"Hvad synes du – er det en god idé?" asks about one concrete plan: converting the garage in Odense into a small flat. Say yes or no and add a condition ("… men kun hvis han selv har lyst"), rather than writing about elderly care in your home country.',
      },
      {
        title: 'Two children, two answers',
        text: 'Emma is 14 and Oskar is 11, and Lars says they are used to having the house to themselves. Say something about each, e.g. Oskar will enjoy a farfar who can pick him up, while Emma as a teenager needs privacy. "Børnene er glade" alone is too thin.',
      },
      {
        title: 'Use your new job as a bridge',
        text: 'Lars mentions that you have just started at a plejehjem. That gives you credibility: one sentence like "På plejehjemmet ser jeg, hvor ensomme mange ældre er" links the small talk to the dilemma.',
      },
      {
        title: 'Respect the father\'s own wish',
        text: 'The mail ends with "han ikke vil være en byrde". Show you noticed it: recommend that they ask him first, and avoid blunt lines like "det er hans problem" towards a worried friend.',
      },
      {
        title: 'Lars and Hanne are "I/jer"',
        text: 'The flat would be in Lars and Hanne\'s house, so write "hos jer" and "I kan …" when you mean the couple, and "du" only for Lars himself. He is your friend\'s father: "din far", and the children call him "farfar", not "morfar".',
      },
    ],
    words: [
      { da: 'at flytte ind hos nogen', en: 'to move in with someone' },
      { da: 'at bygge garagen om til en lejlighed', en: 'to convert the garage into a flat' },
      { da: 'at være ensom', en: 'to be lonely' },
      { da: 'en byrde', en: 'a burden' },
      { da: 'sin egen indgang', en: 'his own entrance' },
      { da: 'et privatliv', en: 'privacy, a private life' },
      { da: 'at bevare sin selvstændighed', en: 'to keep your independence' },
      { da: 'at tage hensyn til hinanden', en: 'to be considerate of each other' },
      { da: 'en prøveperiode', en: 'a trial period' },
      { da: 'en farfar', en: "a grandfather (father's father)" },
      { da: 'et plejehjem', en: 'a care home' },
      { da: 'en beboer', en: 'a resident' },
      { da: 'en vagt', en: 'a shift' },
      { da: 'at aftale nogle klare regler', en: 'to agree on some clear rules' },
    ],
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
    tips: [
      {
        title: 'Everyday life and weekends are two questions',
        text: '"Synes du, vi kan klare os uden bil?" is about daily life in Copenhagen; "Har du en idé til, hvordan vi kan løse det?" is only about the weekend trips to his parents outside Svendborg. Give each its own paragraph, and make the second one a concrete idea, not just "det er svært".',
      },
      {
        title: 'Use the facts in the mail',
        text: 'A cargo bike costs about 25,000 kr., the children are 3 and 6, Jonas worries about rain and wind in winter, and the bus near Svendborg runs only a few times a day. Answering his actual worry ("med en kaleche sidder børnene tørt") scores higher than general praise of cycling.',
      },
      {
        title: 'The holiday question has two parts, in the past tense',
        text: '"Hvor var I henne, og hvad lavede I?" wants a place and two or three activities: "Vi var på Bornholm, hvor vi cyklede og …". Watch the past tense (cyklede, så, spiste) and the preposition: "på Bornholm", "i Skagen".',
      },
      {
        title: 'Ideas for the weekend problem',
        text: 'Renting a car (at leje en bil) or a car-sharing scheme (en delebil) only when needed, or the train to Svendborg with his parents picking them up at the station. Mention that this is still cheaper than owning a car.',
      },
      {
        title: 'Avoid "gå til" for travel',
        text: 'English "go to" is not "gå til" when you travel by car, train or ferry: write "Vi tog til Bornholm" and "I kan køre til Svendborg". "Gå" means on foot.',
      },
    ],
    words: [
      { da: 'en ladcykel', en: 'a cargo bike' },
      { da: 'en ladcykel med elmotor', en: 'an electric cargo bike' },
      { da: 'en kaleche', en: 'a rain cover (on a cargo bike or pram)' },
      { da: 'at klare sig uden bil', en: 'to manage without a car' },
      { da: 'det kan ikke betale sig', en: "it isn't worth it (financially)" },
      { da: 'at gå i stykker', en: 'to break down' },
      { da: 'en delebil', en: 'a shared car (car-sharing)' },
      { da: 'at leje en bil', en: 'to rent a car' },
      { da: 'at hente nogen på stationen', en: 'to pick someone up at the station' },
      { da: 'at spare penge', en: 'to save money' },
      { da: 'at få mere motion', en: 'to get more exercise' },
      { da: 'regn og blæst', en: 'rain and wind' },
      { da: 'at være overbevist om', en: 'to be convinced of' },
      { da: 'at prøvekøre', en: 'to test-ride, test-drive' },
    ],
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
    tips: [
      {
        title: 'Four questions: do not forget the recipe',
        text: 'The last underlined question, "Kender du en god opskrift på et brød, som børn kan lide?", sits in a short paragraph at the end and is the one most people skip. Answer it in a sentence or two (e.g. boller with mel, gær, mælk and smør), ideally together with the proposal to bake together.',
      },
      {
        title: 'The first question has two halves',
        text: '"Hvordan forbereder du dig, og er du nervøs?" needs both: what you do to prepare (e.g. write practice mails, listen to the news) and how nervous you are and about what.',
      },
      {
        title: 'Answer the "hvis nej" question even if you said yes',
        text: '"Hvordan skal jeg fortælle ham det, hvis jeg vælger at fortsætte som sygeplejerske?" asks HOW to break the news, not whether to. Even if you advised her to take over, answer it: "Hvis du alligevel siger nej, synes jeg …".',
      },
      {
        title: 'Ideas for the dilemma',
        text: 'Use her facts: she loves baking and grew up in the shop, but has never run a business and must start at four in the morning with two small children. A middle way reads well: hire a baker for the early hours, take a course in running a business, or try it for a year.',
      },
      {
        title: 'Be kind about her father',
        text: 'If the bakery goes to a chain, her father will be upset. Suggest she thanks him for what he built and offers to help find a buyer who keeps the bakery, rather than telling her to "sige undskyld".',
      },
    ],
    words: [
      { da: 'et bageri', en: 'a bakery' },
      { da: 'at overtage bageriet', en: 'to take over the bakery' },
      { da: 'at drive en virksomhed', en: 'to run a business' },
      { da: 'at gå på pension', en: 'to retire' },
      { da: 'en kæde', en: 'a chain (of shops)' },
      { da: 'at ansætte en bager', en: 'to hire a baker' },
      { da: 'at stå op klokken fire', en: 'to get up at four' },
      { da: 'en sygeplejerske', en: 'a nurse' },
      { da: 'at gøre nogen ked af det', en: 'to upset someone' },
      { da: 'at være ærlig over for nogen', en: 'to be honest with someone' },
      { da: 'en opskrift på boller', en: 'a recipe for buns' },
      { da: 'mel, gær, mælk og smør', en: 'flour, yeast, milk and butter' },
      { da: 'en klassefest', en: 'a class party' },
      { da: 'at forberede sig til prøven', en: 'to prepare for the exam' },
    ],
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
  {
    id: 'wgr-d1-2-12',
    taskId: 'wsim-d1-2',
    band: '12',
    origin: 'illustrative',
    text: `Hej Jonas

Tak for din mail. Hvor er jeg glad for, at du kunne lide billederne! Til gengæld var det ærgerligt at høre, at jeres bil er gået i stykker.

Du spørger, hvor vi var henne. Vi lejede et sommerhus på Bornholm i fem dage, og vi var heldige med vejret hele ugen. Vi cyklede rundt på øen, kiggede på ruinerne af Hammershus og spiste røget sild i Gudhjem. Det bedste var nu, at børnene faldt i søvn med det samme hver aften.

Med hensyn til ladcyklen tror jeg faktisk, at Line har ret. I bor midt i København, hvor man sjældent har brug for en bil i hverdagen, og 25.000 kr. er ikke meget i forhold til en ny bil med benzin og forsikring. Jeg forstår godt, at du er i tvivl om vinteren, men hvis I vælger en ladcykel med elmotor og en god kaleche, sidder børnene tørt og lunt, selv når det blæser.

Weekendturene til Svendborg er sværere. Når I skal besøge dine forældre, kunne I bruge en delebil eller leje en bil for et par dage. Alternativt kan I tage toget til Svendborg, hvor dine forældre sikkert gerne vil hente jer på stationen. Det bliver stadig meget billigere end at have en bil stående på gaden hele ugen.

Hvad siger du til, at vi prøvekører en ladcykel sammen på lørdag? Bagefter kan I komme hjem til os og få en kop kaffe, så kan vi snakke videre om det.

Hils Line og børnene!

Kærlig hilsen
Amira`,
    summary:
      'Both dilemma questions get their own developed answer with concrete solutions, the holiday is told vividly, and the Danish is natural and almost flawless.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks, all three underlined questions and a concrete proposal ("prøvekører en ladcykel sammen på lørdag") are covered. The two dilemma questions are kept apart: the first takes a clear side ("Line har ret") and meets Jonas\'s exact worry about winter with a solution (elmotor, kaleche), the second offers three practical options for the Svendborg trips.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'One paragraph per question, each opened with a signpost ("Du spørger, hvor …", "Med hensyn til ladcyklen …", "Weekendturene til Svendborg er sværere."). Connectors are varied ("til gengæld", "alternativt", "selv når", "stadig"), and the closing comparison ("Det bliver stadig meget billigere …") rounds the argument off. The tone is warm and personal.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Inversion is secure after fronted clauses ("Når I skal besøge dine forældre, kunne I …"), the past tense in the holiday paragraph is consistent ("lejede", "cyklede", "kiggede", "spiste"), and vocabulary is idiomatic ("heldige med vejret", "faldt i søvn med det samme", "tørt og lunt"). The only small wobble is the very literal "i forhold til en ny bil med benzin og forsikring", which is correct but a little compressed.',
      },
    ],
    annotations: [
      {
        quote: 'Du spørger, hvor vi var henne.',
        kind: 'good',
        note: 'Repeating the question signals clearly which underlined part the paragraph answers.',
      },
      {
        quote: 'Vi cyklede rundt på øen, kiggede på ruinerne af Hammershus og spiste røget sild i Gudhjem.',
        kind: 'good',
        note: 'Three activities in a consistent past tense answer "hvad lavede I?" fully, and "på øen" uses the right preposition for an island.',
      },
      {
        quote: 'hvis I vælger en ladcykel med elmotor og en god kaleche, sidder børnene tørt og lunt',
        kind: 'good',
        note: 'Answers Jonas\'s actual worry (rain and wind) with a concrete fix, and the main clause inverts after the hvis-clause: "sidder børnene".',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Weekendturene til Svendborg er sværere.',
        kind: 'good',
        note: 'A short topic sentence that moves to the second dilemma question and shows the writer has noticed it is a separate problem.',
      },
      {
        quote: 'Når I skal besøge dine forældre, kunne I bruge en delebil',
        kind: 'good',
        note: 'Fronted når-clause followed by the verb ("kunne I"), and a concrete, realistic solution.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'i forhold til en ny bil med benzin og forsikring',
        kind: 'style',
        note: 'Correct, but packs a lot into one phrase. Spelling out the running costs is clearer.',
        fix: 'i forhold til, hvad en ny bil koster, når man regner benzin og forsikring med',
      },
      {
        quote: 'Hvad siger du til, at vi prøvekører en ladcykel sammen på lørdag?',
        kind: 'good',
        note: 'The proposal is concrete (an activity and a day) and tied to the topic of the mail.',
      },
    ],
  },
  {
    id: 'wgr-d1-2-7',
    taskId: 'wsim-d1-2',
    band: '7',
    origin: 'illustrative',
    text: `Hej Jonas

Tak for din mail og tak for de søde ord om billederne.

I efterårsferien gik vi til Bornholm i fem dage. Vi boede i et lille sommerhus tæt på stranden. Vi cyklede meget, og vi besøgte Hammershus. Om aftenen vi spillede kort med børnene. Det var en dejlig ferie.

Jeg synes, at I godt kan klare jer uden bil. I bor i København, og der er mange busser og tog. En ladcykel er også billigere end en ny bil, og I får mere motion. Men jeg forstår godt, at du er bekymret for vinteren. Måske kan I købe en ladcykel med en tag, så børnene ikke bliver våde.

I weekenderne kan I leje en bil. Det er ikke så dyr, hvis I kun gør det to gange om måneden. I kan også tage toget til Svendborg, og så kan dine forældre hente jer. Men det tager længere tid.

Skal vi mødes og snakke mere om det? Min nabo har en ladcykel, og måske kan I prøve den på søndag.

Mange hilsner
Amira`,
    summary:
      'Everything is answered with a clear view and sensible ideas, but the points stay short, the linking is repetitive, and a few typical slips show.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'All bullets are covered: thanks, the holiday (place and activities), a clear yes to living without a car with two reasons, two ideas for the weekends, and a concrete proposal (try the neighbour\'s cargo bike on Sunday). The development is thin: the winter worry gets one sentence, and the train idea ends with an unexplained "Men det tager længere tid."',
      },
      {
        criterion: 'pragmatic',
        comment:
          'The paragraphs follow the mail\'s questions, so the structure is clear. Most sentences are joined with "og" and "men", and three sentences start with "Men" or "Vi", which makes the text sound list-like. The register is friendly and suitable.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Generally correct, with a fair range of simple vocabulary. Typical slips: an anglicism ("gik vi til Bornholm"), a missed inversion ("Om aftenen vi spillede"), a gender error ("en tag") and a missing neuter -t ("Det er ikke så dyr"). None of them blocks understanding.',
      },
    ],
    annotations: [
      {
        quote: 'gik vi til Bornholm',
        kind: 'error',
        note: '"Gå" means on foot. For a trip by car, train or ferry Danish uses "tage" or "rejse".',
        fix: 'tog vi til Bornholm',
      },
      {
        quote: 'Om aftenen vi spillede',
        kind: 'error',
        note: '"Om aftenen" fills the front slot, so the verb must come next and the subject after it.',
        fix: 'Om aftenen spillede vi',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'at I godt kan klare jer uden bil',
        kind: 'good',
        note: 'In the at-clause the adverb "godt" correctly comes before the finite verb "kan".',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'en ladcykel med en tag',
        kind: 'error',
        note: '"Tag" (roof) is a t-word. For a cargo bike the usual word is "kaleche".',
        fix: 'en ladcykel med et tag (en kaleche)',
      },
      {
        quote: 'så børnene ikke bliver våde',
        kind: 'good',
        note: '"ikke" correctly placed before the verb in the subordinate clause.',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Det er ikke så dyr',
        kind: 'error',
        note: 'An adjective used about "det" takes the neuter -t form.',
        fix: 'Det er ikke så dyrt',
      },
      {
        quote: 'Men det tager længere tid.',
        kind: 'style',
        note: 'Ends the point on a loose objection without weighing it. Say why it is still worth it, and vary the connector.',
        fix: 'Det tager lidt længere tid, men til gengæld kan børnene lege i toget.',
      },
    ],
  },
  {
    id: 'wgr-d1-2-4',
    taskId: 'wsim-d1-2',
    band: '4',
    origin: 'illustrative',
    text: `Hej Jonas

Tak for din mail. Jeg er glad, at du kan lide billeder.

Vi var på Bornholm. Det var meget godt. Vi cykler og vi spiste fisk. Vejret var godt, men det blæste lidt.

Det er ærgerligt med jeres bil. Jeg synes Line har ret. En ladcykel er billig og det er god for sundhed. I København alle mennesker kører på cykel, det er normal. Om vinteren det er koldt, men man kan tage en varm jakke på. Jeg har ikke bil og jeg klarer mig fint.

Børnene synes det er sjovt, så det er en god idé.

Vi kan mødes en dag og snakke om det. Hvad siger du?

Mange hilsner
Amira`,
    summary:
      'The holiday and the cargo bike get simple answers, but the weekend question about Svendborg is skipped, and errors are frequent.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks, the holiday, an opinion on the cargo bike and a short proposal are present. The third underlined question ("Har du en idé til, hvordan vi kan løse det?") is never answered: the visits to his parents outside Svendborg are not mentioned. Instead the text comments on the children, which Jonas did not ask about.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'There are paragraphs, but the sentences are short and mostly joined with "og" or a comma ("…kører på cykel, det er normal"). The argument for the cargo bike is a list of general claims rather than a reply to Jonas\'s worry, and "en varm jakke" does not address rain with small children. The proposal has no time or place.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Frequent basic errors: missed inversion twice ("I København alle mennesker kører", "Om vinteren det er koldt"), a tense switch ("Vi cykler og vi spiste"), the neuter -t ("det er god", "det er normal"), a missing "for" ("glad, at") and a missing definite form ("billeder"). The meaning comes through, but the language is simple throughout.',
      },
    ],
    annotations: [
      {
        quote: 'Jeg er glad, at du kan lide billeder.',
        kind: 'error',
        note: '"Glad" takes "for, at", and he means the specific photos you sent, so the definite form is needed.',
        fix: 'Jeg er glad for, at du kunne lide billederne.',
      },
      {
        quote: 'Vi cykler og vi spiste fisk.',
        kind: 'error',
        note: 'The holiday is over, so both verbs must be in the past tense.',
        fix: 'Vi cyklede, og vi spiste fisk.',
      },
      {
        quote: 'det er god for sundhed',
        kind: 'error',
        note: 'Neuter -t after "det", and the idiom is "godt for helbredet".',
        fix: 'det er godt for helbredet',
      },
      {
        quote: 'I København alle mennesker kører på cykel, det er normal.',
        kind: 'error',
        note: 'Inversion after "I København", and a comma cannot join two main clauses here. Also "normalt" after "det".',
        fix: 'I København cykler næsten alle. Det er helt normalt.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Om vinteren det er koldt',
        kind: 'error',
        note: 'Fronted "Om vinteren" must be followed by the verb.',
        fix: 'Om vinteren er det koldt',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Børnene synes det er sjovt, så det er en god idé.',
        kind: 'error',
        note: 'Repeats the mail instead of answering the weekend question. The trips to Svendborg needed an idea (leje en bil, delebil, toget), and a skipped underlined question costs a lot under task fulfilment.',
        fix: 'Når I skal besøge dine forældre, kan I leje en bil eller tage toget til Svendborg.',
      },
    ],
  },
  {
    id: 'wgr-d1-2-02',
    taskId: 'wsim-d1-2',
    band: '02',
    origin: 'illustrative',
    text: `Hej Jonas

Tak for mail. Billeder var flot ja.

Vi var i Bornholm, vi cykle og se Hammershus. Det var god ferie.

Jeres bil er i stykker, det er ked af. Jeg tænker ladcykel er god idé, fordi den er ikke dyrt og man får motion. Men vinter er problem, det regne meget. Du skal købe god regntøj.

Til din forældre i Svendborg I kan leje bil eller tage tog. Bus er ikke god.

Vi kan ses og snakke.

Hilsen
Amira`,
    summary:
      'Barely passes: each question gets a sentence or two and the weekend gets an idea, but there are errors in almost every line and nothing is developed.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks, the holiday, the cargo bike, the weekend trips and a proposal are all touched, which is what keeps the text above the line. Each answer is minimal: the winter worry gets "Du skal købe god regntøj", the weekend gets two words of options, and "Vi kan ses og snakke" has no time or place.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'The paragraphs follow the mail, but sentences are strung together with commas or stand as fragments ("Bus er ikke god."). There is hardly any linking beyond "og", "men" and one "fordi". It reads like notes rather than a mail to a friend.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Errors in almost every sentence: verb forms ("vi cykle og se", "det regne"), word order ("fordi den er ikke dyrt", "I kan" after a fronted phrase), agreement ("Billeder var flot", "god regntøj", "din forældre"), a missing "jeg" ("det er ked af") and a wrong preposition ("i Bornholm"). The main meaning still comes through.',
      },
    ],
    annotations: [
      {
        quote: 'Billeder var flot ja.',
        kind: 'error',
        note: 'Definite plural for the photos he saw, and the adjective agrees with a plural noun: "flotte".',
        fix: 'Billederne var flotte.',
      },
      {
        quote: 'Vi var i Bornholm, vi cykle og se Hammershus.',
        kind: 'error',
        note: 'Islands take "på", and both verbs need the past tense.',
        fix: 'Vi var på Bornholm, hvor vi cyklede og så Hammershus.',
      },
      {
        quote: 'det er ked af',
        kind: 'error',
        note: '"Ked af det" is said about a person, so the subject must be "jeg", and the phrase needs "det".',
        fix: 'det er jeg ked af',
      },
      {
        quote: 'fordi den er ikke dyrt',
        kind: 'error',
        note: 'In a fordi-clause "ikke" comes before the verb, and "ladcykel" is an n-word: "dyr" without -t.',
        fix: 'fordi den ikke er dyr',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'god regntøj',
        kind: 'error',
        note: '"Regntøj" is a t-word (et tøj), so the adjective takes -t.',
        fix: 'godt regntøj',
      },
      {
        quote: 'Til din forældre i Svendborg I kan leje bil',
        kind: 'error',
        note: 'Plural possessive "dine", and the fronted phrase must be followed by the verb.',
        fix: 'Når I skal til dine forældre i Svendborg, kan I leje en bil',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Vi kan ses og snakke.',
        kind: 'style',
        note: 'The proposal is there, but very vague. A day or an activity makes it a real suggestion.',
        fix: 'Skal vi ses på lørdag og snakke mere om det?',
      },
    ],
  },
  {
    id: 'wgr-d1-3-12',
    taskId: 'wsim-d1-3',
    band: '12',
    origin: 'illustrative',
    text: `Kære Sara

Tak for din mail, og tak for sidst. Det var dejligt at gå i skoven sammen med dig, selvom vi blev lidt våde til sidst.

Du spørger, hvordan jeg forbereder mig til danskprøven. Hver aften skriver jeg en mail eller en kort tekst, som min lærer retter, og om morgenen hører jeg nyheder i radioen, mens jeg kører på arbejde. Jeg er ærligt talt ret nervøs, især for den skriftlige del, men jeg føler mig bedre forberedt for hver uge, der går.

Med hensyn til bageriet synes jeg, at du skal sige ja – men på dine egne betingelser. Du elsker at bage, og du kender butikken og kunderne bedre end nogen anden. Til gengæld ville jeg ansætte en erfaren bager til de tidlige morgener, så du selv kan nå at aflevere børnene. Et kursus i at drive en lille virksomhed kunne også give dig mere selvtillid.

Hvis du alligevel vælger at fortsætte som sygeplejerske, skal du fortælle din far det ærligt og i god tid. Sig tak for alt det, han har bygget op, og forklar, at det handler om din familie og ikke om bageriet. Måske bliver han mindre ked af det, hvis du tilbyder at hjælpe med at finde en køber, der vil bevare bageriet.

Og ja, jeg kender en nem opskrift på grovboller, som min søns venner altid spiser op. Skal vi ikke mødes på søndag og bage dem sammen? Så kan vi også snakke mere om din beslutning.

Knus
Amira`,
    summary:
      'All four underlined questions answered and developed, including the easily forgotten recipe, with sensitive advice and natural, near-flawless Danish.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks, all four underlined questions and a concrete proposal (baking together "på søndag") are covered. Both halves of the first question are answered (how and how nervous). The bakery dilemma gets a clear "ja – men på dine egne betingelser" with two practical conditions, and the "hvis nej" question is still answered ("Hvis du alligevel vælger …"), with a kind, concrete idea: helping to find a buyer.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'One paragraph per question in the mail\'s order, each with a clear opening ("Du spørger, hvordan …", "Med hensyn til bageriet …", "Hvis du alligevel …", "Og ja, …"). The recipe is cleverly joined with the proposal, so the mail ends naturally. Linking is varied ("til gengæld", "alligevel", "mens", "så") and the tone is warm.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Word order is secure: inversion after fronted elements ("Hver aften skriver jeg", "Måske bliver han") and correct "ikke" placement. Vocabulary is precise and idiomatic ("på dine egne betingelser", "nå at aflevere børnene", "for hver uge, der går"). The imperatives "Sig tak …" and "forklar …" suit a close friend.',
      },
    ],
    annotations: [
      {
        quote: 'Hver aften skriver jeg en mail eller en kort tekst, som min lærer retter',
        kind: 'good',
        note: 'Inversion after the fronted time phrase, and a concrete detail that answers "Hvordan forbereder du dig?".',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Jeg er ærligt talt ret nervøs, især for den skriftlige del',
        kind: 'good',
        note: 'Answers the second half of the question ("er du nervøs?"), which many forget, with a specific reason.',
      },
      {
        quote: 'men på dine egne betingelser',
        kind: 'good',
        note: 'A clear answer with a condition, which leads straight into the practical advice that follows.',
      },
      {
        quote: 'så du selv kan nå at aflevere børnene',
        kind: 'good',
        note: 'Meets Sara\'s actual problem (getting up at four with small children) with a solution; "nå at" is precise and idiomatic.',
      },
      {
        quote: 'Hvis du alligevel vælger at fortsætte som sygeplejerske',
        kind: 'good',
        note: 'Answers the conditional question even though the writer advised "ja". "Alligevel" makes the shift smooth.',
      },
      {
        quote: 'Måske bliver han mindre ked af det',
        kind: 'good',
        note: 'Fronted "Måske" followed by the verb, as written Danish requires.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Sig tak for alt det, han har bygget op',
        kind: 'style',
        note: 'Correct and friendly. A slightly softer form avoids sounding like an order.',
        fix: 'Du kunne takke ham for alt det, han har bygget op',
      },
      {
        quote: 'Og ja, jeg kender en nem opskrift på grovboller',
        kind: 'good',
        note: 'The fourth underlined question is answered and linked to the proposal to bake together.',
      },
    ],
  },
  {
    id: 'wgr-d1-3-7',
    taskId: 'wsim-d1-3',
    band: '7',
    origin: 'illustrative',
    text: `Hej Sara

Tak for din mail. Det var også et hyggeligt tur i skoven.

Jeg forbereder mig meget til prøven. Jeg går til dansk tre gange om ugen, og derhjemme jeg skriver mails og læser aviser. Ja, jeg er lidt nervøs, fordi jeg har ikke så meget tid.

Jeg synes, du skal sige ja til bageriet. Du elsker at bage, og du kender butikken godt. Men det er hårdt at stå op klokken fire, når man har små børn. Måske kan du ansætte en bager, så du kan sove lidt længere. Og din mand kan måske hjælpe om morgenen.

Hvis du siger nej, skal du snakke ærlig med din far. Du kan sige, at du er glad for hans bageri, men du vil gerne være sygeplejerske. Han bliver nok ked af det, men han vil også gerne, at du er glad.

Jeg har en god opskrift på boller med rosiner. Børnene elsker dem! Skal vi mødes en dag og bage sammen? Så kan vi også snakke mere om bageriet.

Mange hilsner
Amira`,
    summary:
      'All four questions answered with sensible advice, but thinly developed, with repetitive linking and a handful of word-order and ending slips.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks, all four underlined questions and a proposal are covered, including the recipe. The answers are short: the dilemma gets one reason on each side and the idea of hiring a baker, and the advice on telling her father stays general ("snakke ærlig") without a concrete step such as offering to help find a buyer.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'The paragraphs follow the mail and are easy to follow. Linking relies on "og" and "men" (five sentences use "men"), and the dilemma paragraph has no signpost. The tone is friendly, and the proposal fits the recipe nicely.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Mostly correct, with typical slips: a gender error ("et hyggeligt tur"), a missed inversion ("derhjemme jeg skriver"), "ikke" after the verb in a fordi-clause ("fordi jeg har ikke") and an adjective used as an adverb without -t ("snakke ærlig"). None of them blocks understanding.',
      },
    ],
    annotations: [
      {
        quote: 'et hyggeligt tur',
        kind: 'error',
        note: '"Tur" is an n-word, so the article is "en" and the adjective has no -t.',
        fix: 'en hyggelig tur',
      },
      {
        quote: 'derhjemme jeg skriver',
        kind: 'error',
        note: 'After "og" a new main clause starts, and "derhjemme" fills its front slot, so the verb comes before the subject.',
        fix: 'derhjemme skriver jeg',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'fordi jeg har ikke så meget tid',
        kind: 'error',
        note: 'In a fordi-clause "ikke" moves in front of the finite verb.',
        fix: 'fordi jeg ikke har så meget tid',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Måske kan du ansætte en bager',
        kind: 'good',
        note: 'Correct inversion after "Måske", and a practical solution to the early mornings.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'snakke ærlig med din far',
        kind: 'error',
        note: 'Used as an adverb (describing how you talk), the adjective takes -t.',
        fix: 'snakke ærligt med din far',
      },
      {
        quote: 'Han bliver nok ked af det, men han vil også gerne, at du er glad.',
        kind: 'style',
        note: 'Kind, but general. A concrete step would develop the advice, and a different connector would break the run of "men".',
        fix: 'Han bliver nok ked af det, så du kunne tilbyde at hjælpe ham med at finde en køber, der vil bevare bageriet.',
      },
      {
        quote: 'Jeg har en god opskrift på boller med rosiner.',
        kind: 'good',
        note: 'The fourth underlined question is answered, and the next lines turn it into the proposal.',
      },
    ],
  },
  {
    id: 'wgr-d1-3-4',
    taskId: 'wsim-d1-3',
    band: '4',
    origin: 'illustrative',
    text: `Hej Sara

Tak for din mail. Det var en god tur i skoven.

Jeg læser meget til prøven og jeg skriver også. Jeg er nervøs lidt, fordi prøven er svær.

Det er en svær beslutning. Jeg synes du skal sige ja, fordi bageri er familiens. Hvis du siger nej, din far bliver ked af det. Men stå op klokken fire er meget tidligt, det er ikke godt for børnene. Måske du kan arbejde om dagen og en anden bager arbejder om morgen.

Hvis du vil være sygeplejerske, du skal sige det til din far. Han skal forstå.

Vi kan mødes en dag og snakke mere. Ring til mig.

Mange hilsner
Amira`,
    summary:
      'Three questions get short answers, but the recipe question is skipped, the advice on telling her father is barely touched, and errors are frequent.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks, the exam question, the bakery dilemma and a short proposal are present. The fourth underlined question (a recipe for the class party) is not answered at all, and the question on how to tell her father gets only "du skal sige det til din far. Han skal forstå.", which does not say how. The proposal has no time or place.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'There are paragraphs, but the sentences are short and loosely joined ("…meget tidligt, det er ikke godt for børnene"). The argument for "ja" ("fordi bageri er familiens") is weak and partly contradicted in the next lines. "Han skal forstå." sounds blunt about a father who will be upset.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Frequent errors: missed inversion three times ("Hvis du siger nej, din far bliver", "Måske du kan", "Hvis du vil være sygeplejerske, du skal"), adverb placement ("nervøs lidt"), a missing infinitive marker ("Men stå op klokken fire er") and missing definite forms ("bageri", "om morgen"). The text is understandable, but the reader notices the errors.',
      },
    ],
    annotations: [
      {
        quote: 'Jeg er nervøs lidt',
        kind: 'error',
        note: 'A degree adverb like "lidt" goes before the adjective it modifies.',
        fix: 'Jeg er lidt nervøs',
      },
      {
        quote: 'Hvis du siger nej, din far bliver ked af det.',
        kind: 'error',
        note: 'The hvis-clause fills the front slot, so the main clause must start with the verb.',
        fix: 'Hvis du siger nej, bliver din far ked af det.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Men stå op klokken fire er meget tidligt',
        kind: 'error',
        note: 'An infinitive used as a subject needs "at".',
        fix: 'Men at stå op klokken fire er meget tidligt',
      },
      {
        quote: 'Måske du kan arbejde om dagen og en anden bager arbejder om morgen.',
        kind: 'error',
        note: 'Inversion after "Måske", a comma before the new clause, and the definite form in "om morgenen". The idea itself is good.',
        fix: 'Måske kan du arbejde om dagen, mens en anden bager arbejder om morgenen.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Hvis du vil være sygeplejerske, du skal sige det til din far. Han skal forstå.',
        kind: 'error',
        note: 'Missed inversion after the hvis-clause, and the answer does not say HOW to tell him, which is what the underlined question asks. "Han skal forstå" sounds harsh.',
        fix: 'Hvis du vil fortsætte som sygeplejerske, skal du fortælle ham det ærligt og takke ham for alt, hvad han har gjort.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Vi kan mødes en dag og snakke mere. Ring til mig.',
        kind: 'error',
        note: 'The proposal is there, but the recipe question is missing completely. A skipped underlined question costs a lot under task fulfilment; it could have been joined with the proposal.',
        fix: 'Jeg har en god opskrift på boller. Skal vi mødes på søndag og bage dem sammen?',
      },
    ],
  },
  {
    id: 'wgr-d1-3-02',
    taskId: 'wsim-d1-3',
    band: '02',
    origin: 'illustrative',
    text: `Hej Sara

Tak for mail. Tur i skov var hyggelig.

Jeg læse dansk hver dag til prøve. Ja jeg er nervøs meget.

Bageri er godt arbejde, du kan lide bage. Men klokken fire er for tidlig, du har små børn. Jeg tænker du skal sige ja, hvis du kan få hjælp.

Hvis du siger nej din far han blive ked. Du skal snakke med ham og sige undskyld.

Opskrift jeg kender boller, det er nemt. Mel, gær og mælk.

Vi kan ses en dag.

Hilsen
Amira`,
    summary:
      'Barely passes: all four questions and the proposal are touched in a line or two, but nothing is developed and errors appear in almost every sentence.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks, the exam, the bakery, her father, the recipe and a proposal are all touched, which is what lifts the text to a pass. Each answer is minimal: "hvis du kan få hjælp" is not explained, the advice about her father is just "sige undskyld", and "Vi kan ses en dag" does not suggest talking more about it.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'The paragraphs follow the mail, but sentences are strung together with commas or are fragments ("Mel, gær og mælk."). There is almost no linking beyond "men" and one "hvis". It reads like notes rather than a reply to a friend.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Errors in almost every sentence: missing articles and definite forms ("Tur i skov", "til prøve"), verb forms ("Jeg læse", "han blive"), word order ("nervøs meget", the main clause after "Hvis du siger nej"), a missing "at" ("lide bage") and a missing neuter -t ("for tidlig"). The main meaning still comes through.',
      },
    ],
    annotations: [
      {
        quote: 'Tur i skov var hyggelig.',
        kind: 'error',
        note: 'It was one specific walk in one specific wood, so both nouns need the definite form.',
        fix: 'Turen i skoven var hyggelig.',
      },
      {
        quote: 'Jeg læse dansk hver dag til prøve.',
        kind: 'error',
        note: 'The present tense needs -r, and "prøven" is the specific exam.',
        fix: 'Jeg læser dansk hver dag til prøven.',
      },
      {
        quote: 'du kan lide bage',
        kind: 'error',
        note: '"Kan lide" is followed by "at" + infinitive.',
        fix: 'du kan lide at bage',
      },
      {
        quote: 'Men klokken fire er for tidlig',
        kind: 'error',
        note: 'Meaning "getting up at four", the adjective refers to an activity and takes the neuter -t; better to name the activity.',
        fix: 'Men at stå op klokken fire er for tidligt',
      },
      {
        quote: 'Hvis du siger nej din far han blive ked.',
        kind: 'error',
        note: 'Inversion after the hvis-clause, the subject is said twice, the verb needs -r, and the phrase is "ked af det".',
        fix: 'Hvis du siger nej, bliver din far ked af det.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'sige undskyld',
        kind: 'style',
        note: 'Choosing her own career is nothing to apologise for. Advise her to thank him and explain instead.',
        fix: 'takke ham og forklare, hvorfor du vælger sådan',
      },
      {
        quote: 'Opskrift jeg kender boller, det er nemt.',
        kind: 'error',
        note: 'The word order is confused. Start with the subject and say what the recipe is for.',
        fix: 'Jeg kender en nem opskrift på boller.',
      },
    ],
  },
];
