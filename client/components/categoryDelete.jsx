import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { deleteCategory } from '../redux/reducers/tasks'

const CategoryDelete = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const { categoriesList } = useSelector((s) => s.tasks)
  let isCategory
  const isCategoryOnList = (str) => {
    isCategory = categoriesList.indexOf(str)
    return isCategory
  }

  useEffect(() => {
    isCategoryOnList(text)
  }, [text])

  return (
    <div className="flex justify-center items-center">
      <input
        type="text"
        className="text-black text-lg"
        value={text}
        onClick={() => {
          setText('')
        }}
        onChange={(e) => {
          setText(e.target.value)
        }}
      />
      <button
        type="button"
        className="ml-0.5 p-1 text-red-500 rounded-md"
        onClick={() => {
          if (text.length > 1 && isCategory !== -1) {
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
  )
}

CategoryDelete.propTypes = {}

export default CategoryDelete
