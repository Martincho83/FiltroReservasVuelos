import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Checkbox,
  OutlinedInput,
  ListItemText,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Reserva } from "../types/Reserva";

type FilterFunction = (r: Reserva) => boolean;

type FilterProps = {
  onFilterChange: (_: FilterFunction[]) => void;
  categorias: string[];
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Filters({ onFilterChange, categorias }: FilterProps) {
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const filters = useMemo(
    () =>
      categorias.reduce<Record<string, (r: Reserva) => boolean>>(
        (acc, cat) => {
          if (cat === "Sin categoría") {
            acc[cat] = (r: Reserva) => !r.categoria?.trim();
          } else {
            acc[cat] = (r: Reserva) => r.categoria?.trim() === cat;
          }
          return acc;
        },
        {}
      ),
    [categorias]
  );

  const handleChange = (event: SelectChangeEvent<typeof selectedFilter>) => {
    const {
      target: { value },
    } = event;
    const values = typeof value === "string" ? value.split(",") : value;
    setSelectedFilter(values);
    onFilterChange(values.map((key) => filters[key]).filter(Boolean));
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="filter-select-label" shrink>
        Filtrar por categoría
      </InputLabel>
      <Select
        label="Filtros"
        labelId="filter-select-label"
        id="filter-select"
        multiple
        value={selectedFilter}
        onChange={handleChange}
        input={<OutlinedInput label="Filtro por Categoría" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {categorias.map((cat: string) => (
          <MenuItem key={cat} value={cat}>
            <Checkbox checked={selectedFilter.includes(cat)} />
            <ListItemText primary={cat} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
