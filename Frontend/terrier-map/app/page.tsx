import Image from "next/image";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen">
      <main className=" mt-[30px]">
      <Image
      src="/Logo.png"
      width={70}
      height={70}
      alt="TerrierMap logo of a Boston Terrier dog in front of a topographical map of Boston."
      className="ml-auto mr-auto"
    />
        <h1 className="font-['Caprasimo'] text-center text-[40px] lg:text-[60px] ml-auto mr-auto">TerrierMap</h1>
        
      <div className="w-[90vw] lg:w-[50vw] h-[600px] lg:h-[75vh] block ml-auto mr-auto rounded-[10px] overflow-hidden">

      <Map />
      </div>


      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

        <h3 className="font-['Barlow']">By: Ryan Christopher, Jasmine Hughes, Siddhraj Parmar, and Misael Gared.</h3>

      </footer>
    </div>
  );
}
