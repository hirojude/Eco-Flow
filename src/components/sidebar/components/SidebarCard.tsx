import { Button, Flex, Link, Text, useColorModeValue } from '@chakra-ui/react';
// import logoWhite from '../../../assets/img/layout/logoWhite.png';

export default function SidebarDocs() {
	const bgColor = 'linear-gradient(135deg, #A3E4A1 0%, #27AE60 100%)';

	const borderColor = useColorModeValue('white', 'navy.800');

	return (
		<Flex
			justify='center'
			direction='column'
			align='center'
			bg={bgColor}
			borderRadius='30px'
			me={{ base: '20px' }}
			position='relative'>
			<Flex
				border='5px solid'
				borderColor={borderColor}
				bg='linear-gradient(135deg, #A3E4A1 0%, #27AE60 100%)'
				borderRadius='50%'
				w='94px'
				h='94px'
				align='center'
				justify='center'
				mx='auto'
				position='absolute'
				left='50%'
				top='-47px'
				transform='translate(-50%, 0%)'
				display='none'>
				
				{/* <Image src={logoWhite} w='40px' h='40px' /> */}
			</Flex>
			<Flex direction='column' mb='12px' align='center' justify='center' px='15px' pt='55px'>
				<Text
					fontSize={{ base: 'lg', xl: '18px' }}
					color='white'
					fontWeight='bold'
					lineHeight='150%'
					textAlign='center'
					px='10px'
					mb='14px'>
					Sart Irrigation
				</Text>
				<Text fontSize='14px' color={'white'} px='10px' mb='14px' textAlign='center'>
					Override and Start Irrigation
				</Text>
			</Flex>
			<Link href=''>
				<Button
					bg='whiteAlpha.300'
					_hover={{ bg: 'whiteAlpha.200' }}
					_active={{ bg: 'whiteAlpha.100' }}
					mb={{ sm: '16px', xl: '24px' }}
					color={'white'}
					fontWeight='regular'
					fontSize='sm'
					minW='185px'
					mx='auto'>
					Start Now
				</Button>
			</Link>
		</Flex>
	);
}
