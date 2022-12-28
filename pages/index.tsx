import classNames from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

import SectionCard from '@/components/SectionCard';
import MainLayout from '@/layouts/MainLayout';
import { useStore } from '@/utils/store';

export default function Home() {
  const { municipalities, setMunicipalities, setLoading } = useStore();

  useEffect(() => {
    if (municipalities.length) return;
    setLoading(true);
    const fetchMunicipalities = async () => {
      // simulate loading
      setTimeout(async () => {
        const response = await fetch('/api/municipalities');
        const data = await response.json();
        setMunicipalities(data.data || []);
        setLoading(false);
      }, 1000);
    };
    fetchMunicipalities();
  }, [municipalities.length, setLoading, setMunicipalities]);
  return (
    <>
      <Head>
        <title>Michael Young | PermitFlow</title>
      </Head>
      <MainLayout>
        <div
          className={classNames(
            { 'animate-pulse': municipalities.length === 0 },
            'container'
          )}
        >
          <SectionCard title="Select a municipality:">
            {municipalities.map((municipality) => {
              return (
                <div key={municipality.id}>
                  <Link
                    className="text-link"
                    href={`/municipalities/${municipality.slug}`}
                  >
                    {municipality.displayText} ({municipality.locationStateSlug}
                    )
                  </Link>
                </div>
              );
            })}
          </SectionCard>
        </div>
      </MainLayout>
    </>
  );
}
