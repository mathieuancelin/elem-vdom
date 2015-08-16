import ErrorMonitor from './errormonitor';
import PerfMonitor from './perfmonitor';
import Redbox from './redbox';
import * as Perf from './perfs';
import * as InspectorAPI from './inspectorapi';
import * as Inspector from './inspector';

// TODO : remove that
window.InspectorAPI = InspectorAPI;

export default {
  ErrorMonitor,
  PerfMonitor,
  Redbox,
  Perf,
  InspectorAPI,
  Inspector
};
