import type { OfficialExample } from './types';

/**
 * Official example answers published by SIRI (danskogproever.dk). We link to
 * them and add our own notes; the answer text itself is never copied here.
 *
 * As of November 2026 SIRI publishes exactly one PD3 writing example: a
 * passing ("bestået") answer to the Maj–juni 2022 paper, covering Delprøve 1
 * and Delprøve 2B. There is no official 2A example answer.
 */
export const OFFICIAL_EXAMPLES: OfficialExample[] = [
  {
    id: 'siri-2022-summer-d1',
    label: 'SIRI passing answer, May–June 2022: Delprøve 1 (e-mail to Mia)',
    url: 'https://danskogproever.dk/media/ncfhgdmf/260921-pd3-besvarelse-002.pdf',
    types: ['d1-email'],
    notes: [
      "SIRI only labels this a passing (\"bestået\") answer. It is not a model for a high grade, so read it to see the minimum that works, not as a style to copy.",
      'It does the three things the sheet asks: it opens with thanks, answers all four underlined questions (the driving test, the new colleagues, the teenagers keeping in touch, and car or train), and ends by proposing a meeting.',
      'Each question gets its own short paragraph, and several paragraphs open by naming the topic ("Mht. …", "I forhold til …"). That makes it easy for the censor to tick off every question.',
      'It is about 250 words. Delprøve 1 has no word limit, but answering four questions properly naturally takes 150–250 words.',
      'The language has many surface errors: misspelt verbs, a missing "til" after "glæder mig", "hjemme" where "hjem" is needed, and a missing subject after "foreslår, at". It still passes because the task is fully answered and the tone is right. Task fulfilment comes first, but every one of those errors costs points.',
      'The register is right for a friend: "Hej", du-form, warm small talk, and a short informal sign-off.',
    ],
  },
  {
    id: 'siri-2022-summer-d2b',
    label: 'SIRI passing answer, May–June 2022: Delprøve 2B (En attraktiv arbejdsplads)',
    url: 'https://danskogproever.dk/media/ncfhgdmf/260921-pd3-besvarelse-002.pdf',
    types: ['d2b-list'],
    notes: [
      'This is the same PDF as the Delprøve 1 example, and again it is only labelled as passing ("bestået"). SIRI has published no official 2A example answer.',
      'It follows the three bullets in order: a short personal experience, then comments on two items from the list (pay and staff benefits), then the evaluation. That order makes the structure obvious to the censor.',
      'It is about 316 words, well over the 200-word minimum. The evaluation paragraph is about 140 words, roughly 45% of the text, so close to the required ca. 50%.',
      'Each list item it comments on gets a position ("Jeg er enig i det") and a reason ("Vi lever i et samfund, hvor …"). That is the agree-plus-reason pattern the "Kommentér" bullet rewards.',
      'Its main weakness: the evaluation bullet asks which matters most, the leader\'s personal or professional qualifications, and the answer covers both without choosing one or summing up. A clear verdict ("Samlet set mener jeg, at … er vigtigst, fordi …") would have scored higher on task fulfilment.',
      'It leans on the sheet\'s own wording, and the evaluation paragraph opens with the task\'s intro sentence. Using the key words from the bullet is good, but write the sentences yourself. There are also many grammar and spelling slips ("hvis" where "om" is needed, missing "-t" on adjectives, spelling).',
    ],
  },
];
