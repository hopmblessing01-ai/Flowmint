import Image from "next/image";

type BrandLoaderProps = {
  label?: string;
  size?: "md" | "lg";
};

export function BrandLoader({ label = "Loading", size = "lg" }: BrandLoaderProps) {
  const shell = size === "lg" ? "h-44 w-44 sm:h-52 sm:w-52" : "h-36 w-36";
  const mark = size === "lg" ? "h-28 w-28 sm:h-32 sm:w-32" : "h-24 w-24";

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className={`relative ${shell}`}>
        <div
          aria-hidden
          className="absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22)_0%,rgba(12,30,61,0.08)_45%,transparent_72%)] animate-loader-glow"
        />
        <div
          aria-hidden
          className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-sky-400 border-r-blue-600/90 animate-loader-spin"
        />
        <div
          aria-hidden
          className="absolute inset-[10px] rounded-full border-[2.5px] border-transparent border-b-[#0c1e3d] border-l-sky-300/85 animate-loader-spin-reverse"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/loading.png"
            alt=""
            width={160}
            height={160}
            priority
            className={`${mark} object-contain`}
          />
        </div>
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}
