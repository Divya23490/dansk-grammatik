import type { GradedAnswer, PracticeTask, TaskBullet } from './types';

/**
 * Delprøve 2A practice tasks (simulated, original topics) and an illustrative
 * grade ladder for the first one. The numbers in every table are invented for
 * practice and say so in `source` / `note`.
 */

const SOURCE = 'Kilde: fiktive tal til øvebrug';
const NOTE =
  'Tallene er opfundet til øvebrug og viser ikke virkelige forhold. I et rigtigt eksamenssæt står tallene typisk i et søjlediagram.';

const describe: TaskBullet = {
  key: 'describe',
  danish: 'Beskriv kort hovedtrækkene i diagrammet.',
  english: 'Briefly describe the main features of the diagram — the big trends, not every number.',
};

const causes = (danish: string, english: string): TaskBullet => ({ key: 'causes', danish, english });

/** `topic` follows "ved" directly: start it with a space, or with ", at" for a clause. */
const evaluate = (topic: string, english: string): TaskBullet => ({
  key: 'evaluate',
  danish: `Vurdér fordele og ulemper ved${topic} Begrund dine synspunkter. (Besvarelsen af dette punkt skal udgøre ca. 50 % af den samlede besvarelse)`,
  english,
  share: 0.5,
});

export const SIM_TASKS_D2A: PracticeTask[] = [
  {
    id: 'wsim-d2a-1',
    type: 'd2a-diagram',
    title: 'Børns skærmtid',
    origin: 'simulated',
    intro:
      'Mange forældre og lærere er bekymrede for, hvor meget tid børn og unge bruger på mobiltelefoner, tablets og computere. Diagrammet viser den gennemsnitlige skærmtid i fritiden for fire aldersgrupper i 2018 og 2024. Skriv en tekst på mindst 200 ord, hvor du besvarer alle tre punkter.',
    table: {
      caption: 'Børns og unges gennemsnitlige skærmtid i fritiden på en hverdag (timer pr. dag)',
      columns: ['Aldersgruppe', '2018', '2024'],
      rows: [
        ['6–8 år', '1,4', '1,9'],
        ['9–11 år', '2,1', '3,0'],
        ['12–14 år', '3,4', '4,6'],
        ['15–17 år', '4,2', '5,3'],
      ],
      source: SOURCE,
      note: NOTE,
    },
    bullets: [
      describe,
      causes(
        'Fortæl, hvilke årsager der kan være til den udvikling, diagrammet viser.',
        'Suggest possible reasons why screen time has developed this way.',
      ),
      evaluate(
        ' et forbud mod mobiltelefoner i skoletiden.',
        'Weigh the advantages and disadvantages of banning mobile phones during the school day, give reasons for your views, and make this about half of your answer.',
      ),
    ],
    minWords: 200,
    slots: {
      intro: {
        hint: 'Say that the diagram shows the average leisure screen time of children and young people on a weekday, for four age groups from 6 to 17, in 2018 and 2024. Keep the numbers for the next paragraph.',
        starters: [
          { da: 'Diagrammet viser, hvor mange timer børn og unge i gennemsnit bruger foran en skærm i fritiden på en hverdag, …', en: 'The diagram shows how many hours children and young people spend on average in front of a screen in their free time on a weekday, …' },
          { da: 'Tallene dækker fire aldersgrupper fra 6 til 17 år og sammenligner 2018 med …', en: 'The figures cover four age groups from 6 to 17 and compare 2018 with …' },
        ],
      },
      features: {
        hint: 'Two trends: screen time rose in every age group from 2018 to 2024, and it climbs steeply with age (in 2024 just under 2 hours for 6–8-year-olds against over 5 hours for 15–17-year-olds). Add that the biggest rise is among 12–14-year-olds, about 1.2 hours more.',
        starters: [
          { da: 'Det mest iøjnefaldende er, at skærmtiden er steget i …', en: 'The most striking thing is that screen time has risen in …' },
          { da: 'Desuden stiger skærmtiden markant med alderen: De 6–8-årige bruger knap to timer om dagen, mens de 15–17-årige …', en: 'Moreover, screen time rises sharply with age: the 6–8-year-olds spend just under two hours a day, while the 15–17-year-olds …' },
          { da: 'Den største stigning ses hos de 12–14-årige, hvis skærmtid er vokset med …', en: 'The biggest rise is among the 12–14-year-olds, whose screen time has grown by …' },
        ],
      },
      causes: {
        hint: 'Explain why screen time has gone up: children get their own smartphone earlier, more of their social life (chats, social media, games) happens online, and apps are designed to hold attention. Older children may use more because they have more freedom and less adult control.',
        starters: [
          { da: 'En af grundene til, at skærmtiden er steget, kan være, at børn får deres egen smartphone …', en: 'One reason screen time has risen may be that children get their own smartphone …' },
          { da: 'For det andet foregår en stor del af de unges sociale liv på …', en: "Secondly, a large part of young people's social life takes place on …" },
          { da: 'At de ældste bruger mest tid foran skærmen, skyldes måske, at …', en: 'That the oldest spend the most time in front of the screen is perhaps because …' },
          { da: 'Desuden er mange apps og spil designet til at …', en: 'In addition, many apps and games are designed to …' },
        ],
      },
      pros: {
        hint: 'Advantages of banning phones during the school day: better concentration in lessons without notifications, more talk and play together in the breaks, and less pressure to be online all day. With screen time this high, a ban guarantees some screen-free hours.',
        starters: [
          { da: 'En klar fordel ved et forbud er, at eleverne kan koncentrere sig …', en: 'A clear advantage of a ban is that the pupils can concentrate …' },
          { da: 'Et forbud kan også styrke fællesskabet, fordi eleverne i frikvartererne …', en: 'A ban can also strengthen the community, because in the breaks the pupils …' },
          { da: 'Når skærmtiden i forvejen er så høj, kan et forbud sikre, at …', en: 'When screen time is already so high, a ban can make sure that …' },
        ],
      },
      cons: {
        hint: 'Disadvantages: the phone is also a useful tool (looking things up, calendars, school apps), parents may want to reach their children, and pupils do not learn to control their own use if adults simply remove the phone. A ban can also be hard to enforce among teenagers.',
        starters: [
          { da: 'På den anden side kan man indvende, at mobilen også er …', en: 'On the other hand, one can object that the phone is also …' },
          { da: 'Desuden lærer eleverne ikke selv at styre deres forbrug, hvis …', en: 'Moreover, the pupils do not learn to control their own use if …' },
          { da: 'Mange forældre vil også gerne kunne kontakte deres børn, hvis …', en: 'Many parents also want to be able to contact their children if …' },
          { da: 'Et forbud kan desuden være svært at håndhæve, især blandt …', en: 'A ban can also be hard to enforce, especially among …' },
        ],
      },
      opinion: {
        hint: 'Take a clear side, e.g. for a ban, at least for the younger pupils, because school should be a place without constant interruptions and school computers cover the need for digital tools. Or argue for clear rules instead of a total ban. Say why your arguments weigh more.',
        starters: [
          { da: 'Efter min mening opvejer fordelene ved et forbud …', en: 'In my opinion the advantages of a ban outweigh …' },
          { da: 'Derfor mener jeg, at et forbud især giver mening for …', en: 'That is why I think a ban makes particular sense for …' },
          { da: 'Hvis man i stedet vil give eleverne mere ansvar, kunne man …', en: 'If you would rather give the pupils more responsibility, you could …' },
        ],
      },
      conclusion: {
        hint: 'In one or two sentences: screen time is rising in every age group, and that is why you think a ban (or clear rules) is the right answer. No new arguments.',
        starters: [
          { da: 'Alt i alt mener jeg derfor, at et forbud mod mobiltelefoner i skoletiden …', en: 'All in all, I therefore think that a ban on mobile phones during the school day …' },
          { da: 'Samlet set viser diagrammet, at skærmtiden stiger, og derfor …', en: 'Overall, the diagram shows that screen time is rising, and therefore …' },
        ],
      },
    },
  },
  {
    id: 'wsim-d2a-2',
    type: 'd2a-diagram',
    title: 'Brugt tøj',
    origin: 'simulated',
    intro:
      'Genbrugsbutikker og apps til salg af brugt tøj er blevet mere populære i de seneste år. Diagrammet viser, hvor stor en del af danskerne i forskellige aldersgrupper der har købt brugt tøj inden for det seneste år. Skriv en tekst på mindst 200 ord, hvor du besvarer alle tre punkter.',
    table: {
      caption: 'Andel af danskerne, der har købt brugt tøj inden for det seneste år, fordelt på alder (%)',
      columns: ['Alder', '2016', '2024'],
      rows: [
        ['18–29 år', '31', '58'],
        ['30–44 år', '24', '41'],
        ['45–59 år', '15', '27'],
        ['60 år og derover', '8', '14'],
      ],
      source: SOURCE,
      note: NOTE,
    },
    bullets: [
      describe,
      causes(
        'Fortæl, hvilke årsager der kan være til forskellene mellem aldersgrupperne.',
        'Suggest why the age groups differ so much in how often they buy second-hand clothes.',
      ),
      evaluate(
        ' at købe brugt tøj i stedet for nyt.',
        'Weigh the advantages and disadvantages of buying second-hand clothes instead of new ones, give reasons for your views, and make this about half of your answer.',
      ),
    ],
    minWords: 200,
    slots: {
      intro: {
        hint: 'Say that the diagram shows the share of Danes in four age groups who bought second-hand clothes within the past year, in 2016 and 2024.',
        starters: [
          { da: 'Diagrammet viser, hvor stor en andel af danskerne der har købt brugt tøj inden for det seneste år, fordelt på …', en: 'The diagram shows what share of Danes have bought second-hand clothes within the past year, broken down by …' },
          { da: 'Tallene sammenligner 2016 med 2024 og dækker …', en: 'The figures compare 2016 with 2024 and cover …' },
        ],
      },
      features: {
        hint: 'The share rose in every age group and almost doubled from 2016 to 2024. The younger, the more: in 2024 well over half of the 18–29-year-olds (58 %) bought second-hand, against only about one in seven aged 60 and over (14 %), so the gap between young and old has widened from 23 to 44 percentage points.',
        starters: [
          { da: 'Det mest bemærkelsesværdige er, at andelen næsten er fordoblet i …', en: 'The most remarkable thing is that the share has almost doubled in …' },
          { da: 'I 2024 har over halvdelen af de 18–29-årige købt brugt tøj, mens det kun gælder …', en: 'In 2024 over half of the 18–29-year-olds bought second-hand clothes, while this only applies to …' },
          { da: 'Jo yngre man er, desto …', en: 'The younger you are, the …' },
          { da: 'Forskellen mellem de yngste og de ældste er dermed vokset fra 23 til …', en: 'The gap between the youngest and the oldest has thus grown from 23 to …' },
        ],
      },
      causes: {
        hint: 'Explain why young people buy far more second-hand: they have less money, they are used to selling apps and social media where vintage is trendy, and they may care more about the climate. Older people may have more money, buy fewer clothes overall, or see used clothes as something for people who cannot afford new ones.',
        starters: [
          { da: 'En af grundene til, at flere unge køber brugt tøj, kan være, at de har …', en: 'One reason more young people buy second-hand clothes may be that they have …' },
          { da: 'Desuden er de unge vant til at handle via apps, hvor …', en: 'Moreover, young people are used to shopping via apps where …' },
          { da: 'Det kan også skyldes, at brugt tøj og vintage er blevet …', en: 'It may also be because second-hand clothes and vintage have become …' },
          { da: 'De ældre har derimod måske …', en: 'Older people, on the other hand, may have …' },
        ],
      },
      pros: {
        hint: 'Advantages of buying used instead of new: it is cheaper, it is better for the climate and environment because fewer new clothes must be produced (water, CO2, chemicals), clothes get a longer life instead of being thrown out, and you can find unique items.',
        starters: [
          { da: 'En stor fordel ved at købe brugt tøj er, at det er …', en: 'A big advantage of buying second-hand clothes is that it is …' },
          { da: 'Derudover er det bedre for miljøet, fordi der ikke skal …', en: 'In addition, it is better for the environment, because there is no need to …' },
          { da: 'Når tøjet får et længere liv, …', en: 'When the clothes get a longer life, …' },
        ],
      },
      cons: {
        hint: 'Disadvantages: it can take a long time to find the right size and quality, clothes may be worn, private sales rarely allow returns, and it may hurt clothes shops and their jobs. Some people also buy more just because it is cheap, which eats up the climate gain.',
        starters: [
          { da: 'På den anden side kan det tage lang tid at finde …', en: 'On the other hand, it can take a long time to find …' },
          { da: 'En ulempe er også, at brugt tøj kan være slidt, og at man sjældent kan …', en: 'Another disadvantage is that second-hand clothes can be worn and that you can rarely …' },
          { da: 'Hvis alle køber brugt, kan det desuden ramme …', en: 'If everyone buys second-hand, it may also hit …' },
          { da: 'Nogle køber måske også mere, netop fordi det er billigt, og så …', en: 'Some people may also buy more precisely because it is cheap, and then …' },
        ],
      },
      opinion: {
        hint: "E.g. argue that the advantages clearly outweigh the disadvantages, mainly because of the climate and the price, but that second-hand works better for some things (jackets, children's clothes) than others. Justify with your strongest argument.",
        starters: [
          { da: 'Efter min mening opvejer fordelene klart ulemperne, fordi …', en: 'In my opinion the advantages clearly outweigh the disadvantages, because …' },
          { da: 'Personligt synes jeg, at brugt tøj især er en god idé til …', en: 'Personally, I think second-hand clothes are a particularly good idea for …' },
          { da: 'Derfor bør man efter min mening …', en: 'That is why, in my opinion, people should …' },
        ],
      },
      conclusion: {
        hint: 'Sum up: second-hand clothes have become much more popular, especially among young people, and on balance you think buying used is a good choice (with any reservation you made).',
        starters: [
          { da: 'Alt i alt viser diagrammet, at brugt tøj er blevet langt mere populært, især blandt …', en: 'All in all, the diagram shows that second-hand clothes have become far more popular, especially among …' },
          { da: 'Samlet set mener jeg, at det er en god idé at købe brugt tøj, selvom …', en: 'Overall, I think it is a good idea to buy second-hand clothes, even though …' },
        ],
      },
    },
  },
  {
    id: 'wsim-d2a-3',
    type: 'd2a-diagram',
    title: 'Elbiler',
    origin: 'simulated',
    intro:
      'Salget af nye biler i Danmark har ændret sig meget på kort tid. Diagrammet viser, hvordan nye personbiler fordeler sig på drivmiddel fra 2019 til 2024. Skriv en tekst på mindst 200 ord, hvor du besvarer alle tre punkter.',
    table: {
      caption: 'Nye personbiler i Danmark fordelt på drivmiddel (% af alle nye personbiler)',
      columns: ['År', 'Elbiler', 'Plugin-hybridbiler', 'Benzin- og dieselbiler'],
      rows: [
        ['2019', '4', '6', '90'],
        ['2020', '16', '17', '67'],
        ['2021', '33', '27', '40'],
        ['2022', '39', '21', '40'],
        ['2023', '46', '16', '38'],
        ['2024', '55', '11', '34'],
      ],
      source: SOURCE,
      note: NOTE,
    },
    bullets: [
      describe,
      causes(
        'Fortæl, hvilke årsager der kan være til, at elbilerne har vundet frem.',
        'Suggest why electric cars have gained so much ground.',
      ),
      evaluate(
        ', at staten giver afgiftsfordele til dem, der køber en elbil.',
        'Weigh the advantages and disadvantages of the state giving tax benefits to people who buy an electric car, give reasons for your views, and make this about half of your answer.',
      ),
    ],
    minWords: 200,
    slots: {
      intro: {
        hint: 'Say that the diagram shows how new passenger cars in Denmark were split by fuel type (electric, plug-in hybrid, petrol and diesel) each year from 2019 to 2024.',
        starters: [
          { da: 'Diagrammet viser, hvordan nye personbiler i Danmark fordeler sig på drivmiddel i perioden fra …', en: 'The diagram shows how new passenger cars in Denmark are split by fuel type in the period from …' },
          { da: 'Bilerne er inddelt i tre grupper: elbiler, plugin-hybridbiler og …', en: 'The cars are divided into three groups: electric cars, plug-in hybrids and …' },
        ],
      },
      features: {
        hint: 'Electric cars went from almost nothing (4 %) in 2019 to more than half of all new cars (55 %) in 2024. Petrol and diesel cars fell from 90 % to about a third, with the steepest drop from 2019 to 2021. Plug-in hybrids peaked at 27 % in 2021 and then fell back to 11 %.',
        starters: [
          { da: 'Det mest iøjnefaldende er, at elbilernes andel er steget fra kun 4 % i 2019 til …', en: 'The most striking thing is that the share of electric cars has risen from only 4% in 2019 to …' },
          { da: 'I 2024 er mere end halvdelen af alle nye personbiler …', en: 'In 2024 more than half of all new passenger cars are …' },
          { da: 'Samtidig er andelen af benzin- og dieselbiler faldet fra 90 % til …', en: 'At the same time, the share of petrol and diesel cars has fallen from 90% to …' },
          { da: 'Plugin-hybridbilerne toppede i 2021 med 27 %, men siden er …', en: 'Plug-in hybrids peaked in 2021 at 27%, but since then …' },
        ],
      },
      causes: {
        hint: 'Suggest why electric cars gained ground: they have become cheaper and can drive further on a charge, there are many more charging points, and the state has made them cheaper through lower taxes. Climate awareness may also play a part, and plug-in hybrids may have fallen back because buyers now dare to go fully electric.',
        starters: [
          { da: 'En af grundene til, at elbilerne har vundet frem, kan være, at de er blevet …', en: 'One reason electric cars have gained ground may be that they have become …' },
          { da: 'For det andet er der kommet langt flere …', en: 'Secondly, there are now far more …' },
          { da: 'Det skyldes måske også, at staten …', en: 'It is perhaps also because the state …' },
          { da: 'At plugin-hybridbilerne er gået tilbage igen, kan skyldes, at …', en: 'That plug-in hybrids have declined again may be because …' },
        ],
      },
      pros: {
        hint: 'Advantages of tax benefits for electric cars: they speed up the switch away from petrol and diesel and so cut CO2 emissions and local air pollution, they make electric cars affordable for more families, and they help Denmark reach its climate targets. The fast change in the table shows how quickly buying habits can shift.',
        starters: [
          { da: 'En klar fordel ved afgiftsfordele er, at de gør elbilerne billigere, så …', en: 'A clear advantage of tax benefits is that they make electric cars cheaper, so …' },
          { da: 'Dermed falder udledningen af CO2, fordi …', en: 'As a result, CO2 emissions fall, because …' },
          { da: 'Desuden kan staten på den måde gøre det lettere at nå …', en: 'Moreover, in this way the state can make it easier to reach …' },
        ],
      },
      cons: {
        hint: 'Disadvantages: the state loses large tax revenues that must be found elsewhere, the benefit mainly goes to people who can afford a new car, it may tempt people to buy a car instead of using public transport, and producing batteries also harms the environment.',
        starters: [
          { da: 'På den anden side mister staten mange penge i afgifter, som …', en: 'On the other hand, the state loses a lot of money in taxes, which …' },
          { da: 'Man kan også indvende, at det især er de velhavende, der …', en: 'One can also object that it is mainly the well-off who …' },
          { da: 'Desuden løser elbiler ikke problemet med …', en: 'Moreover, electric cars do not solve the problem of …' },
          { da: 'Produktionen af batterier belaster også …', en: 'The production of batteries also puts a strain on …' },
        ],
      },
      opinion: {
        hint: 'E.g. support tax benefits for a transition period because they speed up the green shift, but argue that they should be phased out now that electric cars are the majority of new cars (55 % in 2024), or that the money is better spent on public transport. Give your main reason.',
        starters: [
          { da: 'Efter min mening er afgiftsfordele en god idé i en overgangsperiode, fordi …', en: 'In my opinion tax benefits are a good idea for a transition period, because …' },
          { da: 'Når over halvdelen af de nye biler allerede er elbiler, bør staten dog …', en: 'When more than half of new cars are already electric, the state should, however, …' },
          { da: 'Derfor mener jeg, at pengene på længere sigt hellere skulle bruges på …', en: 'That is why I think that in the longer term the money should rather be spent on …' },
        ],
      },
      conclusion: {
        hint: 'Sum up: electric cars have taken over a large part of the market in a few years, and restate whether you think the state should keep giving tax benefits.',
        starters: [
          { da: 'Alt i alt viser diagrammet, at elbilen på få år er gået fra at være en sjældenhed til at …', en: 'All in all, the diagram shows that in a few years the electric car has gone from being a rarity to …' },
          { da: 'Samlet set mener jeg, at staten bør …', en: 'Overall, I think the state should …' },
        ],
      },
    },
  },
];

export const GRADED_D2A: GradedAnswer[] = [
  {
    id: 'wgr-d2a-1-12',
    taskId: 'wsim-d2a-1',
    band: '12',
    origin: 'illustrative',
    text: `Diagrammet viser, hvor mange timer børn og unge i gennemsnit bruger foran en skærm på en almindelig hverdag i 2018 og 2024.

Det mest iøjnefaldende er, at skærmtiden er steget i alle aldersgrupper. Desuden stiger den markant med alderen: De 6–8-årige bruger knap to timer om dagen, mens de 15–17-årige bruger over fem timer. Den største stigning ses hos de 12–14-årige, hvis skærmtid er vokset med mere end en time på seks år.

Der kan være flere årsager til udviklingen. For det første får børn deres egen smartphone i en tidligere alder end før. For det andet foregår en stadig større del af det sociale liv på nettet, så de unge risikerer at føle sig udenfor, hvis de ikke er online. Endelig er apps og spil bevidst designet til at fastholde brugerens opmærksomhed.

Et forbud mod mobiltelefoner i skoletiden har fordele og ulemper. En klar fordel er, at eleverne får bedre ro til at koncentrere sig i timerne. Et forbud kan også styrke fællesskabet, fordi eleverne taler og leger sammen i frikvartererne i stedet for at sidde med hver sin skærm. Omvendt kan man indvende, at mobilen også er et nyttigt redskab, for eksempel til informationssøgning. Desuden lærer eleverne ikke at styre deres forbrug selv, hvis de voksne bare fjerner fristelsen.

Efter min mening opvejer fordelene dog ulemperne. Skolen bør være et sted, hvor man øver sig i at være til stede uden afbrydelser, og skolens computere kan dække behovet for digitale redskaber. Alt i alt mener jeg derfor, at et forbud er en god idé, især for de yngste elever.`,
    summary:
      'A top-band answer: a selective description of the trends, three distinct causes, and a balanced evaluation that takes up about half the text and ends in a reasoned conclusion.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'All three bullets are answered in order. The description picks out the trends ("steget i alle aldersgrupper", "stiger den markant med alderen", the largest rise among 12–14-year-olds) instead of copying the table. The evaluation (two paragraphs, about 130 of ~260 words) gives two advantages, two disadvantages, a clear own view with a reason, and a summing-up — so the 50 % requirement is met.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'One paragraph per bullet plus a conclusion. Causes are signposted with "For det første … For det andet … Endelig", the evaluation pivots with "Omvendt kan man indvende", and "Alt i alt mener jeg derfor" rounds the text off. Neutral, factual register throughout.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Near-flawless. Precise, varied vocabulary ("iøjnefaldende", "fastholde brugerens opmærksomhed", "opvejer fordelene dog ulemperne", "fristelsen"). Correct inversion after fronted elements ("Desuden stiger den", "Endelig er apps") and correct adverb placement in subordinate clauses ("hvis de ikke er online").',
      },
    ],
    annotations: [
      {
        quote: 'Det mest iøjnefaldende er',
        kind: 'good',
        note: 'A strong opener for the description: it signals that you are picking out the main feature, which is exactly what "hovedtrækkene" asks for.',
      },
      {
        quote: 'Desuden stiger den markant med alderen',
        kind: 'good',
        note: 'Fronted "Desuden" correctly triggers inversion (verb before subject), and it summarises a trend instead of listing numbers.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'hvis skærmtid er vokset med mere end en time på seks år',
        kind: 'good',
        note: 'Rounds the figure ("mere end en time") instead of quoting 3,4 and 4,6 — exactly the level of detail a description needs.',
      },
      {
        quote: 'For det første får børn',
        kind: 'good',
        note: 'Signposting the causes makes the paragraph easy to follow, and the verb correctly comes before the subject after the fronted phrase.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'hvis de ikke er online',
        kind: 'good',
        note: 'In a subordinate clause "ikke" goes before the finite verb.',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Omvendt kan man indvende',
        kind: 'good',
        note: 'A precise phrase for turning from advantages to disadvantages — it shows the reader that the evaluation is balanced.',
      },
      {
        quote: 'Efter min mening opvejer fordelene dog ulemperne',
        kind: 'good',
        note: 'A clear own position that weighs the two sides against each other — this is what "vurdér" means, not just listing pros and cons.',
      },
      {
        quote: 'Alt i alt mener jeg derfor',
        kind: 'good',
        note: 'A short summing-up ("sammenfatning") is one of the things the examiners look for under task fulfilment.',
      },
    ],
  },
  {
    id: 'wgr-d2a-1-7',
    taskId: 'wsim-d2a-1',
    band: '7',
    origin: 'illustrative',
    text: `Diagrammet viser hvor mange timer børn og unge bruger på skærm i fritiden på en hverdag i 2018 og 2024.

Man kan se, at skærmtiden er steget i alle aldersgrupper. De ældste børn bruger mest tid på skærm. I 2024 de 15–17-årige bruger 5,3 timer om dagen, og de yngste bruger 1,9 timer. Den største stigning er hos de 12–14-årige, der er steget med 1,2 time.

Der er mange årsager til det. Først, mange børn får en mobiltelefon når de er meget unge. Mange børn også bruger sociale medier som TikTok og Snapchat hver dag, og de vil ikke gå glip af noget. Desuden har mange forældre travlt, og det er nemt at give barnet en iPad. Under corona i 2020 og 2021 brugte mange børn også mere tid på skærm, fordi de var hjemme hele tiden.

Et forbud mod mobiltelefoner i skolen har fordele og ulemper. En fordel er, at eleverne kan koncentrere sig bedre, og de bliver ikke forstyrret af beskeder. Også de taler mere sammen i frikvarteret. En ulempe er, at forældrene kan ikke kontakte deres børn, hvis der sker noget. Mobilen kan også være nyttigt i undervisningen.

Jeg synes, at et forbud er en god idé, fordi det er godt for børnene. Børnene bruger for meget tid på skærm, og det er ikke godt for børnene. Derfor jeg mener, at skolen skal have et forbud.`,
    summary:
      'A solid middle answer: every bullet is covered and the meaning is always clear, but the evaluation is thinner than required, the conclusion repeats itself, and several word-order slips recur.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'All three bullets are answered and the description mostly picks out trends ("steget i alle aldersgrupper", "De ældste børn bruger mest tid"). The causes paragraph is good, even adding an own idea (corona). But the evaluation is only about 90 of ~230 words (≈ 40 %, not 50 %): one advantage is developed, the disadvantages get a sentence each, and the own view ("fordi det er godt for børnene") is not really argued.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Clear paragraph per bullet and some linking words ("Desuden", "En fordel er … En ulempe er"). The last paragraph goes in a circle: "børnene" three times and "godt"/"ikke godt" without new content. "der er steget med 1,2 time" says the children rose, not their screen time.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Adequate range with some good phrases ("gå glip af noget", "har mange forældre travlt"), but recurring word-order errors: no inversion after "I 2024", "Først" and "Derfor"; adverbs before the verb in main clauses ("Mange børn også bruger"); "ikke" after the verb in an at-clause. Also "nyttigt" should agree with "mobilen" (n-word). None of this blocks understanding.',
      },
    ],
    annotations: [
      {
        quote: 'I 2024 de 15–17-årige bruger',
        kind: 'error',
        note: 'A fronted time expression takes the front slot, so the verb must come next and the subject after it.',
        fix: 'I 2024 bruger de 15–17-årige',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Først, mange børn får',
        kind: 'error',
        note: 'English-style comma after a fronted adverb. In Danish "Først" counts as the front slot, so the verb follows directly — and "For det første" is the usual way to start a list of causes.',
        fix: 'For det første får mange børn',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Mange børn også bruger',
        kind: 'error',
        note: 'In a main clause the finite verb is in slot two; "også" comes after it, not between subject and verb.',
        fix: 'Mange børn bruger også',
        ruleId: 'finit-verb-second',
      },
      {
        quote: 'Også de taler',
        kind: 'error',
        note: 'If you front "Også", the verb must come before the subject — but it sounds more natural to keep "også" in the middle.',
        fix: 'De taler også',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'at forældrene kan ikke kontakte',
        kind: 'error',
        note: 'Inside an at-clause, "ikke" goes before the finite verb.',
        fix: 'at forældrene ikke kan kontakte',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Mobilen kan også være nyttigt',
        kind: 'error',
        note: '"Mobil" is an en-word, so the predicative adjective takes no -t.',
        fix: 'Mobilen kan også være nyttig',
      },
      {
        quote: 'Derfor jeg mener',
        kind: 'error',
        note: '"Derfor" in the front slot must be followed by the verb.',
        fix: 'Derfor mener jeg',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Børnene bruger for meget tid på skærm, og det er ikke godt for børnene.',
        kind: 'style',
        note: 'Repeats "børnene" and the previous sentence\'s "godt" without adding an argument. Give a concrete reason instead, e.g. sleep or concentration, and use "de" for the second mention.',
        fix: 'De bruger i forvejen meget tid foran en skærm, og et forbud sikrer, at de har nogle skærmfri timer hver dag.',
      },
    ],
  },
  {
    id: 'wgr-d2a-1-4',
    taskId: 'wsim-d2a-1',
    band: '4',
    origin: 'illustrative',
    text: `I diagrammet kan man se skærmtid for børn og unge i 2018 og 2024. I 2018 de 6–8-årige brugte 1,4 timer og i 2024 de brugte 1,9 timer. De 9–11-årige brugte 2,1 timer i 2018 og 3,0 timer i 2024. De 12–14-årige brugte 3,4 timer i 2018 og 4,6 timer i 2024. De 15–17-årige brugte 4,2 timer i 2018 og 5,3 timer i 2024. Så alle tal er mere høj i 2024.

Der er nogen årsager. Børn i dag har mobil og computer og tablet, de er altid på internettet. Det er sjov at spille spil og se video på YouTube. Mange børn keder sig, og så de tager mobilen. Mange forældre også bruger meget mobil, så børnene gør det samme som forældrene. Og i skolen de bruger også computer hele dagen.

Jeg synes et forbud mod mobil i skolen er en god idé. Fordi børnene skal lære noget i skolen og ikke sidde med mobil hele tiden. Når de har mobil, de koncentrere sig ikke om læreren. Man skal snakke med sin venner i frikvarteret og lege. Det er meget vigtigt for børn at være sammen. Derfor alle skoler skal have forbud. Jeg tror også at det er godt for deres øjne og søvn.`,
    summary:
      'A just-passing answer: the description copies every number instead of finding the trends, the evaluation is one-sided and short, and word-order and ending errors are frequent.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The description reads the table aloud row by row ("brugte 2,1 timer i 2018 og 3,0 timer i 2024 …") and only gets to a trend in the last sentence; the age difference is never mentioned. Causes are relevant but brief. The evaluation (about 75 of ~205 words, ≈ 35 %) lists only advantages — "Vurdér fordele og ulemper" is only half answered — and there is no summing-up.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Paragraphs follow the bullets, but sentences are strung together with "og" or a comma ("…og tablet, de er altid på internettet"), and "Fordi børnene skal lære noget i skolen …" is a fragment cut off from its main clause. Very few linking words.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Simple, repetitive vocabulary ("mobil" without article throughout). Frequent errors: missing inversion ("I 2018 de 6–8-årige brugte", "Derfor alle skoler skal", "Når de har mobil, de …"), adverb before the verb ("Mange forældre også bruger"), "mere høj", "sjov" for "sjovt", "sin venner", "koncentrere" without -r. The meaning still comes through.',
      },
    ],
    annotations: [
      {
        quote: 'De 9–11-årige brugte 2,1 timer i 2018 og 3,0 timer i 2024.',
        kind: 'style',
        note: '"Beskriv kort hovedtrækkene" means the trends, not every cell. Four sentences of numbers use up words that the evaluation needs.',
        fix: 'Skærmtiden er steget i alle aldersgrupper, og den stiger med alderen.',
      },
      {
        quote: 'I 2018 de 6–8-årige brugte',
        kind: 'error',
        note: 'After a fronted time expression the verb must come before the subject.',
        fix: 'I 2018 brugte de 6–8-årige',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'mere høj',
        kind: 'error',
        note: 'Short adjectives take -ere in the comparative; "mere" is for long words like "interessant".',
        fix: 'højere',
      },
      {
        quote: 'Det er sjov at',
        kind: 'error',
        note: 'After "det er" the adjective takes the neuter -t form.',
        fix: 'Det er sjovt at',
      },
      {
        quote: 'Fordi børnene skal lære noget i skolen og ikke sidde med mobil hele tiden.',
        kind: 'error',
        note: 'A "fordi" clause cannot stand alone as a sentence; attach it to the main clause before it.',
        fix: 'Jeg synes, at et forbud mod mobiler i skolen er en god idé, fordi børnene skal lære noget i skolen og ikke sidde med mobilen hele tiden.',
      },
      {
        quote: 'Når de har mobil, de koncentrere sig',
        kind: 'error',
        note: 'A whole subordinate clause in the front slot still counts as one element, so the verb comes next. Also present tense needs -r.',
        fix: 'Når de har mobilen, koncentrerer de sig',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'sin venner',
        kind: 'error',
        note: 'The possessive agrees with the plural noun.',
        fix: 'sine venner',
      },
      {
        quote: 'Derfor alle skoler skal',
        kind: 'error',
        note: '"Derfor" takes the front slot, so the verb comes next.',
        fix: 'Derfor skal alle skoler',
        ruleId: 'v2-inversion',
      },
    ],
  },
  {
    id: 'wgr-d2a-1-02',
    taskId: 'wsim-d2a-1',
    band: '02',
    origin: 'illustrative',
    text: `Diagram viser hvor mange timer børn bruge på skærm. Det er om 2018 og 2024. Alle børn bruger mere skærm i 2024 end 2018. Store børn bruge mest, 15–17 år de bruger 5,3 timer hver dag, det er meget. Små børn bruger 1,9 time. I 2018 det var mindre, for eksempel 15–17 år var 4,2 timer og 12–14 år var 3,4 timer. Den største forskel er 12–14 år.

Hvorfor børn bruger så meget skærm? Jeg tror det er fordi mobiltelefon er meget billig nu og alle har en. Også der er mange spil og Youtube og Tiktok og de er gratis. Også i skolen de bruge iPad meget, så de er vant til skærm. Børn synes det er mere sjov end lave lektier eller spiller fodbold. Forældre har ikke tid for børnene, de arbejder meget og de er træt når de komme hjem, så det er nemt at børnene se på mobil. I min land det er samme, min søn har også mobil og han bruge den hele tiden og jeg siger nej men han lytter ikke.

Forbud mod mobil i skolen er godt synes jeg. Børn lærer mere. Men nogen gange de skal bruge mobil. Det er min mening.`,
    summary:
      'A bare pass: the text reaches about 200 words and stays understandable, but the evaluation is a few lines, the causes drift into a personal story, and errors appear in almost every sentence.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'The description and causes are there, but the evaluation is only four short sentences (about 25 of ~200 words, far from 50 %): one advantage ("Børn lærer mere"), a hint of a disadvantage with no reason, and no real conclusion. The personal story about "min søn" is off the task and uses words the evaluation needed.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Three paragraphs matching the bullets, but sentences are chained with "og … og … og" and commas, and the ending "Det er min mening." does not sum anything up. The opening question "Hvorfor børn bruger så meget skærm?" is a nice idea but has the wrong word order.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Basic vocabulary and errors in nearly every sentence: verbs without -r ("bruge", "komme", "se"), missing inversion ("I 2018 det var", "I min land det er"), "mere sjov", "tid for", "min land", missing definite forms ("Diagram"). A Danish reader can still follow the meaning.',
      },
    ],
    annotations: [
      {
        quote: 'Diagram viser hvor mange timer børn bruge',
        kind: 'error',
        note: 'The diagram is a specific one, so it needs the definite form; present tense verbs always end in -r. Danish also puts a comma before the hv-clause.',
        fix: 'Diagrammet viser, hvor mange timer børn bruger',
      },
      {
        quote: 'I 2018 det var mindre',
        kind: 'error',
        note: 'After a fronted time expression the verb must come second.',
        fix: 'I 2018 var det mindre',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Hvorfor børn bruger så meget skærm?',
        kind: 'error',
        note: 'A direct question with a question word has the verb right after the question word.',
        fix: 'Hvorfor bruger børn så meget tid foran skærmen?',
        ruleId: 'finit-verb-second',
      },
      {
        quote: 'mere sjov end lave lektier eller spiller fodbold',
        kind: 'error',
        note: '"Sjov" is short, so the comparative is "sjovere"; the two infinitives after "end at" must match.',
        fix: 'sjovere end at lave lektier eller spille fodbold',
      },
      {
        quote: 'tid for børnene',
        kind: 'error',
        note: 'In Danish you have time "til" someone.',
        fix: 'tid til børnene',
      },
      {
        quote: 'I min land det er samme',
        kind: 'error',
        note: '"Land" is an et-word (mit), the verb must come before the subject after "I mit land", and "samme" needs "det" in front.',
        fix: 'I mit land er det det samme',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Men nogen gange de skal bruge mobil.',
        kind: 'error',
        note: '"Nogle gange" (plural "some"), not "nogen"; the fronted adverbial needs inversion — and this is the only disadvantage in the text, with no reason given. The evaluation should be about half of the answer.',
        fix: 'Men nogle gange skal de bruge mobilen, for eksempel til at søge information.',
        ruleId: 'v2-inversion',
      },
    ],
  },
];
