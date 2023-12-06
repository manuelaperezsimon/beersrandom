import Search from '@/components/Search/Search';
import { ToastContainer } from 'react-toastify';
import BeerCard from '../components/BeerCard/BeerCard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <ToastContainer />
      <div className="z-10 items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Beers
        </p>
      </div>
      <BeerCard />
      <Search />
    </main>
  );
}
