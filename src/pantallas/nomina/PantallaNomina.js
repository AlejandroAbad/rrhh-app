import React from 'react';

import { Alert, AlertTitle, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, Typography, useMediaQuery } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import { useDispatch, useSelector } from 'react-redux';
import { completarDescargaNominaPdf, descargarNominaPdf } from 'redux/api/nominaPdfSlice';
import { useTheme } from '@emotion/react';
import SAP from 'api/sap';



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
		if (nomina?.pdf) {
			if (nomina.modoVisualizacion === 'descargar') {
				lanzarDescargaPdf();
			} else if (nomina.modoVisualizacion === 'visualizar') {
				lanzarVisualizacion()
			}
		}
	}, [nomina, lanzarDescargaPdf, lanzarVisualizacion])

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	let contenido = null;
	if (nomina.estado === "cargando") {
		contenido = <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
			<CircularProgress size={40} />
			<Typography sx={{ ml: 2, mt: 1 }} variant="h5" component="div">Descargando n??mina</Typography>
		</Box>
	} else if (nomina.error) {
		contenido = <Alert severity="error" sx={{ mt: 4 }}>
			<AlertTitle>Error al obtener la n??mina</AlertTitle>
			{SAP.err2text(nomina.error)}
		</Alert>

	}

	return <>
		<a ref={refDescargaPdf} href="/" style={{ display: 'none' }}>as</a>
		<Box sx={{}}>
			<Typography variant="h4" sx={{ m: 'auto', mb: 2 }}>Mis n??minas</Typography>
			<Typography>
				A trav??s de esta herramienta podr??s descargarte tus recibos de n??mina. Esta utilidad se alinea con el compromiso de la empresa por el respeto al medio ambiente y a la utilizaci??n razonable del papel.
			</Typography>
			<Box sx={{ mb: 4, mt: 6, display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
				<FormControl sx={{ m: 1 }}>
					<InputLabel id="mes-helper-label" color="secondary">Mes</InputLabel>
					<Select
						labelId="mes-helper-label"
						value={fecha.mes}
						label="Mes"
						onChange={setMes}
						disabled={nomina.estado === "cargando"}
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
						disabled={nomina.estado === "cargando"}
						color="secondary"
						sx={{ width: '12ch' }}
					>
						{ANOS.map(nombreAno => <MenuItem key={nombreAno} value={nombreAno}>{nombreAno}</MenuItem>)}
					</Select>
				</FormControl>
			</Box>
		</Box>

		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
			<Button
				sx={{ mx: 2, mt: 1, minWidth: { xs: '100%', sm: '' } }}
				variant="contained"
				startIcon={<PictureAsPdfIcon />} onClick={() => fnDescargarNomina('descargar')}
				size="large"
				disabled={nomina.estado === "cargando"}
			>
				Descargar PDF
			</Button>
			<Button
				sx={{ mx: 2, mt: 1, minWidth: { xs: '100%', sm: '' } }}
				variant="contained"
				startIcon={<SearchIcon />}
				onClick={() => fnDescargarNomina('visualizar')}
				size="large"
				disabled={nomina.estado === "cargando"}
			>
				Visualizar
			</Button>
		</Box>

		<Box sx={{ mt: 4 }}>
			{contenido}
		</Box>


		<Dialog fullScreen={fullScreen} fullWidth maxWidth="lg" open={Boolean(visualizarNomina)} onClose={() => setVisualizarNomina(false)}		>
			<DialogTitle sx={{ m: 0, mb: 0, py: 1, bgcolor: 'primary.main', color: 'primary.contrastText' }} >
				N??mina: {MESES[fecha.mes].toLowerCase()} de {fecha.ano}
				<IconButton onClick={() => setVisualizarNomina(false)} sx={{ position: 'absolute', right: 8, top: 4, color: th => th.palette.grey[800], }}				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ p: 0 }}>
				<iframe
					height="880px"
					width="100%"
					title={`N??mina: ${MESES[fecha.mes].toLowerCase()} de ${fecha.ano}`}
					src={"data:application/pdf;base64," + nomina?.pdf}
					type="application/pdf"
					style={{ border: 'none', margin: 'none', padding: 'none' }}
				/>
			</DialogContent>
		</Dialog>



	</>


}