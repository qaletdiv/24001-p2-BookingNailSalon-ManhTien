export default function loading() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-foreground"></div>
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    </div>
  );
}
