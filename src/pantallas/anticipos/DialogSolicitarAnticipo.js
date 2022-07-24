import React from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, Radio, RadioGroup, Slider, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PaymentsIcon from '@mui/icons-material/Payments';

import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';


const SliderAnticipo = ({ nombre, disponible, valorMinimo }) => {

	const [solicitado, _setSolicitado] = React.useState(disponible);

	const setSolicitado = React.useCallback((valorNuevo, deInput) => {
		if (valorNuevo === '') valorNuevo = 0;
		valorNuevo = +valorNuevo;
		if (valorNuevo < valorMinimo) {
			if (valorNuevo === 0) _setSolicitado(0);
			else if (!deInput) _setSolicitado(valorMinimo);
			else _setSolicitado(valorNuevo);
		}
		else if (valorNuevo > disponible) _setSolicitado(disponible);
		else _setSolicitado(valorNuevo);
	}, [_setSolicitado, disponible, valorMinimo])

	const fnCambiaSlider = (_, valorNuevo) => setSolicitado(valorNuevo);
	const fnCambiaInput = (event) => setSolicitado(event.target.value, true);
	const fnBlurInput = () => setSolicitado(solicitado);

	return <Box >
		<Typography variant="h6" component="div">
			{nombre}
		</Typography>
		<Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' } }}>

			<Slider
				value={solicitado}
				min={0}
				max={disponible}
				onChange={fnCambiaSlider}
				sx={{ mr: 4 }}
				disabled={!Boolean(disponible)}
				color="secondary"
				valueLabelDisplay="auto"
				valueLabelFormat={x => `${x}€`}
				marks={[{ value: valorMinimo }]}
			/>

			<TextField
				color="secondary"
				value={solicitado}
				onChange={fnCambiaInput}
				onBlur={fnBlurInput}
				type="number"
				size="small"
				sx={{ width: { xs: '14ch', sm: '26ch' }, ml: { md: 2 } }}
				disabled={!Boolean(disponible)}
				InputProps={{
					endAdornment: <InputAdornment position="end">€</InputAdornment>,
					step: 1,
					min: 0,
					max: disponible + 1,
				}}
			/>
		</Box>
	</Box >
}


const SliderPrestamo = ({ nombre, disponible, maxCuotas, minCuotas, valorMinimo }) => {

	const [solicitado, _setSolicitado] = React.useState(disponible);
	const [cuotas, _setCuotas] = React.useState(maxCuotas);

	const setSolicitado = React.useCallback((valorNuevo, deInput) => {
		if (valorNuevo === '') valorNuevo = 0;
		valorNuevo = +valorNuevo;
		if (valorNuevo < valorMinimo) {
			if (valorNuevo === 0) _setSolicitado(0);
			else if (!deInput) _setSolicitado(valorMinimo);
			else _setSolicitado(valorNuevo);
		}
		else if (valorNuevo > disponible) _setSolicitado(disponible);
		else _setSolicitado(valorNuevo);
	}, [_setSolicitado, disponible, valorMinimo])

	const setCuotas = React.useCallback((valorNuevo) => {
		if (valorNuevo === '') valorNuevo = 0;
		if (valorNuevo < minCuotas) _setCuotas(minCuotas);
		else if (valorNuevo > maxCuotas) _setCuotas(maxCuotas);
		else _setCuotas(valorNuevo);
	}, [_setCuotas, maxCuotas, minCuotas])

	const fnCambiaSlider = (_, valorNuevo) => setSolicitado(valorNuevo);
	const fnCambiaInput = (event) => setSolicitado(event.target.value, true);
	const fnBlurInput = () => setSolicitado(solicitado);

	const fnCambiaSliderCuotas = (_, valorNuevo) => setCuotas(valorNuevo);
	const fnCambiaInputCuotas = (event) => setCuotas(event.target.value);

	const fnCambiaSliderCuotaMes = (_, valorNuevo) => setSolicitado(valorNuevo * cuotas);
	const fnCambiaInputCuotaMes = (event) => setSolicitado(event.target.value * cuotas, true);

	return <Box >
		<Typography variant="h6" component="div">
			{nombre}
		</Typography>

		<Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' } }}>
			<Slider
				value={cuotas}
				min={minCuotas}
				max={maxCuotas}
				onChange={fnCambiaSliderCuotas}
				sx={{ mr: 4 }}
				disabled={!Boolean(disponible)}
				color="secondary"
				valueLabelDisplay="auto"
				valueLabelFormat={x => `${x} meses`}
			/>
			<TextField
				color="secondary"
				value={cuotas}
				onChange={fnCambiaInputCuotas}
				type="number"
				size="small"
				sx={{ width: { xs: '14ch', sm: '26ch' }, ml: { md: 2 } }}
				disabled={!Boolean(disponible)}
				InputProps={{
					endAdornment: <InputAdornment position="end">meses</InputAdornment>,
					step: 1,
					min: minCuotas,
					max: maxCuotas,
				}}
			/>
		</Box>

		<Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' } }}>

			<Slider
				value={solicitado}
				min={0}
				max={disponible}
				onChange={fnCambiaSlider}
				sx={{ mr: 4 }}
				disabled={!Boolean(disponible)}
				color="secondary"
				valueLabelDisplay="auto"
				valueLabelFormat={x => `${x}€`}
				marks={[{ value: valorMinimo }]}
			/>
			<TextField
				color="secondary"
				value={solicitado}
				onChange={fnCambiaInput}
				onBlur={fnBlurInput}
				type="number"
				size="small"
				sx={{ width: { xs: '14ch', sm: '26ch' }, ml: { md: 2 } }}
				disabled={!Boolean(disponible)}
				InputProps={{
					endAdornment: <InputAdornment position="end">€</InputAdornment>,
					step: 1,
					min: 0,
					max: disponible + 1,
				}}
			/>
		</Box>

		<Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' } }}>

			<Slider
				value={solicitado / cuotas}
				min={0}
				max={disponible / cuotas}
				onChange={fnCambiaSliderCuotaMes}
				sx={{ mr: 4 }}
				disabled={!Boolean(disponible)}
				color="secondary"
				valueLabelDisplay="auto"
				valueLabelFormat={x => `${x.toFixed(2)} €/mes`}
				marks={[{ value: valorMinimo / cuotas }]}
			/>

			<TextField
				color="secondary"
				value={(solicitado / cuotas).toFixed(2)}
				onChange={fnCambiaInputCuotaMes}
				onBlur={fnBlurInput}
				type="number"
				size="small"
				sx={{ width: { xs: '20ch', sm: '26ch' }, ml: { md: 2 } }}
				disabled={!Boolean(disponible)}
				InputProps={{
					endAdornment: <InputAdornment position="end">€/mes</InputAdornment>,
					step: 1,
					min: 0,
					max: disponible / cuotas,
				}}
			/>
		</Box>

	</Box >
}




export default function DialogSolicitarAnticipo() {

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	const [abierto, setAbierto] = React.useState(false);

	const resultado = useSelector(state => state.anticipos.resultado);
	//const estado = useSelector(state => state.anticipos.estado);
	//const error = useSelector(state => state.anticipos.error);


	return <>
		<Button variant="contained" onClick={() => setAbierto(true)} startIcon={<PaymentsIcon />} sx={{ m: 1 }}>
			Solicitar anticipos
		</Button>
		<Dialog fullScreen={fullScreen} fullWidth maxWidth="lg" open={abierto} onClose={() => setAbierto(false)}		>
			<DialogTitle sx={{ m: 0, mb: 0, py: 1, bgcolor: 'primary.main', color: 'primary.contrastText' }} >
				Solicitar anticipos
				<IconButton onClick={() => setAbierto(false)} sx={{ position: 'absolute', right: 8, top: 4, color: (t) => t.palette.grey[800] }}			>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ px: 4, mt: 2 }}>
				<Grid container>
					<Grid item xs={12} md={8}>
						<Stack sx={{ px: { md: 6 }, py: { md: 4 } }}>
							{resultado.anticipos.map(anticipo => <SliderAnticipo key={anticipo.nombre} {...anticipo} valorMinimo={75} />)}
						</Stack>
						<Stack sx={{ px: { md: 6 }, py: 4 }}>
							{resultado.prestamos.map(prestamo => <SliderPrestamo key={prestamo.nombre} {...prestamo} valorMinimo={75} maxCuotas={36} minCuotas={6} />)}
						</Stack>
					</Grid>
					<Grid item xs={12} md={4}>
						<FormControl >
							<FormLabel color="secondary">A ingresar por</FormLabel>
							<RadioGroup defaultValue="CN" >
								<FormControlLabel value="CN" control={<Radio color="secondary" />} label="Cuenta nómina" />
								<FormControlLabel value="FC" control={<Radio color="secondary" />} label="Farmacuenta" />
							</RadioGroup>
						</FormControl>
					</Grid>
				</Grid>




			</DialogContent>
			<DialogActions sx={{ px: 4, mb: 2 }}>
				<Button onClick={() => setAbierto(false)} color="info" startIcon={<CloseIcon />}>Descartar</Button>
				<Button onClick={() => setAbierto(false)} variant="contained" startIcon={<PaymentsIcon />}>Enviar solicitud</Button>
			</DialogActions>
		</Dialog>
	</>
}