import { Box, Typography } from "@mui/material";


export default function PantallaJustificacionGastosDesplazamiento() {
	return <>
		<Box sx={{ m: 'auto' }}>
			<Typography variant="h4" sx={{ m: 'auto', mb: 2 }}>Justificación de Gastos por Desplazamiento</Typography>
		</Box>
		<Box sx={{ textAlign: { sm: 'justify' } }}>
			<Typography>
				Aquí puedes encontrar la Normativa aplicable a la justificación de gastos por desplamiento con ocasión del trabajo.

				Desde 01.02.2020 la herramienta a través de la cual se gestiona la justificación es la App móvil DevoluIVA, que facilita el envío y aprobación de los gastos evitando el uso de papel y la mecanización manual de los tickets.



				Normativa de Justificación de gastos (vigente desde 01.02.2020)

				Esta Normativa incluye Anexos como guía rápida del uso de la App.



				Puedes consultar el manual completo de esta herramienta a través de este enlace: Manual uso App DevoluIVA (también disponible en UNHEF).





				Preguntas frecuentes

				¿Qué hago si tengo un ticket de fecha anterior a 01.02.2020?
				Debes tramitarlo con el procedimiento tradicional. Rellena este formulario, fírmalo y entrégalo junto al ticket a tu responsable para su validación.

				Formulario de Justificación de gastos (válido para gastos generados hasta el 31.01.2020)



				Hace mucho tiempo o nunca he tramitado gastos, ¿dónde me dirijo para solicitar el acceso a DevoluIVA?
				Si no tienes asignado correo corporativo, puedes usar una dirección de correo personal. Cumplimenta este formulario y hazlo llegar a departamento.personal@hefame.es
				Si tienes correo corporativo, envía un email a farmacuenta@hefame.es solicitando el acceso.
				En un breve espacio de tiempo te llegará un email con la invitación a la herramienta.
			</Typography>
		</Box>
	</>
}