import Link from 'next/link';

export default function PageHome() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <p className="text-center text-2xl text-dark mb-20 font-bold">Escolha o jogo</p>
      <div className="flex flex-col gap-y-4">
        <Link href="/jogo/velha">
          <button type="button" className="p-4 bg-secondary text-white text-sm rounded-lg">Jogo da velha</button>
        </Link>
        <Link href="/jogo/procura">
          <button type="button" className="p-4 bg-secondary text-white text-sm rounded-lg">Jogo das moitas</button>
        </Link>
        <Link href="/jogo/corrida">
          <button type="button" className="p-4 bg-secondary text-white text-sm rounded-lg">Jogo da corrida</button>
        </Link>
        <Link href="/jogo/termo">
          <button type="button" className="p-4 bg-secondary text-white text-sm rounded-lg">Jogo do termo</button>
        </Link>
      </div>
    </div>
  );
}
