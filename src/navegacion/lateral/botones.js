import VpnKey from "@mui/icons-material/VpnKey";
import Business from "@mui/icons-material/Business";
import CallSplit from "@mui/icons-material/CallSplit";
import Input from "@mui/icons-material/Input";
import Dashboard from "@mui/icons-material/Dashboard";
import NearMe from "@mui/icons-material/NearMe";
import Speed from "@mui/icons-material/Speed";
import Storage from "@mui/icons-material/Storage";
import Security from "@mui/icons-material/Security";
import AssessmentIcon from '@mui/icons-material/Assessment';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';



const botones = [

	{ texto: "Inicio", icono: Dashboard, link: '/' },

	{ texto: "personal", esTitulo: true },
	{ texto: "Mis nóminas", icono: LocalGroceryStoreIcon, link: '/nomina' },
	{
		texto: "Vales de empleado", icono: CallSplit, subMenu: [
			{ texto: "Crear vale", icono: Input, link: '/vales/catalogo' },
			{ texto: "Consultar", icono: Storage, link: '/vales/consulta' },
		]
	},	
	{
		texto: "IRPF", icono: CallSplit, subMenu: [
			{ texto: "Situación", icono: Input, link: '/irpf/situacion' },
			{ texto: "Modelo 145", icono: Input, link: '/irpf/mod145' },
			{ texto: "Incremento Voluntario", icono: Storage, link: '/irpf/incremento' },
			{ texto: "Certificado de Retenciones", icono: Storage, link: '/irpf/incremento' },
		]
	},	
	


]

export default botones;