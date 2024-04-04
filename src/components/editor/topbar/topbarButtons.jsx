import { BsArrowsFullscreen, BsBorder, BsCode, BsArrowCounterclockwise, BsArrowClockwise } from "react-icons/bs";
import { useEditor } from '@grapesjs/react';
import { useEffect } from "react";


const TopbarButtons = () => {
  
  const editor = useEditor();
  const { UndoManager, Commands } = editor;
  
  const cmdButtons = [
    {
      title: "Enable components outline",
      id: 'core:component-outline',
      icon: <BsBorder/>,
    },
    {
      title: "Fullscreen editor",
      id: 'core:fullscreen',
      icon: <BsArrowsFullscreen/>,
      options: { target: '#root' },
    },
    {
      title: "View code",
      id: 'core:open-code',
      icon: <BsCode/>,
    },
    {
      title: "Undo change",
      id: 'core:undo',
      icon: <BsArrowCounterclockwise/>,
      disabled: () => !UndoManager.hasUndo(),
    },
    {
      title: "Redo change",
      id: 'core:redo',
      icon: <BsArrowClockwise/>,
      disabled: () => !UndoManager.hasRedo(),
    },
  ];

  return (
    <div className="flex gap-3">
      {
        cmdButtons.map(({title, id, icon,options,disabled})=>(
          <button title={title} key={id} type="button" onClick={()=>{
            Commands.isActive(id) ? Commands.stop(id) : Commands.run(id,options)
          }} disabled={disabled}>
            {icon}
          </button>
        ))
      }
    </div>
  )
}

export default TopbarButtons