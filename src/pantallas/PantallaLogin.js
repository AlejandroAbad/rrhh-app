import React from "react";

import { Button, TextField, Typography, Container } from "@mui/material";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { solicitarToken } from "redux/api/apiSlice";




const LoginTextField = function ({ ...props }) {
	return <TextField
		variant="outlined"
		margin="normal"
		required
		fullWidth
		autoFocus
		{...props} />
}


export default function PantallaLogin() {

	const dispatch = useDispatch();
	const estado = useSelector(state => state.api.usuario);
	const cargando = estado.estado === 'cargando';

	const refUsuario = React.useRef();
	const refPasword = React.useRef();


	return (
		<Container maxWidth="sm">
			<Typography variant="h4">Identifíquese</Typography>

			<LoginTextField id="usuario" label="Usuario" name="usuario" autoComplete="user" inputRef={refUsuario} disabled={cargando} />
			<LoginTextField name="password" label="Contraseña" type="password" id="password" autoComplete="current-password" inputRef={refPasword} disabled={cargando} />

			<Button sx={{ mt: 2 }} type="submit" fullWidth variant="contained" disabled={cargando} onClick={() => {
				dispatch(solicitarToken({
					usuario: refUsuario.current.value,
					password: refPasword.current.value
				}))
			}}>
				{cargando ? 'Cargando' : 'Acceder'}
			</Button>

		</Container>
	)
}