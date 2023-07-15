/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import Head from 'next/head';
import useSound from 'use-sound';

export default function VelhaGame() {
  const x = '/images/velha/X.svg';
  const o = '/images/velha/Bola.svg';
  const [character, currentCharacter] = useState(true);
  const [emptyGame, setEmptyGame] = useState(true);

  const [playLose, loseSound] = useSound(
    '/sounds/click-sound.mp3',
    { volume: 1 },
  );

  function setCharacter(e) {
    setEmptyGame(false);
    playLose();
    currentCharacter(!character);
    const current = character ? x : o;
    const img = document.createElement('img');
    img.src = current;
    img.setAttribute('style', `position:absolute;left: ${e.pageX - 70}px;top:${e.pageY - 70}px;z-index: 9999;animation: 4s linear car-animation infinite`);
    document.querySelector('.bg-velha').appendChild(img);
  }

  const numberAnimation = '4s linear velha-animation infinite';
  const numberClasses = 'w-full h-full items-center justify-center flex opacity-[0.3] !font-tommy font-[#232323] text-[113px] text-center';

  return (
    <>
      <Head>
        <title>Jogo da velha</title>
      </Head>
      <div className="cursor-pointer w-screen h-screen bg-no-repeat bg-cover bg-velha" onClick={(e) => setCharacter(e)} />
      <div className="cursor-pointer grid grid-cols-3 absolute right-[172px] top-[264px] items-center justify-center w-[695px] h-[581px]" onClick={(e) => setCharacter(e)}>
        <span style={{ animation: emptyGame && numberAnimation }} className={numberClasses}>
          1
        </span>
        <span style={{ animation: emptyGame && numberAnimation }} className={numberClasses}>
          2
        </span>
        <span style={{ animation: emptyGame && numberAnimation }} className={numberClasses}>
          3
        </span>
        <span style={{ animation: emptyGame && numberAnimation }} className={numberClasses}>
          4
        </span>
        <span style={{ animation: emptyGame && numberAnimation }} className={numberClasses}>
          5
        </span>
        <span style={{ animation: emptyGame && numberAnimation }} className={numberClasses}>
          6
        </span>
        <span style={{ animation: emptyGame && numberAnimation }} className={numberClasses}>
          7
        </span>
        <span style={{ animation: emptyGame && numberAnimation }} className={numberClasses}>
          8
        </span>
        <span style={{ animation: emptyGame && numberAnimation }} className={numberClasses}>
          9
        </span>
      </div>
    </>
  );
}
