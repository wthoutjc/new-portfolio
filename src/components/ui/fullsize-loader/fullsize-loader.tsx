import Image from "next/image";

interface LoaderProps {
  text?: string;
  size?: "small" | "medium" | "large";
}

const FullsizeLoader = ({
  text = "Loading...",
  size = "medium",
}: LoaderProps) => {
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
  };

  return (
    <div className="flex flex-col items-center justify-center" role="status">
      <Image
        src="https://res.cloudinary.com/ddmeptk5c/image/upload/f_auto,q_auto/v1/portfolio/zuvtlwc26x7pj15k8lzo"
        alt="ccb-logo"
        width={60}
        height={0}
        className="w-auto h-auto"
        priority
      />
      <div className={`relative ${sizeClasses[size]} mt-10`}>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`absolute inset-0 rounded-full border-4 border-primary-foreground opacity-75 animate-ping`}
            style={{
              animationDelay: `${index * 0.3}s`,
              animationDuration: "1.5s",
            }}
          ></div>
        ))}
        <div
          className={`absolute inset-0 rounded-full border-4 border-t-primary-foreground border-r-primary-foreground border-b-transparent border-l-transparent animate-spin`}
        ></div>
      </div>
      <p
        className="mt-8 text-primary-foreground font-medium animate-pulse"
        aria-live="polite"
      >
        {text}
      </p>
    </div>
  );
};

export { FullsizeLoader };
