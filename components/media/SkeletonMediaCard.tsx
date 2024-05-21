import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonMediaCard() {
  return (
    <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 lg:grid-cols-4 mt-12 md:mt-12 px-[2rem]">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[200px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[200px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[200px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[200px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
    </div>
  )
}
