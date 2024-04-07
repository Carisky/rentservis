import React, { useEffect, useState } from "react";
import PageWrap from "../PageWrap";
import landlords_service from "../../api/services/landlords_service"; // Importing landlords service
import DataTable from "../../components/DataTable/DataTable";
import Loader from "../../components/Loader/Loader";

export default function LandLords() {
  const [landlords, setLandlords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const landlordsData = await landlords_service.findAll();
        setLandlords(landlordsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching landlords:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onDelete = async (id) => {
    try {
      await landlords_service.delete(id);
      setLandlords(landlords.filter((landlord) => landlord.id !== id));
    } catch (error) {
      console.error("Error deleting landlord:", error);
    }
  };

  const onPut = async (id, data) => {
    try {
      await landlords_service.put(id, data);
    } catch (error) {
      console.error("Error update landlord:", error);
    }
  };

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
        <DataTable
          showActions={true}
          showDeleteButton={true}
          showChangeButton={true}
          columns={columns}
          onDelete={onDelete}
          onPut={onPut}
          itemsPerPage={10}
          rows={landlords}
        />
      )}
    </PageWrap>
  );
}
