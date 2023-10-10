import { useState } from "react";
import { Product } from "../store/types/typesStore";
export const useForm = (initialValue: Product) => {
  const [formState, setFormState] = useState<Product>(initialValue);

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setFormState(initialValue);
  };

  const updateFormState = (newValue: typeof initialValue) => {
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
