import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  FaCar,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaBuilding,
  FaIdCard,
  FaGasPump,
  FaRedo,
  FaSave,
} from "react-icons/fa";

// ------------------ Validation Schema ------------------

const schema = yup.object({

  vehicleRegistrationNo: yup
    .string()
    .required("Registration Number is required")
    .matches(
      /^[A-Z]{2}[0-9]{2}[A-Z]{1,3}[0-9]{4}$/,
      "Example: UP16AB1234"
    ),

  chassisNumber: yup
    .string()
    .required("Chassis Number is required")
    .matches(
      /^[A-HJ-NPR-Z0-9]{17}$/i,
      "Chassis Number must be exactly 17 characters"
    ),

  ownerName: yup
    .string()
    .required("Owner Name is required")
    .matches(
      /^[A-Za-z ]+$/,
      "Only alphabets are allowed"
    )
    .min(3)
    .max(50),

  mobileNumber: yup
    .string()
    .required("Mobile Number is required")
    .matches(
      /^[6-9]\d{9}$/,
      "Enter valid 10-digit mobile number"
    ),

  vehicleType: yup
    .string()
    .required("Vehicle Type is required"),

  fuelType: yup
    .string()
    .required("Fuel Type is required"),

  registrationDate: yup
    .date()
    .required("Registration Date is required")
    .max(new Date(), "Future date is not allowed"),

  rtoName: yup
    .string()
    .required("RTO Name is required")
    .matches(
      /^[A-Za-z ]+$/,
      "Only alphabets are allowed"
    )

});



function AddVehicle() {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({

    resolver: yupResolver(schema),

    defaultValues: {

      vehicleRegistrationNo: "",
      chassisNumber: "",
      ownerName: "",
      mobileNumber: "",
      vehicleType: "",
      fuelType: "",
      registrationDate: "",
      rtoName: ""

    }

  });

  const onSubmit = (data) => {

    console.log(data);

    alert("Vehicle Registered Successfully!");

    reset();

  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-300 flex justify-center items-center py-5 px-3">

    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 text-white p-5 text-center">

        <div className="flex justify-center mb-2">
          <FaCar size={28} />
        </div>

        <h1 className="text-2xl font-bold">
          Vehicle Registration
        </h1>

        <p className="mt-1 text-sm">
          Register Vehicle into RTO System
        </p>

      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">

        <div className="grid md:grid-cols-2 gap-5">

          {/* Registration */}
          <div>

            <label className="font-semibold flex gap-2 items-center mb-1 text-sm">
              <FaIdCard size={14} />
              Registration Number
            </label>

            <input
              {...register("vehicleRegistrationNo")}
              placeholder="UP16AB1234"
              onChange={(e) =>
                setValue(
                  "vehicleRegistrationNo",
                  e.target.value.toUpperCase(),
                  { shouldValidate: true }
                )
              }
              className={`w-full p-3 rounded-lg border-2 text-sm ${
                errors.vehicleRegistrationNo
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            <p className="text-red-500 text-xs mt-1">
              {errors.vehicleRegistrationNo?.message}
            </p>

          </div>

          {/* Chassis */}
          <div>

            <label className="font-semibold flex gap-2 items-center mb-1 text-sm">
              <FaCar size={14} />
              Chassis Number
            </label>

            <input
              {...register("chassisNumber")}
              placeholder="17 Character VIN"
              className={`w-full p-3 rounded-lg border-2 text-sm ${
                errors.chassisNumber
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            <p className="text-red-500 text-xs mt-1">
              {errors.chassisNumber?.message}
            </p>

          </div>

          {/* Owner */}
          <div>

            <label className="font-semibold flex gap-2 items-center mb-1 text-sm">
              <FaUser size={14} />
              Owner Name
            </label>

            <input
              {...register("ownerName")}
              placeholder="Owner Name"
              className={`w-full p-3 rounded-lg border-2 text-sm ${
                errors.ownerName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            <p className="text-red-500 text-xs mt-1">
              {errors.ownerName?.message}
            </p>

          </div>

          {/* Mobile */}
          <div>

            <label className="font-semibold flex gap-2 items-center mb-1 text-sm">
              <FaPhone size={14} />
              Mobile Number
            </label>

            <input
              {...register("mobileNumber")}
              placeholder="9876543210"
              className={`w-full p-3 rounded-lg border-2 text-sm ${
                errors.mobileNumber
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            <p className="text-red-500 text-xs mt-1">
              {errors.mobileNumber?.message}
            </p>

          </div>

          {/* Vehicle Type */}
          <div>

            <label className="font-semibold flex gap-2 items-center mb-1 text-sm">
              <FaCar size={14} />
              Vehicle Type
            </label>

            <select
              {...register("vehicleType")}
              className={`w-full p-3 rounded-lg border-2 text-sm ${
                errors.vehicleType
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select</option>
              <option>Bike</option>
              <option>Car</option>
              <option>Truck</option>
              <option>Bus</option>
            </select>

            <p className="text-red-500 text-xs mt-1">
              {errors.vehicleType?.message}
            </p>

          </div>

          {/* Fuel */}
          <div>

            <label className="font-semibold flex gap-2 items-center mb-1 text-sm">
              <FaGasPump size={14} />
              Fuel Type
            </label>

            <select
              {...register("fuelType")}
              className={`w-full p-3 rounded-lg border-2 text-sm ${
                errors.fuelType
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select</option>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>CNG</option>
              <option>Electric</option>
            </select>

            <p className="text-red-500 text-xs mt-1">
              {errors.fuelType?.message}
            </p>

          </div>

          {/* Registration Date */}
          <div>

            <label className="font-semibold flex gap-2 items-center mb-1 text-sm">
              <FaCalendarAlt size={14} />
              Registration Date
            </label>

            <input
              type="date"
              {...register("registrationDate")}
              className={`w-full p-3 rounded-lg border-2 text-sm ${
                errors.registrationDate
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            <p className="text-red-500 text-xs mt-1">
              {errors.registrationDate?.message}
            </p>

          </div>

          {/* RTO */}
          <div>

            <label className="font-semibold flex gap-2 items-center mb-1 text-sm">
              <FaBuilding size={14} />
              RTO Name
            </label>

            <input
              {...register("rtoName")}
              placeholder="Meerut RTO"
              className={`w-full p-3 rounded-lg border-2 text-sm ${
                errors.rtoName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            <p className="text-red-500 text-xs mt-1">
              {errors.rtoName?.message}
            </p>

          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-7">

          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-7 py-3 rounded-lg flex items-center gap-2 text-sm font-medium"
          >
            <FaSave size={14} />
            Register Vehicle
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-lg flex items-center gap-2 text-sm font-medium"
          >
            <FaRedo size={14} />
            Reset
          </button>

        </div>

      </form>

    </div>

  </div>
);


}

export default AddVehicle;