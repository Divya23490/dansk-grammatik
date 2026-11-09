import { describe, expect, it } from 'vitest';
import type { VocabEntry } from '../content/vocabulary';
import { checkCloze, clozeChoices, clozeFor } from './cloze';

const accept = {
  id: 'w-v-acceptere',
  word: 'acceptere',
  category: 'verb',
  glossEn: 'accept',
  forms: 'accepterer · accepterede · har accepteret',
  formList: ['acceptere', 'accepterer', 'accepterede', 'accepteret'],
  examples: [
    { form: 'accepterer', da: 'Hun accepterer ikke et nej.', en: 'She does not accept a no.' },
    { form: 'accepterede', da: 'Accepterede han tilbuddet?', en: 'Did he accept the offer?' },
    { form: 'accepteret', da: 'Det er ikke blevet nævnt.', en: 'Form missing from sentence.' },
  ],
  level: 2,
} as VocabEntry;

const bil = {
  id: 'w-n-bil',
  word: 'bil',
  category: 'noun',
  glossEn: 'car',
  forms: 'en bil · bilen',
  formList: ['bil', 'bilen'],
  example: 'Bilen holder ude foran.',
  exampleEn: 'The car is parked outside.',
  level: 1,
} as VocabEntry;

const phrase = {
  id: 'v-paa-grund-af',
  word: 'på grund af',
  category: 'connector',
  glossEn: 'because of',
  example: 'Det er sket på  grund af lovgivning.',
  level: 3,
} as VocabEntry;

const pool = [
  accept,
  bil,
  { id: 'w-n-hus', word: 'hus', category: 'noun', glossEn: 'house', formList: ['hus', 'huset'], level: 1 },
  { id: 'w-n-sko', word: 'sko', category: 'noun', glossEn: 'shoe', formList: ['sko', 'skoen'], level: 1 },
  { id: 'w-n-by', word: 'by', category: 'noun', glossEn: 'town', formList: ['by', 'byen'], level: 1 },
  { id: 'w-v-gaa', word: 'gå', category: 'verb', glossEn: 'walk', formList: ['gå', 'går', 'gik', 'gået'], level: 1 },
] as VocabEntry[];

describe('clozeFor', () => {
  it('cuts the marked form out of the first usage sentence', () => {
    expect(clozeFor(accept)).toEqual({
      before: 'Hun ',
      answer: 'accepterer',
      after: ' ikke et nej.',
      en: 'She does not accept a no.',
    });
  });

  it('keeps the form as written, capital included, and rotates with pick', () => {
    expect(clozeFor(accept, 1)).toMatchObject({ before: '', answer: 'Accepterede', after: ' han tilbuddet?' });
    // Only two usable sentences: the third has no "accepteret" in it.
    expect(clozeFor(accept, 2)?.answer).toBe('accepterer');
  });

  it('falls back to the example with any form of the word, whole words only', () => {
    expect(clozeFor(bil)).toEqual({
      before: '',
      answer: 'Bilen',
      after: ' holder ude foran.',
      en: 'The car is parked outside.',
    });
    expect(clozeFor({ ...bil, example: 'Bilerne holder ude foran.' } as VocabEntry)).toBeNull();
  });

  it('finds a phrase across odd spacing', () => {
    expect(clozeFor(phrase)?.answer).toBe('på  grund af');
  });

  it('uses the sentence a set word was picked out of', () => {
    const own = { id: 'own', word: 'skæv', category: 'phrase', glossEn: '', level: 1, fromText: { sentence: 'En skæv fordeling.', form: 'skæv' } };
    expect(clozeFor(own as VocabEntry)).toEqual({ before: 'En ', answer: 'skæv', after: ' fordeling.' });
  });

  it('is null when there is no sentence', () => {
    expect(clozeFor({ id: 'x', word: 'x', category: 'phrase', glossEn: '', level: 1 } as VocabEntry)).toBeNull();
  });

  it('treats æ ø å as letters, so a word inside another is no match', () => {
    const aar = { id: 'a', word: 'år', category: 'noun', glossEn: 'year', example: 'Det tager tårer.', level: 1 } as VocabEntry;
    expect(clozeFor(aar)).toBeNull();
  });
});

describe('checkCloze', () => {
  it('forgives case and spacing', () => {
    expect(checkCloze('  ACCEPTEREDE ', 'Accepterede')).toBe('right');
    expect(checkCloze('på   grund af', 'på grund af')).toBe('right');
  });

  it('calls one slip in a longer word close', () => {
    expect(checkCloze('accepterde', 'accepterede')).toBe('close');
    expect(checkCloze('bilem', 'bilen')).toBe('close');
  });

  it('is strict on short words, æøå and blanks', () => {
    expect(checkCloze('bul', 'bil')).toBe('wrong');
    expect(checkCloze('aar', 'år')).toBe('wrong');
    expect(checkCloze('', 'bil')).toBe('wrong');
    expect(checkCloze('accepterer', 'accepterede')).toBe('wrong');
  });
});

describe('clozeChoices', () => {
  it('leads with the word’s other forms and never repeats the answer', () => {
    const choices = clozeChoices('accepterer', accept, pool);
    expect(choices).toHaveLength(4);
    expect(choices).toContain('accepterer');
    expect(new Set(choices.map((c) => c.toLowerCase())).size).toBe(4);
    expect(choices.filter((c) => c.startsWith('accept'))).toHaveLength(4);
  });

  it('fills from the same category, same form slot, capitalised like the answer', () => {
    const choices = clozeChoices('Bilen', bil, pool, 4);
    expect(choices).toHaveLength(4);
    expect(choices).toContain('Bilen');
    expect(choices).toContain('Bil');
    for (const c of choices) expect(['Bilen', 'Bil', 'Huset', 'Skoen', 'Byen']).toContain(c);
  });

  it('returns fewer when the pool runs dry', () => {
    expect(clozeChoices('på grund af', phrase, pool)).toEqual(['på grund af']);
  });
});
