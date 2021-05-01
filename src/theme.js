import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

const theme = unstable_createMuiStrictModeTheme({
	// createMuiTheme({
	staus: {},
	palette: {
		primary: {
			light: '#78ecb3',
			main: '#42b983',
			dark: '#008856',
		},
		secondary: {
			light: '#be9c91',
			main: '#8d6e63',
			dark: '#5f4339',
		},
		background: {
			paper: 'white',
			default: 'white',
		},
	},
	typography: {
		htmlFontSize: 10,
		fontFamily: '"Sunflower", "Roboto", "Helvetica", "Arial", "sans-serif"',
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	},
	props: {
		MuiTextField: {
			variant: 'outlined',
			size: 'small',
			maxLength: 64,
		},
		MuiButton: {
			variant: 'contained',
			color: 'primary',
			style: {
				fontWeight: 'bold',
			},
		},
		MuiLink: {
			style: {
				fontWeight: 'bold',
				cursor: 'pointer',
			},
		},
	},
});

export default theme;
