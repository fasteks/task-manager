import React from 'react'
import { useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrinBeam } from '@fortawesome/free-solid-svg-icons'

import TaskHidden from './taskHidden'

const Hidden = ({ category }) => {
  const { hiddenList } = useSelector((s) => s.tasks)
  const isHiddenList = hiddenList.length === 0

  return (
    <div className="flex flex-wrap items-center justify-center p-3 rounded-3xl bg-neutral-800">
      {!isHiddenList ? (
        hiddenList.map((it) => {
          return (
            <TaskHidden
              key={it.taskId}
              taskObj={it}
              category={category}
              isHiddenList={isHiddenList}
            />
          )
        })
      ) : (
        <div className="flex flex-col text-lg font-semibold text-green-600">
          Oh, you found a secret place!
          <FontAwesomeIcon icon={faGrinBeam} className="text-yellow-500 text-4xl" />
        </div>
      )}
    </div>
  )
}

Hidden.propTypes = {}

export default Hidden
