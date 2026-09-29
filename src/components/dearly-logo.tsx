import Image from "next/image";

export default function DearlyLogo() {
  return (
    <Image
      className="dearly-logo"
      src="/dearly-logo.png"
      width={500}
      height={500}
      alt="Dearly, digital event experience"
      unoptimized
    />
  );
}