import { Box, Button, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { realizarCompra, setMaterialEnCarrito } from "redux/api/carritoSlice";


const LineaArticulo = ({ codigo, nombre, descripcion, stock, precio, imagen, cantidad }) => {

	const dispatch = useDispatch();
	const refCantidad = React.useRef(cantidad);
	const fnActualizarCarrito = React.useCallback((e) => {
		let valor = parseInt(e.target.value);
		if (!valor && valor !== '') e.target.value = 1;
		else if (valor < 0) e.target.value = e.target.value * -1;
		else e.target.value = valor;
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
				<Typography variant="body1" component="div">{nombre}</Typography>
				<Typography variant="body2" component="div">{(cantidad * precio).toFixed(2)}€ ({precio}€/ud)</Typography>
				<Typography variant="body2" component="div">{cantidad} unidades</Typography>
			</Grid>
			<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
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
	let fnIrCatalogo = React.useCallback(() => {
		navigate('catalogo', { replace: true })
	}, [navigate]);

	const contenidoCarrito = useSelector(state => state.carrito.materiales);

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
				>
					Realizar pedido
				</Button>
				<Button fullWidth variant="outlined" onClick={fnIrCatalogo} color="secondary" sx={{ mt: 2 }}>Volver</Button>
			</Grid>

		</Grid>
	)


}