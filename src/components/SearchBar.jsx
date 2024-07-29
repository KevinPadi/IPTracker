import { useContext } from 'react';
import DataContext from '@/context/DataContext';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { IconZoom, IconCopy, IconTrash, IconHistory } from '@tabler/icons-react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader } from './ui/drawer';
import { ScrollArea } from './ui/scroll-area';

const SearchBar = () => {
  const { query, history, setQuery, fetchData, copyToClipboard, deleteHistoryItem } = useContext(DataContext)
  


  return (
    <div className='w-full relative z-20 flex gap-3 items-center'>
      <Input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        className='bg-black' 
        placeholder='enter an ip address..' 
      />
      <Button 
        type='button' 
        onClick={fetchData} 
        className='h-full flex items-center gap-1 border bg-white text-black transition-all active:scale-95 hover:bg-white'
      >
        <IconZoom />
      </Button>
      <Drawer>
            <DrawerTrigger asChild>
              <Button type='button' className='h-full inline-block md:hidden items-center gap-1 bg-black border border-white text-white transition-all active:scale-95'><IconHistory/></Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <ScrollArea className='w-full h-60'>
                  <ul className='w-full flex flex-col gap-4'>
                    {
                      history?.map((item, index) => (
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
                      ))
                    }
                  </ul>
                </ScrollArea>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
    </div>
  );
}

export default SearchBar;
