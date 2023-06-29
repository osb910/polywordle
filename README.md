# PolyWordle

A bilingual customizable clone of the popular online word game, Wordle.
Built with React 18, TypeScript, styled-components, and Vite.

![Demo showing the finished Wordle clone](docs/wordle-demo-en-6-att.gif)

In Wordle, users have 6 attempts to guess a 5-letter word. You're helped along the way by ruling out letters that aren't in the word, and being told whether the correct letters are in the correct location or not.

### [Play Here](https://polywordle.vercel.app/)

## Features

- You can type with a text input or a visual keyboard
- The UI is translated to Arabic, and the game is localized as well. You can play in either language
- When changing languages, the game will restart with a different localized wordlist

![Demo showing the localized Arabic Wordle](docs/wordle-demo-ar-6-att.gif)

- You can change the number of attempts to tweak the difficulty
- You can change the number of letters in the word which will change the wordlist

![Demo showing a game with 7 attempts and 6 letters](docs/wordle-demo-en-7-att-6-letters.gif)

- You can reset the game at any time

![Demo showing the reset functionality](docs/wordle-demo-en-reset.gif)

- A help modal is available to explain the rules of the game

![Demo showing the help modal](docs/wordle-demo-en-help.gif)

- Smooth transitions and animations on every action
- Mobile-friendly
- Sound effects for different actions which can be muted

Happy Wordling!
