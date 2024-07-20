import { Avatar, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Card from '../../../../components/card/Card';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function Banner(props: {
    banner: string;
    // avatar: string;
    fields: number;
    sensornum: number | string;
    cropnum: number | string;
    [x: string]: unknown;
}) {
    const [userName, setUserName] = useState('');
    const [location, setLocation] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        const fetchUserData = async (userId: string) => {
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserName(`${userData.firstName} ${userData.lastName}`);
                setLocation(userData.location);
                if (userData.avatar) {
                    setAvatarUrl(userData.avatar);
                }
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserData(user.uid);
                setAvatarUrl(user.photoURL || ''); // Use Google account photo if available
            } else {
                setUserName('');
                setLocation('');
                setAvatarUrl('');
            }
        });

        return () => unsubscribe();
    }, []);

    const { banner, fields, cropnum, sensornum, ...rest } = props;
    // Chakra Color Mode
    const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
    const textColorSecondary = 'gray.400';
    const borderColor = useColorModeValue('white !important', '#111C44 !important');

    return (
        <Card mb={{ base: '0px', lg: '20px' }} alignItems='center' {...rest}>
            <Box bg={`url(${banner})`} bgSize='cover' borderRadius='16px' h='131px' w='100%' />
            <Avatar mx='auto' src={avatarUrl } name={userName} h='87px' w='87px' mt='-43px' border='4px solid' borderColor={borderColor} bg='#6FCF97' />
            <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
                {userName}
            </Text>
            <Text color={textColorSecondary} fontSize='sm'>
                {location}
            </Text>
            <Flex w='max-content' mx='auto' mt='26px'>
                <Flex mx='auto' me='60px' alignItems='center' flexDirection='column'>
                    <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
                        {fields}
                    </Text>
                    <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
                        Farm Fields
                    </Text>
                </Flex>
                <Flex mx='auto' me='60px' alignItems='center' flexDirection='column'>
                    <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
                        {cropnum}
                    </Text>
                    <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
                        Crops
                    </Text>
                </Flex>
                <Flex mx='auto' alignItems='center' flexDirection='column'>
                    <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
                        {sensornum}
                    </Text>
                    <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
                        Sensors
                    </Text>
                </Flex>
            </Flex>
        </Card>
    );
}
