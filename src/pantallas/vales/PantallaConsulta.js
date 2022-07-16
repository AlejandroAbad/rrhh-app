import React, { useEffect } from 'react';

import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from 'react-redux';
import { consultarVales } from 'redux/api/valesSlice';

// CONSTANTES
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const ANO = (new Date()).getFullYear();
const MES = (new Date()).getMonth();
const ANOS = []; for (let i = 10; i >= 0; i--) ANOS.push(ANO - i);

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

	return <Box>
		<Typography>Consulta de vales</Typography>

		<Box>
			<FormControl sx={{ m: 1, minWidth: 120 }}>
				<InputLabel id="mes-helper-label">Mes</InputLabel>
				<Select
					labelId="mes-helper-label"
					value={fecha.mes}
					label="Mes"
					onChange={setMes}
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
				>
					{ANOS.map(nombreAno => <MenuItem key={nombreAno} value={nombreAno}>{nombreAno}</MenuItem>)}
				</Select>
			</FormControl>
		</Box>


	</Box>


}