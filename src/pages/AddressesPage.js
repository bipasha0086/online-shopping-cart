import React, { useState } from "react";
import "../styles/AddressesPage.css";

function AddressesPage({ user, onClose }) {
	const [addresses, setAddresses] = useState([
		{
			id: 1,
			type: "Home",
			name: "Home Address",
			address: "123 Main Street",
			city: "New York",
			state: "NY",
			zip: "10001",
			phone: "555-0123",
			isDefault: true,
		},
	]);

	const [showForm, setShowForm] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [formData, setFormData] = useState({
		type: "Home",
		name: "",
		address: "",
		city: "",
		state: "",
		zip: "",
		phone: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddAddress = () => {
		if (
			formData.name &&
			formData.address &&
			formData.city &&
			formData.state &&
			formData.zip &&
			formData.phone
		) {
			if (editingId) {
				setAddresses(
					addresses.map((addr) =>
						addr.id === editingId ? { ...formData, id: editingId } : addr
					)
				);
				setEditingId(null);
			} else {
				const newAddress = {
					...formData,
					id: Date.now(),
					isDefault: addresses.length === 0,
				};
				setAddresses([...addresses, newAddress]);
			}
			resetForm();
			setShowForm(false);
		} else {
			alert("Please fill all fields");
		}
	};

	const handleEditAddress = (address) => {
		setFormData({
			type: address.type,
			name: address.name,
			address: address.address,
			city: address.city,
			state: address.state,
			zip: address.zip,
			phone: address.phone,
		});
		setEditingId(address.id);
		setShowForm(true);
	};

	const handleDeleteAddress = (id) => {
		setAddresses(addresses.filter((addr) => addr.id !== id));
	};

	const handleSetDefault = (id) => {
		setAddresses(
			addresses.map((addr) => ({
				...addr,
				isDefault: addr.id === id,
			}))
		);
	};

	const resetForm = () => {
		setFormData({
			type: "Home",
			name: "",
			address: "",
			city: "",
			state: "",
			zip: "",
			phone: "",
		});
		setEditingId(null);
	};

	return (
		<div className="addresses-page">
			<div className="addresses-container">
				<div className="addresses-header">
					<h1>📍 My Addresses</h1>
					<p>Manage your delivery addresses</p>
				</div>

				<button
					className="add-new-btn"
					onClick={() => {
						resetForm();
						setShowForm(!showForm);
					}}
				>
					{showForm ? "Cancel" : "+ Add New Address"}
				</button>

				{showForm && (
					<div className="address-form-container">
						<h2>{editingId ? "Edit Address" : "Add New Address"}</h2>
						<form className="address-form" onSubmit={(e) => e.preventDefault()}>
							<div className="form-group">
								<label>Address Type</label>
								<select
									name="type"
									value={formData.type}
									onChange={handleInputChange}
									className="form-input"
								>
									<option>Home</option>
									<option>Office</option>
									<option>Other</option>
								</select>
							</div>

							<div className="form-group">
								<label>Address Label</label>
								<input
									type="text"
									name="name"
									placeholder="e.g., My Home"
									value={formData.name}
									onChange={handleInputChange}
									className="form-input"
								/>
							</div>

							<div className="form-group">
								<label>Full Address</label>
								<input
									type="text"
									name="address"
									placeholder="Street address"
									value={formData.address}
									onChange={handleInputChange}
									className="form-input"
								/>
							</div>

							<div className="form-row">
								<div className="form-group">
									<label>City</label>
									<input
										type="text"
										name="city"
										placeholder="City"
										value={formData.city}
										onChange={handleInputChange}
										className="form-input"
									/>
								</div>
								<div className="form-group">
									<label>State</label>
									<input
										type="text"
										name="state"
										placeholder="State"
										value={formData.state}
										onChange={handleInputChange}
										className="form-input"
									/>
								</div>
							</div>

							<div className="form-row">
								<div className="form-group">
									<label>ZIP Code</label>
									<input
										type="text"
										name="zip"
										placeholder="ZIP code"
										value={formData.zip}
										onChange={handleInputChange}
										className="form-input"
									/>
								</div>
								<div className="form-group">
									<label>Phone Number</label>
									<input
										type="tel"
										name="phone"
										placeholder="Phone"
										value={formData.phone}
										onChange={handleInputChange}
										className="form-input"
									/>
								</div>
							</div>

							<button
								type="button"
								className="save-btn"
								onClick={handleAddAddress}
							>
								{editingId ? "Update Address" : "Save Address"}
							</button>
						</form>
					</div>
				)}

				<div className="addresses-list">
					{addresses.length === 0 ? (
						<div className="empty-state">
							<p>No addresses added yet</p>
							<small>Add your first address to get started</small>
						</div>
					) : (
						addresses.map((addr) => (
							<div key={addr.id} className={`address-card ${addr.isDefault ? "default" : ""}`}>
								<div className="address-badge">{addr.type}</div>
								{addr.isDefault && <div className="default-badge">Default</div>}

								<div className="address-content">
									<h3>{addr.name}</h3>
									<p className="address-text">{addr.address}</p>
									<p className="address-text">
										{addr.city}, {addr.state} {addr.zip}
									</p>
									<p className="phone-text">📞 {addr.phone}</p>
								</div>

								<div className="address-actions">
									<button
										className="action-btn edit-btn"
										onClick={() => handleEditAddress(addr)}
										title="Edit"
									>
										✏️ Edit
									</button>
									<button
										className="action-btn delete-btn"
										onClick={() => handleDeleteAddress(addr.id)}
										title="Delete"
									>
										🗑️ Delete
									</button>
									{!addr.isDefault && (
										<button
											className="action-btn default-btn"
											onClick={() => handleSetDefault(addr.id)}
											title="Set as default"
										>
											⭐ Default
										</button>
									)}
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default AddressesPage;
