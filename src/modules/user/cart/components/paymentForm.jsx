
  export const PaymentForm = ({ formData, onChange, onSubmit, onBack }) => {
    return (
      <>
        <h1 className="text-2xl font-bold mb-6">Payment Information</h1>
  
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <form onSubmit={onSubmit} className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p>
                  {formData.firstName} {formData.lastName}
                </p>
                <p>{formData.address}</p>
                <p>
                  {formData.city}, {formData.state} {formData.zipCode}
                </p>
                <p>{formData.email}</p>
                <p>{formData.phone}</p>
              </div>
            </div>
  
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Payment Method</h3>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={onChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
  
                <div className="md:col-span-2">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={onChange}
                    required
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
  
                <div>
                  <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    id="expDate"
                    name="expDate"
                    value={formData.expDate}
                    onChange={onChange}
                    required
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
  
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={onChange}
                    required
                    placeholder="XXX"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
  
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back to Shipping
              </button>
  
              <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Complete Order
              </button>
            </div>
          </form>
        </div>
      </>
    );
  };
  