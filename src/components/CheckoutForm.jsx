import { useState } from 'react';

function CheckoutForm() {
    const [checkoutData, setCheckoutData] = useState({
        shippingMethod: 'standard',
        pickupLocation: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCheckoutData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};

        if (checkoutData.shippingMethod === 'pickup') {
            if (!checkoutData.pickupLocation.trim()) {
                newErrors.pickupLocation = 'Pickup location is required.';
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            console.log('Order Created:', checkoutData);
            alert('Order successfully created! Check the console for details.');
        } 
        else {
            console.log('Validation Failed:', errors);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Dynamic Cart Checkout</h2>

            <label htmlFor="shippingMethod">Shipping Method:</label>
            <select
                name="shippingMethod"
                value={checkoutData.shippingMethod}
                onChange={handleChange}
            >
                <option value="standard">Standard Shipping</option>
                <option value="express">Express Shipping</option>
                <option value="pickup">In-Store Pickup</option>
            </select>

            {checkoutData.shippingMethod === 'pickup' && (
                <div className="pickup-section">
                    <label htmlFor="pickupLocation">Pickup Location:</label>
                    <input
                        type="text"
                        name="pickupLocation"
                        value={checkoutData.pickupLocation}
                        onChange={handleChange}
                        placeholder="Enter store location"
                    />
                    {errors.pickupLocation && (
                        <p className="error">{errors.pickupLocation}</p>
                    )}
                </div>
            )}

            <button type="submit">Place Order</button>
        </form>
    );
}

export default CheckoutForm;
