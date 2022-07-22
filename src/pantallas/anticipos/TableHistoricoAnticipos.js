import { Box, Grid, Paper, Typography } from "@mui/material"
import { format } from "date-fns"
import { es } from "date-fns/locale"


const LineaAnticipo = ({ fecha, cantidades, estado, pago, comentarios }) => {


	function getColor(estado) {
		switch (estado) {
			case 'aprobado': return 'success.main';
			case 'pendiente': return 'info.main';
			case 'rechazado': return 'error.main';
			default: return 'text.disabled';
		}
	}

	function convertirClave(clave) {
		switch (clave.toLowerCase()) {
			case 'nominames': return 'Nómina';
			case 'navidad': return 'Navidad';
			case 'verano': return 'Verano';
			case 'beneficios': return 'Beneficios';
			case 'prestamo': return 'Préstamo';
			case 'credito': return 'Crédito';
			default: return 'text.disabled';
		}
	}

	function convertirPago(pago, estado) {
		let coletilla = '»';
		//if (estado === 'aprobado') coletilla = 'A ingresar en';
		//if (estado === 'pendiente') coletilla = 'Se ingresaría en';
		switch (pago) {
			case 'CN': return <>{coletilla} <strong>CUENTA DE NÓMINA</strong></>;
			case 'FC': return <>{coletilla} <strong>FARMACUENTA</strong></>;
			default: return <>Desconocido</>;
		}
	}

	let conceptos = Object.entries(cantidades).filter(e => e[1] > 0);

	return <Paper elevation={3} sx={{ mb: 2, p: 2 }} >
		<Grid container>
			<Grid item xs={12} lg={4} sx={{ display: 'flex', flexDirection: 'row', justifyContent: { xs: 'space-evenly', md: 'flex-start' } }}>
				<Grid container>
					<Grid item xs={6} md={3} lg={6}>
						<Typography variant="body1" sx={{ color: getColor(estado), fontWeight: 'bold', mr: 2 }} component="span">
							{estado.toUpperCase()}
						</Typography>
					</Grid>
					<Grid item xs={6} md={9} lg={6} sx={{textAlign: {xs: 'right', md: 'left'}}}>
						<Typography variant="body1" component="span">
							{format(fecha, 'dd MMMM yyyy', { locale: es })}
						</Typography>
					</Grid>
					{estado !== 'rechazado' && <Grid item xs={12}>
						<Typography variant="body2" component="span">
							{convertirPago(pago, estado)}
						</Typography>
					</Grid>}
					{comentarios && <Grid item xs={12}>
						<Typography variant="body2" component="span">
							{comentarios}
						</Typography>
					</Grid>}

				</Grid>
			</Grid>
			<Grid item xs={12} lg={8} sx={{ display: 'flex', flexDirection: 'row', justifyContent: { xs: 'space-evenly', sm: 'flex-start' }, mt: { xs: 2, lg: 0 }, flexWrap: 'wrap', gap: 2 }} >
				{conceptos.map((c, i) => <Box key={c[0]} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', px: 1 }} >
					<Typography variant="caption" sx={{ fontSize: '90%' }} component="div">
						{convertirClave(c[0])}
					</Typography>
					<Typography variant="body1" sx={{ fontWeight: 'bold' }} component="div">
						{c[1].toFixed(2)}€
					</Typography>
				</Box>)}
			</Grid>
		</Grid>
	</Paper>
}



export default function TableHistoricoAnticipos() {

	const anticipos = [
		{
			fecha: new Date("2018/06/14"),
			cantidades: {
				verano: 1002.33,
				navidad: 1580.31,
				beneficios: 1677.03,
				nominaMes: 2232.12,
			},
			estado: 'pendiente',
			pago: 'CN',
			comentarios: ''
		},
		{
			fecha: new Date("2018/03/20"),
			cantidades: { prestamo: 7812.00 },
			estado: 'aprobado',
			pago: 'CN',
			comentarios: ''
		},
		{
			fecha: new Date("2018/06/14"),
			cantidades: {
				verano: 1002.33,
				navidad: 1580.31,
				beneficios: 1677.03,
				nominaMes: 2232.12,
				prestamo: 10292.33,
				credito: 21232.80
			},
			estado: 'aprobado',
			pago: 'CN',
			comentarios: ''
		},
		{
			fecha: new Date("2018/06/14"),
			cantidades: {
				verano: 1002.33,
				navidad: 1580.31,
				beneficios: 1677.03,
				nominaMes: 2232.12,
			},
			estado: 'aprobado',
			pago: 'CN',
			comentarios: ''
		}
		
		,
		{
			fecha: new Date("2018/06/14"),
			cantidades: {
				credito: 5022332.87
			},
			estado: 'rechazado',
			pago: 'CN',
			comentarios: 'Pide un poco más, a ver que tal ...'
		}
	]


	return <Box sx={{ my: 2 }}>
		{anticipos.map((anticipo, i) => <LineaAnticipo key={i} {...anticipo} />)}
	</Box>


}