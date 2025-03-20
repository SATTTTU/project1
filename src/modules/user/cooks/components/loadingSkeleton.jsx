
import { Header } from "./header";


export const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    </div>
  )
}