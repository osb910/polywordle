/**
 * Curated from:
 * Andy Bell's Modern CSS Reset: https://andy-bell.co.uk/a-modern-css-reset/
 * and Eric Meyer's CSS Reset: https://meyerweb.com/eric/tools/css/reset/
 */

import {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`

  /*
    Use a more-intuitive box-sizing model.
  */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /*
      Remove default margin
    */
  * {
    margin: 0;
  }

  /* Set core body defaults */
  body {
    max-inline-size: 100vw;
    min-block-size: 100vh;
    overflow-x: hidden;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
    background-color: hsl(0deg 0% 95%);
    -webkit-font-smoothing: antialiased;
  }

  /* Set core root defaults */
  html:focus-within {
    scroll-behavior: smooth;
  }

  /*
      Improve media defaults
    */
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-inline-size: 100%;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /*
      Avoid text overflows
    */
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  /*
      Create a root stacking context
    */
  #root,
  #__next {
    isolation: isolate;
  }

  .rtl {
    direction: rtl;
    font-family: 'Lotus';
  }

  .ltr {
    direction: ltr;
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

`;

export default GlobalStyles;
