import ForgetImage from "../../../../../assets/forgetpassword.jpg"

export const ForgotPassword=()=> {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-3xl w-full p-8 flex">
        <div className="flex-1 hidden md:block">
          <img
            src={ForgetImage}
            alt="Security illustration"
            className="w-full h-auto"
          />
        </div>

        <div className="flex-1 px-4 md:px-8">
          <h1 className="text-3xl font-semibold text-[#426B1F] mb-2">Forgot Password?</h1>
          <p className="text-gray-600 mb-8">Enter the email address associated with you account.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500 transition-colors"
                required
              />
            </div>

            <div className="flex items-center justify-between">
             
              <button
                type="submit"
                className="bg-[#426B1F] text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

