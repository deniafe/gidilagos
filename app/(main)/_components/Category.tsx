'use client'
import React, { useState } from 'react';
import { Arts } from '@/components/icons/Arts';
import { BusinessEconomy } from '@/components/icons/BusinessEconomy';
import { Concert } from '@/components/icons/Concert';
import { Kids } from '@/components/icons/Kids';
import { NightLife } from '@/components/icons/NightLife';
import { Others } from '@/components/icons/Others';
import { PublicSector } from '@/components/icons/PublicSector';
import { Religious } from '@/components/icons/Religious';
import { Tech } from '@/components/icons/Tech';

interface CategoryProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

interface CategoryItem {
  label: string;
  icon: JSX.Element;
}

const categories: CategoryItem[] = [
  { label: 'All', icon: <Others /> },
  { label: 'Arts & Culture', icon: <Arts /> },
  { label: 'Music/Concert', icon: <Concert /> },
  { label: 'Night Life', icon: <NightLife /> },
  { label: 'Public Sector & Policy', icon: <PublicSector /> },
  { label: 'Business & Economy', icon: <BusinessEconomy /> },
  { label: 'Religious', icon: <Religious /> },
  { label: 'Kids', icon: <Kids /> },
  { label: 'IT/Tech', icon: <Tech /> },
];

export const Category: React.FC<CategoryProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <section className="mb-20 mt-24">
      <div className="flex flex-row flex-wrap lg:flex-nowrap justify-around px-[2rem] text-xs mt-8">
        {categories.map((category) => (
          <div
            key={category.label}
            onClick={() => onCategoryChange(category.label)}
            className={`flex flex-col min-w-[150px] lg:min-w-0 lg:flex-row lg:w-auto rounded-lg py-2 cursor-pointer lg:rounded-full px-2 ${
              selectedCategory === category.label ? 'bg-primary text-white' : ''
            }`}
          >
            <p className="flex justify-center">{category.icon}</p>
            <p className="ml-2 mt-1 text-center">{category.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
