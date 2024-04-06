import React, { useEffect, useState } from "react";
import PageWrap from "../PageWrap";
import clients_service from "../../api/services/clients_service"; // Importing client service
import DataTable from "../../components/DataTable/DataTable";
import Loader from "../../components/Loader/Loader";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const clientsData = await clients_service.findAll();
      setClients(clientsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    try {
      await clients_service.delete(id);
      setClients(clients.filter((client) => client.id !== id));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const onPut = async (id, data) => {
    try {
      await clients_service.put(id, data);
    } catch (error) {
      console.error("Error update client:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { header: "ID", key: "id" },
    { header: "Name", key: "name" },
    { header: "Phone", key: "phone" },
    { header: "Address", key: "address" },
  ];

  return (
    <PageWrap>
      {loading ? (
        <Loader />
      ) : (
        <DataTable
          showActions={true}
          showDeleteButton={true}
          showChangeButton={true}
          columns={columns}
          onDelete={onDelete}
          onPut={onPut}
          itemsPerPage={10}
          rows={clients}
        />
      )}
    </PageWrap>
  );
}
