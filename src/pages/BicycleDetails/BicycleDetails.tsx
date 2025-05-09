import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  Heart,
  Share2,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ShoppingCart,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { Bicycle } from '@/types';
import { useGetAllBicycleQuery, useGetSingleBicycleQuery } from '@/redux/api/productApi';
import BuyNow from './BuyNow';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { addToCart } from '@/redux/features/cart/cartSlice';

export default function BicycleDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetSingleBicycleQuery(id);
  const { data: bicycles } = useGetAllBicycleQuery('');
  const [quantity, setQuantity] = useState(1);
  // console.log('i from ', bicycles?.data);
  // console.log('data', data);

    const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items); 
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Increment the quantity
  const incrementQuantity = () => {
    if (bike && quantity < bike.quantity) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  // Decrement the quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1); 
    }
  };

  // Add the bicycle to the cart
  const addToCartHandler = () => {
    if (bike) {
      dispatch(addToCart({ ...bike, quantity })); 
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Skeleton className="h-[500px] w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-1/3" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="mx-auto mt-24 max-w-6xl p-6">
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-red-100 p-3">
              <RotateCcw className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-medium">Error Loading Bicycle Details</h3>
            <p className="text-muted-foreground">
              We couldn't load the details for this bicycle. Please try again.
            </p>
            <Button asChild variant="outline">
              <Link to="/bicycles">Back to Bicycles</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const bike = data.data;

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground mb-2 pl-0">
          <Link to="/bicycles" className="flex items-center">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Bicycles
          </Link>
        </Button>
        <div className="text-muted-foreground flex items-center text-sm">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/bicycles" className="hover:text-foreground">
            Bicycles
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{bike.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border bg-white">
            <img
              src={bike.img || '/placeholder.svg'}
              alt={bike.name}
              className="h-[500px] w-full object-cover transition-transform hover:scale-105"
            />
          </div>

          {/* Image thumbnails - placeholders for multiple images */}
          <div className="flex space-x-2">
            <div className="border-primary h-20 w-20 cursor-pointer overflow-hidden rounded-md border">
              <img
                src={bike.img || '/placeholder.svg'}
                alt={bike.name}
                className="h-full w-full object-cover"
              />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 w-20 cursor-pointer overflow-hidden rounded-md border">
                <img
                  src={bike.img || '/placeholder.svg'}
                  alt={`${bike.name} view ${i}`}
                  className="h-full w-full object-cover opacity-70"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{bike.name}</h1>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              <div className="mb-1 text-base text-yellow-400">
                {'★'.repeat(bike.rating ?? 4)}
                {'☆'.repeat(5 - (bike.rating ?? 4))}
              </div>
            </div>

            <div className="mt-2 flex items-center">
              <Badge variant="outline" className="mr-2 rounded-md">
                {bike.category}
              </Badge>
              <Badge variant="outline" className="rounded-md">
                {bike.type}
              </Badge>
              <Badge variant="outline" className="rounded-md">
              <span>Avg Rating: {'4.5'}</span>
              </Badge>
            </div>

            <div className="mt-4">
              <p className="text-primary text-3xl font-bold">${bike.price.toFixed(2)}</p>
              <p className="text-muted-foreground text-sm">Free shipping on orders over $100</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <p className="text-muted-foreground">{bike.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Brand</p>
                <p>{bike.brand}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Model</p>
                <p>{bike.model}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Type</p>
                <p>{bike.type}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Availability</p>
                <p className={bike.inStock ? 'text-green-600' : 'text-red-500'}>
                  {bike.inStock ? `In Stock (${bike.quantity} available)` : 'Out of Stock'}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <div className="flex h-8 w-12 items-center justify-center border-y">{quantity}</div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={incrementQuantity}
                  disabled={!bike.inStock || quantity >= bike.quantity}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Add to Cart <| important */}
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Button className="flex-1"  onClick={addToCartHandler} disabled={!bike.inStock}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <BuyNow
                inStock={!bike.inStock}
                productId={bike._id}
                title={bike.name}
                quantity={quantity}
                price={bike.price}
                email="user@example.com"
              />
              {/* <Button className="flex-1" asChild>
                <Link to="/checkout">Buy Now</Link>
              </Button> */}
            </div>
          </div>

          {/* Shipping and Returns */}
          <div className="space-y-3 rounded-lg border p-4">
            <div className="flex items-center space-x-3">
              <Truck className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-muted-foreground text-xs">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-sm font-medium">2 Year Warranty</p>
                <p className="text-muted-foreground text-xs">Full coverage for peace of mind</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-sm font-medium">30-Day Returns</p>
                <p className="text-muted-foreground text-xs">Hassle-free return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Product Details</h3>
              <p>
                Experience the ultimate ride with the {bike.name}. This premium {bike.type} bicycle
                from {bike.brand}
                combines cutting-edge technology with sleek design to deliver exceptional
                performance on any terrain.
              </p>
              <p>{bike.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Technical Specifications</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Brand</span>
                    <span>{bike.brand}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Model</span>
                    <span>{bike.model}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Type</span>
                    <span>{bike.type}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Category</span>
                    <span>{bike.category}</span>
                  </div>
                </div>
                {/* design purpose */}
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Weight</span>
                    <span>12.5 kg (approx)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Frame Material</span>
                    <span>Carbon Fiber</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Wheel Size</span>
                    <span>29 inches</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Gears</span>
                    <span>21-Speed</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Customer Reviews</h3>
              <p className="text-muted-foreground">
                No reviews yet. Be the first to review this product.
              </p>
              <Button variant="outline">Write a Review</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">You Might Also Like</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {bicycles?.data?.data?.length > 0
            ? bicycles?.data?.data
                // showing half of the product
                .slice(Math.floor(bicycles?.data?.data?.length / 2), bicycles?.data?.data?.length)
                .map((bicycle: Bicycle, i: number) => (
                  <div key={i}>
                    <Card className="overflow-hidden">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={bicycle.img}
                          alt="Related bicycle"
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium">{bicycle.brand}</h3>
                        <p className="text-muted-foreground text-sm">{bicycle.model}</p>
                        <p className="mt-2 font-bold">{bicycle.price}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))
            : ''}
        </div>
      </div>
    </div>
  );
}
