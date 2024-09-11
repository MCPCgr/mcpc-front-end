
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebookF, faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import { faDatabase } from '@fortawesome/free-solid-svg-icons'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { faStreetView } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { faCalculator } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import { faAndroid } from '@fortawesome/free-brands-svg-icons'
import lib from '@ant-design/icons-vue'

library.add(faFacebookF)
library.add(faTwitter)
library.add(faYoutube)
library.add(faXTwitter)
library.add(faFacebook)
library.add(faInstagram)
library.add(faLinkedin)
library.add(faTelegram)
library.add(faLinkedinIn)
library.add(faChevronRight)
library.add(faEarthAsia)

library.add(faMapLocationDot)
library.add(faFileInvoice)
library.add(faDatabase)
library.add(faClipboardList)
library.add(faStreetView)
library.add(faCircleCheck)

library.add(faArrowRight)
library.add(faArrowLeft)
library.add(faInfo)

library.add(faAngleRight)
library.add(faAngleDown)

library.add(faChalkboardUser)
library.add(faChartLine)
library.add(faGlobe)
library.add(faUser)
library.add(faLock)

library.add(faCalculator)
library.add(faSearch)
library.add(faRotateLeft)
library.add(faApple)
library.add(faAndroid)
library.add(faHeart)


export function initFontawesome(app) {
  app.component("font-awesome-icon", FontAwesomeIcon);
}
