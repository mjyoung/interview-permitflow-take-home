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

import Checkbox from '@/components/Checkbox';
import SectionCard from '@/components/SectionCard';
import Select from '@/components/Select';
import MainLayout from '@/layouts/MainLayout';
import { useStore } from '@/utils/store';

export default function Home() {
  const router = useRouter();
  const { slug } = router.query;
  const { setLoading } = useStore();
  const [municipality, setMunicipality] = useState<LocationMunicipality | null>(
    null
  );
  const [workType, setWorkType] = useState<WorkType | null>(null);
  const [workArea, setWorkArea] = useState<WorkArea | null>(null);
  const [workItems, setWorkItems] = useState<WorkItem[] | null>(null);
  const [selectedWorkItems, setSelectedWorkItems] = useState<string[]>([]);

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
      const fetchWorkItems = async () => {
        const response = await fetch(
          `/api/work-items?workArea=${workArea}&workType=${workType}&municipality=${municipality.slug}`
        );
        const data = await response.json();
        setWorkItems(data.data || null);
        setLoading(false);
      };
      fetchWorkItems();
    }
  }, [workArea, workType, municipality, setLoading]);

  const handleSubmitJobRequest = async () => {
    try {
      const response = await fetch(`/api/job-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workItems: selectedWorkItems,
          municipality: municipality?.slug,
        }),
      });
      const data = await response.json();
      if (data.data?.id) {
        router.push(`/job-requests/${data.data.id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

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

          {municipality && workType && workArea && workItems && (
            <SectionCard
              title={`What sort of ${workArea.toLowerCase()} work are you doing?`}
            >
              {workItems.length === 0 && (
                <p>
                  No work items available for {workType.toLowerCase()}{' '}
                  {workArea.toLowerCase()} work in {municipality.displayText}.
                </p>
              )}
              {workItems.length > 0 &&
                workItems.map((workItem) => (
                  <Checkbox
                    key={workItem.slug}
                    value={workItem.slug}
                    label={workItem.displayText}
                    onChange={(e) => {
                      if (selectedWorkItems.includes(e.target.value)) {
                        setSelectedWorkItems(
                          selectedWorkItems.filter((v) => v !== e.target.value)
                        );
                      } else {
                        setSelectedWorkItems([
                          ...selectedWorkItems,
                          e.target.value,
                        ]);
                      }
                    }}
                  />
                ))}
            </SectionCard>
          )}

          <button
            className="w-fit rounded bg-sky-700 px-8 py-2 transition-colors duration-300 hover:bg-sky-900 disabled:cursor-not-allowed disabled:bg-zinc-700"
            onClick={handleSubmitJobRequest}
            disabled={selectedWorkItems.length === 0}
          >
            Submit
          </button>
        </div>
      </MainLayout>
    </>
  );
}
