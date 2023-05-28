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

export const isRtlScript = str =>
  /^[\p{Script=Arabic}\p{Script=Hebrew}\p{Script=Thaana}\p{Script=Yi}]/u.test(
    str
  );
