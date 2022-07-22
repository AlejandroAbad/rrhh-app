import React from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Slider, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PaymentsIcon from '@mui/icons-material/Payments';

import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';


const SliderAnticipo = ({ nombre, disponible }) => {

	const [value, setValue] = React.useState(disponible);

	const handleSliderChange = (event, newValue) => {
		if (newValue < 0) {
			setValue(0);
		} else if (newValue > disponible) {
			setValue(disponible);
		}
		else {
			setValue(newValue);
		}
	};

	const handleInputChange = (event) => {
		let newValue = (event.target.value === '' ? 0 : Number(event.target.value));
		if (newValue < 0) {
			setValue(0);
		} else if (newValue > disponible) {
			setValue(disponible);
		}
		else {
			setValue(newValue);
		}
	};

	const handleBlur = () => {
		if (value < 0) {
			setValue(0);
		} else if (value > disponible) {
			setValue(disponible);
		}
	};



	return <Box>
		<Typography variant="h6" component="div">
			{nombre}
		</Typography>
		<Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' } }}>

			<Slider
				value={typeof value === 'number' ? value : 0}
				min={0}
				max={disponible}
				onChange={handleSliderChange}
				sx={{ mr: 4 }}
				disabled={!Boolean(disponible)}
				color="secondary"
				valueLabelDisplay="auto"
				valueLabelFormat={x => `${x}€`}

			/>

			<TextField
				color="secondary"
				value={value}
				onChange={handleInputChange}
				onBlur={handleBlur}
				type="number"
				sx={{ width: {xs: '14ch', sm: '22ch'}, ml: { md: 2 } }}
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
				<Stack direction="column" spacing={4}>
					{resultado.anticipos.map(anticipo => <SliderAnticipo key={anticipo.nombre} {...anticipo} />)}
					{resultado.prestamos.map(prestamo => <SliderAnticipo key={prestamo.nombre} {...prestamo} />)}
				</Stack>
			</DialogContent>
			<DialogActions sx={{ px: 4, mb: 2 }}>
				<Button onClick={() => setAbierto(false)} color="info" startIcon={<CloseIcon />}>Descartar</Button>
				<Button onClick={() => setAbierto(false)} variant="contained" startIcon={<PaymentsIcon />}>Enviar solicitud</Button>
			</DialogActions>
		</Dialog>
	</>
}