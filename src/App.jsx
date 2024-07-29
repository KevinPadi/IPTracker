import './index.css'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Skeleton } from "@/components/ui/skeleton"
import { IconGitFork, IconDeviceDesktopPin, IconMapPin, IconClockHour2, IconWorld, IconZoom, IconMailbox, IconTrash, IconCopy } from '@tabler/icons-react'
import LeafletMap from './components/LeafletMap'
import { useContext, useEffect } from 'react'
import DataContext from './context/DataContext'
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from './components/ui/toaster'
import { ScrollArea } from './components/ui/scroll-area'

function App() {
  const { data, history, loading, error, query, setQuery, fetchData, setHistory }= useContext(DataContext)
  const { toast } = useToast()
  
  const showToast = () => {
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.label,
    })
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: `Copied to clipboard: ${text}`,
      })
    }).catch((err) => {
      toast({
        title: `Failded to copy: ${err}`,
      })
    })
  }

  const deleteHistoryItem = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index)
    setHistory(updatedHistory)
    localStorage.setItem('ipHistory', JSON.stringify(updatedHistory))
    toast({
      title: "Element deleted",
    })
  }

  useEffect(() => {
    if(error.state === true) {
      showToast()
    }
  }, [error])

  return (
    <div className='w-screen h-screen lg:flex bg-black'>
      <section className='lg:flex flex-col gap-10 h-screen w-1/3 p-8 hidden'>
        <div className='w-full mx-auto flex gap-3 items-center'>
          <Input value={query} onChange={(e) => setQuery(e.target.value)} className='bg-black' placeholder='enter an ip address..' />
          <Button type='button' onClick={fetchData} className='h-full flex items-center gap-1 border bg-white text-black hover:bg-black hover:text-white hover:border-white transition-all active:scale-95'><IconZoom/>Search</Button>
        </div>
        <Card className="w-full p-6 grid gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-neutral-300">Network Info</h3> <IconGitFork stroke='1.5'/>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconDeviceDesktopPin stroke='1.5'/><span className="text-sm font-medium">IP Address</span> 
              </div>
              <span className="text-sm font-medium text-neutral-300">
                {
                  loading 
                  ? <Skeleton className="h-5 w-32" />
                  : data?.ip || 'N/A' 
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconMapPin stroke='1.5' /><span className="text-sm font-medium">Location</span> 
              </div>
              <span className="text-sm font-medium text-neutral-300">
                {
                  loading 
                  ? <Skeleton className="h-5 w-28" />
                  : `${data.location?.city || 'N/A'}, ${data.location?.country || 'N/A'}`
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconClockHour2 stroke='1.5'/><span className="text-sm font-medium">Timezone</span>
              </div>
              <span className="text-sm font-medium text-neutral-300">
                {
                  loading 
                  ? <Skeleton className="h-5 w-16" />
                  : data.location?.timezone || 'N/A'
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconMailbox stroke='1.5'/><span className="text-sm font-medium">Postal Code</span>
              </div>
              <span className="text-sm font-medium text-neutral-300">
                {
                  loading 
                  ? <Skeleton className="h-5 w-24" />
                  : data.location?.postalCode || 'N/A'
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconWorld stroke='1.5'/><span className="text-sm font-medium">ISP</span>
              </div>
              <span className="text-sm font-medium text-neutral-300">
                {
                  loading 
                  ? <Skeleton className="h-5 w-12" />
                  : data?.isp || 'N/A'
                }
              </span>
            </div>
          </div>
        </Card>
        <ScrollArea className='w-full h-full'>
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
      </section>
      <div className='relative flex justify-center bg-red-400 p-3'>
      <Card className="w-full h-auto p-3 grid gap-6 absolute m-3 z-20 top-0 right-auto left-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-neutral-300">Network Info</h3> <IconGitFork stroke='1.5'/>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconDeviceDesktopPin stroke='1.5'/><span className="text-sm font-medium">IP Address</span> 
              </div>
              <span className="text-sm font-medium text-neutral-300">
                {
                  loading 
                  ? <Skeleton className="h-5 w-32" />
                  : data?.ip || 'N/A' 
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconMapPin stroke='1.5' /><span className="text-sm font-medium">Location</span> 
              </div>
              <span className="text-sm font-medium text-neutral-300">
                {
                  loading 
                  ? <Skeleton className="h-5 w-28" />
                  : `${data.location?.city || 'N/A'}, ${data.location?.country || 'N/A'}`
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconClockHour2 stroke='1.5'/><span className="text-sm font-medium">Timezone</span>
              </div>
              <span className="text-sm font-medium text-neutral-300">
                {
                  loading 
                  ? <Skeleton className="h-5 w-16" />
                  : data.location?.timezone || 'N/A'
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconMailbox stroke='1.5'/><span className="text-sm font-medium">Postal Code</span>
              </div>
              <span className="text-sm font-medium text-neutral-300">
                {
                  loading 
                  ? <Skeleton className="h-5 w-24" />
                  : data.location?.postalCode || 'N/A'
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconWorld stroke='1.5'/><span className="text-sm font-medium">ISP</span>
              </div>
              <span className="text-sm font-medium text-neutral-300">
                {
                  loading 
                  ? <Skeleton className="h-5 w-12" />
                  : data?.isp || 'N/A'
                }
              </span>
            </div>
          </div>
        </Card>
      </div>
      <LeafletMap />
      <Toaster />
    </div>
  )
}

export default App
