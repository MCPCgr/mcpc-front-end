import {
  BACK_ICON,
  CONFIRMATION2_ICON,
  CONFIRMATION_ICON,
  DARK_COLOR,
  ENTITY_ICON,
  FONT_FAMILY,
  LIGHT_COLOR,
  LINE_WIDTH,
  MESSAGE_ICON,
  OUT_PORT_HEIGHT,
  OUT_PORT_WIDTH,
  PADDING_L,
  PADDING_S,
  PORT_BORDER_RADIUS,
  REMOVE_PORT_SIZE,
  SEEN_ICON, SEND_TO_DOC_ICON,
  USER_INPUT_ICON, VOTE_ICON
} from '../../theme';


export const stencilConfig = {
  shapes: [{
    name: 'FlowchartStart',
    attrs: {
      subject: {
        object_type: "START",
        subject_type: "ANY_EMP",
        struct_id: null,
        emp_id: null, company_id: null, job_id: null,
        is_read_only: false,
        is_signature_needed: false
      },
    }
  }, {
    name: 'Message',
    attrs: {
      label: {text: 'Хянах'},
      description: {text: 'Төсөл боловсруулах, хянах'},
      icon: {xlinkHref: CONFIRMATION_ICON},
      ports: {
        items: [
          {
            group: 'in'
          },
          {
            group: 'out',
            attrs: {portLabel: {text: "Хянасан"}}
          },
          {
            group: 'out',
            attrs: {portLabel: {text: "Буцаасан"}}
          }
        ]
      },
      subject: {
        object_type: "CHECK",
        subject_type: "TO_ORG_EMPLOYEE",
        struct_id: null,
        emp_id: null, company_id: null, job_id: null,
        is_read_only: false, is_subject_changeable: false,
        is_signature_needed: false
      },
    }
  },
    //   {
    //   name: 'Message',
    //   attrs: {
    //     label: {text: 'Танилцах'},
    //     description: {text: 'Газрын захиралд танилцуулах'},
    //     icon: {xlinkHref: SEEN_ICON},
    //     ports: {
    //       items: [
    //         {
    //           group: 'in'
    //         },
    //         {
    //           group: 'out',
    //           attrs: {portLabel: {text: "Танилцсан"}}
    //         },
    //         {
    //           group: 'out',
    //           attrs: {portLabel: {text: "Буцаасан"}}
    //         }
    //       ]
    //     },
    //     subject: {
    //       object_type: "SEE_AND_CHECK",
    //       subject_type: "DEPARTMENT_DIRECTOR",
    //       struct_id: null,
    //       emp_id: null, company_id:null,job_id:null,
    //       is_read_only:false,
    //       is_signature_needed:true
    //     },
    //   },
    //
    //
    // },
    {
      name: 'Message',
      attrs: {
        label: {text: 'Санал авах'},
        description: {text: 'Санал авах хуудасны дагуу санал авах'},
        icon: {xlinkHref: VOTE_ICON},
        ports: {
          items: [
            {
              group: 'in'
            },
            {
              group: 'out',
              attrs: {portLabel: {text: "Дэмжсэн"}}
            },
            {
              group: 'out',
              attrs: {portLabel: {text: "Дэмжээгүй"}}
            },
            {
              group: 'out',
              attrs: {portLabel: {text: "Нэмэлт материал шаардлагатай"}}
            }
          ]
        },
        subject: {
          object_type: "VOTE",
          subject_type: "VOTERS",
          struct_id: null,
          emp_id: null, company_id: null, job_id: null,
          is_read_only: false, is_subject_changeable: false,
          is_signature_needed: false
        },
      }
    }, {
      name: 'Message',
      attrs: {
        label: {text: 'Шилжүүлэх'},
        description: {text: 'Бичиг хэрэгт хүргүүлэх'},
        icon: {xlinkHref: SEND_TO_DOC_ICON},
        ports: {
          items: [
            {
              group: 'in'
            },
            {
              group: 'out',
              attrs: {portLabel: {text: "Шилжүүлсэн"}}
            }
          ]
        },
        subject: {
          object_type: "TRANSFER",
          subject_type: "CREATOR",
          struct_id: null,
          emp_id: null, company_id: null, job_id: null,
          is_read_only: false, is_subject_changeable: false,
          is_signature_needed: false
        },
      },


    }, {
      name: 'Message',
      attrs: {
        label: {text: 'Дахин боловсруулах'},
        description: {text: 'Дахин боловсруулах эсвэл төслийг цуцлах'},
        icon: {xlinkHref: BACK_ICON},
        ports: {
          items: [
            {
              group: 'in'
            },
            {
              group: 'out',
              attrs: {portLabel: {text: "Цуцалсан"}}
            },
            {
              group: 'out',
              attrs: {portLabel: {text: "Дахин боловсруулсан"}}
            }

          ],

        },
        subject: {
          object_type: "RE_CREATE",
          subject_type: "CREATOR",
          struct_id: null,
          emp_id: null, company_id: null, job_id: null,
          is_read_only: false, is_subject_changeable: false,
          is_signature_needed: false
        },
      },


    }
    , {
      name: 'Message',
      attrs: {
        label: {text: 'Дугаар олгох'},
        description: {text: 'Хэвлэх, дугаар олгох'},
        icon: {xlinkHref: CONFIRMATION2_ICON},
        ports: {
          items: [
            {
              group: 'in'
            },
            {
              group: 'out',
              attrs: {portLabel: {text: "Хэвлэх"}}
            }
          ]
        },
        subject: {
          object_type: "PRE_END",
          subject_type: "TO_ORG_EMPLOYEE",
          struct_id: null,
          emp_id: null, company_id: null, job_id: null,
          is_read_only: false, is_subject_changeable: false,
          is_signature_needed: false
        },
      },


    }, {
      name: 'FlowchartEnd',
      attrs: {
        subject: {
          object_type: "END",
          subject_type: "CURRENT",
          struct_id: null,
          emp_id: null, company_id: null, job_id: null,
          is_read_only: false, is_subject_changeable: false,
          is_signature_needed: false
        },
      }
    },
    {
      name: 'FlowchartCancel',
      attrs: {
        subject: {
          object_type: "CANCEL",
          subject_type: "CURRENT",
          struct_id: null,
          emp_id: null, company_id: null, job_id: null,
          is_read_only: false, is_subject_changeable: false,
          is_signature_needed: false
        },
      }
    }]
};
