import React from 'react'

const Features = () => {
  return (
    <div className="container px-6 py-10 mx-auto">
    <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
      explore our <br /> awesome <span className="text-blue-500">Components</span>
    </h1>

    <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800"
        >
          <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={feature.iconPath}
              />
            </svg>
          </span>

          <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
            {feature.title}
          </h1>

          <p className="text-gray-500 dark:text-gray-300">{feature.description}</p>

        
        </div>
      ))}
    </div>
  </div>
);
}



const features = [
{
  title: "Our services and products:",
  description:
    "Our services and products suit all needs and all types of workshops",
  iconPath:
    "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  arrowIconPath:
    "M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z",
},
{
  title: "Communication",
  description:
    "To avoid any delay and reach the workshop location, we provide in our application the chat feature between the craftsman and the service requester so that everything is agreed upon through the chat.",
  iconPath:
    "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
  arrowIconPath:
    "M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z",
},
{
  title: "Bills",
  description:
    "Through the site, you can verify the full amount owed and refute every part of the bill",
  iconPath:
    "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  arrowIconPath:
    "M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z",
},
];
export default Features