export const sample = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const range = (start, end, step = 1) => {
  let output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

const kashidableLetters = [
  'ب',
  'ت',
  'ث',
  'ج',
  'ح',
  'خ',
  'س',
  'ش',
  'ص',
  'ض',
  'ط',
  'ظ',
  'ع',
  'غ',
  'ف',
  'ق',
  'ك',
  'ل',
  'م',
  'ن',
  'ه',
  'ي',
];
export const isKashidable = str => {
  if (typeof str !== 'string') return;
  return str.split('').some(l => kashidableLetters.includes(l));
};

export const kashidify = (str, repeat = 1) => {
  const kashida = '\u0640';

  const kashidified = str.replace(
    RegExp(`[${kashidableLetters.join('')}]`, 'g'),
    `$&${kashida.repeat(repeat)}`
  );

  return kashidified;
};

export const isRtlScript = str =>
  /^[\p{Script=Arabic}\p{Script=Hebrew}\p{Script=Thaana}\p{Script=Yi}]/u.test(
    str
  );
