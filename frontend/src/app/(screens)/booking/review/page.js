import ReviewList from "@/components/booking/ServiceSelection/ReviewList";
export default function ReviewPage() {
  return (
    <>
      <h1 className="text-xl font-bold text-center bg-foreground w-1/2 mx-auto  text-neutral-900 px-4 py-2 rounded-full">
        Review
      </h1>
      <ReviewList />
    </>
  );
}
