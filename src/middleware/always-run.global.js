import {userInfo, company} from "~/store/useSiteSettings";
import {Modal, notification} from 'ant-design-vue';
import {ExclamationCircleOutlined} from "@ant-design/icons-vue";
export default defineNuxtRouteMiddleware((to, from) => {
    const securePaths = new Set([
        "/attendance",
        "/company",
        "/dashboard",
        "/erp",
        "/form",
        "/inventory",
        "/plan",
        "/user",
        "/select-role",
        "/select",
        "/company/register",
    ]);

    const firstRoute = getFirstRoute(to)
    const fromFirstRoute = getFirstRoute(from)
    if (securePaths.has(firstRoute)) {
        if(userInfo.value === null){
            notification["warning"]({
                message: 'Нэвтэрнэ үү',
                description: 'Систем ашиглахын тулд систем нэвтэрнэ үү !!!',
            });

            if (securePaths.has(fromFirstRoute)) {
                return navigateTo("/");
            } else {
                return navigateTo(from.fullPath);
            }

        } else {

          if(company.value){
            if(company.value.subscription_active !== undefined){
              if(company.value.subscription_active === false){

                Modal.confirm({
                  title: `${company.company_name}. Танай байгууллагын систем ашиглах эрх хаагдсан байна борлуулалтын албатай холбогдоно уу?`,
                  icon: h(ExclamationCircleOutlined),
                  content: `Борлуулалтын албаны утас: 7711-6060`,
                  okText: 'За',
                  okType: 'danger',
                  cancelText: 'Хаах',
                  onOk() {
                    window.location.replace('/work#contact-info');
                  },
                  onCancel() {
                    window.location.replace('/');
                  },
                });
              }
            }
          }

        }
    }
})

const getFirstRoute = (routerPath)=>{
    let endIndex = routerPath.fullPath.indexOf('/', 1); // Find second slash
    endIndex = endIndex === -1 ? undefined : endIndex; // If not found, take whole string

    return routerPath.fullPath.slice(0, endIndex);
}
