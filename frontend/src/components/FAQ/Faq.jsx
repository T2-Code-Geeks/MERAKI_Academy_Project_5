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
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas eaque nobis, fugit odit omnis fugiat deleniti animi ab maxime cum laboriosam recusandae facere dolorum veniam quia pariatur obcaecati illo ducimus?',
      isOpen: false,
    },
    {
      question: 'Is the cost of the appointment covered by private health insurance?',
      answer: 'Your answer here.',
      isOpen: false,
    },
    {
      question: 'Do I need a referral?',
      answer: 'Your answer here.',
      isOpen: false,
    },
    {
      question: 'What are your opening hours?',
      answer: 'Your answer here.',
      isOpen: false,
    },
    {
      question: 'What can I expect at my first consultation?',
      answer: 'Your answer here.',
      isOpen: false,
    },
  ]
export default Faq