/* eslint-disable @typescript-eslint/no-explicit-any */
interface ApiData {
  endPoint: string;
  method?: "POST" | "PUT" | "PATCH" | "GET" | "DELETE";
  sendData?: any;
  // queryParams?: any;
  queryParams?: [string, string][];
  pathParams?: any;

  accessToken?: string; // Bearer token for Authorization header
}

export const api = {
  postWithoutAuth: async ({ endPoint, method = "POST", sendData }: ApiData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${endPoint}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: sendData ? JSON.stringify(sendData) : undefined,
        }
      );
      const status = response.status;
      if (status !== 204) {
        const data = await response.json();
        return { status, data };
      }
      return { status, data: null };
    } catch (error) {
      throw error;
    }
  },

  get: async ({ endPoint, accessToken, queryParams }: ApiData) => {
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endPoint}`);
      if (queryParams) {
        queryParams.forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  getMaster: async ({ endPoint }: ApiData) => {
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endPoint}`);
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  getWithoutAuth: async ({ endPoint, queryParams }: ApiData) => {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endPoint}`);
    if (queryParams) {
      queryParams.forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  postWithAuth: async ({
    endPoint,
    method = "POST",
    sendData,
    token,
  }: ApiData & { token: string }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${endPoint}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: sendData ? JSON.stringify(sendData) : undefined,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  putWithAuth: async ({
    endPoint,
    method = "PUT",
    sendData,
    token,
  }: ApiData & { token: string }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${endPoint}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: sendData ? JSON.stringify(sendData) : undefined,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteWithAuth: async ({
    endPoint,
    method = "DELETE",
    accessToken,
  }: ApiData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${endPoint}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};
