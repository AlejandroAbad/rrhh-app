import React, { useEffect } from 'react';

import { Alert, Box, CircularProgress, Dialog, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, LinearProgress, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import { useDispatch, useSelector } from 'react-redux';
import { consultarVales } from 'redux/api/valesSlice';
import { completarDescargaAlbaranPdf, descargarAlbaranPdf, preparaDescargaAlbaranPdf } from 'redux/api/albaranPdfSlice';



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
	React.useEffect(() => {
		if (albaran?.estado === "completado" && albaran.pdf) {
			if (albaran.modoVisualizacion === 'descarga') lanzarDescarga();
			else if (albaran.modoVisualizacion === 'visualizar') lanzarVisualizacion();
		}
	}, [albaran, lanzarDescarga, lanzarVisualizacion])

	return <Paper sx={{ p: 1, mb: 1, fontSize: '110%' }} square >
		<a ref={refDescargaPdf} href="/" style={{ display: 'none' }}>as</a>
		<Grid container>
			<Grid item xs="auto" sx={{ ml: 2, mr: 4, pl: 1, minWidth: '90px' }}>
				{albaran?.estado === 'cargando' ? <><LinearProgress sx={{ mt: 2.3, mb: 2.2 }} /></> : <>
					<IconButton color="secondary" onClick={() => fnDescargarAlbaran('descarga')} disabled={albaran?.estado === 'cargando'}>
						<PictureAsPdfIcon />
					</IconButton>
					<IconButton color="secondary" onClick={() => fnDescargarAlbaran('visualizar')} disabled={albaran?.estado === 'cargando'}>
						<SearchIcon />
					</IconButton>
				</>
				}
			</Grid>
			<Grid item xs="auto" sx={{ mr: 6, display: 'flex', alignItems: 'center' }}>
				<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{numeroAlbaran}</Typography>
			</Grid>
			<Grid item xs="auto" sx={{ mr: 6, display: 'flex', alignItems: 'center' }}>
				<Typography variant="subtitle1">{fechaCreacion}</Typography>
			</Grid>
			<Grid item xs="auto" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
				<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{precio} €</Typography>
			</Grid>
			<Grid item xs="auto" sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography variant="subtitle1" sx={{ color: 'text.disabled' }}>
					({unidades} unidad{unidades !== 1 && 'es'} en {lineas} línea{ }{lineas !== 1 && 's'})
				</Typography>
			</Grid>


			{albaran?.error && <Grid item xs={1}><Alert seveirty="error">{JSON.stringify(albaran.error)}</Alert></Grid>}


		</Grid>

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

	let contenido = null;

	if (estadoConsultaVales === "cargando") {
		contenido = <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
			<CircularProgress size={40} />
			<Typography sx={{ ml: 2, mt: 1 }} variant="h5" component="div">Consultando vales</Typography>
		</Box>
	} else if (error) {
		contenido = <Alert severity="error">JSON.stringify(error)</Alert>;
	} else if (vales?.length > 0) {
		contenido = <Stack sx={{ mt: 2 }}>
			{vales.map(vale => {
				return <LineaVale key={vale.numeroAlbaran} {...vale} fnVisualizarAlbaran={setVisualizarAlbaran} />
			})}
		</Stack>
	} else {
		contenido = <Box sx={{ m: 'auto', width: '400px', textAlign: 'center' }}>
			<div><SentimentNeutralIcon sx={{ width: '60px', height: '60px', color: 'secondary.light' }} /></div>
			<Typography sx={{ ml: 2, mt: 1 }} variant="h5" component="div">Sin resultados</Typography>
		</Box>
	}

	return <>
		<Box sx={{ m: 'auto' }}>
			<Typography variant="h4" sx={{ m: 'auto', mb: 2 }}>Mis vales</Typography>
			<Typography>Para consultar tus Vales de Emplead@, selecciona el mes y el año que deseas visualizar.</Typography>
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
					<InputLabel id="ano-helper-label" color="secondary">Año</InputLabel>
					<Select
						labelId="ano-helper-label"
						value={fecha.ano}
						label="Año"
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

		<Dialog
			fullWidth
			maxWidth="lg"
			open={Boolean(visualizarAlbaran?.pdf)}
			onClose={() => setVisualizarAlbaran(null)}
		>
			<DialogTitle sx={{ m: 0, mb: 1, p: 2, py: 1, bgcolor: 'primary.main', color: 'primary.contrastText', }} >
				Vale de empleado: Albarán número {visualizarAlbaran?.numeroAlbaran}
				<IconButton
					onClick={() => setVisualizarAlbaran(null)}
					sx={{
						position: 'absolute',
						right: 8,
						top: 4,
						color: (theme) => theme.palette.grey[800],
					}}
				>
					<CloseIcon />
				</IconButton>

			</DialogTitle>
			<DialogContent>
				<iframe
					height="800px"
					width="100%"
					title={`Vale de empleado: Albarán número ${visualizarAlbaran?.numeroAlbaran}`}
					src={"data:application/pdf;base64," + visualizarAlbaran?.pdf}
					type="application/pdf"

					style={{ border: 'none' }}
				/>
			</DialogContent>
		</Dialog>



	</>


}