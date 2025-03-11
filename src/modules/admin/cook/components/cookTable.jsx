import CookRow from "./CookRow";

const CookTable = ({ cooks, navigate }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-gray-200">
            {["Name", "Status", "Rating", "Products Sold", "Actions"].map((header) => (
              <th key={header} className="p-3 font-semibold text-gray-700 text-center align-middle">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cooks.map((cook) => (
            <CookRow key={cook.id} cook={cook} navigate={navigate} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CookTable;
