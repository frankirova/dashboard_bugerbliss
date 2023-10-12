import { FormAddOffCustomer } from "./FormAddOffCustomer";
import { getUuid } from "../../../helpers";
import { MyModal } from "../MyModal";
import { useForm } from "../../../hooks/useForm";
import { user } from "../../../supabase/user";

export const ModalAddOffCustomer = ({ isOpen, onClose }) => {
  const initialState = {
    id: "",
    name: "",
    phone: "",
  };

  const { formState, handleChange } = useForm(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState) {
      user.add_off_customer({ ...formState, id: getUuid() });
      console.log({ ...formState, id: getUuid() });
      onClose();
    }
  };
  const header = "Agregar CUPON";
  const textButtonOk = "Guardar";
  const textButtonCancel = "Cancelar";
  return (
    <MyModal
      handleSubmit={handleSubmit}
      header={header}
      isOpen={isOpen}
      modalBody={<FormAddOffCustomer handleChange={handleChange} />}
      onClose={onClose}
      textButtonCancel={textButtonCancel}
      textButtonOk={textButtonOk}
    />
  );
};
