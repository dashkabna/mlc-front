export type user = {
    id: string;
    fullName : string;
    email: string;
    password: string;
    createdDate: string;
    updatedDate: string;
};
export type employee = {
    id: string;
    name: string;
    position: string;
    salary: number;
    createdDate: string;
    updatedDate: string;
};
export type task = {
    id: string;
    title: string;
    description: string;
    createdDate: string;
    updatedDate: string;
};
export type order = {
    id: string;
    userId: number;
    totalPrice: number;
    createdDate: string;
    updatedDate: string;
};
export type product = {
    id: string;
    name: string;
    price: number;
    stock: number;
    createdDate: string;
    updatedDate: string;
};