const BASE_URL = "http://localhost:8080/api";

export const getTransactions = async () => 
{
    const response = await fetch(`${BASE_URL}/transactions`);
    return response.json();
};

export const searchTransaction = async (id) => 
{
    const response = await fetch(`${BASE_URL}/search?transactionId=${id}`);
    return response.json();
};