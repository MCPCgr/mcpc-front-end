import { defineAsyncComponent } from 'vue'
export const customElementList = [

  {
    element: 'tatatongaStruct',
    component: defineAsyncComponent(() => import('./tatatongaStruct.vue')),
  },
  {
    element: 'tatatongaUser',
    component: defineAsyncComponent(() => import('./tatatongaUser.vue')),
  },
  {
    element: 'tatatongaCompanySearch',
    component: defineAsyncComponent(() => import('./tatatongaCompanySearch.vue')),
  },
  {
    element: 'employeePermission',
    component: defineAsyncComponent(() => import('./employeePermission/employeePermission.vue')),
  },
  {
    element: 'tatatongaParentCompany',
    component: defineAsyncComponent(() => import('./tatatongaParentCompany.vue')),
  },
  {
    element: 'invoiceCalculator',
    component: defineAsyncComponent(() => import('./invoiceCalculator.vue')),
  },
  {
    element: 'invoiceLineDiscount',
    component: defineAsyncComponent(() => import('./invoiceLineDiscount.vue')),
  },
  {
    element: 'surchargeTaxNUAT',
    component: defineAsyncComponent(() => import('./surchargeTaxNUAT.vue')),
  },
  {
    element: 'taskPercent',
    component: defineAsyncComponent(() => import('./taskPercent.vue')),
  },
  {
    element: 'taskPriority',
    component: defineAsyncComponent(() => import('./taskPriority.vue')),
  },
  {
    element: 'taskPriority',
    component: defineAsyncComponent(() => import('./taskPriority.vue')),
  },
  {
    element: 'floorLayout',
    component: defineAsyncComponent(() => import('./floorLayout.vue')),
  },
  {
    element: 'workflow',
    component: defineAsyncComponent(() => import('./workflow.vue')),
  },
  {
    element: 'process_status',
    component: defineAsyncComponent(() => import('./process_status.vue')),
  },
  {
    element: 'doc_editor',
    component: defineAsyncComponent(() => import('./doc_editor.vue')),
  },
  {
    element: 'doc_document_editor',
    component: defineAsyncComponent(() => import('./doc_document_editor.vue')),
  },
  {
    element: 'deprecationCalculationDate',
    component: defineAsyncComponent(() => import('./depreciation.vue')),
  },
  {
    element: 'ebarimt_merchant_tin',
    component: defineAsyncComponent(() => import('./ebarimt_merchant_tin.vue')),
  },
  {
    element: 'MapWithGeometry',
    component: defineAsyncComponent(() => import('./GIS/MapWithGeometry.vue')),
  },
]
