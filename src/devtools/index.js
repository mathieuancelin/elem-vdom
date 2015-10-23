import ErrorMonitor from './errormonitor';
import PerfMonitor from './perfmonitor';
import Redbox from './redbox';
import * as Perf from './perfs';
import * as InspectorAPI from './inspectorapi';
import Inspector from './inspector';

// TODO : dev plugin to inject ErrorMonitor, PerfMonitor, Inspector
// TODO : show compile errors redbox style
export default {
  ErrorMonitor,
  PerfMonitor,
  Redbox,
  Perf,
  InspectorAPI,
  Inspector
};
