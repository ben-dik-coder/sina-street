import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-12 items-center self-center sm:h-14 md:h-16 ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Sina Street Food"
        width={1536}
        height={1024}
        className="h-full w-auto max-w-[min(320px,78vw)] object-contain object-left sm:max-w-[min(360px,72vw)] md:max-w-[min(400px,58vw)]"
        sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 400px"
        priority
        unoptimized
      />
    </div>
  );
}
