import { useActionData, useLoaderData, useRouteLoaderData } from '@remix-run/react';

export const useTypeActionData = <T, OT>() => {
  return useActionData<OT>() as T;
};

export const useTypeLoaderData = <T, OT>() => {
  return useLoaderData<OT>() as T;
};

export const useTypeRouteLoaderData = <T, OT>(routeId: string) => {
  return useRouteLoaderData<OT>(routeId) as T;
};
