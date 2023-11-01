import {
  Button,
  Box,
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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverFooter,
  Select,
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
import { ButtonAddOffCustomer } from "../Modals/AddOffCustomers/ButtonAddOffCustomer";

export const Orders = () => {
  const navigate = useNavigate();
  const [orderStates, setOrderStates] = useState({});
  const [otherData, setOtherData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(AuthContext);
  console.log(orders);

  if (!user) {
    return (
      <Box bg={"secondary"} minH={24} minW={24}>
        Tenes que iniciar sesion pa
      </Box>
    );
  }

  const options = [
    { value: "no-leido", label: "No leído", color: "red.500" },
    { value: "produccion", label: "En producción", color: "orange.500" },
    { value: "entregado", label: "Entregado", color: "green.500" },
  ];

  const handleStatusChange = (orderId, value) => {
    setOrderStates((prevOrderStates) => {
      // Copia el estado anterior
      const updatedOrderStates = { ...prevOrderStates };
      // Actualiza el estado de la orden específica
      updatedOrderStates[orderId] = { value: value, id: orderId };
      return updatedOrderStates;
    });
    order.updateStateOrder(orderId, value);
    setOtherData(new Date());
    // setTimeout(fetchData()), 2000;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const orderList = await order.list(currentPage);
        setOrders(orderList);
        console.log("useEffect");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [currentPage, orderStates, setOtherData]);

  // const handleSub = () => {
  //   const subscription = supabase
  //     .channel("new_channel_for_order")
  //     .on(
  //       "postgres_changes",
  //       { event: "*", shcema: "public", table: "orders" },
  //       (payload) => {
  //         // console.log([...orders, payload.new]);
  //         setOrders([payload.new, ...orders]);
  //         // setOrders([payload.new]);

  //       }
  //     )
  //     .subscribe();
  // };
  // handleSub();

  const handleSub = () => {
    const subscription = supabase
      .channel("new_channel_for_order")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          // Verifica si el nuevo elemento ya existe en la lista
          const isNewOrderDuplicate = orders.find(
            (order) => order.id === payload.new.id
          );

          if (!isNewOrderDuplicate) {
            console.log("nodup");
            // Si no es un duplicado, agrega el nuevo elemento al inicio de la lista
            setOrders([payload.new, ...orders]);
          }
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
        <ButtonAddOffCustomer />
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

                  {/* <Td>
                    <Flex alignItems="center">
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            variant="outline"
                            size="sm"
                            textAlign="left"
                            leftIcon={
                              <Box
                                as="span"
                                boxSize="20px"
                                borderRadius="50%"
                                backgroundColor={getStatusColor(order)}
                                display="inline-block"
                                marginRight="5px"
                              />
                            }
                          >
                            {order.state}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Estado de la orden</PopoverHeader>
                          <PopoverBody>
                            {options.map((option) => (
                              <Button
                                key={option.value}
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleStatusChange(order.id, option.value)
                                }
                                justifyContent="start"
                              >
                                <Flex alignItems="center">
                                  <Box
                                    as="span"
                                    boxSize="20px"
                                    borderRadius="50%"
                                    backgroundColor={option.color}
                                    display="inline-block"
                                    marginRight="5px"
                                  />
                                  {option.label}
                                </Flex>
                              </Button>
                            ))}
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </Flex>
                  </Td> */}

                  <Select
                    value={order.state}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    {options.map((status) => (
                      <option key={status.label} value={status.label}>
                        {status.label}
                      </option>
                    ))}
                  </Select>

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
