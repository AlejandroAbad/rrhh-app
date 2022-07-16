import React, { useEffect } from 'react';

import { Box, Button, Card, CardActions, CardContent, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SearchIcon from '@mui/icons-material/Search';

import { useDispatch, useSelector } from 'react-redux';
import { consultarPdf, consultarVales } from 'redux/api/valesSlice';



// CONSTANTES
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const ANO = (new Date()).getFullYear();
const MES = (new Date()).getMonth();
const ANOS = []; for (let i = 10; i >= 0; i--) ANOS.push(ANO - i);

const LineaVale = ({ /*numeroPedido, */numeroAlbaran, fechaCreacion, precio, unidades, lineas }) => {

	const dispatch = useDispatch();
	return <Grid item xs={4} >
		<Card >
			<CardContent sx={{ pb: 0 }}>
				<Typography variant="caption" component="div">Albarán {numeroAlbaran}</Typography>
				<Typography variant="h6" component="div">{fechaCreacion}</Typography>
				<Typography variant="body1" component="div" sx={{ color: 'secondary.main', fontSize: '80%' }}>
					{unidades} unidad{unidades !== 1 && 'es'} en {lineas} línea{ }{lineas !== 1 && 's'}
				</Typography>
				<Typography variant="body1" component="div" sx={{ fontSize: '110%', mt: 1, fontWeight: 'bold' }}>{precio} €</Typography>
			</CardContent>
			<CardActions sx={{ mt: 0 }}>
				<Button
					variant="outlined"
					color="secondary"
					size="small"
					startIcon={<PictureAsPdfIcon />}
					onClick={() => dispatch(consultarPdf({ numeroAlbaran }))}
				>
					Descargar
				</Button>
				<Button variant="outlined" color="secondary" size="small" startIcon={<SearchIcon />}>Visualizar</Button>
			</CardActions>
		</Card>

	</Grid>
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


	const estadoConsultaVales = useSelector(state => state.vales.listado.estado);
	const vales = useSelector(state => state.vales.listado.resultado);
	const error = useSelector(state => state.vales.listado.error);

	const refDescargaPdf = React.useRef();
	const estadoConsultaPdf = useSelector(state => state.vales.detalle.estado);
	const pdf = useSelector(state => state.vales.detalle.resultado);
	const errorPdf = useSelector(state => state.vales.detalle.error);


	React.useEffect(() => {
		if (!pdf) return;

		const foo = async () => {
			const base64Response = await fetch(`data:application/pdf;base64,${pdf}`);
			const blob = await base64Response.blob();
			const href = window.URL.createObjectURL(blob);
			const a = refDescargaPdf.current;
			a.download = 'albaran.pdf';
			a.href = href;
			a.click();
			a.href = '';
		}

		foo();


	}, [pdf])

	let contenido = null;

	if (estadoConsultaVales === "cargando") {
		contenido = <Box sx={{ m: 4, display: 'flex', flexDirection: 'row' }}>
			<div><CircularProgress /></div>
			<Typography sx={{ ml: 2, mt: 0.5 }} variant="h6" component="div">Consultando vales</Typography>
		</Box>
	} else if (error) {
		contenido = JSON.stringify(error);
	} else if (vales?.length > 0) {
		contenido = <Grid container spacing={2} sx={{ mt: 2 }}>
			{vales.map(vale => {
				return <LineaVale key={vale.numeroAlbaran} {...vale} />
			})}
		</Grid>
	} else {
		contenido = <Box sx={{ display: 'flex', flexDirection: 'row' }}>
			<div><SentimentNeutralIcon sx={{ width: '100px', height: '100px', color: 'text.disabled' }} /></div>
			<Typography sx={{ ml: 2, mt: 2.9, color: 'text.disabled' }} variant="h3" component="div">Sin resultados</Typography>
		</Box>
	}

	return <Box>
		<a ref={refDescargaPdf} href="/" style={{ display: 'none' }}>as</a>

		<Typography>Consulta de vales</Typography>

		<Box>
			<FormControl sx={{ m: 1, minWidth: 120 }}>
				<InputLabel id="mes-helper-label">Mes</InputLabel>
				<Select
					labelId="mes-helper-label"
					value={fecha.mes}
					label="Mes"
					onChange={setMes}
					disabled={estadoConsultaVales === "cargando"}
					color="secondary"
				>
					{mesesDisponibles.map((nombreMes, i) => <MenuItem key={i} value={i}>{nombreMes}</MenuItem>)}
				</Select>
			</FormControl>
			<FormControl sx={{ m: 1, minWidth: 120 }}>
				<InputLabel id="ano-helper-label">Año</InputLabel>
				<Select
					labelId="ano-helper-label"
					value={fecha.ano}
					label="Año"
					onChange={setAno}
					disabled={estadoConsultaVales === "cargando"}
					color="secondary"
				>
					{ANOS.map(nombreAno => <MenuItem key={nombreAno} value={nombreAno}>{nombreAno}</MenuItem>)}
				</Select>
			</FormControl>
		</Box>

		<Box>
			{contenido}

		</Box>


	</Box>


}