import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getCategories } from '../redux/reducers/tasks'

const Header = () => {
  const dispatch = useDispatch()
  const { categoriesList } = useSelector((s) => s.tasks)
  const isCategoryList = categoriesList.length === 0

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <div className="flex justify-center items-center min-w-full p-4 text-white font-semibold bg-neutral-800">
      {!isCategoryList ? (
        <div className="flex flex-wrap justify-center grow">
          <span className="p-1 text-center">Choose tasks category:</span>
          {categoriesList.map((it, index) => {
            return (
              <div key={index} className="p-1">
                {it}
              </div>
            )
          })}
        </div>
      ) : (
        <span className="p-1 text-center">There are no available categories!</span>
      )}
    </div>
  )
}

Header.propTypes = {}

export default Header
