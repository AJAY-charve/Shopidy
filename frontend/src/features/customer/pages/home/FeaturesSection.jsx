import { FaTruck, FaUndoAlt, FaLock, FaHeadset } from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaTruck className="text-3xl" />,
      title: "FREE SHIPPING",
      description: "On orders over $100",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: <FaUndoAlt className="text-3xl" />,
      title: "45 DAYS RETURN",
      description: "Money back guarantee",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: <FaLock className="text-3xl" />,
      title: "SECURE PAYMENT",
      description: "100% secure checkout",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: <FaHeadset className="text-3xl" />,
      title: "24/7 SUPPORT",
      description: "Dedicated customer support",
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 text-center hover:shadow-md transition-all duration-300 rounded-2xl border border-gray-100"
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
