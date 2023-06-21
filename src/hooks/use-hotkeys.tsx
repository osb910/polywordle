import {useEffect, useMemo, MutableRefObject} from 'react';

export type HotKey = {
  hotKey: string;
  run: Function;
  universal?: boolean;
};

const useHotKeys = (
  keyMap: HotKey[],
  ref?: MutableRefObject<HTMLElement>
): string[] => {
  const element = (ref?.current as HTMLElement) ?? window;
  let keyActions: any;

  const hotKeyRegex = useMemo(
    (): RegExp =>
      /((?:(?:[<>]|Left|Right)?(?:\B[!^+#]|(?:Alt|C(?:on)?tro?l|Shift|Win)[\s+]?))*)[\s+]?(.+)/i,
    []
  );
  const leftKeyRegex = useMemo(
    (): RegExp => /(<|Left)([!^+#]|Alt|C(?:on)?tro?l|Shift|Win)\+?/i,
    []
  );
  const rightKeyRegex = useMemo(
    (): RegExp => /(>|Right)([!^+#]|Alt|C(?:on)?tro?l|Shift|Win)\+?/i,
    []
  );
  const altRegex = useMemo((): RegExp => /(\B!|Alt)\+?(?!Left|Right)/i, []);
  const ctrlRegex = useMemo(
    (): RegExp => /(\B\^|C(?:on)?tro?l)\+?(?!Left|Right)/i,
    []
  );
  const shiftRegex = useMemo(
    (): RegExp => /(\B\+|Shift)\+?(?!Left|Right)/i,
    []
  );
  const metaRegex = useMemo((): RegExp => /(\B#|Win)\+?(?!Left|Right)/i, []);

  useEffect(() => {
    keyActions = keyMap.map(({hotKey, run, universal}) => {
      let [char, ...mods]: any = hotKey
        .replace(hotKeyRegex, (_, mods, char) => {
          mods = mods
            .replace(leftKeyRegex, '$2Left ')
            .replace(rightKeyRegex, '$2Right ')
            .replace(altRegex, 'Alt ')
            .replace(ctrlRegex, 'Control ')
            .replace(shiftRegex, 'Shift ')
            .replace(metaRegex, 'Meta ');
          char = universal && char.length === 1 ? char.toUpperCase() : char;
          char =
            universal && char.length === 1
              ? char.replace(/[a-z]/i, 'Key$&')
              : char;
          return `${mods}${char}`;
        })
        .split(/\s+/)
        .reverse();
      mods = mods.map((mod: string) => {
        const [, modKey, dir] = mod.split(
          /(Alt|Control|Shift|Meta)(Left|Right)?/i
        );
        return {modKey, dir};
      });
      return {char, mods, run, universal};
    });
    const handleKeyDown = (evt: KeyboardEvent) => {
      evt.stopPropagation();
      const {key, code} = evt;
      for (let {char, mods, run, universal} of keyActions) {
        const isHotKey = universal ? char === code : char === key;
        if (
          isHotKey &&
          mods.every(({modKey}: {modKey: string}) =>
            evt.getModifierState(modKey)
          )
        ) {
          run();
          break;
        }
      }
    };

    element.addEventListener(
      'keydown',
      handleKeyDown as unknown as (evt: Event) => void
    );
    return () =>
      element.removeEventListener(
        'keydown',
        handleKeyDown as unknown as (evt: Event) => void
      );
  }, [
    element,
    keyMap,
    hotKeyRegex,
    leftKeyRegex,
    rightKeyRegex,
    altRegex,
    ctrlRegex,
    shiftRegex,
    metaRegex,
  ]);

  if (!keyActions) return [''];

  return keyActions.map(({char, mods}: {char: string; mods: any[]}) => {
    const modKeys = mods.map(({modKey, dir}) =>
      dir ? `${modKey}${dir}` : modKey
    );
    return `${modKeys.join('+')}+${char}`;
  });
};

export default useHotKeys;
