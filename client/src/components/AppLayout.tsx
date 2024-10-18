export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex min-h-screen flex-col bg-gradient-to-b from-cyan-800 to-gray-500 bg-fixed text-white">
      {children}
    </div>
  );
}
