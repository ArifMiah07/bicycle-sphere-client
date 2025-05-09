/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Bicycle, BicycleCategory, BicycleType } from '@/types';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  useGetAllBicycleQuery,
  useGetSingleBicycleQuery,
  useUpdateBicycleMutation,
} from '@/redux/api/productApi';

const UpdateBicycleForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // bicycle data
  const {
    data: bicycleData,
    isLoading: isLoadingBicycle,
    isError,
    error,
  } = useGetAllBicycleQuery('');

  const { data: singleBicycleData } = useGetSingleBicycleQuery(id);
  const singleBicycle: Bicycle = singleBicycleData?.data;
  // console.log(singleBicycle);
  // update mutation
  const [updateBicycle, { isLoading: isUpdating }] = useUpdateBicycleMutation();

  // form
  const [formData, setFormData] = useState<Bicycle>({
    name: '',
    brand: '',
    model: '',
    img: '',
    price: 0,
    type: 'Mountain',
    category: 'Men',
    description: '',
    quantity: 1,
    inStock: true,
    isDeleted: false,
  });

  //
  // Populate form when data is loaded
  useEffect(() => {
    if (bicycleData?.data?.data) {
      setFormData(bicycleData.data.data);
    }
  }, [bicycleData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ ...formData, inStock: checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      toast.error('No bicycle ID found');
      return;
    }

    try {
      const response = await updateBicycle({ id, data: formData }).unwrap();
      // console.log('Success:', response);
      toast.success('Bicycle updated successfully!');

      // navigate back after successful update
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(
        'Error updating bicycle: ' + (error.data?.errorSources?.[0]?.message || 'Unknown error'),
      );
    }
  };

  // loading
  if (isLoadingBicycle) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
            <p>Loading bicycle data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  //error
  if (isError) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <h2 className="text-xl font-bold text-red-500">Error Loading Bicycle</h2>
            <p>{(error as any)?.data?.message || 'Failed to load bicycle data'}</p>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Preview image
  const imagePreview = formData.img ? (
    <div className="mt-2 rounded-md border p-2">
      <img
        src={formData.img || '/placeholder.svg'}
        alt="Bicycle preview"
        className="mx-auto h-40 object-contain"
      />
    </div>
  ) : (
    <div className="mt-2 rounded-md border p-2">
      <img
        src={singleBicycle?.img || '/placeholder.svg'}
        alt="Bicycle preview"
        className="mx-auto h-40 object-contain"
      />
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-4 rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-center text-2xl font-bold">Update Bicycle</h2>
      <Toaster richColors position="top-center" />

      <div>
        <Button onClick={() => navigate(-1)} type="button">
          Back to Previous Page
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Bicycle Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={
              singleBicycle?.name ? String(singleBicycle?.name) : 'Mountain Explorer 5000'
            }
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder={singleBicycle?.brand ? String(singleBicycle?.brand) : 'Trek, Specialized'}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder={singleBicycle?.model ? String(singleBicycle?.model) : 'X-1500'}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="img">Image URL</Label>
          <Input
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
            placeholder="https://example.com/bike.jpg"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder={singleBicycle?.price ? String(singleBicycle?.price) : '1200'}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            value={formData.quantity}
            onChange={handleChange}
            placeholder={singleBicycle?.quantity ? String(singleBicycle?.quantity) : '10'}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Bicycle Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value as BicycleType })}
          >
            <SelectTrigger id="type" className="w-full">
              <SelectValue
                placeholder={singleBicycle?.type ? singleBicycle?.type : 'Select type'}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mountain">Mountain</SelectItem>
              <SelectItem value="Road">Road</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="BMX">BMX</SelectItem>
              <SelectItem value="Electric">Electric</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value as BicycleCategory })
            }
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue
                placeholder={singleBicycle?.category ? singleBicycle?.category : 'Select category'}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Men">Men</SelectItem>
              <SelectItem value="Women">Women</SelectItem>
              <SelectItem value="Kids">Kids</SelectItem>
              <SelectItem value="Commuter">Commuter</SelectItem>
              <SelectItem value="Sport">Sport</SelectItem>
              <SelectItem value="Professional">Professional</SelectItem>
              <SelectItem value="Casual">Casual</SelectItem>
              <SelectItem value="Urban Series">Urban Series</SelectItem>
              <SelectItem value="Premium">Premium</SelectItem>
              <SelectItem value="Budget">Budget</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* image preview */}
      <div>{imagePreview}</div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          placeholder={
            singleBicycle?.description
              ? String(singleBicycle?.description)
              : 'Detailed description of the bicycle'
          }
          className="min-h-24 w-full"
        />
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox id="inStock" checked={formData.inStock} onCheckedChange={handleCheckboxChange} />
        <Label htmlFor="inStock">In Stock</Label>
      </div>

      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          className="w-full bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 md:w-64"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating Bicycle...
            </>
          ) : (
            'Update Bicycle'
          )}
        </Button>
      </div>
    </form>
  );
};

export default UpdateBicycleForm;
