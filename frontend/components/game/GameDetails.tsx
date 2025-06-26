'use client';

import Image from 'next/image';
import { Game } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, ShoppingCart, Calendar, Building, Users } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

interface GameDetailsProps {
  game: Game;
}

export default function GameDetails({ game }: GameDetailsProps) {
  const { addItem } = useCart();
  
  const primaryImage = game.images?.find(img => img.isPrimary);
  const screenshots = game.images?.filter(img => !img.isPrimary) || [];
  
  const imageUrl = primaryImage
    ? `${process.env.NEXT_PUBLIC_API_URL}${primaryImage.url}`
    : '/placeholder-game.jpg';

  const handleAddToCart = () => {
    addItem(game);
  };

  const currentPrice = game.discountPrice || game.price;
  const hasDiscount = game.discountPrice && game.discountPrice < game.price;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Images */}
      <div className="space-y-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={game.title}
            fill
            className="object-cover"
            priority
          />
          {game.featured && (
            <Badge className="absolute top-4 left-4 bg-primary">
              Featured
            </Badge>
          )}
          {hasDiscount && (
            <Badge className="absolute top-4 right-4 bg-destructive">
              -{Math.round(((game.price - game.discountPrice!) / game.price) * 100)}%
            </Badge>
          )}
        </div>

        {/* Screenshots */}
        {screenshots.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {screenshots.slice(0, 3).map((screenshot, index) => (
              <div key={screenshot.id} className="relative aspect-video overflow-hidden rounded">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${screenshot.url}`}
                  alt={screenshot.altText || `${game.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Game Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium">{game.rating.toFixed(1)}</span>
              <span className="text-gray-600 ml-1">
                ({game.reviews?.length || 0} reviews)
              </span>
            </div>
            <Badge variant="secondary">{game.category?.name}</Badge>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-primary">
            {formatPrice(currentPrice)}
          </span>
          {hasDiscount && (
            <span className="text-xl text-gray-500 line-through">
              {formatPrice(game.price)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          onClick={handleAddToCart}
          size="lg"
          className="w-full md:w-auto"
          disabled={game.stockQuantity <= 0}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {game.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>

        <Separator />

        {/* Game Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Developer</p>
                <p className="font-medium">{game.developer}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Publisher</p>
                <p className="font-medium">{game.publisher}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Release Date</p>
                <p className="font-medium">{formatDate(game.releaseDate)}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Platform</p>
              <p className="font-medium">{game.platform}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Description */}
        <div>
          <h3 className="font-semibold text-lg mb-3">About this game</h3>
          <p className="text-gray-700 leading-relaxed">{game.description}</p>
        </div>

        {/* Stock Info */}
        <div>
          <p className="text-sm text-gray-600">
            {game.stockQuantity > 0 ? (
              <span className="text-green-600">
                ✓ In stock ({game.stockQuantity} available)
              </span>
            ) : (
              <span className="text-red-600">
                ✗ Out of stock
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
