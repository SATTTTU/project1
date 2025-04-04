
import { useEffect } from "react"
import { io } from "socket.io-client"
import { useFetchOrder } from "./rider/api/getorder"

export const useRiderSocket = () => {
  const { data, isSuccess } = useFetchOrder()

  useEffect(() => {
    if (!isSuccess || !data || !data.data || data.data.length === 0) return

    const orderData = data?.data[0]
    const orderId = orderData.order_id
    const riderId = orderData.rider_id

    // Get the socket URL from environment or use a default
    const socketUrl = import.meta.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000"
    const socket = io(socketUrl)

    // Function to get current location
    const getCurrentLocation = () => {
      return new Promise((resolve) => {
        if (!navigator.geolocation) {
          console.error("Geolocation not supported")
          resolve(null)
          return
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude.toString(),
              longitude: position.coords.longitude.toString(),
            })
          },
          (error) => {
            console.error("Error getting location:", error)
            resolve(null)
          },
        )
      })
    }

    socket.on("connect", () => {
      console.log("Socket connected with ID:", socket.id)

      const room = `order-${orderId}`
      socket.emit("join", room)

      const locationInterval = setInterval(async () => {
        const location = await getCurrentLocation()

        if (location) {
          socket.emit("rider-location", {
            riderId,
            orderId,
            room,
            latitude: location.latitude,
            longitude: location.longitude,
          })
        }
      }, 5000) // Update every 5 seconds

      return () => clearInterval(locationInterval)
    })

    return () => {
      socket.disconnect()
    }
  }, [data, isSuccess])
}

