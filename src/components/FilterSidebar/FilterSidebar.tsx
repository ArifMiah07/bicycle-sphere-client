import { setFilters } from '@/redux/features/bicycle/bicycleSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Card, CardContent } from '../ui/card';
import { Slider } from '../ui/slider';
import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Bicycle } from '@/types';
import { useGetAllBicycleQuery } from '@/redux/api/productApi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export type TBrand = {
  brand: string[];
};

export default function FilterSidebar() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.bicycles);

  // filters state
  const [priceRange, setPriceRange] = useState<[number, number]>(filters.price);
  const [selectedBrand, setSelectedBrand] = useState<string>(filters.brand || '');
  const [selectedModel, setSelectedModel] = useState<string>(filters.model || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(filters.category || '');
  const [inStock, setInStock] = useState<boolean | 'all'>(filters.availability || 'all');

  // Get all bicycles for filter options
  const { data, isLoading } = useGetAllBicycleQuery('');

  // console.log('data from filter', data);

  // console.log(data?.data?.data);

  // unique values for filters
  const uniqueBrands: string[] = data?.data?.data
    ? Array.from(new Set(data?.data?.data.map((bicycle: Bicycle) => bicycle.brand)))
    : [];

  const uniqueModels: string[] = data?.data?.data
    ? Array.from(new Set(data?.data?.data.map((bicycle: Bicycle) => bicycle.model)))
    : [];

  const uniqueCategories: string[] = data?.data?.data
    ? Array.from(new Set(data?.data?.data.map((bicycle: Bicycle) => bicycle.category)))
    : [];

  // Price slider
  const handleSliderChange = (value: [number, number]) => {
    setPriceRange(value);
    dispatch(setFilters({ price: value }));
  };

  // price inputs
  const handleInputChange = (index: number, value: number) => {
    const newRange: [number, number] = [...priceRange];
    newRange[index] = value;
    setPriceRange(newRange);
    dispatch(setFilters({ price: newRange }));
  };

  // Brand Selection
  const handleBrandChange = (brand: string) => {
    let newBrand;

    if (selectedBrand === brand) {
      newBrand = ''; // Deselect
    } else {
      newBrand = brand; // Select
    }

    setSelectedBrand(newBrand);
    dispatch(setFilters({ brand: newBrand }));
  };

  // Model Selection
  const handleModelChange = (model: string) => {
    let newModel;

    if (selectedModel === model) {
      newModel = '';
    } else {
      newModel = model;
    }

    setSelectedModel(newModel);
    dispatch(setFilters({ model: newModel }));
  };

  // Category Selection
  const handleCategoryChange = (category: string) => {
    let newCategory;

    if (selectedCategory === category) {
      newCategory = '';
    } else {
      newCategory = category;
    }

    setSelectedCategory(newCategory);
    dispatch(setFilters({ category: newCategory }));
  };

  // availability Toggling
  const handleAvailabilityChange = (value: boolean) => {
    let newAvailability: boolean | 'all';

    if (inStock === value) {
      newAvailability = 'all';
    } else {
      newAvailability = value;
    }

    setInStock(newAvailability);
    dispatch(setFilters({ availability: newAvailability }));
  };

  // Reset filters
  const handleResetFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedCategory('');
    setInStock('all');
    dispatch(
      setFilters({
        price: [0, 10000],
        brand: '',
        model: '',
        category: '',
        availability: 'all',
      }),
    );
  };

  if (isLoading) {
    return <div className="p-4">Loading filters...</div>;
  }

  // console.log({ filters });

  return (
    <div className="mt-4 space-y-4">
      {/* reset filters btn */}
      <Button variant="outline" onClick={handleResetFilters} className="mb-2 w-full">
        Reset All Filters
      </Button>

      {/* sorting */}
      <Card className="w-full rounded-2xl p-4 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Sort by Price</h3>
          <DropdownMenu>
            <DropdownMenuTrigger>Price</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => dispatch(setFilters({ sortBy: 'price', sortOrder: 'desc' }))}
              >
                High to low
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => dispatch(setFilters({ sortBy: 'price', sortOrder: 'asc' }))}
              >
                Low to high
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => dispatch(setFilters({ sortBy: '', sortOrder: '' }))}>
                Default
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      {/* price filter */}
      <Card className="w-full rounded-2xl p-4 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Price Range</h3>

          <Slider
            min={0}
            max={10000}
            step={100}
            value={priceRange}
            onValueChange={handleSliderChange}
          />

          <div className="flex h-full w-full flex-col gap-2 lg:flex-row">
            <input
              type="number"
              value={priceRange[0]}
              min={0}
              max={priceRange[1]}
              onChange={(e) => handleInputChange(0, Number(e.target.value))}
              placeholder="Min Price"
              className="w-full rounded border p-2"
            />
            <input
              type="number"
              value={priceRange[1]}
              min={priceRange[0]}
              max={10000}
              onChange={(e) => handleInputChange(1, Number(e.target.value))}
              placeholder="Max Price"
              className="w-full rounded border p-2"
            />
          </div>

          <p className="text-sm text-gray-500">
            Showing between <strong>${priceRange[0]}</strong> – <strong>${priceRange[1]}</strong>
          </p>
        </CardContent>
      </Card>

      {/* brand filter */}
      <Card className="w-full rounded-2xl p-4 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Brand</h3>
          <div className="flex h-full w-full flex-col gap-2">
            {uniqueBrands.map((brand: string, index: number) => (
              <div className="flex w-full items-center gap-1" key={index}>
                <Checkbox
                  id={`brand-${index}`}
                  checked={selectedBrand === brand}
                  onCheckedChange={() => handleBrandChange(brand)}
                />
                <label
                  htmlFor={`brand-${index}`}
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* model filter */}
      <Card className="w-full rounded-2xl p-4 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Model</h3>
          <div className="flex h-full w-full flex-col gap-2">
            {uniqueModels.map((model: string, index: number) => (
              <div className="flex w-full items-center gap-1" key={index}>
                <Checkbox
                  id={`model-${index}`}
                  checked={selectedModel === model}
                  onCheckedChange={() => handleModelChange(model)}
                />
                <label
                  htmlFor={`model-${index}`}
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {model}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category filter */}
      <Card className="w-full rounded-2xl p-4 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Category</h3>
          <div className="flex h-full w-full flex-col gap-2">
            {uniqueCategories.map((category: string, index: number) => (
              <div className="flex w-full items-center gap-1" key={index}>
                <Checkbox
                  id={`category-${index}`}
                  checked={selectedCategory === category}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <label
                  htmlFor={`category-${index}`}
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* availability filter */}
      <Card className="w-full rounded-2xl p-4 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Availability</h3>
          <div className="flex h-full w-full flex-col gap-2">
            <div className="flex w-full items-center gap-1">
              <Checkbox
                id="instock"
                checked={inStock === true}
                onCheckedChange={() => handleAvailabilityChange(true)}
              />
              <label
                htmlFor="instock"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                In Stock
              </label>
            </div>
            <div className="flex w-full items-center gap-1">
              <Checkbox
                id="outofstock"
                checked={inStock === false}
                onCheckedChange={() => handleAvailabilityChange(false)}
              />
              <label
                htmlFor="outofstock"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Out of Stock
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
