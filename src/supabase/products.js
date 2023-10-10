import { supabase } from "./config";

const selectProducts = async () => {
  try {
    const response = await supabase.from("products").select();
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};

export const product = {
  list: async () => {
    return await selectProducts();
  },

  add: async (productData) => {
    try {
      await supabase.from("products").upsert([productData]);
      return await selectProducts();
    } catch (error) {
      throw new Error("Error adding product: " + error.message);
    }
  },

  update: async (updatedProduct, id) => {
    try {
      await supabase.from("products").update(updatedProduct).eq("id", id);
      return await selectProducts();
    } catch (error) {
      throw new Error("Error editing product: " + error.message);
    }
  },

  delete: async (id) => {
    try {
      await supabase.from("products").delete().eq("id", id);
      return await selectProducts();
    } catch (error) {
      throw new Error("Error deleting product: " + error.message);
    }
  },
};

// #####################
// import { supabase } from "./config";

// export const product = {
//   list: async () => {
//     try {
//       const response = await supabase.from("products").select();
//       const products = await response.data;
//       console.log(products);
//       return products;
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   },
//   add: async (product) => {
//     try {
//       await supabase.from("products").upsert(product);
//       const response = await supabase.from("products").select();
//       const products = await response.data;
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   },
//   update: async (updatedProduct, id) => {
//     try {
//       await supabase.from("products").update(updatedProduct).eq("id", id);
//       const response = await supabase.from("products").select();
//       const products = await response.data;
//     } catch (error) {
//       console.error("Error editing product:", error);
//     }
//   },
//   delete: async (id) => {
//     try {
//       await supabase.from("products").delete().eq("id", id);
//       const response = await supabase.from("products").select();
//       const products = await response.data;
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   },
// };
