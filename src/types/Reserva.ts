export interface Reserva {
  id: string;
  categoria?: string;
  vuelo: {
    numero: string;
    origen: {
      codigo: string;
      ciudad: string;
      pais: string;
    };
    destino: {
      codigo: string;
      ciudad: string;
      pais: string;
    };
    fechaSalida: string;
    fechaLlegada: string;
    avion: {
      modelo: string;
      capacidad: number;
      matricula: string;
    };
    aerolinea: string;
  };
  pasajeros: {
    nombre: string;
    tipoDocumento: string;
    numeroDocumento: string;
    asiento: string;
    clase: string;
  }[];
  pago: {
    metodo: string;
    numeroTarjeta?: string;
    referencia?: string;
    monto: number;
    moneda: string;
    estado: string;
  };
  estado: string;
  fechaReserva: string;
  codigoReserva: string;
}
