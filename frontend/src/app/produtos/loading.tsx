export default function ProductsLoading() {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="container py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-10 bg-neutral-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-6 bg-neutral-200 rounded w-64 animate-pulse"></div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Skeleton */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6">
              <div className="h-6 bg-neutral-200 rounded w-32 mb-4 animate-pulse"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-5 bg-neutral-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid Skeleton */}
          <div className="flex-1">
            <div className="bg-white rounded-lg p-4 mb-6">
              <div className="h-10 bg-neutral-200 rounded w-full animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4">
                  <div className="aspect-square bg-neutral-200 rounded-lg mb-4 animate-pulse"></div>
                  <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-neutral-200 rounded w-1/2 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
