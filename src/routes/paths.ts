// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
    },
    employee: {
      root: `${ROOTS.DASHBOARD}/employee`,
      new: `${ROOTS.DASHBOARD}/employee/new`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/employee/${id}/edit`,
    },
    task: {
      root: `${ROOTS.DASHBOARD}/task`,
      new: `${ROOTS.DASHBOARD}/task/new`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/task/${id}/edit`,
    },
    group: {
      order: {
        root: `${ROOTS.DASHBOARD}/group/order`,
        new: `${ROOTS.DASHBOARD}/group/order/new`,
        edit: (id: string) => `${ROOTS.DASHBOARD}/group/order/${id}/edit`,
      },
      product: {
        root: `${ROOTS.DASHBOARD}/group/product`,
        new: `${ROOTS.DASHBOARD}/group/product/new`,
        edit: (id: string) => `${ROOTS.DASHBOARD}/group/product/${id}/edit`,
      },
    },
  },
};
