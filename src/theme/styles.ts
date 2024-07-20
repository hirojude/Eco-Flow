/* eslint-disable @typescript-eslint/no-explicit-any */
import { mode } from '@chakra-ui/theme-tools';

export const globalStyles = {
  colors: {
    brand: {
      100: '#E9F5E6', // Light Green
      200: '#A3E4A1', // Medium Green
      300: '#6FCF97', // Bright Green
      400: '#3DBE74', // Strong Green
      500: '#27AE60', // Primary Green
      600: '#219150', // Dark Green
      700: '#1B743E', // Darker Green
      800: '#14582E', // Deep Green
      900: '#0F4020'  // Deepest Green
    },
    brandScheme: {
      100: '#F4E9DB', // Light Beige
      200: '#E5C9A6', // Medium Beige
      300: '#D6AA72', // Warm Brown
      400: '#C7903E', // Vibrant Brown
      500: '#A36D26', // Primary Brown
      600: '#825321', // Dark Brown
      700: '#63401C', // Darker Brown
      800: '#4A3116', // Deep Brown
      900: '#33230F'  // Deepest Brown
    },
    secondaryGray: {
      100: '#E0E5F2',
      200: '#E1E9F8',
      300: '#F4F7FE',
      400: '#E9EDF7',
      500: '#8F9BBA',
      600: '#A3AED0',
      700: '#707EAE',
      800: '#707EAE',
      900: '#1B2559'
    },
    red: {
      100: '#FEEFEE',
      500: '#EE5D50',
      600: '#E31A1A'
    },
    blue: {
      50: '#EFF4FB',
      500: '#3965FF'
    },
    orange: {
      100: '#FFF6DA',
      500: '#FFB547'
    },
    green: {
      100: '#E6FAF5',
      500: '#27AE60' // Primary Green
    },
    navy: {
      50: '#d0dcfb',
      100: '#aac0fe',
      200: '#a3b9f8',
      300: '#728fea',
      400: '#3652ba',
      500: '#1b3bbb',
      600: '#24388a',
      700: '#1B254B',
      800: '#111c44',
      900: '#0b1437'
    },
    gray: {
      100: '#FAFCFE'
    }
  },
  styles: {
    global: (props: any) => ({
      body: {
        overflowX: 'hidden',
        bg: mode('secondaryGray.300', 'navy.900')(props), // Adjusted main background color
        fontFamily: 'DM Sans',
        letterSpacing: '-0.5px'
      },
      input: {
        color: 'gray.700'
      },
      html: {
        fontFamily: 'DM Sans'
      }
    })
  }
};
