import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

// import { CENTURY, DAY, MONTH, WEEK } from '../../server/server'
import { getCategories, setTimespan } from '../redux/reducers/tasks'

const Header = ({ category, hidden, setHidden, isDel, setDel }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const isMain = location.pathname === '/'
  const { categoriesList } = useSelector((s) => s.tasks)
  const isCategoryList = categoriesList.length === 0

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <div className="relative flex justify-center items-center min-w-full p-4 text-white font-semibold bg-neutral-800">
      {isMain && (
        <button
          type="button"
          className="absolute right-3/4 italic font-thin text-neutral-500"
          onClick={() => {
            setDel(!isDel)
          }}
        >
          del
        </button>
      )}
      {!isCategoryList ? (
        <div className="flex flex-wrap justify-center items-center grow">
          {isMain ? (
            <div to="/" className="p-2 text-center">
              Category:
            </div>
          ) : (
            <Link to="/" className="p-2 text-center">
              Category:
            </Link>
          )}
          {categoriesList.map((it, index) => {
            return (
              <Link
                to={`/${it}`}
                key={index}
                title={it}
                className="p-2"
                onClick={(e) => {
                  if (!isMain) {
                    setHidden(false)
                  }
                  if (location.pathname === `/${it}`) {
                    e.preventDefault()
                  }
                }}
              >
                {it}
              </Link>
            )
          })}
        </div>
      ) : (
        <Link to="/" className="p-2 text-center">
          There are no available categories!
        </Link>
      )}
      {!isMain && (
        <div className="flex flex-wrap justify-center items-center grow">
          Show:
          <button
            type="button"
            className="ml-2 p-2 text-center"
            onClick={() => {
              setHidden(false)
              dispatch(setTimespan(category, 'century'))
            }}
          >
            All
          </button>
          <button
            type="button"
            className="p-2 text-center"
            onClick={() => {
              setHidden(false)
              dispatch(setTimespan(category, 'day'))
            }}
          >
            Day
          </button>
          <button
            type="button"
            className="p-2 text-center"
            onClick={() => {
              setHidden(false)
              dispatch(setTimespan(category, 'month'))
            }}
          >
            Week
          </button>
          <button
            className="p-2 text-center"
            type="button"
            onClick={() => {
              setHidden(false)
              dispatch(setTimespan(category, 'week'))
            }}
          >
            Month
          </button>
          <button
            className="p-2 text-center italic text-neutral-500"
            type="button"
            onClick={() => {
              setHidden(!hidden)
            }}
          >
            Hidden
          </button>
        </div>
      )}
    </div>
  )
}

Header.propTypes = {}

export default Header
