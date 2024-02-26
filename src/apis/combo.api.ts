import { Combo } from 'src/types/combo.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'unauth/product'

const comboApi = {
  getCombos() {
    return http.get<SuccessResponse<Combo[]>>(`${URL}`)
  }
}

export default comboApi
