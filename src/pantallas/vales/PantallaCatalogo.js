import React from "react";
import { useNavigate } from "react-router";

import { Badge, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Paper, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info';

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { actualizarCatalogo, setMaterialSeleccionado, setPatronBusqueda, setPendienteCarrito } from "redux/api/catalogoSlice";



const LineaArticulo = ({ codigo, nombre, descripcion, stock, precio, imagen }) => {

	const dispatch = useDispatch();
	const fnSeleccionarMaterial = React.useCallback(() => {
		dispatch(setMaterialSeleccionado(codigo))
	}, [dispatch, codigo]);

	const fnSeleccionarPendienteCarrito = React.useCallback(() => {
		dispatch(setPendienteCarrito(codigo))
	}, [dispatch, codigo]);

	return <Grid item xs={6} >
		<Paper elevation={1} square sx={{ height: 130, pt: 2 }}>
			<Grid container sx={{ height: 130 }}>
				<Grid item xs={3} sx={{ textAlign: 'center', verticalAlign: 'center' }}>
					<img src={imagen} style={{ maxWidth: '100px', maxHeight: '100px' }} />
				</Grid>
				<Grid item xs={9}>
					<Typography variant="caption" component="div">{codigo}</Typography>
					<Typography variant="body1" component="div">{nombre}</Typography>
					<Typography variant="body2" component="div">{precio} €</Typography>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 3 }}>
						<IconButton onClick={fnSeleccionarMaterial}>
							<InfoIcon />
						</IconButton>
						<IconButton onClick={fnSeleccionarPendienteCarrito}>
							<AddShoppingCartIcon />
						</IconButton>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	</Grid>
}




export default function PantallaCatalogo() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	let fnVerCarrito = React.useCallback(() => {
		navigate('carrito', { replace: true })
	}, [navigate]);

	let refPatronBusqueda = React.useRef();
	let fnEstablecerPatronBusqueda = React.useCallback(() => {
		let patron = refPatronBusqueda.current.value;
		dispatch(setPatronBusqueda(patron));
	}, [dispatch])

	let fnActualizaCatalogo = React.useCallback(() => {
		dispatch(actualizarCatalogo());
	}, [dispatch])

	let fnTecla = React.useCallback((e) => {
		if (e.keyCode === 13) {
			fnActualizaCatalogo();
		}
	}, [fnActualizaCatalogo])

	const estadoCatalogo = useSelector(state => state.catalogo.estado);
	const cargando = estadoCatalogo === 'cargando';
	const materiales = useSelector(state => state.catalogo.materiales);
	const error = useSelector(state => state.catalogo.error);
	const materialSeleccionado = useSelector(state => state.catalogo.materialSeleccionado);
	const fnDeseleccionarMaterial = React.useCallback(() => dispatch(setMaterialSeleccionado(null)), [dispatch])

	const pendienteCarrito = useSelector(state => state.catalogo.pendienteCarrito);

	const fnDeseleccionarPendienteCarrito = React.useCallback(() => dispatch(setPendienteCarrito(null)), [dispatch])

	let contenido = null;

	if (cargando) {
		contenido = <CircularProgress />
	} else if (error) {
		contenido = JSON.stringify(error)
	} else if (materiales?.length > 0) {
		contenido = <Grid container spacing={2} sx={{ mt: 2 }}>
			{materiales.map(material => {
				return <LineaArticulo key={material.codigo} {...material} />
			})}
		</Grid>
	} else {
		contenido = 'Sin resultados';
	}


	return (
		<Box sx={{ flexGrow: 1, mx: 4 }}>
			<Grid container spacing={2}>
				<Grid item xs={11}>
					<FormControl fullWidth variant="outlined" color="secondary"  >
						<InputLabel htmlFor="standard-adornment-password">Búsqueda de artículos</InputLabel>
						<Input
							inputRef={refPatronBusqueda}
							onChange={fnEstablecerPatronBusqueda}
							onKeyDown={fnTecla}
							id="standard-adornment-password"
							type="text"
							fullWidth
							endAdornment={
								<InputAdornment position="end">
									<IconButton edge="end" sx={{ mb: 2, mr: 0 }} onClick={fnActualizaCatalogo}>
										<SearchIcon sx={{ height: 32, width: 32 }} />
									</IconButton>
								</InputAdornment>
							}

						/>
					</FormControl>
				</Grid>
				<Grid item xs={1}>
					<Badge color="primary" overlap="circular" badgeContent={1000} max={99} sx={{ ml: 2 }}>
						<IconButton color="secondary" component="span" sx={{ height: 50, width: 50 }} onClick={fnVerCarrito}>
							<ShoppingCartIcon sx={{ height: 42, width: 42 }} />
						</IconButton>
					</Badge>
				</Grid>
			</Grid>

			{contenido}

			<Dialog fullWidth maxWidth="lg" open={Boolean(materialSeleccionado)} onClose={fnDeseleccionarMaterial}			>
				<DialogTitle sx={{ fontSize: '120%', fontWeight: 'bold' }}>{materialSeleccionado?.nombre}</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ display: 'flex', justifyContent: 'center' }}>
						<img src={materialSeleccionado?.imagen} style={{ maxWidth: '400px', maxHeight: '400px' }} />
					</DialogContentText>
					<Box sx={{ mt: 1, fontSize: '90%', color: 'text.secondary' }}>
						<div dangerouslySetInnerHTML={{ __html: materialSeleccionado?.descripcion }} />
					</Box>
				</DialogContent>
				<DialogActions sx={{ mb: 2, mr: 2 }}>
					<Button variant="contained" color="info" onClick={fnDeseleccionarMaterial}>Cerrar</Button>
					<Button variant="contained"  onClick={() => dispatch(setPendienteCarrito(materialSeleccionado?.codigo))}>Añadir al carrito</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={Boolean(pendienteCarrito)} onClose={fnDeseleccionarPendienteCarrito}>
				<DialogTitle>{materialSeleccionado?.nombre}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						¿Cuántas unidades desea añadir al carrito?
					</DialogContentText>
					<DialogContentText sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 0 }}>
						<TextField
							defaultValue={1}
							autoFocus
							margin="dense"
							label="Cantidad"
							type="number"
							variant="outlined"
							color="secondary"
						/>
					</DialogContentText>
				</DialogContent>
				<DialogActions sx={{ mb: 2, mr: 2 }}>
					<Button variant="contained" color="info" onClick={fnDeseleccionarPendienteCarrito}>no, gracias</Button>
					<Button variant="contained" onClick={() => { }}>Añadir</Button>
				</DialogActions>
			</Dialog>

		</Box>
	)


}