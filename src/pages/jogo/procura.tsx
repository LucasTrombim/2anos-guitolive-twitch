import { useEffect, useState } from 'react';
import Head from 'next/head';
import useSound from 'use-sound';

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

  console.log(winnerIndex);

  const [playTambor, tamborSound] = useSound(
    '/sounds/tambores.mp3',
    { volume: 0.10 },
  );

  const [playLose, loseSound] = useSound(
    '/sounds/poop.mp3',
    { volume: 1 },
  );

  const [playWin, winSound] = useSound(
    '/sounds/palmas.mp3',
    { volume: 0.40 },
  );

  const [playLatido, latidoSound] = useSound(
    '/sounds/latido.mp3',
    { volume: 0.2 },
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
      playLatido();
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

  return (
    <>
      <Head>
        <title>Encontre a Tidinha</title>
      </Head>
      <div className="w-screen h-screen bg-no-repeat bg-cover bg-moita">
        <div className="mt-[244px] right-[113px] absolute">
          <div className={`grid grid-cols-3 gap-x-[57px] gap-y-[32px] ${winnerModal && 'pointer-events-none'}`}>
            {items.map((item, index) => (
              <button key={index} className={`relative moita ${item.source === vazio ? 'moita-animation' : ''} flex items-end`} type="button" onClick={(e) => handleClick(e, index)}>
                <span className="pointer-events-none flex items-center justify-center moita-number">
                  {item.source === vazio && <p className="text-white text-[50px] !font-tommy font-bold">{index + 1}</p>}
                </span>
                <div className={`flex items-center justify-center absolute
                ${item.source === perdeu
                  ? 'top-[7.5rem] left-[2.75rem]'
                  : 'top-[2.7rem] left-[2rem]'}
              `}
                >
                  {item.source !== vazio && <img className="moita-animation" src={item.source} alt="" />}
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
