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

  const onDelete = async (id) => {
    try {
      await apartments_service.delete(id);
      setApartments(apartments.filter((apartment) => apartment.id !== id));
    } catch (error) {
      console.error("Error deleting apartment:", error);
    }
  };

  const onPut = async (id, data) => {
    try {
      await apartments_service.put(id, data);
    } catch (error) {
      console.error("Error updating apartment:", error);
    }
  };

  // Define columns for the DataTable
  const columns = [
    { header: "ID", key: "id" },
    { header: "Address", key: "address" },
    { header: "Number of Rooms", key: "numberOfRooms" },
    { header: "Rent Cost", key: "rentCost" },

  ];

  return (
    <PageWrap>
      {loading ? (
        <Loader/>
      ) : (
        <DataTable
          columns={columns}
          itemsPerPage={10}
          rows={apartments}
          showDeleteButton={true}
          showActions={true}
          showChangeButton={true}
          onDelete={onDelete}
          onPut={onPut}
        />
      )}
    </PageWrap>
  );
}
