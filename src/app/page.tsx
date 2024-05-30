import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="bg-custom-gradient h-screen">
      <Link href="/login">Go to login</Link>
    </main>
  );
}
