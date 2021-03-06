import React, { useEffect } from 'react';

import { Alert, AlertTitle, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Paper, Select, Stack, Typography, useMediaQuery } from "@mui/material";
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import { useDispatch, useSelector } from 'react-redux';
import { consultarVales } from 'redux/api/valesSlice';
import { completarDescargaAlbaranPdf, descargarAlbaranPdf, descartarErroresAlbaranPdf, preparaDescargaAlbaranPdf } from 'redux/api/albaranPdfSlice';
import { useTheme } from '@emotion/react';
import SAP from 'api/sap';



// CONSTANTES
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const ANO = (new Date()).getFullYear();
const MES = (new Date()).getMonth();
const ANOS = []; for (let i = 10; i >= 0; i--) ANOS.push(ANO - i);

const LineaVale = ({ /*numeroPedido, */numeroAlbaran, fechaCreacion, precio, unidades, lineas, fnVisualizarAlbaran }) => {

	const dispatch = useDispatch();
	const refDescargaPdf = React.useRef();
	const albaranes = useSelector(state => state.albaranPdf.descargas);
	const albaran = albaranes[numeroAlbaran];
	const lanzarDescarga = React.useCallback(async () => {
		const base64Response = await fetch(`data:application/pdf;base64,${albaran.pdf}`);
		const blob = await base64Response.blob();
		const href = window.URL.createObjectURL(blob);
		const a = refDescargaPdf.current;
		a.download = 'valeEmpleado' + numeroAlbaran + '.pdf';
		a.href = href;
		a.click();
		a.href = '';
		dispatch(completarDescargaAlbaranPdf(numeroAlbaran));
	}, [dispatch, numeroAlbaran, albaran])
	const lanzarVisualizacion = React.useCallback(async () => {
		fnVisualizarAlbaran({ numeroAlbaran, pdf: albaran.pdf });
		dispatch(completarDescargaAlbaranPdf(numeroAlbaran));
	}, [dispatch, numeroAlbaran, fnVisualizarAlbaran, albaran])
	const fnDescargarAlbaran = React.useCallback(modoVisualizacion => {
		if (albaran?.estado === "completado" && albaran.pdf) {
			if (modoVisualizacion === 'descarga') lanzarDescarga();
			else if (modoVisualizacion === 'visualizar') lanzarVisualizacion();
			return;
		}
		dispatch(preparaDescargaAlbaranPdf({ numeroAlbaran, modoVisualizacion }));
		dispatch(descargarAlbaranPdf({ numeroAlbaran, modoVisualizacion }));
	}, [dispatch, albaran, numeroAlbaran, lanzarDescarga, lanzarVisualizacion]);

	const fnLimpiarErrorDescarta = React.useCallback(() => {
		dispatch(descartarErroresAlbaranPdf(numeroAlbaran));
	}, [dispatch, numeroAlbaran])

	React.useEffect(() => {
		if (albaran?.estado === "completado" && albaran.pdf) {
			if (albaran.modoVisualizacion === 'descarga') lanzarDescarga();
			else if (albaran.modoVisualizacion === 'visualizar') lanzarVisualizacion();
		}
		else if (albaran?.estado === "error" && albaran?.modoVisualizacion !== "completado") {
			dispatch(completarDescargaAlbaranPdf(numeroAlbaran));
		}
	}, [dispatch, albaran, numeroAlbaran, lanzarDescarga, lanzarVisualizacion])


	return <Paper sx={{ p: 1, mb: 1, fontSize: '110%' }} square >
		<a ref={refDescargaPdf} href="/" style={{ display: 'none' }}>as</a>

		<Box sx={{ display: { xs: 'flex', sm: 'inline-flex' }, alignItems: { xs: 'stretch', sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' } }}>
			<Box sx={{ display: { xs: 'none', sm: 'inline' } }}>
				{albaran?.estado === 'cargando' ? <><LinearProgress sx={{ mt: 2.3, mb: 2.2, width: '88px' }} /></> : <>
					<IconButton sx={{ ml: 1 }} color="secondary" onClick={() => fnDescargarAlbaran('descarga')} disabled={albaran?.estado === 'cargando'}>
						<PictureAsPdfIcon />
					</IconButton>
					<IconButton color="secondary" onClick={() => fnDescargarAlbaran('visualizar')} disabled={albaran?.estado === 'cargando'}>
						<SearchIcon />
					</IconButton>
				</>}
			</Box>
			<Box sx={{ display: { xs: 'block', sm: 'inline-flex' }, py: { xs: 2, sm: 0 }, mx: { xs: 0, sm: 1 } }} >
				<Typography variant="body1" component="span" sx={{ fontWeight: 'bold', ml: 2 }}>{fechaCreacion}</Typography>
				<Typography variant="body1" component="span" sx={{ ml: 3 }}>{numeroAlbaran}</Typography>
				<Typography variant="body1" component="span" sx={{ fontWeight: 'bold', ml: 3 }}>{precio} ???</Typography>
				<Typography variant="body1" component="span" sx={{ color: 'text.disabled', display: { xs: 'none', md: 'inline' }, ml: 3 }}>
					({unidades} unidad{unidades !== 1 && 'es'} en {lineas} l??nea{ }{lineas !== 1 && 's'})
				</Typography>

			</Box>
			<Box sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'flex-end' }}>
				{albaran?.estado === 'cargando' && <><CircularProgress size={20} sx={{ mt: 1, mr: 1.4 }} /></>}
				<Button sx={{ ml: 1 }} color="secondary" onClick={() => fnDescargarAlbaran('descarga')} disabled={albaran?.estado === 'cargando'} >
					Descargar
				</Button>
				<Button sx={{ ml: 1, px: 2 }} color="secondary" onClick={() => fnDescargarAlbaran('visualizar')} disabled={albaran?.estado === 'cargando'}>
					Visualizar
				</Button>
			</Box>
		</Box>

		{albaran?.error &&
			<Box sx={{ m: 1 }}>
				<Alert severity='error' sx={{ py: 0 }} onClose={fnLimpiarErrorDescarta}>
					<AlertTitle>Error en la descarga</AlertTitle>
					{SAP.err2text(albaran?.error)}
				</Alert>
			</Box>
		}
	</Paper>
}


export default function PantallaConsulta() {

	const dispatch = useDispatch();
	const [fecha, _setFecha] = React.useState({ mes: MES, ano: ANO });
	const setMes = React.useCallback((e) => {
		_setFecha(f => {
			return {
				ano: f.ano,
				mes: e.target.value
			}
		});
	}, [_setFecha]);
	const setAno = React.useCallback((e) => {
		_setFecha(f => {
			return {
				ano: e.target.value,
				mes: (e.target.value === ANO && f.mes > MES ? MES : f.mes)
			}
		});
	}, [_setFecha]);
	const mesesDisponibles = fecha.ano === ANO ? MESES.slice(0, MES + 1) : [...MESES];

	useEffect(() => {
		dispatch(consultarVales(fecha))
	}, [dispatch, fecha])

	const estadoConsultaVales = useSelector(state => state.vales.estado);
	const vales = useSelector(state => state.vales.resultado);
	const error = useSelector(state => state.vales.error);

	const [visualizarAlbaran, setVisualizarAlbaran] = React.useState(null);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


	let contenido = null;

	if (estadoConsultaVales === "cargando") {
		contenido = <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
			<CircularProgress size={40} />
			<Typography sx={{ ml: 2, mt: 1 }} variant="h5" component="div">Consultando vales</Typography>
		</Box>
	} else if (error) {
		contenido = <Alert severity="error" >
			<AlertTitle>Ocurri?? un error al realizar la consulta</AlertTitle>
			{SAP.err2text(error)}
		</Alert>
	} else if (vales?.length > 0) {
		contenido = <Stack sx={{ mt: 2 }}>
			{vales.map(vale => {
				return <LineaVale key={vale.numeroAlbaran} {...vale} fnVisualizarAlbaran={setVisualizarAlbaran} />
			})}
		</Stack>
	} else {
		contenido = <Box sx={{ m: 'auto', textAlign: 'center' }}>
			<div><SentimentNeutralIcon sx={{ width: '60px', height: '60px', color: 'secondary.light' }} /></div>
			<Typography sx={{ ml: 2, mt: 1 }} variant="h5" component="div">Sin resultados</Typography>
		</Box>
	}

	return <>
		<Box sx={{ m: 'auto' }}>
			<Typography variant="h4" sx={{ m: 'auto', mb: 2 }}>Mis vales</Typography>
			<Typography>Para consultar tus Vales de Emplead@, selecciona el mes y el a??o que deseas visualizar.</Typography>
			<Box sx={{ mb: 4, mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
				<FormControl sx={{ m: 1 }}>
					<InputLabel id="mes-helper-label" color="secondary">Mes</InputLabel>
					<Select
						labelId="mes-helper-label"
						value={fecha.mes}
						label="Mes"
						onChange={setMes}
						disabled={estadoConsultaVales === "cargando"}
						color="secondary"
						sx={{ width: '20ch' }}
					>
						{mesesDisponibles.map((nombreMes, i) => <MenuItem key={i} value={i}>{nombreMes}</MenuItem>)}
					</Select>
				</FormControl>
				<FormControl sx={{ m: 1 }}>
					<InputLabel id="ano-helper-label" color="secondary">A??o</InputLabel>
					<Select
						labelId="ano-helper-label"
						value={fecha.ano}
						label="A??o"
						onChange={setAno}
						disabled={estadoConsultaVales === "cargando"}
						color="secondary"
						sx={{ width: '12ch' }}
					>
						{ANOS.map(nombreAno => <MenuItem key={nombreAno} value={nombreAno}>{nombreAno}</MenuItem>)}
					</Select>
				</FormControl>
			</Box>
		</Box>

		{contenido}

		<Dialog fullScreen={fullScreen} fullWidth maxWidth="lg" open={Boolean(visualizarAlbaran)} onClose={() => setVisualizarAlbaran(false)}		>
			<DialogTitle sx={{ m: 0, mb: 0, py: 1, bgcolor: 'primary.main', color: 'primary.contrastText' }} >
				Vale de emplead@: Albar??n {visualizarAlbaran?.numeroAlbaran}
				<IconButton
					onClick={() => setVisualizarAlbaran(null)}
					sx={{ position: 'absolute', right: 8, top: 4, color: (t) => t.palette.grey[800] }}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ p: 0 }}>
				<iframe
					height="760px"
					width="100%"
					title={`Vale de emplead@: Albar??n ${visualizarAlbaran?.numeroAlbaran}`}
					src={"data:application/pdf;base64," + visualizarAlbaran?.pdf}
					type="application/pdf"
					style={{ border: 'none' }}
				/>
			</DialogContent>
		</Dialog>



	</>


}