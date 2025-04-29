export interface Customer {
    customerId: number,
    customerName: string,
    address: string,
    zip: number,
    place: string
}

export const emptyCustomer: Customer = {
    customerId: 0,
    customerName: "",
    address: "",
    zip: 0,
    place: ""
}