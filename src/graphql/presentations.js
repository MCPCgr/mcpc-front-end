import {client} from "~/graphql/clients";
import {GET_PRESENTATION} from "~/graphql/queries";


export async function getPre(id) {
  try {
    const { data, errors } = await client.query({
      query: GET_PRESENTATION,
      fetchPolicy: "no-cache",
      variables:{
        id
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
