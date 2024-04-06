import React, { useEffect, useState } from "react";
import PageWrap from "../PageWrap";
import apartments_service from "../../api/services/apartments_service"; // Importing apartments service
import DataTable from "../../components/DataTable/DataTable";
import Loader from "../../components/Loader/Loader";

export default function Apartments() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apartmentsData = await apartments_service.findAll();
        setApartments(apartmentsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching apartments:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Define columns for the DataTable
  const columns = [
    { header: "ID", key: "id" },
    { header: "Address", key: "address" },
    { header: "Number of Rooms", key: "numberOfRooms" },
    { header: "Rent Cost", key: "rentCost" },
    { header: "Landlord Name", key: "landLord.name" },
    { header: "Landlord Phone", key: "landLord.phone" },
    { header: "Landlord Address", key: "landLord.address" }
  ];

  return (
    <PageWrap>
      {loading ? (
        <Loader/>
      ) : (
        <DataTable columns={columns} itemsPerPage={10} rows={apartments} />
      )}
    </PageWrap>
  );
}
