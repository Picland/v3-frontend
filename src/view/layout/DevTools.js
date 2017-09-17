/**
 * @fileoverview redux devtools config
 * @reference https://github.com/gaearon/redux-devtools
 * @reference https://github.com/gaearon/redux-devtools-dock-monitor
 * @reference https://github.com/romseguy/redux-devtools-chart-monitor
 */

import React from 'react'
import { createDevTools } from 'redux-devtools'
import DockMonitor from 'redux-devtools-dock-monitor'
import LogMonitor from 'redux-devtools-log-monitor'
import ChartMonitor from 'redux-devtools-chart-monitor'

const tooltipOptions = {
  disabled: false,
  indentationSize: 2,
  style: {
    'background-color': '#222',
    opacity: '1',
    'border-radius': '5px',
    padding: '5px',
    color: '#fff'
  }
}

const DevTools = createDevTools(
  <DockMonitor
    defaultIsVisible={false}
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
  >
    <LogMonitor theme="tomorrow" />
    <ChartMonitor invertTheme tooltipOptions={tooltipOptions} />
  </DockMonitor>
)

export default DevTools
