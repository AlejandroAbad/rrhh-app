import React from "react";
import { useNavigate } from "react-router";

import { Alert, Badge, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Link, Paper, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { actualizarCatalogo, setMaterialSeleccionado, setPatronBusqueda } from "redux/api/catalogoSlice";
import { addMaterialEnCarrito, setMaterialEnCarrito } from "redux/api/carritoSlice";



const LineaArticulo = ({ codigo, nombre, stock, precio, imagen }) => {

	const dispatch = useDispatch();
	const fnSeleccionarMaterial = React.useCallback(() => { dispatch(setMaterialSeleccionado(codigo)) }, [dispatch, codigo]);

	return <Grid item xs={6} >
		<Paper elevation={1} square sx={{ height: 130, pt: 2, cursor: 'pointer' }} onClick={fnSeleccionarMaterial}>
			<Grid container sx={{ height: 130 }}>
				<Grid item xs={3} sx={{ textAlign: 'center', verticalAlign: 'center' }}>
					<img alt="" src={imagen} style={{ maxWidth: '100px', maxHeight: '100px' }} />
				</Grid>
				<Grid item xs={9}>
					<Typography variant="caption" component="div">{codigo}</Typography>
					<Typography variant="body1" component="div">{nombre}</Typography>
					<Typography variant="body2" component="div">{precio} €</Typography>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 3, mt: 3 }}>
						<Typography variant="body2" component="div" sx={{ color: stock ? 'text.disabled' : 'error.main', fontSize: '80%' }}>
							{stock ?
								`${stock} unidad${stock !== 1 && 'es'} en stock`
								:
								'Fuera de stock'
							}
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	</Grid>
}

const DialogoDetalleArticulo = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [mostrarOk, setMostrarOk] = React.useState(0);
	const refTimeout = React.useRef(null);
	const refCantidad = React.useRef(1);
	const materialSeleccionado = useSelector(state => state.catalogo.materialSeleccionado);
	const almacenSuministro = useSelector(state => state.api.usuario.datos.werks);

	React.useEffect(() => {
		setMostrarOk(0);
		if (refTimeout.current) clearTimeout(refTimeout.current);
		refTimeout.current = null;
	}, [materialSeleccionado])


	const fnDeseleccionarMaterial = React.useCallback(() => {
		dispatch(setMaterialSeleccionado(null))
	}, [dispatch])
	const fnVerCarrito = React.useCallback(() => {
		navigate('/vales/carrito', { replace: true });
		fnDeseleccionarMaterial();
	}, [navigate, fnDeseleccionarMaterial]);
	const fnAnadirCarrito = React.useCallback(() => {
		dispatch(addMaterialEnCarrito({ cantidad: Math.max(+refCantidad.current.value, 1), ...materialSeleccionado }))
		setMostrarOk(Math.max(+refCantidad.current.value, 1));
		if (refTimeout.current) clearTimeout(refTimeout.current);
		refTimeout.current = setTimeout(() => {
			setMostrarOk(0);
			refTimeout.current = null;
		}, 2500)
	}, [dispatch, materialSeleccionado, setMostrarOk])
	const fnEliminarCarrito = React.useCallback(() => {
		dispatch(setMaterialEnCarrito({ ...materialSeleccionado }))
		setMostrarOk(-1);
		if (refTimeout.current) clearTimeout(refTimeout.current);
		refTimeout.current = setTimeout(() => {
			setMostrarOk(0);
			refTimeout.current = null;
		}, 2500)
	}, [dispatch, materialSeleccionado, setMostrarOk])

	const contenidoCarrito = useSelector(state => state.carrito.materiales);
	const memoCantidadActual = React.useMemo(() => {
		if (!materialSeleccionado?.codigo) return 0;
		let material = contenidoCarrito.find(m => m.codigo === materialSeleccionado.codigo);
		if (material) return material.cantidad;
		return 0;
	}, [contenidoCarrito, materialSeleccionado])

	const fnControlInputPositivo = (e) => {
		if (e.target.value?.trim().length) {
			let valor = parseInt(e.target.value);
			if (!valor && valor !== '') e.target.value = 1;
			else if (valor < 0) e.target.value = e.target.value * -1;
			else e.target.value = valor;

			if (valor > materialSeleccionado.stock) e.target.value = materialSeleccionado.stock;
		}
	}
	const fnControlOnBlur = (e) => {
		if (!e.target.value?.trim().length) {
			e.preventDefault();
			e.target.value = 1;
		}
	}


	let descripcion = (materialSeleccionado?.descripcion.startsWith('"') && materialSeleccionado?.descripcion.endsWith('"')) ?
		materialSeleccionado?.descripcion.substr(1, materialSeleccionado.descripcion.length - 2).trim()
		: materialSeleccionado?.descripcion;

	return <Dialog fullWidth maxWidth="lg" open={Boolean(materialSeleccionado)} onClose={fnDeseleccionarMaterial}			>

		<DialogContent>
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
						{
							materialSeleccionado?.stock > 0 ?
								<>
									<TextField
										inputRef={refCantidad}
										defaultValue={1}
										onChange={fnControlInputPositivo}
										onBlur={fnControlOnBlur}
										autoFocus
										label="Cantidad"
										type="number"
										variant="outlined"
										color="secondary"
										size="small"
										sx={{ width: '10ch', mr: 2, mt: 0.2 }}
										InputLabelProps={{ shrink: true }}
									/>


									<Button
										variant="contained"
										onClick={fnAnadirCarrito}
										startIcon={<AddShoppingCartIcon />}
										sx={{ pt: 1 }}
									>
										Añadir al carrito
									</Button>
								</>
								:
								<Button
									variant="outlined"
									startIcon={<RemoveShoppingCartIcon />}
									disabled
									sx={{ pt: 1 }}
								>
									No hay stock en tu almacén
								</Button>
						}
					</Box>

					{memoCantidadActual > 0 &&
						<>
							<Typography variant="caption" component="div" sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
								Actualmente tienes {memoCantidadActual} unidad{memoCantidadActual !== 1 && 'es'} en el carrito.
								<Link variant="caption" color="secondary" onClick={fnEliminarCarrito} sx={{ cursor: 'pointer' }}>Eliminarla{memoCantidadActual !== 1 && 's'}</Link>
							</Typography>

							<Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
								<Button
									variant="outlined"
									size="small"
									color="secondary"
									onClick={fnVerCarrito}
									startIcon={<ArrowForwardIcon />}
									sx={{ pl: 1.4 }}
								>
									Ir al carrito
								</Button>
							</Box>
						</>
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

			<Box sx={{ mt: 1, px: 4, fontSize: '90%', color: 'text.secondary', textAlign: 'justify' }}>
				<div dangerouslySetInnerHTML={{ __html: descripcion }} />
			</Box>

		</DialogContent>
		<DialogActions sx={{ mb: 2, mr: 2 }}>
			<Button variant="contained" color="info" onClick={fnDeseleccionarMaterial}>Cerrar</Button>
		</DialogActions>
	</Dialog >
}

export default function PantallaCatalogo() {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	let fnVerCarrito = React.useCallback(() => navigate('/vales/carrito', { replace: true }), [navigate]);
	let refPatronBusqueda = React.useRef();
	let fnEstablecerPatronBusqueda = React.useCallback(() => dispatch(setPatronBusqueda(refPatronBusqueda.current.value)), [dispatch]);
	let fnActualizaCatalogo = React.useCallback(() => dispatch(actualizarCatalogo()), [dispatch]);
	let fnTeclaFiltroPulsada = React.useCallback((e) => e.keyCode === 13 && fnActualizaCatalogo(), [fnActualizaCatalogo])

	const estadoCatalogo = useSelector(state => state.catalogo.estado);
	const materiales = useSelector(state => state.catalogo.materiales);
	const error = useSelector(state => state.catalogo.error);

	const carrito = useSelector(state => state.carrito.materiales);

	let contenido = null;
	if (estadoCatalogo === 'cargando') {
		contenido = <Box sx={{ mt: 18, display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
			<div><CircularProgress /></div>
			<Typography sx={{ ml: 2, mt: 0.5 }} variant="h6" component="div">Consultando catálogo</Typography>
		</Box>
	} else if (error) {
		contenido = JSON.stringify(error)
	} else if (materiales?.length > 0) {
		contenido = <Grid container spacing={2} sx={{ mt: 2 }}>
			{materiales.map(material => {
				return <LineaArticulo key={material.codigo} {...material} />
			})}
		</Grid>
	} else {
		if (estadoCatalogo === 'inicial') {
			contenido = <><Box sx={{ mt: 10, display: 'flex', justifyContent: 'flex-start', flexDirection: 'row' }}>
				<div><SwitchAccessShortcutIcon sx={{ width: '100px', height: '100px', color: 'text.disabled' }} /></div>
				<Typography sx={{ ml: 2, mt: 8, color: 'text.disabled' }} variant="h3" component="div">Busca algún artículo</Typography>

			</Box>
				<Typography sx={{ ml: 5, mt: 2, color: 'text.disabled' }} variant="body1" component="div">Por ejemplo: "IA gel", "Aloe vera" o "Tiritas"</Typography>
			</>
		} else {
			contenido = <Box sx={{ mt: 18, display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
				<div><SentimentVeryDissatisfiedIcon sx={{ width: '100px', height: '100px', color: 'text.disabled' }} /></div>
				<Typography sx={{ ml: 2, mt: 2.9, color: 'text.disabled' }} variant="h3" component="div">Sin resultados</Typography>
			</Box>
		}
	}


	return (
		<>
			<Grid container spacing={2} sx={{ position: 'fixed', width: '1155px', bgcolor: '#ffffff', top: 16, left: 26, pb: 2 }}>
				<Grid item xs={11}>
					<FormControl fullWidth variant="outlined" color="secondary"  >
						<InputLabel htmlFor="standard-adornment-password">Búsqueda de artículos</InputLabel>
						<Input
							inputRef={refPatronBusqueda}
							onChange={fnEstablecerPatronBusqueda}
							onKeyDown={fnTeclaFiltroPulsada}
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

			<Box sx={{ mt: 8 }}>
				{contenido}
			</Box>

			<DialogoDetalleArticulo />

		</>
	)


}