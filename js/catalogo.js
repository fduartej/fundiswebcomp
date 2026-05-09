const CATALOGO_URL = "data/catalogo.json";

function CatalogoCard({ catalogo }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden h-64">
        <img
          src={catalogo.image}
          alt={catalogo.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          style={{ zIndex: 1 }}
        />
        {/* Overlay solo aparece en hover */}
        <div
          className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{ zIndex: 2 }}
        ></div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
          {catalogo.description}
        </p>

        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium">
              {catalogo.price}
            </span>
          </div>

          <div className="flex items-center bg-yellow-50 dark:bg-yellow-900 px-3 py-1 rounded-full">
            <span className="text-yellow-500 mr-1">⭐</span>
            <span className="text-yellow-700 dark:text-yellow-300 text-sm font-semibold">
              {catalogo.rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CatalotoGrid({ catalogos }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {catalogos.map((catalogo, idx) => (
        <CatalogoCard key={idx} catalogo={catalogo} />
      ))}
    </div>
  );
}

function App() {
  const [catalogos, setCatalogos] = React.useState([]);

  React.useEffect(() => {
    fetch(CATALOGO_URL)
      .then((res) => res.json())
      .then((data) => {
        setCatalogos(data); // Simplificado
      })
      .catch((error) => {
        console.error("Error fetching catalogos:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Collection
        </h1>
        <CatalotoGrid catalogos={catalogos} />
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("catalogogrid"));
