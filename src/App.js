import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// TEMA
import './App.css';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import tema from './navegacion/tema';

// MUI
import CssBaseline from '@mui/material/CssBaseline';

// REDUX
import { useSelector } from 'react-redux';


import Pantallas from './pantallas/Pantallas';





function App() {

	let usuarioApi = useSelector(state => state.api.usuario.datos);

	return (
		<ThemeProvider theme={tema}>
			<CssBaseline />

			<div className="App">
				{(!usuarioApi?.jwt) ?
					<Pantallas.Login /> :
					<Router>
						<Routes >
							<Route path="/vales/*" element={<Pantallas.Vales />} />
							<Route path="/*" element={<Pantallas.Principal />} />
						</Routes >
					</Router>
				}
			</div>
		</ThemeProvider>
	);
}

export default App;
