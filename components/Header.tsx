import { SiGithub, SiLinkedin } from 'react-icons/si';

import LoadingBar from './LoadingBar';

export default function Header() {
  return (
    <header className="relative border-b border-b-zinc-700 py-6">
      <LoadingBar />
      <div className="container flex justify-between">
        <div className="text-xl font-semibold">Michael Young x PermitFlow</div>
        <nav className="flex gap-4">
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
        </nav>
      </div>
    </header>
  );
}
