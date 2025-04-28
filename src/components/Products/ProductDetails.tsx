import { useGetSingleBicycleQuery } from '@/redux/api/productApi';
import type { Bicycle } from '@/types';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft, Edit } from 'lucide-react';
import { Toaster } from 'sonner';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // bicycle data
  const { data, isLoading, isError, error } = useGetSingleBicycleQuery(id);
  const bicycle: Bicycle | undefined = data?.data;

  // loading
  if (isLoading) {
    return (
      <Card className="mx-auto max-w-4xl">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
            <p>Loading bicycle details...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // error
  if (isError || !bicycle) {
    return (
      <Card className="mx-auto max-w-4xl">
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

  // handle Get stock status badge
  const getStockBadge = (inStock: boolean, quantity: number) => {
    if (!inStock) {
      return (
        <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
          Out of Stock
        </Badge>
      );
    }
    if (quantity < 5) {
      return (
        <Badge variant="outline" className="border-yellow-200 bg-yellow-50 text-yellow-700">
          Low Stock
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
        In Stock
      </Badge>
    );
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Toaster richColors position="top-center" />

      {/* header*/}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Bicycle Details</h1>
        <div className="ml-auto">
          <Button asChild>
            <Link to={`/admin/products/edit/${bicycle._id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Bicycle
            </Link>
          </Button>
        </div>
      </div>

      {/* main */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* left column - img and basic info */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{bicycle.name}</CardTitle>
              {getStockBadge(bicycle.inStock, bicycle.quantity)}
            </div>
            <CardDescription>
              {bicycle.brand} • {bicycle.model}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6 aspect-square overflow-hidden rounded-lg border">
              <img
                src={bicycle.img || '/placeholder.svg'}
                alt={bicycle.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-muted-foreground mb-2 text-sm font-medium">Description</h3>
                <p className="text-sm">{bicycle.description || 'No description available.'}</p>
              </div>

              <Separator />

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium">${bicycle.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity Available</span>
                  <span>{bicycle.quantity < 1 ? '0' : bicycle.quantity} units</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* right column - specifications & additional info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">Brand</h3>
                    <p className="font-medium">{bicycle.brand}</p>
                  </div>
                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">Model</h3>
                    <p className="font-medium">{bicycle.model}</p>
                  </div>
                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">Type</h3>
                    <p className="font-medium">{bicycle.type}</p>
                  </div>
                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">Category</h3>
                    <p className="font-medium">{bicycle.category}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                    Inventory Status
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {bicycle.inStock ? 'Available for Purchase' : 'Not Available'}
                    </p>
                    {getStockBadge(bicycle.inStock, bicycle.quantity)}
                  </div>
                  <p className="mt-1 text-sm">
                    {bicycle.quantity < 1 ? '0' : bicycle.quantity} units in stock
                  </p>
                  {/* {bicycle.quantity < 1 ? '0' : bicycle.quantity } */}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium">Product ID</h3>
                  <p className="font-mono text-sm">{bicycle._id}</p>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <div>
                    <h3 className="text-muted-foreground mb-2 text-sm font-medium">Status</h3>
                    <p className="text-sm">{bicycle.isDeleted ? 'Deleted' : 'Active'}</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-muted-foreground mb-2 text-sm font-medium">Last Updated</h3>
                    <p className="text-sm">
                      {/*  updatedAt / timestamp => updatedAt */}
                      {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* actions */}
          <div className="flex gap-4">
            <Button asChild className="flex-1">
              <Link to={`/admin/products/edit/${bicycle._id}`}>Edit Bicycle</Link>
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => navigate(-1)}>
              Back to List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
