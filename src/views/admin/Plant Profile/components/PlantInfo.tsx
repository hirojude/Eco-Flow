import React from 'react';
import { Image, Text, Progress, VStack, Divider, useTheme } from '@chakra-ui/react';
import plantImages from '../../../../assets/plantImages'; // Adjust the path as needed
import CustomCard from '../../../../components/card/Card';
// import CustomCard from '../../components/card/Card';
import CropPic from '../../../../assets/img/layout/back 2.jpg'

interface PlantInfoProps {
  name: string;
  growthStage: string;
  progress: number;
  image: string;
}

const PlantInfo: React.FC<PlantInfoProps> = ({ name, growthStage, progress }) => {
  const theme = useTheme();
  const image = plantImages[name] || CropPic.default; // Default image if not found

  return (
    <CustomCard
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p={4}
    >
      <Image
        src={image}
        alt={name}
        borderRadius="md"
        mb={4}
        objectFit="cover"
        height="200px"
        width="100%"
      />
      <VStack align="start" spacing={2} mb={4}>
        <Text fontSize="2xl" fontWeight="bold">{name}</Text>
        <Text fontSize="lg" color={theme.colors.gray[600]}>{growthStage}</Text>
      </VStack>
      <Divider mb={4} />
      <Text mb={2} fontSize="sm" color={theme.colors.gray[500]}>Growth Progress</Text>
      <Progress value={progress} colorScheme="teal" size="lg" />
    </CustomCard>
  );
};

export default PlantInfo;
