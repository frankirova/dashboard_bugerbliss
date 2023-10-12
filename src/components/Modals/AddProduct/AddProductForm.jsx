import { getUuid } from "../../../helpers";
import { MyModal } from "../MyModal";
import { product } from "../../../supabase/products";
import { ProductForm } from "../AddProduct/ProductForm";
import { useForm } from "../../../hooks/useForm";

export const AddProductForm = ({ isOpen, onClose }) => {
  const initialState = {
    id: "",
    name: "",
    price: 1,
    image: "",
    stock: 1,
  };

  const { formState, handleChange } = useForm(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState) {
      product.add({ ...formState, id: getUuid() });
      onClose();
    }
  };
  const header = "Agregar producto";
  const textButtonOk = "Guardar";
  const textButtonCancel = "Cancelar";
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
