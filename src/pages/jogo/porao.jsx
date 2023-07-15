import { useEffect, useState } from 'react';
import Head from 'next/head';
import useSound from 'use-sound';

Array.prototype.shuffle = function () {
  const index = this.length;

  while (index) {
    const randomIndex = Math.floor(Math.random() * index--);
    [this[index], this[randomIndex]] = [this[randomIndex], this[index]];
  }

  return this;
};

export default function JogoPorao() {
  const [winnerIndex, setWinnerIndex] = useState(-1);
  const [items, setItems] = useState([]);
  const [playWin] = useSound('/sounds/palmas.mp3', { volume: 0.80 });

  async function handleClick(index, item) {
    if (item.alreadyPlayed) return;

    const clickedVideo = document.getElementById(`video-${index}`);

    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].alreadyPlayed = true;
      return newItems;
    });

    clickedVideo.addEventListener('ended', () => {
      if (index === winnerIndex) {
        playWin();
      }
    });

    clickedVideo.play();
  }

  useEffect(() => {
    const initialItems = [
      { source: '/images/porao/Agua.webm' },
      { source: '/images/porao/Aranha.webm' },
      { source: '/images/porao/Banheira.webm' },
      { source: '/images/porao/Moedas.webm' },
      { source: '/images/porao/Onibus.webm', winner: true },
      { source: '/images/porao/Pao.webm' },
      { source: '/images/porao/Parede.webm' },
      { source: '/images/porao/Racao.webm' },
      { source: '/images/porao/Vaso.webm' },
    ].shuffle();

    setWinnerIndex(initialItems.findIndex((item) => item.winner));

    setItems(initialItems);
  }, []);

  return (
    <>
      <Head>
        <title>Encontre a saida</title>
      </Head>
      <div className="w-screen h-screen bg-no-repeat bg-cover bg-porao">
        <div className="mt-[244px] right-[113px] absolute">
          <div className="grid grid-cols-3 gap-x-[57px] gap-y-[32px]">
            {items.map((item, index) => (
              <button
                key={index}
                className="relative moita flex items-end"
                type="button"
                onClick={() => handleClick(index, item)}
              >
                <div className="pointer-events-none !top-[17px] !left-[52%] moita-number">
                  <span className="rounded-full bg-[#7636FF] w-[52px] h-[52px] flex items-center justify-center border-[6px] border-solid border-[#232323]">
                    <p className="text-white text-[31px] !font-tommy font-bold">{index + 1}</p>
                  </span>
                </div>
                <video id={`video-${index}`} controls={false} width={230} height={210} src={item.source} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
