import { PermitProcess as PrismaPermitProcess } from '@prisma/client';

import SectionCard from './SectionCard';

interface Props {
  permitProcess: PrismaPermitProcess;
}

export default function PermitProcess({ permitProcess }: Props) {
  return (
    <SectionCard title="Permit Requirements">
      <div className="flex flex-col gap-4">
        <h4 className="text-xl font-semibold">{permitProcess.displayText}</h4>
        <ul className="list-inside list-disc">
          {permitProcess.slug === 'in-house-review' && (
            <>
              <li>A building permit is required.</li>
              <li>Prepare your application and plan sets are required.</li>
              <li>Submit application for in-house review.</li>
            </>
          )}
          {permitProcess.slug === 'over-the-counter-with-plans' && (
            <>
              <li>A building permit is required.</li>
              <li>
                Prepare your application and include plan sets only if required.
              </li>
              <li>Submit application for OTC review.</li>
            </>
          )}
          {permitProcess.slug === 'over-the-counter-no-plans' && (
            <>
              <li>A building permit is required.</li>
              <li>Prepare your application. No plan sets required.</li>
              <li>Submit application for OTC review.</li>
            </>
          )}
          {permitProcess.slug === 'none' && (
            <>
              <li>Nothing is required! You’re set to build!</li>
            </>
          )}
        </ul>
      </div>
    </SectionCard>
  );
}
