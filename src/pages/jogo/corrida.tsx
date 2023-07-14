/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import Head from 'next/head';
import useSound from 'use-sound';
import FireAnimation from '@/components/FireAnimation';

export default function CorridaGame() {
  const [car1] = useState('/images/corrida/car-1.svg');
  const [car2] = useState('/images/corrida/car-2.svg');
  const [raceWinner, setRaceWinner] = useState(0);

  const [explodedPosition, setExplodedPosition] = useState([0, 0]);
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

  console.log(raceWinner);

  function onFinishCountdown() {
    let [car1Time, car2Time] = getRaceTime();
    if (car1Time === car2Time) { [car1Time, car2Time] = getRaceTime(); }
    const percentExplosionChance = 25;
    const willExplode = Math.random() * 100 >= 100 - percentExplosionChance;
    const ElementCar1 = document.getElementById('car1');
    const ElementCar2 = document.getElementById('car2');
    const willWin = car1Time < car2Time ? 1 : 2;

    const animation1 = ElementCar1.animate({
      transform: ['translateX(0)', 'translateX(79vw)'],
    }, {
      duration: car1Time,
      easing: 'ease-in',
    });
    const animation2 = ElementCar2.animate({
      transform: ['translateX(0)', 'translateX(79vw)'],
    }, {
      duration: car2Time,
      easing: 'ease-in',
    });

    async function stopCar(car) {
      playFreio();
      const { left, top } = document.getElementById(`car${car}`).getBoundingClientRect();
      setExplodedPosition([
        left + 50,
        top - 200,
      ]);
      if (car === 1) {
        // await setCar1('/images/corrida/car-exp-1.svg');
        animation1.pause();
      } else {
        // await setCar2('/images/corrida/car-exp-2.svg');
        animation2.pause();
      }
    }

    animation1.onfinish = async () => {
      const bateu = (animation2.playState === 'finished' || animation2.playState === 'paused');
      if (bateu) {
        sound.fade(0.05, 0, 500); // SE O OUTRO CARRO EXPLODIR (CARRO 2)
        setRaceWinner(1);
      }

      if (((await animation1.finished).playState === 'finished' && (await animation2.finished).playState === 'finished')) {
        sound.fade(0.05, 0, 500); // SE NGM EXPLODIR
      }
    };

    animation2.onfinish = async () => {
      const bateu = (animation1.playState === 'finished' || animation1.playState === 'paused');
      if (bateu) {
        sound.fade(0.05, 0, 500); // SE O OUTRO CARRO EXPLODIR (CARRO 1)
        setRaceWinner(2);
      }

      if (((await animation1.finished).playState === 'finished' && (await animation2.finished).playState === 'finished')) {
        sound.fade(0.05, 0, 500); // SE NGM EXPLODIR
      }
    };

    playAcelerando();
    animation1.play();
    animation2.play();

    if (willExplode) {
      setTimeout(() => {
        willWin === 1 ? stopCar(1) : stopCar(2);
      }, 4000);
    }
  }

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
    setRaceWinner(0);
    countdownTimer();
    document.getElementById('car1').style.transform = 'translateX(0)';
    document.getElementById('car2').style.transform = 'translateX(0)';
    setExplodedPosition([0, 0]);
  }

  const countdownStyleByCountdown = (number) => {
    const defaultStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',

      borderRadius: 999,
      border: '5px solid #232323',

      fontSize: 159,
      fontWeight: '900',
      fontFamily: 'MADE Tommy Soft, sans-serif !important',
      color: '#FFF',
    };

    if (number === 3) {
      return ({
        ...defaultStyle,
        backgroundColor: '#FF0086',
      });
    }

    if (number === 2) {
      return ({
        ...defaultStyle,
        backgroundColor: '#FFCB00',
      });
    }

    if (number === 1) {
      return ({
        ...defaultStyle,
        backgroundColor: '#13E2BA',
      });
    }
  };

  return (
    <>
      <Head>
        <title>Mercenário</title>
      </Head>
      <div className="w-screen h-screen bg-no-repeat bg-cover bg-corrida" />
      <FireAnimation left={explodedPosition[0]} top={explodedPosition[1]} />
      <div id="car1" className="absolute flex items-end bottom-[280px] left-[90px]">
        <img src={car1} alt="" width={258} height={235} />
      </div>
      <div id="car2" className="absolute bottom-0 flex items-end bottom-[150px] left-[90px]">
        <img src={car2} alt="" width={258} height={235} />
      </div>
      {currentNumber !== 0 && (
        <div className="absolute w-[219px] h-[219px] -translate-x-1/2 rounded-full left-[50%] top-[61%]">
          <span className="letter-container" style={countdownStyleByCountdown(currentNumber)}>{currentNumber}</span>
        </div>
      )}
      <button type="button" onClick={() => onStartRace()} className="absolute right-[3.5%] top-[20.5%] w-[385px] h-[95px]" />
    </>
  );
}
