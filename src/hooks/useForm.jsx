import { useState } from "react";
// import { Product } from "../store/types/typesStore";
export const useForm = (initialValue) => {
  const [formState, setFormState] = useState(initialValue);

  const handleChange = ({ target: { name, value } }) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setFormState(initialValue);
  };

  const updateFormState = (newValue) => {
    setFormState(newValue);
  };

  return {
    formState,
    ...formState,
    handleChange,
    handleSubmit,
    handleReset,
    updateFormState,
    handleBlur,
  };
};
