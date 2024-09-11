import Modal from "ant-design-vue/lib/modal"

export const showWarning = (title,router) => {

  Modal.confirm({
    title:  "Ашигалах эрхгүй байна",
    content:`"${title}" үйлдлийг ашигалах эрхгүй байна. Таны багц одоогоор "Гарааны" багц, байна багц аа ахиулна уу`,
    okText: "Багц ахиулах",
    cancelText:  "Хаах",

    maskClosable:true,
    closable:true,
    onOk: () => {
      router.push("/company/billing?showSubscription=true")
    },
    onCancel () {
    }
  })
}
export const checkSubscription = (menu_id, subscriptionMenuIDS)=>{

  // return subscriptionMenuIDS.includes(menu_id);
  return true
}

export const checkSubscriptionAndGetUrl = (url,  menu_id, subscriptionMenuIDS)=>{

  // return subscriptionMenuIDS.includes(menu_id) ? url : "";

  return url;

}
