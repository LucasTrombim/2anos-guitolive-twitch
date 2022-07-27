/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import Logo from '@/components/Logo';

export default function VelhaGame() {
  const x = '/images/X.svg';
  const o = '/images/Bola.svg';
  const [character, currentCharacter] = useState(true);
  function setCharacter(e) {
    currentCharacter(!character);
    const current = character ? x : o;
    const img = document.createElement('img');
    img.src = current;
    img.setAttribute('style', `position:absolute;left: ${e.pageX - 30}px;top:${e.pageY - 30}px`);
    document.querySelector('.bg-velha').appendChild(img);
  }
  return (
    <>
      <Logo />
      <div className="w-screen h-screen bg-no-repeat bg-cover bg-velha" onClick={(e) => setCharacter(e)} />
    </>
  );
}
