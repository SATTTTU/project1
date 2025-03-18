import { useState } from "react"

export const NewsletterForm=()=> {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSuccess(true)
      setEmail("")

      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    } catch (err) {
      setError("Failed to subscribe. Please try again.",err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-2">
        <input
          type="email"
          placeholder="youremail@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className={`bg-[#426B1F] hover:bg-[#426B1F] text-white px-4 py-2 rounded-md transition-colors ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {isSuccess && <p className="mt-2 text-green-600 text-sm">Thank you for subscribing!</p>}

      {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
    </div>
  )
}

