import { IconGitFork, IconDeviceDesktopPin, IconMapPin, IconClockHour2, IconMailbox, IconWorld } from "@tabler/icons-react"
import { Card } from "./ui/card"
import { Skeleton } from "./ui/skeleton"
import { useContext } from "react"
import DataContext from "@/context/DataContext"

const CardInfo = () => {
  const { data, loading } = useContext(DataContext)
  return (
    <Card className="w-full h-fit md:h-auto p-4 md:p-6 grid gap-2 md:gap-6 relative z-20 top-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-neutral-300">Network Info</h3> <IconGitFork stroke='1.5' className='size-5' />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconDeviceDesktopPin stroke='1.5' className='size-5' /><span className="text-xs font-sm">IP Address</span> 
              </div>
              <span className="text-xs font-sm text-neutral-300">
                {
                  loading 
                  ? <Skeleton className="h-5 w-32" />
                  : data?.ip || 'N/A' 
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconMapPin stroke='1.5' className='size-5'  /><span className="text-xs font-sm">Location</span> 
              </div>
              <span className="text-xs font-sm text-neutral-300">
                {
                  loading 
                  ? <Skeleton className="h-5 w-28" />
                  : `${data.location?.city || 'N/A'}, ${data.location?.country || 'N/A'}`
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconClockHour2 stroke='1.5' className='size-5' /><span className="text-xs font-sm">Timezone</span>
              </div>
              <span className="text-xs font-sm text-neutral-300">
                {
                  loading 
                  ? <Skeleton className="h-5 w-16" />
                  : data.location?.timezone || 'N/A'
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconMailbox stroke='1.5' className='size-5' /><span className="text-xs font-sm">Postal Code</span>
              </div>
              <span className="text-xs font-sm text-neutral-300">
                {
                  loading 
                  ? <Skeleton className="h-5 w-24" />
                  : data.location?.postalCode || 'N/A'
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconWorld stroke='1.5' className='size-5' /><span className="text-xs font-sm">ISP</span>
              </div>
              <span className="text-xs font-sm text-neutral-300">
                {
                  loading 
                  ? <Skeleton className="h-5 w-12" />
                  : data?.isp || 'N/A'
                }
              </span>
            </div>
          </div>
        </Card>
  )
}

export default CardInfo