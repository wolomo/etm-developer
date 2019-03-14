import CalendarLocale from '../../vc-calendar/src/locale/pl_PL'
import TimePickerLocale from '../../time-picker/locale/pl_PL'

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Wybierz datę',
    rangePlaceholder: [
      'Data początkowa', 'Data końcowa',
    ],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
}

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/lo
// cale/example.json

export default locale
