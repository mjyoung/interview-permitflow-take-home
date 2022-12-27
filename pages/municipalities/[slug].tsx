import {
  LocationMunicipality,
  WorkArea,
  WorkItem,
  WorkType,
} from '@prisma/client';
import classNames from 'classnames';
import { capitalize } from 'lodash-es';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import SectionCard from '@/components/SectionCard';
import Select from '@/components/Select';
import MainLayout from '@/layouts/MainLayout';
import { useStore } from '@/utils/store';

export default function Home() {
  const { setLoading } = useStore();
  const [municipality, setMunicipality] = useState<LocationMunicipality | null>(
    null
  );
  const [workType, setWorkType] = useState<WorkType | null>(null);
  const [workArea, setWorkArea] = useState<WorkArea | null>(null);
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      setLoading(true);
      const fetchMunicipality = async () => {
        const response = await fetch(`/api/municipalities/${slug}`);
        const data = await response.json();
        setMunicipality(data.data || null);
        setLoading(false);
      };
      fetchMunicipality();
    }
  }, [setLoading, slug]);

  useEffect(() => {
    if (workArea && workType && municipality) {
      setLoading(true);
      const fetchMunicipality = async () => {
        const response = await fetch(`/api/municipalities/${slug}`);
        const data = await response.json();
        setMunicipality(data.data || null);
        setLoading(false);
      };
      fetchMunicipality();
    }
  }, [workArea, workType, municipality, setLoading, slug]);

  return (
    <>
      <Head>
        <title>Michael Young | PermitFlow</title>
      </Head>
      <MainLayout>
        <div
          className={classNames(
            { 'animate-pulse': !municipality },
            'container flex flex-col gap-8'
          )}
        >
          <div>
            <Link className="text-link" href="/">
              Municipalities
            </Link>{' '}
            &gt; <span>{municipality?.displayText}</span>
          </div>

          <SectionCard title="What type of work are you doing?">
            <Select
              className=""
              name="work-type"
              options={Object.values(WorkType).map((v) => ({
                value: v,
                label: capitalize(v),
              }))}
              onChange={(e) => {
                setWorkType(e.target.value as WorkType);
              }}
            />
          </SectionCard>

          {workType && (
            <SectionCard
              title={`What ${workType.toLowerCase()} work are you doing?`}
            >
              <Select
                className=""
                name="work-area"
                options={Object.values(WorkArea).map((v) => ({
                  value: v,
                  label: capitalize(v),
                }))}
                onChange={(e) => {
                  setWorkArea(e.target.value as WorkArea);
                }}
              />
            </SectionCard>
          )}
        </div>
      </MainLayout>
    </>
  );
}
