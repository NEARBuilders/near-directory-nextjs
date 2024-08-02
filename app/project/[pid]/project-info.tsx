import Image from "next/image";
import Markdown from "react-markdown";
import Link from "next/link";
import { ProjectType } from "@/lib/types";

const Tags = ({ tags }: { tags: Record<string, string> }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {Object.keys(tags).map((key, index) => (
        <Link
          href={`/category/${key}`}
          className="flex h-6 shrink-0 items-center justify-center gap-2 rounded-full bg-[#005253] px-2 py-1 text-xs font-medium text-[#abf8f3]"
          key={index}
        >
          {tags[key]}
        </Link>
      ))}
    </div>
  );
};

const WebsiteLink = ({
  href,
  ariaLabel,
  children,
}: {
  href: string;
  children: React.ReactNode;
  ariaLabel: string;
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      className="flex items-center justify-center gap-1 rounded-full border border-[#80E9E5] p-1 text-xs font-bold text-[#80E9E5] transition-opacity duration-300 ease-in-out hover:opacity-50"
    >
      {children}
    </Link>
  );
};

export default function ProjectInfo({
  projectData,
}: {
  projectData: ProjectType;
}) {
  if (!projectData) return null;

  const { profile } = projectData;
  const { lnc } = profile;
  const { website, github, twitter, medium, discord, telegram } =
    profile?.linktree;

  return (
    <div className="flex flex-col gap-4 text-[#ECEBE9] md:gap-0">
      <div className="flex items-center gap-4">
        <Image
          src={profile?.image?.url}
          alt={profile?.name}
          className="pointer-events-none size-[80px] rounded-full bg-gray-900 object-cover md:size-[120px]"
          width={120}
          height={120}
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-medium md:text-[32px] md:font-bold">
            {profile?.name}
          </h2>
          <p className="text-xs font-medium">{profile?.tagline}</p>
          <Tags tags={profile.tags} />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:ml-[134px]">
        <div className="flex flex-wrap items-center gap-2 md:hidden">
          {website && (
            <WebsiteLink href={website} ariaLabel={profile.name}>
              <i className="bi bi-globe text-2xl text-[#80E9E5]" /> Go to
              project
            </WebsiteLink>
          )}
          {github && (
            <WebsiteLink href={github} ariaLabel={`${profile.name} Github`}>
              <i className="bi bi-github text-2xl text-[#80E9E5]" /> Github
              Github
            </WebsiteLink>
          )}
        </div>
        <div className="flex flex-col gap-2 md:hidden">
          <p className="text-xs font-medium">
            Connect with {profile?.name} on Social Media:
          </p>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {twitter && (
              <Link href={twitter} aria-label="Twitter">
                <i className="bi bi-twitter-x text-2xl text-[#80E9E5]" />
              </Link>
            )}
            {medium && (
              <Link href={medium} aria-label="Medium">
                <i className="bi bi-medium text-2xl text-[#80E9E5]" />
              </Link>
            )}
            {discord && (
              <Link href={discord} aria-label="Discord">
                <i className="bi bi-discord text-2xl text-[#80E9E5]" />
              </Link>
            )}
            {telegram && (
              <Link href={telegram} aria-label="Telegram">
                <i className="bi bi-telegram text-2xl text-[#80E9E5]" />
              </Link>
            )}
            {lnc && (
              <Link
                href={`https://learnnear.club/near-ecosystem/${lnc.slug}/`}
                target="_blank"
                aria-label="LNC"
                className="flex gap-1 rounded bg-orange-400 px-2 py-1 font-extrabold text-black"
              >
                <ul className="flex items-baseline">
                  <li className="text-xs">L</li>
                  <li className="text-sm">N</li>
                  <li>C</li>
                </ul>
                {lnc.score}
              </Link>
            )}
          </div>
        </div>
        <div className="prose prose-invert lg:prose-lg">
          <Markdown>{profile?.description}</Markdown>
        </div>
      </div>
    </div>
  );
}
