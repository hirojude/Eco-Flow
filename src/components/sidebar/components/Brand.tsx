// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';

// Custom components
// import { HorizonLogo } from '../../icons/Icons';
import { HSeparator } from '../../separator/Separator';
import Logo from '../../Logo';

export function SidebarBrand() {
	//   Chakra color mode
	const logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Logo h='50px' w='175px' my='32px'ml={-5} color={logoColor} />
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
