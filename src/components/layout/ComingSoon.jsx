export default function ComingSoon() {
  return (
    <section className="pt-32 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        Page Under Development
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        This page is currently under development and will be published soon.
        Please check back later.
      </p>
      <div className="w-40 h-40 border-4 border-dashed border-gray-300 rounded-full animate-spin"></div>
    </section>
  );
}
