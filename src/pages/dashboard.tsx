import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import dynamic from 'next/dynamic';
import { series, options} from '../config/chartConfig';

const Charts = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

const Dashboard: React.FC = () => {
  return (
    <Flex direction="column">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
          <Box 
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            <Charts options={options} series={series} type="area" height={160} />
          </Box>
          <Box 
             p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
            <Charts options={options} series={series} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export default Dashboard;