import { Alert, Box, Button, Chip, CircularProgress, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { limpiarEstadoCreacionPedido, realizarCompra, reiniciarEstadoCarrito, setMaterialEnCarrito } from "redux/api/carritoSlice";


const LineaArticulo = ({ codigo, nombre, descripcion, stock, precio, imagen, cantidad }) => {

	const dispatch = useDispatch();
	const refCantidad = React.useRef(cantidad);
	const fnActualizarCarrito = React.useCallback((e) => {
		let valor = parseInt(e.target.value);
		if (!valor && valor !== '') e.target.value = 1;
		else if (valor < 0) e.target.value = e.target.value * -1;
		else e.target.value = valor;

		if (valor > stock) e.target.value = stock;
		dispatch(setMaterialEnCarrito({ codigo, nombre, descripcion, stock, precio, imagen, cantidad: parseInt(e.target.value) }))
	}, [dispatch, codigo, nombre, descripcion, stock, precio, imagen])
	const fnEliminarCarrito = React.useCallback(() => {
		dispatch(setMaterialEnCarrito({ codigo, nombre, descripcion, stock, precio, imagen }))
	}, [dispatch, codigo, nombre, descripcion, stock, precio, imagen])

	const fnControlOnBlur = (e) => {
		if (!e.target.value?.trim().length) {
			e.preventDetault();
		}
	}


	return <Paper elevation={3} square sx={{ height: 130, pt: 2, mb: 2 }}>
		<Grid container sx={{ height: 130 }}>
			<Grid item xs={2} sx={{ textAlign: 'center', verticalAlign: 'center' }}>
				<img alt="" src={imagen} style={{ maxWidth: '100px', maxHeight: '100px' }} />
			</Grid>
			<Grid item xs={8}>
				<Typography variant="caption" component="div">{codigo}</Typography>
				<Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>{nombre}</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-end' }}>
					<Typography variant="body2" sx={{ alignSelf: 'flex-end', fontSize: '110%' }}>{(cantidad * precio).toFixed(2)}€</Typography>
					{cantidad > 1 &&
						<Typography variant="body2" sx={{ color: 'text.disabled', alignSelf: 'flex-end', fontSize: '90%', ml: 2 }}>
							{cantidad} unidad{cantidad !== 1 && 'es'} a {precio}€/ud`
						</Typography>
					}
				</Box>

				<Typography variant="body2" component="div" sx={{ clear: 'both', float: 'right', color: 'text.disabled', fontSize: '80%', mr: 2, mt: 2 }}>{stock} unidad{stock !== 1 && 'es'} en stock</Typography>

			</Grid>
			<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', pb: 4 }}>
				<TextField
					inputRef={refCantidad}
					defaultValue={cantidad}
					onChange={fnActualizarCarrito}
					onBlur={fnControlOnBlur}
					label="Cantidad"
					type="number"
					variant="outlined"
					color="secondary"
					size="small"
					sx={{ width: '8ch' }}
					InputLabelProps={{ shrink: true }}
				/>
				<IconButton onClick={fnEliminarCarrito}>
					<DeleteIcon />
				</IconButton>



			</Grid>
		</Grid>
	</Paper>
}

export default function PantallaCarrito() {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	let fnIrCatalogo = React.useCallback((opciones = {}) => {
		let { limpiarCarrito } = opciones;
		if (limpiarCarrito) dispatch(reiniciarEstadoCarrito())
		navigate('catalogo', { replace: true })
	}, [dispatch, navigate]);

	const contenidoCarrito = useSelector(state => state.carrito.materiales);
	const estadoCreacionPedido = useSelector(state => state.carrito.estado);
	const errorCreacionPedido = useSelector(state => state.carrito.error);
	const resultadoCreacionPedido = useSelector(state => state.carrito.resultado);

	const resumenCarrito = React.useMemo(() => {
		if (!contenidoCarrito?.length) return {
			materiales: 'Carrito vacio',
			total: 0
		}
		let clon = [...contenidoCarrito];
		clon.sort((a, b) => parseInt(a.codigo) - parseInt(b.codigo));
		return {
			materiales: clon.map(material => <LineaArticulo key={material.codigo} {...material} />),
			total: clon.reduce((v, m) => v + m.precio * m.cantidad, 0).toFixed(2)
		}
	}, [contenidoCarrito])



	if (resultadoCreacionPedido) {
		return <Box sx={{ display: 'flex', flexDirection: 'column', mt: 4 }}>
			<CheckCircleOutlineIcon color="success" sx={{ mx: 'auto', width: '100px', height: '100px' }} />
			<Typography variant="caption" component="div" sx={{ fontSize: '110%', mx: 'auto', mt: 3, textAlign: 'center', fontWeight: 'bold' }}>
				Su pedido se ha registrado correctamente
			</Typography>
			<Typography variant="caption" component="div" sx={{ fontSize: '105%', mx: 'auto', textAlign: 'center' }}>
				El número de su pedido es:
			</Typography>

			<Box sx={{ mx: 'auto', mt: 2 }}>
				<Chip color="primary" label={resultadoCreacionPedido.numeroPedido.toUpperCase()} variant="filled" sx={{ fontSize: '105%', fontFamily: 'consolas, monospace' }} />
			</Box>
			<Button
				variant="outlined"
				color="secondary"
				onClick={() => fnIrCatalogo({ limpiarCarrito: true })}
				sx={{ mt: 6, mx: 'auto' }}
				startIcon={<ArrowBackIcon />}
			>
				Volver al catálogo
			</Button>
		</Box>
	}


	return (
		<Grid container spacing={2} sx={{ flexGrow: 1, mx: 4 }}>
			<Grid item xs={8}>
				<Typography variant="h5" sx={{ mb: 2 }}>Resumen del pedido</Typography>
				{resumenCarrito.materiales}
			</Grid>
			<Grid item xs={4}>

				<Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 6 }}>
					<Typography sx={{ fontSize: '140%' }}>
						Precio total:
					</Typography>
					<Typography sx={{ color: 'text.primary', fontWeight: 'bold', ml: 1, fontSize: '140%' }}>
						{resumenCarrito.total}
					</Typography>
					<Typography sx={{ fontWeight: 'bold', fontSize: '140%' }}>
						€
					</Typography>
				</Box>
				<Button
					fullWidth
					variant="contained"
					onClick={() => dispatch(realizarCompra())}
					sx={{ mt: 2 }}
					startIcon={<SendIcon />}
					disabled={estadoCreacionPedido === 'cargando'}
				>
					Realizar pedido
				</Button>
				<Button
					fullWidth
					variant="outlined"
					onClick={fnIrCatalogo}
					color="secondary"
					sx={{ mt: 2 }}
					disabled={estadoCreacionPedido === 'cargando'}
					startIcon={<ArrowBackIcon />}
				>
					Volver al catálogo
				</Button>

				{estadoCreacionPedido === 'cargando' &&
					<Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
						<div><CircularProgress /></div>
						<Typography sx={{ ml: 2, mt: 0.5 }} variant="h6" component="div">Creando pedido</Typography>
					</Box>
				}

				{errorCreacionPedido &&
					<Alert severity="error" sx={{ mt: 4 }} onClose={() => dispatch(limpiarEstadoCreacionPedido())}>
						<strong>Se ha producido un error:</strong>

						{errorCreacionPedido.map((error, i) => <div key={i}>• {error.descripcion} <small>[{error.codigo}]</small></div>)}
					</Alert>
				}
			</Grid>

		</Grid>
	)


}