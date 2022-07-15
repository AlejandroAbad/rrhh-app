import React from "react";
import { useNavigate } from "react-router";

import { Alert, Badge, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Link, Paper, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info';

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { actualizarCatalogo, setMaterialSeleccionado, setPatronBusqueda, setPendienteCarrito } from "redux/api/catalogoSlice";
import { addMaterialEnCarrito, setMaterialEnCarrito } from "redux/api/carritoSlice";



const LineaArticulo = ({ codigo, nombre,/* descripcion, stock, */precio, imagen }) => {

	const dispatch = useDispatch();
	const fnSeleccionarMaterial = React.useCallback(() => { dispatch(setMaterialSeleccionado(codigo)) }, [dispatch, codigo]);
	const fnSeleccionarPendienteCarrito = React.useCallback(() => { dispatch(setPendienteCarrito(codigo)) }, [dispatch, codigo]);

	return <Grid item xs={6} >
		<Paper elevation={1} square sx={{ height: 130, pt: 2 }}>
			<Grid container sx={{ height: 130 }}>
				<Grid item xs={3} sx={{ textAlign: 'center', verticalAlign: 'center' }}>
					<img alt="" src={imagen} style={{ maxWidth: '100px', maxHeight: '100px' }} />
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

const DialogoDetalleArticulo = () => {

	const dispatch = useDispatch();
	const [mostrarOk, setMostrarOk] = React.useState(0);
	const refCantidad = React.useRef(1);
	const materialSeleccionado = useSelector(state => state.catalogo.materialSeleccionado);
	const almacenSuministro = useSelector(state => state.api.usuario.datos.werks)
	const fnDeseleccionarMaterial = React.useCallback(() => dispatch(setMaterialSeleccionado(null)), [dispatch])
	const fnAnadirCarrito = React.useCallback(() => {
		dispatch(addMaterialEnCarrito({ cantidad: Math.max(+refCantidad.current.value, 1), ...materialSeleccionado }))
		setMostrarOk(Math.max(+refCantidad.current.value, 1));
		setTimeout(() => setMostrarOk(0), 1500)
	}, [dispatch, materialSeleccionado, setMostrarOk])
	const fnEliminarCarrito = React.useCallback(() => {
		dispatch(setMaterialEnCarrito({ ...materialSeleccionado }))
		setMostrarOk(-1);
		setTimeout(() => setMostrarOk(0), 1500)
	}, [dispatch, materialSeleccionado, setMostrarOk])


	const contenidoCarrito = useSelector(state => state.carrito.materiales);
	const cantidadActual = React.useMemo(() => {
		if (!materialSeleccionado?.codigo) return 0;
		let material = contenidoCarrito.find(m => m.codigo === materialSeleccionado.codigo);
		if (material) return material.cantidad;
		return 0;
	}, [contenidoCarrito, materialSeleccionado])


	let descripcion = (materialSeleccionado?.descripcion.startsWith('"') && materialSeleccionado?.descripcion.endsWith('"')) ?
		materialSeleccionado?.descripcion.substr(1, materialSeleccionado.descripcion.length - 2).trim()
		: materialSeleccionado?.descripcion;

	return <Dialog fullWidth maxWidth="lg" open={Boolean(materialSeleccionado)} onClose={fnDeseleccionarMaterial}			>

		<DialogContent>
			<DialogContentText >
				<Grid container>
					<Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
						<img alt="" src={materialSeleccionado?.imagen} style={{ maxWidth: '400px', maxHeight: '400px' }} />
					</Grid>
					<Grid item xs={6} sx={{ pr: 4 }}>
						<Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
							{materialSeleccionado?.nombre}
						</Typography>

						<Typography variant="caption" component="div" sx={{ display: 'flex', justifyContent: 'flex-start' }}>
							Código material: {materialSeleccionado?.codigo}
						</Typography>

						<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Typography sx={{}}>
								Precio:
							</Typography>
							<Typography sx={{ color: 'text.primary', fontWeight: 'bold', ml: 1 }}>
								{materialSeleccionado?.precio}
							</Typography>
							<Typography sx={{ fontWeight: 'bold' }}>
								€
							</Typography>
						</Box>
						<Typography variant="caption" component="div" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
							{materialSeleccionado?.stock} unidad{materialSeleccionado?.stock !== 1 && 'es'} disponible{materialSeleccionado?.stock !== 1 && 's'} en {almacenSuministro}
						</Typography>

						<Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
							<TextField
								inputRef={refCantidad}
								defaultValue={1}
								autoFocus
								label="Cantidad"
								type="number"
								variant="outlined"
								color="secondary"
								size="small"
								sx={{ width: '10ch', mr: 2, mt: 0.2 }}
							/>

							<Button variant="contained" onClick={fnAnadirCarrito}>Añadir al carrito</Button>
						</Box>

						{cantidadActual > 0 &&
							<Typography variant="caption" component="div" sx={{ display: 'flex', justifyContent: 'flex-end', mt:1 }}>
								Actualmente tienes {cantidadActual} unidad{cantidadActual !== 1 && 'es'} en el carrito.
								<Link variant="caption" color="secondary" onClick={fnEliminarCarrito} sx={{cursor: 'pointer'}}>Eliminarlas</Link>
							</Typography>
						}

						{mostrarOk > 0 &&
							<Alert color="success" sx={{ mt: 2 }}>
								Añadida{mostrarOk !== 1 && 's'} {mostrarOk} unidad{mostrarOk !== 1 && 'es'} al carrito.
							</Alert>
						}
						{mostrarOk < 0 &&
							<Alert color="info" sx={{ mt: 2 }}>
								Se ha eliminado el producto del carrito
							</Alert>
						}
					</Grid>

				</Grid>
			</DialogContentText>

			<Box sx={{ mt: 1, px: 4, fontSize: '90%', color: 'text.secondary', textAlign: 'justify' }}>
				<div dangerouslySetInnerHTML={{ __html: descripcion }} />
			</Box>

		</DialogContent>
		<DialogActions sx={{ mb: 2, mr: 2 }}>
			<Button variant="contained" color="info" onClick={fnDeseleccionarMaterial}>Cerrar</Button>
		</DialogActions>
	</Dialog >
}

const DialogoAnadirCarrito = () => {

	const dispatch = useDispatch();

	const [mostrarOk, setMostrarOk] = React.useState(false);
	const refCantidad = React.useRef(1);
	const pendienteCarrito = useSelector(state => state.catalogo.pendienteCarrito);
	const fnDeseleccionarPendienteCarrito = React.useCallback(() => dispatch(setPendienteCarrito(null)), [dispatch])
	const fnAnadirCarrito = React.useCallback(() => {
		dispatch(addMaterialEnCarrito({ cantidad: Math.max(+refCantidad.current.value, 1), ...pendienteCarrito }))
		setMostrarOk(true);

		setTimeout(() => {
			fnDeseleccionarPendienteCarrito();
			setMostrarOk(false);
		}, 1000)
	}, [dispatch, pendienteCarrito, fnDeseleccionarPendienteCarrito, setMostrarOk])

	return <Dialog open={Boolean(pendienteCarrito)} onClose={fnDeseleccionarPendienteCarrito}>
		<DialogTitle>{pendienteCarrito?.nombre}</DialogTitle>
		<DialogContent>
			{mostrarOk ?
				<Alert color="success">
					Añadido al carrito
				</Alert>
				:
				<>
					<DialogContentText>
						¿Cuántas unidades desea añadir al carrito?
					</DialogContentText>
					<DialogContentText sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 0 }}>
						<TextField
							inputRef={refCantidad}
							defaultValue={1}
							autoFocus
							margin="dense"
							label="Cantidad"
							type="number"
							variant="outlined"
							color="secondary"
						/>
					</DialogContentText>
				</>
			}
		</DialogContent>
		<DialogActions sx={{ mb: 2, mr: 2 }}>
			<Button variant="contained" color="info" onClick={fnDeseleccionarPendienteCarrito} disabled={mostrarOk}>no, gracias</Button>
			<Button variant="contained" onClick={fnAnadirCarrito} disabled={mostrarOk}>Añadir</Button>
		</DialogActions>
	</Dialog>
}

export default function PantallaCatalogo() {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	let fnVerCarrito = React.useCallback(() => navigate('carrito', { replace: true }), [navigate]);
	let refPatronBusqueda = React.useRef();
	let fnEstablecerPatronBusqueda = React.useCallback(() => dispatch(setPatronBusqueda(refPatronBusqueda.current.value)), [dispatch]);
	let fnActualizaCatalogo = React.useCallback(() => dispatch(actualizarCatalogo()), [dispatch]);
	let fnTecla = React.useCallback((e) => e.keyCode === 13 && fnActualizaCatalogo(), [fnActualizaCatalogo])

	const estadoCatalogo = useSelector(state => state.catalogo.estado);
	const materiales = useSelector(state => state.catalogo.materiales);
	const error = useSelector(state => state.catalogo.error);


	const carrito = useSelector(state => state.carrito.materiales);


	let contenido = null;

	if (estadoCatalogo === 'cargando') {
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
					<Badge color="primary" overlap="circular" badgeContent={carrito.length} max={99} sx={{ ml: 2 }}>
						<IconButton color="secondary" component="span" sx={{ height: 50, width: 50 }} onClick={fnVerCarrito} disabled={!carrito.length}>
							<ShoppingCartIcon sx={{ height: 42, width: 42 }} />
						</IconButton>
					</Badge>
				</Grid>
			</Grid>

			{contenido}

			<DialogoDetalleArticulo />
			<DialogoAnadirCarrito />

		</Box>
	)


}