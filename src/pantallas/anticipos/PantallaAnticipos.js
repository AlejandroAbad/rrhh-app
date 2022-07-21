import { Grid, Paper, Typography } from "@mui/material";

import { Box } from "@mui/system";
import DialogInformacionAnticipos from "./DialogInformacionAnticipos";
import { PieChart } from 'react-minimal-pie-chart';
import { Masonry } from "@mui/lab";
import DialogSolicitarAnticipo from "./DialogSolicitarAnticipo";


const BoxAnticipo = ({ nombre, disponible, pendienteAprobar, concedido }) => {
	const datosQuesito = [];

	let i = 0;
	if (disponible) datosQuesito.push({ key: i++, title: 'Disponible', value: disponible, color: '#baffab' })
	if (pendienteAprobar) datosQuesito.push({ key: i++, title: 'Pendiente', value: pendienteAprobar, color: '#facaa2' })
	if (concedido) datosQuesito.push({ key: i, title: 'Concedido', value: concedido, color: '#e6e6e6' })

	let hayDatos = true;
	if (datosQuesito.length === 0) {
		datosQuesito.push({ key: i, title: 'No disponible', value: 100, color: '#f2f2f2' })
		hayDatos = false;
	}

	return <Paper elevation={3} square sx={{ pb: 2 }} >

		<Typography variant="overline" sx={{ pt: 1, px: 2, fontWeight: 'bold' }} component="div">
			{nombre}
		</Typography>

		<Box sx={{ mx: { xs: 'auto', sm: 4 }, my: 2, maxWidth: { xs: 120, sm: 200 }, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
			<PieChart data={datosQuesito} lineWidth={hayDatos ? 50 : 25} animate
				label={({ x, y, dx, dy, dataEntry }) => (
					<text
						key={dataEntry.key}
						x={x} y={y} dx={dx} dy={dy}
						dominantBaseline="central"
						textAnchor="middle"
						style={dataEntry.title === 'Disponible' ?
							{ fontSize: '12px', fontWeight: 'bold' } :
							{ fontSize: '10px', color: '#e6e6e6' }}
					>
						{dataEntry.title === 'Disponible' && `${dataEntry.value.toFixed(0)}€`}
						{dataEntry.title === 'Pendiente' && `${dataEntry.value.toFixed(0)}€`}
					</text>
				)}
			/>
		</Box>

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
		</>
			:
			<Typography variant="body1" sx={{ mt: 4, px: 2, textAlign: 'center' }} component="div">
				No tiene solicitado este anticipo y actualmente no es posible solicitarlo.
			</Typography>
		}

	</Paper>
}


const BoxPrestamo = ({ nombre, disponible, pendienteAprobar, concedido, devuelto, cuotas }) => {
	const datosQuesito = [];

	let i = 0;
	if (disponible) datosQuesito.push({ key: i++, title: 'Disponible', value: disponible, color: '#baffab', texto: `${disponible.toFixed(0)}€`, estilo: { fontSize: '12px', fontWeight: 'bold' } })
	if (pendienteAprobar) datosQuesito.push({ key: i++, title: 'Pendiente', value: pendienteAprobar, color: '#ffd24a', texto: `${pendienteAprobar.toFixed(0)}€`, estilo: { fontSize: '12px', fontWeight: 'bold' } })
	if (concedido) datosQuesito.push({ key: i++, title: 'Pendiente', value: concedido - devuelto, color: '#facaa2', texto: `${(concedido - devuelto).toFixed(0)}€`, estilo: { fontSize: '10px' } })
	if (devuelto) datosQuesito.push({ key: i++, title: 'Devuelto', value: devuelto, color: '#6d84f7', texto: `${devuelto.toFixed(0)}€`, estilo: { fontSize: '12px', fontWeight: 'bold' } })

	let hayDatos = true;
	if (datosQuesito.length === 0) {
		datosQuesito.push({ key: i++, title: 'No disponible', value: 100, color: '#f2f2f2' })
		hayDatos = false;
	}


	let cuotaMes = 0, cuotaActual = 0, cuotasPendientes = 0;
	if (cuotas > 0) {
		cuotaMes = (concedido / cuotas).toFixed(2);
		cuotaActual = Math.floor(devuelto / cuotaMes);
		cuotasPendientes = Math.floor(cuotas - cuotaActual);
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



					{devuelto > 0 && <>
						<Typography variant="body1" sx={{ pt: 1, px: 2 }} component="div">
							Amortizado
						</Typography>
						<Typography variant="body1" sx={{ pb: 1, px: 2, fontWeight: 'bold' }} component="div">
							{devuelto.toFixed(2)}€
						</Typography>
					</>
					}


					{(concedido - devuelto) > 0 && <>
						<Typography variant="body1" sx={{ pt: 1, px: 2 }} component="div">
							Pendiente
						</Typography>
						<Typography variant="body1" sx={{ pb: 1, px: 2, fontWeight: 'bold' }} component="div">
							{(concedido - devuelto).toFixed(2)}€
						</Typography>
					</>
					}

					{cuotas > 0 && <>
						<Typography variant="body1" sx={{ pt: 1, px: 2 }} component="div">
							Cuotas
						</Typography>
						<Typography variant="body1" sx={{ pb: 1, px: 2, fontWeight: 'bold' }} component="div">
							{cuotaActual} liquidada{cuotaActual !== 1 && 's'}, {cuotasPendientes} pendiente{cuotasPendientes !== 1 && 's'}
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


export default function PantallaAnticipos() {

	return <>
		<Box sx={{ m: 'auto' }}>
			<Typography variant="h4" sx={{ m: 'auto', mb: 2 }}>Gestión de anticipos</Typography>
		</Box>
		<Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: { xs: 'center', md: 'flex-end' }, my: 2 }}>
			<DialogSolicitarAnticipo />
			<DialogInformacionAnticipos />

		</Box>

		<Typography variant="h5" sx={{ my: 2 }} component="div">Anticipos sobre pagas</Typography>

		<Masonry columns={{ xs: 2, md: 3, lg: 4 }} spacing={2}>
			<BoxAnticipo {...{ nombre: 'Extra de Verano', disponible: 180.24, pendienteAprobar: 0, concedido: 0 }} />
			<BoxAnticipo {...{ nombre: 'Extra de Navidad', disponible: 921.68, pendienteAprobar: 100, concedido: 0 }} />
			<BoxAnticipo {...{ nombre: 'Extra de Beneficios', disponible: 1075.29, pendienteAprobar: 200, concedido: 40 }} />
			<BoxAnticipo {...{ nombre: 'Nómina del mes', disponible: 0, pendienteAprobar: 0, concedido: 0 }} />
		</Masonry>

		<Typography variant="h5" sx={{ mt: 6, mb: 2 }} component="div">Préstamo de empresa</Typography>
		<BoxPrestamo {...{ nombre: 'Préstamo de empresa', disponible: 0, pendienteAprobar: 0, concedido: 1000, devuelto: 100, cuotas: 10 }} />


	</>

}