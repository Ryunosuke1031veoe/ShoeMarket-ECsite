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

export default function ShoeDetailPage({ params }: { params: Params }) {
  return <ShoeDetail params={params} />;
}