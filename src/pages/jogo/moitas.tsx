import { useState } from 'react';
import Logo from '@/components/Logo';

export default function JogoMoitas() {
  const vazio = '/images/Vazia.svg';
  const ganhou = '/images/Tidinha.svg';
  const perdeu = '/images/Coco.svg';
  const [srcImage, setSrc] = useState(vazio);
  const ganhador = Math.floor(Math.random() * 12);
  async function handleClick(e, index) {
    if (index + 1 === ganhador) {
      e.target.src = ganhou;
    } else {
      e.target.src = perdeu;
    }
  }
  return (
    <>
      <Logo />
      <div className="w-screen h-screen bg-no-repeat bg-cover bg-moita">
        <div className="fixed grid grid-cols-3 mt-12 right-36 gap-x-16 gap-y-10 top-16">
          {
            Array.apply(null, { length: 12 }).map((e, index) => (
              <button key={index} className="relative moita h-[176px] flex items-end" type="button" onClick={(e) => handleClick(e, index)}>
                <span className="flex items-center justify-center moita-number">
                  <p className="text-[#522d14] text-md !font-permanentMarker">{index + 1}</p>
                </span>
                <img className="card-figure" width={160} height={130} src={srcImage} alt="" />
              </button>
            ))
          }
        </div>
      </div>
    </>
  );
}
