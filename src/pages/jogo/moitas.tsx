import Logo from '@/components/Logo';

export default function JogoMoitas() {
  return (
    <>
      <Logo />
      <div className="bg-moita w-screen h-screen bg-cover bg-no-repeat">
        <div className="absolute right-32 top-32 grid grid-cols-3 gap-8 mt-12">
          <div>
            <img src="/images/Tidinha.svg" alt="" />
            <img src="/images/Vazia.svg" alt="" />
            <img src="/images/Coco.svg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
