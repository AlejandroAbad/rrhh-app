import React from 'react';

import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import { useDispatch, useSelector } from 'react-redux';
import { completarDescargaNominaPdf, descargarNominaPdf } from 'redux/api/nominaPdfSlice';



// CONSTANTES
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const MES = (new Date()).getMonth() - 1 < 0 ? 11 : (new Date()).getMonth() - 1;
const ANO = (new Date()).getMonth() - 1 < 0 ? (new Date()).getFullYear() - 1 : (new Date()).getFullYear();
const ANOS = []; for (let i = 10; i >= 0; i--) ANOS.push(ANO - i);


export default function PantallaNomina() {

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
	const fnDescargarNomina = React.useCallback((modoVisualizacion) => {
		dispatch(descargarNominaPdf({ modoVisualizacion, ...fecha }))
	}, [dispatch, fecha])
	const refDescargaPdf = React.useRef();
	const [visualizarNomina, setVisualizarNomina] = React.useState(false);
	const nomina = useSelector(state => state.nominaPdf);

	const lanzarDescargaPdf = React.useCallback(async () => {
		const base64Response = await fetch(`data:application/pdf;base64,${nomina.pdf}`);
		const blob = await base64Response.blob();
		const href = window.URL.createObjectURL(blob);
		const a = refDescargaPdf.current;
		a.download = 'nomina' + MESES[fecha.mes] + fecha.ano + '.pdf';
		a.href = href;
		a.click();
		a.href = '';
		dispatch(completarDescargaNominaPdf());
	}, [dispatch, fecha, nomina])

	const lanzarVisualizacion = React.useCallback(async () => {
		setVisualizarNomina(true);
		dispatch(completarDescargaNominaPdf());
	}, [dispatch])
	React.useEffect(() => {
		if (!nomina && nomina.pdf) return;

		if (nomina.modoVisualizacion === 'descargar') {
			lanzarDescargaPdf();
		} else if (nomina.modoVisualizacion === 'visualizar') {
			lanzarVisualizacion()
		}
	}, [nomina, lanzarDescargaPdf, lanzarVisualizacion])

	let contenido = null;
	if (nomina.estado === "cargando") {
		contenido = <Box sx={{ m: 'auto', width: '400px', textAlign: 'center' }}>
			<CircularProgress size={80} />
			<Typography sx={{ ml: 2, mt: 1, color: 'text.disabled', fontWeight: 'bold' }} variant="h4" component="div">Consultando nómina</Typography>
		</Box>
	} else if (nomina.error) {
		contenido = JSON.stringify(nomina.error);
	}

	return <>
		<a ref={refDescargaPdf} href="/" style={{ display: 'none' }}>as</a>
		<Box sx={{ m: 'auto', mt: 4 }}>
			<Typography variant="h4" sx={{ m: 'auto', my: 2 }}>Mis nóminas</Typography>
			<Typography>
				A través de esta herramienta podrás descargarte tus recibos de nómina. Esta utilidad se alinea con el compromiso de la empresa por el respeto al medio ambiente y a la utilización razonable del papel.
			</Typography>
			<Box sx={{  m: 'auto', mt: 6 }}>
				<FormControl sx={{ m: 1,  minWidth: 120 }}>
					<InputLabel id="ano-helper-label" color="secondary">Año</InputLabel>
					<Select
						labelId="ano-helper-label"
						value={fecha.ano}
						label="Año"
						onChange={setAno}
						disabled={nomina.estado === "cargando"}
						color="secondary"
					>
						{ANOS.map(nombreAno => <MenuItem key={nombreAno} value={nombreAno}>{nombreAno}</MenuItem>)}
					</Select>
				</FormControl>
				<FormControl sx={{ m: 1,  minWidth: 120 }}>
					<InputLabel id="mes-helper-label" color="secondary">Mes</InputLabel>
					<Select
						labelId="mes-helper-label"
						value={fecha.mes}
						label="Mes"
						onChange={setMes}
						disabled={nomina.estado === "cargando"}
						color="secondary"
						sx={{ width: '22ch' }}
					>
						{mesesDisponibles.map((nombreMes, i) => <MenuItem key={i} value={i}>{nombreMes}</MenuItem>)}
					</Select>
				</FormControl>
				
			</Box>
		</Box>

		<Box sx={{ m: 'auto', mt: 4, textAlign: 'center' }}>
			<Button sx={{ mr: {md: 2} }} variant="contained" startIcon={<PictureAsPdfIcon />} onClick={() => fnDescargarNomina('descargar')} size="large">
				Descargar PDF
			</Button>
			<Button variant="contained" startIcon={<SearchIcon />} onClick={() => fnDescargarNomina('visualizar')} size="large">
				Visualizar
			</Button>
		</Box>

		<Box sx={{ mt: 4 }}>
			{contenido}
		</Box>


		<Dialog fullWidth maxWidth="lg" open={Boolean(visualizarNomina)} onClose={() => setVisualizarNomina(false)}		>
			<DialogTitle sx={{ m: 0, mb: 1, p: 2, py: 1, bgcolor: 'primary.main', color: 'primary.contrastText' }} >
				Nómina del empleado {MES[fecha.mes]} de {fecha.ano}
				<IconButton onClick={() => setVisualizarNomina(false)} sx={{ position: 'absolute', right: 8, top: 4, color: (theme) => theme.palette.grey[800], }}				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<iframe
					height="800px"
					width="100%"
					title={`Nómina del empleado ${MES[fecha.mes]} de ${fecha.ano}`}
					src={"data:application/pdf;base64," + nomina?.pdf}
					type="application/pdf"
					style={{ border: 'none' }}
				/>
			</DialogContent>
		</Dialog>



	</>


}