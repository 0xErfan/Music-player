import React from 'react'

const Loader = () => {
  return (
      <div className={`middle fixed inset-0 w-full z-[1000] h-screen`}>
          <div className="flex items-center flex-col justify-center h-full">
              <div>
                  <div className="bar bar1"></div>
                  <div className="bar bar2"></div>
                  <div className="bar bar3"></div>
                  <div className="bar bar4"></div>
                  <div className="bar bar5"></div>
                  <div className="bar bar6"></div>
                  <div className="bar bar7"></div>
                  <div className="bar bar8"></div>
              </div>
              <h3 className=" text-xl mt-2 font-bold font-anta text-center">Loading...</h3>
          </div>
      </div>
  )
}

export default Loader;