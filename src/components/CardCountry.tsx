import { Card, CardContent, Typography, Box, CardMedia, Chip, Stack, Divider } from "@mui/material";
import { Reserva } from "../types/Reserva";
import { categoriasConImagen } from "../data/categorias";
import { esCategoriaValida } from "../types/Categorias";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Props {
  reserva: Reserva;
}

export default function CardCountry({ reserva }: Props) {
  // Función para obtener la imagen según la categoría
  const getImagen = () => {
    if (reserva.categoria && esCategoriaValida(reserva.categoria)) {
      return categoriasConImagen[reserva.categoria];
    }
    return "https://source.unsplash.com/featured/?travel";
  };

  // Función para formatear fechas con date-fns
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy, HH:mm", { locale: es });
    } catch (error) {
      console.error("Error formateando fecha:", error);
      return dateString; // Fallback si hay error
    }
  };

  // Función para determinar el color del estado de pago
  const getPaymentStatusColor = () => {
    switch(reserva.pago.estado) {
      case "Completado": return "success";
      case "Pendiente": return "warning";
      case "Fallido": return "error";
      default: return "default";
    }
  };

  return (
    <Card sx={{ 
      mb: 3, 
      maxWidth: 600,
      boxShadow: 3,
      '&:hover': {
        boxShadow: 6,
        transition: 'box-shadow 0.3s ease-in-out'
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={getImagen()}
        alt={reserva.categoria || "Imagen de reserva"}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent>
        {/* Encabezado con código de reserva y categoría */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" component="div" fontWeight="bold">
            Reserva #{reserva.codigoReserva}
          </Typography>
          <Chip 
            label={reserva.categoria || "Sin categoría"} 
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 'medium' }}
          />
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Sección de Información del Vuelo */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Información del Vuelo</Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
          gap: 2,
          mb: 2
        }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">Aerolínea</Typography>
            <Typography>{reserva.vuelo.aerolinea} <Box component="span" color="text.secondary">({reserva.vuelo.numero})</Box></Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">Avión</Typography>
            <Typography>{reserva.vuelo.avion.modelo} <Box component="span" color="text.secondary">({reserva.vuelo.avion.matricula})</Box></Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">Origen</Typography>
            <Typography>
              {reserva.vuelo.origen.ciudad} <Box component="span" color="text.secondary">({reserva.vuelo.origen.codigo}), {reserva.vuelo.origen.pais}</Box>
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">Destino</Typography>
            <Typography>
              {reserva.vuelo.destino.ciudad} <Box component="span" color="text.secondary">({reserva.vuelo.destino.codigo}), {reserva.vuelo.destino.pais}</Box>
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">Salida</Typography>
            <Typography>{formatDate(reserva.vuelo.fechaSalida)}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">Llegada</Typography>
            <Typography>{formatDate(reserva.vuelo.fechaLlegada)}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Sección de Pasajeros */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Pasajero(s)</Typography>
        {reserva.pasajeros.map((pasajero, index) => (
          <Box 
            key={index} 
            sx={{ 
              mb: 2, 
              p: 2, 
              border: '1px solid', 
              borderColor: 'divider',
              borderRadius: 1,
              backgroundColor: 'background.paper'
            }}
          >
            <Typography variant="subtitle1" fontWeight="medium">{pasajero.nombre}</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }} useFlexGap flexWrap="wrap">
              <Chip 
                label={`Asiento: ${pasajero.asiento}`} 
                size="small" 
                variant="outlined"
              />
              <Chip 
                label={`Clase: ${pasajero.clase}`} 
                size="small" 
                variant="outlined"
              />
              <Chip 
                label={`${pasajero.tipoDocumento}: ${pasajero.numeroDocumento}`}
                size="small"
                variant="outlined"
              />
            </Stack>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* Sección de Información de Pago */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Información de Pago</Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
          gap: 2,
          mb: 2
        }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">Método</Typography>
            <Typography>{reserva.pago.metodo}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">Estado</Typography>
            <Chip 
              label={reserva.pago.estado} 
              color={getPaymentStatusColor()}
              size="small"
              sx={{ fontWeight: 'medium' }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">Monto</Typography>
            <Typography sx={{ fontFamily: 'monospace' }}>
              {reserva.pago.moneda} {reserva.pago.monto.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">Referencia</Typography>
            <Typography sx={{ 
              fontFamily: reserva.pago.referencia ? 'monospace' : 'inherit',
              color: reserva.pago.referencia ? 'inherit' : 'text.secondary'
            }}>
              {reserva.pago.referencia || "N/A"}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Sección de Estado y Fecha de Reserva */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          justifyContent="space-between" 
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={1}
        >
          <Box>
            <Typography variant="subtitle2" color="text.secondary">Fecha de Reserva</Typography>
            <Typography>{formatDate(reserva.fechaReserva)}</Typography>
          </Box>
          <Chip 
            label={reserva.estado} 
            color={
              reserva.estado === "Confirmada" ? "success" : 
              reserva.estado === "Cancelada" ? "error" : "warning"
            }
            variant="outlined"
            sx={{ 
              fontWeight: 'bold',
              alignSelf: { xs: 'flex-start', sm: 'center' }
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}