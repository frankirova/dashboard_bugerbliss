import { supabase } from "./config";
// import { toCSV } from "supabase/supabase-js";

export const order = {
  list: async (currentPage) => {
    try {
      const ordersPerPage = 30;
      const offset = (currentPage - 1) * ordersPerPage;
      const response = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .range(offset, offset + ordersPerPage - 1);
      const orders = await response.data;
      return orders;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  add: async (order) => {
    try {
      await supabase.from("orders").upsert(order);
      const response = await supabase.from("orders").select();
      const orders = await response.data;
    } catch (error) {
      console.error("Error adding product:", error);
    }
  },
  update: async (updatedOrder, id) => {
    try {
      await supabase.from("orders").update(updatedOrder).eq("id", id);
      const response = await supabase.from("orders").select();
      const orders = await response.data;
    } catch (error) {
      console.error("Error editing product:", error);
    }
  },
  delete: async (id) => {
    try {
      await supabase.from("orders").delete().eq("id", id);
      const response = await supabase.from("orders").select();
      const order = await response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  },
  download: async () => {
    try {
      const { data, error } = await supabase.from("orders").select().csv();

      if (error) {
        console.error("Error al descargar CSV:", error);
        return;
      }

      const blob = new Blob([data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      // Crea un enlace de descarga para el archivo CSV
      const a = document.createElement("a");
      a.href = url;
      a.download = "datos.csv"; // Nombre del archivo CSV
      document.body.appendChild(a);
      a.click();

      // Libera recursos
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      // const csv = data.toCSV();

      // // Descarga el archivo CSV
      // const blob = new Blob([csv], { type: "text/csv" });
      // const link = document.createElement("a");
      // link.href = window.URL.createObjectURL(blob);
      // link.download = "my_table.csv";
      // link.click();

      // if (data && data.length > 0) {
      //   const csvData = data.map((row) => {
      //     // Formatea los datos como una fila CSV (puedes personalizar esto según tus necesidades)
      //     return `${row.id},${row.created_at},${row.buyer}, ${row.items}, ${row.total}, ${row.state}`; // Reemplaza "columna1", "columna2", etc., con los nombres de tus columnas
      //   });

      //   const csvContent = `"ID","Fecha de Creación","Comprador","Ítems","Total","Estado"\n${csvData.join(
      //     "\n"
      //   )}`;

      //   // Crea un enlace de descarga para el archivo CSV
      //   const blob = new Blob([csvContent], { type: "text/csv" });
      //   const url = window.URL.createObjectURL(blob);
      //   const a = document.createElement("a");
      //   a.style.display = "none"; // Oculta el elemento <a>
      //   a.href = url;
      //   a.download = "datos.csv"; // Nombre del archivo CSV
      //   document.body.appendChild(a); // Agrega el elemento <a> al cuerpo del documento
      //   a.click(); // Simula un clic en el elemento <a>
      //   window.URL.revokeObjectURL(url);
      //   document.body.removeChild(a); //
      //}
      console.error("Error al exportar datos a CSV:", error);
    }
  },
  subscription: async (setOrders) => {
    supabase
      .from("ordenes")
      .on("INSERT", (payload) => {
        // Actualiza el estado de 'orders' con la nueva orden
        setOrders((prevOrders) => [...prevOrders, payload.new]);
      })
      .subscribe();

    // Maneja errores y cierre de conexiones
    subscription.error((error) => {
      console.error("Error en la suscripción:", error.message);
    });
  },
  updateStateOrder: async (orderId, value) => {
    const { data, error } = await supabase
      .from("orders")
      .update({ state: value })
      .eq("id", orderId);
  },
};
