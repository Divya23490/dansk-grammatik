import type { GradedAnswer, PracticeTask, TaskBullet } from './types';

/**
 * Three more Delprøve 2A practice tasks (simulated, original topics), each with
 * an illustrative 12 / 7 / 4 / 02 ladder. Every number in the tables is invented
 * for practice and says so in `source` / `note`.
 */

const SOURCE = 'Kilde: fiktive tal til øvebrug';
const NOTE =
  'Tallene er opfundet til øvebrug og viser ikke virkelige forhold. I et rigtigt eksamenssæt står tallene typisk i et søjlediagram.';

const SHARE_TEXT =
  'Begrund dine synspunkter. (Besvarelsen af dette punkt skal udgøre ca. 50 % af den samlede besvarelse)';

const describe: TaskBullet = {
  key: 'describe',
  danish: 'Beskriv kort hovedtrækkene i diagrammet.',
  english: 'Briefly describe the main features of the diagram — the big trends, not every number.',
};

const causes = (danish: string, english: string): TaskBullet => ({ key: 'causes', danish, english });

/** "Vurdér fordele og ulemper ved …": `topic` follows "ved" directly, so start it with a space. */
const evaluateProsCons = (topic: string, english: string): TaskBullet => ({
  key: 'evaluate',
  danish: `Vurdér fordele og ulemper ved${topic} ${SHARE_TEXT}`,
  english,
  share: 0.5,
});

/** "Vurdér, om …": asks for a yes/no judgement with reasons. `question` follows "om". */
const evaluateWhether = (question: string, english: string): TaskBullet => ({
  key: 'evaluate',
  danish: `Vurdér, om ${question} ${SHARE_TEXT}`,
  english,
  share: 0.5,
});

export const SIM_TASKS_D2A_EXTRA: PracticeTask[] = [
  {
    id: 'wsim-d2a-4',
    type: 'd2a-diagram',
    title: 'Kæledyr',
    origin: 'simulated',
    intro:
      'Hunde og katte er blevet en del af hverdagen for mange danskere, også for dem, der bor i lejlighed. Diagrammet viser, hvor stor en andel af danskerne i fem aldersgrupper der har hund eller kat, i 2015 og 2024. Skriv en tekst på mindst 200 ord, hvor du besvarer alle tre punkter.',
    table: {
      caption: 'Andel af danskerne, der har hund eller kat, fordelt på alder (%)',
      columns: ['Alder', '2015', '2024'],
      rows: [
        ['18–29 år', '14', '27'],
        ['30–44 år', '33', '40'],
        ['45–59 år', '35', '37'],
        ['60–74 år', '26', '31'],
        ['75 år og derover', '17', '18'],
      ],
      source: SOURCE,
      note: NOTE,
    },
    bullets: [
      describe,
      causes(
        'Fortæl, hvilke årsager der kan være til, at især de unge har fået flere kæledyr.',
        'Suggest why young people in particular now have far more pets than before.',
      ),
      evaluateProsCons(
        ' at have et kæledyr, når man bor i en lejlighed.',
        'Weigh the advantages and disadvantages of having a pet when you live in a flat, give reasons for your views, and make this about half of your answer.',
      ),
    ],
    minWords: 200,
    slots: {
      intro: {
        hint: 'Say that the diagram shows the share of Danes in five age groups (from 18–29 to 75 and over) who have a dog or a cat, in 2015 and 2024. Keep the numbers for the next paragraph.',
        starters: [
          { da: 'Diagrammet viser, hvor stor en andel af danskerne der har hund eller kat, fordelt på …', en: 'The diagram shows what share of Danes have a dog or a cat, broken down by …' },
          { da: 'Tallene dækker fem aldersgrupper og sammenligner 2015 med …', en: 'The figures cover five age groups and compare 2015 with …' },
        ],
      },
      features: {
        hint: 'Three trends: pet ownership rose in every age group; the biggest jump is among 18–29-year-olds, where the share almost doubled (14 → 27 %); and pets are still most common among 30–59-year-olds (around 40 %), while the oldest group barely changed (17 → 18 %).',
        starters: [
          { da: 'Det mest iøjnefaldende er, at andelen er steget i …', en: 'The most striking thing is that the share has risen in …' },
          { da: 'Størst er stigningen blandt de 18–29-årige, hvor andelen næsten er fordoblet fra …', en: 'The rise is biggest among the 18–29-year-olds, where the share has almost doubled from …' },
          { da: 'Kæledyr er dog stadig mest udbredt hos …', en: 'Pets are, however, still most common among …' },
          { da: 'Hos de ældste over 75 år har andelen derimod næsten ikke …', en: 'Among the oldest, over 75, on the other hand, the share has hardly …' },
        ],
      },
      causes: {
        hint: 'Why young people in particular: many live alone and a pet gives company and routine; dogs and cats are highly visible on social media; the corona years made many people want a pet at home. Add why 30–59-year-olds lead (children, more space, a house) and why the oldest hold back (afraid they cannot look after the animal).',
        starters: [
          { da: 'En af grundene til, at flere unge har fået kæledyr, kan være, at mange af dem bor …', en: 'One reason more young people have pets may be that many of them live …' },
          { da: 'For det andet er hunde og katte blevet meget synlige på …', en: 'Secondly, dogs and cats have become very visible on …' },
          { da: 'At de 30–59-årige har flest dyr, skyldes sandsynligvis, at …', en: 'That the 30–59-year-olds have the most pets is probably because …' },
        ],
      },
      pros: {
        hint: 'Advantages of a pet in a flat: company and less loneliness, a dog gets you out walking every day, you get talking to neighbours, and children learn responsibility. A cat or a small dog can manage fine in a small home.',
        starters: [
          { da: 'En klar fordel ved at have et kæledyr er, at man får selskab, og at …', en: 'A clear advantage of having a pet is that you get company and that …' },
          { da: 'En hund sørger desuden for, at man kommer ud at gå …', en: 'A dog also makes sure that you get out walking …' },
          { da: 'Når man lufter hunden, falder man let i snak med …', en: 'When you walk the dog, you easily get talking to …' },
        ],
      },
      cons: {
        hint: 'Disadvantages: little space, a dog left alone all day may bark and disturb the whole stairwell, the costs (food, vet, insurance), being tied down at holidays, allergies, and housing associations that restrict or ban pets.',
        starters: [
          { da: 'På den anden side er pladsen i en lejlighed ofte …', en: 'On the other hand, the space in a flat is often …' },
          { da: 'En hund, der er alene hjemme hele dagen, kan …', en: 'A dog that is home alone all day can …' },
          { da: 'Et dyr koster desuden mange penge til …', en: 'An animal also costs a lot of money for …' },
          { da: 'Mange boligforeninger har desuden regler om …', en: 'Many housing associations also have rules about …' },
        ],
      },
      opinion: {
        hint: 'Take a clear side, e.g. a cat or a small dog is fine in a flat if you have time for it, but a big dog that is alone eight hours a day is not fair to the animal or the neighbours. Say why your strongest argument weighs more.',
        starters: [
          { da: 'Efter min mening opvejer fordelene ulemperne, hvis …', en: 'In my opinion the advantages outweigh the disadvantages if …' },
          { da: 'Personligt synes jeg, at en kat eller en lille hund …', en: 'Personally, I think a cat or a small dog …' },
          { da: 'Derfor bør man efter min mening tænke sig grundigt om, før …', en: 'That is why, in my opinion, you should think carefully before …' },
        ],
      },
      conclusion: {
        hint: 'In one or two sentences: more Danes, especially young people, have pets, and on balance you think a pet in a flat is a good idea under the conditions you named. No new arguments.',
        starters: [
          { da: 'Alt i alt viser diagrammet, at kæledyr er blevet mere populære, især blandt …', en: 'All in all, the diagram shows that pets have become more popular, especially among …' },
          { da: 'Samlet set mener jeg, at et kæledyr i en lejlighed er en god idé, så længe …', en: 'Overall, I think a pet in a flat is a good idea as long as …' },
        ],
      },
    },
    tips: [
      {
        title: 'The causes bullet is about the young',
        text: 'The causes bullet asks why "især de unge" got more pets, so lead with the 18–29-year-olds (14 → 27 %). You can add a sentence on why the 30–59-year-olds have the most, but don\'t spend the paragraph on every age group.',
      },
      {
        title: 'The table shows ages, not families',
        text: 'The table has no column for families with children, so don\'t write "familier med børn har flest dyr" as a fact. Infer it: "At de 30–59-årige har flest dyr, skyldes sandsynligvis, at mange af dem har børn."',
      },
      {
        title: 'Keep the flat in the evaluation',
        text: 'The bullet is not "pets: good or bad" but pets "når man bor i en lejlighed". Tie at least one argument on each side to flat life: space, neighbours, the stairwell, house rules.',
      },
      {
        title: 'en hund, et dyr, et kæledyr',
        text: '"Dyr" and "kæledyr" are et-words: "et dyr", "dyret", plural "dyr" (no ending). "Hund" and "kat" are en-words: "hunden", "katten", plural "hunde", "katte".',
      },
    ],
    words: [
      { da: 'et kæledyr (kæledyr, kæledyrene)', en: 'a pet' },
      { da: 'at anskaffe sig et dyr', en: 'to get (acquire) an animal' },
      { da: 'at lufte hunden', en: 'to walk the dog' },
      { da: 'at gå tur med hunden', en: 'to take the dog for a walk' },
      { da: 'et selskab', en: 'company' },
      { da: 'en ensomhed', en: 'loneliness' },
      { da: 'en dyrlæge', en: 'a vet' },
      { da: 'et foder', en: 'animal feed' },
      { da: 'en boligforening', en: 'a housing association' },
      { da: 'en opgang', en: 'a stairwell (the flats sharing one staircase)' },
      { da: 'at genere naboerne', en: 'to disturb the neighbours' },
      { da: 'at være bundet', en: 'to be tied down' },
      { da: 'at tage ansvar for', en: 'to take responsibility for' },
      { da: 'at være udbredt', en: 'to be widespread' },
    ],
  },
  {
    id: 'wsim-d2a-5',
    type: 'd2a-diagram',
    title: 'Højskoleophold',
    origin: 'simulated',
    intro:
      'Folkehøjskolerne er en gammel dansk tradition, hvor man bor på skolen og følger fag uden eksamen. Diagrammet viser, hvor mange kursister der har været på lange kurser på højskolerne fra 2014 til 2024, og hvor stor en del af dem der var under 25 år. Skriv en tekst på mindst 200 ord, hvor du besvarer alle tre punkter.',
    table: {
      caption: 'Kursister på lange kurser (mindst 12 uger) på folkehøjskolerne',
      columns: ['År', 'Antal kursister', 'Heraf under 25 år (%)'],
      rows: [
        ['2014', '9.600', '70'],
        ['2016', '10.200', '72'],
        ['2018', '10.900', '75'],
        ['2020', '8.700', '77'],
        ['2022', '12.300', '80'],
        ['2024', '13.400', '82'],
      ],
      source: SOURCE,
      note: NOTE,
    },
    bullets: [
      describe,
      causes(
        'Fortæl, hvilke årsager der kan være til den udvikling, diagrammet viser.',
        'Suggest possible reasons for the development the diagram shows.',
      ),
      evaluateWhether(
        'det er en god idé, at unge tager på højskole, før de begynder på en uddannelse.',
        'Judge whether it is a good idea for young people to go to a folk high school before they start further education — reach a clear yes or no, give reasons, and make this about half of your answer.',
      ),
    ],
    minWords: 200,
    slots: {
      intro: {
        hint: 'Say that the diagram shows the number of students on long courses (at least 12 weeks) at the folk high schools every second year from 2014 to 2024, and the share of them under 25.',
        starters: [
          { da: 'Diagrammet viser, hvor mange kursister der har været på lange kurser på folkehøjskolerne i perioden fra …', en: 'The diagram shows how many students have been on long courses at the folk high schools in the period from …' },
          { da: 'Desuden viser det, hvor stor en del af kursisterne der var under …', en: 'It also shows what share of the students were under …' },
        ],
      },
      features: {
        hint: 'Two trends and one exception: the number rose from about 9,600 to 13,400 (roughly 40 % more), and the students got younger (under-25s from 70 to 82 %). The exception is the dip in 2020 (8,700), after which the number jumped to a record in 2022.',
        starters: [
          { da: 'Overordnet er antallet af kursister steget fra cirka 9.600 til …', en: 'Overall, the number of students has risen from about 9,600 to …' },
          { da: 'Udviklingen har dog ikke været jævn: I 2020 faldt tallet …', en: 'The development has not been even, though: in 2020 the figure fell …' },
          { da: 'Samtidig er kursisterne blevet yngre, idet andelen under 25 år …', en: 'At the same time, the students have become younger, as the share under 25 …' },
        ],
      },
      causes: {
        hint: 'The 2020 dip: corona lockdowns closed the schools for periods. The jump afterwards: young people missed community after the isolation. The overall rise and younger students: pressure and stress in upper secondary school, uncertainty about which education to choose, and the wish for a break before a long course of study.',
        starters: [
          { da: 'Faldet i 2020 skyldes sandsynligvis, at …', en: 'The fall in 2020 is probably because …' },
          { da: 'Den efterfølgende stigning kan hænge sammen med, at mange unge …', en: 'The rise that followed may be connected with the fact that many young people …' },
          { da: 'Desuden oplever mange unge et stort pres i gymnasiet, og …', en: 'Moreover, many young people experience great pressure in upper secondary school, and …' },
        ],
      },
      pros: {
        hint: 'Arguments for answering yes: a stay lets you try new subjects and find out what you want, so fewer choose the wrong education and drop out later; you mature, learn to live with others and take responsibility; and you get a real break after gymnasiet.',
        starters: [
          { da: 'Der er gode argumenter for. På et højskoleophold kan man …', en: 'There are good arguments in favour. On a folk high school stay you can …' },
          { da: 'Dermed vælger man måske ikke den forkerte uddannelse, og …', en: 'That way you may not choose the wrong education, and …' },
          { da: 'Man lærer også at leve tæt sammen med andre og …', en: 'You also learn to live closely with others and …' },
        ],
      },
      cons: {
        hint: 'Arguments for answering no: a stay costs money, it delays education and working life (and so income and pension savings), some young people already know what they want, and for some it is more a long party than a clarifying break.',
        starters: [
          { da: 'Imod taler, at et ophold koster penge, og at …', en: 'Against it is the fact that a stay costs money and that …' },
          { da: 'Nogle unge ved desuden allerede, hvad de vil, og for dem …', en: 'Some young people also already know what they want, and for them …' },
          { da: 'Man kommer også senere i gang med …', en: 'You also get started later with …' },
        ],
      },
      opinion: {
        hint: '"Vurdér, om" wants a clear ja or nej. E.g. yes for most young people, because half a year is short in a long working life and a better choice of education saves time and money, but as an offer, not a requirement. Or no, if you think the delay costs too much. Say it in plain words.',
        starters: [
          { da: 'Jeg mener alligevel, at det er en god idé for de fleste unge, fordi …', en: 'I still think it is a good idea for most young people, because …' },
          { da: 'Mit svar er derfor ja, men …', en: 'My answer is therefore yes, but …' },
          { da: 'Et halvt år er kort tid i et langt arbejdsliv, og …', en: 'Half a year is a short time in a long working life, and …' },
        ],
      },
      conclusion: {
        hint: 'Sum up: more and younger people go to folk high school, and restate your yes or no in one sentence. No new arguments.',
        starters: [
          { da: 'Alt i alt viser diagrammet, at flere og flere unge vælger et højskoleophold, og …', en: 'All in all, the diagram shows that more and more young people choose a folk high school stay, and …' },
          { da: 'Samlet set er mit svar derfor, at …', en: 'Overall, my answer is therefore that …' },
        ],
      },
    },
    tips: [
      {
        title: '"Vurdér, om …" needs a verdict',
        text: 'This bullet asks whether it is a good idea, so a neutral list of pros and cons is not enough. Weigh arguments on both sides, then answer clearly: "Mit svar er derfor ja/nej, fordi …".',
      },
      {
        title: 'Don\'t miss the second column',
        text: 'The table has two measures: the number of students and the share under 25. A good description mentions both. The students got more numerous and younger.',
      },
      {
        title: 'Explain the dip, not just the rise',
        text: 'The fall to 8.700 in 2020 is the one break in the trend. Name it in the description and give a cause (the corona lockdowns). That shows you read the diagram rather than just copying it.',
      },
      {
        title: 'Danish number format',
        text: 'Danish uses a full stop for thousands and a comma for decimals: 13.400 kursister, 1,5 år. Write "cirka 40 % flere", not "40 % mere kursister". Countable nouns take "flere", not "mere".',
      },
    ],
    words: [
      { da: 'en folkehøjskole', en: 'a folk high school' },
      { da: 'et højskoleophold', en: 'a stay at a folk high school' },
      { da: 'en kursist', en: 'a student on a course (adult education)' },
      { da: 'et langt kursus (lange kurser)', en: 'a long course' },
      { da: 'et fællesskab', en: 'a community, togetherness' },
      { da: 'at tage på højskole', en: 'to go to a folk high school' },
      { da: 'at træffe et valg', en: 'to make a choice' },
      { da: 'at brænde for noget', en: 'to be passionate about something' },
      { da: 'et pres', en: 'pressure' },
      { da: 'et sabbatår', en: 'a gap year' },
      { da: 'en videregående uddannelse', en: 'higher education' },
      { da: 'et studieskift', en: 'a change of study programme' },
      { da: 'at komme i gang med', en: 'to get started with' },
      { da: 'en nedlukning', en: 'a lockdown' },
    ],
  },
  {
    id: 'wsim-d2a-6',
    type: 'd2a-diagram',
    title: 'Biblioteket',
    origin: 'simulated',
    intro:
      'De danske folkebiblioteker har ændret sig meget, og mange holder nu åbent uden personale om aftenen og i weekenden. Diagrammet viser, hvad de besøgende brugte biblioteket til i 2015 og 2024. Skriv en tekst på mindst 200 ord, hvor du besvarer alle tre punkter.',
    table: {
      caption: 'Hvad bruger de besøgende biblioteket til? Andel af de besøgende, der nævner formålet (%)',
      columns: ['Formål', '2015', '2024'],
      rows: [
        ['Låne bøger', '78', '61'],
        ['Studere eller arbejde', '22', '38'],
        ['Gå til arrangementer (foredrag, koncerter, børneteater)', '15', '29'],
        ['Bruge computer eller printer', '31', '14'],
        ['Mødes med andre', '9', '19'],
      ],
      source: SOURCE,
      note: `${NOTE} De besøgende kunne nævne flere formål, så tallene giver ikke 100 % tilsammen.`,
    },
    bullets: [
      describe,
      causes(
        'Fortæl, hvilke årsager der kan være til, at biblioteket bruges på en ny måde.',
        'Suggest why people now use the library in different ways than before.',
      ),
      evaluateProsCons(
        ', at bibliotekerne holder åbent uden personale om aftenen og i weekenden.',
        'Weigh the advantages and disadvantages of libraries opening without staff in the evenings and at weekends, give reasons for your views, and make this about half of your answer.',
      ),
    ],
    minWords: 200,
    slots: {
      intro: {
        hint: 'Say that the diagram shows what visitors used the library for in 2015 and 2024, across five purposes, and that visitors could name more than one purpose.',
        starters: [
          { da: 'Diagrammet viser, hvad de besøgende bruger biblioteket til, og sammenligner 2015 med …', en: 'The diagram shows what visitors use the library for and compares 2015 with …' },
          { da: 'De besøgende kunne nævne flere formål, så …', en: 'Visitors could name several purposes, so …' },
        ],
      },
      features: {
        hint: 'The library is changing role. Borrowing books is still the most common purpose but fell from 78 to 61 %, and computer and printer use more than halved (31 → 14 %). Meanwhile studying or working, events and meeting others all nearly doubled. The library has become a place to be, not just to borrow.',
        starters: [
          { da: 'Det mest iøjnefaldende er, at biblioteket er ved at skifte rolle: …', en: 'The most striking thing is that the library is changing its role: …' },
          { da: 'At låne bøger er stadig det mest almindelige formål, men andelen er faldet fra …', en: 'Borrowing books is still the most common purpose, but the share has fallen from …' },
          { da: 'Brugen af computere og printere er mere end …', en: 'The use of computers and printers has more than …' },
          { da: 'Til gengæld kommer langt flere for at …', en: 'On the other hand, far more people come to …' },
        ],
      },
      causes: {
        hint: 'Most people now own a computer and printer, and many read e-books or listen to audiobooks at home. Students lack quiet places to study, and many libraries have turned into cultural centres with talks, concerts and cafés, which draws people who want to meet others.',
        starters: [
          { da: 'En oplagt forklaring er, at de fleste i dag har deres egen …', en: 'An obvious explanation is that most people today have their own …' },
          { da: 'Mange læser desuden e-bøger eller lytter til lydbøger, så …', en: 'Many also read e-books or listen to audiobooks, so …' },
          { da: 'Samtidig mangler mange studerende et roligt sted at …', en: 'At the same time, many students lack a quiet place to …' },
          { da: 'Flere biblioteker er blevet til kulturhuse med …', en: 'Several libraries have become cultural centres with …' },
        ],
      },
      pros: {
        hint: 'Advantages of unstaffed opening hours: the library is open when people are off work, so students, working adults and families can use it when it suits them; it is far cheaper for the municipality than paying staff for extra hours; and it shows trust in the users.',
        starters: [
          { da: 'En klar fordel er, at biblioteket bliver tilgængeligt, når …', en: 'A clear advantage is that the library becomes accessible when …' },
          { da: 'Desuden er det billigere for kommunen end at …', en: 'Moreover, it is cheaper for the municipality than to …' },
          { da: 'Studerende og børnefamilier kan på den måde …', en: 'In this way students and families with children can …' },
        ],
      },
      cons: {
        hint: 'Disadvantages: nobody can help you find a book or use the self-service machines, which especially hits older people and those not used to technology; some feel unsafe with no staff present; there is a risk of vandalism and noise; and it may replace staffed hours and jobs.',
        starters: [
          { da: 'Omvendt får man ingen hjælp til at …', en: 'On the other hand, you get no help to …' },
          { da: 'Det rammer især ældre og folk, der ikke er vant til …', en: 'This hits older people in particular, and people who are not used to …' },
          { da: 'Nogle føler sig også utrygge, når der ikke er …', en: 'Some people also feel unsafe when there are no …' },
          { da: 'Der er desuden en risiko for, at kommunen sparer på …', en: 'There is also a risk that the municipality cuts back on …' },
        ],
      },
      opinion: {
        hint: 'Take a clear side, e.g. for unstaffed hours as an extra, as long as there are still staffed hours in the daytime for people who need help. Or against, if you think the library loses its role as a place with guidance. Say why your strongest argument weighs more.',
        starters: [
          { da: 'Efter min mening opvejer fordelene ulemperne, så længe …', en: 'In my opinion the advantages outweigh the disadvantages as long as …' },
          { da: 'Det vigtigste for mig er, at biblioteket er et sted for alle, og derfor …', en: 'The most important thing for me is that the library is a place for everyone, and that is why …' },
          { da: 'Personligt synes jeg dog, at der stadig bør være …', en: 'Personally, though, I think there should still be …' },
        ],
      },
      conclusion: {
        hint: 'Sum up: the library has gone from a place to borrow books to a place to be, and restate whether you think unstaffed opening hours are a good idea and on what condition. No new arguments.',
        starters: [
          { da: 'Alt i alt viser diagrammet, at biblioteket er gået fra at være et sted, hvor man låner bøger, til …', en: 'All in all, the diagram shows that the library has gone from being a place where you borrow books to …' },
          { da: 'Samlet set synes jeg, at de længere åbningstider er …', en: 'Overall, I think the longer opening hours are …' },
        ],
      },
    },
    tips: [
      {
        title: 'Find the shift, not the five numbers',
        text: 'The key point is a change of role: the "borrow" purposes fall (books, computer and printer), while the "be there" purposes rise (studying, events, meeting others). Say that in one sentence, then pick one or two figures as proof.',
      },
      {
        title: 'The percentages do not add up to 100',
        text: 'Visitors could name several purposes, so never write that "61 % of the visitors borrow books and the rest study". Compare each purpose with itself over time instead.',
      },
      {
        title: 'The evaluation is about staff, not about libraries in general',
        text: 'The bullet asks about opening "uden personale". Arguments like "libraries are good for children" miss the point unless you tie them to self-service hours: who gains from the longer hours, and who loses the help of a librarian?',
      },
      {
        title: 'biblioteket er åbent',
        text: '"Bibliotek" is an et-word, so the adjective takes -t: "biblioteket er åbent", "et nyt bibliotek". Also "holde åbent" (stay open) always has -t: "Biblioteket holder åbent til kl. 22."',
      },
    ],
    words: [
      { da: 'et folkebibliotek', en: 'a public library' },
      { da: 'en bibliotekar', en: 'a librarian' },
      { da: 'at låne en bog', en: 'to borrow a book' },
      { da: 'en e-bog, en lydbog', en: 'an e-book, an audiobook' },
      { da: 'et arrangement', en: 'an event' },
      { da: 'et foredrag', en: 'a talk, a lecture' },
      { da: 'et kulturhus', en: 'a cultural centre' },
      { da: 'at holde åbent', en: 'to stay open' },
      { da: 'åbningstider', en: 'opening hours' },
      { da: 'selvbetjening', en: 'self-service' },
      { da: 'at være tilgængelig', en: 'to be accessible' },
      { da: 'at føle sig utryg', en: 'to feel unsafe' },
      { da: 'hærværk', en: 'vandalism' },
      { da: 'at skifte rolle', en: 'to change role' },
    ],
  },
];

export const GRADED_D2A_EXTRA: GradedAnswer[] = [
  // ───────────── wsim-d2a-4 Kæledyr ─────────────
  {
    id: 'wgr-d2a-4-12',
    taskId: 'wsim-d2a-4',
    band: '12',
    origin: 'illustrative',
    text: `Diagrammet viser, hvor stor en andel af danskerne i fem aldersgrupper der havde hund eller kat i 2015 og i 2024.

Det mest iøjnefaldende er, at andelen er steget i alle aldersgrupper. Størst er stigningen blandt de 18–29-årige, hvor andelen næsten er fordoblet fra 14 til 27 %. Kæledyr er dog stadig mest udbredt hos de 30–59-årige, mens de ældste kun har oplevet en lille stigning.

Der kan være flere årsager til udviklingen. For det første bor mange unge alene, og et dyr kan give selskab og struktur i hverdagen. For det andet er kæledyr blevet meget synlige på sociale medier. At de 30–59-årige har flest dyr, skyldes sandsynligvis, at mange af dem har børn og mere plads.

Det har både fordele og ulemper at have et kæledyr i en lejlighed. En hund sørger for, at man kommer ud at gå hver dag, og både hunde og katte kan mindske ensomhed. Desuden falder man let i snak med naboerne, når man lufter hunden. Omvendt er pladsen ofte trang, og en hund, der er alene hjemme i otte timer, kan gø og genere hele opgangen. Et dyr koster også mange penge til foder, dyrlæge og forsikring, og man er bundet, når man skal på ferie.

Efter min mening er en kat eller en lille hund et godt valg i en lejlighed, hvis man har tid til dyret. Alt i alt mener jeg derfor, at fordelene opvejer ulemperne, men kun hvis man tænker sig grundigt om, før man anskaffer sig et dyr.`,
    summary:
      'A top-band answer: the description picks out three trends, the causes are reasoned rather than invented as facts, and a balanced evaluation tied to flat life fills about half the text.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'All three bullets are answered in order. The description names the general rise, the near-doubling among 18–29-year-olds and the stable oldest group without copying the table. The causes focus on the young, as the bullet asks, and "skyldes sandsynligvis, at mange af dem har børn" infers rather than invents. The evaluation (about 130 of ~250 words, ≈ 50 %) gives three advantages, three disadvantages tied to the flat ("hele opgangen"), a conditional own view and a summing-up.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'One paragraph per bullet plus a short conclusion. Causes are signposted with "For det første … For det andet", the evaluation turns with "Omvendt", and "Alt i alt mener jeg derfor" rounds off. Neutral, factual register throughout.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Near-flawless and idiomatic: "falder man let i snak med", "lufter hunden", "man er bundet", "anskaffer sig et dyr". Correct inversion after fronted elements ("Størst er stigningen", "Desuden falder man", "Omvendt er pladsen") and correct agreement ("meget synlige" with plural "kæledyr").',
      },
    ],
    annotations: [
      {
        quote: 'Størst er stigningen blandt de 18–29-årige',
        kind: 'good',
        note: 'Fronting "Størst" puts the key finding first, and the verb correctly comes before the subject.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'næsten er fordoblet fra 14 til 27 %',
        kind: 'good',
        note: 'Gives the trend in words ("fordoblet") and only the two numbers that prove it. "Næsten" correctly goes before the finite verb in the subordinate hvor-clause.',
      },
      {
        quote: 'At de 30–59-årige har flest dyr, skyldes sandsynligvis',
        kind: 'good',
        note: 'The table shows ages, not families, so "sandsynligvis" correctly marks a guess. The at-clause in the front slot is followed directly by the verb.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Desuden falder man let i snak med naboerne, når man lufter hunden.',
        kind: 'good',
        note: 'An idiomatic argument ("falde i snak med", "lufte hunden") with inversion after "Desuden".',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'kan gø og genere hele opgangen',
        kind: 'good',
        note: 'Ties the disadvantage to life in a flat, which is exactly what the bullet asks about. "Opgangen" is the precise word for the neighbours sharing a staircase.',
      },
      {
        quote: 'hvis man har tid til dyret',
        kind: 'good',
        note: 'A conditional own view is a real evaluation: it weighs the arguments instead of just listing them.',
      },
      {
        quote: 'Alt i alt mener jeg derfor',
        kind: 'good',
        note: 'A short sammenfatning that restates the view without adding new arguments.',
      },
    ],
  },
  {
    id: 'wgr-d2a-4-7',
    taskId: 'wsim-d2a-4',
    band: '7',
    origin: 'illustrative',
    text: `Diagrammet viser hvor mange danskere har hund eller kat i 2015 og 2024. Der er fem aldersgrupper.

Man kan se, at flere har kæledyr i 2024 end i 2015 i alle aldersgrupper. Den største stigning er hos de unge på 18–29 år, de er gået fra 14 % til 27 %. De 30–44-årige og de 45–59-årige har flest kæledyr, cirka 40 % og 37 %. De ældste har færrest dyr, kun 18 %.

Der er mange årsager til det. Mange unge bor alene i dag, og de føler sig ensom. En hund eller en kat er et godt selskab. Også på Instagram og TikTok man ser mange søde hunde, og så vil man have en selv. Familier med børn har mere plads i et hus, og børnene vil gerne have en dyr. De gamle har måske ikke kræfter til at gå tur med en hund, og de er bange for, at dyret lever længere end dem.

Der er fordele og ulemper ved at have et kæledyr i en lejlighed. En fordel er, at man får motion, fordi man skal gå tur med hunden. En anden fordel er, at man er ikke alene, når man kommer hjem. En ulempe er, at lejligheden er lille, og hunden kan gø, når man er på arbejde. En anden ulempe er, at det er dyrt med dyrlæge og mad.

Jeg synes, at det er en god idé at have en kat i en lejlighed, fordi en kat godt kan være alene. Derfor jeg mener, at man skal tænke over det.`,
    summary:
      'A solid middle answer: every bullet is covered and the meaning is always clear, but the evaluation is a list of one-line points, the own view is thin, and word-order and ending errors recur.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'All three bullets are answered. The description finds the main trends ("flere har kæledyr … i alle aldersgrupper", the biggest rise among the young). The causes paragraph is good and covers several age groups. But the evaluation is only about 100 of ~255 words (≈ 40 %): two advantages and two disadvantages of one sentence each, and the own view ("fordi en kat godt kan være alene") is not weighed against the disadvantages. "Derfor jeg mener, at man skal tænke over det" is not a real conclusion.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Clear paragraphing, but the evaluation is a mechanical chain: "En fordel er … En anden fordel er … En ulempe er … En anden ulempe er". The sentence "de er gået fra 14 % til 27 %" says the young people went from 14 to 27 %, not their share.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Adequate range ("har ikke kræfter til", "et godt selskab"), but recurring slips: a missing "der" in the opening hv-clause, no inversion after "Også på Instagram og TikTok" and "Derfor", "ikke" after the verb in an at-clause, "en dyr" for "et dyr", and "ensom" without the plural ending. None of it blocks understanding.',
      },
    ],
    annotations: [
      {
        quote: 'Diagrammet viser hvor mange danskere har hund eller kat',
        kind: 'error',
        note: 'When the hv-word itself is (part of) the subject of the subordinate clause, Danish adds "der". There is also a comma before the hv-clause.',
        fix: 'Diagrammet viser, hvor mange danskere der har hund eller kat',
      },
      {
        quote: 'de føler sig ensom',
        kind: 'error',
        note: 'The adjective agrees with the plural subject "de".',
        fix: 'de føler sig ensomme',
      },
      {
        quote: 'Også på Instagram og TikTok man ser',
        kind: 'error',
        note: 'The fronted place expression takes the front slot, so the verb must come before the subject.',
        fix: 'På Instagram og TikTok ser man også',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'en dyr',
        kind: 'error',
        note: '"Dyr" is an et-word: "et dyr", "dyret".',
        fix: 'et dyr',
      },
      {
        quote: 'at man er ikke alene',
        kind: 'error',
        note: 'In an at-clause, "ikke" goes before the finite verb.',
        fix: 'at man ikke er alene',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'En anden ulempe er, at det er dyrt med dyrlæge og mad.',
        kind: 'style',
        note: 'The fourth "En … er" in a row. Vary the links ("Omvendt …", "Desuden …") and develop one point: what does it mean for your budget or your holidays?',
        fix: 'Desuden koster et dyr mange penge til foder og dyrlæge, og man er bundet, når man skal på ferie.',
      },
      {
        quote: 'Derfor jeg mener',
        kind: 'error',
        note: '"Derfor" takes the front slot, so the verb comes next.',
        fix: 'Derfor mener jeg',
        ruleId: 'v2-inversion',
      },
    ],
  },
  {
    id: 'wgr-d2a-4-4',
    taskId: 'wsim-d2a-4',
    band: '4',
    origin: 'illustrative',
    text: `Diagrammet er om kæledyr i Danmark i 2015 og 2024. I 2015 18–29 år havde 14 % og i 2024 de havde 27 %. 30–44 år havde 33 % i 2015 og 40 % i 2024. 45–59 år havde 35 % og 37 %. 60–74 år havde 26 % og 31 %. Over 75 år havde 17 % og 18 %. Så alle tal er mere stor i 2024.

Der er nogen årsager. Unge mennesker har ikke kæreste og børn, så de køber en hund. Hunde er meget søde og det er hyggelig at have en. I corona tid mange folk var hjemme og de ville have en dyr. Familier har også mange dyr fordi børn elsker dyr. Gamle mennesker kan ikke gå så meget.

Jeg synes det er godt at have kæledyr i lejlighed. Man er ikke alene når man kommer hjem fra arbejde, hunden er altid glad for at se dig. Man skal gå tur hver dag og det er sundt. Min nabo har en hund og han er altid i godt humør. Børn lærer også at tage ansvar for et dyr. Men det koster nogen penge. Derfor jeg synes alle skal have et kæledyr hvis de kan.`,
    summary:
      'A just-passing answer: the description reads out every number, the evaluation is one-sided and never mentions the flat, and word-order and ending errors are frequent.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The description copies the table row by row and only reaches a trend in the last sentence; the big rise among the young is never pointed out. The causes are relevant but thin. The evaluation (about 75 of ~200 words, ≈ 37 %) lists only advantages plus "Men det koster nogen penge", so "fordele og ulemper" is only half answered, the flat is not discussed, and "alle skal have et kæledyr" overstates the case with no summing-up.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Paragraphs follow the bullets, but sentences are short and joined with "og" or a comma splice ("…fra arbejde, hunden er altid glad"). The text switches from "man" to "dig" in the same sentence. Few linking words beyond "også" and "Derfor".',
      },
      {
        criterion: 'linguistic',
        comment:
          'Simple, repetitive vocabulary ("havde … og …" five times). Frequent errors: missing inversion ("I 2015 18–29 år havde", "i 2024 de havde", "I corona tid mange folk var", "Derfor jeg synes"), "mere stor", "hyggelig" for "hyggeligt", "en dyr". The meaning still comes through.',
      },
    ],
    annotations: [
      {
        quote: '30–44 år havde 33 % i 2015 og 40 % i 2024. 45–59 år havde 35 % og 37 %.',
        kind: 'style',
        note: '"Beskriv kort hovedtrækkene" means the trends. Reading out every cell uses words the evaluation needs, and the most important point (the young almost doubled) gets lost.',
        fix: 'Andelen er steget i alle aldersgrupper, og størst er stigningen blandt de 18–29-årige, hvor den næsten er fordoblet.',
      },
      {
        quote: 'i 2024 de havde',
        kind: 'error',
        note: 'After a fronted time expression the verb comes before the subject.',
        fix: 'i 2024 havde de',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'mere stor',
        kind: 'error',
        note: '"Stor" has an irregular comparative: "større". "Mere" is only for long adjectives.',
        fix: 'større',
      },
      {
        quote: 'det er hyggelig at have en',
        kind: 'error',
        note: 'After "det er" the adjective takes the neuter -t form.',
        fix: 'det er hyggeligt at have en',
      },
      {
        quote: 'I corona tid mange folk var hjemme',
        kind: 'error',
        note: '"Under corona" is the natural phrase, and the fronted time expression must be followed by the verb.',
        fix: 'Under corona var mange mennesker hjemme',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Men det koster nogen penge.',
        kind: 'style',
        note: 'The only disadvantage, with no development, so the evaluation is one-sided. It also never mentions the flat (space, neighbours). And with an uncountable noun it is "nogle penge" or just "penge".',
        fix: 'Men et dyr koster mange penge, og i en lille lejlighed kan en hund, der er alene hele dagen, genere naboerne.',
      },
      {
        quote: 'Derfor jeg synes',
        kind: 'error',
        note: '"Derfor" in the front slot must be followed by the verb.',
        fix: 'Derfor synes jeg',
        ruleId: 'v2-inversion',
      },
    ],
  },
  {
    id: 'wgr-d2a-4-02',
    taskId: 'wsim-d2a-4',
    band: '02',
    origin: 'illustrative',
    text: `Diagram viser kæledyr i Danmark, hund og kat. Det er om 2015 og 2024. Alle har mere kæledyr i 2024. Unge mennesker 18–29 år har 27 % i 2024, i 2015 de har 14 %. Det er meget mere. 30–44 år har mest, 40 %. Gamle mennesker over 75 år har ikke så mange, kun 18 %.

Hvorfor flere unge har kæledyr? Jeg tror de er ensom fordi de bor alene og de har ikke familie i byen. Hund er god ven og den er altid glad. Også på Instagram der er mange billeder med hunde og katte og unge vil også have det. I corona alle var hjemme og kede sig, så de købte hund. Familie med børn har have og stor hus så det er nemt. Gamle mennesker de kan ikke gå tur hver dag og de har ikke penge. I mit land det er anderledes, mange folk har hund men hunden bor udenfor i haven og ikke i huset. Jeg havde også en hund da jeg var lille, den hed Max og den var meget sød og min far gik tur med den hver morgen.

Kæledyr i lejlighed er godt fordi man er ikke alene. Men det er lidt dyrt og lejlighed er lille. Det er min mening.`,
    summary:
      'A bare pass: about 200 understandable words, but the evaluation is three short sentences, the causes drift into a childhood story, and there are errors in almost every sentence.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The description and causes are there, and the young people\'s rise is noticed ("Det er meget mere"). But the evaluation is only about 25 of ~210 words, far from 50 %: one advantage, two disadvantages named in four words each, no own view with a reason and no summing-up. The paragraph about "mit land" and the dog Max is off the task and uses words the evaluation needed.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Three paragraphs matching the bullets, but sentences are chained with "og … og … og" and commas. "Det er min mening." does not sum anything up. The opening question "Hvorfor flere unge har kæledyr?" is a nice idea but has the wrong word order.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Basic vocabulary and errors in nearly every sentence: missing inversion ("i 2015 de har", "Også på Instagram der er", "I mit land det er"), "ikke" after the verb in a fordi-clause, wrong tense ("har" for 2015), "ensom" for "ensomme", "stor hus", "kede sig" for "kedede sig", missing definite forms ("Diagram", "lejlighed er lille"). A Danish reader can still follow it.',
      },
    ],
    annotations: [
      {
        quote: 'i 2015 de har 14 %',
        kind: 'error',
        note: 'Two problems: the fronted time expression needs inversion, and 2015 is in the past, so the verb should be in the past tense.',
        fix: 'i 2015 havde de 14 %',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Hvorfor flere unge har kæledyr?',
        kind: 'error',
        note: 'In a direct question the verb comes straight after the question word.',
        fix: 'Hvorfor har flere unge kæledyr?',
        ruleId: 'finit-verb-second',
      },
      {
        quote: 'Også på Instagram der er',
        kind: 'error',
        note: 'After the fronted place expression the verb comes before "der".',
        fix: 'På Instagram er der også',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'stor hus',
        kind: 'error',
        note: '"Hus" is an et-word, so the adjective takes -t: "et stort hus".',
        fix: 'et stort hus',
      },
      {
        quote: 'I mit land det er anderledes',
        kind: 'error',
        note: 'After "I mit land" in the front slot, the verb comes next.',
        fix: 'I mit land er det anderledes',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Jeg havde også en hund da jeg var lille, den hed Max',
        kind: 'style',
        note: 'A personal story that answers none of the bullets. Those words were needed for the evaluation, which should be about half the text.',
      },
      {
        quote: 'fordi man er ikke alene',
        kind: 'error',
        note: 'In a fordi-clause "ikke" goes before the finite verb.',
        fix: 'fordi man ikke er alene',
        ruleId: 'ikke-regel',
      },
    ],
  },

  // ───────────── wsim-d2a-5 Højskoleophold ─────────────
  {
    id: 'wgr-d2a-5-12',
    taskId: 'wsim-d2a-5',
    band: '12',
    origin: 'illustrative',
    text: `Diagrammet viser antallet af kursister på lange højskolekurser fra 2014 til 2024, og hvor stor en del af dem der var under 25 år.

Overordnet er antallet steget fra cirka 9.600 til 13.400, altså med omkring 40 %. Udviklingen har dog ikke været jævn: I 2020 faldt tallet markant, men allerede i 2022 lå det højere end nogensinde før. Samtidig er kursisterne blevet yngre, idet andelen under 25 år er vokset fra 70 til 82 %.

Faldet i 2020 skyldes sandsynligvis coronanedlukningen, hvor skolerne i perioder måtte lukke. Den efterfølgende stigning kan hænge sammen med, at mange unge efter isolationen savnede et fællesskab. Desuden oplever mange unge et stort pres i gymnasiet, og et højskoleophold giver en pause, inden de skal træffe vigtige valg om uddannelse.

Men bør unge tage på højskole, før de begynder på en uddannelse? Der er gode argumenter for. På et højskoleophold kan man prøve nye fag af og finde ud af, hvad man brænder for, og dermed vælger man måske ikke den forkerte uddannelse bagefter. Imod taler, at et ophold koster penge, og at den unge kommer senere i gang med uddannelse og arbejde. Nogle unge ved desuden allerede, hvad de vil, og for dem er et ekstra halvt år ikke nødvendigt.

Jeg mener alligevel, at det er en god idé for de fleste unge. Et halvt år er kort tid i et langt arbejdsliv, og et bedre uddannelsesvalg sparer både den unge og samfundet for omveje. Samlet set er mit svar derfor ja, men højskolen bør være et tilbud og ikke et krav.`,
    summary:
      'A top-band answer: it covers both measures in the table and the 2020 dip, explains the dip and the rise, and answers "Vurdér, om" with a reasoned, clearly stated yes.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'All three bullets are answered. The description covers both columns (more students, and younger ones) and the 2020 exception, with rounded figures ("omkring 40 %"). The causes explain both the dip and the rise. The evaluation (about 130 of ~260 words, ≈ 50 %) weighs arguments for and against and, as "Vurdér, om" requires, ends in a clear verdict: "mit svar derfor ja", with a condition.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'The rhetorical question "Men bør unge tage på højskole …?" neatly opens the evaluation, and "Der er gode argumenter for … Imod taler" structures it. "Jeg mener alligevel" shows that the writer has weighed the counter-arguments. "Samlet set" rounds off.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Precise, varied vocabulary ("jævn", "idet", "savnede et fællesskab", "brænder for", "sparer … for omveje"). Correct inversion ("Overordnet er antallet", "dermed vælger man") and correct adverb placement in subordinate clauses ("hvor skolerne i perioder måtte lukke").',
      },
    ],
    annotations: [
      {
        quote: 'Overordnet er antallet steget fra cirka 9.600 til 13.400, altså med omkring 40 %.',
        kind: 'good',
        note: 'Opens with the overall trend and turns the two numbers into a rounded percentage. Inversion after "Overordnet" is correct.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Udviklingen har dog ikke været jævn',
        kind: 'good',
        note: 'Points out the one break in the trend (2020) instead of ignoring it.',
      },
      {
        quote: 'idet andelen under 25 år er vokset fra 70 til 82 %',
        kind: 'good',
        note: 'Uses the second column too. "Idet" is a precise, formal link meaning "since / in that".',
      },
      {
        quote: 'Men bør unge tage på højskole, før de begynder på en uddannelse?',
        kind: 'good',
        note: 'Repeats the evaluation question as a heading-like question, which makes it clear that this is a "Vurdér, om" bullet needing a verdict.',
      },
      {
        quote: 'Imod taler, at et ophold koster penge',
        kind: 'good',
        note: 'An elegant way to bring in counter-arguments: the at-clause is the subject, so "Imod" takes the front slot and the verb follows.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Samlet set er mit svar derfor ja',
        kind: 'good',
        note: 'Answers the "om" question directly. Many answers forget to say yes or no.',
      },
    ],
  },
  {
    id: 'wgr-d2a-5-7',
    taskId: 'wsim-d2a-5',
    band: '7',
    origin: 'illustrative',
    text: `Diagrammet viser antallet af kursister på lange kurser på højskolerne fra 2014 til 2024, og hvor mange af dem er under 25 år.

Man kan se, at antallet er steget fra 9.600 i 2014 til 13.400 i 2024. I 2020 der var et fald til 8.700, men efter 2020 tallet steg meget. Andelen af unge under 25 år er også steget hele tiden, fra 70 % til 82 %. Så kursisterne bliver yngre og yngre.

Der er flere årsager til udviklingen. I 2020 var der corona, og mange skoler var lukket, derfor kom der færre kursister. Efter corona mange unge ville gerne være sammen med andre, fordi de havde været alene hjemme længe. Mange unge er også stressede efter gymnasiet, og de vil have en pause. Desuden er højskolerne blevet populært på sociale medier.

Er det en god idé at tage på højskole før uddannelse? Jeg synes ja. På højskolen kan man finde ud af, hvad man vil studere. Man får også nye venner, og man lærer at bo sammen med andre mennesker. Men det koster penge, og man begynder senere på uddannelsen, så man får løn senere.

Jeg synes alligevel, at unge skal tage på højskole, fordi det er en god oplevelse, og man bliver mere voksen. Derfor jeg tror, at det er godt for de unge og for samfundet.`,
    summary:
      'A solid middle answer: both measures and the 2020 dip are described and a yes is given, but the arguments are thin, the counter-arguments get one sentence, and V2 slips recur.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'All three bullets are answered, and the description finds both trends and the 2020 dip. The causes paragraph is good. The evaluation is about 90 of ~225 words (≈ 40 %) and does give a verdict ("Jeg synes ja"), but the disadvantages are squeezed into one sentence and the final reason ("en god oplevelse", "mere voksen") does not answer them. "godt … for samfundet" is claimed without a reason.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Clear paragraph per bullet, and the question opening the evaluation works well. But "Jeg synes" opens three sentences in the last two paragraphs, and the conclusion repeats "god oplevelse" rather than summing up.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Good everyday vocabulary ("stressede", "bliver yngre og yngre"). Recurring errors: no inversion after "I 2020", "efter 2020", "Efter corona" and "Derfor"; a missing "der" in the opening hv-clause; "populært" not agreeing with "højskolerne". "Jeg synes ja" is an anglicism ("I think so").',
      },
    ],
    annotations: [
      {
        quote: 'hvor mange af dem er under 25 år',
        kind: 'error',
        note: 'When the hv-phrase is the subject of the subordinate clause, Danish needs "der", and the clause keeps straight word order. The table is about past years, so past tense fits.',
        fix: 'hvor mange af dem der var under 25 år',
      },
      {
        quote: 'I 2020 der var et fald',
        kind: 'error',
        note: 'After a fronted time expression the verb comes before "der".',
        fix: 'I 2020 var der et fald',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'efter 2020 tallet steg meget',
        kind: 'error',
        note: 'The fronted "efter 2020" needs inversion.',
        fix: 'efter 2020 steg tallet meget',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Efter corona mange unge ville gerne',
        kind: 'error',
        note: 'Same rule: the time phrase takes the front slot, the verb comes next.',
        fix: 'Efter corona ville mange unge gerne',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'blevet populært',
        kind: 'error',
        note: 'The predicative adjective agrees with the plural subject "højskolerne".',
        fix: 'blevet populære',
      },
      {
        quote: 'Jeg synes ja.',
        kind: 'style',
        note: 'An English "I think so" pattern. Danish says "Det synes jeg" or, better in a "Vurdér, om" answer, a full verdict.',
        fix: 'Mit svar er ja.',
      },
      {
        quote: 'Derfor jeg tror',
        kind: 'error',
        note: '"Derfor" takes the front slot, so the verb comes next.',
        fix: 'Derfor tror jeg',
        ruleId: 'v2-inversion',
      },
    ],
  },
  {
    id: 'wgr-d2a-5-4',
    taskId: 'wsim-d2a-5',
    band: '4',
    origin: 'illustrative',
    text: `Diagrammet viser kursister på højskole. I 2014 der var 9.600 kursister og 70 % var under 25 år. I 2016 der var 10.200 og 72 %. I 2018 var der 10.900 og 75 %. I 2020 der var 8.700 og 77 %. I 2022 der var 12.300 og 80 %. I 2024 der var 13.400 og 82 %. Så der er flere kursister nu.

Hvorfor? Jeg tror det er fordi i 2020 var corona og alle skoler var lukket. Efter corona unge vil gerne have venner og fest. Højskole er sjov og man kan lave musik, sport og kunst. Mange unge er træt af skolen efter gymnasium, de vil ikke læse med det samme. Og deres forældre betaler måske.

Jeg synes det er en god idé at tage på højskole før uddannelse. Man møder mange nye mennesker og man får gode venner for hele livet. Man lærer også at lave mad og gøre rent fordi man bor sammen. Min kollega var på højskole i Jylland og han siger det var den bedste tid i hans liv. Så jeg synes alle unge skal prøve det. Det er en god erfaring og man bliver mere selvstændig.`,
    summary:
      'A just-passing answer: the description lists all twelve numbers, the "Vurdér, om" point gets a yes with no counter-arguments, and inversion errors are constant.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The description reads out every year and only concludes "Så der er flere kursister nu". The 2020 dip is listed but not pointed out, and the trend toward younger students is missed. The causes are short but relevant. The evaluation (about 75 of ~195 words, ≈ 38 %) says yes but gives no argument against at all, so nothing is really weighed. A colleague\'s experience is used as proof.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Paragraphs follow the bullets, but the description is a list of near-identical sentences ("I 20xx der var …") and the causes start with a bare "Hvorfor?". Sentences are joined with "og" with few real connectors.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Limited, repetitive vocabulary. Missing inversion in almost every description sentence ("I 2014 der var"), but correct once ("I 2018 var der"), which shows the rule is known but not applied. Also "Efter corona unge vil", "Højskole er sjov", "træt" for "trætte", "efter gymnasium" without the definite form.',
      },
    ],
    annotations: [
      {
        quote: 'I 2016 der var 10.200 og 72 %. I 2018 var der 10.900 og 75 %.',
        kind: 'style',
        note: 'Listing every year is not a description of "hovedtrækkene". Give the overall rise, the 2020 dip and the younger students in two or three sentences.',
        fix: 'Antallet er steget fra 9.600 til 13.400, dog med et fald i 2020, og kursisterne er blevet yngre.',
      },
      {
        quote: 'I 2014 der var 9.600 kursister',
        kind: 'error',
        note: 'After a fronted time expression the verb comes before "der". You get it right in "I 2018 var der", so apply it every time.',
        fix: 'I 2014 var der 9.600 kursister',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'fordi i 2020 var corona',
        kind: 'error',
        note: 'A subordinate clause has no inversion and needs a subject: put "der" right after "fordi".',
        fix: 'fordi der var corona i 2020',
        ruleId: 'subject-required',
      },
      {
        quote: 'Efter corona unge vil gerne',
        kind: 'error',
        note: 'The fronted time phrase must be followed by the verb.',
        fix: 'Efter corona vil unge gerne',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Højskole er sjov',
        kind: 'error',
        note: 'A bare noun used generally as subject takes a neuter adjective in Danish.',
        fix: 'Højskole er sjovt',
      },
      {
        quote: 'er træt af skolen',
        kind: 'error',
        note: 'The adjective agrees with the plural subject "mange unge".',
        fix: 'er trætte af skolen',
      },
      {
        quote: 'Så jeg synes alle unge skal prøve det.',
        kind: 'style',
        note: 'A verdict with no counter-arguments is not an evaluation. Add at least one "imod" argument (cost, a later start on education) and explain why you still say yes.',
        fix: 'Det koster ganske vist penge og udskyder uddannelsen, men alligevel synes jeg, at de fleste unge bør prøve det.',
      },
    ],
  },
  {
    id: 'wgr-d2a-5-02',
    taskId: 'wsim-d2a-5',
    band: '02',
    origin: 'illustrative',
    text: `Diagram viser højskole i Danmark fra 2014 til 2024. Der er mere kursister i 2024, 13.400. I 2014 det var 9.600. Det er en stor stigning. I 2020 det er lille, kun 8.700, fordi corona. Også unge mennesker under 25 år er mere, 82 % i 2024.

Hvorfor unge går på højskole? Fordi de er færdig med gymnasium og de ved ikke hvad de skal læse. De vil have en pause og have det sjov med venner. På højskole man kan spille musik og lave sport og man bor sammen med mange unge. Også det er ikke så dyrt. Og mange forældre synes det er godt. I corona tid alle skoler var lukket og unge var hjemme med forældre og det var kedelig. Derfor efter corona mange unge vil på højskole. I mit land vi har ikke højskole, det er kun Danmark. Unge i mit land de begynder at arbejde med det samme efter skolen eller de læser på universitet, og de har ikke pause. Min søster hun studerer medicin og hun er altid meget træt.

Jeg tror højskole er godt for unge. De bliver mere voksen. Man lærer mange ting. Men det tager tid. Det er min mening.`,
    summary:
      'A bare pass: the main numbers and some causes are there, but the "Vurdér, om" point is five short sentences with no real verdict, and the language has errors in nearly every line.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The description catches the rise, the 2020 dip and the younger students, and there are several causes. But the evaluation is only about 25 of ~200 words, far from 50 %: "godt for unge" and "det tager tid" are named but not argued, there is no clear answer to the om-question and no summing-up. The part about "mit land" and the sister does not answer any bullet.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Three paragraphs, but the middle one mixes causes with a personal comparison, and sentences are chained with "og". "Det er min mening." does not sum anything up.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Basic vocabulary and many errors: "mere kursister" for "flere", missing inversion ("I 2014 det var", "På højskole man kan", "I mit land vi har"), "fordi corona" without "på grund af", "færdig"/"voksen" without plural -e, "have det sjov", "det var kedelig", a doubled subject ("Min søster hun"). Mostly understandable.',
      },
    ],
    annotations: [
      {
        quote: 'Der er mere kursister',
        kind: 'error',
        note: 'Countable nouns (kursister) take "flere"; "mere" is for uncountables like "tid" or "vand".',
        fix: 'Der er flere kursister',
      },
      {
        quote: 'I 2014 det var 9.600',
        kind: 'error',
        note: 'After a fronted time expression the verb comes before the subject.',
        fix: 'I 2014 var det 9.600',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'fordi corona',
        kind: 'error',
        note: '"Fordi" must introduce a whole clause; before a noun use "på grund af".',
        fix: 'på grund af corona',
      },
      {
        quote: 'Hvorfor unge går på højskole?',
        kind: 'error',
        note: 'In a direct question the verb comes right after the question word.',
        fix: 'Hvorfor går unge på højskole?',
        ruleId: 'finit-verb-second',
      },
      {
        quote: 'have det sjov',
        kind: 'error',
        note: 'The fixed phrase is "have det sjovt" (neuter -t after "det").',
        fix: 'have det sjovt',
      },
      {
        quote: 'På højskole man kan',
        kind: 'error',
        note: 'The fronted place phrase takes the front slot, so the verb must follow.',
        fix: 'På højskolen kan man',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'De bliver mere voksen.',
        kind: 'error',
        note: 'Plural subject, so the adjective takes -e. This is also the only argument, and it has no reason. The evaluation should be about half the text and end in a clear yes or no.',
        fix: 'De bliver mere voksne, og derfor er mit svar ja.',
      },
    ],
  },

  // ───────────── wsim-d2a-6 Biblioteket ─────────────
  {
    id: 'wgr-d2a-6-12',
    taskId: 'wsim-d2a-6',
    band: '12',
    origin: 'illustrative',
    text: `Diagrammet viser, hvad de besøgende bruger biblioteket til, og sammenligner 2015 med 2024. Man kunne nævne flere formål.

Det mest iøjnefaldende er, at biblioteket er ved at skifte rolle. At låne bøger er stadig det mest almindelige formål, men andelen er faldet fra 78 til 61 %, og brugen af computere og printere er mere end halveret. Til gengæld kommer langt flere for at studere, gå til arrangementer eller mødes med andre, og alle tre formål er næsten fordoblet.

En oplagt forklaring er, at de fleste i dag har deres egen computer og kan læse e-bøger eller lytte til lydbøger hjemmefra. Samtidig mangler mange studerende et roligt sted at læse, og flere biblioteker er blevet til kulturhuse med foredrag, koncerter og caféer.

Mange biblioteker holder nu åbent uden personale om aftenen og i weekenden. En klar fordel er, at biblioteket bliver tilgængeligt, når folk har fri, så studerende og børnefamilier kan komme, når det passer dem. Desuden er det billigere for kommunen end at forlænge personalets arbejdstid. Omvendt får man ingen hjælp til at finde en bog eller bruge selvbetjeningen, hvilket især rammer ældre og folk, der ikke er vant til teknik. Nogle føler sig også utrygge, når der ikke er ansatte til stede, og der er en risiko for hærværk.

Efter min mening opvejer fordelene ulemperne, så længe der stadig er bemandede åbningstider om dagen. Alt i alt synes jeg derfor, at de længere åbningstider er en god idé, fordi de gør biblioteket til et sted for alle.`,
    summary:
      'A top-band answer: it reads the table as a change of role rather than five separate numbers, explains the shift convincingly, and evaluates unstaffed opening hours from both sides before reaching a conditional verdict.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'All three bullets are answered. The description groups the purposes into falling ones (books, computers) and rising ones ("alle tre formål er næsten fordoblet") and notes that several purposes could be named. The causes explain both the fall and the rise. The evaluation (about 130 of ~250 words, ≈ 50 %) gives two advantages and two disadvantages tied to the missing staff, an own view with a condition, and a summing-up.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'One paragraph per bullet plus a conclusion. "Til gengæld" links the falling and rising purposes, the evaluation opens by restating the issue, and "Omvendt" and "Alt i alt … derfor" guide the reader. A consistent, neutral register.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Precise and varied: "skifte rolle", "mere end halveret", "tilgængeligt" (agreeing with "biblioteket"), "bemandede åbningstider", "hvilket især rammer". Correct inversion ("Til gengæld kommer langt flere", "Desuden er det", "Omvendt får man") and adverb placement in subordinate clauses ("der ikke er vant til").',
      },
    ],
    annotations: [
      {
        quote: 'Man kunne nævne flere formål.',
        kind: 'good',
        note: 'Shows that the writer read the note under the table: the percentages do not add up to 100, so each purpose must be compared with itself over time.',
      },
      {
        quote: 'biblioteket er ved at skifte rolle',
        kind: 'good',
        note: 'Sums up the whole table in one phrase. That is what "hovedtrækkene" means.',
      },
      {
        quote: 'Til gengæld kommer langt flere for at studere',
        kind: 'good',
        note: '"Til gengæld" (on the other hand, in return) marks the contrast, and the verb correctly comes straight after it.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'biblioteket bliver tilgængeligt',
        kind: 'good',
        note: '"Bibliotek" is an et-word, so the predicative adjective takes -t.',
      },
      {
        quote: 'hvilket især rammer ældre og folk, der ikke er vant til teknik',
        kind: 'good',
        note: '"Hvilket" refers back to the whole previous clause, and "ikke" correctly comes before the verb in the relative clause.',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'så længe der stadig er bemandede åbningstider om dagen',
        kind: 'good',
        note: 'The condition answers the strongest disadvantage (no help for those who need it), so the own view really weighs the two sides.',
      },
      {
        quote: 'Alt i alt synes jeg derfor',
        kind: 'good',
        note: 'A short sammenfatning that restates the view without new arguments.',
      },
    ],
  },
  {
    id: 'wgr-d2a-6-7',
    taskId: 'wsim-d2a-6',
    band: '7',
    origin: 'illustrative',
    text: `Diagrammet viser hvad folk bruger biblioteket til i 2015 og 2024.

Man kan se, at færre låner bøger. I 2015 det var 78 %, og i 2024 det er 61 %. Der er også færre, der bruger computer eller printer, kun 14 %. Men flere studerer på biblioteket, går til arrangementer og møder andre mennesker. Studere er steget fra 22 % til 38 %.

Der er flere årsager til det. Mange mennesker læser e-bøger og hører lydbøger på mobilen, så de behøver ikke at gå på biblioteket. Næsten alle har en computer derhjemme i dag. Studerende har brug for et stille sted, fordi der er ikke plads hjemme. Desuden har bibliotekerne mange arrangementer nu, for eksempel foredrag og koncerter for børn. Mange biblioteker har også fået en café, så det er hyggeligt at mødes der.

Der er fordele og ulemper ved, at biblioteket er åbent uden personale. En fordel er, at man kan komme om aftenen og i weekenden, når man har fri. En anden fordel er, at det er billig for kommunen. En ulempe er, at der er ingen, der kan hjælpe, hvis man ikke kan finde en bog. En anden ulempe er, at nogle unge kan lave ballade.

Jeg synes, at det er en god idé, fordi mange mennesker arbejder om dagen. Derfor jeg mener, at alle biblioteker skal have åbent om aftenen.`,
    summary:
      'A solid middle answer: the trends and causes are clear, but the evaluation is a list of one-line pros and cons with a thin own view, and V2 and agreement slips recur.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'All three bullets are answered. The description finds the fall in borrowing and computer use and the rise in the other purposes, though it never sums this up as a change of role. The causes are relevant and varied. The evaluation is about 90 of ~225 words (≈ 40 %): two advantages and two disadvantages of one sentence each, and the own view repeats one advantage without answering the disadvantages.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Clear paragraph per bullet, but the evaluation is a mechanical chain ("En fordel er … En anden fordel er … En ulempe er … En anden ulempe er"). "Studere er steget" says the activity rose, not the share of visitors who study.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Good topic words ("lydbøger", "arrangementer", "lave ballade"). Recurring errors: no inversion after "I 2015", "i 2024" and "Derfor"; "ikke" after the verb in a fordi-clause; "billig" for "billigt" after "det er"; "der er ingen, der" for "der er ikke nogen, der". Understanding is never blocked.',
      },
    ],
    annotations: [
      {
        quote: 'I 2015 det var 78 %, og i 2024 det er 61 %.',
        kind: 'error',
        note: 'After a fronted time expression the verb comes before the subject, both times. 2024 is also in the past now.',
        fix: 'I 2015 var det 78 %, og i 2024 var det 61 %.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Studere er steget fra 22 % til 38 %.',
        kind: 'style',
        note: 'An activity cannot rise. Make the share of visitors the subject.',
        fix: 'Andelen, der studerer på biblioteket, er steget fra 22 % til 38 %.',
      },
      {
        quote: 'fordi der er ikke plads hjemme',
        kind: 'error',
        note: 'In a fordi-clause "ikke" goes before the finite verb.',
        fix: 'fordi der ikke er plads hjemme',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'det er billig for kommunen',
        kind: 'error',
        note: 'After "det er" the adjective takes the neuter -t.',
        fix: 'det er billigt for kommunen',
      },
      {
        quote: 'der er ingen, der kan hjælpe',
        kind: 'error',
        note: 'In a subordinate at-clause Danish prefers "ikke … nogen" to "ingen" when there is a verb in between.',
        fix: 'der ikke er nogen, der kan hjælpe',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'En anden ulempe er, at nogle unge kan lave ballade.',
        kind: 'style',
        note: 'The fourth "En … er" in a row. Vary the links ("Omvendt …", "Desuden …") and develop at least one point: who is affected, and how?',
        fix: 'Omvendt kan det føles utrygt, når der ikke er ansatte til stede, og nogle unge kan lave ballade.',
      },
      {
        quote: 'Derfor jeg mener',
        kind: 'error',
        note: '"Derfor" takes the front slot, so the verb comes next.',
        fix: 'Derfor mener jeg',
        ruleId: 'v2-inversion',
      },
    ],
  },
  {
    id: 'wgr-d2a-6-4',
    taskId: 'wsim-d2a-6',
    band: '4',
    origin: 'illustrative',
    text: `Diagrammet viser biblioteket i 2015 og 2024. Låne bøger var 78 % i 2015 og 61 % i 2024. Studere var 22 % og 38 %. Arrangementer var 15 % og 29 %. Computer og printer var 31 % og 14 %. Møde andre var 9 % og 19 %. Så nogle er mere og nogle er mindre.

Folk låner ikke så mange bøger fordi de kan købe bøger på internet og de har ikke tid til at læse. Mange unge læser ikke bøger, de ser Netflix. I dag alle har computer og printer derhjemme. Studerende kommer på biblioteket fordi det er gratis og stille. Arrangementer er populær fordi det er gratis og folk vil møde andre.

Jeg synes det er godt at biblioteket er åben uden personale. Mange mennesker arbejder til kl. 17 og så biblioteket er lukket. Nu de kan komme om aftenen og søndag. Jeg går selv på biblioteket om aftenen med min søn, vi låner bøger og han laver lektier. Det er meget hyggeligt. Biblioteket er et godt sted for børn og man kan låne mange ting gratis. Også det er godt for studerende som skal læse til eksamen. Derfor jeg synes alle biblioteker skal gøre det.`,
    summary:
      'A just-passing answer: the description reads out every row without finding the shift, the evaluation lists only advantages, and inversion errors are constant.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The description copies all ten numbers and ends with the vague "nogle er mere og nogle er mindre", so the change of role is never stated. The causes explain the fall in borrowing but barely the rise in events and meeting others. The evaluation (about 85 of ~200 words, ≈ 42 %) gives only advantages: no word about missing help or safety, so "fordele og ulemper" is only half answered.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Paragraphs follow the bullets, but the description is a list of verbless fragments ("Studere var 22 % og 38 %"). Comma splices ("…om aftenen med min søn, vi låner bøger") and few linking words. The personal example takes the place of a general argument.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Simple, repetitive vocabulary. Frequent errors: missing inversion ("I dag alle har", "og så biblioteket er lukket", "Nu de kan", "Også det er", "Derfor jeg synes"), "biblioteket er åben" for "åbent", "på internet" without the definite form. Still understandable.',
      },
    ],
    annotations: [
      {
        quote: 'Så nogle er mere og nogle er mindre.',
        kind: 'style',
        note: 'Too vague to count as the main features. Say which purposes fall and which rise, and what that means.',
        fix: 'Færre kommer for at låne bøger eller bruge computer, mens flere kommer for at studere, gå til arrangementer eller mødes med andre.',
      },
      {
        quote: 'I dag alle har computer',
        kind: 'error',
        note: 'After the fronted "I dag" the verb comes before the subject.',
        fix: 'I dag har alle en computer',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'biblioteket er åben',
        kind: 'error',
        note: '"Bibliotek" is an et-word, so the predicative adjective takes -t.',
        fix: 'biblioteket er åbent',
      },
      {
        quote: 'og så biblioteket er lukket',
        kind: 'error',
        note: 'Here "så" means "then" and takes the front slot of the new clause, so the verb comes next.',
        fix: 'og så er biblioteket lukket',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Nu de kan komme',
        kind: 'error',
        note: 'The fronted "Nu" must be followed by the verb.',
        fix: 'Nu kan de komme',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Derfor jeg synes alle biblioteker skal gøre det.',
        kind: 'error',
        note: '"Derfor" needs inversion. The evaluation also has no disadvantages at all. Add at least one (no help, feeling unsafe) and weigh it before your verdict.',
        fix: 'Derfor synes jeg, at alle biblioteker skal gøre det.',
        ruleId: 'v2-inversion',
      },
    ],
  },
  {
    id: 'wgr-d2a-6-02',
    taskId: 'wsim-d2a-6',
    band: '02',
    origin: 'illustrative',
    text: `Diagram viser hvad folk gør på bibliotek. Det er 2015 og 2024. Mange låner bøger, 61 % i 2024, men i 2015 det var mere, 78 %. Computer er også mindre, kun 14 %. Studere og arrangement og møde andre er mere. Det er stor forandring. Folk bruger bibliotek anderledes nu.

Hvorfor folk låner ikke bøger? Jeg tror fordi alle har mobil og de læser på mobil eller hører bog. Også bog er dyr og man skal give tilbage. Unge mennesker læser ikke, de spiller spil. Studerende de går på bibliotek fordi hjemme er der mange larm og små børn. Også mange gamle mennesker kommer for at snakke fordi de er alene. Biblioteket i min by har også koncert for børn hver lørdag og det er gratis. I bibliotek er der også gratis kaffe nogle gange og wifi. Da jeg kom til Danmark jeg gik på bibliotek hver dag og læste dansk, det var meget godt for mig og jeg mødte en dansk dame som hjalp mig med lektier. Hun var pensionist og meget sød. Vi drikker kaffe sammen stadig.

Bibliotek uden personale er godt fordi man kan komme om aftenen. Men hvis man har problem ingen hjælper. Jeg kan lide det.`,
    summary:
      'A bare pass: the main changes are visible and some causes are given, but the evaluation is three short sentences, a personal story replaces argument, and errors are everywhere.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The description notices that borrowing and computer use fall and the other purposes rise, and there are some causes. But the evaluation is only about 25 of ~200 words, far from 50 %: one advantage, one disadvantage without development, "Jeg kan lide det" without a reason, and no summing-up. The story about the Danish pensioner does not answer any bullet.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Three paragraphs, but the description is a string of unclear fragments ("Computer er også mindre") and the middle paragraph drifts from causes into a personal story. There is no real conclusion.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Basic vocabulary and errors in almost every sentence: missing inversion ("i 2015 det var", "Da jeg kom til Danmark jeg gik"), question word order ("Hvorfor folk låner ikke"), "mange larm", doubled subject ("Studerende de går"), "I bibliotek" for "På biblioteket", missing definite forms and articles. The meaning is mostly clear.',
      },
    ],
    annotations: [
      {
        quote: 'i 2015 det var mere',
        kind: 'error',
        note: 'After a fronted time expression the verb comes before the subject.',
        fix: 'i 2015 var det flere',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Hvorfor folk låner ikke bøger?',
        kind: 'error',
        note: 'In a direct question the verb follows the question word directly, and "ikke" comes after the subject.',
        fix: 'Hvorfor låner folk ikke bøger?',
        ruleId: 'finit-verb-second',
      },
      {
        quote: 'Studerende de går',
        kind: 'error',
        note: 'Danish does not repeat the subject with a pronoun.',
        fix: 'Studerende går',
      },
      {
        quote: 'mange larm',
        kind: 'error',
        note: '"Larm" (noise) is uncountable, so it takes "meget", not "mange".',
        fix: 'meget larm',
      },
      {
        quote: 'Da jeg kom til Danmark jeg gik',
        kind: 'error',
        note: 'A whole da-clause in the front slot counts as one element, so the main-clause verb comes next, after a comma.',
        fix: 'Da jeg kom til Danmark, gik jeg',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Vi drikker kaffe sammen stadig.',
        kind: 'error',
        note: '"Stadig" is a central adverbial and goes right after the finite verb in a main clause.',
        fix: 'Vi drikker stadig kaffe sammen.',
        ruleId: 'central-vs-content-adverbial',
      },
      {
        quote: 'Men hvis man har problem ingen hjælper.',
        kind: 'error',
        note: 'The hvis-clause in the front slot needs a comma and inversion, and "problem" needs an article. This is also the only disadvantage, with no development; the evaluation should be about half the text.',
        fix: 'Men hvis man har et problem, er der ingen, der kan hjælpe.',
        ruleId: 'v2-inversion',
      },
    ],
  },
];
