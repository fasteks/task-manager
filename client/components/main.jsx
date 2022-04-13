import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons'

import Head from './head'
import Header from './header'

import { addCategory, deleteCategory } from '../redux/reducers/categories'

const Main = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const { categoriesList } = useSelector((s) => s.categories)

  const isCategoryOnList = (str) => {
    return categoriesList.includes(str)
  }
  return (
    <div className="min-h-screen flex flex-col flex-wrap bg-gray-500">
      <Head title="Tasks" />
      <Header />
      <div className="my-auto h-full flex flex-col justify-center items-center flex-wrap">
        <div className="flex flex-col justify-center items-center flex-wrap p-5 rounded-md bg-neutral-800">
          <p className="p-1 text-white text-xl">set category:</p>
          <div className="flex justify-center items-center">
            <input
              type="text"
              className="text-black text-lg"
              value={text}
              onChange={(e) => {
                setText(e.target.value)
              }}
            />
            <button
              type="button"
              className="ml-2 p-1 text-green-500"
              onClick={() => {
                if (text.length > 1 && text.trim() !== '') {
                  setText('')
                  dispatch(addCategory(text))
                }
              }}
            >
              <FontAwesomeIcon icon={faCheck} className="text-3xl" />
            </button>
            <button
              type="button"
              className="ml-0.5 p-1 text-red-500 rounded-md"
              onClick={() => {
                if (text.length > 1 && isCategoryOnList(text)) {
                  setText('')
                  dispatch(deleteCategory(text))
                } else {
                  setText('wrong')
                }
              }}
            >
              <FontAwesomeIcon icon={faMinus} className="text-3xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

Main.propTypes = {}

export default React.memo(Main)
