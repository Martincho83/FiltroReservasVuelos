import { useMemo, useState } from "react";
import Filters from "./Filters";
import CardCountry from "./CardCountry";
import { Reserva } from "../types/Reserva";
import { Grid } from "@mui/material";

interface Props {
  reservas: Reserva[];
}

export default function ListCardReservas({ reservas }: Props) {
  const [filters, setFilters] = useState<((r: Reserva) => boolean)[]>([]);

  const filteredReservas = useMemo(() => {
    if (filters.length === 0) return reservas;
    // Cambiamos .every() por .some() para que coincida con AL MENOS UN filtro
    return reservas.filter((r) => filters.some((f) => f(r)));
  }, [reservas, filters]);

  const categoriasUnicas = Array.from(
    new Set(reservas.map((r) => r.categoria ?? "Sin categoría").filter(Boolean))
  );

  return (
    <>
      <Filters
        onFilterChange={(newFilters) => setFilters(newFilters)}
        categorias={categoriasUnicas}
      />
      <Grid container spacing={2} mt={2}>
        {filteredReservas.map((reserva) => (
          <Grid item key={reserva.id} xs={12} sm={6} md={4}>
            <CardCountry reserva={reserva} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}