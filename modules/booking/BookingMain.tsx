"use client";
import React, { useState, useEffect, useCallback } from "react";
import { StatsSummary } from "./components/StatsSummary";
import { ActionButton } from "./components/ActionButton";
import { AddRoomForm } from "./components/AddRoomForm";
import { RoomDetailsTable } from "./components/RoomDetailsTable";
import { UpdateRoomModal } from "./components/UpdateRoomModal";
import {
	fetchAllRooms,
	insertRoom,
	updateRoom,
	deleteRoom,
	type RoomDetail,
} from "./services/roomDetailApi";

const BookingMain = () => {
	const [showAddForm, setShowAddForm] = useState(false);

	// Room detail state
	const [rooms, setRooms] = useState<RoomDetail[]>([]);
	const [roomsLoading, setRoomsLoading] = useState(true);
	const [updateModalRoom, setUpdateModalRoom] = useState<RoomDetail | null>(null);

	const loadRooms = useCallback(async () => {
		setRoomsLoading(true);
		try {
			const data = await fetchAllRooms();
			setRooms(data);
		} catch (err) {
			console.error("Failed to load rooms:", err);
		} finally {
			setRoomsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadRooms();
	}, [loadRooms]);

	const handleInsertRoom = async (data: { room_no: string; floor_no: number; room_type: string }) => {
		await insertRoom(data);
	};

	const handleUpdateRoom = async (id: number, data: { room_no: string; floor_no: number; room_type: string }) => {
		await updateRoom(id, data);
		await loadRooms();
	};

	const handleDeleteRoom = async (room: RoomDetail) => {
		if (!window.confirm(`Are you sure you want to delete Room ${room.room_no}?`)) return;
		try {
			await deleteRoom(room.id);
			await loadRooms();
		} catch (err) {
			alert(err instanceof Error ? err.message : "Failed to delete room.");
		}
	};

	// Example data
	const stats: { label: string; value: number; status: "success" | "danger" | "warning"; subtext: string }[] = [
		{ label: "Total Beds", value: 250, status: "success", subtext: "Capacity is 100%" },
		{ label: "Occupied", value: 185, status: "success", subtext: "74% Occupancy" },
		{ label: "Available", value: 65, status: "danger", subtext: "-2% from yesterday" },
	];

	return (
		<div style={{ padding: 32, background: "#F9FAFB", minHeight: "100vh" }}>
			<h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 8 }}>Bed Booking Dashboard</h2>
			<p style={{ color: "#6B7280", marginBottom: 24 }}>Manage and monitor real-time room occupancy and guest bookings.</p>

			<div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
				{stats.map((stat) => (
					<StatsSummary key={stat.label} {...stat} />
				))}
			</div>

			<div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
				<ActionButton label={showAddForm ? "Cancel" : "Add New Room"} onClick={() => setShowAddForm((prev) => !prev)} />
			</div>

			{/* Add New Room Form */}
			{showAddForm && (
				<AddRoomForm
					onRoomAdded={() => {
						loadRooms();
						setShowAddForm(false);
					}}
					onInsertRoom={handleInsertRoom}
				/>
			)}

			{/* Room Details Table */}
			<RoomDetailsTable
				rooms={rooms}
				loading={roomsLoading}
				onUpdateClick={(room) => setUpdateModalRoom(room)}
				onDeleteClick={handleDeleteRoom}
			/>

			{/* Update Room Modal */}
			{updateModalRoom && (
				<UpdateRoomModal
					room={updateModalRoom}
					onClose={() => setUpdateModalRoom(null)}
					onSave={handleUpdateRoom}
				/>
			)}
		</div>
	);
};

export default BookingMain;
