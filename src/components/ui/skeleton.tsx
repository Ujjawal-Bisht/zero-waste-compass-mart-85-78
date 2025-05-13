
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

// New mobile-friendly skeleton components
function SkeletonCircle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Skeleton
      className={cn("rounded-full", className)}
      {...props}
    />
  )
}

function SkeletonText({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Skeleton
      className={cn("h-4 w-full", className)}
      {...props}
    />
  )
}

function SkeletonCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <Skeleton className="h-40 w-full rounded-xl" />
      <SkeletonText className="h-4 w-3/4" />
      <SkeletonText className="h-3 w-1/2" />
    </div>
  )
}

// Mobile-optimized skeleton loader
function SkeletonMobileList({
  count = 3,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { count?: number }) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <SkeletonCircle className="h-12 w-12" />
          <div className="space-y-2 flex-1">
            <SkeletonText className="h-4" />
            <SkeletonText className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export { 
  Skeleton, 
  SkeletonCircle, 
  SkeletonText, 
  SkeletonCard, 
  SkeletonMobileList 
}
