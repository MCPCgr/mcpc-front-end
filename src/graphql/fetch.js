import {booking, client} from "./clients.js";
import {
  FEEDBACK_CREATE,
  GET_BRANCH_BOOKING_DATA,
  GET_BRANCHES_BOOKING,
  GET_EMPLOYEE_ID_FILTER,
  GET_FEEDBACK_LIST,
  GET_HOME_HAMT_OLON,
  GET_NEWS_DETAIL,
  GET_NEWS_LIST,
  GET_ORDER_DETAIL_TIMING,
  GET_SERVICE_CATEGORY,
  GET_SERVICE_CATEGORY_BY_ARTIST,
  GET_SERVICE_CATEGORY_WHERE_IN,
  GET_SERVICE_TIMING,
  GET_STRUCTS,
  GET_TECHNOLOGY_CARD,
  GET_TECHNOLOGY_CARD_INGREDIENDTS,
  MUTATION_CREATE_BOOKING_ORDER,
  MUTATION_CREATE_ORDER_DETAIL,
} from "~/graphql/queries";
import {GET_EMPLOYERS_BY_IDS, GET_EMPLOYERS_BY_JOB, GET_JOBS_BY_STRUCT} from "~/modules/document/graphql/queries";
import {inventoryClient} from "~/graphql/inventoryClient";



export async function getStructs(company_id) {
  try {
    const { data, errors } = await client.query({
      query: GET_STRUCTS,
      fetchPolicy: "no-cache",
      variables:{
        company_id
      }
    });

    if (errors && errors.length) {
      console.error('GraphQL Errors:', errors.map(e => e.message).join(', '));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch POS data:', error);
    throw error;
  }
}



export async function getStructEmployees(struct_id) {
  try {
    const { data, errors } = await client.query({
      query: GET_EMPLOYERS_BY_STRUCT,
      fetchPolicy: "no-cache",
      variables:{
        struct_id
      }
    });

    if (errors && errors.length) {
      console.error('GraphQL Errors:', errors.map(e => e.message).join(', '));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch POS data:', error);
    throw error;
  }
}
export async function getStructJobs(struct_id) {
  try {
    const { data, errors } = await client.query({
      query: GET_JOBS_BY_STRUCT,
      fetchPolicy: "no-cache",
      variables:{
        struct_id
      }
    });

    if (errors && errors.length) {
      console.error('GraphQL Errors:', errors.map(e => e.message).join(', '));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch POS data:', error);
    throw error;
  }
}

export async function getJobEmployees(job_id) {
  try {
    const { data, errors } = await client.query({
      query: GET_EMPLOYERS_BY_JOB,
      fetchPolicy: "no-cache",
      variables:{
        job_id
      }
    });

    if (errors && errors.length) {
      console.error('GraphQL Errors:', errors.map(e => e.message).join(', '));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch POS data:', error);
    throw error;
  }
}
export async function getEmployeesByIDS(ids) {
  try {
    const { data, errors } = await client.query({
      query: GET_EMPLOYERS_BY_IDS,
      fetchPolicy: "no-cache",
      variables:{
        ids
      }
    });

    if (errors && errors.length) {
      console.error('GraphQL Errors:', errors.map(e => e.message).join(', '));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch POS data:', error);
    throw error;
  }
}

export async function getTechnologyCardFoodIngredients(id) {
  try {
    const { data, errors } = await inventoryClient.query({
      query: GET_TECHNOLOGY_CARD_INGREDIENDTS,
      fetchPolicy: "no-cache",
      variables:{
        "filters": [
          {
            "column": "technology_card_id",
            "condition": "equals",
            "value": id
          }
        ]
      }
    });

    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch POS data:", error);
    throw error;
  }
}

export async function getTechnologyCard(id) {
  try {
    const { data, errors } = await inventoryClient.query({
      query: GET_TECHNOLOGY_CARD,
      fetchPolicy: "no-cache",
      variables:{
        "filters": [
          {
            "column": "id",
            "condition": "equals",
            "value": id
          }
        ]
      }
    });

    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch POS data:", error);
    throw error;
  }
}
export async function getEmployeeIdFilter(id) {
  try {
    const { data, errors } = await client.query({
      query: GET_EMPLOYEE_ID_FILTER,
      fetchPolicy: "no-cache",
      variables:{
        "filters": [
          {
            "column": "id",
            "condition": "equals",
            "value": id
          }
        ]
      }
    });

    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch POS data:", error);
    throw error;
  }
}

export async function getBranchBooking(struct_id) {
  try {
    const { data, errors } = await booking.query({
      query: GET_BRANCHES_BOOKING,
      fetchPolicy: "no-cache",
      variables:{
        "filters": [
          {
            "column": "struct_id",
            "condition": "equals",
            "value": struct_id
          }
        ]
      }
    });

    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch POS data:", error);
    throw error;
  }
};



export async function getServiceCategory(branch_id) {
  try {
    const { data, errors } = await booking.query({
      query: GET_SERVICE_CATEGORY,
      fetchPolicy: "no-cache",
      variables:{
        "filters": [
          {
            "column": "branch_id",
            "condition": "equals",
            "value": branch_id
          }
        ],
        "subFilters": [
          {
            "column": "visible_customer",
            "condition": "equals",
            "table": "services",
            "value": "0"
          }
        ]
      }
    });

    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch POS data:", error);
    throw error;
  }
}

export async function getServiceCategoryByArtist(artist_id) {
  try {
    const { data, errors } = await booking.query({
      query: GET_SERVICE_CATEGORY_BY_ARTIST,
      fetchPolicy: "no-cache",
      variables:{
        "filters": [
          {
            "column": "artist_id",
            "condition": "equals",
            "value": artist_id
          }
        ]
      }
    });

    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch POS data:", error);
    throw error;
  }
}
export async function getServiceCategoryByArtistWhereIn(cat_ids) {
  try {
    const { data, errors } = await booking.query({
      query: GET_SERVICE_CATEGORY_WHERE_IN,
      fetchPolicy: "no-cache",
      variables:{
        "filters": [
          {
            "column": "id",
            "condition": "whereIn",
            "value": cat_ids
          }
        ]
      }
    });

    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch POS data:", error);
    throw error;
  }
}

export async function getServiceCategoryByCatId(cat_id) {
  try {
    const { data, errors } = await booking.query({
      query: GET_SERVICE_CATEGORY_BY_ARTIST,
      fetchPolicy: "no-cache",
      variables:{
        "filters": [
          {
            "column": "service_category_id",
            "condition": "equals",
            "value": cat_id
          }
        ]
      }
    });

    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch POS data:", error);
    throw error;
  }
}
export async function getArtistByBranch(branch_id, today, emp_id) {
  try {
    const { data, errors } = await booking.query({
      query: GET_BRANCH_BOOKING_DATA,
      fetchPolicy: "no-cache",
      variables:{

        "filters": [
          {
            "column": "emp_id",
            "condition": "equals",
            "value": emp_id
          }
        ],
        "viewOrderDetailTimingFilters2": [
          {
            "column": "branch_id",
            "condition": "equals",
            "value": branch_id
          },
          {
            "column": "service_date",
            "condition": "equals",
            "value": today
          }
        ],
        "viewServiceTimingFilters2": [
          {
            "column": "branch_id",
            "condition": "equals",
            "value": branch_id
          },
        ]
      }
    });
    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch POS data:", error);
    throw error;
  }
}

export async function getOrderDetailTiming(artist_id, service_date) {
  try {
    const { data, errors } = await booking.query({
      query: GET_ORDER_DETAIL_TIMING,
      fetchPolicy: "no-cache",
      variables:{
        "groupFilters": [
          {
            "combine": "and",
            "filters": [
              {
                "column": "artist_id",
                "condition": "equals",
                "value": artist_id
              },
              {
                "column": "service_date",
                "condition": "equals",
                "value": service_date
              }
            ]
          }
        ]
      }
    });
    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch POS data:", error);
    throw error;
  }
}


export async function getOrderDetailTimingCheckExist(artist_id, service_date, service_time) {
  try {
    const { data, errors } = await booking.query({
      query: GET_ORDER_DETAIL_TIMING,
      fetchPolicy: "no-cache",
      variables:{
        "groupFilters": [
          {
            "combine": "and",
            "filters": [
              {
                "column": "artist_id",
                "condition": "equals",
                "value": artist_id
              },
              {
                "column": "service_date",
                "condition": "equals",
                "value": service_date
              },
              {
                "column": "service_time",
                "condition": "equals",
                "value": service_time
              }
            ]
          }
        ]
      }
    });
    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch POS data:", error);
    throw error;
  }
}


export async function getServiceTiming(service_id) {
  try {
    const { data, errors } = await booking.query({
      query: GET_SERVICE_TIMING,
      fetchPolicy: "no-cache",
      variables:{
        "filters": [
          {
            "column": "service_id",
            "condition": "equals",
            "value": service_id
          }
        ],
        "sorts": [
          {
            "column": "created_at",
            "order": "asc"
          }
        ]
      }
    });
    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch POS data:", error);
    throw error;
  }
}



export async function mutationCreateOrderDetail(data_body) {
  // console.log("export async function mutationCreateOrderDetail() >>> ");
  try {
    const { data, errors } = await booking.query({
      query: MUTATION_CREATE_ORDER_DETAIL,
      fetchPolicy: "no-cache",
      variables:{
        "input": {
          "artist_id": data_body.artist_id,
          "branch_id": data_body.branch_id,
          "order_id": data_body.order_id,
          "prepayment": data_body.prepayment,
          "service_category_id":data_body.service_category_id,
          "service_date": data_body.service_date,
          "service_date_time": data_body.service_date_time,
          "service_id": data_body.service_id,
          "service_price": data_body.service_price,
          "service_time": data_body.service_time,
          "registered_emp_id": data_body.registered_emp_id
        }
      }
    });

    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch POS data:", error);
    throw error;
  }
}

export async function mutationCreateBookingOrder(data_body) {
  // console.log("export async function mutationCreateOrderDetail() >>> ");
  try {
    const { data, errors } = await booking.query({
      query: MUTATION_CREATE_BOOKING_ORDER,
      fetchPolicy: "no-cache",
      variables:{
        "input": {
          "cash_amount": data_body.cash_amount,
          "company_id": data_body.company_id,
          "is_received": data_body.is_received,
          "non_cash_amount": data_body.non_cash_amount,
          "order_number": data_body.order_number,
          "payment_status": data_body.payment_status,
          "phone_number": data_body.phone_number,
          "qpay_invoice_id": data_body.qpay_invoice_id,
          "total_prepayment": data_body.total_prepayment,
          "total_price": data_body.total_price,
          "user_id": data_body.user_id
        }
      }
    });

    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch POS data:", error);
    throw error;
  }
}

export async function getNewsList(page, size) {
  try {
    const {data, errors} = await client.query({
      query: GET_TRAVEL_DESTINATION_LIST,
      variables: {
        page,
        size,
        "filters": [
          {
            "column": "web_id",
            "condition": "equals",
            "value": webId
          }
        ]
      },
      fetchPolicy: "no-cache",
    });

    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch travel data: ${errors[0].message}`);
    }

    if (data && data.paginate) {
      return data.paginate;
    } else {
      throw new Error("Failed to fetch travel data: No data returned");
    }
  } catch (error) {
    console.error("Failed to fetch travel data:", error);
    throw error;
  }
}

export async function getNewsAdminList(company_id, page, size,) {
  try {
    const {data, errors} = await client.query({
      query: GET_NEWS_LIST,
      variables: {
        page,
        size,
        "filters": [
          {
            "column": "company_id",
            "condition": "equals",
            "value": company_id
          }
        ]
      },
      fetchPolicy: "no-cache",
    });

    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch travel data: ${errors[0].message}`);
    }

    if (data && data.paginate) {
      return data.paginate;
    } else {
      throw new Error("Failed to fetch travel data: No data returned");
    }
  } catch (error) {
    console.error("Failed to fetch travel data:", error);
    throw error;
  }
}

export async function getNewsDetailById(id) {
  try {
    const {data, errors} = await client.query({
      query: GET_NEWS_DETAIL,
      variables: {
        "filters": [
          {
            "column": "id",
            "condition": "equals",
            "value": id
          }
        ]
      },
      fetchPolicy: "no-cache",
    })

    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch POS data:", error);
    throw error;
  }
}

export async function getHomeHamtOlon(company_id, page, size) {
  try {
    const { data, errors } = await client.query({
      query: GET_HOME_HAMT_OLON,
      fetchPolicy: "no-cache",
      page,
      size,
      variables: {
        "filters": [
          {
            "column": "company_id",
            "condition": "equals",
            "value": company_id
          },
          {
            "column": "employee_status_id",
            "condition": "equals",
            "value": "Ажиллаж байгаа"
          },
        ]
      },
    });

    if (errors && errors.length) {
      console.error('GraphQL Errors:', errors.map(e => e.message).join(', '));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch POS data:', error);
    throw error;
  }
}


export async function getFeedbackList(company_id, page, size) {
  try {
    const {data, errors} = await client.query({
      query: GET_FEEDBACK_LIST,
      variables: {
        "page": 1,
        "size": 10,
        "filters": {
          "column": "company_id",
          "condition": "equals",
          "value": company_id
        }
      },
      fetchPolicy: "no-cache",
    });

    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch feedback data: ${errors[0].message}`);
    }

    if (data && data.paginate) {
      return data.paginate;
    } else {
      throw new Error("Failed to fetch feedback data: No data returned");
    }
  } catch (error) {
    console.error("Failed to fetch feedback data:", error);
    throw error;
  }
}


// export async function mutationCreateBookingOrder(data_body) {
//   // console.log("export async function mutationCreateOrderDetail() >>> ");
//   try {
//     const { data, errors } = await booking.query({
//       query: MUTATION_CREATE_BOOKING_ORDER,
//       fetchPolicy: "no-cache",
//       variables:{
//         "input": {
//           "cash_amount": data_body.cash_amount,
//           "company_id": data_body.company_id,
//           "is_received": data_body.is_received,
//           "non_cash_amount": data_body.non_cash_amount,
//           "order_number": data_body.order_number,
//           "payment_status": data_body.payment_status,
//           "phone_number": data_body.phone_number,
//           "qpay_invoice_id": data_body.qpay_invoice_id,
//           "total_prepayment": data_body.total_prepayment,
//           "total_price": data_body.total_price,
//           "user_id": data_body.user_id
//         }
//       }
//     });
//
//     if (errors && errors.length) {
//       console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
//       throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
//     }
//     return data;
//   } catch (error) {
//     console.error("Failed to fetch POS data:", error);
//     throw error;
//   }
// }


export async function mutationFeedBackCreate(insert_data) {
  // console.log("export async function mutationCreateOrderDetail() >>> ");
  try {
    const { data, errors } = await booking.query({
      query: FEEDBACK_CREATE,
      fetchPolicy: "no-cache",
      variables: {
        "input": {
          "nick_name" : insert_data.nick_name,
          "description_text" : insert_data.description_text,
          "company_id" : insert_data.company_id,
          "emp_id" : insert_data.emp_id
        }
      }
    });

    if (errors && errors.length) {
      console.error("GraphQL Errors:", errors.map((e) => e.message).join(", "));
      throw new Error(`Failed to fetch POS data: ${errors[0].message}`);
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch POS data:", error);
    throw error;
  }
}
