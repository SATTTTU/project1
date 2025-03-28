/**
 * Retrieves the Khalti pidx from localStorage
 * @returns {string|null} The pidx value or null if not found
 */
export const getKhaltiPidx=()=> {
    // Try to get the pidx directly
    const pidx = localStorage.getItem("khalti_pidx")
  
    // If direct pidx is not found, try to get it from the transaction object
    if (!pidx) {
      const transactionJson = localStorage.getItem("khalti_transaction")
      if (transactionJson) {
        try {
          const transaction = JSON.parse(transactionJson)
          return transaction.pidx || null
        } catch (error) {
          console.error("Error parsing transaction data:", error)
          return null
        }
      }
      return null
    }
  
    return pidx
  }
  
  /**
   * Constructs the Khalti payment URL with the pidx
   * @param {string} pidx - The payment ID
   * @returns {string} The complete Khalti payment URL
   */
  export function buildKhaltiPaymentUrl(pidx) {
    return `https://test-pay.khalti.com/?pidx=${pidx}`
  }
  
  /**
   * Navigates to the Khalti payment page using the pidx from localStorage
   * @returns {boolean} True if navigation was successful, false otherwise
   */
  export function navigateToKhaltiPayment() {
    const pidx = getKhaltiPidx()
  
    if (!pidx) {
      console.error("No pidx found in localStorage")
      return false
    }
  
    const paymentUrl = buildKhaltiPaymentUrl(pidx)
    console.log("Navigating to Khalti payment URL:", paymentUrl)
  
    // Navigate to the Khalti payment page
    window.location.href = paymentUrl
    return true
  }
  
  /**
   * Stores the Khalti pidx in localStorage
   * @param {string} pidx - The payment ID to store
   * @param {Object} additionalData - Optional additional data to store with the pidx
   */
  export function storeKhaltiPidx(pidx, additionalData = {}) {
    if (!pidx) {
      console.error("Cannot store empty pidx")
      return
    }
  
    // Store the pidx directly for easy access
    localStorage.setItem("khalti_pidx", pidx)
  
    // Also store in the transaction object with additional data
    localStorage.setItem(
      "khalti_transaction",
      JSON.stringify({
        pidx,
        ...additionalData,
        timestamp: new Date().toISOString(),
      }),
    )
  }
  
  