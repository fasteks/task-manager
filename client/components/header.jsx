import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import classnames from 'classnames'
import './header.scss'

import { setTimespan } from '../redux/reducers/tasks'
import { getCategories } from '../redux/reducers/categories'

const Header = ({ category, setHidden, isDel, setDel, active, setActive }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const isMain = location.pathname === '/'
  const { categoriesList } = useSelector((s) => s.categories)
  const isCategoryList = categoriesList.length === 0
  const initialValue = isMain ? null : 0
  const [activeCategory, setActiveCategory] = useState(initialValue)
  const timespanObj = {
    day: 'day',
    week: 'week',
    month: 'month',
    century: 'century'
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <div className="min-w-fit flex justify-center items-center min-w-full p-4 text-white font-semibold bg-neutral-800">
      {isMain && !isCategoryList && (
        <button
          type="button"
          className="italic font-thin text-neutral-500"
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
                id={`category-${index}`}
                title={it}
                className={classnames('header__category p-2', {
                  'header__category--active': activeCategory === index
                })}
                onClick={(e) => {
                  if (!isMain) {
                    setHidden(false)
                    setActiveCategory(index)
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
        <p className="p-2 text-center">There is no available categories!</p>
      )}
      {!isMain && (
        <div className="flex flex-wrap justify-center items-center grow">
          Show:
          <button
            type="button"
            id="button-1"
            className={classnames('ml-2 p-2 text-center', {
              'header__button--active': active === 'button-1'
            })}
            onClick={() => {
              setActive('button-1')
              setHidden(false)
              dispatch(setTimespan(category, timespanObj.century))
            }}
          >
            All
          </button>
          <button
            type="button"
            id="button-2"
            className={classnames('p-2 text-center', {
              'header__button--active': active === 'button-2'
            })}
            onClick={() => {
              setActive('button-2')
              setHidden(false)
              dispatch(setTimespan(category, timespanObj.day))
            }}
          >
            Day
          </button>
          <button
            type="button"
            id="button-3"
            className={classnames('p-2 text-center', {
              'header__button--active': active === 'button-3'
            })}
            onClick={() => {
              setActive('button-3')
              setHidden(false)
              dispatch(setTimespan(category, timespanObj.week))
            }}
          >
            Week
          </button>
          <button
            type="button"
            id="button-4"
            className={classnames('p-2 text-center', {
              'header__button--active': active === 'button-4'
            })}
            onClick={() => {
              setActive('button-4')
              setHidden(false)
              dispatch(setTimespan(category, timespanObj.month))
            }}
          >
            Month
          </button>
          <button
            type="button"
            id="button-5"
            className={classnames('p-2 text-center italic text-neutral-500', {
              'header__button--active': active === 'button-5'
            })}
            onClick={() => {
              setActive('button-5')
              setHidden(true)
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
