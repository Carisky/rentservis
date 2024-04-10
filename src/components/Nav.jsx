import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import styles from "./style.module.css";
import clients_service from "../api/services/clients_service";
import landlords_service from "../api/services/clients_service";
import apartments_service from "../api/services/clients_service";
import rents_service from "../api/services/clients_service";

const links = [
  { label: "clients", path: "/", service: clients_service },
  { label: "landlords", path: "/landlords", service: landlords_service },
  { label: "apartments", path: "/apartments", service: apartments_service },
  { label: "rents", path: "/rents", service: rents_service },
];

const formFields = {
  "/": [
    { label: "Name", key: "name" },
    { label: "Phone", key: "phone" },
    { label: "Address", key: "address" },
  ],
  "/landlords": [
    { label: "Name", key: "name" },
    { label: "Phone", key: "phone" },
    { label: "Address", key: "address" },
  ],
  "/apartments": [
    { label: "Address", key: "address" },
    { label: "Number of Rooms", key: "numberOfRooms" },
    { label: "Rent Cost", key: "rentCost" },
  ],
  "/rents": [
    { label: "Client Name", key: "clientName" },
    { label: "Client Phone", key: "clientPhone" },
    { label: "Apartment Address", key: "apartmentAddress" },
    { label: "Start Date", key: "startDate" },
    { label: "End Date", key: "endDate" },
  ],
};

export default function Nav() {
  const [activeTab, setActiveTab] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const { register, handleSubmit, reset } = useForm();

  React.useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const onSubmit = async (data) => {
    // Determine the service based on the activeTab
    let service;
    switch (activeTab) {
      case "/":
        service = clients_service;
        break;
      case "/landlords":
        service = landlords_service;
        break;
      case "/apartments":
        service = apartments_service;
        break;
      case "/rents":
        service = rents_service;
        break;
      default:
        break;
    }
    if (service) {
      try {
        await service.create(data);
        console.log("Data added successfully.");
      } catch (error) {
        console.error("Error adding data:", error);
      }
    }
  
    reset();
    handleCloseModal();
  };

  return (
    <Box className={styles.navlist}>
      {links.map((link, index) => (
        <Link
          key={index}
          className={`${styles.navbox} ${
            activeTab === link.path ? styles.active : ""
          }`}
          to={link.path}
        >
          {link.label}
          <Button onClick={handleOpenModal}>Add</Button>
        </Link>
      ))}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <h2 id="modal-modal-title">Add {activeTab}</h2>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {formFields[activeTab] ? (
              formFields[activeTab].map((field, index) => (
                <TextField
                  key={index}
                  label={field.label}
                  {...register(field.key)}
                />
              ))
            ) : (
              <p>No form fields configured for {activeTab}</p>
            )}
            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
