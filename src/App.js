import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// TEMA
import './App.css';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import tema from './navegacion/tema';

// MUI
import CssBaseline from '@mui/material/CssBaseline';

// REDUX
import { useSelector } from 'react-redux';


import Pantallas from './pantallas/Pantallas';
import BarraSuperior from 'navegacion/superior/BarraSuperior';
import DrawerLateral from 'navegacion/lateral/DrawerLateral';
import { Container, Paper } from '@mui/material';





function App() {

	const usuario = useSelector(state => state.api.usuario.datos);
	const [drawerAbierto, setDrawerAbierto] = React.useState(false);
	const fnMostrarDrawerLateral = React.useCallback((flag) => {
		if (flag === undefined) setDrawerAbierto(!drawerAbierto);
		else setDrawerAbierto(flag ? true : false);
	}, [drawerAbierto, setDrawerAbierto]);

	return (
		<ThemeProvider theme={tema}>
			<Router>
				<CssBaseline />

				{usuario?.jwt && <DrawerLateral abierto={drawerAbierto} fnCerrar={() => fnMostrarDrawerLateral(false)} fnAbrir={() => fnMostrarDrawerLateral(true)} />}
				<BarraSuperior onMenuLateralClick={fnMostrarDrawerLateral} />

				<Container fixed disableGutters sx={{ mt: { xs: 2, sm: 4 } }}>
					<Paper elevation={2} sx={{ pt: 4, pb: 6, px: {xs: 2, lg: 12 } }}>
						{(!usuario?.jwt) ?
							<Pantallas.Login /> :
							<Routes >
								<Route path="/vales/*" element={<Pantallas.Vales />} />
								<Route path="/nomina" element={<Pantallas.Nomina />} />
								<Route path="/*" element={<Pantallas.Principal />} />
							</Routes >

						}
					</Paper>
				</Container>
			</Router>
		</ThemeProvider>
	);
}

export default App;
