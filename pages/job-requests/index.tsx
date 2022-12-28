import classNames from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import SectionCard from '@/components/SectionCard';
import MainLayout from '@/layouts/MainLayout';
import { formatDate, getPermitProcessForJobRequest } from '@/utils/helpers';
import { useStore } from '@/utils/store';
import { JobRequestGetPayload } from '@/utils/types';

export default function JobRequests() {
  const { isLoading, setLoading } = useStore();
  const [jobRequests, setJobRequests] = useState<JobRequestGetPayload[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchJobRequests = async () => {
      // simulate loading
      setTimeout(async () => {
        const response = await fetch('/api/job-requests');
        const data = await response.json();
        setJobRequests(data.data || []);
        setLoading(false);
      }, 1000);
    };
    fetchJobRequests();
  }, [setLoading, setJobRequests]);
  return (
    <>
      <Head>
        <title>Michael Young | PermitFlow</title>
      </Head>
      <MainLayout>
        <div
          className={classNames({ 'animate-pulse': isLoading }, 'container')}
        >
          <SectionCard title="Job Requests">
            <table className="w-full">
              <thead className="text-left">
                <tr>
                  <th className="p-4">Job Request ID</th>
                  <th className="p-4">Date Submitted</th>
                  <th className="p-4">Work Items</th>
                  <th className="p-4">Permit Process</th>
                </tr>
              </thead>
              <tbody>
                {jobRequests.map((jobRequest) => {
                  const permitProcess =
                    getPermitProcessForJobRequest(jobRequest);
                  return (
                    <tr
                      className="border border-zinc-600 even:bg-zinc-700"
                      key={jobRequest.id}
                    >
                      <td className="p-4">
                        <Link
                          className="text-link"
                          href={`/job-requests/${jobRequest.id}`}
                        >
                          {jobRequest.id.split('-')[0]}
                        </Link>
                      </td>
                      <td className="p-4">
                        {formatDate(jobRequest.createdAt as unknown as string)}
                      </td>
                      <td className="p-4">
                        {jobRequest.permitRules.map((rule) => (
                          <div key={rule.id}>{rule.workItem.displayText}</div>
                        ))}
                      </td>
                      <td className="p-4">{permitProcess?.displayText}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </SectionCard>
        </div>
      </MainLayout>
    </>
  );
}
