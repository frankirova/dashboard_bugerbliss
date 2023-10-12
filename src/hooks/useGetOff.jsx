export const useGetOff = (order, phoneNumberClient) => {
  const customers_off = [3513890015];
  const clienteConCupon = customers_off.find(
    (phone) => phone === phoneNumberClient
  );
  if (clienteConCupon) {
    order.off = true; // Establece el cupón de descuento en true
  }
  if (order.off) {
    // Aplica el descuento del 10% si order.off es true
    order.total = order.total * 0.1;
  }

  return order;
};
