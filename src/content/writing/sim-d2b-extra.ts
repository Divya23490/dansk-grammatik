import type { GradedAnswer, PracticeTask, TaskBullet } from './types';

/**
 * Delprøve 2B — three more original simulated tasks (≥200 words, a box of six
 * statements), with a full 12/7/4/02 ladder each. Written for the app; none of
 * these topics has been set on a real PD3 paper.
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

export const SIM_TASKS_D2B_EXTRA: PracticeTask[] = [
  {
    id: 'wsim-d2b-4',
    type: 'd2b-list',
    title: 'Lektier i folkeskolen',
    origin: 'simulated',
    intro:
      'Flere danske skoler har skåret ned på lektierne eller helt afskaffet dem. Nogle forældre er glade for de fri eftermiddage, mens andre er bange for, at børnene lærer for lidt. Der er mange holdninger til lektier.',
    list: [
      'Børn har brug for fri, når skoledagen er slut.',
      'Lektier lærer børn at tage ansvar for deres egen læring.',
      'Lektier skaber ulighed, fordi ikke alle forældre kan hjælpe deres børn.',
      'Lektier giver konflikter i mange familier.',
      'Skolen skal have en lektiecafé, så lektierne kan laves på skolen.',
      'Uden lektier når eleverne ikke at øve sig nok.',
    ],
    bullets: bullets(
      [
        'Fortæl kort om dine egne erfaringer med lektier, enten fra din egen skoletid eller fra dine børns.',
        "Briefly describe your own experience with homework, either from your own school days or from your children's.",
      ],
      [
        'Kommentér et eller to af synspunkterne fra listen.',
        'Comment on one or two of the viewpoints in the box — name them, agree or disagree, and say why.',
      ],
      [
        'Vurdér fordele og ulemper ved at afskaffe lektier i folkeskolen.',
        'Evaluate the advantages and disadvantages of abolishing homework in Danish primary and lower secondary school. Give reasons. This part should be about half the answer.',
      ],
    ),
    minWords: 200,
    slots: {
      intro: {
        hint: 'Introduce the debate in your own words: some schools have cut homework or dropped it altogether, and parents and teachers disagree about whether children then learn enough.',
        starters: [
          { da: 'Spørgsmålet om lektier deler både forældre, lærere og elever, og …', en: 'The question of homework divides parents, teachers and pupils alike, and …' },
          { da: 'Flere skoler har allerede afskaffet lektierne, men …', en: 'Several schools have already abolished homework, but …' },
          { da: 'De fleste af os husker, hvordan det var at sidde med lektier ved køkkenbordet, og …', en: 'Most of us remember what it was like to sit with homework at the kitchen table, and …' },
        ],
      },
      experience: {
        hint: 'Describe homework in your own school days (how much, who helped you) or in your children\'s life today, with one concrete situation, e.g. long evenings at the kitchen table or a discussion at dinner. Past tense for your own school days, 3–4 sentences.',
        starters: [
          { da: 'Da jeg selv gik i skole i …, fik vi lektier for hver dag, og …', en: 'When I went to school myself in …, we got homework for every day, and …' },
          { da: 'I dag har jeg en søn/datter i … klasse, og her …', en: 'Today I have a son/daughter in year …, and here …' },
          { da: 'Jeg kan huske, at mine forældre ikke kunne hjælpe mig med …, fordi …', en: 'I remember that my parents could not help me with …, because …' },
        ],
      },
      viewpoints: {
        hint: 'An easy pair: agree with "Lektier skaber ulighed, fordi ikke alle forældre kan hjælpe deres børn" (some parents work late or don\'t speak Danish), and disagree with "Uden lektier når eleverne ikke at øve sig nok" (the school day is already long, and practice can happen in lessons or a lektiecafé).',
        starters: [
          { da: 'Jeg er enig i synspunktet om, at lektier skaber ulighed, fordi …', en: 'I agree with the view that homework creates inequality, because …' },
          { da: 'Til gengæld er jeg ikke enig i, at eleverne ikke når at øve sig nok uden lektier, da …', en: 'On the other hand, I don\'t agree that pupils won\'t get enough practice without homework, since …' },
          { da: 'Forslaget om en lektiecafé på skolen synes jeg er godt, fordi …', en: 'I think the suggestion of a homework café at school is good, because …' },
        ],
      },
      for: {
        hint: 'Advantages of abolishing homework: children get time for play, sport and friends; fewer evening conflicts in families; more equality, because no child depends on help at home.',
        starters: [
          { da: 'Der er flere fordele ved at afskaffe lektierne. For det første …', en: 'There are several advantages to abolishing homework. Firstly …' },
          { da: 'Det taler for at afskaffe lektier, at børnene får mere tid til …', en: 'What speaks for abolishing homework is that children get more time for …' },
          { da: 'For det andet står alle elever mere lige, når …', en: 'Secondly, all pupils are on a more equal footing when …' },
        ],
      },
      against: {
        hint: 'Disadvantages of abolishing homework: children lose practice in working on their own and taking responsibility, weak readers may not read at all at home, and parents lose their insight into what the child is learning.',
        starters: [
          { da: 'Omvendt er der også ulemper ved at afskaffe lektierne.', en: 'Conversely, there are also disadvantages to abolishing homework.' },
          { da: 'Lektier kan lære børn at arbejde selvstændigt, og …', en: 'Homework can teach children to work independently, and …' },
          { da: 'Hvis lektierne forsvinder helt, mister forældrene …', en: 'If homework disappears completely, parents lose …' },
        ],
      },
      opinion: {
        hint: 'Weigh the two sides and land somewhere clear, e.g. abolish homework in the younger years and replace it with a lektiecafé, but keep a little in the older years to prepare pupils for upper secondary school.',
        starters: [
          { da: 'Når jeg vejer fordele og ulemper op imod hinanden, mener jeg, at …', en: 'When I weigh the advantages and disadvantages against each other, I believe that …' },
          { da: 'Efter min mening bør lektierne afskaffes i de små klasser, men …', en: 'In my opinion homework should be abolished in the younger years, but …' },
          { da: 'Den bedste løsning er efter min mening en lektiecafé, hvor …', en: 'In my view the best solution is a homework café, where …' },
        ],
      },
      conclusion: {
        hint: 'Sum up in one or two sentences whether the advantages or the disadvantages weigh most, and on what condition.',
        starters: [
          { da: 'Alt i alt vejer fordelene tungest, så længe …', en: 'All in all, the advantages weigh the most, as long as …' },
          { da: 'Samlet set mener jeg, at lektier ikke er nødvendige, hvis …', en: 'All things considered, I believe homework is not necessary if …' },
        ],
      },
    },
    tips: [
      {
        title: 'Mind the direction of "fordele ved at afskaffe"',
        text: 'The advantages of abolishing homework are the arguments against homework (more free time, fewer conflicts), and the disadvantages are the arguments for it. Many answers mix the two up halfway through; decide before you write which paragraph is which.',
      },
      {
        title: 'Both sides, then a view',
        text: '"Vurdér fordele og ulemper" needs real weight on both sides, not one sentence of "men der er også ulemper". Give each side a paragraph, then say which side weighs most and why.',
      },
      {
        title: 'Keep the experience short',
        text: 'Your own school days or your children\'s homework is enough: one or two concrete details, then move on. A long story about your school system eats the 50 % the evaluation needs.',
      },
      {
        title: '"Lave lektier", always plural',
        text: 'Danish says "lave lektier" (not "gøre lektier", from English "do homework"), and "lektier" is plural: "lektierne er svære", "mange lektier".',
      },
      {
        title: 'Use the lektiecafé as a middle way',
        text: 'Statement 5 gives you a ready-made compromise: no homework at home, but practice at school where everyone can get help. It makes a strong own position in the opinion paragraph.',
      },
    ],
    words: [
      { da: 'lektier (flertal), lektierne', en: 'homework' },
      { da: 'at lave lektier', en: 'to do homework' },
      { da: 'at afskaffe', en: 'to abolish' },
      { da: 'en lektiecafé', en: 'a homework café (supervised homework at school)' },
      { da: 'en folkeskole', en: 'a Danish state primary and lower secondary school' },
      { da: 'en skoledag', en: 'a school day' },
      { da: 'en ulighed', en: 'an inequality' },
      { da: 'at stå lige', en: 'to be on an equal footing' },
      { da: 'at tage ansvar for', en: 'to take responsibility for' },
      { da: 'at arbejde selvstændigt', en: 'to work independently' },
      { da: 'at øve sig', en: 'to practise' },
      { da: 'en konflikt', en: 'a conflict' },
      { da: 'fritid', en: 'free time, leisure' },
      { da: 'at få indblik i', en: 'to get an insight into' },
    ],
  },
  {
    id: 'wsim-d2b-5',
    type: 'd2b-list',
    title: 'At flytte på landet',
    origin: 'simulated',
    intro:
      'Boligpriserne i de store byer stiger, og flere børnefamilier overvejer at flytte ud på landet. Samtidig lukker skoler og butikker i mange landsbyer. Der er delte meninger om livet uden for de store byer.',
    list: [
      'På landet får man et større hus for de samme penge.',
      'Børn har det bedre, når de vokser op tæt på naturen.',
      'Man bliver afhængig af bil, når man bor på landet.',
      'Der er færre job og uddannelsesmuligheder uden for byerne.',
      'I en landsby kender folk hinanden og hjælper hinanden.',
      'Staten skal flytte flere arbejdspladser ud af hovedstaden.',
    ],
    bullets: bullets(
      [
        'Fortæl kort om dine egne erfaringer med at bo i en by eller på landet, i Danmark eller i dit hjemland.',
        'Briefly describe your own experience of living in a town or city or in the countryside, in Denmark or in your home country.',
      ],
      [
        'Kommentér et eller to af synspunkterne fra listen.',
        'Comment on one or two of the viewpoints in the box — name them, agree or disagree, and say why.',
      ],
      [
        'Vurdér, om det er en god idé for børnefamilier at flytte fra byen ud på landet.',
        'Evaluate whether it is a good idea for families with children to move from the city to the countryside. Give reasons. This part should be about half the answer.',
      ],
    ),
    minWords: 200,
    slots: {
      intro: {
        hint: 'Introduce the topic: house prices in the big cities keep rising, so more families with children dream of a house in the country, while schools and shops close in many villages.',
        starters: [
          { da: 'Boligpriserne i de store byer er steget så meget, at …', en: 'House prices in the big cities have risen so much that …' },
          { da: 'Mange børnefamilier drømmer om et hus på landet, men …', en: 'Many families with children dream of a house in the country, but …' },
          { da: 'Samtidig med at flere vil bo på landet, lukker …', en: 'At the same time as more people want to live in the country, … are closing' },
        ],
      },
      experience: {
        hint: 'Say where you have lived (a big city, a small town, a village; in Denmark or in your home country) and give one detail of everyday life there: space, distances, the bus, neighbours, where the children played.',
        starters: [
          { da: 'Selv voksede jeg op i …, hvor …', en: 'I myself grew up in …, where …' },
          { da: 'Da jeg kom til Danmark, boede jeg først i …', en: 'When I came to Denmark, I first lived in …' },
          { da: 'Sidste år flyttede min familie fra … til …, og …', en: 'Last year my family moved from … to …, and …' },
        ],
      },
      viewpoints: {
        hint: 'Agree with "På landet får man et større hus for de samme penge" (give a price or a house-with-garden example), and question "I en landsby kender folk hinanden og hjælper hinanden" (it takes time to become part of the community as a newcomer).',
        starters: [
          { da: 'Jeg er enig i synspunktet om, at man får et større hus for de samme penge, fordi …', en: 'I agree with the view that you get a bigger house for the same money, because …' },
          { da: 'Derimod tror jeg ikke helt på, at folk i en landsby altid …', en: 'On the other hand, I don\'t quite believe that people in a village always …' },
          { da: 'Det er rigtigt, at man bliver afhængig af bil, når …', en: 'It is true that you become dependent on a car when …' },
        ],
      },
      for: {
        hint: 'Reasons for yes: more space and fresh air for the children, a cheaper house or lower rent, less traffic so children can cycle to school alone, and a calmer everyday life.',
        starters: [
          { da: 'Spørgsmålet er, om det er en god idé for børnefamilier at flytte ud på landet.', en: 'The question is whether it is a good idea for families with children to move to the countryside.' },
          { da: 'Det taler for at flytte, at børnene får …', en: 'What speaks for moving is that the children get …' },
          { da: 'Desuden kan børnene cykle alene i skole, fordi …', en: 'Besides, the children can cycle to school alone, because …' },
        ],
      },
      against: {
        hint: 'Reasons for no: you depend on the car because buses are rare, parents may commute an hour each way, there are fewer jobs, and when the village school or doctor closes the distances get even longer. Teenagers may want to move to the city to study anyway.',
        starters: [
          { da: 'På den anden side bliver man afhængig af bilen, fordi …', en: 'On the other hand, you become dependent on the car, because …' },
          { da: 'Mange forældre må pendle langt, og det betyder, at …', en: 'Many parents have to commute a long way, and that means …' },
          { da: 'Når skolen i landsbyen lukker, …', en: 'When the village school closes, …' },
        ],
      },
      opinion: {
        hint: 'Answer the question with a clear yes or no and a condition, e.g. yes, but only if at least one parent can find work close to home; otherwise the family spends in the car the time it moved to get together.',
        starters: [
          { da: 'Efter min mening er det en god idé, men kun hvis …', en: 'In my opinion it is a good idea, but only if …' },
          { da: 'Når jeg vejer argumenterne op imod hinanden, mener jeg ikke, at …', en: 'When I weigh the arguments against each other, I don\'t think that …' },
          { da: 'Ellers risikerer familien at …', en: 'Otherwise the family risks …' },
        ],
      },
      conclusion: {
        hint: 'Repeat your answer to the question in one or two sentences, with the condition that matters most.',
        starters: [
          { da: 'Samlet set kan livet på landet give børnefamilier …, så længe …', en: 'All things considered, life in the country can give families with children …, as long as …' },
          { da: 'Alt i alt er det en god idé at flytte på landet, hvis …', en: 'All in all, it is a good idea to move to the country if …' },
        ],
      },
    },
    tips: [
      {
        title: '"Vurdér, om" wants a yes or no',
        text: 'This is not a pros-and-cons list. Weigh reasons for and against, then answer the question itself: is it a good idea or not, and on what condition? "Ja, hvis …" is a perfectly good answer.',
      },
      {
        title: 'It is about families with children',
        text: 'The question is narrower than "is country life good?": keep your arguments about children and parents (school, commuting, space to play, activities for teenagers).',
      },
      {
        title: '"På landet", not "i landet"',
        text: 'You live "på landet" and move "ud på landet"; "i landet" means "in the country (nation)". Islands also take "på": på Fyn, på Lolland, på Bornholm, but i Jylland.',
      },
      {
        title: 'Use the job statements in the evaluation',
        text: 'Statements 4 and 6 (fewer jobs, moving state jobs out of the capital) are strong arguments for your evaluation, so you can save them for the second half rather than spend them in the viewpoints paragraph.',
      },
    ],
    words: [
      { da: 'en børnefamilie', en: 'a family with children' },
      { da: 'at bo på landet', en: 'to live in the countryside' },
      { da: 'at flytte ud på landet', en: 'to move to the countryside' },
      { da: 'en landsby', en: 'a village' },
      { da: 'en boligpris', en: 'a house price' },
      { da: 'et fællesskab', en: 'a community' },
      { da: 'en tilflytter', en: 'a newcomer (to a place)' },
      { da: 'at pendle', en: 'to commute' },
      { da: 'at være afhængig af bil', en: 'to depend on a car' },
      { da: 'en arbejdsplads', en: 'a workplace, a job' },
      { da: 'en uddannelsesmulighed', en: 'an educational opportunity' },
      { da: 'den offentlige transport', en: 'public transport' },
      { da: 'at vokse op', en: 'to grow up' },
      { da: 'i nærheden', en: 'nearby' },
    ],
  },
  {
    id: 'wsim-d2b-6',
    type: 'd2b-list',
    title: 'Affald i naturen',
    origin: 'simulated',
    intro:
      'På strande, i parker og langs vejene ligger der ofte dåser, plastikposer og kaffekopper. Affaldet er grimt at se på og farligt for dyrene. Der er forskellige meninger om, hvordan man får folk til at lade være med at smide affald.',
    list: [
      'Der skal være flere skraldespande i byer og parker.',
      'Folk, der smider affald, skal have en høj bøde.',
      'Der skal være pant på flere slags emballage.',
      'Skolerne skal tage eleverne med ud at samle affald.',
      'Det er kommunens opgave at gøre rent, ikke borgernes.',
      'Man skal altid tage sit eget affald med hjem fra naturen.',
    ],
    bullets: bullets(
      [
        'Fortæl kort om dine egne erfaringer med affald i naturen eller i dit nærområde.',
        'Briefly describe your own experience of litter in nature or in your neighbourhood.',
      ],
      [
        'Kommentér et eller to af synspunkterne fra listen.',
        'Comment on one or two of the viewpoints in the box — name them, agree or disagree, and say why.',
      ],
      [
        'Vurdér, om det først og fremmest er den enkelte borgers eller kommunens ansvar, at der ikke ligger affald i naturen og i byerne.',
        'Evaluate whether keeping nature and towns free of litter is first and foremost the responsibility of the individual citizen or of the municipality. Give reasons. This part should be about half the answer.',
      ],
    ),
    minWords: 200,
    slots: {
      intro: {
        hint: 'Introduce littering in your own words: cans, plastic bags and coffee cups on beaches, in parks and along roads, which look ugly and harm animals.',
        starters: [
          { da: 'Når man går en tur langs stranden eller i parken, støder man desværre ofte på …', en: 'When you go for a walk along the beach or in the park, you unfortunately often come across …' },
          { da: 'Affald i naturen er ikke kun grimt at se på, men også …', en: 'Litter in nature is not only ugly to look at, but also …' },
          { da: 'Der er mange forslag til, hvordan vi får folk til at lade være med at smide affald, men …', en: 'There are many suggestions for how to get people to stop littering, but …' },
        ],
      },
      experience: {
        hint: 'Describe one place you know with litter (a beach after a summer weekend, the park near your home, a cycle path) or a clean-up you joined, and one concrete detail, e.g. how many bags you filled.',
        starters: [
          { da: 'For nogle år siden var jeg med til en affaldsindsamling, og …', en: 'A few years ago I took part in a litter pick, and …' },
          { da: 'Når jeg går tur med min hund ved …, ser jeg tit …', en: 'When I walk my dog by …, I often see …' },
          { da: 'I mit hjemland er der …, men i Danmark …', en: 'In my home country there is …, but in Denmark …' },
        ],
      },
      viewpoints: {
        hint: 'Agree with "Der skal være pant på flere slags emballage" (a can worth money is rarely left lying, as Danish bottle deposits show) and disagree with "Det er kommunens opgave at gøre rent, ikke borgernes" (if people think others will clean up, they never change their habits). Or agree with fines and say why.',
        starters: [
          { da: 'Jeg er enig i forslaget om, at der skal være pant på flere slags emballage, fordi …', en: 'I agree with the suggestion that there should be a deposit on more kinds of packaging, because …' },
          { da: 'Til gengæld er jeg uenig i, at det kun er kommunens opgave at gøre rent, da …', en: 'On the other hand, I disagree that cleaning is only the municipality\'s job, since …' },
          { da: 'At folk, der smider affald, skal have en høj bøde, lyder fornuftigt, men …', en: 'That people who litter should get a high fine sounds sensible, but …' },
        ],
      },
      for: {
        hint: 'Argue for the individual\'s responsibility: we are the ones who drop the litter, nobody forces us to leave a bottle on the beach, and taking it home costs almost no effort. Habits are learnt at home and at school.',
        starters: [
          { da: 'Spørgsmålet er, om det først og fremmest er den enkelte borgers eller kommunens ansvar, at der ikke ligger affald.', en: 'The question is whether it is first and foremost the individual citizen\'s or the municipality\'s responsibility that there is no litter.' },
          { da: 'Det taler for borgernes ansvar, at det er os selv, der …', en: 'What speaks for the citizens\' responsibility is that it is we ourselves who …' },
          { da: 'Ingen tvinger os til at …', en: 'Nobody forces us to …' },
        ],
      },
      against: {
        hint: 'Argue for the municipality: full or distant bins make littering more likely, only the municipality can hand out fines, run campaigns and organise daily cleaning, and it is paid for with our taxes.',
        starters: [
          { da: 'På den anden side kan kommunen gøre det meget lettere at …', en: 'On the other hand, the municipality can make it much easier to …' },
          { da: 'Hvis skraldespandene er fyldte, ender affaldet …', en: 'If the bins are full, the litter ends up …' },
          { da: 'Desuden er det kun kommunen, der kan …', en: 'Besides, only the municipality can …' },
        ],
      },
      opinion: {
        hint: 'Choose one side as the main one, e.g. the individual carries the main responsibility because littering is about attitudes, but the municipality must create the right conditions with bins, fines and school campaigns.',
        starters: [
          { da: 'Efter min mening ligger hovedansvaret hos …, fordi …', en: 'In my opinion the main responsibility lies with …, because …' },
          { da: 'Når jeg vejer argumenterne op imod hinanden, hælder jeg til, at …', en: 'When I weigh the arguments against each other, I lean towards …' },
          { da: 'Kommunen skal dog skabe de rigtige rammer, for eksempel …', en: 'The municipality must, however, create the right conditions, for example …' },
        ],
      },
      conclusion: {
        hint: 'Sum up in one or two sentences whose responsibility it mainly is, and what each of us can do.',
        starters: [
          { da: 'Alt i alt er ren natur et fælles projekt, men det begynder med, at …', en: 'All in all, clean nature is a joint project, but it starts with …' },
          { da: 'Samlet set mener jeg, at ansvaret først og fremmest ligger hos …', en: 'All things considered, I believe the responsibility lies first and foremost with …' },
        ],
      },
    },
    tips: [
      {
        title: 'Pick a main side',
        text: '"Først og fremmest" asks who carries the most responsibility. "Begge har et ansvar" is fine as a nuance, but the evaluation must still say which side weighs heaviest and why.',
      },
      {
        title: 'Don\'t spend statement 5 too early',
        text: '"Det er kommunens opgave at gøre rent, ikke borgernes" is almost the evaluation question itself. If you comment on it in the viewpoints paragraph, keep it short and save the real arguments for the evaluation, or comment on two other suggestions instead.',
      },
      {
        title: 'Affald is uncountable',
        text: '"Affald" has no plural: "meget affald", "affaldet", never "affalds" or "mange affald". For single items, name them: dåser, flasker, plastikposer.',
      },
      {
        title: 'Use the Danish pant system',
        text: 'Most readers know that bottles and cans with pant are rarely left lying around, because someone collects them for the money. It is a concrete example that supports both the viewpoint and the evaluation.',
      },
    ],
    words: [
      { da: 'affald (et), affaldet', en: 'litter, rubbish (uncountable)' },
      { da: 'at smide affald', en: 'to drop litter' },
      { da: 'en skraldespand', en: 'a rubbish bin' },
      { da: 'pant (en), panten', en: 'a deposit (on bottles and cans)' },
      { da: 'emballage (en)', en: 'packaging' },
      { da: 'en dåse', en: 'a can' },
      { da: 'en bøde', en: 'a fine' },
      { da: 'en affaldsindsamling', en: 'a litter pick, a clean-up' },
      { da: 'en kommune', en: 'a municipality' },
      { da: 'en borger', en: 'a citizen' },
      { da: 'at gøre rent', en: 'to clean' },
      { da: 'at lade være med at', en: 'to refrain from, to stop' },
      { da: 'at rydde op efter sig', en: 'to clean up after oneself' },
      { da: 'en kampagne', en: 'a campaign' },
    ],
  },
];

const p = (...paragraphs: string[]) => paragraphs.join('\n\n');

export const GRADED_D2B_EXTRA: GradedAnswer[] = [
  // ─────────────────────────────── wsim-d2b-4 · Lektier ───────────────────────────────
  {
    id: 'wgr-d2b-4-12',
    taskId: 'wsim-d2b-4',
    band: '12',
    origin: 'illustrative',
    text: p(
      'Spørgsmålet om lektier deler både forældre og lærere, og flere skoler har allerede valgt at afskaffe dem.',
      'Da jeg selv gik i skole i Vietnam, fik vi lektier for hver dag, og jeg sad ofte ved køkkenbordet til sent om aftenen. I dag har min søn kun få lektier i 3. klasse, men alligevel ender de tit i en diskussion ved spisebordet.',
      'Jeg er enig i synspunktet om, at lektier skaber ulighed. Nogle børn har forældre, der kan forklare brøker og stavning, mens andre må klare sig selv. Til gengæld er jeg ikke enig i, at eleverne ikke når at øve sig nok uden lektier, for øvelsen kan sagtens foregå i timerne.',
      'Der er flere fordele ved at afskaffe lektierne. For det første får børnene mere tid til leg, sport og venner, hvilket også er vigtigt for deres udvikling. For det andet forsvinder mange konflikter i familierne, og alle elever står mere lige, når ingen er afhængige af hjælp derhjemme.',
      'Omvendt er der også ulemper. Lektier kan lære børn at arbejde selvstændigt og tage ansvar, og de giver forældrene et indblik i, hvad barnet lærer. Hvis lektierne forsvinder helt, mister mange forældre denne kontakt til skolen.',
      'Når jeg vejer fordele og ulemper op imod hinanden, mener jeg, at lektierne bør afskaffes i de små klasser og erstattes af en lektiecafé. I de ældre klasser giver det derimod mening med lidt lektier, fordi eleverne skal forberede sig på gymnasiet.',
      'Alt i alt vejer fordelene tungest, så længe skolen sørger for, at øvelsen sker i skoletiden, hvor alle kan få hjælp.',
    ),
    summary:
      'Top band: short, concrete experience, two named viewpoints with reasons, a balanced evaluation of about half the text that keeps advantages and disadvantages apart and ends in a nuanced position, in precise, varied Danish.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The experience bullet is two sentences that contrast the writer\'s own school days with the son\'s ("ender de tit i en diskussion ved spisebordet"). Two viewpoints are named and answered, one agreed with and one rejected, each with a reason. The evaluation (from "Der er flere fordele" to the end) is about half the answer, gives each side its own paragraph and reaches a reasoned compromise ("afskaffes i de små klasser og erstattes af en lektiecafé").',
      },
      {
        criterion: 'pragmatic',
        comment:
          'One paragraph per job, with clear signposts: "For det første … For det andet", "Omvendt er der også ulemper", "Når jeg vejer fordele og ulemper op imod hinanden", "Alt i alt". The direction of "fordele ved at afskaffe" is kept straight throughout, and the conclusion picks up the inequality point from the viewpoints paragraph.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Precise vocabulary (klare sig selv, står mere lige, et indblik i, forberede sig på), correct inversion after fronted elements ("I dag har min søn", "Til gengæld er jeg", "For det første får børnene"), and correct ikke-placement in subordinate clauses ("at eleverne ikke når"). Plural "lektier/lektierne" is used consistently.',
      },
    ],
    annotations: [
      {
        quote: 'men alligevel ender de tit i en diskussion ved spisebordet',
        kind: 'good',
        note: 'One everyday detail makes the experience concrete and leads naturally into the conflict viewpoint later.',
      },
      {
        quote: 'Til gengæld er jeg ikke enig i, at eleverne ikke når at øve sig nok uden lektier',
        kind: 'good',
        note: 'Names a second viewpoint and disagrees with it; inversion after "Til gengæld" and "ikke" before the verb in the at-clause are both correct.',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'For det første får børnene mere tid',
        kind: 'good',
        note: 'Fronted "For det første" correctly triggers inversion and structures the list of advantages.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'alle elever står mere lige, når ingen er afhængige af hjælp derhjemme',
        kind: 'good',
        note: 'Plural agreement ("afhængige") is right, and the argument links back to the inequality viewpoint.',
      },
      {
        quote: 'Omvendt er der også ulemper.',
        kind: 'good',
        note: 'A short topic sentence that clearly switches to the other side, which "fordele og ulemper" requires.',
      },
      {
        quote: 'lektierne bør afskaffes i de små klasser og erstattes af en lektiecafé',
        kind: 'good',
        note: 'A nuanced own position with a concrete alternative, rather than a plain yes or no; the passive "afskaffes … erstattes" adds range.',
      },
    ],
  },
  {
    id: 'wgr-d2b-4-7',
    taskId: 'wsim-d2b-4',
    band: '7',
    origin: 'illustrative',
    text: p(
      'Lektier i skolen',
      'Da jeg var barn i Polen, havde jeg mange lektier hver dag. Min mor hjalp mig med matematik, men hun var ikke så god til engelsk, så jeg måtte tit spørge min storebror. Nu jeg har to børn i en dansk skole. De har ikke så mange lektier som jeg havde, men de laver dem tit sammen med mig om aftenen, når vi har spist.',
      'Jeg er enig i, at lektier giver konflikter i mange familier. Hos os er der ofte et diskussion, fordi min søn vil hellere spille fodbold med sine venner. Han siger, at han har været i skole hele dagen, og at han er træt. Jeg synes også, at det er godt med en lektiecafé på skolen, fordi så kan alle børn få hjælp af en lærer, også dem som har forældre der ikke taler dansk.',
      'Hvad er fordele og ulemper ved at afskaffe lektier? Jeg synes, der er mange fordele. Børnene får mere fri tid, og de kan lege med deres venner. Og børn fra familier, hvor forældrene ikke kan hjælpe, har det samme chance som de andre.',
      'Men der er også ulemper. Nogle børn har brug for at øve mere, for eksempel at læse. Hvis de ikke har lektier, de læser måske slet ikke derhjemme.',
      'Jeg synes, at skolen skal afskaffe de fleste lektier, men børnene skal stadig læse lidt hjemme hver dag. Til sidst vil jeg sige, at lektiecafé er den bedste løsning for alle.',
    ),
    summary:
      'Solid middle band: every bullet is answered and both sides appear, but the evaluation is thin (the disadvantages get two sentences), "Jeg synes" carries the argument, and there are V2, adverb-placement and gender slips that never block understanding.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Experience and viewpoints are covered and two statements are named (konflikter, lektiecafé). The evaluation is a little over a third of the text: the advantages get a paragraph, but the disadvantages are only "Nogle børn har brug for at øve mere" plus one example, and the final view is stated without being weighed against them.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Paragraphs follow the bullets, but the evaluation opens with a bare question and the linking is repetitive: "Jeg synes" four times, "Og" and "Men" to start sentences. "Til sidst vil jeg sige" closes without really summing up.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Everyday vocabulary used correctly most of the time. Recurring slips: missing inversion ("Nu jeg har", "Hvis de ikke har lektier, de læser"), adverb placement in a subordinate clause ("fordi min søn vil hellere"), and gender ("et diskussion", "det samme chance"). Commas before relative clauses are missing.',
      },
    ],
    annotations: [
      {
        quote: 'Nu jeg har to børn',
        kind: 'error',
        note: '"Nu" fills the front slot of the main clause, so the finite verb comes before the subject.',
        fix: 'Nu har jeg to børn',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'et diskussion',
        kind: 'error',
        note: '"diskussion" is a common-gender (en) noun, like most nouns ending in -ion.',
        fix: 'en diskussion',
      },
      {
        quote: 'fordi min søn vil hellere spille',
        kind: 'error',
        note: 'In a subordinate clause (after fordi) the sentence adverb "hellere" goes before the finite verb, just like "ikke".',
        fix: 'fordi min søn hellere vil spille',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'det samme chance',
        kind: 'error',
        note: '"chance" is common gender, so the article is "den".',
        fix: 'den samme chance',
      },
      {
        quote: 'Hvis de ikke har lektier, de læser',
        kind: 'error',
        note: 'A hvis-clause in front fills the first slot; the main clause must start with the verb.',
        fix: 'Hvis de ikke har lektier, læser de',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Men der er også ulemper. Nogle børn har brug for at øve mere',
        kind: 'style',
        note: 'The disadvantages are only two sentences, so the evaluation is lopsided. Add one more argument, e.g. that homework teaches children to work on their own, and weigh it against the advantages.',
      },
      {
        quote: 'Jeg synes, der er mange fordele.',
        kind: 'style',
        note: 'Another "Jeg synes". Vary with "Efter min mening …", "Det taler for …", "Jeg mener, at …".',
      },
    ],
  },
  {
    id: 'wgr-d2b-4-4',
    taskId: 'wsim-d2b-4',
    band: '4',
    origin: 'illustrative',
    text: p(
      'Jeg kommer fra Syrien og der jeg gik i skole i tolv år. Vi havde mange lektier og læreren var meget strenge. Hvis man har ikke lavet lektier, man fik straf. Hvert år alle børn skulle gå til eksamen. Jeg kan huske at jeg lavede lektier hver aften i tre eller fire timer og jeg havde ikke tid til at lege med mine venner. Mine forældre var stolte men jeg var tit træt i skolen. Nu min datter går i 2. klasse i Danmark og hun har næsten ingen lektier. Hun leger hele eftermiddag med hendes veninder.',
      'Jeg er enig med at børn har brug for fri. Men også lektier er vigtig fordi børn skal øve. Min datter læser ikke derhjemme, og hun kan ikke læse så godt endnu.',
      'Jeg synes ikke at man skal afskaffe lektier. Hvis børnene har ingen lektier de glemmer hvad de har lært i skolen. Fordelen er at de har mere tid til at lege, men det er ikke så vigtigt. I Danmark børnene lærer mindre end i mit land, synes jeg. Derfor skal skolen give flere lektier og ikke færre.',
      'Det er det, jeg mener om lektier.',
    ),
    summary:
      'Pass: the experience paragraph dominates, the viewpoints get a few vague sentences, and the evaluation names one advantage only to dismiss it; word-order and agreement errors are frequent.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The experience bullet takes about half the text instead of "kort". The viewpoints paragraph agrees with one statement without naming it properly, and the reason ("børn skal øve") is not developed. The evaluation is about a third of the text and one-sided: one advantage ("mere tid til at lege") is mentioned and waved away with "det er ikke så vigtigt", so "fordele og ulemper" is not really weighed.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Paragraphs follow the bullets, but the text is mostly storytelling joined with "og" and "men". The last line announces an end rather than summing up the position.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Simple vocabulary. Inversion is missed after almost every fronted element ("der jeg gik", "Nu min datter går", "I Danmark børnene lærer"), ikke is misplaced in subordinate clauses ("Hvis man har ikke lavet"), and agreement is shaky ("læreren var meget strenge", "lektier er vigtig").',
      },
    ],
    annotations: [
      {
        quote: 'der jeg gik i skole',
        kind: 'error',
        note: '"der" (there) fills the front slot, so the verb comes before the subject.',
        fix: 'der gik jeg i skole',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Hvis man har ikke lavet lektier, man fik straf',
        kind: 'error',
        note: 'Two errors: ikke goes before the finite verb in a hvis-clause, and the main clause after it needs inversion. The tense should also stay in the past.',
        fix: 'Hvis man ikke havde lavet lektier, fik man straf',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Nu min datter går',
        kind: 'error',
        note: 'Fronted "Nu" → verb before subject.',
        fix: 'Nu går min datter',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'hele eftermiddag med hendes veninder',
        kind: 'error',
        note: '"hele" takes the definite form of a time noun ("hele eftermiddagen"), and the friends belong to the subject, so use reflexive "sine".',
        fix: 'hele eftermiddagen med sine veninder',
      },
      {
        quote: 'Jeg er enig med at børn har brug for fri.',
        kind: 'error',
        note: 'Agree in a statement is "enig i, at …". The sentence also stops before saying why: name the viewpoint and give a reason.',
        fix: 'Jeg er enig i, at børn har brug for fri, fordi …',
      },
      {
        quote: 'Fordelen er at de har mere tid til at lege, men det er ikke så vigtigt.',
        kind: 'style',
        note: 'One advantage dismissed in half a sentence is not a weighing of "fordele og ulemper". Give the advantages a real paragraph before you reject them.',
      },
      {
        quote: 'I Danmark børnene lærer',
        kind: 'error',
        note: 'Fronted place adverbial → inversion.',
        fix: 'I Danmark lærer børnene',
        ruleId: 'v2-inversion',
      },
    ],
  },
  {
    id: 'wgr-d2b-4-02',
    taskId: 'wsim-d2b-4',
    band: '02',
    origin: 'illustrative',
    text: p(
      'Lektier er en vigtig ting for alle børn og for familien. Jeg har tre børn og de går i skole i Danmark. Jeg arbejder i en kantine til kl. 17. Min store søn er 13 år og han har mange lektier i matematik og engelsk og dansk. Hver dag han kommer hjem kl. 15 og så han spiller computer. Jeg siger til ham at han skal lave lektier først men han hører ikke. Så vi har en problem. Min datter er 9 år og hun er god pige, hun laver altid lektier med det samme. Min lille søn går i 0. klasse og han har ikke lektier endnu. I mit land Somalia vi havde ikke mange bøger i skole, vi skrev alt i en hæfte.',
      'I listen der står at børn skal have fri. Det er rigtig. Men også de skal lære meget fordi de skal få en god arbejde. Lektiecafé er god idé, min søn går der nogle gange og han får hjælp af læreren. Lærerne er søde og de har god tid. Det kan jeg godt lide fordi jeg kan ikke hjælpe ham med engelsk.',
      'Jeg synes lektier er godt og man skal ikke afskaffe dem.',
      'Det var alt fra mig.',
    ),
    summary:
      'Bare pass: about 200 understandable words, but the evaluation that should be half the answer is one sentence with no advantages, disadvantages or reasons, and errors run through every line.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Experience is covered at length (three children, the son who plays computer). Two statements are touched (fri, lektiecafé), the second with a personal reason. The evaluation is a single sentence, "Jeg synes lektier er godt og man skal ikke afskaffe dem", with no advantages or disadvantages at all.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'There are paragraphs, but sentences are strung together with "og" and "så", and two main clauses are joined with a comma ("hun er god pige, hun laver"). "Det var alt fra mig" is a spoken formula, not a conclusion.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Basic vocabulary with frequent errors: inversion ("Hver dag han kommer", "så han spiller", "vi havde"), ikke-placement ("fordi jeg kan ikke"), gender ("en problem", "en god arbejde", "en hæfte") and agreement ("Det er rigtig"). The meaning still comes through.',
      },
    ],
    annotations: [
      {
        quote: 'Hver dag han kommer hjem kl. 15 og så han spiller computer',
        kind: 'error',
        note: 'Both "Hver dag" and "så" fill the front slot of their clause, so the verb must come before the subject each time.',
        fix: 'Hver dag kommer han hjem kl. 15, og så spiller han computer',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'en problem',
        kind: 'error',
        note: '"problem" is a neuter (et) noun.',
        fix: 'et problem',
      },
      {
        quote: 'I mit land Somalia vi havde',
        kind: 'error',
        note: 'Fronted place adverbial → inversion.',
        fix: 'I mit land, Somalia, havde vi',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'I listen der står',
        kind: 'error',
        note: 'Things are written "på listen", and the fronted adverbial needs inversion with "der" as formal subject.',
        fix: 'På listen står der',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'en god arbejde',
        kind: 'error',
        note: '"arbejde" is neuter, and the adjective agrees.',
        fix: 'et godt arbejde',
      },
      {
        quote: 'fordi jeg kan ikke hjælpe ham',
        kind: 'error',
        note: 'In a fordi-clause "ikke" goes before the finite verb.',
        fix: 'fordi jeg ikke kan hjælpe ham',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Jeg synes lektier er godt og man skal ikke afskaffe dem.',
        kind: 'style',
        note: 'This one sentence is the whole evaluation. The task asks for advantages and disadvantages of abolishing homework, about half the text, with reasons: e.g. one paragraph on more free time and fewer conflicts, one on practice and responsibility, then your view.',
      },
    ],
  },

  // ─────────────────────────── wsim-d2b-5 · At flytte på landet ───────────────────────────
  {
    id: 'wgr-d2b-5-12',
    taskId: 'wsim-d2b-5',
    band: '12',
    origin: 'illustrative',
    text: p(
      'Boligpriserne i København og Aarhus er steget så meget, at mange børnefamilier drømmer om et hus på landet.',
      'Selv voksede jeg op i en lille by i Rumænien, hvor alle kendte hinanden. Da jeg kom til Danmark, boede jeg i en toværelseslejlighed på Nørrebro, men sidste år flyttede min familie til en landsby på Sydsjælland.',
      'Jeg er enig i synspunktet om, at man får et større hus for de samme penge. For prisen på vores gamle lejlighed har vi nu fået et hus med have. Derimod tror jeg ikke helt på, at folk i en landsby altid hjælper hinanden. Det tager tid at blive en del af fællesskabet, især som tilflytter.',
      'Spørgsmålet er, om det er en god idé for børnefamilier at flytte ud på landet. Det taler for at flytte, at børnene får mere plads og frisk luft, og at familien kan spare mange penge på boligen. Desuden kan børnene cykle alene i skole, fordi der er langt mindre trafik.',
      'På den anden side bliver man afhængig af bilen, fordi bussen måske kun kører et par gange om dagen. Mange forældre må pendle over en time hver vej, og når skolen eller lægen i landsbyen lukker, bliver afstandene endnu længere.',
      'Efter min mening er det en god idé, men kun hvis mindst én af forældrene kan finde arbejde i nærheden. Ellers risikerer familien at tilbringe den tid i bilen, som de flyttede for at få sammen.',
      'Samlet set kan livet på landet give børnefamilier både plads og ro, så længe de har planlagt transporten og arbejdet, før de flytter.',
    ),
    summary:
      'Top band: brief, concrete experience, two named viewpoints with an example, and an evaluation of about half the text that weighs reasons for and against and answers the "om" question with a clear yes and a condition.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The experience bullet is two sentences covering both a small town abroad and the move from Nørrebro to Sydsjælland. Two viewpoints are named: the bigger house is supported with the writer\'s own example, and the helpful village is questioned. The evaluation (from "Spørgsmålet er" to the end) is about half the answer and gives a direct answer to the question: "Efter min mening er det en god idé, men kun hvis …".',
      },
      {
        criterion: 'pragmatic',
        comment:
          'The evaluation is framed by repeating the question, then "Det taler for … På den anden side … Efter min mening … Samlet set". The arguments stay on families with children (cycling to school, commuting parents), and the last sentence of the opinion paragraph ties the car argument back to the reason for moving.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Precise, idiomatic choices (en toværelseslejlighed, tilflytter, pendle, tilbringe tid) and correct prepositions ("på Nørrebro", "på Sydsjælland", "ud på landet"). Inversion after fronted elements is consistent ("Selv voksede jeg", "Derimod tror jeg", "Desuden kan børnene"), and the relative clause "den tid …, som de flyttede for at få sammen" is advanced and correct.',
      },
    ],
    annotations: [
      {
        quote: 'Selv voksede jeg op i en lille by i Rumænien',
        kind: 'good',
        note: 'Fronted "Selv" gives emphasis, and the verb correctly comes before the subject.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'For prisen på vores gamle lejlighed har vi nu fået et hus med have.',
        kind: 'good',
        note: 'Backs the viewpoint with the writer\'s own example instead of just "det er rigtigt".',
      },
      {
        quote: 'især som tilflytter',
        kind: 'good',
        note: '"Tilflytter" (newcomer to a place) is exactly the right word, and it gives a reason for doubting the viewpoint.',
      },
      {
        quote: 'Spørgsmålet er, om det er en god idé for børnefamilier at flytte ud på landet.',
        kind: 'good',
        note: 'Restating the question opens the evaluation clearly and keeps the focus on families with children.',
      },
      {
        quote: 'når skolen eller lægen i landsbyen lukker, bliver afstandene endnu længere',
        kind: 'good',
        note: 'A når-clause in front, then correct inversion ("bliver afstandene"); the argument looks ahead rather than only at today.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Efter min mening er det en god idé, men kun hvis mindst én af forældrene kan finde arbejde i nærheden.',
        kind: 'good',
        note: '"Vurdér, om" asks for a yes or no: this gives one, with the condition that decides it.',
      },
    ],
  },
  {
    id: 'wgr-d2b-5-7',
    taskId: 'wsim-d2b-5',
    band: '7',
    origin: 'illustrative',
    text: p(
      'At bo på landet',
      'Jeg kommer fra en stor by i Brasilien, São Paulo. Der bor over tolv millioner mennesker, og det er meget larm og trafik hele tiden. Vi boede i et højhus, og vi kunne ikke lade børnene lege ude alene. Da jeg kom til Danmark, jeg boede først i en lille lejlighed i Odense. Nu bor jeg i en landsby på Fyn med min mand og vores to børn, og vi er glad for at bo her.',
      'Jeg er enig i, at børn har det bedre tæt på naturen. Mine børn leger i skoven næsten hver dag efter skole, og de bruger ikke så meget tid foran skærmen. Men jeg er også enig i, at man bliver afhængig af bil på landet. Vi har to biler nu, fordi bussen kører kun en gang i timen, og det er dyrt.',
      'Er det en god idé at flytte på landet? Jeg synes, at det er en god idé for mange familier. Husene er billigere, og der er mere plads og ro. Mange mennesker i landsbyen kender hinanden, og det giver tryghed.',
      'Men der er også nogle problemer. Der er ikke så mange job på landet, så forældrene skal køre langt til arbejde. Hvis man ikke har bil, det er svært at komme rundt.',
      'Til sidst vil jeg sige, at jeg synes, det er en god idé, hvis man har et arbejde i nærheden. Det er det vigtigste for familien.',
    ),
    summary:
      'Solid middle band: every bullet is answered and the question gets a yes with a condition, but the evaluation is short and lists rather than weighs; V2 and ikke slips, an agreement error and "det/der" confusion recur without blocking understanding.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Experience and viewpoints are covered, and both named statements get a personal example (the children in the forest, the two cars). The evaluation is just over a third of the text. It does answer the question ("en god idé … hvis man har et arbejde i nærheden"), but each side is a short list of points without development, and nothing is said about the children specifically in the second half.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Clear paragraphs that follow the bullets. The evaluation starts with a bare question, "Jeg synes" appears three times, and "Men" opens two paragraphs. The closing sentence repeats the opinion rather than summing up.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Good everyday vocabulary (tryghed, komme rundt, foran skærmen). Recurring slips: missing inversion ("Da jeg kom til Danmark, jeg boede", "Hvis man ikke har bil, det er"), ikke after the verb in a fordi-clause, "det er" for "der er", and a plural adjective missing ("vi er glad").',
      },
    ],
    annotations: [
      {
        quote: 'det er meget larm og trafik',
        kind: 'error',
        note: 'When you say that something exists or is somewhere, Danish uses "der" as the formal subject.',
        fix: 'der er meget larm og trafik',
      },
      {
        quote: 'Da jeg kom til Danmark, jeg boede',
        kind: 'error',
        note: 'A da-clause in front fills the first slot, so the main clause starts with the verb.',
        fix: 'Da jeg kom til Danmark, boede jeg',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'vi er glad for',
        kind: 'error',
        note: 'A plural subject takes a plural predicative adjective.',
        fix: 'vi er glade for',
      },
      {
        quote: 'fordi bussen kører kun en gang i timen',
        kind: 'error',
        note: 'In a fordi-clause the sentence adverb "kun" goes before the finite verb, like "ikke".',
        fix: 'fordi bussen kun kører en gang i timen',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Hvis man ikke har bil, det er svært',
        kind: 'error',
        note: 'A hvis-clause in front → inversion in the main clause.',
        fix: 'Hvis man ikke har bil, er det svært',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Mine børn leger i skoven næsten hver dag efter skole',
        kind: 'good',
        note: 'A concrete example from the writer\'s own life supports the viewpoint, which is exactly what "kommentér" asks for.',
      },
      {
        quote: 'Er det en god idé at flytte på landet? Jeg synes, at det er en god idé for mange familier.',
        kind: 'style',
        note: 'A bare question plus "Jeg synes" is a weak start to the most important part. Try "Spørgsmålet er, om … Det taler for, at …", and keep the focus on families with children.',
      },
    ],
  },
  {
    id: 'wgr-d2b-5-4',
    taskId: 'wsim-d2b-5',
    band: '4',
    origin: 'illustrative',
    text: p(
      'Jeg bor i Ishøj med min familie i en lejlighed. Vi har tre børn og lejligheden er for lille, børnene har ikke deres eget værelse. Vi har kun to soveværelser og en lille altan. Derfor vi tænker på at flytte. Min mand vil gerne bo på landet fordi han kommer fra en landsby i Tyrkiet og han savner naturen og dyrene. Men jeg er ikke sikker fordi jeg har arbejde i København på et hospital og jeg vil ikke køre langt.',
      'På listen står at på landet får man et større hus for de samme penge. Det er rigtig. Min kusine bor i Lolland og hun har et stort hus med en have og hun betaler mindre end os. Hendes børn har mange dyrer, høns og en kanin. Og jeg er også enig at børn har det bedre i naturen. Men jeg tror ikke at alle i en landsby hjælper hinanden, min kusine siger at hun har ikke mange venner der.',
      'Jeg synes det er en god idé at flytte på landet. Børnene kan lege udenfor og der er ikke farlig. Familien kan spare penge og få et hus med have. Men man skal køre meget bil.',
      'Så vi skal snakke mere om det i min familie.',
    ),
    summary:
      'Pass: the experience and viewpoints are covered with personal detail, but the evaluation is short and one-sided, the only counter-argument is half a sentence, and errors in word order, prepositions and plurals are frequent.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Experience and viewpoints are covered, with two statements named and supported by the cousin\'s house. The evaluation is about a quarter of the text: it gives three reasons for moving and then only "Men man skal køre meget bil", so the question is answered but not weighed. The writer\'s own commuting problem from the first paragraph, a strong counter-argument, is not used.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Paragraphs follow the bullets, but linking is mostly "og" and "men", and a comma joins two main clauses ("lejligheden er for lille, børnene har"). The last line is about the writer\'s family, not a summary of the answer.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Simple, mostly clear vocabulary. Missing inversion ("Derfor vi tænker"), a missing formal subject ("På listen står at"), a wrong preposition with an island ("i Lolland"), a wrong plural ("dyrer") and agreement errors ("Det er rigtig", "der er ikke farlig").',
      },
    ],
    annotations: [
      {
        quote: 'Derfor vi tænker',
        kind: 'error',
        note: '"Derfor" fills the front slot, so the verb comes before the subject.',
        fix: 'Derfor tænker vi',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'På listen står at',
        kind: 'error',
        note: 'After the fronted "På listen" the verb comes next, and the sentence needs "der" as formal subject.',
        fix: 'På listen står der, at',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'bor i Lolland',
        kind: 'error',
        note: 'Islands take "på": på Lolland, på Fyn, på Bornholm.',
        fix: 'bor på Lolland',
      },
      {
        quote: 'mange dyrer',
        kind: 'error',
        note: '"dyr" has the same form in the plural.',
        fix: 'mange dyr',
      },
      {
        quote: 'der er ikke farlig',
        kind: 'error',
        note: 'Here "det" is the subject (it is not dangerous), and a predicative adjective after "det" takes the neuter -t.',
        fix: 'det er ikke farligt',
      },
      {
        quote: 'Men man skal køre meget bil.',
        kind: 'style',
        note: 'The only counter-argument is half a line. Develop it, e.g. with your own long commute to the hospital, and then say whether it outweighs the advantages.',
      },
    ],
  },
  {
    id: 'wgr-d2b-5-02',
    taskId: 'wsim-d2b-5',
    band: '02',
    origin: 'illustrative',
    text: p(
      'Jeg har boet i Danmark i 6 år. Først jeg boede i Esbjerg og så i Vejle og nu i Kolding. Alle er byer, ikke landet. I mit hjemland Eritrea jeg boede i en landsby med min familie, vi havde geder og høns. Vi havde ikke elektricitet og om aften vi brugte lamper. Vi skal gå langt for at hente vand og der var ikke en skole tæt på. Min far var bonde og arbejde hele dagen på marken. Det var et hårdt liv men vi var glad. Jeg savner tit min landsby og min mor som stadig bor der.',
      'I listen jeg kan lide at børn har det bedre med naturen. Det er rigtig fordi i byen der er mange biler og det er ikke godt for børnene at lege på vejen. Også man kan få et stor hus på landet. Men der er ikke arbejde på landet, det er en problem for mange. Min ven flyttede til en lille by og han kører 1 time hver dag til sin arbejde og han er altid træt når han kommer hjem. Han siger det er dyrt med benzin.',
      'Jeg tror det er en god idé hvis man har bil.',
      'Det var min mening.',
    ),
    summary:
      'Bare pass: about 200 understandable words, but the evaluation is one sentence that never weighs anything, and word order, verb forms, gender and agreement go wrong in most lines.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The experience bullet takes half the text (the village in Eritrea). Two statements are touched in the viewpoints paragraph, with the friend who drives an hour as an example. The evaluation, which should be half the answer, is "Jeg tror det er en god idé hvis man har bil": no reasons and nothing about families with children.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'There are paragraphs, but sentences are joined with "og" and commas ("Men der er ikke arbejde på landet, det er en problem"). "Det var min mening" closes without summing up.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Basic vocabulary. Inversion is missed again and again ("Først jeg boede", "I mit hjemland Eritrea jeg boede", "i byen der er"), tense and verb forms slip ("Vi skal gå" for the past, "arbejde" for "arbejdede"), and gender and agreement are often wrong ("et stor hus", "en problem", "sin arbejde", "vi var glad").',
      },
    ],
    annotations: [
      {
        quote: 'Først jeg boede',
        kind: 'error',
        note: 'Fronted "Først" → verb before subject.',
        fix: 'Først boede jeg',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Vi skal gå langt',
        kind: 'error',
        note: 'The story is in the past, so the modal verb must be in the past too.',
        fix: 'Vi skulle gå langt',
      },
      {
        quote: 'arbejde hele dagen',
        kind: 'error',
        note: 'Past tense of "arbejde" is "arbejdede".',
        fix: 'arbejdede hele dagen',
      },
      {
        quote: 'I listen jeg kan lide',
        kind: 'error',
        note: 'A list is "på listen", and the fronted adverbial needs inversion.',
        fix: 'På listen kan jeg godt lide',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'et stor hus',
        kind: 'error',
        note: 'After "et" the adjective takes neuter -t.',
        fix: 'et stort hus',
      },
      {
        quote: 'sin arbejde',
        kind: 'error',
        note: '"arbejde" is a neuter noun, so the reflexive possessive is "sit".',
        fix: 'sit arbejde',
      },
      {
        quote: 'Jeg tror det er en god idé hvis man har bil.',
        kind: 'style',
        note: 'This is the whole evaluation. Give reasons for and against moving with children (space and nature vs. long drives and fewer jobs), then answer the question, all in about half the text.',
      },
    ],
  },

  // ─────────────────────────── wsim-d2b-6 · Affald i naturen ───────────────────────────
  {
    id: 'wgr-d2b-6-12',
    taskId: 'wsim-d2b-6',
    band: '12',
    origin: 'illustrative',
    text: p(
      'Når man går en tur langs stranden eller i parken, støder man desværre ofte på dåser, plastikposer og kaffekopper.',
      'For to år siden var jeg med til en affaldsindsamling i mit lokalområde. På bare to timer fyldte vi tolv sække, og det overraskede mig, hvor meget der lå gemt i buskene langs cykelstien.',
      'Jeg er enig i forslaget om, at der skal være pant på flere slags emballage. Når en dåse er penge værd, bliver den sjældent liggende. Til gengæld er jeg uenig i, at det kun er kommunens opgave at gøre rent. Så længe folk tror, at andre rydder op efter dem, ændrer de ikke deres vaner.',
      'Spørgsmålet er, om det først og fremmest er den enkelte borgers eller kommunens ansvar. Det taler for borgernes ansvar, at det er os selv, der smider affaldet. Ingen tvinger os til at efterlade en flaske på stranden, og det koster næsten ingen anstrengelse at tage den med hjem.',
      'På den anden side kan kommunen gøre det meget lettere at opføre sig ordentligt. Hvis skraldespandene er fyldte eller står langt fra hinanden, ender affaldet let på jorden. Desuden er det kun kommunen, der kan give bøder og sørge for den daglige rengøring.',
      'Efter min mening ligger hovedansvaret alligevel hos den enkelte, fordi affald i naturen i bund og grund handler om holdninger. Kommunen skal dog skabe de rigtige rammer med flere skraldespande og kampagner i skolerne.',
      'Alt i alt er ren natur et fælles projekt, men det begynder med, at hver enkelt af os tager sit eget affald med hjem.',
    ),
    summary:
      'Top band: a vivid, brief experience, two suggestions named with reasons, and a balanced evaluation of about half the text that chooses the individual as the main bearer of responsibility while giving the municipality a clear role.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The experience bullet is one concrete episode (twelve sacks in two hours). Two suggestions are named: pant is supported and "kommunens opgave" is rejected, with a reason that is not repeated in the evaluation. The evaluation (from "Spørgsmålet er" to the end) is about half the text, argues both sides and answers "først og fremmest" directly: "hovedansvaret alligevel hos den enkelte".',
      },
      {
        criterion: 'pragmatic',
        comment:
          'The evaluation is framed by the question and then "Det taler for … På den anden side … Efter min mening … Alt i alt". The opinion paragraph first decides and then qualifies ("Kommunen skal dog …"), and the last sentence echoes the list item about taking your own rubbish home.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Rich, idiomatic vocabulary (støde på, blive liggende, i bund og grund, opføre sig ordentligt, skabe de rigtige rammer) and "affald" used correctly as uncountable. Inversion is consistent after fronted clauses ("Når en dåse er penge værd, bliver den"), and ikke is placed correctly in "ændrer de ikke deres vaner".',
      },
    ],
    annotations: [
      {
        quote: 'På bare to timer fyldte vi tolv sække',
        kind: 'good',
        note: 'A number makes the experience concrete in a single clause; inversion after the fronted time phrase is correct.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Når en dåse er penge værd, bliver den sjældent liggende.',
        kind: 'good',
        note: 'A short, convincing reason for the suggestion; "blive liggende" (be left lying) is very idiomatic.',
      },
      {
        quote: 'Så længe folk tror, at andre rydder op efter dem, ændrer de ikke deres vaner.',
        kind: 'good',
        note: 'Rejects the viewpoint with a reason; the main clause correctly inverts after the long fronted clause.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Ingen tvinger os til at efterlade en flaske på stranden',
        kind: 'good',
        note: 'A sharp, concrete argument for the individual\'s responsibility rather than a general statement.',
      },
      {
        quote: 'Desuden er det kun kommunen, der kan give bøder',
        kind: 'good',
        note: 'A cleft sentence ("det er kun …, der …") to stress who can act; inversion after "Desuden" is correct.',
      },
      {
        quote: 'Efter min mening ligger hovedansvaret alligevel hos den enkelte',
        kind: 'good',
        note: '"Alligevel" shows the writer has weighed the counter-arguments before choosing a side, as "først og fremmest" requires.',
      },
    ],
  },
  {
    id: 'wgr-d2b-6-7',
    taskId: 'wsim-d2b-6',
    band: '7',
    origin: 'illustrative',
    text: p(
      'Affald i naturen',
      'Jeg bor i Aalborg tæt på havnen, og jeg går tit en tur der med min hund. Om weekenden der ligger mange flasker og poser på græsset, især efter en varm lørdag aften, hvor mange unge har siddet og hygget sig. Det er ikke rart at se, og det er farligt for fuglene og for hunde. Et par gange har jeg selv taget en pose med og samlet flasker op.',
      'Jeg er enig i, at folk, der smider affald, skal have en høj bøde. Hvis det koster 1.000 kr., så folk tænker sig om, før de smider en dåse. Jeg har set skilte med bøder i Tyskland, og der var meget rent. Jeg synes også, at der skal være flere skraldespande, fordi der er ikke skraldespande nok ved havnen, og de er tit fulde om søndagen.',
      'Hvem har ansvaret, borgerne eller kommunen? Jeg synes, at borgerne har det største ansvar. Det er jo os, der smider affaldet, og vi kan nemt tage det med hjem.',
      'Men kommunen har også et ansvar. De skal tømme skraldespandene oftere og gøre rent i parkerne. Jeg synes også, at kommunen kan lave kampagner om affald på Facebook. Mange folk ved ikke, at en plastikpose kan ligge i naturen i mange år.',
      'Til sidst vil jeg sige, at begge har et ansvar, men borgerne har det største. Hvis alle gør lidt, bliver vores by mere ren.',
    ),
    summary:
      'Solid middle band: all three bullets are answered and a main side is chosen, but the evaluation is thin and mostly asserts rather than argues; V2 and ikke slips and a few unidiomatic choices appear without blocking understanding.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The experience is concrete (the harbour after a Saturday night) and two suggestions are named with reasons (bøde, skraldespande). The evaluation is just under 40 % of the text: it picks the citizens as the main side, but the case for them is one sentence ("vi kan nemt tage det med hjem"), and the municipality\'s side is a list of tasks rather than an argument.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Clear paragraphs. The evaluation opens with a bare question, "Jeg synes" appears three times, and "også" is overused. The conclusion repeats the opinion but does round the answer off.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Good topic vocabulary (tænke sig om, tømme skraldespandene, hygge sig). Errors: missing inversion ("Om weekenden der ligger", "så folk tænker"), ikke after the verb in a fordi-clause, "mange folk" for "mange mennesker", and "mere ren" where Danish uses the comparative ending.',
      },
    ],
    annotations: [
      {
        quote: 'Om weekenden der ligger',
        kind: 'error',
        note: 'Fronted time expression → the verb comes before "der".',
        fix: 'Om weekenden ligger der',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'så folk tænker sig om',
        kind: 'error',
        note: 'After a hvis-clause, "så" fills the front slot, so the verb comes before the subject.',
        fix: 'så tænker folk sig om',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'fordi der er ikke skraldespande nok',
        kind: 'error',
        note: 'In a fordi-clause "ikke" goes before the finite verb.',
        fix: 'fordi der ikke er skraldespande nok',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Mange folk ved ikke',
        kind: 'style',
        note: '"Folk" is already plural and sounds odd with "mange" in writing; "mange mennesker" is the neutral choice.',
      },
      {
        quote: 'bliver vores by mere ren',
        kind: 'error',
        note: 'Short adjectives form the comparative with -ere, not "mere".',
        fix: 'bliver vores by renere',
      },
      {
        quote: 'Det er jo os, der smider affaldet, og vi kan nemt tage det med hjem.',
        kind: 'good',
        note: 'A real argument for the citizens\' side; the evaluation would reach a higher band if each side had two or three like it.',
      },
      {
        quote: 'Hvem har ansvaret, borgerne eller kommunen? Jeg synes, at borgerne har det største ansvar.',
        kind: 'style',
        note: 'A bare question plus "Jeg synes" is a weak start. Restate the task ("Spørgsmålet er, om …") and vary the opinion verbs.',
      },
    ],
  },
  {
    id: 'wgr-d2b-6-4',
    taskId: 'wsim-d2b-6',
    band: '4',
    origin: 'illustrative',
    text: p(
      'I mit hjemland Indien der er meget affald på gaden. Folk smider alt på jorden, plastik, mad og papir, og ingen gør rent. Da jeg kom til Danmark i 2019, jeg var meget overrasket fordi alt var så rent og pænt. Men nu jeg ser også affald her, især ved stranden om sommeren. Sidste sommer jeg var på Amager Strand med min familie og der var mange dåser og poser i sandet. Min søn fandt en flaske med glasskår og han næsten skar sig. Det var en farlig situation og jeg var meget vred på de folk som havde smidt den.',
      'Jeg synes at bøde er en god idé. Hvis folk skal betale, de smider ikke affald. Og der skal være flere skraldespande ved stranden, fordi de er altid fulde om søndagen.',
      'Jeg mener at det er kommunens ansvar. Kommunen får skat fra os og så de skal gøre rent. Der skal være flere skraldespande og flere folk som arbejder med at gøre rent i parken og ved stranden. Borgerne kan ikke gøre så meget. Det er deres arbejde, ikke vores.',
      'Det er det, jeg mener om affald.',
    ),
    summary:
      'Pass: a long experience paragraph, two suggestions touched in passing, and a one-sided evaluation that gives the municipality all the responsibility without considering the citizens; word-order errors are frequent.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The experience bullet is covered in detail but takes about half the answer. Two suggestions are touched (bøder, skraldespande) in three short sentences with hardly any reasons. The evaluation is about a third of the text and one-sided: the municipality pays and cleans, and the citizens\' side is dismissed in "Borgerne kan ikke gøre så meget" with no reason, which is odd after the writer\'s own story about people leaving bottles on the beach.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Paragraphs follow the bullets, but sentences are mostly joined with "og" and "men", and the last line announces an end instead of summing up.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Simple but clear vocabulary. Inversion is missed after most fronted elements ("Indien der er", "Da jeg kom …, jeg var", "nu jeg ser", "Sidste sommer jeg var", "så de skal"), a sentence adverb is misplaced in a main clause ("han næsten skar sig"), and "bøde" lacks an article.',
      },
    ],
    annotations: [
      {
        quote: 'I mit hjemland Indien der er',
        kind: 'error',
        note: 'Fronted place adverbial → verb before "der".',
        fix: 'I mit hjemland, Indien, er der',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Da jeg kom til Danmark i 2019, jeg var',
        kind: 'error',
        note: 'A da-clause in front → the main clause starts with the verb.',
        fix: 'Da jeg kom til Danmark i 2019, var jeg',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'nu jeg ser også affald',
        kind: 'error',
        note: 'Fronted "nu" → verb before subject; "også" then follows the subject.',
        fix: 'nu ser jeg også affald',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'han næsten skar sig',
        kind: 'error',
        note: 'In a main clause, sentence adverbs like "næsten" come after the finite verb.',
        fix: 'han skar sig næsten',
        ruleId: 'central-vs-content-adverbial',
      },
      {
        quote: 'Jeg synes at bøde er en god idé.',
        kind: 'error',
        note: 'A countable noun needs an article or a plural; and the suggestion should be named and argued, not only liked.',
        fix: 'Jeg synes, at bøder er en god idé, fordi …',
      },
      {
        quote: 'Hvis folk skal betale, de smider ikke affald.',
        kind: 'error',
        note: 'A hvis-clause in front → inversion in the main clause.',
        fix: 'Hvis folk skal betale, smider de ikke affald.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Borgerne kan ikke gøre så meget.',
        kind: 'style',
        note: 'The other side is dismissed in one line, so nothing is weighed. Give the citizens\' side a few reasons first (it is us who drop the rubbish), then explain why you still choose the municipality.',
      },
    ],
  },
  {
    id: 'wgr-d2b-6-02',
    taskId: 'wsim-d2b-6',
    band: '02',
    origin: 'illustrative',
    text: p(
      'Affald er en stor problem i verden. Der er plastik i havet og fisker spiser plastik og de dør. Jeg har set en film om det på YouTube og det var meget trist. I min by der er også affald. Hver morgen jeg går med min søn til børnehaven og vi ser flasker og papir på fortovet. Min søn spørger altid hvorfor folk smider ting. Jeg siger at de er dumme. I weekenden vi går tit til stranden og der er også mange dåser og plastikposer i sandet. Det er farlig for fuglene og for børnene som leger der. Om sommer der er mere affald fordi mange folk er udenfor og de spiser is og drikker øl i parken. Jeg tager altid mit affald med hjem og min familie også.',
      'Jeg kan lide forslaget at skoler skal samle affald med eleverne. Børn lærer at det er vigtig at passe på naturen. Pant er også god, i Danmark man får penge for flasker, det er smart. I mit land er der ikke pant. Bøde er ikke god idé fordi mange folk har ikke penge.',
      'Jeg tror det er alles ansvar.',
      'Tak for i dag.',
    ),
    summary:
      'Bare pass: about 200 understandable words, but the evaluation is a single sentence that never weighs citizen against municipality, and word order, agreement and plurals go wrong throughout.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The experience bullet is long but relevant (the walk to the kindergarten). Two suggestions are touched (school clean-ups, pant), the first with a short reason. The evaluation, which should be half the answer, is "Jeg tror det er alles ansvar": it does not answer "først og fremmest" and gives no reasons.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Paragraphs exist, but sentences are chained with "og", and main clauses are spliced with commas ("Pant er også god, i Danmark man får penge"). "Tak for i dag" is a spoken goodbye, not a conclusion.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Basic vocabulary with frequent errors: missing inversion ("I min by der er", "Hver morgen jeg går", "Om sommer der er"), gender and agreement ("en stor problem", "det er vigtig", "Pant er også god"), a wrong plural ("fisker") and a missing definite form ("om sommer").',
      },
    ],
    annotations: [
      {
        quote: 'en stor problem',
        kind: 'error',
        note: '"problem" is neuter, and the adjective agrees.',
        fix: 'et stort problem',
      },
      {
        quote: 'fisker spiser plastik',
        kind: 'error',
        note: '"fisk" has the same form in the plural; "fisker" means "fishermen".',
        fix: 'fisk spiser plastik',
      },
      {
        quote: 'Hver morgen jeg går',
        kind: 'error',
        note: 'Fronted time expression → verb before subject.',
        fix: 'Hver morgen går jeg',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Om sommer der er',
        kind: 'error',
        note: 'Two problems: a recurring season takes the definite form, and the fronted adverbial needs inversion.',
        fix: 'Om sommeren er der',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'i Danmark man får penge',
        kind: 'error',
        note: 'Fronted place adverbial → verb before subject.',
        fix: 'i Danmark får man penge',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Jeg tror det er alles ansvar.',
        kind: 'style',
        note: 'This is the whole evaluation. The task asks who is mainly responsible, the citizen or the municipality, with reasons for both sides, in about half the text.',
      },
      {
        quote: 'Tak for i dag.',
        kind: 'style',
        note: 'An essay ends with a summary of your view, not a goodbye. Try "Alt i alt mener jeg, at …".',
      },
    ],
  },
];
