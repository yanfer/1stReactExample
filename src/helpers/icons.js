import { library } from "@fortawesome/fontawesome-svg-core";

import { faTrash, 
  faSignOutAlt, 
  faPenToSquare, 
  faCircleNotch, 
  faCirclePlus
} from "@fortawesome/free-solid-svg-icons";

/* para llamar iconos de Fontawesome se usan mayusculas en vez de guiones "faSignOutAlt"  */
/* para agregarlos donde los pondremos se pone como  aparece en Fontawesome sin fa "sign-out-alt"  */

const Icons = () =>{
  return library.add(faTrash, faSignOutAlt, faPenToSquare, faCircleNotch, faCirclePlus);
}

export default Icons;