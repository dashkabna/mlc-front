import { Scope, Client, ClientMap, Permission, ClientPermissionsMap } from 'src/types/user';

export const hasPermission = (data: any, clientId: string, scopeName: string): boolean => {
  if (data === null) {
    return false;
  }

  const promotionClient: Client = data.clients.find(
    (client: Client) => client.clientId === clientId
  );

  if (promotionClient) {
    return promotionClient.permissions.some((permission: Permission) =>
      permission.resource_scopes.some((scope: Scope) => scope.name === scopeName)
    );
  }

  return false;
};

export const hasPermissionSuts = (
  data: any,
  clientId: string,
  permName: string,
  scopeName: string
): boolean => {
  if (data === null) {
    return false;
  }

  const promotionClient: Client = data.clients.find(
    (client: Client) => client.clientId === clientId
  );

  if (promotionClient) {
    return promotionClient.permissions.some(
      (permission: Permission) =>
        permission.name === permName &&
        permission.resource_scopes.some((scope: Scope) => scope.name === scopeName)
    );
  }

  return false;
};

export const convertToClientPermissionsMap = (data: any): ClientPermissionsMap => {
  const clientPermissionsMap: ClientPermissionsMap = {};

  data.clients?.forEach((client: Client) => {
    const clientMap: ClientMap = {};
    const { clientId, permissions } = client;

    permissions.forEach((permission) => {
      const resourceScopes: string[] = [];
      permission.resource_scopes.forEach((scope) => {
        resourceScopes.push(scope.name);
      });
      clientMap[permission.name] = resourceScopes;
    });

    clientPermissionsMap[clientId] = clientMap;
  });

  return clientPermissionsMap;
};

export const EnumClientTypes = {
  promotion: {
    clientId: 'promotion',
    voucher: {
      edit: 'edit',
      view: 'view',
      approve: 'approve',
    },
  },
};
