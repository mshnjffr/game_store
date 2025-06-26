'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { categoriesApi } from '@/lib/api';
import { Category, GameSearchParams } from '@/types';

interface SidebarProps {
  searchParams: GameSearchParams;
  onSearchParamsChange: (params: GameSearchParams) => void;
}

export default function Sidebar({ searchParams, onSearchParamsChange }: SidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesApi.getAll();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleFilterChange = (key: keyof GameSearchParams, value: any) => {
    // Convert "all" values to undefined/empty for API calls
    const processedValue = value === 'all' ? undefined : value;
    
    onSearchParamsChange({
      ...searchParams,
      [key]: processedValue,
      page: 1, // Reset to first page when filtering
    });
  };

  const clearFilters = () => {
    onSearchParamsChange({
      q: searchParams.q || '',
      sortBy: 'name',
      order: 'asc',
      page: 1,
      limit: 12,
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search Games</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search games..."
            value={searchParams.q || ''}
            onChange={(e) => handleFilterChange('q', e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={searchParams.category || 'all'}
            onValueChange={(value) => handleFilterChange('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="minPrice">Min Price ($)</Label>
            <Input
              id="minPrice"
              type="number"
              placeholder="0"
              value={searchParams.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
          <div>
            <Label htmlFor="maxPrice">Max Price ($)</Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="100"
              value={searchParams.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={searchParams.rating?.toString() || 'all'}
            onValueChange={(value) => handleFilterChange('rating', value === 'all' ? undefined : Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Rating</SelectItem>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="3">3+ Stars</SelectItem>
              <SelectItem value="2">2+ Stars</SelectItem>
              <SelectItem value="1">1+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Platform Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Platform</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={searchParams.platform || 'all'}
            onValueChange={(value) => handleFilterChange('platform', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="PC">PC</SelectItem>
              <SelectItem value="PlayStation">PlayStation</SelectItem>
              <SelectItem value="Xbox">Xbox</SelectItem>
              <SelectItem value="Nintendo Switch">Nintendo Switch</SelectItem>
              <SelectItem value="Mobile">Mobile</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Sort Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sort By</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={searchParams.sortBy || 'name'}
            onValueChange={(value) => handleFilterChange('sortBy', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="releaseDate">Release Date</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={searchParams.order || 'asc'}
            onValueChange={(value) => handleFilterChange('order', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      <Button variant="outline" onClick={clearFilters} className="w-full">
        Clear All Filters
      </Button>
    </div>
  );
}
