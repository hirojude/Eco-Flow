/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Flex } from '@chakra-ui/react';
// import React from 'react';

const HSeparator = (props: { variant?: string; [x: string]: any }) => {
	const { variant, ...rest } = props;
	return <Flex h='1px' w='100%' bg='linear-gradient(135deg, #A3E4A1 0%, #27AE60 100%)' {...rest} />;
};

const VSeparator = (props: { variant?: string; [x: string]: any }) => {
	const { variant, ...rest } = props;
	return <Flex w='1px' bg='brand.500' {...rest} color='brand.500' />;
};

export { HSeparator, VSeparator };
