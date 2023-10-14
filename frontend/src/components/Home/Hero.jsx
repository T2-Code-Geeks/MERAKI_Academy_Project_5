import React from 'react'

const Hero = () => {
  return (
    <div className="lg:flex">
      <div className="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
            <span className="text-blue-600 dark:text-blue-400">Project Idea</span>
          </h2>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 lg:text-base">
            The idea of the project is to provide a service to both the craftsmen and the users of the site, as the site finances a group of services provided by the craftsmen and the tools ,....where the tools are purchased and the service is chosen by each of them.
            To view our <br/> <b>services and products:</b>
          </p>

          <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
            <a href="/products" className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700">
               Products
            </a>
            <a href="/employees" className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md lg:mx-4 hover:bg-gray-300">
              Services
            </a>
          </div>
        </div>
      </div>

      <div className="w-full h-64 lg:w-1/2 lg:h-auto">
        <div className="w-full h-full bg-cover" style={{ backgroundImage: 'url(http://www.gannett-cdn.com/-mm-/5f7868aef0651d654c496e35955ff3e67f331d51/c=144-0-2448-1728&r=x404&c=534x401/local/-/media/DetroitNews/2014/10/02/ericshop.jpg)' }}>
          <div className="w-full h-full bg-black opacity-25"></div>
        </div>
      </div>
    </div>
  )
}

export default Hero