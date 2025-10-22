export default function TravelCard({ trip, onOpen }) {
  return (
    <div
      onClick={() => onOpen(trip)}
      className="relative w-[260px] h-[240px] cursor-pointer"
    >
      {/* Amarillo */}
      <div className="absolute inset-0 bg-[#FCF837] border-4 border-[#FE0144] rounded-2xl"></div>

      {/* Rojo con opacidad */}
      <div className="absolute inset-2 bg-[#FE0144] opacity-70 rounded-2xl"></div>

      {/* Imagen */}
      <div
        className="absolute top-3 left-3 right-3 h-[90px] bg-cover bg-center rounded-xl"
        style={{ backgroundImage: `url(${trip.image})` }}
      ></div>

      {/* Info box */}
      <div className="absolute bottom-3 left-3 right-3 bg-[#FFFEE5] rounded-xl p-3">
        <p className="text-sm font-bold">Punto de partida: {trip.origen}</p>
        <p className="text-sm font-bold">Destino: {trip.destino}</p>
        <p className="text-sm font-bold">Hora de salida: {trip.hora}</p>
        <p className="text-sm font-bold">Tarifa: ${trip.costo}</p>
      </div>

      {/* Botón ruta */}
      <div className="absolute top-[110px] left-1/2 -translate-x-1/2 bg-[#FEF801] px-4 py-1 rounded-full font-semibold">
        Ver ruta
      </div>
    </div>
  );
}
