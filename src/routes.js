import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import {
  AddOrUpdateAirport,
  AddOrUpdatePaymentPlan,
  AirportsList,
  Dashboard,
  Login,
  PassengersList,
  PaymentPlans,
  PilotsList,
} from "./pages";
import HomePageContent from "./pages/Settings/HomePageContent";

export default function Router() {
  const Authentication = () => {
    if (localStorage.getItem("token")) {
      return <Navigate to="/dashboard"> </Navigate>;
    }
    if (!localStorage.getItem("token")) {
      return <Navigate to="/login"> </Navigate>;
    }
  };

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/passengers-list" element={<PassengersList />} />
        <Route path="/pilots-list" element={<PilotsList />} />
        <Route path="/airports-list" element={<AirportsList />} />
        <Route
          path="/airports-list/add-airport"
          element={<AddOrUpdateAirport />}
        />
        <Route
          path="/airports-list/edit-airport/:airport_id"
          element={<AddOrUpdateAirport />}
        />
        <Route path="/payment-plans" element={<PaymentPlans />} />
        <Route path="/home-page-content" element={<HomePageContent />} />
        <Route
          path="/payment-plans/add-plan"
          element={<AddOrUpdatePaymentPlan />}
        />
        <Route
          path="/payment-plans/edit-plan/:plan_id"
          element={<AddOrUpdatePaymentPlan />}
        />
      </Route>
      <Route element={<LogoOnlyLayout />}>
        <Route path="/" element={<Authentication />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
