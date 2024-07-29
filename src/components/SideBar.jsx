import { useContext } from 'react';
import DataContext from '@/context/DataContext';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { IconTrash, IconCopy } from '@tabler/icons-react'
import SearchBar from './SearchBar';
import CardInfo from './CardInfo';

const Sidebar = () => {
  const { history, copyToClipboard, deleteHistoryItem } = useContext(DataContext);

  return (
    <section className='md:flex flex-col gap-10 h-screen lg:w-96 xl:w-1/3 p-8 hidden'>
      <SearchBar />
      <CardInfo />
      <ScrollArea className='w-full h-full'>
        <ul className='w-full flex flex-col gap-4'>
          {history?.map((item, index) => (
            <li className='flex justify-between items-center text-neutral-400 bg-neutral-950 p-3 text-lg rounded-md' key={index}>
              {item}
              <div>
                <Button type='button' onClick={() => copyToClipboard(item)} size='sm' className='bg-transparent text-neutral-400'>
                  <IconCopy />
                </Button>
                <Button type='button' onClick={() => deleteHistoryItem(index)} size='sm' className='bg-transparent text-neutral-400 hover:text-red-400'>
                  <IconTrash />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </section>
  );
};

export default Sidebar;
