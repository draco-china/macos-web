import { Icon } from 'umi';

export default function Loading() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-black text-white">
      <Icon icon="apple" className="text-9xl" />
      <Icon icon="loading" spin className="text-2xl text-gray-500" />
    </main>
  );
}
