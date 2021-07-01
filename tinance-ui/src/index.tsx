import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-tw';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ReactDOM from 'react-dom';

import App from './App';

dayjs.extend(relativeTime);

ReactDOM.render(<App />, document.getElementById('root'));
