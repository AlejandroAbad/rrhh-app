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

				<Container fixed disableGutters sx={{ mt: { xs: 6, sm: 8 } }}>
					<Paper elevation={2} sx={{ pt: { xs: 4, sm: 6 }, pb: { xs: 6, sm: 10 }, px: { xs: 3, sm: 6, md: 12 } }}>
						{(!usuario?.jwt) ?
							<Pantallas.Login /> :
							<Routes >
								<Route path="/vales/*" element={<Pantallas.Vales />} />
								<Route path="/nomina" element={<Pantallas.Nomina />} />
								<Route path="/accesos" element={<Pantallas.Accesos />} />
								<Route path="/accesos/prueba" element={<Pantallas.AccesosPrueba />} />
								<Route path="/tickets" element={<Pantallas.Tickets />} />
								<Route path="/anticipos" element={<Pantallas.Anticipos />} />
								<Route path="/gestiones/*" element={<Pantallas.Gestiones />} />
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
