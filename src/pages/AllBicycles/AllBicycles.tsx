import FilterSidebar from '@/components/FilterSidebar/FilterSidebar';
import SearchBar from '@/components/SearchBar/SearchBar';

import { useAppSelector } from '@/redux/hook';
import { Bicycle } from '@/types';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import LoadingSkeleton from './LoadingSkeleton';
import BicyclePageError from './BicyclePageError';
import { useGetAllBicycleQuery } from '@/redux/api/productApi';
import BicycleCard from '@/components/BicycleCard/BicycleCard';

export default function AllBicycles() {
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 10;

  // searchTerm and filter
  const { search, filters } = useAppSelector((state) => state.bicycles);

  const queryParams = {
    searchTerm: search,
    brand: filters.brand,
    category: filters.category,
    model: filters.model,
    minPrice: filters.price[0],
    maxPrice: filters.price[1],
    inStock: filters.availability === 'all' ? undefined : filters.availability,
    sortBy: filters.sortBy || undefined,
    sortOrder: filters.sortOrder || undefined,
    page,
    limit,
  };

  const { data: bicycles = [], isLoading, error } = useGetAllBicycleQuery(queryParams);

  if (isLoading) return <LoadingSkeleton />;

  if (error || !bicycles?.data?.data) {
    const safeError = error instanceof Error ? error : new Error('Unknown error');
    return <BicyclePageError error={safeError} reset={() => {}} />;
  }

  const activeFiltersCount = [
    !!filters.brand,
    !!filters.category,
    !!filters.model,
    filters.availability !== 'all',
    filters.price[0] > 0 || filters.price[1] < 10000,
  ].filter(Boolean).length;

  // console.log("data",bicycles?.data?.data, "meta",bicycles?.data?.meta);

  const totalPages = Math.ceil(bicycles?.data?.meta?.total / limit);
  // console.log("totalProducts",);
  const totalProducts = bicycles?.data?.meta?.total;

  return (
    <div className="container mx-auto p-4">
      {/* mbl Drawer - < sm only */}
      <div className="mb-4 flex md:hidden">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full">
              <Menu className="mr-2 h-4 w-4" />
              Filters & Search {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filters & Search</DrawerTitle>
              <DrawerDescription>Find the perfect bicycle for your needs</DrawerDescription>
            </DrawerHeader>
            <div className="max-h-[60vh] overflow-y-auto px-4 pb-4">
              <SearchBar />
              <FilterSidebar />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        {/*  md => */}
        <div className="hidden md:block md:w-1/4 lg:w-1/5">
          <SearchBar />
          <FilterSidebar />
        </div>

        {/* main content */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          {totalProducts && (
            <div>
              <p>Bicycles: {totalProducts}</p>
            </div>
          )}
          {/* Filter status summary */}
          {activeFiltersCount > 0 && (
            <div className="mb-2 rounded bg-gray-100 p-2 text-sm">
              <p>{bicycles?.data?.meta?.total} results found with current filters</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {bicycles?.data?.data?.length > 0 ? (
              bicycles?.data?.data?.map((bicycle: Bicycle) => (
                <BicycleCard key={bicycle._id} bicycle={bicycle} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center py-10 text-center text-gray-500">
                <p className="mb-4">No bicycles found matching your criteria.</p>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>

          {/* pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
