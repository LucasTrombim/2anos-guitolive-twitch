import { useEffect, useState } from 'react';
import Head from 'next/head';
import useSound from 'use-sound';
import Logo from '@/components/Logo';

function updateAnimation(e, index) {
  e.target.classList.toggle('card-figure');
}

export default function JogoMoitas() {
  const vazio = '/images/procura/inicial.svg';
  const ganhou = '/images/procura/certo.svg';
  const perdeu = '/images/procura/errado.svg';
  const [winnerIndex, setWinnerIndex] = useState(-1);
  const [winnerModal, setWinnerModal] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [items, setItems] = useState([]);

  const [playTambor, tamborSound] = useSound(
    '/sounds/tambores.mp3',
    { volume: 0.10 },
  );

  const [playLose, loseSound] = useSound(
    '/sounds/poop.mp3',
    { volume: 0.50 },
  );

  const [playWin, winSound] = useSound(
    '/sounds/palmas.mp3',
    { volume: 0.80 },
  );

  async function handleClick(e, index) {
    updateAnimation(e, index);

    tamborSound.stop();
    playTambor();
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setCurrentPlayer(currentPlayer % 2 === 0 ? 1 : 2);
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = {
        ...newItems[index],
        source: newItems[index].index === winnerIndex ? ganhou : perdeu,
      };
      return newItems;
    });

    updateAnimation(e, index);

    playLose();

    if (index === winnerIndex) {
      loseSound.stop();
      playWin();
      await new Promise((resolve) => setTimeout(resolve, 400));
      setWinnerModal(true);
    }
  }

  useEffect(() => {
    const ganhador = Math.floor(Math.random() * 9);
    setWinnerIndex(ganhador);

    const item = {
      source: vazio,
    };

    const initialItems = Array.apply(null, { length: 9 }).map((e, index) => ({
      ...item,
      index,
    }));

    setItems(initialItems);
  }, []);

  async function resetGame() {
    window.location.reload();
  }

  return (
    <>
      <Head>
        <title>Encontre a Tidinha</title>
      </Head>
      <div className="w-screen h-screen bg-no-repeat bg-cover bg-moita">
        <div className="mt-[244px] right-[113px] absolute">
          {/* {winnerModal && ( */}
          {/*  <div className="bg-black/80 right-[-48px] -top-[72px] !w-[906px] !h-[777px] rounded-b-[31px] absolute z-50 absolute w-full h-full"> */}
          {/*    <div className="flex items-center justify-center flex-col w-full h-full"> */}
          {/*      <p className="text-white font-bold text-2xl leading-relaxed"> */}
          {/*        {`Parabens Jogador ${currentPlayer}`} */}
          {/*      </p> */}
          {/*      <p className="text-white font-bold text-xl leading-relaxed">Voce ganhou</p> */}

          {/*      <button className="mt-4 text-white rounded-md font-bold text-3xl bg-green-800 px-8 z-[10000] leading-relaxed" onClick={resetGame}>Recomeçar</button> */}
          {/*    </div> */}
          {/*  </div> */}
          {/* )} */}
          <div className={`grid grid-cols-3 gap-x-[57px] gap-y-[32px] ${winnerModal && 'pointer-events-none'}`}>
            {items.map((item, index) => (
              <button key={index} className="relative moita flex items-end" type="button" onClick={(e) => handleClick(e, index)}>
                <span className="flex items-center justify-center moita-number">
                  {item.source === vazio && <p className="text-white text-[50px] font-bold">{index + 1}</p>}
                </span>
                <div className={`flex items-center justify-center absolute
                ${item.source === perdeu
                  ? 'top-[7.5rem] left-[2.75rem]'
                  : 'top-[2.7rem] left-[2rem]'}
              `}
                >
                  {item.source !== vazio && <img className="" src={item.source} alt="" />}
                </div>
                <img className="" width={230} height={210} src={vazio} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
