'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { categoriesApi } from '@/lib/api';
import { Category } from '@/types';

export default function Navigation() {
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

  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link
        href="/games"
        className="text-gray-600 hover:text-gray-900 transition-colors"
      >
        All Games
      </Link>
      
      {categories.slice(0, 4).map((category) => (
        <Link
          key={category.id}
          href={`/games/category/${category.slug}`}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          {category.name}
        </Link>
      ))}

      <Link
        href="/exercises"
        className="text-gray-600 hover:text-gray-900 transition-colors"
      >
        Exercises
      </Link>
    </nav>
  );
}
