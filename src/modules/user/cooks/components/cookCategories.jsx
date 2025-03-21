export const CookCategories = ({ cook }) => {
	
	if (!cook || !cook.categories) {
	  return <p className="text-gray-500">No categories available.</p>;
	}
  
	return (
	  <div>
		{cook.categories.map((category) => (
		  <div key={category.id}>{category.name}</div>
		))}
	  </div>
	);
  };
  