import { shoes } from '@/app/data/shoes';
import ShoeDetail from './ShoeDetail';


export function generateStaticParams() {
  return shoes.map((shoe) => ({
    id: shoe.id.toString(),
  }));
}

export default function ShoeDetailPage({ params }: { params: { id: string } }) {
  return <ShoeDetail params={params} />;
}