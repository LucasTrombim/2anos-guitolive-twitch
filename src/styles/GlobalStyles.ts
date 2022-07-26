import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
/*  CSS RESET */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  scroll-behavior: smooth;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
/*  CSS RESET */

* {
  margin: 0;
  padding: 0;
}

body {
  width: 100%;
  -webkit-font-smoothing: antialiased !important;
}

*,
body,
input,
button,
textarea,
select {
  font-family: 'Open Sans', sans-serif !important;
}

a {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

h1 {
  font-size: 65px;
  line-height: 70px;
}

h2 {
  font-size: 42px;
  line-height: 60px;
}

h3 {
  font-size: 20px;
  line-height: 24px;
}

h4 {
  font-size: 17px;
  line-height: 24px;
}

h5 {
  font-size: 15px;
  line-height: 24px;
}

p {
  font-size: 13px;
  line-height: 24px;
}

button {
  font-size: 14px;
  line-height: 24px;
}

strong {
}

[disabled] {
  pointer-events: none;
}

@keyframes spinner-two-alt {
  0% {transform: rotate(0deg)}
  to {transform: rotate(359deg)}
}
.gg-spinner-two-alt,.gg-spinner-two-alt::before {
  box-sizing: border-box;
  display: block;
  width: 20px;
  height: 20px
}
.gg-spinner-two-alt {
  transform: scale(var(--ggs,1));
  position: relative
}
.gg-spinner-two-alt::before {
  content: "";
  position: absolute;
  border-radius: 100px;
  animation: spinner-two-alt 1.2s cubic-bezier(.6,0,.4,1) infinite;
  border: 3px solid transparent;
  border-bottom-color: currentColor;
  border-top-color: currentColor
}

.gg-spinner {
  transform: scale(var(--ggs,1))
}
.gg-spinner,
.gg-spinner::after,
.gg-spinner::before {
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 20px;
  height: 20px
}
.gg-spinner::after,
.gg-spinner::before {
  content: "";
  position: absolute;
  border-radius: 100px
}
.gg-spinner::before {
  animation: spinner 1s
  cubic-bezier(.6,0,.4,1) infinite;
  border: 3px solid transparent;
}
.gg-spinner::after {
  border: 3px solid;
  opacity: .2
}
@keyframes spinner {
  0% { transform: rotate(0deg) }
  to { transform: rotate(359deg) }
}
/*  */
`;

const customMediaQuery = (maxWidth: number) =>
`@media (max-width: ${maxWidth}px)`;

const customHeightMediaQuery = (minHeight: number) =>
`@media (height: ${minHeight}px)`;

export const media = {
  bigDesktop: customMediaQuery(2560),
  desktop: customMediaQuery(1920),
  smallDesktop: customMediaQuery(1600),
  notebook: customMediaQuery(1440),
  smallNotebook: customMediaQuery(1366),
  tablet: customMediaQuery(1024),
  smallTablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
  iPhoneX: customHeightMediaQuery(812),
  smallMobile: customMediaQuery(375),
  miniMobile: customMediaQuery(320),
};

export const scale = {
  125: '@media (min-resolution: 120dpi)',
  150: '@media (min-resolution: 144dpi)',
};
