import React from 'react'
import { useSelector } from 'react-redux'

import TaskHidden from './taskHidden'

const Hidden = ({ category }) => {
  const { hiddenList } = useSelector((s) => s.tasks)
  const isHiddenList = hiddenList.length === 0

  return (
    <div className="flex flex-wrap p-5 rounded-3xl bg-neutral-800">
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
        <div className="flex flex-col text-white">
          Oh, you found my secret place!
          <i className="p-1 far fa-grin-beam" style={{ fontSize: '36px' }} />
        </div>
      )}
    </div>
  )
}

Hidden.propTypes = {}

export default Hidden
