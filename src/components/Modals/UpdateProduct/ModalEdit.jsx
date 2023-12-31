import { MyModal } from "../MyModal";
import { product } from "../../../supabase/products";
import { ProductForm } from "../AddProduct/ProductForm";
import { useForm } from "../../../hooks/useForm";

export const ModalEdit = ({ isOpen, onClose, id }) => {
  const initialState = {
    id: "",
    name: "",
    price: 1,
    image: "",
    stock: 1,
  };
  const header = "Editar Producto";
  const textButtonOk = "Si, editar producto";
  const textButtonCancel = " No, cerrar";
  const { formState, handleChange } = useForm(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState) {
      product.update({ ...formState, id: id }, id);
      onClose();
    }
  };

  return (
    <MyModal
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      header={header}
      isOpen={isOpen}
      modalBody={<ProductForm handleChange={handleChange} />}
      onClose={onClose}
      textButtonCancel={textButtonCancel}
      textButtonOk={textButtonOk}
    />
  );
};
