
import { getItem } from '@/utils'

export default {
  phoneCode: '',
  cityList: [],
  cityCode: 0,
  userPhone: getItem('phone') || ''
}