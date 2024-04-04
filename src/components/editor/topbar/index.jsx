import { WithEditor } from '@grapesjs/react';
import {DevicesProvider} from '@grapesjs/react';
import TopbarButtons from './topbarButtons';

const Topbar = () => {

  

  return (
    <>
      <DevicesProvider>
        {({ selected, select, devices }) => (
            <select className='text-sm' value={selected} onChange={(ev) => select(ev.target.value)}>
              {devices.map((device) => (
                <option value={device.id} key={device.id}>
                  {device.getName()}
                </option>
              ))}
            </select>
        )}
      </DevicesProvider>
      <WithEditor>
        <TopbarButtons/>
      </WithEditor>
    </>
  )
}

export default Topbar