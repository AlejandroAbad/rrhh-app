import { Box, Grid, Paper, Typography } from "@mui/material";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import { PieChart } from 'react-minimal-pie-chart';


export default function BoxPrestamo({ nombre, disponible, pendienteAprobar, concedido, pendientePagar, fechaInicio, fechaFin, cuota }) {
	const datosQuesito = [];

	let i = 0;
	if (disponible) datosQuesito.push({ key: i++, title: 'Disponible', value: disponible, color: '#baffab', texto: `${disponible.toFixed(0)}€`, estilo: { fontSize: '12px', fontWeight: 'bold' } })
	if (pendienteAprobar) datosQuesito.push({ key: i++, title: 'Pendiente', value: pendienteAprobar, color: '#ffd24a', texto: `${pendienteAprobar.toFixed(0)}€`, estilo: { fontSize: '12px', fontWeight: 'bold' } })
	if (pendientePagar) datosQuesito.push({ key: i++, title: 'Pendiente', value: pendientePagar, color: '#facaa2', texto: `${pendientePagar.toFixed(0)}€`, estilo: { fontSize: '10px' } })
	if (concedido) datosQuesito.push({ key: i++, title: 'Devuelto', value: concedido - pendientePagar, color: '#6d84f7', texto: `${concedido - pendientePagar.toFixed(0)}€`, estilo: { fontSize: '12px', fontWeight: 'bold' } })

	let hayDatos = true;
	if (datosQuesito.length === 0) {
		datosQuesito.push({ key: i++, title: 'No disponible', value: 100, color: '#f2f2f2' })
		hayDatos = false;
	}





	return <Paper elevation={3} square sx={{ pb: 2 }}>

		<Typography variant="overline" sx={{ pt: 1, px: 2, fontWeight: 'bold' }} component="div">
			{nombre}
		</Typography>
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Box sx={{ mx: 4, my: 2, maxWidth: 200 }}>
					<PieChart data={datosQuesito} lineWidth={hayDatos ? 50 : 25} animate
						label={({ x, y, dx, dy, dataEntry }) => <text
							key={dataEntry.key}
							x={x} y={y} dx={dx} dy={dy}
							dominantBaseline="central"
							textAnchor="middle"
							style={dataEntry.estilo}
						>
							{dataEntry.texto}
						</text>
						}
					/>
				</Box>
			</Grid>
			<Grid item xs={12} sm={6} md={8} lg={9}>
				{hayDatos ? <>
					{disponible > 0 && <>
						<Typography variant="body1" sx={{ pt: 1, px: 2 }} component="div">
							Disponible
						</Typography>
						<Typography variant="body1" sx={{ pb: 1, px: 2, fontWeight: 'bold' }} component="div">
							{disponible.toFixed(2)}€
						</Typography>
					</>
					}
					{pendienteAprobar > 0 && <>
						<Typography variant="body1" sx={{ pt: 1, px: 2 }} component="div">
							Pendiente de aprobación
						</Typography>
						<Typography variant="body1" sx={{ pb: 1, px: 2, fontWeight: 'bold' }} component="div">
							{pendienteAprobar.toFixed(2)}€
						</Typography>
					</>
					}
					{concedido > 0 && <>
						<Typography variant="body1" sx={{ pt: 1, px: 2 }} component="div">
							Concedido
						</Typography>
						<Typography variant="body1" sx={{ pb: 1, px: 2, fontWeight: 'bold' }} component="div">
							{concedido.toFixed(2)}€
						</Typography>
					</>
					}
					{concedido - pendientePagar > 0 && <>
						<Typography variant="body1" sx={{ pt: 1, px: 2 }} component="div">
							Amortizado
						</Typography>
						<Typography variant="body1" sx={{ pb: 1, px: 2, fontWeight: 'bold' }} component="div">
							{(concedido - pendientePagar).toFixed(2)}€
						</Typography>
					</>
					}

					{pendientePagar > 0 && <>
						<Typography variant="body1" sx={{ pt: 1, px: 2 }} component="div">
							Pendiente
						</Typography>
						<Typography variant="body1" sx={{ pb: 1, px: 2, fontWeight: 'bold' }} component="div">
							{pendientePagar.toFixed(2)}€
						</Typography>
					</>
					}

					{cuota > 0 && <>
						<Typography variant="body1" sx={{ pt: 1, px: 2 }} component="div">
							Cuota mensual
						</Typography>
						<Typography variant="body1" sx={{ pb: 1, px: 2, fontWeight: 'bold' }} component="div">
							{cuota.toFixed(2)}€
						</Typography>
					</>
					}

					{fechaInicio && <>
						<Typography variant="body1" sx={{ pt: 1, px: 2 }} component="div">
							Inicio
						</Typography>
						<Typography variant="body1" sx={{ pb: 1, px: 2, fontWeight: 'bold' }} component="div">
							{format(parse(fechaInicio, 'yyyyMMdd', new Date()), 'dd MMMM yyyy', { locale: es })}
						</Typography>
					</>
					}
					{fechaFin && <>
						<Typography variant="body1" sx={{ pt: 1, px: 2 }} component="div">
							Fin
						</Typography>
						<Typography variant="body1" sx={{ pb: 1, px: 2, fontWeight: 'bold' }} component="div">
							{format(parse(fechaFin, 'yyyyMMdd', new Date()), 'dd MMMM yyyy', { locale: es })}
						</Typography>
					</>
					}

				</>
					:
					<Typography variant="body1" sx={{ mt: 4, px: 2, pb: 4, textAlign: 'center' }} component="div">
						No tiene solicitado este anticipo y actualmente no es posible solicitarlo.
					</Typography>
				}
			</Grid>
		</Grid>





	</Paper>
}