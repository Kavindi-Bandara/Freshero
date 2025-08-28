import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass,faCirclePlus,faPencil,faTrash,} from "@fortawesome/free-solid-svg-icons";
import img20 from "./Image/img20.jpg";

function Inventory() {
  const [items, setItems] = useState([]);  //track all the items
  const [showAddForm, setShowAddForm] = useState(false);  //control the form visible
  const [newItem, setNewItem] = useState({name: "",category: "Dairy & Eggs",expiryDate: "", quantity: 1,}); //stores the form data
  const [isEditing, setIsEditing] = useState(false);// Track if editing an existing item
  const [editingItemId, setEditingItemId] = useState(null); // Store the ID of the item being edited
  const [searchTerm, setSearchTerm] = useState("");//Search the Item in inventory table
  const [selectedCategory, setSelectedCategory] = useState("All Categories"); 
  const [loading, setLoading] = useState(false);

  const categories = ["Dairy & Eggs","Fruits & Vegetables","Meat & Seafood","Grains & Rice","Beverages", "Biscuits & Snacks",]; //category array 
  const allCategories = ["All Categories", ...categories];

  useEffect(() => {
    fetchItems();                //Fetch items from backend
  }, []);

  const fetchItems = () => {
    setLoading(true);
      axios.get("http://localhost:5000/api/items")
      .then((res) => {
        setItems(res.data);
        setLoading(false);                                         // Refetch items from backend
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setLoading(false);
      });
  };

  const handleAddItem = async () => {
    if (newItem.name && newItem.category && newItem.expiryDate && newItem.quantity) {
      setLoading(true);
      try {
        const res = await axios.post("http://localhost:5000/api/items", newItem);
        setItems([...items, res.data]); // add new item to state
        resetForm();
        setShowAddForm(false);                                                                      // Add new item in the Inventory page
        setLoading(false);}
      catch (err) {
        console.error("Error adding item:", err);
        alert(`Error adding item: ${err.response?.data?.message || err.message}`);
        setLoading(false);}
    }};



  const handleDeleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:5000/api/items/${id}`);
        setItems(items.filter((item) => item._id !== id));
        setLoading(false);}
      catch (err) {                                                                             //Delete item from Inventory table
        console.error("Error deleting item:", err);
        alert(`Error deleting item: ${err.response?.data?.message || err.message}`);
        setLoading(false);}
    }};

  // Handle edit button click
  const handleEditClick = (item) => {
    setIsEditing(true);
    setEditingItemId(item._id);
    
    // Format the date correctly for the input field
    const formattedDate = new Date(item.expiryDate).toISOString().split('T')[0];
    
    // Pre fill the form with the item's data
    setNewItem({
      name: item.name,
      category: item.category,
      expiryDate: formattedDate,
      quantity: item.quantity,
    });
    setShowAddForm(true);
  };

  //Update existing item - FIXED with proper error handling
  const handleUpdateItem = async () => {
    if (newItem.name && newItem.category && newItem.expiryDate && newItem.quantity) {
      setLoading(true);
      try {
        console.log("Updating item with ID:", editingItemId);
        console.log("Data being sent:", newItem);
        const response = await axios.put(`http://localhost:5000/api/items/${editingItemId}`, newItem);
        console.log("Update response:", response.data);
        
        // Update the item in the local state instead of refetching all items
        setItems(items.map(item => item._id === editingItemId ? response.data : item));
        resetForm();
        setShowAddForm(false);
        setLoading(false);
        
        // Show success message when update is success
        alert("Item updated successfully!");} 

      catch (err) {
        console.error("Error updating item:", err);
        console.error("Error details:", err.response?.data);
        
        if (err.response?.status === 404) {
          alert("Error: Item not found or update route missing on server.");
        } else {
          alert(`Error updating item: ${err.response?.data?.error || err.message}`);
        }
        setLoading(false);}
    } 
    else {
      alert("Please fill in all fields.");
    }
  };

  // Reset form state
  const resetForm = () => {
    setNewItem({
      name: "",
      category: "Dairy & Eggs",
      expiryDate: "",
      quantity: 1,
    });
    setIsEditing(false);
    setEditingItemId(null);
  };

  // Handle form submission (both add and update)
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    
    if (isEditing) {
      handleUpdateItem();
    } else {
      handleAddItem();
    }
  };

  // Close the form modal
  const handleCloseForm = () => {
    setShowAddForm(false);
    resetForm();
  };

  //Helpers
  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryColor = (days) => {
    if (days <= 7) return "text-red-600 font-bold";
    if (days <= 21) return "text-yellow-600";
    if (days <= 60) return "text-green-600";
    return "text-gray-600";
  };

  const getExpiringSoon = () => {
    return items
      .filter((item) => getDaysUntilExpiry(item.expiryDate) <= 60)
      .sort((a, b) =>getDaysUntilExpiry(a.expiryDate) - getDaysUntilExpiry(b.expiryDate));
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* food inventory Section */}
      <div className="text-white bg-red-900 w-full pl-10">
        <p className="text-3xl mb-5 font-bold pt-45">Food Inventory</p>
        <p className="text-lg pb-15">Manage & track your food items</p>
      </div>


      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg">Processing...</p>
          </div>
        </div>
      )}

      {/* Main Content with background */}
      <div
        className="flex-grow bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${img20})` }}
      >
        <div className="container mx-auto px-4 py-8">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search Item..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white bg-opacity-90"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}/>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-3 top-3 text-gray-500"/>
            </div>

            {/* select the category */}
            <select
              className="px-4 py-2 border rounded-lg w-full md:w-1/3 bg-white bg-opacity-90"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              >
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Add item button */}
            <button
              onClick={() => {
                resetForm();
                setShowAddForm(true);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full md:w-auto justify-center"
            >
              <FontAwesomeIcon icon={faCirclePlus} /> Add Item
            </button>
          </div>

          {/* Inventory Table */}
          <div className="bg-white bg-opacity-90 rounded-lg shadow-md overflow-hidden mb-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      {items.length === 0
                        ? "Your inventory is empty. Add some items to get started!"
                        : "No items match your search."}
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => {
                    const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
                    const expiryColor = getExpiryColor(daysUntilExpiry);
                    return (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                        <td className={`px-6 py-4 whitespace-nowrap ${expiryColor}`}>
                          {new Date(item.expiryDate).toLocaleDateString()}{" "}
                          {daysUntilExpiry <= 60 && `(${daysUntilExpiry} days)`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                          {/* Added onClick handler for edit button */}
                          <button 
                            onClick={() => handleEditClick(item)}
                            className="text-green-500 hover:text-green-700"
                            disabled={loading}
                          >
                            <FontAwesomeIcon icon={faPencil} />
                          </button>
                          {/* Added onClick handler for delete button */}
                          <button
                            onClick={() => handleDeleteItem(item._id)}
                            className="text-red-500 hover:text-red-700"
                            disabled={loading}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Expiring Soon + Inventory Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Expiring Soon */}
            <div className="bg-white bg-opacity-90 rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Expiring Soon</h3>
              </div>
              <div className="px-6 py-4">
                {getExpiringSoon().length === 0 ? (
                  <p className="text-gray-500">No items expiring in the next two months</p>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getExpiringSoon().map((item) => {
                        const days = getDaysUntilExpiry(item.expiryDate);
                        const expiryColor = getExpiryColor(days);
                        return (
                          <tr key={item._id}>
                            <td className="px-4 py-2 whitespace-nowrap">{item.name}</td>
                            <td
                              className={`px-4 py-2 whitespace-nowrap text-right ${expiryColor}`}
                            >
                              {days} days
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Inventory Summary */}
            <div className="bg-white bg-opacity-90 rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Inventory Summary</h3>
              </div>
              <div className="px-6 py-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 font-medium">Total Items</td>
                      <td className="px-4 py-2">{items.length}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Categories</td>
                      <td className="px-4 py-2">
                        {[...new Set(items.map((item) => item.category))].length}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Expiring This Week</td>
                      <td className="px-4 py-2">
                        {items.filter((item) => getDaysUntilExpiry(item.expiryDate) <= 7).length}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Quick Tips</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Check expiring items regularly</li>
                    <li>Plan meals around soon-to-expire ingredients</li>
                    <li>Freeze items you won't use before they expire</li>
                    <li>Update your inventory after shopping</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Item Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            {/* Dynamic title based on edit mode */}
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Item" : "Add New Item"}
            </h2>
            
            {/* Wrap form elements in a form tag with onSubmit handler */}
            <form onSubmit={handleFormSubmit}>
              <div className="space-y-4">

              {/* Item name space*/}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
              
              {/* select the category space */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    required
                    disabled={loading}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

              {/* set the Expiry date space */}
                <div >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-md"
                    value={newItem.expiryDate}
                    onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>

              {/* set the quantity space */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border rounded-md"
                    value={newItem.quantity}
                    onChange={(e) =>
                      setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })
                    }
                    required
                    disabled={loading}
                  />
                </div>

              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                  disabled={loading}>
                  Cancel
                </button>
                {/* Use submit button type for form submission */}
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
                  disabled={loading} >
                  {loading ? "Processing..." : (isEditing ? "Update Item" : "Add Item")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Inventory;
