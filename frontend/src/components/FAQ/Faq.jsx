import React, { useState } from 'react'

const Faq = () => {
    const [faqData, setFaqData] = useState(faqs);
    
      const toggleQuestion = (index) => {
        const updatedFaqData = [...faqData];
        updatedFaqData[index].isOpen = !faqData[index].isOpen;
        setFaqData(updatedFaqData);
      };
    
      return (
        <div className="container px-6 py-12 mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">
            Frequently asked questions
          </h1>
    
          <div className="mt-8 space-y-8 lg:mt-12">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`p-8 rounded-lg dark:bg-gray-800 ${
                  faq.isOpen ? 'bg-gray-100' : 'bg-gray-100'
                }`}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="flex items-center justify-between w-full"
                >
                  <h1 className="font-semibold text-gray-700 dark:text-white">
                    {faq.question}
                  </h1>
                  <span
                    className={`text-white rounded-full p-2 ${
                      faq.isOpen ? 'bg-blue-500' : 'bg-blue-700'
                    }`}
                  >
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
                        d={faq.isOpen ? 'M6 18L18 6' : 'M18 12H6'}
                      />
                    </svg>
                  </span>
                </button>
    
                {faq.isOpen && (
                  <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
  )
}

const faqs = [
    {
      question: 'How can I pay for my appointment?',
      answer:
        'You can pay through several methods that can be chosen through the steps of making your own order, as there is a payment method available through cash and through Visa card.',
      isOpen: false,
    },
    {
      question: 'How can I contact the craftsman?',
      answer: 'Within our website there is a chat feature between the customer and the craftsman, where by clicking on the craftsman there is a button that enables you to go to your chats page and through it you can communicate with the craftsman with ease.',
      isOpen: false,
    },
    {
      question: 'Do I need to register an account in order to make a purchase?',
      answer: 'Yes, it is necessary to create your own account in order to make the purchase. You must be careful not to register an account as a customer',
      isOpen: false,
    },
    {
      question: 'How do I book a craftsman for my own workshop?',
      answer: 'You can do this by clicking on the craftsman and it is necessary to specify the hours you desire, after which the acceptance or rejection will be done by the craftsman',
      isOpen: false,
    },
    {
      question: 'What types of products do we have?',
      answer: 'The products that we have are equipment of all kinds, such as construction tools and tools for plumbing, mechanical, and others.',
      isOpen: false,
    },
  ]
export default Faq