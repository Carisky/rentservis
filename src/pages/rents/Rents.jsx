import React, { useEffect, useState } from "react";
import PageWrap from "../PageWrap";
import rents_service from "../../api/services/rents_service";
import DataTable from "../../components/DataTable/DataTable"; // Assuming DataTable is in the same directory
import Loader from "../../components/Loader/Loader";

export default function Rents() {
    const [rents, setRents] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const rentsData = await rents_service.findAll();
          setRents(rentsData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching rents:", error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

    const onDelete = async (id) => {
        try {
            await rents_service.delete(id);
            setRents(rents.filter(rent => rent.id !== id));
        } catch (error) {
            console.error("Error deleting rent:", error);
        }
    };

    const onPut = async (id, data) => {
        try {
            await rents_service.put(id, data);
            // Handle any necessary updates after the put operation
        } catch (error) {
            console.error("Error updating rent:", error);
        }
    };

    // Define columns for the DataTable
    const columns = [
        { header: "ID", key: "id" },
        { header: "Client Name", key: "client.name" },
        { header: "Client Phone", key: "client.phone" },
        { header: "Apartment Address", key: "apartment.address" },
        { header: "Start Date", key: "startDate" },
        { header: "End Date", key: "endDate" }
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
                    itemsPerPage={10} 
                    rows={rents} 
                    onDelete={onDelete} 
                    onPut={onPut} 
                />
            )}
        </PageWrap>
    );
}
