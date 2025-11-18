export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-neutral-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-gold-500 rounded-full border-t-transparent animate-spin"></div>
        </div>

        {/* Loading Text */}
        <h2 className="text-xl font-light text-neutral-700 tracking-wide">
          Carregando...
        </h2>
        <p className="text-sm text-neutral-500 mt-2">
          Aguarde um momento
        </p>
      </div>
    </div>
  );
}
