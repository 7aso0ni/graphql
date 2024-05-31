import Link from "next/link";
export default function Home() {
  return (
    <main className="bg-primary-dark-bg h-screen">
      <Link className="text-neutral-light" href="/login">
        Go to login
      </Link>
    </main>
  );
}
