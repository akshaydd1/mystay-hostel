"use client";
import React, { useState } from "react";
import { StatsSummary } from "./components/StatsSummary";
import { RoomCard } from "./components/RoomCard";
import { Dropdown } from "./components/Dropdown";
import { StatusTag } from "./components/StatusTag";
import { ActionButton } from "./components/ActionButton";


const floorOptions = [
	{ label: "All Floors", value: "all" },
	{ label: "Floor 1", value: "1" },
	{ label: "Floor 2", value: "2" },
];
const roomTypeOptions = [
	{ label: "Room Type: All", value: "all" },
	{ label: "AC Deluxe", value: "ac" },
	{ label: "Standard", value: "standard" },
];

const BookingMain = () => {
	const [selectedFloor, setSelectedFloor] = useState("all");
	const [selectedRoomType, setSelectedRoomType] = useState("all");

	// Example data
	const stats = [
		{ label: "Total Beds", value: 250, status: "success", subtext: "Capacity is 100%" },
		{ label: "Occupied", value: 185, status: "success", subtext: "74% Occupancy" },
		{ label: "Available", value: 65, status: "danger", subtext: "-2% from yesterday" },
	];

	const rooms = [
		{
			roomNumber: "101",
			type: "AC Deluxe",
			status: "partial",
			beds: [
				{ id: "b1", status: "occupied", guestName: "Marcus Wright", guestProfileUrl: "#", checkIn: "Oct 14", checkOut: "Oct 16" },
				{ id: "b2", status: "available" },
			],
		},
		{
			roomNumber: "102",
			type: "Standard",
			status: "full",
			beds: [
				{ id: "b1", status: "occupied", guestName: "Sarah Jenkins", guestProfileUrl: "#", checkIn: "Dec 01", checkOut: "Dec 04" },
				{ id: "b2", status: "occupied", guestName: "Alice Cooper", guestProfileUrl: "#", checkIn: "Dec 01", checkOut: "Dec 04" },
			],
		},
		{
			roomNumber: "103",
			type: "AC Deluxe",
			status: "empty",
			beds: [
				{ id: "b1", status: "available" },
				{ id: "b2", status: "available" },
			],
		},
	];

	return (
		<div style={{ padding: 32, background: "#F9FAFB" }}>
			<h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 8 }}>Bed Booking Dashboard</h2>
			<p style={{ color: "#6B7280", marginBottom: 24 }}>Manage and monitor real-time room occupancy and guest bookings.</p>

			<div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
				{stats.map((stat, idx) => (
					<StatsSummary key={stat.label} {...stat} />
				))}
			</div>

			<div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
				<Dropdown options={floorOptions} value={selectedFloor} onChange={setSelectedFloor} />
				<Dropdown options={roomTypeOptions} value={selectedRoomType} onChange={setSelectedRoomType} />
				<ActionButton label="Add New Room" onClick={() => alert("Add Room")}/>
			</div>

			<div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
				{rooms.map((room) => (
					<RoomCard key={room.roomNumber} {...room} />
				))}
			</div>
		</div>
	);
};

export default BookingMain;
