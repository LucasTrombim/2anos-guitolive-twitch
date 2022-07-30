/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import Head from 'next/head';
import useSound from 'use-sound';
import Logo from '@/components/Logo';

export default function CorridaGame() {
  const [car1, setCar1] = useState('/images/Carro Rosa.svg');
  const [car2, setCar2] = useState('/images/Carro Roxo.svg');
  const [carW1, setCarW1] = useState(180);
  const [carH1, setCarH1] = useState(190);
  const [carH2, setCarH2] = useState(190);
  const [carW2, setCarW2] = useState(190);
  const [currentNumber, setCurrentNumber] = useState(0);
  let count = 4;

  const [playContagem] = useSound(
    '/sounds/CONTAGEM.mp3',
    { volume: 0.10 },
  );

  const [playAcelerando, { sound }] = useSound(
    '/sounds/ACELERANDO.mp3',
    { volume: 0.10 },
  );

  const [playFreio] = useSound(
    '/sounds/FREIO.mp3',
    { volume: 0.10 },
  );

  function getRaceTime() {
    const car1Time = (Math.floor(Math.random() * 5) + 5) * 1000;
    const car2Time = (Math.floor(Math.random() * 5) + 5) * 1000;

    return [car1Time, car2Time];
  }

  function onFinishCountdown() {
    let [car1Time, car2Time] = getRaceTime();
    if (car1Time === car2Time) {
      [car1Time, car2Time] = getRaceTime();
    }
    const ElementCar1 = document.getElementById('car1');
    const ElementCar2 = document.getElementById('car2');
    playAcelerando();
    const animation1 = ElementCar1.animate({
      transform: ['translateX(0)', 'translateX(100vw)'],
    }, {
      duration: car1Time,
      easing: 'ease-in',
    });

    const animation2 = ElementCar2.animate({
      transform: ['translateX(0)', 'translateX(100vw)'],
    }, {
      duration: car2Time,
      easing: 'ease-in',
    });

    animation1.onfinish = async () => {
      const bateu = (animation2.playState === 'finished' || animation2.playState === 'paused');
      if (bateu) {
        sound.fade(0.05, 0, 500); // SE 1 CARRO EXPLODIR
      }
      if (((await animation1.finished).playState === 'finished' && (await animation2.finished).playState === 'finished')) {
        sound.fade(0.05, 0, 500); // SE OS 2 CARROS CORREM SEM EXPLODIR
      }
    };

    animation2.onfinish = async () => {
      const bateu = (animation1.playState === 'finished' || animation1.playState === 'paused');
      if (bateu) {
        sound.fade(0.05, 0, 500); // SE 1 CARRO EXPLODIR
      }
      if (((await animation1.finished).playState === 'finished' && (await animation2.finished).playState === 'finished')) {
        sound.fade(0.05, 0, 500); // SE OS 2 CARROS CORREM SEM EXPLODIR
      }
    };

    animation1.play();
    animation2.play();

    async function stopCar(car) {
      playFreio();
      if (car === 1) {
        await setCar1('/images/Carro Quebrado.svg');
        animation1.pause();
      } else {
        await setCar2('/images/Carro Quebrado Roxo.svg');
        animation2.pause();
      }
    }
    const percentExplosionChance = 25;
    if (Math.random() * 100 >= 100 - percentExplosionChance) {
      const carroGanhador = car1Time < car2Time ? 1 : 2;
      setTimeout(() => {
        carroGanhador === 1 ? stopCar(1) : stopCar(2);
      }, 4000);
    }
  }
  const numberImages = ['/images/numero-1.svg', '/images/numero-2.svg', '/images/numero-3.svg'];

  function changeNumberCountdown(activeCounter) {
    switch (activeCounter) {
      case 3:
        playContagem();
        setCurrentNumber(3);
        break;
      case 2:
        setCurrentNumber(2);
        break;
      case 1:
        setCurrentNumber(1);
        break;
      default:
        setCurrentNumber(0);
        break;
    }
  }

  async function countdownTimer() {
    if (count > 0) {
      count--;
      changeNumberCountdown(count);
      setTimeout(countdownTimer, 1000);
    } else {
      onFinishCountdown();
    }
  }

  function onStartRace() {
    countdownTimer();
  }

  return (
    <>
      <Head>
        <title>Mercenário</title>
      </Head>
      <Logo />
      <div className="w-screen h-screen bg-no-repeat bg-cover bg-corrida" />
      <div id="car1" className="absolute flex items-end bottom-40 left-10">
        <img src={car1} alt="" width={258} height={235} />
      </div>
      <div id="car2" className="absolute bottom-0 flex items-end left-10">
        <img src={car2} alt="" width={258} height={235} />
      </div>
      {currentNumber !== 0 && (
        <div className="absolute flex items-center justify-center w-40 h-40 p-5 text-lg text-white -translate-x-1/2 rounded-full bg-black/50 left-[20%] top-[36%]">
          <img src={numberImages[currentNumber - 1]} alt="" width={currentNumber === 1 ? 30 : 50} height={30} />
        </div>
      )}
      <button type="button" onClick={() => onStartRace()} className="left-[3%] top-[40%] !font-short absolute text-lg text-white uppercase p-5 bg-[#2AACF5] hover:bg-white hover:text-[#2AACF5] transition duration-300 rounded-full">Iniciar</button>
    </>
  );
}
