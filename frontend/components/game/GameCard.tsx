import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { addItem } = useCart();
  const primaryImage = game.images?.find(img => img.isPrimary)?.url;
  const imageUrl = primaryImage 
    ? `${process.env.NEXT_PUBLIC_API_URL}${primaryImage}`
    : '/placeholder-game.jpg';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(game);
  };

  const currentPrice = game.discountPrice || game.price;
  const hasDiscount = game.discountPrice && game.discountPrice < game.price;

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <Link href={`/games/${game.id}`}>
        <CardHeader className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
            <Image
              src={imageUrl}
              alt={game.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {game.featured && (
              <Badge className="absolute top-2 left-2 bg-primary">
                Featured
              </Badge>
            )}
            {hasDiscount && (
              <Badge className="absolute top-2 right-2 bg-destructive">
                -{Math.round(((game.price - game.discountPrice!) / game.price) * 100)}%
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {game.title}
          </h3>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600 ml-1">
                {game.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-600">{game.platform}</span>
          </div>
          
          <p className="text-sm text-gray-600 mb-2">
            by {game.developer}
          </p>
          
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-primary">
              {formatPrice(currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(game.price)}
              </span>
            )}
          </div>
        </CardContent>
      </Link>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full"
          disabled={game.stockQuantity <= 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {game.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
}
