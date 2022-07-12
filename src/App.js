import React from 'react';

import './App.css';

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ThemeProvider from '@mui/material/styles/ThemeProvider';

// MUI
import CssBaseline from '@mui/material/CssBaseline';

import Pantallas from './pantallas/Pantallas';
import tema from './navegacion/tema';


function App() {
	return (
		<ThemeProvider theme={tema}>
			<Router>
				<CssBaseline />
				<div className="App">
					<Routes >
						<Route path="/vales/*" element={<Pantallas.Vales />} />
						<Route path="/*" element={<Pantallas.Principal />} />
					</Routes >
				</div>
			</Router>
		</ThemeProvider>
	);
}

export default App;
