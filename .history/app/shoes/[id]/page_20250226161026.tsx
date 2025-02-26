"use client;"
import { shoes } from '@/app/data/shoes';
import ShoeDetail from './ShoeDetail';


export function generateStaticParams() {
  return shoes.map((shoe) => ({
    id: shoe.id.toString(),
  }));
}

interface Params {
  id: string;
}

import { useParams } from 'next/navigation';
import { use } from 'react';

export default function ShoeDetailPage() {
  const { id } = useParams();

  return <ShoeDetail params={{ id: id as string }} />;
}