import Link from 'next/link';
import { SiGithub, SiLinkedin } from 'react-icons/si';

import LoadingBar from './LoadingBar';

export default function Header() {
  return (
    <header className="relative border-b border-b-zinc-700 py-6">
      <LoadingBar />
      <div className="container flex items-center gap-8">
        <div className="w-[350px] text-xl font-semibold">
          Michael Young x PermitFlow
        </div>
        <nav className="flex flex-1 justify-between">
          <div className="gap-8 center">
            <Link
              className="text-xl font-bold uppercase tracking-wide hover:underline"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-xl font-bold uppercase tracking-wide hover:underline"
              href="/job-requests"
            >
              Job Requests
            </Link>
          </div>
          <div className="gap-4 center">
            <a
              className="rounded"
              href="https://github.com/mjyoung/permitflow-take-home"
              target="_blank"
              rel="noreferrer"
            >
              <SiGithub size={32} />
            </a>
            <a
              className="rounded bg-white"
              href="https://www.linkedin.com/in/michaeljy/"
              target="_blank"
              rel="noreferrer"
            >
              <SiLinkedin fill="#0077b5" size={32} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
