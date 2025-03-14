import React, { useEffect, useState } from 'react'
import { addNewAddress, clearAddressError, getUserAddress, updateUserAddress } from '../redux/slice/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { HiPencil, HiCheck, HiX } from 'react-icons/hi';

const AddressFormComponent = ({address, togglePopup}) => {
  const dispatch = useDispatch();
//   const { user, loading, error, addressError } = useSelector((state) => state.user);
//   const [addressEdit, setAddressEdit] = useState(false);
    // const userAddress = null;
  const [addressData, setAddressData] = useState({
          buildingName: "",
          street: "",
          city: "",
          state: "",
          country: "",
          zipCode: "",
          landmark: ""
    });



    useEffect(() => {
        if (address) {
            setAddressData(prevAddressData => ({
                ...prevAddressData, // Preserve previous state
                buildingName: address?.buildingName || prevAddressData.buildingName || "",
                street: address?.street || prevAddressData.street || "",
                city: address?.city || prevAddressData.city || "",
                state: address?.state || prevAddressData.state || "",
                country: address?.country || prevAddressData.country || "",
                zipCode: address?.zipCode || prevAddressData.zipCode || "",
                landmark: address?.landmark || prevAddressData.landmark || ""
            }));
            console.log("Updated Address:", address);
        }
    }, [address]);

    const handleAddressChange = (e) => {
        setAddressData({ ...addressData, [e.target.name]: e.target.value });
    };
    

    const handleAddressSave = async () => {

        try {
            if (address) {
                const response = await dispatch(updateUserAddress({id: address._id, addressData})).unwrap();
                console.log('Address updated successfully.');
            } else {
                dispatch(addNewAddress(addressData));
            }
            togglePopup();
        } catch (error) {
            console.error('Update failed:', error.response?.data);
        }
    }

    return (
    <div >
        <div className="flex items-center justify-between border-b pb-2 mb-4">
            <span className="text-gray-600">Building Name:</span>
                    <input
                        type="text"
                        name="buildingName"
                        value={addressData.buildingName}
                        onChange={handleAddressChange}
                        className="border rounded px-2 py-1 w-2/3"
                    />
        </div>

        <div className="flex items-center justify-between border-b pb-2 mb-4">
            <span className="text-gray-600">Street:</span>

                <input
                    type="text"
                    name="street"
                    value={addressData.street}
                    onChange={handleAddressChange}
                    className="border rounded px-2 py-1 w-2/3"
                />

        </div>

        <div className="flex items-center justify-between border-b pb-2 mb-4">
            <span className="text-gray-600">City:</span>

                <input
                    type="text"
                    name="city"
                    value={addressData.city}
                    onChange={handleAddressChange}
                    className="border rounded px-2 py-1 w-2/3"
                />

        </div>

        <div className="flex items-center justify-between border-b pb-2 mb-4">
            <span className="text-gray-600">State:</span>

                <input
                    type="text"
                    name="state"
                    value={addressData.state}
                    onChange={handleAddressChange}
                    className="border rounded px-2 py-1 w-2/3"
                />

        </div>

        <div className="flex items-center justify-between border-b pb-2 mb-4">
            <span className="text-gray-600">Country:</span>

                <input
                    type="text"
                    name="country"
                    value={addressData.country}
                    onChange={handleAddressChange}
                    className="border rounded px-2 py-1 w-2/3"
                />

        </div>
                    
        <div className="flex items-center justify-between border-b pb-2 mb-4">
            <span className="text-gray-600">ZipCode:</span>

                    <input
                        type="text"
                        name="zipCode"
                        value={addressData.zipCode}
                        onChange={handleAddressChange}
                        className="border rounded px-2 py-1 w-2/3"
                    />

        </div>

        <div className="flex items-center justify-between border-b pb-2 mb-4">
            <span className="text-gray-600">Landmark:</span>

                <input
                    type="text"
                    name="landmark"
                    value={addressData.landmark}
                    onChange={handleAddressChange}
                    className="border rounded px-2 py-1 w-2/3"
                />

        </div>

        <div className="flex justify-center space-x-4 mt-6">

                    <button
                        onClick={handleAddressSave}
                        className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
                    >
                        <HiCheck className="mr-2" /> Save       
                    </button>
                    <button
                        onClick={() => {
                            dispatch(clearAddressError())
                            togglePopup(false)
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
                    >
                        <HiX className="mr-2" /> Cancel
                    </button>

        </div>
    </div>
  )
}

export default AddressFormComponent