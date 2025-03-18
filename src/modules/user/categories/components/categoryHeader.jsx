export const CategoryHeader = ({ category }) => {
    return (
      <div className="relative mb-8">
        <div className="h-64 overflow-hidden rounded-lg">
          <img
            src={category.img || "/placeholder.svg?height=400&width=1000"}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center p-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{category.name}</h1>
              <p className="text-white max-w-2xl mx-auto">{category.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  