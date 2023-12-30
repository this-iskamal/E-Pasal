import React , {useState} from 'react';
import { Box, Button, Text, Flex, IconButton, Tooltip, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { removeAuthToken, useAuth } from '../../utils/JWT';
import { FaUsers, FaCog } from 'react-icons/fa';
import SuperUserDashboard from './SuperUserDashboard';
import ManageSellers from './ManageSellers';

const AdminPage = () => {
  const isPerson = useAuth();
  const [showSellers,setShowSellers] = useState(false);

  const handlelogoutclick = () => {
    removeAuthToken();
    window.open('/registration','_self');
  };

  return (<>
    <Box bg="teal.500" color="white" py={4} px={8}>
      <Flex align="center">
        
        <Text fontSize="xl" fontWeight="bold">
          Admin Panel
        </Text>
    
        <Flex ml="auto" align="center">
          {isPerson && (
            <Menu>
              <MenuButton as={IconButton} icon={<FaCog />} colorScheme="whiteAlpha" aria-label="Settings" variant="outline" />
              <MenuList  className='text-black shadow-md'> {/* Adjust the background color here */}
                <MenuItem as="span" className='cursor-pointer' icon={<FaUsers />} onClick={() => setShowSellers(!showSellers)}>
                  Manage Sellers
                </MenuItem>
                <MenuItem as="span" className='cursor-pointer' icon={<FaUsers />} onClick={() => console.log('Manage Customers')}>
                  Manage Customers
                </MenuItem>
                {/* Add more menu items as needed */}
              </MenuList>
            </Menu>
          )}
          <Button ml={4} colorScheme="whiteAlpha" onClick={handlelogoutclick}>
            Logout
          </Button>
        </Flex>
      </Flex>
      
    </Box>
    {
      showSellers? <ManageSellers/>:null
    }
      
    </>
  );
};

export default AdminPage;
