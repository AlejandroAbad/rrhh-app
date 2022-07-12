import { Badge, Box, Button, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, TextField } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import React from "react";
import { useNavigate } from "react-router";






export default function PantallaCatalogo() {

	const navigate = useNavigate();
	let fnVerCarrito = React.useCallback(() => {
		navigate('carrito', { replace: true })
	}, [navigate]);

	return (
		<Box sx={{ flexGrow: 1, mx: 4 }}>
			<Grid container spacing={2}>
				<Grid item xs={11}>
					<FormControl fullWidth variant="outlined"  >
						<InputLabel htmlFor="standard-adornment-password">Búsqueda de artículos</InputLabel>
						<Input
							id="standard-adornment-password"
							type="text"
							fullWidth
							endAdornment={
								<InputAdornment position="end">
									<IconButton edge="end" sx={{ mb: 2, mr: 0 }}  >
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
		</Box>
	)


}