import React from 'react';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const StatusBanner = ({ userData }) => {
  const getStatusDetails = () => {
    switch (userData.profileStatus) {
      case 'approved':
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          color: 'bg-green-50 border-green-200',
          text: 'Your profile has been approved. You can now receive cooking orders.',
          textColor: 'text-green-700'
        };
      case 'pending':
        return {
          icon: <Clock className="h-5 w-5 text-yellow-500" />,
          color: 'bg-yellow-50 border-yellow-200',
          text: 'Your profile is pending approval. This usually takes 1-2 business days.',
          textColor: 'text-yellow-700'
        };
      case 'rejected':
        return {
          icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
          color: 'bg-red-50 border-red-200',
          text: `Your profile needs changes: ${userData.rejectionReason}`,
          textColor: 'text-red-700'
        };
      default:
        return {
          icon: <AlertTriangle className="h-5 w-5 text-gray-500" />,
          color: 'bg-gray-50 border-gray-200',
          text: 'Complete your profile to start receiving cooking orders.',
          textColor: 'text-gray-700'
        };
    }
  };

  const { icon, color, text, textColor } = getStatusDetails();

  return (
    <div className={`flex items-center p-4 mb-6 border rounded-lg ${color}`}>
      <div className="mr-3">{icon}</div>
      <p className={`text-sm ${textColor}`}>{text}</p>
    </div>
  );
};

export default StatusBanner;