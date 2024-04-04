import { useEditor } from "@grapesjs/react";
import * as Select from '@radix-ui/react-select';
import { BsCheck2} from "react-icons/bs";
import * as Checkbox from '@radix-ui/react-checkbox';


const TraitPropertyField = ({trait,...rest}) => {

  const editor = useEditor();

  const handleChange = (value) => {
    trait.setValue(value);
  };

  const onChange = (ev) => {
    handleChange(ev.target.value);
  };

  const handleButtonClick = () => {
    const command = trait.get('command');
    if (command) {
      typeof command === 'string'
        ? editor.runCommand(command)
        : command(editor, trait);
    }
  };

  const type = trait.getType();
  const defValue = trait.getDefault() || trait.attributes.placeholder;
  const value = trait.getValue();
  const valueWithDef = typeof value !== 'undefined' ? value : defValue;

  let inputToRender = (
    <input
      type="text"
      placeholder={defValue}
      value={value}
      onChange={onChange}
      className="w-full"
    />
  );

  switch (type) {
    case 'select':
      {
        inputToRender = (
          <select value={value} onChange={onChange} className="w-full">
            {trait.getOptions().map((option) => (
              <option key={trait.getOptionId(option)} value={trait.getOptionId(option)}>
                {trait.getOptionLabel(option)}
              </option>
                  ))}
          </select>
        );
      }
      break;
    case 'color':
      {
        inputToRender = (
          <input
            type="color"
            className="w-[15px] h-[15px] cursor-pointer opacity-0"
            value={valueWithDef}
            onChange={(ev) => handleChange(ev.target.value)}
          />

        );
      }
      break;
    case 'checkbox':
      {
        inputToRender = (
          <div>
            <input checked={value} onChange={(ev) => trait.setValue(ev.target.checked)} type="checkbox" />
          </div>
        );
      }
      break;
    case 'button':
      {
        inputToRender = (
          <button onClick={handleButtonClick}>
            {trait.getLabel()}
          </button>
        );
      }
      break;
  }


  return (
    <div {...rest} className='mb-3 px-1 w-full'>
      <div className='flex mb-2 flex-wrap items-center'>
        <div className="flex-grow capitalize">{trait.getLabel()}</div>
        {inputToRender}
      </div>
    </div>
  )
}

export default TraitPropertyField