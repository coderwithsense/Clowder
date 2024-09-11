"use client";

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { getOwnedCATs } from '@/utils/contracts';
import { CatsProps } from '@/types/cats';
import Link from 'next/link';

export default function MyCATsPage() {
  const [ownedCATs, setOwnedCATs] = useState<CatsProps[] | null>(null);

  useEffect(() => {
    const fetchOwnedCATs = async () => {
      const cats = await getOwnedCATs();
      setOwnedCATs(cats);
    };

    fetchOwnedCATs();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My CATs</h1>
        {ownedCATs ? (
          <ul className="space-y-4">
            {ownedCATs.map((cat) => (
              <li key={cat.address} className="border p-4 rounded-lg">
                <Link href={`/cat/${cat.address}`} className="text-blue-500 hover:underline">
                  {cat.name || cat.address}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>You don't own any CATs yet.</p>
        )}
      </div>
    </Layout>
  );
}