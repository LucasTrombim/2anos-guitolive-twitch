/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import Head from 'next/head';
import Logo from '@/components/Logo';

export default function VelhaGame() {
  const x = '/images/velha/X.svg';
  const o = '/images/velha/Bola.svg';
  const [character, currentCharacter] = useState(true);
  function setCharacter(e) {
    currentCharacter(!character);
    const current = character ? x : o;
    const img = document.createElement('img');
    img.src = current;
    img.setAttribute('style', `position:absolute;left: ${e.pageX - 70}px;top:${e.pageY - 70}px;animation: 4s linear car-animation infinite`);
    document.querySelector('.bg-velha').appendChild(img);
  }

  return (
    <>
      <Head>
        <title>Jogo da velha</title>
      </Head>
      <div className="w-screen h-screen bg-no-repeat bg-cover bg-velha" onClick={(e) => setCharacter(e)} />
    </>
  );
}
