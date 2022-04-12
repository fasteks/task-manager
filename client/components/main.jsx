import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import Head from './head'
import Header from './header'
import CategoryDelete from './categoryDelete'

import { addCategory } from '../redux/reducers/tasks'

const Main = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const [isDel, setDel] = useState(false)
  return (
    <div className="h-screen flex flex-col bg-gray-500">
      <Head title="Tasks" />
      <Header isDel={isDel} setDel={setDel} />
      <div className="h-full flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center p-5 rounded-md bg-neutral-800">
          <div className="p-1 text-white text-xl">set category:</div>
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
              className="p-1 text-green-500"
              onClick={() => {
                if (text.length > 1) {
                  setText('')
                  dispatch(addCategory(text))
                }
              }}
            >
              <FontAwesomeIcon icon={faCheck} className="p-1 text-4xl" />
            </button>
          </div>
          {isDel && <CategoryDelete />}
        </div>
      </div>
    </div>
  )
}

Main.propTypes = {}

export default React.memo(Main)
