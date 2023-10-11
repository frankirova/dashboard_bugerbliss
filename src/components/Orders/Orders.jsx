import {
  Button,
  Tag,
  Flex,
  HStack,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { order } from "../../supabase/orders";
import { AddProductFormButton } from "../Modals/AddProduct/AddProductButton";
import { EditProductButton } from "../Modals/UpdateProduct/EditProductButton";
import { DeleteProductButton } from "../Modals/DeleteProduct/DeleteProductButton";

import { supabase } from "../../supabase/config";
import { DownloadIcon } from "../../icons/DownloadIcon";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(AuthContext);
  console.log(user);
  if (!user) {
    return <Box bg={'secondary'} minH={24} minW={24}>Tenes que iniciar sesion pa</Box>
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderList = await order.list(currentPage);
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [currentPage]);
  const handleSub = () => {
    const subscription = supabase
      .channel("new_channel_for_order")
      .on(
        "postgres_changes",
        { event: "*", shcema: "public", table: "orders" },
        (payload) => {
          console.log([...orders, payload.new]);
          setOrders([payload.new, ...orders]);
        }
      )
      .subscribe();
  };
  handleSub();
  const tHead = orders.length > 0 ? Object.keys(orders[0]) : [];

  const formatDate = (fechaOriginal) => {
    // Crear un objeto Date a partir de la cadena de fecha original
    const fecha = new Date(fechaOriginal);

    // Obtener los componentes de la fecha
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Agregar ceros a la izquierda si es necesario
    const dia = String(fecha.getDate()).padStart(2, "0");
    const horas = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");
    const segundos = String(fecha.getSeconds()).padStart(2, "0");

    // Formatear la fecha en el nuevo formato
    const fechaFormateada = `${dia}-${mes}-${año} ${horas}:${minutos}:${segundos}`;

    return fechaFormateada; // Salida: "2023-10-10 12:47:41"
  };

  if (!orders) return;
  if (!tHead) return;

  return (
    <Flex direction="column" width="100%" gap={4}>
      <Heading textAlign="center" py={8}>
        Ordenes del dia
      </Heading>
      <HStack spacing={4} justifyContent="center">
        <Button onClick={() => order.download()}>
          <DownloadIcon />
        </Button>
        {/* <AddProductFormButton /> */}
      </HStack>
      <Flex p={4}>
        <TableContainer>
          <Table variant="striped" colorScheme="tertiary">
            <Thead>
              <Tr>
                {tHead.map((key) => (
                  <Th key={key}>{key}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order.id}>
                  <Td>{order.id}</Td>
                  <Td>{formatDate(order.created_at)}</Td>
                  <Td>{order.buyer.email}</Td>
                  <Td>
                    {order.items.map((item) => (
                      <Flex direction="column" border="1px" p={4} key={item.id}>
                        <Text>
                          {item.name} X {item.quantity}
                        </Text>
                      </Flex>
                    ))}
                  </Td>
                  <Td>{order.total}</Td>
                  <Td>
                    <Image src={order.image} width="64px" />
                  </Td>
                  <Td>
                    <Button color="secondary" bg="primary">
                      <EditProductButton productId={order.id} />
                    </Button>
                  </Td>
                  <Td>
                    <Button>
                      <DeleteProductButton productId={order.id} />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <HStack justify={"center"} py={4}>
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Página anterior
        </Button>
        <Tag size="lg">{currentPage}</Tag>
        <Button onClick={() => setCurrentPage(currentPage + 1)}>
          Página siguiente
        </Button>
      </HStack>
    </Flex>
  );
};
