import React, { useEffect, useState } from "react";
import PageWrap from "../PageWrap";
import clients_service from "../../api/services/clients_service"; // Importing client service
import DataTable from "../../components/DataTable/DataTable";
import Loader from "../../components/Loader/Loader";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchData();
  }, []);

  // Define columns for the DataTable
  const columns = [
    { header: "ID", key: "id" },
    { header: "Name", key: "name" },
    { header: "Phone", key: "phone" },
    { header: "Address", key: "address" }
  ];

  return (
    <PageWrap>
      {loading ? (
        <Loader/>
      ) : (
        <DataTable columns={columns} itemsPerPage={10} rows={clients} />
      )}
    </PageWrap>
  );
}
