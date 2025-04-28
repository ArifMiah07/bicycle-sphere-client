import { useAddBicycleMutation } from '@/redux/api/productApi';
import { Bicycle } from '@/types';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Loader2 } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { useNavigate } from 'react-router';

// Type definitions
export type BicycleType = 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
export type BicycleCategory =
  | 'Men'
  | 'Women'
  | 'Kids'
  | 'Commuter'
  | 'Sport'
  | 'Professional'
  | 'Casual'
  | 'Urban Series'
  | 'Premium'
  | 'Budget';

const CreateBicycleForm = () => {
  const navigate = useNavigate();
  const [addBicycle, { isLoading }] = useAddBicycleMutation();
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addBicycle(formData).unwrap();
      // console.log('Success:', response);
      toast.success('Bicycle added successfully!');

      // Reset form after successful submission
      setFormData({
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
    } catch (error: any) {
      console.error('Error:', error);
      console.error('Error:', error.data?.errorSources[0].message);
      toast.error(
        'Error adding bicycle: ' + (error.data?.errorSources[0].message || 'Unknown error'),
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-4 rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-center text-2xl font-bold">Add New Bicycle</h2>
      <Toaster richColors position="top-center" />
      {/* !important */}
      <div>
        <Button onClick={() => navigate(-1)}>Back to Previous Page</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Bicycle Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Mountain Explorer 5000"
            required
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
            placeholder="Trek, Specialized"
            required
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
            placeholder="X-1500"
            required
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
            required
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
            placeholder="499.99"
            required
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
            placeholder="10"
            required
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
              <SelectValue placeholder="Select type" />
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
              <SelectValue placeholder="Select category" />
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

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Detailed description of the bicycle"
          className="min-h-24 w-full"
        />
      </div>

      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          className="w-full bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 md:w-64"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Bicycle...
            </>
          ) : (
            'Add Bicycle'
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateBicycleForm;
