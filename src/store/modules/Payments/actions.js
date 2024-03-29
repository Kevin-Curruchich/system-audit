import sbgApi from "@/apis/sbgApi";

//get
export const requestGetPayments = async ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    commit("setIsLoadingPayments", true);
    commit("setPayments", { data: [], total: 0 });
    sbgApi
      .get("/payments", { params })
      .then((response) => {
        commit("setPayments", response.data);
        commit("setIsLoadingPayments", false);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const requestGetPaymentById = async ({ commit }, id) => {
  return new Promise((resolve, reject) => {
    commit("setIsLoadingPaymentById", true);
    sbgApi
      .get(`/payments/${id}`)
      .then((response) => {
        commit("setPaymentById", response.data);
        commit("setIsLoadingPaymentById", false);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

//post
export const requestPostPayments = async (_, params) => {
  return new Promise((resolve, reject) => {
    sbgApi
      .post("/payments", params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const requestPostInvoiceMail = async (_, id) => {
  return new Promise((resolve, reject) => {
    sbgApi
      .post(`/payments/payment-mail/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
