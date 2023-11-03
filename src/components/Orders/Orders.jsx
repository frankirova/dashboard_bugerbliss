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
  Select,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { order } from "../../supabase/orders";
import { EditProductButton } from "../Modals/UpdateProduct/EditProductButton";
import { DeleteProductButton } from "../Modals/DeleteProduct/DeleteProductButton";

import { supabase } from "../../supabase/config";
import { DownloadIcon } from "../../icons/DownloadIcon";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ButtonAddOffCustomer } from "../Modals/AddOffCustomers/ButtonAddOffCustomer";
import { formatDate } from "../../helpers";

export const Orders = () => {
  //ESTADOS
  const [filterState, setFilterState] = useState("Todas");
  const [orderStates, setOrderStates] = useState({});
  const [otherData, setOtherData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(AuthContext);

  //PAGINA QUE SE MUESTRA SI NO ESTAS LOGUEADO
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
    { value: "todas", label: "Todas", color: "green.500" },

  ];

  //CONTROLADOR DEL FILTRO
  const handleFilterChange = (event) => {
    setFilterState(event.target.value);
  };

  //CONTROLADOR DEL CAMBIO DE ORDERSTATE
  const handleStatusChange = (orderId, value) => {
    setOrderStates((prevOrderStates) => {
      const updatedOrderStates = { ...prevOrderStates };
      updatedOrderStates[orderId] = { value: value, id: orderId };
      return updatedOrderStates;
    });
    order.updateStateOrder(orderId, value);
    setOtherData(new Date());
  };

  // FETCH DE LAS ORDERS
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const orderList = await order.list(currentPage);
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [currentPage, orderStates, setOtherData]);

  //SUBSCRIPCION A LOS CAMBIOS EN LA TABLA ORDERS EN SUPABASE
  const handleSub = () => {
    const subscription = supabase
      .channel("new_channel_for_order")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          const isNewOrderDuplicate = orders.find(
            (order) => order.id === payload.new.id
          );

          if (!isNewOrderDuplicate) {
            console.log("nodup");
            setOrders([payload.new, ...orders]);
          }
        }
      )
      .subscribe();
  };
  handleSub();

  const tHead = orders.length > 0 ? Object.keys(orders[0]) : [];

  // const formatDate = (fechaOriginal) => {
  //   const fecha = new Date(fechaOriginal);
  //   const año = fecha.getFullYear();
  //   const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  //   const dia = String(fecha.getDate()).padStart(2, "0");
  //   const horas = String(fecha.getHours()).padStart(2, "0");
  //   const minutos = String(fecha.getMinutes()).padStart(2, "0");
  //   const segundos = String(fecha.getSeconds()).padStart(2, "0");

  //   const fechaFormateada = `${dia}-${mes}-${año} ${horas}:${minutos}:${segundos}`;

  //   return fechaFormateada;
  // };

  const filteredOrders =
    filterState === "Todas"
      ? orders
      : orders.filter((order) => order.state === filterState);

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
        {/* //FILTER */}
        <Select value={filterState} onChange={handleFilterChange}>
          {options.map((option) => (
            <option value={option.label}>{option.label}</option>
          ))}
        </Select>
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
              {filteredOrders.map((order) => (
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
                  </Td>
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
