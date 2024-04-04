import React from 'react';
import { useEditor } from '@grapesjs/react';
import { BsArrowUpCircle, BsArrowDownCircle, BsTrash, BsXLg, BsPlusLg } from "react-icons/bs";
import * as Slider from '@radix-ui/react-slider';



const StylePropertyField = ({prop,...rest}) => {

  const editor = useEditor();

  const handleChange = (value) => {
    prop.upValue(value);
  };

  const onChange = (ev) => {
    handleChange(ev.target.value);
  };

  const openAssets = () => {
    const { Assets } = editor;
    Assets.open({
      select: (asset, complete) => {
        console.log({ complete });
        prop.upValue(asset.getSrc(), { partial: !complete });
        complete && Assets.close();
      },
      types: ['image'],
      accept: 'image/*',
    });
  };

  const type = prop.getType();
  const defValue = prop.getDefaultValue();
  const canClear = prop.canClear();
  const hasValue = prop.hasValue();
  const value = prop.getValue();
  const valueString = hasValue ? value : '';
  const valueWithDef = hasValue ? value : defValue;

  let inputToRender = (
    <input
      type='text'
      placeholder={defValue}
      value={valueString}
      onChange={onChange}
      className='w-full'
    />
  );

  switch (type) {
    case 'radio':
      {
        const radioProp = prop;
        inputToRender = (
            <div className='flex gap-5 flex-wrap'>
              {
                radioProp.getOptions().map((option) => (
                  <div className='flex gap-2 items-center' key={radioProp.getOptionId(option)} >
                      <input type="radio" onChange={onChange} name={radioProp.getName(option)} value={radioProp.getOptionId(option)} id={radioProp.getOptionId(option)} />
                      <label className='capitalize text-sm' htmlFor={radioProp.getOptionId(option)}>
                        {radioProp.getOptionLabel(option)} 
                      </label>
                    </div>
                ))
              }
            </div>
        );
      }
      break;
    case 'select':
      {
        const selectProp = prop;
        const selectOptions = selectProp.getOptions();
        inputToRender = (
          <select value={value} onChange={onChange}>
            {selectOptions.map((option) => (
              <option key={selectProp.getOptionId(option)} value={selectProp.getOptionId(option)}>{selectProp.getOptionLabel(option)}</option>
            ))}
          </select>
        );
      }
      break;
    case 'color':
      {
        inputToRender = (
          <div className='relative rounded-md border border-gray-300'>
            <input
            className=' h-full absolute  left-2 '
            type="color"
            value={valueWithDef}
            onChange={(ev) => handleChange(ev.target.value)}
          />
          <input className='shadow-none border-none w-full pl-16 ' type="text" value={valueWithDef} onChange={(ev) => handleChange(ev.target.value)} />
          </div>
          
        );
      }
      break;
    case 'slider':
      {
        const sliderProp = prop;
        console.log(sliderProp);
        inputToRender = (
          <></>
          // <Slider.Root value={parseFloat(value)} defaultValue={sliderProp.getMin()} min={sliderProp.getMin()} max={sliderProp.getMax()} step={sliderProp.getStep()} onValueChange={onChange}>
          //   <Slider.Track>
          //     <Slider.Range/>
          //   </Slider.Track>
          //   <Slider.Thumb />
          // </Slider.Root>
        );
      }
      break;
    case 'file':
      {
        inputToRender = (
          <div className="flex flex-col items-center gap-3">
            {value && value !== defValue && (
              <div
                className="w-[50px] h-[50px] rounded inline-block bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url("${value}")` }}
                onClick={() => handleChange('')}
              />
            )}
            <button type="button" onClick={openAssets}>
              Select Image
            </button>
          </div>
        );  
      }
      break;
    case 'composite':
      {
        const compositeProp = prop;
        inputToRender = (
          <div
            className='composite flex flex-wrap gap-2'
          >
            {compositeProp.getProperties().map((prop) => (
              <StylePropertyField className="flex-1 flex flex-col justify-between " key={prop.getId()} prop={prop} />
            ))}
          </div>
        );
      }
      break;
    case 'stack':
      {
        const stackProp = prop;
        const layers = stackProp.getLayers();
        const isTextShadow = stackProp.getName() === 'text-shadow';
        inputToRender = (
          <div
            className='stack flex flex-col p-2 gap-2 min-h-[54px]'
          >
            {layers.map((layer) => (
              <div key={layer.getId()}>
                <div className="flex gap-1 px-2 py-1 items-center border border-slate-700">
                  <BsArrowUpCircle onClick={() => layer.move(layer.getIndex() + 1)}/>
                  <BsArrowDownCircle onClick={() => layer.move(layer.getIndex() - 1)}/>
                  <button className="flex-grow" onClick={() => layer.select()}>
                    {layer.getLabel()}
                  </button>
                  <div
                    className='bg-white min-w-[17px] min-h-[17px] text-black text-sm flex justify-center'
                    style={layer.getStylePreview({
                      number: { min: -3, max: 3 },
                      camelCase: true,
                    })}
                  >
                    {isTextShadow && 'T'}
                  </div>
                  <BsTrash onClick={() => layer.remove()}/>
                </div>
                {layer.isSelected() && (
                  <div className="p-2 flex flex-wrap gap-2">
                    {stackProp.getProperties().map((prop) => (
                      <StylePropertyField className="flex-1" key={prop.getId()} prop={prop} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }
      break;
  }

  return (
    <div className=' py-2' {...rest} >
      <div className='flex mb-2 items-center'>
        <div className="flex-grow capitalize mt-3 text-indigo-700 ">{prop.getLabel()}</div>
        {canClear && (
          <button className='mx-2' onClick={() => prop.clear()}>
            <BsXLg className='text-indigo-600' />
          </button>
        )}
        {type === 'stack' && (
          <BsPlusLg className='mx-2 text-indigo-500' onClick={() => (prop).addLayer({}, { at: 0 })}/>
        )}
      </div>
      {inputToRender}
    </div>
  )
}

export default StylePropertyField