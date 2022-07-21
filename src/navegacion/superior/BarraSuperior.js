import React from 'react';

// MUI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// ICONOS
import MenuIcon from '@mui/icons-material/Menu';

// REDUX
import { useSelector } from 'react-redux';

// SUBCOMPONENTES
import DialogoAcercaDe from './DialogoAcercaDe';
import MenuUsuario from './MenuUsuario';






const BarraSuperior = ({ onMenuLateralClick }) => {

	const usuario = useSelector(state => state.api.usuario.datos);
	const tituloPantalla = useSelector(state => state.pantalla.titulo);

	const [anclaje, setAnclaje] = React.useState(null);
	const fnAbrirMenuUsuario = React.useCallback((e) => setAnclaje(e.currentTarget), [setAnclaje]);
	const fnCerrarMenuUsuario = React.useCallback(() => setAnclaje(null), [setAnclaje]);

	const [dialogoAcercaDeAbierto, _setDialogoAcercaDeAbierto] = React.useState(false);
	const fnAbrirDialogoAcercaDe = React.useCallback(() => _setDialogoAcercaDeAbierto(true), [_setDialogoAcercaDeAbierto]);
	const fnCerrarDialogoAcercaDe = React.useCallback(() => _setDialogoAcercaDeAbierto(false), [_setDialogoAcercaDeAbierto]);

	return (
		<AppBar position="fixed" >
			<Toolbar>
				{usuario?.jwt && (
					<IconButton edge="start" sx={{ mr: 4 }} color="inherit" onClick={onMenuLateralClick}>
						<MenuIcon />
					</IconButton>
				)}
				<Typography variant="h6" sx={{ flexGrow: 1, color: 'primary.contrastText' }}>
					{tituloPantalla}
				</Typography>

				<DialogoAcercaDe
					abierto={dialogoAcercaDeAbierto}
					fnCerrarDialogoApi={fnCerrarDialogoAcercaDe}
					fnAbrirDialogoApi={fnAbrirDialogoAcercaDe} />

				{usuario &&
					<MenuUsuario
						elementoAncla={anclaje}
						abierto={Boolean(anclaje)}
						fnCerrarMenuUsuario={fnCerrarMenuUsuario}
						fnAbrirMenuUsuario={fnAbrirMenuUsuario}
					/>
				}

			</Toolbar>
		</AppBar>
	);
}




export default React.memo(BarraSuperior)