import {client} from "~/graphql/clients.js"
import {documentClient} from "~/graphql/documentClient.js"
import {
  EO_STRUCTURE,

  GET_document_TYPE,
  GET_DOCUMENT, GET_DOCUMENT_CATEGORY,
  GET_EMPLOYEE,
  GET_EMPLOYERS_BY_STRUCT
} from "./queries";

export async function getStructs(name) {
  try {
    const {data, errors} = await client.query({
      query: EO_STRUCTURE,
      // fetchPolicy: "no-cache",
      variables: {
        name
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
    const {data, errors} = await client.query({
      query: GET_EMPLOYERS_BY_STRUCT,
      // fetchPolicy: "no-cache",
      variables: {
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
export async function getStructEmployee(emp_id) {
  try {
    const {data, errors} = await client.query({
      query: GET_EMPLOYEE,
      // fetchPolicy: "no-cache",
      variables: {
        "filters": [
          {
            "column": "EMP_ID",
            "condition": "equals",
            "value": emp_id.toString()
          }
        ]
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

export async function getDocCategory(company_id) {
  try {
    const {data, errors} = await documentClient.query({
      query: GET_DOCUMENT_CATEGORY,
      fetchPolicy: "no-cache",
      variables: {
        "sorts": [
          {
            "column": "category_order",
            "order": "asc"
          }
        ],
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


export async function getTypeWithFlow(typeID) {
  try {
    const {data, errors} = await documentClient.query({
      query: GET_document_TYPE,
      fetchPolicy: "no-cache",
      variables: {
        "filters": [
          {
            "column": "id",
            "condition": "equals",
            "value": typeID
          }
        ]
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

export async function getDocuments(page, size, filters, sorts) {
  try {
    const {data, errors} = await client.query({
      query: GET_DOCUMENT,
      fetchPolicy: "no-cache",
      variables: {
        "page": page,
        "size": size,
        filters,
        sorts
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
