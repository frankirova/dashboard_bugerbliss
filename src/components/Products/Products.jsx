import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { product } from "../../supabase/products";
import { AddProductFormButton } from "../Modals/AddProduct/AddProductButton";
import { EditProductButton } from "../Modals/UpdateProduct/EditProductButton";
import { DeleteProductButton } from "../Modals/DeleteProduct/DeleteProductButton";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productList = await product.list();
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const tHead = products.length > 0 ? Object.keys(products[0]) : [];

  if (!user) {
    return (
      <Flex justify={"center"} minH={"85vh"}>
        <Flex
          fontWeight={"bold"}
          align={"center"}
          justify={"center"}
          bg={"secondary"}
          color={"primary"}
          fontSize={"8xl"}
          minH={24}
          minW={24}
        >
          Tenes que iniciar sesion pa
        </Flex>
      </Flex>
    );
  }
  return (
    <Flex direction="column" maxWidth="100vw" minH={"100vh"}>
      <Heading textAlign="center" py={8}>
        Productos
      </Heading>
      <Center>
        <AddProductFormButton />
      </Center>
      <Flex p={4}>
        <TableContainer>
          <Table variant="striped" colorScheme="tertiary">
            <Thead>
              <Tr>
                {tHead.map((key) => (
                  <Th key={key} border="1px solid" borderColor="gray.300">
                    {key}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {products.map((prod) => (
                <Tr key={prod.id}>
                  <Td border="1px solid" borderColor="gray.300">
                    {prod.created_at}
                  </Td>
                  <Td border="1px solid" borderColor="gray.300">
                    {prod.name}
                  </Td>
                  <Td border="1px solid" borderColor="gray.300">
                    {prod.price}
                  </Td>
                  <Td border="1px solid" borderColor="gray.300">
                    {prod.stock}
                  </Td>
                  <Td border="1px solid" borderColor="gray.300">
                    <Image src={prod.url} width="64px" />
                  </Td>
                  <Td border="1px solid" borderColor="gray.300">
                    {prod.id}
                  </Td>
                  <Td border="1px solid" borderColor="gray.300">
                    <Button color="secondary" bg="primary">
                      <EditProductButton productId={prod.id} />
                    </Button>
                  </Td>
                  <Td border="1px solid" borderColor="gray.300">
                    <Button>
                      <DeleteProductButton productId={prod.id} />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
};
