"use client"

import { api, saveUserData, clearAuthData } from "@/lib/api-client"
import { useMutation } from "@tanstack/react-query"
import { useAuth } from "@/hooks/context/useAuth"
import { useNavigate } from "react-router-dom"

const loginCook = async (cookData) => {
  try {
    // clearAuthData()
    const response = await api.post("/api/cooks/login", cookData)
   
    console.log("Cook login response:", response)

    // Extract token from response
    const token = response.token || response.data?.token

    if (!token) {
      console.error("No token in response:", JSON.stringify(response, null, 2))
      throw new Error("No token received from server")
    }

    // Save user data to localStorage
    const saved = saveUserData("cook", token)
    if (!saved) {
      throw new Error("Failed to save user data")
    }

    console.log("Cook login successful, token saved")

    // Return the response and user type for the auth context
    return {
      ...response,
      userType: "cook",
    }
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

export const useCookLogin = ({ onSuccess } = {}) => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: loginCook,
    onSuccess: (data) => {
      // Extract token
      const token = data.token || data.data?.token

      if (token) {
        // Update auth context
        login({ type: "cook" }, token)

        // Navigate to cook homepage
        navigate("/cook/homepage")

        // Call custom onSuccess if provided
        if (onSuccess) {
          onSuccess(data)
        }
      } else {
        console.error("No token in mutation success handler")
      }
    },
  })

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  }
}

