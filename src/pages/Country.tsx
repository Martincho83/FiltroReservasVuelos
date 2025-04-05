import { useEffect, useState } from "react";
import reservasData from "../data/reservas.json";
import ListCardReservas from "../components/ListCardReservas";
import { Container, Typography } from "@mui/material";
import { Reserva } from "../types/Reserva";

export default function Country() {
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    setReservas(reservasData);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reservas de Vuelos
      </Typography>
      <ListCardReservas reservas={reservas} />
    </Container>
  );
}
