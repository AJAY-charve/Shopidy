import mensCollectionImage from "../../../../assets/mens-collection.webp";
import womenCollectionImage from "../../../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Shop by Collection</h2>
          <p className="text-gray-600">
            Explore our curated collections for men and women
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Women Collection */}
          <div className="group relative overflow-hidden rounded-2xl">
            <img
              src={womenCollectionImage}
              alt="Women's Collection"
              className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-3xl font-bold mb-2">Women's Collection</h3>
              <p className="mb-4 text-white/80">Elegant & Modern Styles</p>
              <Link
                to="/collections/all?gender=Women"
                className="inline-block bg-white text-gray-900 px-6 py-2 rounded-md font-medium hover:bg-amber-500 hover:text-white transition-colors"
              >
                Shop Women
              </Link>
            </div>
          </div>

          {/* Men Collection */}
          <div className="group relative overflow-hidden rounded-2xl">
            <img
              src={mensCollectionImage}
              alt="Men's Collection"
              className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-3xl font-bold mb-2">Men's Collection</h3>
              <p className="mb-4 text-white/80">Classic & Contemporary</p>
              <Link
                to="/collections/all?gender=Men"
                className="inline-block bg-white text-gray-900 px-6 py-2 rounded-md font-medium hover:bg-amber-500 hover:text-white transition-colors"
              >
                Shop Men
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollection;
