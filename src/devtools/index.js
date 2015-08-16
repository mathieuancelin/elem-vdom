import ErrorMonitor from './errormonitor';
import PerfMonitor from './perfmonitor';
import RedBox from './redbox';
import * as Perf from './perfs';
import * as InspectorAPI from './inspectorapi';

window.InspectorAPI = InspectorAPI;

export default {
  ErrorMonitor,
  PerfMonitor,
  RedBox,
  Perf,
  InspectorAPI
};
