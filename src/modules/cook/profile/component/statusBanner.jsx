import { CheckCircle, AlertCircle, Clock } from "lucide-react"

const StatusBanner = ({ userData = {} }) => {
  // Determine account status
  const getStatusInfo = () => {
    const status = userData?.approval_status || "pending"
  

    switch (status.toLowerCase()) {
      case "approved":
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          color: "bg-green-50 border-green-200",
          textColor: "text-green-700",
          title: "Account Approved",
          message: "Your account has been approved. You can now receive orders.",
        }
      case "rejected":
        return {
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          color: "bg-red-50 border-red-200",
          textColor: "text-red-700",
          title: "Account Rejected",
          message:
            userData?.rejectionReason ||
            "Your account application was not approved. Please contact support for more information.",
        }
      case "pending":
      default:
        return {
          icon: <Clock className="h-5 w-5 text-yellow-500" />,
          color: "bg-yellow-50 border-yellow-200",
          textColor: "text-yellow-700",
          title: "Account Pending Review",
          message: "Your account is currently under review. This usually takes 1-2 business days.",
        }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <div className={`mb-6 p-4 border rounded-lg ${statusInfo.color}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">{statusInfo.icon}</div>
        <div>
          <h3 className={`font-medium ${statusInfo.textColor}`}>{statusInfo.title}</h3>
          <p className={`text-sm ${statusInfo.textColor}`}>{statusInfo.message}</p>
        </div>
      </div>
    </div>
  )
}

export default StatusBanner

