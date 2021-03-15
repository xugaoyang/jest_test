import axios from 'axios'

function fetchListData() {
  return axios.get('./data.json')
}
export default fetchListData
