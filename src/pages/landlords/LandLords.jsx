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
        <DataTable columns={columns} itemsPerPage={10} rows={landlords} />
      )}
    </PageWrap>
  );
}
