import { describe, expect, it } from 'vitest';
import { checkText } from './offlineRules';

/**
 * The offline checker's contract is asymmetric: a missed error is a shame, a
 * false positive is a betrayal. Learners cannot tell the difference between
 * "the app is wrong" and "I am wrong", so the negative cases below matter more
 * than the positive ones.
 */

describe('ikke-regel detection', () => {
  it('catches the main-clause pattern inside a subordinate clause', () => {
    const r = checkText('Jeg skriver, fordi jeg kan ikke komme til mødet.');
    expect(r).toHaveLength(1);
    expect(r[0].ruleId).toBe('ikke-regel');
    expect(r[0].original).toBe('fordi jeg kan ikke');
    expect(r[0].suggestion).toBe('fordi jeg ikke kan');
  });

  it('works for other subordinators and adverbs', () => {
    expect(checkText('Hun spørger, om han har ikke tid.')[0].suggestion).toBe(
      'om han ikke har',
    );
    expect(checkText('Det er svært, hvis du vil aldrig prøve.')[0].suggestion).toBe(
      'hvis du aldrig vil',
    );
  });

  it('stays silent on correct subordinate word order', () => {
    expect(checkText('Jeg skriver, fordi jeg ikke kan komme.')).toHaveLength(0);
    expect(checkText('Hun spørger, om han ikke har tid.')).toHaveLength(0);
  });

  it('does not flag the same pattern in a main clause', () => {
    expect(checkText('Jeg kan ikke komme til mødet.')).toHaveLength(0);
  });
});

describe('inversion detection', () => {
  it('catches a fronted adverbial with no inversion', () => {
    const r = checkText('I går jeg gik på arbejde.');
    expect(r).toHaveLength(1);
    expect(r[0].ruleId).toBe('v2-inversion');
    expect(r[0].suggestion).toBe('I går gik jeg');
  });

  it('catches it mid-text after a full stop', () => {
    const r = checkText('Det var en god dag. Derfor jeg skrev til dig.');
    expect(r.map((x) => x.ruleId)).toContain('v2-inversion');
  });

  it('stays silent when the sentence correctly inverts', () => {
    expect(checkText('I går gik jeg på arbejde.')).toHaveLength(0);
    expect(checkText('Derfor skrev jeg til dig.')).toHaveLength(0);
  });

  it('stays silent when the subject legitimately starts the sentence', () => {
    expect(checkText('Jeg gik på arbejde i går.')).toHaveLength(0);
  });
});

describe('at / og confusion', () => {
  it('catches "og" before an infinitive', () => {
    const r = checkText('Jeg prøver og komme til tiden.');
    expect(r).toHaveLength(1);
    expect(r[0].suggestion).toBe('prøver at komme');
  });

  it('leaves genuine coordination alone', () => {
    expect(checkText('Jeg køber mælk og brød.')).toHaveLength(0);
  });
});

describe('offsets', () => {
  it('reports ranges that actually index the original text', () => {
    const text = 'Jeg skriver, fordi jeg kan ikke komme.';
    const [c] = checkText(text);
    expect(text.slice(c.start, c.end)).toBe(c.original);
  });

  it('returns corrections sorted by position', () => {
    const text = 'I går jeg gik hjem. Jeg siger det, fordi jeg kan ikke komme.';
    const r = checkText(text);
    expect(r.length).toBeGreaterThan(1);
    for (let i = 1; i < r.length; i++) {
      expect(r[i].start).toBeGreaterThanOrEqual(r[i - 1].start);
    }
  });
});

describe('clean text', () => {
  it('flags nothing in a well-formed PD3-style paragraph', () => {
    const text = [
      'Kære kommune.',
      'Jeg har modtaget jeres brev om samtalen den 3. marts.',
      'Desværre kan jeg ikke komme den dag, fordi jeg skal på arbejde.',
      'Jeg foreslår derfor, at vi mødes den 10. marts i stedet.',
      'Med venlig hilsen',
    ].join(' ');
    expect(checkText(text)).toHaveLength(0);
  });
});

describe('closed-list spelling', () => {
  const one = (text: string) => {
    const r = checkText(text);
    expect(r).toHaveLength(1);
    expect(r[0].severity).toBe('error');
    expect(text.slice(r[0].start, r[0].end)).toBe(r[0].original);
    return r[0];
  };

  it('corrects the learner’s recurring misspellings', () => {
    expect(one('Mine kollegere er søde.').suggestion).toBe('kolleger');
    expect(one('Min arbejdeplads er stor.').suggestion).toBe('arbejdsplads');
    expect(one('På arbejdepladsen er der travlt.').suggestion).toBe('arbejdspladsen');
    expect(one('Der er mange tinger at gøre.').suggestion).toBe('ting');
    expect(one('Tak for dit svart.').suggestion).toBe('svar');
  });

  it('preserves an initial capital', () => {
    expect(one('Kollegere er vigtige.').suggestion).toBe('Kolleger');
    expect(one('Kan har du tid?').suggestion).toBe('Kan have');
  });

  it('puts the infinitive after a modal', () => {
    for (const modal of ['kan', 'skal', 'vil', 'må', 'kunne', 'skulle', 'ville']) {
      const c = one(`Jeg ${modal} har en hund.`);
      expect(c.original).toBe(`${modal} har`);
      expect(c.suggestion).toBe(`${modal} have`);
    }
  });

  it('matches whole words only', () => {
    expect(checkText('Mine kolleger og tingene er fine.')).toHaveLength(0);
    expect(checkText('Svaret kom i går. Jeg har en svartrost.')).toHaveLength(0);
    expect(checkText('Jeg kan have en hund, og han har en kat.')).toHaveLength(0);
    expect(checkText('Vi skal harmonisere planen.')).toHaveLength(0);
  });
});
