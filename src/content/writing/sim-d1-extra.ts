import type { GradedAnswer, PracticeTask, TaskBullet } from './types';

/**
 * Three more original Delprøve 1 practice tasks (written for the app, not taken
 * from a past paper) — family, work and housing — each with an illustrative
 * 12 → 02 grade ladder.
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

export const SIM_TASKS_D1_EXTRA: PracticeTask[] = [
  {
    id: 'wsim-d1-4',
    type: 'd1-email',
    title: 'En hund til familien',
    origin: 'simulated',
    intro:
      'Du har fået en mail fra din danske veninde Camilla. Hun bor i et rækkehus i Aalborg med sin mand Søren og deres to børn, Malte på 12 år og Ida på 9 år. Børnene har længe ønsket sig en hund, og nu skal familien beslutte, om de vil købe en hvalp. En del af mailen står nedenfor.',
    mail: {
      from: 'Camilla',
      paragraphs: [
        '… Tak for sidst! Det var så hyggeligt, at du kom forbi med kage i weekenden. Du fortalte, at du er begyndt at spille badminton i en klub. Hvordan går det, og hvem spiller du med?',
        'Herhjemme taler vi ikke om andet end hunde for tiden. Malte og Ida har ønsket sig en hund i flere år, og nu har Søren fundet en hvalp hos en familie her i nærheden. Jeg kan godt lide hunde, men vi arbejder begge to fuld tid, så hunden vil være alene hjemme det meste af dagen. Synes du, vi skal sige ja til hvalpen?',
        'Børnene lover selvfølgelig, at de vil gå tur med den hver dag, men jeg kender dem. Efter et par uger er det nok mig, der står ude i regnvejret klokken seks om morgenen. Hvordan kan vi få børnene til at tage ansvar for hunden?',
        'Søren siger, at jeg bekymrer mig for meget, og måske har han ret. Hvis vi får hvalpen, er det i øvrigt en lille brun labrador. Har du et godt forslag til et navn? Nå, nu skal jeg hente Ida til gymnastik. Skriv snart! …',
      ],
      underlined: [
        'Hvordan går det, og hvem spiller du med?',
        'Synes du, vi skal sige ja til hvalpen?',
        'Hvordan kan vi få børnene til at tage ansvar for hunden?',
        'Har du et godt forslag til et navn?',
      ],
    },
    bullets: [
      THANKS,
      UNDERLINED,
      {
        key: 'proposal',
        danish: 'Foreslå, at I mødes og taler mere om det.',
        english: 'Suggest that you meet and talk more about it.',
      },
    ],
    slots: {
      greeting: {
        hint: 'Greet Camilla by name and thank her for the mail. She thanks you for dropping by with cake at the weekend, so you can say you enjoyed the visit too.',
        starters: [
          { da: 'Kære Camilla', en: 'Dear Camilla' },
          { da: 'Tak for din mail, og tak for en hyggelig eftermiddag hos jer.', en: 'Thanks for your mail, and thanks for a lovely afternoon at your place.' },
          { da: 'Det var dejligt at se jer alle sammen i weekenden, og …', en: 'It was lovely to see you all at the weekend, and …' },
        ],
      },
      smalltalk: {
        hint: 'Answer "Hvordan går det, og hvem spiller du med?": both halves — how badminton is going (how often you play, whether you are getting better) and who you play with (a partner, a colleague, people in the club).',
        starters: [
          { da: 'Du spørger, hvordan det går med badminton. Jeg har nu spillet i …', en: "You ask how badminton is going. I've now played for …" },
          { da: 'Vi træner hver onsdag i hallen, og jeg spiller mest med …', en: 'We train every Wednesday in the sports hall, and I mostly play with …' },
          { da: 'Jeg er ikke særlig god endnu, men …', en: "I'm not very good yet, but …" },
        ],
      },
      'dilemma-1': {
        hint: 'Answer "Synes du, vi skal sige ja til hvalpen?": give a clear yes, no or "yes, if …" about the labrador puppy. The real problem is that both parents work full time, so the dog would be alone most of the day; a dog walker, a neighbour or doggy day care could solve it.',
        starters: [
          { da: 'Med hensyn til hvalpen forstår jeg godt, at du er i tvivl.', en: "As for the puppy, I can see why you're unsure." },
          { da: 'Jeg synes, at I kun skal sige ja, hvis …', en: 'I think you should only say yes if …' },
          { da: 'En hund kan ikke være alene i otte timer, så måske kunne en nabo …', en: "A dog can't be alone for eight hours, so perhaps a neighbour could …" },
          { da: 'Hvis I får en hundepasser, kan …', en: 'If you get a dog walker, …' },
        ],
      },
      'dilemma-2': {
        hint: 'Answer "Hvordan kan vi få børnene til at tage ansvar for hunden?": give concrete ideas fitted to Malte (12) and Ida (9), e.g. a weekly plan on the fridge, the morning walk for Malte and feeding for Ida, or pocket money linked to the jobs.',
        starters: [
          { da: 'Hvad angår børnene, ville jeg lave en fast plan sammen med dem, før …', en: 'As for the children, I would make a fixed plan with them before …' },
          { da: 'Malte er stor nok til at …, mens Ida kan …', en: "Malte is old enough to …, while Ida can …" },
          { da: 'Hvis I hænger planen op på køleskabet, kan alle se …', en: 'If you put the plan up on the fridge, everyone can see …' },
        ],
      },
      proposal: {
        hint: 'First answer the fourth underlined question, "Har du et godt forslag til et navn?", with a name for a small brown labrador (and why). Then suggest meeting to talk more about the dog, with a day or a place.',
        starters: [
          { da: 'Og et navn? Jeg synes, … ville passe perfekt til en lille brun hvalp.', en: 'And a name? I think … would suit a little brown puppy perfectly.' },
          { da: 'Skal vi ikke mødes en dag i næste uge og snakke mere om det?', en: "Shouldn't we meet one day next week and talk more about it?" },
          { da: 'Jeg kan komme forbi på torsdag efter arbejde, hvis det passer jer.', en: 'I can drop by on Thursday after work, if that suits you.' },
        ],
      },
      closing: {
        hint: 'Wish Camilla luck with the decision and send greetings to Søren and the children, then a sign-off such as "Mange hilsner" and your first name.',
        starters: [
          { da: 'Hils Søren, Malte og Ida!', en: 'Say hi to Søren, Malte and Ida!' },
          { da: 'Held og lykke med beslutningen.', en: 'Good luck with the decision.' },
          { da: 'Mange hilsner', en: 'Best wishes' },
        ],
      },
    },
    tips: [
      {
        title: 'Four underlined questions, and the last one hides',
        text: 'The name question ("Har du et godt forslag til et navn?") sits at the very end, after the dilemma, and is the easiest to forget. One sentence with a name and a reason is enough — but it must be there.',
      },
      {
        title: 'The first question has two halves',
        text: '"Hvordan går det, og hvem spiller du med?" asks how it is going AND who you play with. Answer both, e.g. "Det går fint … Jeg spiller mest med en kollega, der hedder …".',
      },
      {
        title: 'Say yes or no to the puppy',
        text: '"Synes du, vi skal sige ja?" wants a judgement, not a list of pros and cons. "Ja, men kun hvis …" is a strong answer, because it deals with the real problem: the dog alone all day while both parents work.',
      },
      {
        title: 'Make the advice fit the children',
        text: 'The mail gives the ages (12 and 9). Use them: the older one can walk the dog alone, the younger one can feed it. Concrete, age-fitted ideas count as developing the point.',
      },
    ],
    words: [
      { da: 'en hvalp', en: 'a puppy' },
      { da: 'at lufte hunden', en: 'to walk the dog (let it out)' },
      { da: 'at gå tur med hunden', en: 'to take the dog for a walk' },
      { da: 'en hundepasser', en: 'a dog walker / dog sitter' },
      { da: 'en hundeskole', en: 'a dog training class' },
      { da: 'at være alene hjemme', en: 'to be home alone' },
      { da: 'at tage ansvar for', en: 'to take responsibility for' },
      { da: 'et ansvar', en: 'a responsibility' },
      { da: 'en fast plan', en: 'a fixed plan / schedule' },
      { da: 'lommepenge', en: 'pocket money (plural noun)' },
      { da: 'at holde, hvad man lover', en: 'to keep your promises' },
      { da: 'at have dårlig samvittighed', en: 'to feel guilty' },
      { da: 'en dyrlæge', en: 'a vet' },
      { da: 'at fodre / at give den mad', en: 'to feed it' },
    ],
  },
  {
    id: 'wsim-d1-5',
    type: 'd1-email',
    title: 'Chef for sine kolleger',
    origin: 'simulated',
    intro:
      'Du har fået en mail fra din danske ven Mikkel. Han har i otte år arbejdet på et stort lager i Kolding. Nu har hans chef tilbudt ham at blive holdleder, men hans gode kollega Jesper søgte også stillingen. En del af mailen står nedenfor.',
    mail: {
      from: 'Mikkel',
      paragraphs: [
        '… Tusind tak for invitationen til din fødselsdag – jeg kommer meget gerne! Du skrev, at du var hjemme og besøge din familie i september. Hvordan var turen, og hvordan har din familie det?',
        'Jeg har fået en stor nyhed: Min chef har tilbudt mig at blive holdleder på lageret. Jeg skal have ansvar for 15 medarbejdere, og jeg får 4.000 kr. mere om måneden. Til gengæld skal jeg arbejde flere timer, og jeg skal også have vagter i weekenden. Hvad synes du – skal jeg tage imod jobbet?',
        'Der er bare ét problem. Min gode kollega Jesper søgte også stillingen, og han har været på lageret længere end mig. Vi spiser frokost sammen hver dag og spiller fodbold om tirsdagen. Hvordan kan jeg undgå, at det ødelægger vores venskab?',
        'Jeg skal give min chef et svar på fredag, så jeg har ikke ret lang tid at tænke i. Skriv endelig snart! …',
      ],
      underlined: [
        'Hvordan var turen, og hvordan har din familie det?',
        'Hvad synes du – skal jeg tage imod jobbet?',
        'Hvordan kan jeg undgå, at det ødelægger vores venskab?',
      ],
    },
    bullets: [
      THANKS,
      UNDERLINED,
      {
        key: 'proposal',
        danish: 'Foreslå, at I mødes, før han skal give sin chef et svar.',
        english: 'Suggest that you meet before he has to give his boss an answer.',
      },
    ],
    slots: {
      greeting: {
        hint: 'Greet Mikkel by name, thank him for the mail and congratulate him on the job offer. You can also say you are glad he is coming to your birthday.',
        starters: [
          { da: 'Kære Mikkel', en: 'Dear Mikkel' },
          { da: 'Tak for din mail – og tillykke med tilbuddet!', en: 'Thanks for your mail – and congratulations on the offer!' },
          { da: 'Hvor er jeg glad for, at du kan komme til min fødselsdag.', en: "I'm so glad you can come to my birthday." },
        ],
      },
      smalltalk: {
        hint: 'Answer "Hvordan var turen, og hvordan har din familie det?": say how your September trip home went (in the past tense) and give news about one or two family members.',
        starters: [
          { da: 'Du spørger til min tur. Jeg var hjemme i … i to uger, og …', en: 'You ask about my trip. I was home in … for two weeks, and …' },
          { da: 'Min mor har det heldigvis …', en: 'My mother is fortunately …' },
          { da: 'Det bedste ved turen var, at …', en: 'The best thing about the trip was that …' },
        ],
      },
      'dilemma-1': {
        hint: 'Answer "Hvad synes du – skal jeg tage imod jobbet?": give a clear view on becoming team leader for 15 people. Weigh 4,000 kr. more a month and the recognition against longer hours and weekend shifts, and maybe suggest negotiating fewer weekends.',
        starters: [
          { da: 'Hvad jobbet angår, synes jeg, at du skal …', en: 'As for the job, I think you should …' },
          { da: '4.000 kr. mere om måneden er ikke småpenge, men …', en: "4,000 kroner more a month isn't small change, but …" },
          { da: 'Måske kan du forhandle dig til, at du kun …', en: 'Perhaps you can negotiate that you only …' },
          { da: 'Du kender lageret bedre end nogen anden, så …', en: 'You know the warehouse better than anyone, so …' },
        ],
      },
      'dilemma-2': {
        hint: 'Answer "Hvordan kan jeg undgå, at det ødelægger vores venskab?": advise how to handle Jesper, e.g. tell him in private before the others hear it, be honest, ask for his help and experience, and keep the lunches and Tuesday football.',
        starters: [
          { da: 'Med hensyn til Jesper ville jeg tale med ham under fire øjne, før …', en: 'As for Jesper, I would talk to him in private before …' },
          { da: 'Fortæl ham ærligt, at du sætter pris på …', en: 'Tell him honestly that you appreciate …' },
          { da: 'Hvis han føler sig respekteret, tror jeg ikke, at …', en: "If he feels respected, I don't think that …" },
        ],
      },
      proposal: {
        hint: 'Suggest meeting BEFORE Friday, when Mikkel has to answer his boss: name a day before then and a place, e.g. coffee on Thursday after work.',
        starters: [
          { da: 'Skal vi ikke mødes på torsdag, før du skal give din chef et svar?', en: "Shouldn't we meet on Thursday, before you have to give your boss an answer?" },
          { da: 'Jeg har fri på onsdag eftermiddag, så …', en: "I'm off on Wednesday afternoon, so …" },
          { da: 'Hvad siger du til en kop kaffe efter arbejde, så vi kan …', en: 'How about a coffee after work, so we can …' },
        ],
      },
      closing: {
        hint: 'Wish Mikkel luck with the decision and the talk with Jesper, say you look forward to seeing him at your birthday, then a sign-off and your first name.',
        starters: [
          { da: 'Held og lykke med beslutningen – og med snakken med Jesper.', en: 'Good luck with the decision – and with the talk with Jesper.' },
          { da: 'Jeg glæder mig til at se dig til min fødselsdag.', en: "I'm looking forward to seeing you at my birthday." },
          { da: 'Mange hilsner', en: 'Best wishes' },
        ],
      },
    },
    tips: [
      {
        title: 'The proposal has a deadline',
        text: 'The bullet says "før han skal give sin chef et svar", and the mail says Friday. A meeting "en dag" or "i næste uge" misses the point; name a day before Friday.',
      },
      {
        title: 'Both halves of the first question',
        text: '"Hvordan var turen, og hvordan har din familie det?" asks about the trip AND the family. Use the past tense for the trip ("Jeg var …, vi tog …") and the present for the family ("Min mor har det godt").',
      },
      {
        title: 'Take a position on the job',
        text: '"Skal jeg tage imod jobbet?" wants your answer: ja, nej or "ja, hvis …". Use the facts in the mail — 15 people, 4,000 kr. a month, more hours and weekend shifts — rather than general talk about careers.',
      },
      {
        title: 'Practical advice about Jesper',
        text: 'The question is how to keep the friendship, not whether Jesper deserved the job. Good ideas: tell him first and in private (under fire øjne), ask for his help, keep the lunches and the football. Avoid blunt lines like "det er hans problem".',
      },
    ],
    words: [
      { da: 'en holdleder', en: 'a team leader' },
      { da: 'en stilling', en: 'a position / post' },
      { da: 'at søge en stilling', en: 'to apply for a position' },
      { da: 'at tage imod et tilbud', en: 'to accept an offer' },
      { da: 'en lønforhøjelse', en: 'a pay rise' },
      { da: 'at have ansvar for', en: 'to be responsible for' },
      { da: 'en medarbejder', en: 'an employee' },
      { da: 'en kollega (flere kolleger)', en: 'a colleague (colleagues — not "kollegere")' },
      { da: 'en weekendvagt', en: 'a weekend shift' },
      { da: 'at forhandle', en: 'to negotiate' },
      { da: 'at blive skuffet', en: 'to be disappointed' },
      { da: 'under fire øjne', en: 'in private, one to one' },
      { da: 'at sætte pris på', en: 'to appreciate' },
      { da: 'et venskab', en: 'a friendship' },
      { da: 'at være glad på ens vegne', en: 'to be happy for someone' },
    ],
  },
  {
    id: 'wsim-d1-6',
    type: 'd1-email',
    title: 'Flytte i bofællesskab',
    origin: 'simulated',
    intro:
      'Du har fået en mail fra dine danske venner Anne og Thomas. De bor i en lejlighed i Valby med deres søn Albert på 4 år og venter barn nummer to. Nu overvejer de at sælge lejligheden og flytte i et nyt bofællesskab uden for Roskilde. En del af mailen står nedenfor.',
    mail: {
      from: 'Anne og Thomas',
      paragraphs: [
        '… Tak for det fine kort, du sendte til Albert på hans fødselsdag. Han var helt vild med tegningen af traktoren! Vi har hørt, at du er flyttet til Aarhus. Hvordan bor du nu, og har du fået gode naboer?',
        'Vi har også tænkt meget på at flytte. Vores lejlighed er blevet for lille, nu hvor vi venter barn nummer to, og vi har set på et nyt bofællesskab uden for Roskilde. Der er 24 huse og et stort fælleshus, hvor man spiser aftensmad sammen fire gange om ugen. Husene er ikke så store, men der er en stor fælles have, hvor børnene kan lege. Kunne du selv forestille dig at bo sådan?',
        'Det er mig, Anne, der skriver, og jeg må indrømme, at jeg er mere i tvivl end Thomas. Jeg er bange for, at vi aldrig får tid for os selv, fordi der hele tiden er fællesspisning, møder og arbejdsdage. Desuden får vi begge to en halv time længere til arbejde hver vej. Hvad tror du, vi skal tænke over, før vi bestemmer os?',
        'På lørdag er der åbent hus i bofællesskabet, hvor man kan se husene og spise med i fælleshuset. Vi glæder os til at høre fra dig! …',
      ],
      underlined: [
        'Hvordan bor du nu, og har du fået gode naboer?',
        'Kunne du selv forestille dig at bo sådan?',
        'Hvad tror du, vi skal tænke over, før vi bestemmer os?',
      ],
    },
    bullets: [
      THANKS,
      UNDERLINED,
      {
        key: 'proposal',
        danish: 'Foreslå, at du tager med til åbent hus i bofællesskabet.',
        english: 'Suggest that you come along to the open house at the co-housing community.',
      },
    ],
    slots: {
      greeting: {
        hint: 'Greet BOTH Anne and Thomas and thank them for the mail ("Tak for jeres mail"). You can say you are glad Albert liked the card and congratulate them on the baby on the way.',
        starters: [
          { da: 'Kære Anne og Thomas', en: 'Dear Anne and Thomas' },
          { da: 'Tak for jeres mail. Hvor er det dejligt, at Albert kunne lide kortet!', en: "Thanks for your mail. How lovely that Albert liked the card!" },
          { da: 'Og tillykke med den lille ny, der er på vej!', en: 'And congratulations on the little one on the way!' },
        ],
      },
      smalltalk: {
        hint: 'Answer "Hvordan bor du nu, og har du fået gode naboer?": describe your new flat in Aarhus (size, location, what you like) and say something concrete about your neighbours.',
        starters: [
          { da: 'I spørger, hvordan jeg bor nu. Jeg har fået en …', en: "You ask how I'm living now. I've got a …" },
          { da: 'Lejligheden ligger …, og det bedste ved den er …', en: 'The flat is located …, and the best thing about it is …' },
          { da: 'Allerede den første uge kom min nabo forbi og …', en: 'Already in the first week my neighbour came by and …' },
        ],
      },
      'dilemma-1': {
        hint: 'Answer "Kunne du selv forestille dig at bo sådan?": this asks about YOU, not about them. Say whether you could live in a co-housing community with shared dinners four times a week and a shared garden, and why. Then you can add what it would mean for their family.',
        starters: [
          { da: 'Kunne jeg selv bo i et bofællesskab? Ja, det tror jeg faktisk, fordi …', en: 'Could I live in a co-housing community myself? Yes, I actually think so, because …' },
          { da: 'Personligt ville jeg savne …, men jeg kan godt lide tanken om …', en: 'Personally I would miss …, but I like the idea of …' },
          { da: 'For jer tror jeg, at det kan være …, fordi Albert …', en: 'For you, I think it could be …, because Albert …' },
        ],
      },
      'dilemma-2': {
        hint: 'Answer "Hvad tror du, vi skal tænke over, før vi bestemmer os?": take Anne\'s worries seriously and give concrete things to check — how many meetings and work days there are, whether you can skip the shared dinners, and what an extra hour of commuting a day means with two small children.',
        starters: [
          { da: 'Alligevel forstår jeg godt Annes bekymring.', en: "Still, I understand Anne's worry." },
          { da: 'Før I bestemmer jer, ville jeg spørge beboerne, hvor mange …', en: 'Before you decide, I would ask the residents how many …' },
          { da: 'I skal også tænke over, hvad den ekstra transporttid betyder for …', en: 'You should also think about what the extra travel time means for …' },
        ],
      },
      proposal: {
        hint: 'Offer to come along to the open house on Saturday (not just "meet some day"), and suggest how and where you will meet them.',
        starters: [
          { da: 'Jeg vil meget gerne tage med til åbent hus på lørdag.', en: "I'd love to come along to the open house on Saturday." },
          { da: 'Skal vi mødes på Roskilde Station og tage bussen derud sammen?', en: 'Shall we meet at Roskilde Station and take the bus out there together?' },
          { da: 'Så kan jeg også se, om fælleshuset er så hyggeligt, som det lyder.', en: "Then I can also see if the common house is as cosy as it sounds." },
        ],
      },
      closing: {
        hint: 'Wish them luck with the decision, send a greeting to Albert, then a sign-off and your first name.',
        starters: [
          { da: 'Held og lykke med beslutningen – og giv Albert et knus fra mig.', en: 'Good luck with the decision – and give Albert a hug from me.' },
          { da: 'Jeg glæder mig til at se jer på lørdag.', en: "I'm looking forward to seeing you on Saturday." },
          { da: 'Mange hilsner', en: 'Best wishes' },
        ],
      },
    },
    tips: [
      {
        title: 'Two friends: write I, jer and jeres',
        text: 'The mail is from Anne and Thomas, so greet both and use the plural: "Tak for jeres mail", "I spørger", "Før I bestemmer jer". Writing "du" to only Anne is a common slip.',
      },
      {
        title: '"Kunne du selv …?" is about you',
        text: 'The second question asks whether YOU could live like that. Many answers only say whether it suits Anne and Thomas and so miss the question. Start with your own answer, then turn to them.',
      },
      {
        title: 'Use Anne\'s worries as your checklist',
        text: 'Anne names three concerns: no time for themselves, many meetings and work days, and half an hour more each way to work. Answering "what should we think about" with those three points shows careful reading.',
      },
      {
        title: 'The proposal is specific',
        text: 'The bullet asks you to go with them to the open house — which the mail says is on Saturday. "Vi kan mødes en dag" does not answer it; "Jeg tager gerne med til åbent hus på lørdag" does.',
      },
    ],
    words: [
      { da: 'et bofællesskab', en: 'a co-housing community' },
      { da: 'et fælleshus', en: 'a common house' },
      { da: 'en fællesspisning', en: 'a shared dinner' },
      { da: 'en arbejdsdag', en: 'a work day (shared chores in the community)' },
      { da: 'en beboer', en: 'a resident' },
      { da: 'et åbent hus', en: 'an open house' },
      { da: 'at melde fra', en: 'to opt out / say you will not come' },
      { da: 'at have tid for sig selv', en: 'to have time to yourself' },
      { da: 'en transporttid', en: 'a commuting time' },
      { da: 'at pendle', en: 'to commute' },
      { da: 'en toværelseslejlighed', en: 'a two-room flat' },
      { da: 'at falde til', en: 'to settle in' },
      { da: 'at være opmærksom på', en: 'to be aware of / pay attention to' },
      { da: 'at bestemme sig', en: 'to make up your mind' },
    ],
  },
];

export const GRADED_D1_EXTRA: GradedAnswer[] = [
  // ── wsim-d1-4 · En hund til familien ───────────────────────────────────
  {
    id: 'wgr-d1-4-12',
    taskId: 'wsim-d1-4',
    band: '12',
    origin: 'illustrative',
    text: `Kære Camilla

Tak for din lange mail, og tak, fordi I tog så godt imod mig i weekenden. Kagen forsvandt heldigvis hurtigt!

Du spørger, hvordan det går med badminton. Jeg har nu spillet i klubben i to måneder, og det er blevet ugens højdepunkt. Vi træner hver onsdag i hallen, og jeg spiller mest double med en pensioneret lærer, der hedder Bent. Han er 68, men han er stadig hurtigere end mig!

Med hensyn til hvalpen forstår jeg godt, at du er i tvivl. En hund er dejlig, men den kan ikke være alene i otte timer hver dag. Derfor synes jeg, at I kun skal sige ja, hvis I kan finde en løsning i dagtimerne, for eksempel en hundepasser eller en nabo, der kan lufte den ved middagstid. Ellers bliver både hunden og I ulykkelige.

Hvad angår børnene, ville jeg lave en fast plan sammen med dem, før hvalpen kommer. Malte er 12 og kan sagtens gå morgenturen, mens Ida kan give den mad og børste den. Hvis I hænger planen op på køleskabet, kan alle se, hvem der har ansvaret hver dag. Måske kan de endda tjene lidt ekstra lommepenge, når de har klaret en hel uge.

Og et navn? Jeg synes, Kakao ville passe perfekt til en lille brun labrador.

Skal vi ikke mødes en dag i næste uge og snakke mere om det? Jeg kan komme forbi på torsdag efter arbejde, hvis det passer jer.

Mange hilsner
Ravi`,
    summary:
      'All four underlined questions answered — the dilemma with a clear "yes, if" and concrete, age-fitted ideas — in warm, precise and near-flawless Danish.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks, all four underlined questions and a proposal with a concrete day ("på torsdag efter arbejde") are there. Both halves of the first question are answered (how it goes, and who: "en pensioneret lærer, der hedder Bent"). The puppy question gets a real judgement with a condition ("kun …, hvis I kan finde en løsning i dagtimerne"), and the responsibility question gets three practical ideas fitted to the children\'s ages. Even the easy-to-miss name question is answered.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'One paragraph per question, each opened with a signpost ("Du spørger, hvordan…", "Med hensyn til hvalpen…", "Hvad angår børnene…", "Og et navn?"). Linking is varied — "derfor", "ellers", "mens", "hvis", "endda" — and small personal details ("Han er 68, men han er stadig hurtigere end mig!") keep the register warm and natural.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Word order is secure: inversion after fronted elements ("Derfor synes jeg", "Ellers bliver både hunden og I") and "kun" placed correctly in the at-clause ("at I kun skal sige ja"). Vocabulary is idiomatic and precise ("tage godt imod", "lufte den", "ugens højdepunkt", "hvem der har ansvaret"). No errors worth marking.',
      },
    ],
    annotations: [
      {
        quote: 'Du spørger, hvordan det går med badminton.',
        kind: 'good',
        note: 'Echoing the underlined question as a signpost shows the reader at once which question is being answered.',
      },
      {
        quote: 'jeg spiller mest double med en pensioneret lærer, der hedder Bent',
        kind: 'good',
        note: 'Answers the second half of the question ("hvem spiller du med?"), which many answers forget.',
      },
      {
        quote: 'Derfor synes jeg, at I kun skal sige ja, hvis I kan finde en løsning i dagtimerne',
        kind: 'good',
        note: 'A clear judgement with a condition that targets the real problem. Note the inversion after "Derfor" and "kun" before the verb in the at-clause.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'en nabo, der kan lufte den ved middagstid',
        kind: 'good',
        note: 'A concrete solution of the writer\'s own, with an idiomatic verb ("lufte" a dog).',
      },
      {
        quote: 'Malte er 12 og kan sagtens gå morgenturen, mens Ida kan give den mad',
        kind: 'good',
        note: 'Uses the ages from the mail to fit the advice to each child — this is what developing a point looks like.',
      },
      {
        quote: 'Hvis I hænger planen op på køleskabet, kan alle se, hvem der har ansvaret hver dag.',
        kind: 'good',
        note: 'Inversion after the fronted hvis-clause ("kan alle se"), and "der" correctly marks "hvem" as the subject of the indirect question.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Og et navn?',
        kind: 'good',
        note: 'A short, natural transition that makes sure the fourth underlined question is not forgotten.',
      },
    ],
  },
  {
    id: 'wgr-d1-4-7',
    taskId: 'wsim-d1-4',
    band: '7',
    origin: 'illustrative',
    text: `Hej Camilla

Tak for din mail. Det var hyggeligt at besøge jer i weekenden.

Badminton går rigtig godt. Jeg spiller hver onsdag i en klub tæt på mit arbejde, og jeg spiller mest med min kollega Sunil. Vi er ikke så gode, men det er sjovt. Efter træningen vi drikker ofte en øl sammen.

Om hvalpen synes jeg, at det er en god idé, fordi børnene har ønsket sig en hund i lang tid. Men det er et problem, at hunden skal være alene hele dagen. Måske kan I spørge en nabo, om han kan gå tur med den. Det er også vigtig, at I går til hundeskole med den.

Jeg tror, det er svært at få børnene til at tage ansvar. Børn glemmer tit ting. Men I kan lave en liste, hvor der står, hvem skal gå tur med hunden hver dag. Malte er stor nok til at gå alene med den, og Ida kan give den mad. Hvis de gør ikke deres opgaver, får de ikke lommepenge.

Et godt navn er Bamse!

Skal vi mødes og snakke mere om det? Du kan komme til mig på søndag, så laver jeg kaffe.

Mange hilsner
Ravi`,
    summary:
      'Every question is answered with a reason or an idea, but the points stay short and a handful of word-order and agreement slips show.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'All bullets and all four underlined questions are covered, including both halves of the first one and the name. The puppy question gets a yes with a reason, but the main problem (alone all day) is only met with one quick idea ("spørge en nabo"). The responsibility paragraph has good ideas (a list, tasks by age) but is less developed than it could be.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'The paragraphs follow the mail, and "Om hvalpen…" signals the topic. Connectors are limited: "men" opens three sentences, and the short line "Børn glemmer tit ting." stands on its own. The register is friendly and fits a friend.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Generally clear sentences with typical B1 slips: a missed inversion ("Efter træningen vi drikker"), a missing neuter -t ("Det er også vigtig"), main-clause order in an indirect question ("hvem skal gå tur"), and "ikke" after the verb in a hvis-clause ("Hvis de gør ikke"). None of them blocks understanding.',
      },
    ],
    annotations: [
      {
        quote: 'Efter træningen vi drikker',
        kind: 'error',
        note: '"Efter træningen" fills the front slot, so the verb must come next, before the subject.',
        fix: 'Efter træningen drikker vi',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Om hvalpen synes jeg',
        kind: 'good',
        note: 'Correct inversion after a fronted phrase, and a clear signpost for the second question.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Det er også vigtig',
        kind: 'error',
        note: 'An adjective describing "det" takes the neuter -t form.',
        fix: 'Det er også vigtigt',
      },
      {
        quote: 'hvem skal gå tur med hunden',
        kind: 'error',
        note: 'In an indirect question where "hvem" is the subject, Danish adds "der" and keeps subordinate-clause order.',
        fix: 'hvem der skal gå tur med hunden',
      },
      {
        quote: 'Hvis de gør ikke deres opgaver',
        kind: 'error',
        note: 'In a subordinate clause "ikke" goes before the finite verb.',
        fix: 'Hvis de ikke gør deres opgaver',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Måske kan I spørge en nabo, om han kan gå tur med den.',
        kind: 'style',
        note: 'A good idea, but it is the only answer to the real problem (eight hours alone). One more sentence — how often, or a dog walker instead — would develop the point.',
      },
      {
        quote: 'Du kan komme til mig på søndag, så laver jeg kaffe.',
        kind: 'good',
        note: 'A concrete, friendly proposal with correct inversion after "så".',
      },
    ],
  },
  {
    id: 'wgr-d1-4-4',
    taskId: 'wsim-d1-4',
    band: '4',
    origin: 'illustrative',
    text: `Hej Camilla

Tak for din mail og tak for sidst.

Badminton er sjovt. Jeg spiller i en klub om onsdagen med nogle mænd fra mit arbejde. Nogle gange vi vinder, nogle gange vi taber. Jeg har købt en ny ketsjer, den var meget dyr.

Jeg synes I skal købe hvalpen. Børn er glade når de har en hund og det er godt for dem at være udenfor. I mit land mange familier har en hund i haven. Jeg har ikke en hund, fordi min lejlighed er for lille, men jeg elsker hunde. Men hunden er alene hele dagen, det er ikke så godt. Måske kan I tage den med på arbejde.

Børnene skal også hjælpe til.

Navnet kan være Max.

Vi kan mødes en dag og snakke om det. Ring til mig.

Mange hilsen
Ravi`,
    summary:
      'Three questions get short answers, but the one about the children taking responsibility is barely touched; frequent word-order errors and an unrealistic idea.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks, a vague proposal and answers to the badminton, puppy and name questions are there. The third underlined question is not really answered: "Børnene skal også hjælpe til." gives no idea of HOW to make them take responsibility. The puppy answer drifts into the writer\'s own flat and offers an unrealistic solution ("tage den med på arbejde").',
      },
      {
        criterion: 'pragmatic',
        comment:
          'There are paragraphs, but sentences are short and joined with commas or "og" ("…ketsjer, den var meget dyr"). Two sentences in a row start with "men"/"Men", and the price of the racket is an irrelevant detail. The proposal ("Ring til mig.") is very brief.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Repeated missed inversion ("Nogle gange vi vinder", "I mit land mange familier har") and a plural error in the sign-off ("Mange hilsen"). Simple vocabulary, but the text is understandable throughout.',
      },
    ],
    annotations: [
      {
        quote: 'Nogle gange vi vinder, nogle gange vi taber.',
        kind: 'error',
        note: 'Both halves start with the fronted time phrase "Nogle gange", so the verb must come before the subject each time.',
        fix: 'Nogle gange vinder vi, og nogle gange taber vi.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Jeg har købt en ny ketsjer, den var meget dyr.',
        kind: 'style',
        note: 'A comma splice, and an off-topic detail. The question asked who you play with — say that instead.',
        fix: 'Jeg spiller mest med min kollega Ali, som er meget bedre end mig.',
      },
      {
        quote: 'I mit land mange familier har en hund i haven.',
        kind: 'error',
        note: 'Fronted "I mit land" requires the verb next. The comparison also adds little to Camilla\'s problem.',
        fix: 'I mit land har mange familier en hund i haven.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Måske kan I tage den med på arbejde.',
        kind: 'style',
        note: 'Correct inversion after "Måske", but most workplaces do not allow dogs. A realistic idea (a neighbour, a dog walker) would answer the problem better.',
        fix: 'Måske kan en nabo lufte den ved middagstid.',
      },
      {
        quote: 'Børnene skal også hjælpe til.',
        kind: 'error',
        note: 'Does not answer the underlined question ("Hvordan kan vi få børnene til at tage ansvar?"). A missed question costs a lot under task fulfilment.',
        fix: 'I kan lave en plan, så Malte går morgenturen, og Ida giver den mad.',
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
    id: 'wgr-d1-4-02',
    taskId: 'wsim-d1-4',
    band: '02',
    origin: 'illustrative',
    text: `Hej Camilla

Tak for mail. Det var hyggelig i weekend.

Badminton er sjov. Jeg spille med min venner hver onsdag, vi har meget sjov. Det er godt for min krop.

Jeg synes I skal tage hunden, børn er glad. Men hund er alene hele dag, det er ikke godt for den. Måske I kan finde en person som går med hunden.

Børnene skal gå tur hver dag med hunden, hvis de gør ikke det, de får ikke slik.

Hunden navn kan være Fido.

Måske vi ses snart.

Hilsen
Ravi`,
    summary:
      'Barely passes: every question is touched in a line or two, but nothing is developed and errors appear in almost every sentence.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks, all four underlined questions and a kind of proposal are touched, which is why the text just passes. Each answer is one or two sentences: the puppy gets "børn er glad", the responsibility question one threat about sweets, and the proposal ("Måske vi ses snart") has no time or place.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'The paragraphs follow the mail, but the sentences are strung together with commas, and there is almost no linking beyond "men". It reads like notes rather than a mail to a friend.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Errors in almost every line: agreement ("hyggelig", "børn er glad"), verb form ("Jeg spille"), possessives ("min venner", "Hunden navn"), missing articles ("hele dag"), an anglicism ("vi har meget sjov") and word order ("Måske I kan", "hvis de gør ikke det, de får"). The main meaning still comes through.',
      },
    ],
    annotations: [
      {
        quote: 'Det var hyggelig i weekend.',
        kind: 'error',
        note: 'An adjective about "det" takes -t, and "weekend" needs the definite form here.',
        fix: 'Det var hyggeligt i weekenden.',
      },
      {
        quote: 'Jeg spille med min venner',
        kind: 'error',
        note: 'Present tense needs -r, and the possessive is plural before a plural noun.',
        fix: 'Jeg spiller med mine venner',
      },
      {
        quote: 'vi har meget sjov',
        kind: 'error',
        note: 'Translated from English "we have a lot of fun". Danish says "have det sjovt".',
        fix: 'vi har det rigtig sjovt',
      },
      {
        quote: 'børn er glad',
        kind: 'error',
        note: 'The adjective agrees with a plural subject: "glade". Use the definite "børnene" for Camilla\'s children.',
        fix: 'børnene bliver glade',
      },
      {
        quote: 'hvis de gør ikke det, de får ikke slik',
        kind: 'error',
        note: '"ikke" goes before the verb in the hvis-clause, and the main clause after it must invert.',
        fix: 'hvis de ikke gør det, får de ikke slik',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Hunden navn',
        kind: 'error',
        note: 'Possession is shown with -s on the owner.',
        fix: 'Hundens navn',
      },
      {
        quote: 'Måske vi ses snart.',
        kind: 'error',
        note: 'In writing, fronted "Måske" is followed by the verb. The proposal also needs a time or place to count.',
        fix: 'Skal vi ikke mødes på søndag og snakke mere om det?',
        ruleId: 'v2-inversion',
      },
    ],
  },

  // ── wsim-d1-5 · Chef for sine kolleger ─────────────────────────────────
  {
    id: 'wgr-d1-5-12',
    taskId: 'wsim-d1-5',
    band: '12',
    origin: 'illustrative',
    text: `Kære Mikkel

Tak for din mail – og tillykke! Det er en stor anerkendelse, at din chef har tilbudt dig jobbet som holdleder.

Du spørger til min tur. Jeg var hjemme i Valencia i to uger i september, og det var dejligt at se familien igen. Min mor har det heldigvis meget bedre efter operationen, og min lillebror er lige blevet far, så jeg fik også hilst på min nye niece. Det eneste minus var varmen: 34 grader er for meget for en, der er blevet vant til dansk vejr!

Hvad jobbet angår, synes jeg, at du skal sige ja. Du kender lageret og dine kolleger bedre end nogen anden, og 4.000 kr. mere om måneden er ikke småpenge. Men tænk grundigt over weekendvagterne. Måske kan du forhandle dig til, at du kun har vagt hver tredje weekend, så du stadig har tid til familien og fodbolden.

Med hensyn til Jesper forstår jeg godt, at du er bekymret. Jeg ville tale med ham under fire øjne, før de andre hører nyheden. Fortæl ham ærligt, at du sætter pris på jeres venskab, og at du gerne vil have hans hjælp, fordi han har så meget erfaring. Hvis han føler sig respekteret, tror jeg ikke, at det ødelægger noget mellem jer. Han bliver måske skuffet i starten, men det går nok over.

Skal vi ikke mødes til en kop kaffe på torsdag, før du skal give din chef et svar? Så kan vi snakke det hele igennem.

Mange hilsner
Elena`,
    summary:
      'Both halves of the small-talk question and both dilemma questions answered with reasons and concrete ideas; the proposal respects the Friday deadline. Natural, near-flawless Danish.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks with congratulations, all three underlined questions and a proposal timed before the deadline ("på torsdag, før du skal give din chef et svar"). The trip question is answered in both halves — the trip and how the family is ("Min mor har det heldigvis meget bedre"). The job answer is a clear yes that uses the facts from the mail and adds an idea of its own (negotiating fewer weekends), and the Jesper paragraph gives three practical steps.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Clear paragraphs, each opened with a signpost ("Du spørger til…", "Hvad jobbet angår…", "Med hensyn til Jesper…"). The writer balances the offer ("Men tænk grundigt over weekendvagterne") and links ideas with "så", "fordi", "hvis" and "men". The tone is warm and encouraging without being pushy.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Secure word order: inversion after fronted elements ("Hvad jobbet angår, synes jeg", "Måske kan du") and adverbs before the verb in subordinate clauses ("så du stadig har tid"). Idiomatic range — "ikke småpenge", "under fire øjne", "sætte pris på", "hilse på". No errors worth marking.',
      },
    ],
    annotations: [
      {
        quote: 'tillykke! Det er en stor anerkendelse',
        kind: 'good',
        note: 'Reacting to the friend\'s news before answering the questions makes the mail feel personal.',
      },
      {
        quote: 'Min mor har det heldigvis meget bedre',
        kind: 'good',
        note: 'Answers the second half of the question ("hvordan har din familie det?") with the right idiom: "have det godt/bedre".',
      },
      {
        quote: 'Hvad jobbet angår, synes jeg',
        kind: 'good',
        note: 'The fronted phrase is followed by the verb — correct V2 order — and signals the second question clearly.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Måske kan du forhandle dig til, at du kun har vagt hver tredje weekend',
        kind: 'good',
        note: 'A concrete solution of the writer\'s own that deals with the main drawback of the job.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'så du stadig har tid',
        kind: 'good',
        note: 'In a subordinate clause, "stadig" (like "ikke") goes before the finite verb.',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'under fire øjne',
        kind: 'good',
        note: 'A precise Danish idiom for a private, one-to-one talk.',
      },
      {
        quote: 'Skal vi ikke mødes til en kop kaffe på torsdag, før du skal give din chef et svar?',
        kind: 'good',
        note: 'The proposal answers the bullet exactly: a meeting before the Friday deadline.',
      },
    ],
  },
  {
    id: 'wgr-d1-5-7',
    taskId: 'wsim-d1-5',
    band: '7',
    origin: 'illustrative',
    text: `Hej Mikkel

Tak for din mail og tak for den gode nyhed.

Min tur til Spanien var rigtig god. Jeg var hos min familie i to uger, og vi var meget på stranden. Min mor har det bedre nu, og min bror har fået en baby. Det var dejligt at se dem alle sammen igen.

Jeg synes, du skal tage imod jobbet. Du har arbejdet på lageret i mange år, så du kender alt. Og det er godt med flere penge. Men weekendvagterne er ikke så godt, fordi du har måske ikke tid til din familie. Du kan spørge din chef, om du kan få færre vagter.

Om Jesper tror jeg, at han bliver lidt ked af det. Det er normalt. Du skal snakke med ham, før han hører det fra en anden. Du kan sige, at du stadig vil være hans ven, og at I kan stadig spille fodbold om tirsdagen. Hvis han er en god ven, han vil forstå det.

Skal vi mødes inden fredag og snakke mere om det? Jeg har fri på onsdag.

Kærlige hilsner
Elena`,
    summary:
      'All questions answered with a clear opinion and sensible advice, but thinly, with repetitive sentence openings and several word-order and agreement slips.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks, all three underlined questions and a proposal before Friday ("inden fredag … Jeg har fri på onsdag") are covered. Both halves of the trip question are answered. The job and Jesper paragraphs give a view and one idea each (fewer shifts; talk to him first), but the reasons stay general ("det er godt med flere penge").',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Clear paragraphs that follow the mail, and "Om Jesper…" signals the topic. Many sentences start with "Du" ("Du har…", "Du kan…", "Du skal…", "Du kan…"), and "Og"/"Men" do most of the linking. The register suits a friend.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Mostly correct, with typical slips: plural agreement ("weekendvagterne er ikke så godt"), adverbs after the verb in subordinate clauses ("fordi du har måske ikke", "at I kan stadig") and a missed inversion after a hvis-clause ("han vil forstå det"). Meaning is always clear.',
      },
    ],
    annotations: [
      {
        quote: 'weekendvagterne er ikke så godt',
        kind: 'error',
        note: 'The adjective agrees with the plural subject "weekendvagterne".',
        fix: 'weekendvagterne er ikke så gode',
      },
      {
        quote: 'fordi du har måske ikke tid',
        kind: 'error',
        note: 'In a fordi-clause, the sentence adverbs "måske ikke" come before the finite verb.',
        fix: 'fordi du måske ikke har tid',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Om Jesper tror jeg',
        kind: 'good',
        note: 'Correct inversion after the fronted phrase, and a clear signpost for the third question.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'at I kan stadig spille fodbold',
        kind: 'error',
        note: '"stadig" is a sentence adverb, so it goes before the verb in an at-clause.',
        fix: 'at I stadig kan spille fodbold',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Hvis han er en god ven, han vil forstå det.',
        kind: 'error',
        note: 'The hvis-clause fills the front slot, so the main clause must start with the verb.',
        fix: 'Hvis han er en god ven, vil han forstå det.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Skal vi mødes inden fredag og snakke mere om det?',
        kind: 'good',
        note: 'The proposal respects the deadline in the mail, and the next sentence offers a day.',
      },
    ],
  },
  {
    id: 'wgr-d1-5-4',
    taskId: 'wsim-d1-5',
    band: '4',
    origin: 'illustrative',
    text: `Hej Mikkel

Tak for din mail. Tillykke med det nye job!

Jeg synes du skal sige ja. Det er mange penge, 4.000 kr. Og det er godt for din CV at være leder. Måske senere du kan blive chef for hele lageret. Weekend er ikke så godt men du kan godt arbejde lidt mere, du er ung.

Jesper er din ven, og han vil være glad for dig. Hvis han bliver sur, det er ikke din skyld. Du har ikke gjort noget forkert. Men måske du skal ikke fortælle ham det i frokosten, fordi de andre kolleger hører det.

Vi kan mødes en dag og snakke om det.

Jeg glæder mig til min fødselsdag, husk at komme!

Mange hilsen
Elena`,
    summary:
      'The job and Jesper questions get short answers, but the question about the trip and the family is skipped and the proposal ignores the deadline; frequent errors.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks and answers to the job and Jesper questions are there, but the first underlined question ("Hvordan var turen, og hvordan har din familie det?") is not answered at all. The proposal ("en dag") ignores that Mikkel must answer by Friday. The job answer repeats the money and adds a blunt remark ("du er ung") instead of dealing with the weekend shifts.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Short paragraphs with simple sentences, often joined by commas ("…lidt mere, du er ung."). "Hvis han bliver sur, det er ikke din skyld" sounds dismissive of a friendship Mikkel is worried about. The closing line about the birthday is friendly.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Frequent errors: gender ("din CV"), missed inversion ("Måske senere du kan", "Hvis han bliver sur, det er"), adverb placement ("måske du skal ikke"), an anglicism ("være glad for dig" for "happy for you"), a wrong preposition ("i frokosten") and the sign-off plural. Still understandable.',
      },
    ],
    annotations: [
      {
        quote: 'Tak for din mail. Tillykke med det nye job!',
        kind: 'style',
        note: 'Friendly, but the next paragraph jumps straight to the job: the underlined question about the trip and the family is never answered.',
        fix: 'Tak for din mail. Min tur til Spanien var dejlig, og min familie har det godt.',
      },
      {
        quote: 'din CV',
        kind: 'error',
        note: '"CV" is a t-word in Danish.',
        fix: 'dit CV',
      },
      {
        quote: 'Måske senere du kan blive',
        kind: 'error',
        note: 'After fronted "Måske" the finite verb comes next, before the subject.',
        fix: 'Måske kan du senere blive',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'han vil være glad for dig',
        kind: 'error',
        note: 'Anglicism: "glad for dig" means "fond of you". "Happy for you" is "glad på dine vegne".',
        fix: 'han bliver glad på dine vegne',
      },
      {
        quote: 'Hvis han bliver sur, det er ikke din skyld.',
        kind: 'error',
        note: 'The main clause after a hvis-clause must start with the verb. The thought is also a bit blunt for a worried friend.',
        fix: 'Hvis han bliver sur, er det ikke din skyld.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'måske du skal ikke fortælle ham det i frokosten',
        kind: 'error',
        note: '"Men" does not count, so "måske" fills the front slot: the verb comes next, then the subject, then "ikke". "In the lunch break" is "i frokostpausen".',
        fix: 'måske skal du ikke fortælle ham det i frokostpausen',
        ruleId: 'v2-inversion',
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
    id: 'wgr-d1-5-02',
    taskId: 'wsim-d1-5',
    band: '02',
    origin: 'illustrative',
    text: `Hej Mikkel

Tak for din mail. Tillykke.

Min tur var god, min familie har det godt. Det var meget varmt.

Du skal tage jobbet, fordi du får mere penger. Weekend arbejde er ikke sjov men det er okay. Du er god arbejder.

Jesper han bliver måske vred. Du skal sige ham at I er stadig venner. Hvis han er vred, du kan give ham en øl efter fodbold.

Vi kan mødes en dag. Hvornår du har tid?

Hilsen
Elena`,
    summary:
      'Barely passes: every question gets a line, but nothing is developed, the proposal misses the deadline, and errors appear in most sentences.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks, all three underlined questions and a proposal are touched, which is why the text just passes. Each answer is one or two short sentences with almost no reasons, and the proposal ("Vi kan mødes en dag") does not mention Friday.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'The paragraphs follow the mail, but sentences are listed with commas and almost no linking. "Du er god arbejder." is a fragment rather than an argument.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Errors throughout: "mere penger" (flere penge), a split compound and agreement ("Weekend arbejde er ikke sjov"), a missing article ("god arbejder"), a doubled subject ("Jesper han"), "sige ham" without "til", adverb placement ("er stadig") and word order after "Hvis" and in the question ("Hvornår du har tid?"). The main meaning is still clear.',
      },
    ],
    annotations: [
      {
        quote: 'mere penger',
        kind: 'error',
        note: '"Penge" is a plural noun (no -r), and countable plurals take "flere".',
        fix: 'flere penge',
      },
      {
        quote: 'Weekend arbejde er ikke sjov',
        kind: 'error',
        note: 'Danish writes compounds as one word, and "arbejde" is a t-word, so the adjective takes -t.',
        fix: 'Weekendarbejde er ikke sjovt',
      },
      {
        quote: 'Jesper han bliver',
        kind: 'error',
        note: 'The subject is said twice. Use either "Jesper" or "han".',
        fix: 'Jesper bliver',
      },
      {
        quote: 'Du skal sige ham at I er stadig venner.',
        kind: 'error',
        note: '"Sige" needs "til" before a person, and "stadig" goes before the verb in the at-clause.',
        fix: 'Du skal sige til ham, at I stadig er venner.',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Hvis han er vred, du kan give ham',
        kind: 'error',
        note: 'After the fronted hvis-clause the verb comes before the subject.',
        fix: 'Hvis han er vred, kan du give ham',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Hvornår du har tid?',
        kind: 'error',
        note: 'In a direct question the finite verb comes right after the question word.',
        fix: 'Hvornår har du tid?',
        ruleId: 'finit-verb-second',
      },
    ],
  },

  // ── wsim-d1-6 · Flytte i bofællesskab ──────────────────────────────────
  {
    id: 'wgr-d1-6-12',
    taskId: 'wsim-d1-6',
    band: '12',
    origin: 'illustrative',
    text: `Kære Anne og Thomas

Tak for jeres mail. Hvor er det dejligt, at Albert kunne lide kortet – og tillykke med den lille ny, der er på vej!

I spørger, hvordan jeg bor nu. Jeg har fået en lys toværelseslejlighed på tredje sal tæt på centrum i Aarhus, og jeg er rigtig glad for den. Naboerne er en blanding af studerende og ældre par. Allerede den første uge kom damen ved siden af forbi med hjemmebagte boller, så jeg er faldet godt til.

Kunne jeg selv bo i et bofællesskab? Ja, det tror jeg faktisk. Jeg kan godt lide tanken om at spise sammen med andre i stedet for alene foran fjernsynet. For jer tror jeg, at det kan være helt fantastisk, fordi Albert og den lille vil have legekammerater lige uden for døren.

Alligevel forstår jeg godt Annes bekymring. Før I bestemmer jer, ville jeg spørge beboerne, hvor mange møder og arbejdsdage der egentlig er om måneden, og om man kan melde fra til fællesspisningen, når man har brug for ro. I skal også tænke over, hvad en time ekstra i bil eller tog hver dag betyder for jeres hverdag med to små børn. Måske kan I tale med en familie, der har boet der i nogle år?

Jeg vil meget gerne tage med til åbent hus på lørdag. Så kan jeg også se, om fælleshuset er så hyggeligt, som det lyder. Skal vi mødes på Roskilde Station og tage bussen derud sammen?

Mange hilsner
Tomasz`,
    summary:
      'Addresses both friends, answers all three questions — including the easily misread "Kunne du selv …?" — uses Anne\'s worries as a checklist, and makes the exact proposal; near-flawless Danish.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks, all three underlined questions and the specific proposal ("tage med til åbent hus på lørdag") are covered. The second question is answered about the writer himself first ("Kunne jeg selv bo i et bofællesskab? Ja …") and then applied to the family. The last question turns Anne\'s three worries — meetings, time for themselves, commuting — into concrete things to check.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'The writer consistently uses the plural ("jeres mail", "I spørger", "Før I bestemmer jer"), which fits a mail from two people. Each paragraph opens with a signpost, and "Alligevel forstår jeg godt Annes bekymring" makes a smooth turn from the positive side to the concerns. The tone is warm and supportive.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Secure V2 order ("Allerede den første uge kom damen…", "Før I bestemmer jer, ville jeg") and correct indirect questions ("hvor mange møder og arbejdsdage der egentlig er"). Precise vocabulary for the topic: "falde til", "melde fra til fællesspisningen", "legekammerater lige uden for døren". No errors worth marking.',
      },
    ],
    annotations: [
      {
        quote: 'Kære Anne og Thomas',
        kind: 'good',
        note: 'The mail is from two people, so both are greeted — and the rest of the text keeps to "I/jer/jeres".',
      },
      {
        quote: 'I spørger, hvordan jeg bor nu.',
        kind: 'good',
        note: 'Signposts the first question, with the plural "I" because both friends are asking.',
      },
      {
        quote: 'Allerede den første uge kom damen ved siden af forbi',
        kind: 'good',
        note: 'A long fronted time phrase, correctly followed by the verb ("kom") before the subject. The detail answers "har du fået gode naboer?" concretely.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Kunne jeg selv bo i et bofællesskab? Ja, det tror jeg faktisk.',
        kind: 'good',
        note: 'Answers the question that is easiest to misread — it asks about the writer, not the family — and gives a direct answer first.',
      },
      {
        quote: 'Alligevel forstår jeg godt Annes bekymring.',
        kind: 'good',
        note: 'A natural turn to the other side, with inversion after "Alligevel", and it shows the writer read who is worried.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'hvor mange møder og arbejdsdage der egentlig er om måneden',
        kind: 'good',
        note: 'An indirect question with subordinate-clause order and "der" as the formal subject — correct and idiomatic.',
      },
      {
        quote: 'Jeg vil meget gerne tage med til åbent hus på lørdag.',
        kind: 'good',
        note: 'The proposal matches the bullet exactly (going along to the open house) and uses the day from the mail.',
      },
    ],
  },
  {
    id: 'wgr-d1-6-7',
    taskId: 'wsim-d1-6',
    band: '7',
    origin: 'illustrative',
    text: `Kære Anne og Thomas

Tak for jeres mail. Det var godt at høre fra jer.

Jeg bor nu i en lejlighed i Aarhus. Den er ikke så stor, men den har en altan og et godt køkken. Mine naboer er søde, men jeg kender dem ikke så godt endnu. Damen ved siden af er meget venlig og siger altid hej.

Jeg tror godt, jeg kunne bo i et bofællesskab, fordi jeg kan lide at være sammen med andre mennesker. Det er også godt for børn, at de har mange venner tæt på. Men jeg vil ikke spise sammen med andre fire gange om ugen, det er for meget for mig.

Før I bestemmer jer, I skal tale med de andre beboere. I kan spørge, hvor mange møder der er. I skal også tænke på transporten, fordi I skal køre længere til arbejde hver dag, og det koster også mange penger. Anne har ret, at det er vigtigt at have tid for jer selv.

Jeg vil gerne komme med til åbent hus på lørdag. Hvornår skal vi mødes?

Kærlige hilsner
Tomasz`,
    summary:
      'All three questions and the proposal are answered, with a personal view on co-housing, but the advice is brief and a few typical errors show.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks, the three underlined questions and the right proposal (the open house on Saturday) are all there. The writer answers "Kunne du selv …?" about himself, with a reason and a reservation. The last question gets three relevant points (residents, meetings, transport), but each is only one sentence.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Both friends are addressed and the plural is used throughout. The paragraphs follow the mail, but linking is mostly "men" and "også", and three sentences in a row start with "I". The register is friendly.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Generally correct, with typical slips: a missed inversion after the "Før"-clause ("Før I bestemmer jer, I skal"), a wrong plural ("mange penger") and a missing preposition ("har ret, at"). A comma splice ("…om ugen, det er for meget") also shows. Nothing blocks understanding.',
      },
    ],
    annotations: [
      {
        quote: 'Kære Anne og Thomas',
        kind: 'good',
        note: 'Both friends wrote, and both are greeted.',
      },
      {
        quote: 'Jeg tror godt, jeg kunne bo i et bofællesskab',
        kind: 'good',
        note: 'Answers the question about the writer himself, not just about the family.',
      },
      {
        quote: 'Men jeg vil ikke spise sammen med andre fire gange om ugen, det er for meget for mig.',
        kind: 'style',
        note: 'A good personal reservation, but the comma splice joins two main clauses. Use a full stop or "fordi".',
        fix: 'Men jeg ville ikke spise sammen med andre fire gange om ugen, fordi det er for meget for mig.',
      },
      {
        quote: 'Før I bestemmer jer, I skal tale',
        kind: 'error',
        note: 'The før-clause fills the front slot, so the verb must come before the subject in the main clause.',
        fix: 'Før I bestemmer jer, skal I tale',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'mange penger',
        kind: 'error',
        note: '"Penge" is already plural — no -r.',
        fix: 'mange penge',
      },
      {
        quote: 'Anne har ret, at det er vigtigt',
        kind: 'error',
        note: '"Have ret" takes "i" before an at-clause.',
        fix: 'Anne har ret i, at det er vigtigt',
      },
    ],
  },
  {
    id: 'wgr-d1-6-4',
    taskId: 'wsim-d1-6',
    band: '4',
    origin: 'illustrative',
    text: `Hej Anne

Tak for mail. Albert er en sød dreng.

Min nye lejlighed er god. Den er i Aarhus tæt på centrum. Naboerne jeg har ikke mødt så meget, de arbejder hele tiden.

Jeg synes bofællesskab er en god idé for jer. Der er en stor have og børnene kan lege med andre børn. I København lejligheder er meget dyre og små.

Men I skal tænke over transport. En time til arbejde er lang tid hver dag. Og I skal spørge om møderne, mange møder er kedelig. Hvis I ikke kan lide det, I kan flytte igen.

Jeg kan komme på lørdag måske.

Mange hilsner
Tomasz`,
    summary:
      'Misreads "Kunne du selv …?" and answers only about the family; greets just Anne; the other points are short, with frequent word-order errors and a vague proposal.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks, the flat question, the "what should we think about" question and a proposal are there in short form. The second underlined question is missed: it asks whether the writer could live like that, but the answer only says it is "en god idé for jer". The proposal ("Jeg kan komme på lørdag måske") barely refers to the open house.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'The mail is from Anne and Thomas, but only Anne is greeted. Sentences are short and often run together with commas ("…møderne, mange møder er kedelig"). "Hvis I ikke kan lide det, I kan flytte igen" sounds careless about a big decision.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Repeated missed inversion ("Naboerne jeg har ikke mødt", "I København lejligheder er", "I kan flytte igen"), a missing plural ending ("kedelig") and a missing possessive in "Tak for mail". Understandable, but the reader has to work in places.',
      },
    ],
    annotations: [
      {
        quote: 'Hej Anne',
        kind: 'style',
        note: 'Anne and Thomas wrote together, so greet both and write "jeres mail".',
        fix: 'Hej Anne og Thomas',
      },
      {
        quote: 'Naboerne jeg har ikke mødt så meget',
        kind: 'error',
        note: 'When the object is fronted, the verb must come next, before the subject.',
        fix: 'Naboerne har jeg ikke mødt så meget',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Jeg synes bofællesskab er en god idé for jer.',
        kind: 'error',
        note: 'Misreads the underlined question "Kunne du selv forestille dig at bo sådan?", which asks about YOU. The noun also needs an article.',
        fix: 'Jeg kunne godt selv bo i et bofællesskab, og jeg tror, det er en god idé for jer.',
      },
      {
        quote: 'I København lejligheder er meget dyre',
        kind: 'error',
        note: 'Fronted "I København" requires the verb next.',
        fix: 'I København er lejlighederne meget dyre',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'mange møder er kedelig',
        kind: 'error',
        note: 'The adjective agrees with the plural subject.',
        fix: 'mange møder er kedelige',
      },
      {
        quote: 'Hvis I ikke kan lide det, I kan flytte igen.',
        kind: 'error',
        note: 'The main clause after the hvis-clause must start with the verb. Also sounds dismissive — selling a flat is a big step.',
        fix: 'Hvis I ikke kan lide det, kan I jo altid flytte igen.',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'Jeg kan komme på lørdag måske.',
        kind: 'style',
        note: 'Too vague for the proposal bullet: say that you will come along to the open house.',
        fix: 'Jeg tager gerne med til åbent hus på lørdag.',
      },
    ],
  },
  {
    id: 'wgr-d1-6-02',
    taskId: 'wsim-d1-6',
    band: '02',
    origin: 'illustrative',
    text: `Hej Anne og Thomas

Tak for jeres mail.

Min lejlighed er lille men god. Naboer er flink, en mand han hjælper mig med min cykel.

Jeg kan godt bo der, jeg kan lide spise med mange mennesker. Det er hyggelig.

Du skal tænke om børn og arbejde. Det er langt at køre. Hvis der er mange møder, det er ikke godt for jer, fordi I har ikke tid.

Ja, jeg kommer med på lørdag. Vi ses.

Hilsen
Tomasz`,
    summary:
      'Barely passes: each question and the proposal get a line, but nothing is developed, the pronoun slips from "I" to "du", and errors are frequent.',
    criteria: [
      {
        criterion: 'task',
        comment:
          'Thanks, all three underlined questions and the proposal are touched, so the text just passes. The answers are one or two sentences each — the last question gets "Du skal tænke om børn og arbejde" without saying what to think about.',
      },
      {
        criterion: 'pragmatic',
        comment:
          'Both friends are greeted, but the text then switches to "Du skal", which no longer fits. Sentences are strung together with commas and the mail reads like notes.',
      },
      {
        criterion: 'linguistic',
        comment:
          'Errors in most sentences: agreement ("Naboer er flink", "Det er hyggelig"), a doubled subject ("en mand han"), a missing infinitive marker ("lide spise"), an anglicism ("tænke om"), and word order after "Hvis" and in the fordi-clause ("fordi I har ikke tid"). The main meaning still comes through.',
      },
    ],
    annotations: [
      {
        quote: 'Naboer er flink',
        kind: 'error',
        note: 'Use the definite plural for your own neighbours, and the adjective agrees with the plural.',
        fix: 'Naboerne er flinke',
      },
      {
        quote: 'en mand han hjælper mig',
        kind: 'error',
        note: 'The subject is said twice. Use either "en mand" or "han".',
        fix: 'en mand hjælper mig',
      },
      {
        quote: 'jeg kan lide spise',
        kind: 'error',
        note: '"Kan lide" is followed by "at" + infinitive.',
        fix: 'jeg kan lide at spise',
      },
      {
        quote: 'Du skal tænke om børn',
        kind: 'error',
        note: 'Two friends wrote, so use "I". "Think about" is "tænke på/over", not "tænke om".',
        fix: 'I skal tænke på børnene',
      },
      {
        quote: 'Hvis der er mange møder, det er ikke godt',
        kind: 'error',
        note: 'After the fronted hvis-clause the verb comes before the subject.',
        fix: 'Hvis der er mange møder, er det ikke godt',
        ruleId: 'v2-inversion',
      },
      {
        quote: 'fordi I har ikke tid',
        kind: 'error',
        note: 'In a fordi-clause "ikke" goes before the finite verb.',
        fix: 'fordi I ikke har tid',
        ruleId: 'ikke-regel',
      },
      {
        quote: 'Ja, jeg kommer med på lørdag.',
        kind: 'good',
        note: 'Short, but it does answer the proposal bullet: going along to the open house on Saturday.',
      },
    ],
  },
];
