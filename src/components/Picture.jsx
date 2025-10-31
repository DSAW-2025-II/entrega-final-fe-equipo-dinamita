export default function Picture({ photo, className = "" }) {
  return (
    <div
      className={`w-40 h-40 border-10 border-[#FEF801] overflow-hidden flex-shrink-0 bg-transparent ${className}`}
    >
      {photo ? (
        <img
          src={photo}
          alt="Tu foto"
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-black text-sm font-semibold">
          Sin foto
        </div>
      )}
    </div>
  );
}