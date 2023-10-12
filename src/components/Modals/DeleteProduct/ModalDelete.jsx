import { MyModal } from "../MyModal";
import { product } from "../../../supabase/products";

export const ModalDelete = ({ isOpen, onClose, id }) => {
  const handleActionAndCloseModal = (id) => {
    product.delete(id);
    onClose();
  };
  const header = "Desea eliminar este producto ?";
  const textButtonOk = "Sí, borrar";
  const textButtonCancel = "No, cerrar";
  return (
    <MyModal
      handleSubmit={handleActionAndCloseModal}
      header={header}
      isOpen={isOpen}
      modalBody={<p>¿Está seguro de que desea eliminar este producto?</p>}
      onClose={onClose}
      textButtonCancel={textButtonCancel}
      textButtonOk={textButtonOk}
    />
  );
};
