// components/TopCooksList.js
import React from "react";
import { Link } from "react-router-dom";

export const TopCooksList = ({ cooks }) => {
  return (
		<div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-semibold text-gray-900">
					Top Performing Cooks
				</h2>
				<Link
					to="/admin/cookDetails"
					className="text-blue-500 text-sm md:text-base hover:underline"
				>
					View All
				</Link>
			</div>
			<div className="space-y-3">
				{cooks.map((cook, index) => (
					<div
						key={index}
						className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
					>
						<div>
							<span className="text-base font-medium text-gray-900">
								{cook?.name}
							</span>
							<div className="flex items-center mt-1">
								<span className="text-lg text-yellow-500">★</span>
								<span className="text-sm text-gray-500 ml-1">
									{cook.rating}
								</span>
							</div>
						</div>
						<div className="text-right">
							<span className="text-base font-medium text-gray-900">
								{cook.earnings}
							</span>
							<p className="text-sm text-gray-500">{cook.orders} orders</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
