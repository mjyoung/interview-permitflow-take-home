import classNames from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import PermitProcess from '@/components/PermitProcess';
import SectionCard from '@/components/SectionCard';
import MainLayout from '@/layouts/MainLayout';
import { formatDate, getPermitProcessForJobRequest } from '@/utils/helpers';
import { useStore } from '@/utils/store';
import { JobRequestGetPayload } from '@/utils/types';

export default function JobRequestDetail() {
  const { isLoading, setLoading } = useStore();
  const router = useRouter();
  const { id: jobRequestId } = router.query;
  const [jobRequest, setJobRequest] = useState<JobRequestGetPayload | null>(
    null
  );

  useEffect(() => {
    if (jobRequestId) {
      setLoading(true);
      const fetchJobRequest = async () => {
        const response = await fetch(`/api/job-requests/${jobRequestId}`);
        const data = await response.json();
        setJobRequest(data.data || null);
        setLoading(false);
      };
      fetchJobRequest();
    }
  }, [jobRequestId, setLoading]);

  const permitRules = jobRequest?.permitRules || [];
  const permitProcess = getPermitProcessForJobRequest(jobRequest);

  return (
    <>
      <Head>
        <title>Michael Young | PermitFlow</title>
      </Head>
      <MainLayout>
        <div
          className={classNames(
            { 'animate-pulse': isLoading },
            'container flex flex-col gap-8'
          )}
        >
          <div>
            <Link className="text-link" href="/job-requests">
              Job Requests
            </Link>{' '}
            &gt; <span>{jobRequestId}</span>
          </div>
          <SectionCard title="Job Request">
            {!isLoading && !jobRequest && (
              <div>No job request found with given ID {jobRequestId}.</div>
            )}
            {jobRequest && (
              <div className="flex flex-col gap-4">
                <div className="flex gap-1">
                  <h4 className="font-semibold">ID: </h4>
                  <span>{jobRequestId}</span>
                </div>
                <div className="flex gap-1">
                  <h4 className="font-semibold">Date Submitted: </h4>
                  <span>
                    {formatDate(jobRequest.createdAt as unknown as string)}
                  </span>
                </div>
                <div className="flex gap-1">
                  <h4 className="font-semibold">Municipality: </h4>
                  <span>
                    {permitRules?.[0].locationMunicipality.displayText},{' '}
                    {permitRules?.[0].locationMunicipality.locationStateSlug}
                  </span>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Work items:</h4>
                  <ul>
                    {permitRules.map((rule) => (
                      <li key={rule.id}>
                        <div>
                          <span className="font-semibold">
                            {rule.workItem.displayText}
                          </span>{' '}
                          ({rule.workItem.workType.toLowerCase()} /{' '}
                          {rule.workItem.workArea.toLowerCase()}) -{' '}
                          {rule.permitProcess.requiresPlans
                            ? 'Plans required.'
                            : 'No plans required.'}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </SectionCard>

          {permitProcess && <PermitProcess permitProcess={permitProcess} />}
        </div>
      </MainLayout>
    </>
  );
}
