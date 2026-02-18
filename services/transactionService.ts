import axiosInstance from "./config/axios.js";
// All requests go through API Gateway (http://localhost:4001/api)

export const transactionService = {
  // Create a new transaction
  createTransaction: async (transactionData: any) =>
    axiosInstance.post(`/transactions`, transactionData).then((r) => r.data),

  // List all transactions
  listTransactions: async (filter?: { dateFrom?: string; dateTo?: string; type?: string }) =>
    axiosInstance.get(`/transactions`, { params: filter }).then((r) => r.data),
  // Get a specific transaction by ID
  getTransaction: async (transactionId: string) =>
    axiosInstance.get(`/transactions/${transactionId}`).then((r) => r.data),

  // delete a transaction by ID
  deleteTransaction: async (transactionId: string) =>
    axiosInstance.delete(`/transactions/${transactionId}`).then((r) => r.data)
};

export default transactionService;
