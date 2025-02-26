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

import { useRouter } from 'next/router';

export default function ShoeDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return <ShoeDetail params={{ id: id as string }} />;
}